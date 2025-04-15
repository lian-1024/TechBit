import { FC, ComponentProps, useState, useId, useEffect } from "react";
import PostsList from './posts-list'
import { usePosts } from '@/hooks/use-posts'
import { Posts } from "@/types/posts";
import { nanoid } from 'nanoid'

const fetchPostsData = () => {
    const results: Posts = []

    for (let i = 0; i <= 10; i++) {
        results.push({
            id: nanoid(),
            title: "Application error: a client-side exception has occurred while loading localhost (see the browser console for more information).",
            summary: "Application error: a client-side exception has occurred while loading localhost (see the browser console for more information).",
            createdAt: new Date().toDateString()
        })
    }

    return results
}


const withPostsFetching = (WrappedComponent: typeof PostsList) => {
    return function WithPostsFetchingComponent() {

        const [posts, setPosts] = useState<Posts>([])
        const [pageNum, setPageNum] = useState<number>(1)
        const [pageSize, setPageSize] = useState<number>(10)

        const [isLoading, setIsLoading] = useState<boolean>(false)

        const fetchPosts = () => {
            const results = fetchPostsData()
            setPosts(prev => prev = [...prev, ...results])
        }

        const loadMore = () => {
            fetchPosts()
        }

        const refresh = () => {
            setPosts([])
            fetchPosts()
        }

        useEffect(() => {
            fetchPosts()
        }, [pageNum, pageSize])


        return <WrappedComponent
            posts={posts}
            onLoadMore={loadMore}
            onRefresh={refresh}
            loading={isLoading}
        />
    }
}

export default withPostsFetching