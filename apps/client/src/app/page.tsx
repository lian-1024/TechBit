"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Blog",
    href: "/blog"
  },
  {
    label: "Contact",
    href: "/contact"
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

const HomeContent = () => {
  return <div className="flex-1">content</div>
}

const Aside = () => {
  return <div>aside</div>
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
