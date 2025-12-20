import {SimpleEditor} from '../../../@/components/tiptap-templates/simple/simple-editor.tsx'

const NewPost = () => {
  return (
    <div className='w-full h-auto flex flex-col'>
      <h2 className='pl-10 font-bold text-3xl'>New doc</h2>
      <SimpleEditor />
    </div>
  )
}

export default NewPost