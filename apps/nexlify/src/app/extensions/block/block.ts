import { Node, mergeAttributes,ReactNodeViewRenderer } from '@tiptap/react';
import RootBlockComponent from './root-block-component';
const RootBlock = Node.create({
  name: 'rootBlock',
  group: 'block',
  content: 'block+', // 允许嵌套其他块级节点（如 paragraph、heading）
  draggable: true, // 启用 ProseMirror 内置拖拽
  isolating: true, // 防止块之间意外合并

  addAttributes() {
    return {
      'data-type': {
        default: 'rootBlock',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="rootBlock"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'rootBlock' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(RootBlockComponent);
  },
});

export default RootBlock