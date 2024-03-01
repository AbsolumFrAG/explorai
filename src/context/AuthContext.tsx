import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProviderProps, AuthContextType } from "../types/AuthContextTypes";
import { auth } from "../utils/firebaseConfig";

const defaultAuthContext: AuthContextType = {
    user: null,
    loading: true,
    error: null,
    createUser: async () => {
        throw new Error("Une erreur est survenue à la création de l'utilisateur");
    },
    signIn: async () => {
        throw new Error("Une erreur est survenue à la connexion de l'utilisateur");
    },
    logout: async () => {
        throw new Error("Une erreur est survenue à la déconnexion de l'utilisateur");
    },
    setError: () => { },
    clearError: () => { },
};

const UserContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider
            value={{
                createUser,
                user,
                logout,
                signIn,
                loading,
                error,
                clearError,
                setError
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};