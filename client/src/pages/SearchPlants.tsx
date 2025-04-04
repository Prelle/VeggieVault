import Auth from "../utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SearchPlants = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Check if the user is authenticated
        if (!Auth.loggedIn()) {
            // If not authenticated, redirect to the login page
            navigate('/login');
        }
    },[])

  return (
    <div>
      <h1>Search Plants</h1>
      <p>This is the Search Plants page.</p>
    </div>
  );
}

export default SearchPlants;