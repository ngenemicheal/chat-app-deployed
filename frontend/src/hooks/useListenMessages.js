import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useCoversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/msg-notify.mp3';

export default function useListenMessages() {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useCoversation();

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off('newMessage');
    }, [socket, setMessages, messages]);
}
