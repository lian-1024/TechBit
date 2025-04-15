import { success } from "@/lib/response";
import { NextResponse } from "next/server";

const articles = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `文章标题 ${i + 1}`,
    summary: `这是文章 ${i + 1} 的内容。`,
    createdAt: new Date().toISOString(),
}));


export async function GET(request: Request) {
    // 获取路由参数

    const { searchParams } = new URL(request.url);
    // 获取分页参数
    const page = parseInt(searchParams.get('pageNum') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // 计算分页数据
    const startIndex = (page - 1) * pageSize;
    // 确保不越界
    const pagedArticles = articles.slice(startIndex, startIndex + pageSize);

    return NextResponse.json(success({
        posts: pagedArticles,
        total: articles.length,
    }));
}