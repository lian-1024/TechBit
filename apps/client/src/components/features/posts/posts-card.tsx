import { Avatar, AvatarImage, AvatarFallback } from "@lianqq/ui/components/avatar";
import { Button } from "@lianqq/ui/components/button";
import { ThumbsUp } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface PostsCardProps extends HTMLAttributes<HTMLElement> {
    post: any
}


const ArticleCard: FC<PostsCardProps> = ({ children, post, ...rest }) => {
    return <div className="dark:hover:bg-zinc-900/90 transition p-8 group rounded-lg" {...rest} >
        <div className="flex items-center mb-4">
            <Avatar className="bg-zinc-800">
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="ml-1 flex-1">LIAN</span>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {new Date().toLocaleDateString("zh-CN")}
            </code>
        </div>
        <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight mb-6 text-zinc-200 group-hover:text-white line-clamp-2">
            An AI collaboration document has been developed, which is based on React. This document is designed to facilitate collaborative efforts between different users and teams.
        </h2>
        {/* <p className="leading-7 [&:not(:first-child)]:mt-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit amet sit suscipit a illo adipisci impedit quaerat quia atque? Dolorem aliquam vero hic earum libero laboriosam quibusdam voluptatibus nisi officia.
        </p> */}
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <div >
                    {/* <Button variant={'ghost'} size="icon" className="rounded-full">
                        <ThumbsUp className="size-5 pointer" />
                    </Button> */}
                    <small className="text-sm font-medium leading-none">Thunmbs Up</small>
                    <small className="ml-1 text-sm font-medium leading-none">99</small>
                </div>
                <div >

                    <small className="text-sm font-medium leading-none">Commits</small>
                    <small className="ml-1 text-sm font-medium leading-none">99</small>
                </div>
            </div>
            <Button variant="link" className="text-zinc-200 hover:text-white"># Front End</Button>
        </div>
    </div>
}

export default ArticleCard 