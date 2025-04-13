import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import SlashCommandMenu from './slash-command-menu';
import { SuggestionOptions } from '@tiptap/suggestion'
import { commands } from './commands';


export const suggestionConfig: Pick<SuggestionOptions, 'items' | 'render'> = {
   // 例如 用户输入 /Head   那么 query 就是 Head
    items: ({ query }) => {
        // 然后根据 query 过滤 commands
        // 获取建议项
        return commands.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
    },

    // redner 接受
    render: () => {
        let component: ReactRenderer;
        let popup: any

        return {
            onStart: (props) => {
                // 渲染组件，并传入属性
                component = new ReactRenderer(SlashCommandMenu, {
                    props,
                    editor: props.editor, // 传入编辑器实例
                });

                popup = tippy('body', {
                    // 使用 tippy.js 创建弹出框 定义菜单位置
                    getReferenceClientRect: () => {
                        if (typeof props.clientRect === 'function') {
                            const rect = props.clientRect(); 
                            return rect || new DOMRect(0, 0, 0, 0); // Fallback to default DOMRect if null
                        }
                        return new DOMRect(0, 0, 0, 0); // Fallback if clientRect is not a function
                    },
                    appendTo: () => document.body,
                    content: component.element, // 渲染组件为弹出框
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual', // 手动触发
                    placement: 'bottom-start', // 菜单弹出位置
                });
            },

            onUpdate(props) {
                component.updateProps(props);
                popup[0].setProps({
                    getReferenceClientRect: props.clientRect as () => DOMRect,
                });
            },

            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    popup[0].hide();
                    return true;
                }
                return component.ref?.onKeyDown(props);
            },

            onExit() {
                popup[0].destroy();
                component.destroy();
            },
        };
    },
};

export default suggestionConfig