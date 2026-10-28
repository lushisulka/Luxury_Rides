import { createContext, useContext, useState, useEffect } from "react";
import { login_user_service, register_user_service, logout_user_service, checkAuth_user_service } from "../Services/authServices";

const AuthContext = createContext({})
const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState([]);
    const [trigger, setTrigger] = useState([]);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        checkAuthUser();
    }, [trigger]);

    const login = async (data) => {
        try {
            const result = await login_user_service(data);
            if (result.status === 201) {
                setAuthUser(result.data);
                setIsAuthChecked(true);
            }
            return result;
        } catch (error) {
            throw error.response.data;
        }
    }

    const register = async (data) => {
        try {
            const result = await register_user_service(data);
            if (result.status === 201) {
                setAuthUser(result.data);
            }
            return result;
        } catch (error) {
            throw error.response.data
        }
    }

    const logout = async (id, data) => {
        try {
            const result = await logout_user_service();
            if (result.data.status === 201) {
                setAuthUser({});
                setTrigger(!trigger);
            }
        } catch (error) {
            return error
        }
    }

    const checkAuthUser = async () => {
        try {
            const result = await checkAuth_user_service();
            if (result.status === 200) {
                setAuthUser(...result.data);
            } else {
                setAuthUser({});
            }
            return result;
        } catch (error) {
            setAuthUser({});
            return error;
        } finally {
            setIsAuthChecked(true);
        }
    }


    const values = {
        login,
        register,
        logout,
        authUser,
        isAuthChecked,
        showLogin,
        setShowLogin
    };

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>)
}

const useAuthContext = () => { return useContext(AuthContext) };
export { AuthProvider, useAuthContext };