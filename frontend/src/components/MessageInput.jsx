import { ImageIcon,SendIcon } from 'lucide-react'

const MessageInput = () => {
  return (
    <div className='p-6 flex justify-center  gap-2'>
       <input type="text" placeholder="Type here" className="input input-bordered w-full flex-1" /> 
       <button className='btn bg-cyan-500 text-slate-100 hover:bg-cyan-800 transition-all'>
         <ImageIcon className='text-slate-800'/>
       </button>
       <button className='btn bg-green-600 text-slate-100 hover:bg-green-800 transition-all'>
         <SendIcon className='text-white'/>
       </button>
    </div>
  )
}

export default MessageInput