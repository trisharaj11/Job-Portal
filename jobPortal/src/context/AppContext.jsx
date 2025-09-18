import { createContext, useEffect, useState } from "react";
//import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser,useAuth } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const backendURL=import.meta.env.VITE_BACKEND_URL
  const {user}=useUser()
  const {getToken}=useAuth()
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin,setshowRecruiterLogin]=useState(false)

  const [companyToken,setcompanyToken]=useState(null)

  const[companyData,setcompanyData]=useState(null)
  const[userData,setUserData]=useState(null)
  const[userApplications,setuserApplications]=useState([])
  
  //fetch user data from api
  const fetchUserData=async()=>{
    try {
      const token=await getToken()

      const{data}=await axios.get(backendURL+'/api/users/user'
        ,{headers:{Authorization:`Bearer ${token}`}})

        if(data.success){
          
         console.log("Fetched user:", data.user);  
          setUserData(data.user)
          
         //console.log("Fetched user:", data.user);  
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //func to fetch users applied app data
  const getUserApplicationsData=async()=>{
     try {
      const token=await getToken()
      const{data}=await axios.get(backendURL+'/api/users/applications',
        {headers:{Authorization:`Bearer ${token}`}}
      )
       //console.log("Raw /applications response:", data); // 👈 log full response

      if(data.success){
        setuserApplications(data.application)
        //console.log("Fetched applications:", data.applications) // 👈 add this
        //toast.success(data.message)
      }else{
        toast.error(data.message)
      }
     } catch (error) {
        toast.error(error.message)
     }
  }

  // Function to fetch job data
  const fetchJobs = async () => {
    try {
      const {data}=await axios.get(backendURL+'/api/jobs')
      if(data.success){
        setJobs(data.jobs)
        console.log(data.jobs)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
   
  
  }

  //func to fetch com data
  const fetchCompanyData=async()=>{
    try {
      const {data}=await axios.get(backendURL+'/api/company/company',{headers:{token:companyToken}})

      if(data.success){
        setcompanyData(data.company)
        console.log(data);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchJobs()
    const storeCompanyToken=localStorage.getItem('companyToken')
    if(storeCompanyToken){
      setcompanyToken(storeCompanyToken)
    }
  }, []) // Empty dependency array: runs once on mount

  useEffect(()=>{
       if(companyToken){
        fetchCompanyData()
       }
  },[companyToken])

  useEffect(()=>{
    if(user){
      fetchUserData()
      getUserApplicationsData()
    }
  },[user])

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setshowRecruiterLogin,
    companyToken,
    setcompanyToken,
    companyData,
    setcompanyData,
    backendURL,
    userData,
    setUserData,
    userApplications,
    setuserApplications,
    fetchUserData,
    getUserApplicationsData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
