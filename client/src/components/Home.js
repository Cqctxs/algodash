import React from 'react'
import { Link } from "react-router-dom";
import useLogout from '../hooks/useLogout';

function Home() {
  const logout = useLogout();

  const signOut = async () => {
    await logout();
  }
  return (
    <section>
        <div>Home</div>
        <Link to="/play">Play!</Link>
        <br/>
        <Link to="/problems">Problems</Link>
        <br/>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/users">Users</Link>
        <br/>
        <Link to="/profile">Profile</Link>
        <br/>
        <button onClick={signOut}>Sign Out</button>
    </section>
  )
}

export default Home