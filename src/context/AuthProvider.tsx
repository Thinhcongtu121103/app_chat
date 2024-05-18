import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component from Material-UI

// Define the type for the user object
interface User {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string;
}

// Define the type for the authentication context value
interface AuthContextValue {
    user: User | null;
}

// Create the authentication context
export const AuthContext = React.createContext<AuthContextValue>({ user: null });

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const navigation = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                const { displayName, email, photoURL, uid } = authUser;
                setUser({ displayName, email, photoURL, uid });
                setIsLoading(false);
                navigation('/'); // Redirect to "/"
            } else {
                setUser(null);
                setIsLoading(false);
                navigation('/login'); // Redirect to "/login"
            }
        });

        // Cleanup function to unsubscribe from onAuthStateChanged listener
        return () => {
            unsubscribe();
        };
    }, [navigation]); // Include navigation in the dependency array

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress /> {/* Render CircularProgress component */}
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
