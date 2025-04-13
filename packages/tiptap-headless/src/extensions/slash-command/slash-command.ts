import { Extension } from "@tiptap/core";
import { PluginKey } from '@tiptap/pm/state'
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";

export default Extension.create({
    name: "slashCommand",

    // 定义扩展的配置选项
    addOptions() {
        return {
            suggestion: {
                char: "/", // 触发字符
                pluginKey: new PluginKey("slashCommand"), // 插件键
                command: ({ editor, range, props }) => { // 命令函数
                    // 在这里可以执行一些操作，比如插入文本
                    // 这里的 props 是传递给命令函数的参数
                    // 你可以根据需要进行处理
                    // 例如，插入一个文本节点
                    // editor.commands.insertContentAt(range, props.text)
                    props.command({ editor, range, props })
                },

            } as SuggestionOptions
        }
    },
    // 添加插件
    addProseMirrorPlugins() {
        return [
            // 使用 Suggestion 插件
            // 该插件用于处理 slash 命令的建议
            // 你可以在这里传递一些选项，比如触发字符、插件键等
            // 这些选项会传递给 Suggestion 插件
            // 你可以根据需要进行配置
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion
            })
        ]
    },

})