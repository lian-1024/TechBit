import { useCallback, useEffect, useId, useState } from "react"
import { Post, PostsResponse } from "./types"

/**
 * usePosts hook 的配置选项
 */
interface Options {
    /** 排序字段，目前仅支持按创建时间排序 */
    sortBy?: "createdAt"
    initialPageNum?: number, // 当前页码
    /** 页大小 */
    initialPageSize?: number // 每页显示的数量
    initialPosts?: Array<any>
}

/** 默认配置选项 */
const defaultOptions: Options = {
    initialPageSize: 10,
    sortBy: "createdAt",
    initialPageNum: 1
}

// /**
//  * usePosts hook 返回值类型
//  */
// interface UsePostsReturn {
//     /** 文章列表数据 */
//     posts: Post[]
//     /** 是否正在加载中 */
//     isLoading: boolean
//     /** 错误信息，如果有的话 */
//     error: Error | null
//     /** 是否还有更多数据可以加载 */
//     hasMore: boolean
//     /** 加载更多数据的函数 */
//     loadMore: () => Promise<void>
//     /** 刷新数据的函数，会重置到第一页 */
//     refresh: () => Promise<void>
//     /** 当前页码 */
//     currentPage: number
//     /** 总数据条数 */
//     total: number
// }

/** usePosts hook 的类型定义 */
// type UsePosts = (options?: Options) => UsePostsReturn

/**
 * 文章列表管理 Hook
 * 提供分页加载、刷新等功能
 * 
 * @example
 * const { 
 *   posts,
 *   isLoading,
 *   loadMore,
 *   refresh
 * } = usePosts({ pageSize: 20 })
 */
const usePosts = (options: Options) => {
    // 合并默认配置和用户配置
    const { initialPageSize = 10, sortBy, initialPageNum = 1, initialPosts } = { ...defaultOptions, ...options }

    // 状态管理
    const [posts, setPosts] = useState(initialPosts || [])  // 使用 initialPosts 或空数组
    const [isLoading, setIsLoading] = useState(false)     // 加载状态
    const [error, setError] = useState<Error | null>(null) // 错误状态
    const [hasMore, setHasMore] = useState(true)          // 是否还有更多数据
    const [currentPageNum, setCurrentPageNum] = useState(initialPageNum)  // 当前页码
    const [currentPageSize, setCurrentPageSize] = useState(initialPageSize)  // 当前页大小
    const [total, setTotal] = useState(0)             // 总数据条数

    /**
     * 获取文章数据
     * @param pageNum 页码
     * @param append 是否追加模式（用于加载更多）
     */
    const fetchPosts = async (pageNum: number, append: boolean = false) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(
                `/api/posts?pageNum=${pageNum}&pageSize=${currentPageSize}`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch posts')
            }

            const { data } = await response.json()
            setPosts(prev => append ? [...prev, ...data.posts] : data.posts)
            setTotal(data.total)
            // 根据返回的数据判断是否还有更多
            setHasMore(data.posts.length === currentPageSize)
            setError(null)
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * 加载更多数据
     * 当还有更多数据且不在加载中时才会执行
     */
    const loadMore = async () => {
        if (isLoading || !hasMore) return

        const nextPageNum = currentPageNum + 1
        setCurrentPageNum(nextPageNum)
        await fetchPosts(nextPageNum, true)
    }

    /**
     * 刷新数据
     * 重置到第一页并重新加载数据
     */
    const refresh = async () => {
        const firstPageNum = 1
        setCurrentPageNum(firstPageNum)
        await fetchPosts(firstPageNum, false)
    }

    // 初始加载或当前页变化时加载数据
    useEffect(() => {
        if (isLoading) return
        fetchPosts(currentPageNum, false)
    }, [currentPageNum]) // 添加 currentPageNum 作为依赖

    return {
        posts,
        isLoading,
        error,
        loadMore,
        refresh,
    }
}

export default usePosts