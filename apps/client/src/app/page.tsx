"use client"

import { PostsList } from "@/components/features/posts";
import { Button } from "@lianqq/ui/components/button";
import Link from "next/link";
import { useState } from "react";
import { withPostsFetching } from "@/components/features/posts";


/** 侧边栏菜单项 */
const menuItems = [
  {
    label: "综合",
    href: "/",
  },
  {
    label: "前端",
    href: "/frontend",
  },
  {
    label: "后端",
    href: "/backend"
  }

]

const Navigation = () => {
  // 使用客户端组件需要添加"use client"指令
  // 但由于这会改变整个文件的性质，我们使用useState模拟当前选中项
  const [activeItem, setActiveItem] = useState("/");

  const handleMenuClick = (href: string) => {
    setActiveItem(href);
  };

  return <ul className="w-42 flex flex-col gap-2">
    {
      menuItems.map((menu) => {
        const isActive = activeItem === menu.href;
        return <li key={menu.href} className="w-full">
          <Link href={menu.href} onClick={() => handleMenuClick(menu.href)} className="w-full block">
            <Button className="w-full" variant={isActive ? "secondary" : "ghost"}>
              {menu.label}
            </Button>
          </Link>
        </li>
      })
    }
  </ul>
}

const WithPostsFetchingComponent = withPostsFetching(PostsList)


const Content = () => {

  return <div className="flex-1 flex-col rounded-lg">
    <WithPostsFetchingComponent />
  </div>
}

const Aside = () => {
  return <div className="w-64">aside</div>
}

export default function Home() {
  return (
    <div className="flex gap-6">
      <Navigation />
      <Content />
      <Aside />
    </div>
  );
}
