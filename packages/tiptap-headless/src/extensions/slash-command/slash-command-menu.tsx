import { Editor } from '@tiptap/core'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'


interface CommandItem {
  title: string
  command: (props: { editor: Editor; range: Range }) => void
}

interface SlashCommandMenuProps {
  editor: Editor
  items: CommandItem[]
  command: (props: { 
    editor: Editor
    range: Range
    command: CommandItem['command'] 
  }) => void
  query: string
  range: Range
}

interface SlashCommandMenuRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

const SlashCommandMenu = forwardRef<SlashCommandMenuRef, SlashCommandMenuProps>(
  ({ query, range, editor, items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )

    const selectItem = (index: number) => {
      const item = filteredItems[index]
      if (item) {
        command({ editor, range, command: item.command })
      }
    }

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
          setSelectedIndex(
            (selectedIndex - 1 + filteredItems.length) % filteredItems.length
          )
          event.preventDefault()
        } else if (event.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % filteredItems.length)
          event.preventDefault()
        } else if (event.key === 'Enter') {
          selectItem(selectedIndex)
          event.preventDefault()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [selectedIndex, filteredItems])

    useEffect(() => {
      setSelectedIndex(0)
    }, [query])

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === 'ArrowUp') {
          setSelectedIndex(
            (selectedIndex - 1 + filteredItems.length) % filteredItems.length
          )
          return true
        }
        if (event.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % filteredItems.length)
          return true
        }
        if (event.key === 'Enter') {
          selectItem(selectedIndex)
          return true
        }
        return false
      },
    }))

    if (!filteredItems.length) return null

    return createPortal(
      <div
        className="slash-command-menu"
        style={{
          position: 'absolute',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '8px 0',
          zIndex: 1000,
        }}
      >
        {filteredItems.map((item, index) => (

          <div
            key={item.title}
            className={`slash-command-item ${
              index === selectedIndex ? 'selected' : ''
            }`}
            onClick={() => selectItem(index)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              background: index === selectedIndex ? '#e6f3ff' : 'transparent',
            }}
          >
            {item.title}
          </div>
        ))}
      </div>,
      document.body
    )
  }
)

SlashCommandMenu.displayName = 'SlashCommandMenu'

export type { CommandItem, SlashCommandMenuProps, SlashCommandMenuRef }
export default SlashCommandMenu