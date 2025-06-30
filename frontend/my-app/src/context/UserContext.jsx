import React, { createContext, useState, useEffect } from 'react';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

export const UserContext = createContext(); 

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    localStorage.removeItem('token'); 
                    setUser(null);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;