import React, {createContext, useContext, useEffect, useState} from 'react';
import Axios from 'axios';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            async function fetchUser() {
                const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/getProfile", { withCredentials: true })
                console.log(res.data); // remove after testing
                if (res.data) {
                    setUser(res.data)
                }
            }
            fetchUser();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}