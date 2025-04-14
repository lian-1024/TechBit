import { useCallback, useEffect, useId, useState } from "react"
import { Post, PostsResponse } from "./types"

/**
 * usePosts hook 的配置选项
 */
interface Options {
    /** 每页显示的文章数量 */
    initialPageSize?: number
    /** 排序字段，目前仅支持按创建时间排序 */
    sortBy?: "createdAt"
    /** 初始页码 */
    initialPage?: number,
    initialPosts?: Array<any>
}

/** 默认配置选项 */
const defaultOptions = {
    pageSize: 10,
    sortBy: "createdAt",
    initialPage: 1
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
const useArticles = (options: Options) => {
    // 合并默认配置和用户配置
    const { initialPageSize, sortBy, initialPage, initialPosts } = { ...defaultOptions, ...options }

    // 状态管理
    const [posts, setPosts] = useState(initialPosts || [])  // 使用 initialPosts 或空数组
    const [isLoading, setIsLoading] = useState(false)     // 加载状态
    const [error, setError] = useState<Error | null>(null) // 错误状态
    const [hasMore, setHasMore] = useState(true)          // 是否还有更多数据
    const [currentPage, setCurrentPage] = useState(initialPage) // 当前页码
    const [currentPageSize, setCurrentPageSize] = useState(initialPageSize) // 每页数据条数
    const [total, setTotal] = useState(0)             // 总数据条数

    /**
     * 获取文章数据
     * @param page 页码
     * @param append 是否追加模式（用于加载更多）
     */
    const fetchPosts = useCallback(async (page: number, append: boolean = false) => {
        setIsLoading(true)
        setError(null)

        try {
            // 发起请求获取数据
            // const response = await fetch(
            //     `/api/posts?page=${page}&pageSize=${currentPageSize}&sortBy=${sortBy}`
            // )

            // if (!response.ok) {
            //     throw new Error('Failed to fetch posts')
            // }

            // mock
            // const data = {
            //     total: 100,
            //     hasMore: true,
            //     posts
            // }

            // 根据模式更新数据：追加或替换
            // setPosts(prev => append ? [...prev, ...data.posts] : data.posts)
            // setHasMore(data.hasMore)
            // setTotal(data.total)
            // setError(null)
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, sortBy, currentPageSize])

    /**
     * 加载更多数据
     * 当还有更多数据且不在加载中时才会执行
     */
    const loadMore = useCallback(async () => {
        // if (isLoading || !hasMore) return
        if (isLoading) return

        // 请求下一页数据
        await fetchPosts(currentPage + 1, true)
        // 更新当前页码
        setCurrentPage(prev => prev + 1)
    }, [currentPage, fetchPosts, hasMore, isLoading])


    const setPage = useCallback((page: number) => {
        setCurrentPage(page)
    }, [])

    const setPageSize = useCallback((pageSize: number) => {
        setCurrentPageSize(pageSize)
        setCurrentPage(1)
    }, [])
    /**
      * 刷新数据
      * 重置到第一页并重新加载数据
      */
    const refresh = useCallback(async () => {
        // 设置当前页码
        setCurrentPage(1)
        // 重新加载第一页数据
        await fetchPosts(1, false)
    }, [fetchPosts])

    // 初始加载或当前页变化时加载数据
    useEffect(() => {
        fetchPosts(currentPage, false)
    }, [currentPage, fetchPosts])

    return {
        posts,
        isLoading,
        error,
        loadMore,
        refresh,
        setPage,
        setPageSize
    }
}

export default useArticles