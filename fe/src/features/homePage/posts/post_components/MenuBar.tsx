import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Code, List, ListOrdered,
    Quote, Undo, Redo, AlignLeft,
    AlignCenter, AlignRight, AlignJustify, Highlighter,
    Link as LinkIcon
} from 'lucide-react';
import { Editor } from '@tiptap/react';

interface ET{
    editor:Editor
}
const MenuBar = ({ editor }: { editor: ET }) => {
    if(!editor) return null;
    const setLink=()=>{
        const url=window.prompt("nhap link");
        if(!url) {
        editor.chain().setLink({ href: url }).run();
    }}
    return (
        <div className='flex gap-4'>
            <button>
                <Bold />
            </button>
        </div>
    )
}

export default MenuBar