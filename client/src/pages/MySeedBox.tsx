import '../App.css';
import PopsicleStickButton from '../components/PopsicleSticks';
import { useQuery } from "@apollo/client";
import { QUERY_TOP_PLANTS } from "../utils/queries";
import { Link, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import { useEffect } from "react";

const MySeedBox = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_TOP_PLANTS);

  useEffect(() => {
      // Check if the user is authenticated
      if (!Auth.loggedIn()) {
        // If not authenticated, redirect to the login page
        navigate("/login");
      }
    }, []);

  const plantData = data?.plants || [];

  const allVarieties = plantData.flatMap((plant: any) =>
    plant.varieties.map((variety: any) => ({
      ...variety,
      plantType: plant.name,
    }))
  );
  return (
    <div className="sub-container">
      <h2>My Seed Box</h2>

      <Link to="/search">
        <button className="add-seed-button">
          Add Seed
        </button>
      </Link>

      {loading ? (<div>Loading...</div>) :
        allVarieties.map((variety: any, index: any) => {
          const formattedTitle = `${(variety.variety)} ${(variety.plantType)}`;
          return (
            <PopsicleStickButton
              key={`${variety.variety}${index}`}
              title={formattedTitle}
            >
              <ul className="seed-packet-details">
                <li><strong>Seed Depth:</strong> {variety.seedDepth}</li>
                <li><strong>Seed Spacing:</strong> {variety.seedSpacing}</li>
                <li><strong>Water:</strong> {variety.waterRequirements}</li>
                <li><strong>Sunlight:</strong> {variety.sunlightRequirements}</li>
              </ul>
            </PopsicleStickButton>
          );
        })}
    </div>
  );
};

export default MySeedBox;
