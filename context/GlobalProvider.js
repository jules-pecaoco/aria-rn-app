import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";

export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

// NEED TO LEARN THIS

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((res) => {
       if(res){
        setIsLoggedIn(true);
        setUser(res);
       }else{
        setIsLoggedIn(false);
        setUser(null);
       }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false);  
    });
  }, []);

  return <GlobalContext.Provider 
    value={{
    isLoggedIn,
    user,
    isLoading,
    setIsLoggedIn,
    setUser,
    setIsLoading
  }}>{children}</GlobalContext.Provider>;
};


export default GlobalProvider;