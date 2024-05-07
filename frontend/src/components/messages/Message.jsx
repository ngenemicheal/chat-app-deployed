import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useCoversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

export default function Message({message}) {

  const {authUser} = useAuthContext();
  const {selectedConversation} = useCoversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePicture : selectedConversation.profilePicture;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt='chatBubble' />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center' >{formattedTime}</div>
    </div>
  )
}
