import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth';

function Profile() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();``
    const { auth } = useAuth();
    const [user, setUser] = useState();


    useEffect(() => {
        if (auth?.user) {
            const getProfile = async () => {
                try {
                    const response = await axiosPrivate.get(`/users/${auth.user}`);
                    setUser(response.data);
                } catch (error) {
                    console.error(error);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            };

            getProfile();
        }
    }, [auth]);

    if (!auth) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {user.username} {user.rating}
        </div>
    )
}

export default Profile