import { SearchIcon } from "lucide-react"
import { Button } from "@lianqq/ui/components/button"
import { Input } from "@lianqq/ui/components/input"
import { Avatar, AvatarFallback, AvatarImage } from "@lianqq/ui/components/avatar"
import { Separator } from '@lianqq/ui/components/separator'
import { FC, PropsWithChildren } from "react"
import { ModeToggle } from "../mode-toggle"


const TechBitLOGO = () => {
    return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        TechBit
    </h3>
}

const TechBitSearch = () => {
    return <div className="flex gap-2 ml-6">
        <Input />
        <Button size={"icon"}>
            <SearchIcon />
        </Button>
    </div>
}

const HeaderRight = () => {
    return <div className="flex gap-4">
        <Avatar className="size-9">
            <AvatarImage />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ModeToggle />
    </div>
}

const TechBitHeader = () => {
    return <header className="z-50 h-16 fixed left-0 right-0 top-0 flex items-center px-6 border-b border-b-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-900">
        <TechBitLOGO />
        <TechBitSearch />
        <div className="flex-1" />
        <HeaderRight />
    </header>
}

export default TechBitHeader