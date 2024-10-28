import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn:any) => {
const [data, setdata] = useState<Models.Document[]>();  
const [isLoading, setisLoading] = useState(false)

   const fetchData = async () =>{
    setisLoading(true)
    try {
      const response = await fn();

      setdata(response)
    } catch (error:any) {
      Alert.alert("Fetch Data", error.message)
    }

    setisLoading(false)
   }

  useEffect(() => {
    fetchData();
  }, [])
  
  
  const refetch = () => fetchData();

  return {data, isLoading, refetch};
}

export default useAppwrite;