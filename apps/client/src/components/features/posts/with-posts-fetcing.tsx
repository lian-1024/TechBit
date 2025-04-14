import { FC, ComponentProps } from "react";
import PostsList from './posts-list'
import { usePosts } from '@/hooks/use-posts'

const withPostsFetcing = (WrappedComponent: typeof PostsList) => {
    return function WithPostsFetchingComponent() {
        const { posts, loadMore, refresh, isLoading } = usePosts({ initialPage: 10 })
        
        return <WrappedComponent 
            posts={posts} 
            onLoadMore={loadMore} 
            onRefresh={refresh} 
            loading={isLoading} 
        />
    }
}

export default withPostsFetcing