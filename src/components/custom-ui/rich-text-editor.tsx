import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import TextEditorMenuBar from './text-editor-apply-job';

type TextEditorProps = {
    onChange: (content: string) => void;
    initialContent?: string;
};

export default function RichTextEditor({ onChange, initialContent }: TextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
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
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'min-h-[150px] max-h-[300px] h-[300px] overflow-auto cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 tiptap',
            },
        },
        immediatelyRender: false,
    });

    return (
        <div>
            <TextEditorMenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
