import { Button } from "@/components/ui/button";
import { FC, HTMLAttributes } from "react";

interface PostsCardProps extends HTMLAttributes<HTMLElement> {
    post: any
}


const ArticleCard: FC<PostsCardProps> = ({ children, post, ...rest }) => {
    return <div className="dark:hover:bg-blue-900/90 transition p-8 rounded-lg" {...rest} >
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight mb-6">
            AI collaboration document developed based on React
        </h2>
        {/* <p className="leading-7 [&:not(:first-child)]:mt-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit amet sit suscipit a illo adipisci impedit quaerat quia atque? Dolorem aliquam vero hic earum libero laboriosam quibusdam voluptatibus nisi officia.
        </p> */}
        <div className="flex justify-end">
            <Button variant="link"># Front End</Button>
        </div>
    </div>
}

export default ArticleCard 