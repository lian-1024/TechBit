"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


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

const NavigationMenu = () => {
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


const ArticleList = () => {

}

const HomeContent = () => {
  return <div className="flex-1 flex-col p-8 dark:bg-zinc-900 rounded-lg">
    <div className="rounded-lg">

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The People of the Kingdom
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus repellendus vel sed praesentium dolorum perferendis dolore nesciunt provident ullam doloremque voluptates odit, quas atque tempore voluptatem non cupiditate error eligendi.</p>、
    </div>
  </div>
}

const Aside = () => {
  return <div className="w-64">aside</div>
}

export default function Home() {
  return (
    <div className="flex gap-6">
      <NavigationMenu />
      <HomeContent />
      <Aside />
    </div>
  );
}
