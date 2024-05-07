import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext'

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();

    const login = async ({username, password}) => {
        const success = handleInputErrors({username, password})

        if (!success) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password})
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }
            
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    function handleInputErrors({username, password}){
        if (!username || !password) {
            toast.error('All fields are required');
            return false;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

  return {loading, login}
}
