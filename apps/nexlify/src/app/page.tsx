"use client";
import { EditorContent, StarterKit, GlobalDragHandle, SlashCommand, getSuggestionItems, renderItems, suggestionConfig } from '@lianqq/tiptap-headless'

const initialContent = `
<p>lian</p>
<p>lian</p>
`

const extensions = [
  StarterKit,
  GlobalDragHandle,
  SlashCommand.configure({
    suggestion: suggestionConfig
  })
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
