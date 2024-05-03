import { createContext, useEffect, useState, useContext } from "react";
import { ReactNode } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicator";
type User = {
    name: string
    email: string
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name:string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [user, setUser] = useState<User | null> (null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        // fetch if user's cookies are valid then skip login
        async function checkStaus() {
            const data = await checkAuthStatus();
            if(data){
                setUser({ email: data.email, name: data.name})
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
        }
        checkStaus()
    }, []);

    const login = async (email: string, password: string) => {
        // login
        const data = await loginUser(email, password);
        if(data){
            setUser({ email: data.email, name: data.name})
            setIsLoggedIn(true)
        }
    }

    const signup = async (name: string, email: string, password: string) => {
        // signup
        const data = await signupUser(name,email, password);
        if(data){
            setUser({ email: data.email, name: data.name})
            setIsLoggedIn(true)
        }
    }

    const logout = async() =>{
        // logout
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null)
        window.location.reload();
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup
    };

    return <AuthContext.Provider value={value} >{children} </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)