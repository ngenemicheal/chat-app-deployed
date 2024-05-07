import React, { useEffect, useState } from 'react'
import useCoversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

export default function useGetMessages() {

    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useCoversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/message/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (selectedConversation?._id) {
            getMessages();
        }

    }, [selectedConversation?._id, setMessages]);

  return {loading, messages};
}
