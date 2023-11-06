import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function Profile() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUsers();
    })
    return (
        <table>
            <tbody>
                {users && users.map(user =>
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.rating}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Profile