import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import TextEditorMenuBar from './text-editor-apply-job';
import Heading from '@tiptap/extension-heading';
import clsx from 'clsx';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

type TextEditorProps = {
    name?: string;
    onChange?: (content: string) => void;
    initialContent?: string;
    placement?: 'inside-bottom' | 'inside-top' | 'outside-bottom' | 'outside-top';
    className?: string;
};

export default function RichTextEditor({
    name,
    onChange,
    initialContent,
    placement = 'outside-top',
    className,
}: TextEditorProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            Link.configure({
                openOnClick: true, // Mở link trong tab mới khi click
                autolink: true, // Tự động chuyển đổi URL thành link
                linkOnPaste: true, // Tự động tạo link khi dán URL
                HTMLAttributes: {
                    class: 'text-blue-500 underline',
                },
            }),
        ],
        content: initialContent,
        onUpdate: ({ editor }) => {
            if (inputRef.current) inputRef.current.value = editor.getHTML();
            if (typeof onChange === 'function') onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: cn(
                    'min-h-[150px] max-h-[300px] h-[300px] overflow-auto cursor-text rounded-md border py-2 px-3 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 tiptap',
                    placement === 'inside-top' ? 'pt-10' : placement === 'inside-bottom' ? 'pb-10' : '',
                    className
                ),
            },
        },
        immediatelyRender: false,
    });

    return (
        <div className={clsx('relative', placement.startsWith('outside') ? 'py-10' : '')}>
            <div
                className={clsx(
                    'z-10 absolute left-0',
                    placement.includes('top') ? 'top-0' : placement.includes('bottom') ? 'bottom-0' : ''
                )}
            >
                <TextEditorMenuBar editor={editor} />
            </div>
            <EditorContent editor={editor} />
            <input ref={inputRef} name={name} type="text" className="hidden" />
        </div>
    );
}
