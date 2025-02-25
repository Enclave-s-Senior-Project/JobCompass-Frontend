import { Editor } from '@tiptap/react';
import { Button } from '../ui/button';
import { Fragment } from 'react';
import { Separator } from '../ui/separator';
import { ALargeSmall, Bold, Italic, Link, Strikethrough, Underline } from 'lucide-react';
import { PiListNumbers } from 'react-icons/pi';
import { IoListOutline } from 'react-icons/io5';

export default function TextEditorMenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    const toggleLink = () => {
        if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run(); // Gỡ bỏ link nếu đã có
        } else {
            const url = prompt('Enter the URL'); // Hiển thị prompt để nhập link mới
            if (url) {
                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
        }
    };

    const buttons = [
        {
            icon: <Bold className="size-5" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
        },
        {
            icon: <Italic className="size-5" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
        },
        {
            icon: <Underline className="size-5" />,
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive('underline'),
        },
        {
            icon: <Strikethrough className="size-5" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive('strike'),
            isSeparate: true,
        },
        {
            icon: <Link className="size-5" />,
            onClick: toggleLink,
            isActive: editor.isActive('link'),
            isSeparate: true,
        },
        {
            icon: <IoListOutline className="size-5" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
        },
        {
            icon: <PiListNumbers className="size-5" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
        },
        {
            icon: <ALargeSmall className="size-5" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive('heading', { level: 1 }),
        },
    ];

    return (
        <div className="m-0.5 flex items-center gap-0.5">
            {buttons.map(({ icon, onClick, isActive, isSeparate }, index) => (
                <Fragment key={index}>
                    <Button
                        type="button"
                        key={index}
                        onClick={onClick}
                        variant={isActive ? 'primary' : 'ghost'}
                        size="icon-md"
                        className="shadow-none"
                    >
                        {icon}
                    </Button>
                    {isSeparate && <Separator orientation="vertical" className="h-5 " />}
                </Fragment>
            ))}
        </div>
    );
}
