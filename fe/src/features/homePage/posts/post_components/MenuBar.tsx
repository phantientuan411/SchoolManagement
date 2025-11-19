import { Bold } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

interface ET {
    editor: Editor
}

const MenuBar: React.FC<ET> = ({ editor }) => {
    const [active, setActive] = useState(false);

    if (!editor) return null;

    const handleBoldClick = () => {
        editor.chain().focus().toggleBold().run();
        setActive(!active); // toggle màu nút
    }

    return (
        <div className='flex gap-4'>
            <div>
                <button
                    onClick={handleBoldClick}
                    className={`btnInMenu p-2 rounded border-1 hover:bg-gray-300 transition-colors duration-150
                        ${active ? 'bg-gray-300 border-2' : 'bg-white border-1'}`}
                    title='Bold (Ctrl+B)'
                >
                    <Bold size={20} />
                </button>
            </div>
        </div>
    )
}

export default MenuBar;
