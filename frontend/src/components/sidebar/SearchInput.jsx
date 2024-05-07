import React, { useState } from 'react';
import {IoSearchSharp} from 'react-icons/io5';
import useCoversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const {setSelectedConversation} = useCoversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    if (searchTerm.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }
    
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);

      setSearchTerm('');
    } else toast.error('No user found');
  }
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white' >
            <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}
