import { FC, HTMLAttributes, memo, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import PostsCard from "./posts-card";
import { LoaderCircle } from "lucide-react";


interface PostsListProps<T extends any> extends HTMLAttributes<HTMLElement> {
    posts?: T[],
    loading: boolean,
    onRefresh?: () => void
    onLoadMore?: () => void
}

const PostsList = <T,>({ children, posts, loading, onRefresh, onLoadMore, ...rest }: PostsListProps<T>) => {

    // 存储需要观察的元素
    const oberserTarget = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && onLoadMore) {
                onLoadMore()
            }
        },
            {
                threshold: 0.1
            }
        )

        // 观察目标元素
        if (oberserTarget.current) {
            observer.observe(oberserTarget.current)
        }

        // 清除观察者
        return () => observer.disconnect()
    }, [])



    return <div {...rest} >
        {Array.from({ length: 1 }).map((post, index) => {
            return <PostsCard post={post} key={index} />
        })}
        {children}
        <div ref={oberserTarget} className="mt-6">
            {/* 加载 */}
            <p className="text-sm text-center flex items-center justify-center gap-2 text-muted-foreground leading-6">
                <LoaderCircle className="animate-spin" />
                加载中...
            </p>
        </div>
    </div>
}

export default PostsList