"use client";
import Image from "next/image";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import { RootBlock } from '@/app/extensions/block/index'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      GlobalDragHandle,
    ],
    content: ` 
    hello world
    `,
  })
  return <EditorContent editor={editor} />
}

export default function Home() {
  return (
    <div className="p-8">
      <Tiptap />
    </div>
  );
}
