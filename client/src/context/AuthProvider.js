import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ auth: user, setAuth: setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;