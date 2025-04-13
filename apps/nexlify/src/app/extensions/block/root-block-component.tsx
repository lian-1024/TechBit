import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import { DOMAttributes, FC } from 'react';
import { GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button';

const RootBlockComponent: FC<NodeViewProps> = ({ node, getPos, editor }) => {
  // 处理拖拽开始事件（可选，用于优化拖拽体验）
  const handleDragStart: DOMAttributes<HTMLDivElement>['onDragStart'] = (event: any) => {
    // ProseMirror 默认处理拖拽，但你可以在这里添加自定义逻辑
    event.dataTransfer.setData('text/plain', getPos().toString());
  };

  return (
    <NodeViewWrapper className="root-block flex gap-2 items-start group" data-type="rootBlock">
      <Button asChild className='size-6 opacity-0 group-hover:opacity-100' variant={"ghost"}>
        <div
          className="drag-handle"
          contentEditable={false}
          draggable
          onDragStart={handleDragStart}
        >
          <GripVertical className='size-4 text-zinc-500' />
        </div>
      </Button>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
}

export default RootBlockComponent