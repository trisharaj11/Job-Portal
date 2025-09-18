import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const backendURL=import.meta.env.VITE_BACKEND_URL
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin,setshowRecruiterLogin]=useState(false)

  const [companyToken,setcompanyToken]=useState(null)

  const[companyData,setcompanyData]=useState(null)

  // Function to fetch job data
  const fetchJobs = async () => {
   
      setJobs(jobsData);
  
  };

  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array: runs once on mount

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
    backendURL
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
