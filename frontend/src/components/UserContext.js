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
                const windowUrl = window.location.search;
                const params = new URLSearchParams(windowUrl);
                console.log(params.get('accesstoken')); // remove later
                const accesstoken = params.get('accesstoken')
                const res = await Axios.get(`https://pet-shelter-api.uw.r.appspot.com/getProfile?accesstoken=${accesstoken}`, { withCredentials: true} )
                //const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/getProfile", { withCredentials: true} )
                console.log(res.data); // remove after testing
                if (res.data) {
                    setUser(res.data)
                    //localStorage.setItem('user', JSON.stringify(res.data))
                    sessionStorage.setItem('user', JSON.stringify(res.data))
                    window.location.reload();
                }
            }
            // if (localStorage.getItem('user')) {
            //     setUser(JSON.parse(localStorage.getItem('user')))
            if (sessionStorage.getItem('user')) {
                setUser(JSON.parse(sessionStorage.getItem('user')))
            } else {
                fetchUser();
            }
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