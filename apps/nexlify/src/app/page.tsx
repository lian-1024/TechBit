"use client";
import { EditorContent } from '@lianqq/tiptap-headless'
import {StarterKit} from '@lianqq/tiptap-headless'
import GlobalDragHandler from 'tiptap-extension-global-drag-handle'
const initialContent = `
<p>lian</p>
<p>lian</p>
`

const extensions = [
  StarterKit,
  GlobalDragHandler
]

const Tiptap = () => {

  return (
    <EditorContent
      extensions={extensions}
      initialContent={initialContent}
    />
  )
}

export default function Home() {
  return (
    <div className="p-8">
      <Tiptap />
    </div>
  )
}
