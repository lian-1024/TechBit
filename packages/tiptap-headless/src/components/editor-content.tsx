
import { EditorProvider, type EditorProviderProps } from '@tiptap/react'
import React, { forwardRef } from 'react'
interface EditorContentProps extends Omit<EditorProviderProps, 'content'> {
    initialContent?: string,
    children?: React.ReactNode,
}



const EditorContent = React.memo(forwardRef<HTMLDivElement, EditorContentProps>(({ children, initialContent, ...rest }, ref) => {
    return <div ref={ref} className="tiptap-editor-content">
        <EditorProvider
            immediatelyRender={false}
            content={initialContent}
            {...rest}
        >
            {children}
        </EditorProvider>
    </div>
})
)
export default EditorContent