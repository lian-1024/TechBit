import { SuggestionOptions } from '@tiptap/suggestion'

// 定义基础命令类型
interface Command {
    title: string
    command: SuggestionOptions['command']
}

export const commands: Command[] = [
    {
        title: "H1",
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 1 })
                .run();
        }
    },
    {
        title: "H2",
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 2 })
                .run();
        }
    },
    {
        title: "bold",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setMark("bold").run();
        }
    },
    {
        title: "italic",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setMark("italic").run();
        }
    },
    {
        title: "image",
        command: ({ editor, range }) => {
            console.log("call some function from parent");
            editor.chain().focus().deleteRange(range).setNode("paragraph").run();
        }
    }
]
