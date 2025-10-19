import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

function ChatPage() {
  const {logout} = useAuthStore();
  return (
    <div className='flex flex-col space-y-4'>
    <div className='text-6xl font-bold text-white'>
      ChatPage<br/>
    </div>
    <button 
    className='z-10 text-xl btn btn-primary'
    onClick={logout}>
      Logout
    </button>
    
    </div>
  )
}

export default ChatPage