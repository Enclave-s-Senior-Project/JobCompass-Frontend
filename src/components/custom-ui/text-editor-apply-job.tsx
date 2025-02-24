import { RiBold, RiItalic, RiStrikethrough, RiListOrdered2 } from 'react-icons/ri';
import { Editor } from '@tiptap/react';
import { BsTypeUnderline } from 'react-icons/bs';
import { IoListOutline } from 'react-icons/io5';

const Button = ({
    onClick,
    isActive,
    disabled,
    children,
}: {
    onClick: () => void;
    isActive: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`p-2 ${isActive ? 'bg-violet-500 text-white rounded-md' : ''}`}
    >
        {children}
    </button>
);

export default function TextEditorMenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    const buttons = [
        {
            icon: <RiBold className="size-5" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
        },
        {
            icon: <BsTypeUnderline className="size-5" />,
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive('underline'),
        },
        {
            icon: <RiItalic className="size-5" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
        },
        {
            icon: <RiStrikethrough className="size-5" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive('strike'),
        },
        {
            icon: <IoListOutline className="size-5" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
        },
        {
            icon: <RiListOrdered2 className="size-5" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
        },
    ];

    return (
        <div className="mb-2 flex space-x-2">
            {buttons.map(({ icon, onClick, isActive }, index) => (
                <Button key={index} onClick={onClick} isActive={isActive}>
                    {icon}
                </Button>
            ))}
        </div>
    );
}
