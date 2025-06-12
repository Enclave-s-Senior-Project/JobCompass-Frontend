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
    onChange?: (content: string, nameInput?: string) => void;
    initialContent?: string;
    placement?: 'inside-bottom' | 'inside-top' | 'outside-bottom' | 'outside-top';
    className?: string;
    hasError?: boolean;
    value?: string;
    disabled?: boolean;
};

export default function RichTextEditor({
    value,
    name,
    onChange,
    initialContent,
    placement = 'outside-top',
    className,
    hasError = false,
    disabled,
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
                openOnClick: true,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'text-blue-500 underline',
                },
            }),
        ],
        content: value ?? initialContent,
        onUpdate: ({ editor }) => {
            if (inputRef.current) inputRef.current.value = editor.getHTML();
            if (typeof onChange === 'function') onChange(editor.getHTML(), name);
        },
        editorProps: {
            attributes: {
                class: cn(
                    'focus-visible:ring-primary min-h-[150px] max-h-[300px] h-[300px] overflow-auto rounded-md border py-2 px-3 ring-offset-background focus-within:outline-none focus-within:ring-2 shadow-sm',
                    placement === 'inside-top' ? 'pt-10' : placement === 'inside-bottom' ? 'pb-10' : '',
                    hasError ? 'border-2 border-danger focus:border-danger focus:ring-0' : 'border-input',
                    disabled ? 'border-gray-50 text-gray-400' : '',
                    className
                ),
            },
        },
        immediatelyRender: false,
    });

    return (
        <div
            className={clsx(
                'relative',
                placement === 'outside-bottom' ? 'pb-11' : placement === 'outside-top' ? 'pt-11' : '',
                disabled ? 'cursor-not-allowed' : 'pointer-events-auto'
            )}
        >
            <div
                className={clsx(
                    'absolute left-0 z-10',
                    placement.includes('top') ? 'top-0' : placement.includes('bottom') ? 'bottom-0' : '',
                    disabled ? 'pointer-events-none' : 'pointer-events-auto'
                )}
            >
                <TextEditorMenuBar editor={editor} />
            </div>
            <EditorContent
                editor={editor}
                disabled={disabled}
                className={cn(disabled ? 'pointer-events-none' : 'pointer-events-auto')}
            />
            <input
                disabled={disabled}
                ref={inputRef}
                name={name}
                value={value}
                onChange={() => {}}
                defaultValue={initialContent}
                type="text"
                className="hidden"
            />
        </div>
    );
}
