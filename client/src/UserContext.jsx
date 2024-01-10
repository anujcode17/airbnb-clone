import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});


export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get('/profile');
            // Assuming the user information is in response.data
            setUser(response.data);
          } catch (error) {
            // Handle errors, e.g., log them or set an error state
            console.error('Error fetching user profile:', error.message);
          }
        };
    
        // Only fetch the profile if user is not already set
        if (!user) {
          fetchUserProfile();
        }
      }, [user]); // Include user in the dependency array if you want to re-fetch when user changes
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    );
}