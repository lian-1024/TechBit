/**
 * 文章数据结构
 */
export interface Post {
    /** 文章唯一标识 */
    id: string
    /** 文章标题 */
    title: string
    /** 文章内容 */
    content: string
    /** 作者信息 */
    author: string
    /** 创建时间 */
    createdAt: string
    /** 更新时间 */
    updatedAt: string
    /** 文章标签 */
    tags?: string[]
}

/**
 * 文章列表接口返回数据结构
 */
export interface PostsResponse {
    /** 文章列表数据 */
    posts: Post[]
    /** 总数据条数 */
    total: number
    /** 是否还有更多数据 */
    hasMore: boolean
}