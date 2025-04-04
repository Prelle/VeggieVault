import '../App.css';
import PopsicleStickButton from '../components/PopsicleSticks';
import plantData from '../../../server/src/seeds/plantData.json';

const HomePage = () => {
  // Flatten all varieties across all plants
  const allVarieties = plantData.flatMap((plant) =>
    plant.varieties.map((variety) => ({
      ...variety,
      plantType: plant.name, // still available if you want it later
    }))
  );
  return (
    <div className="main-container">
      <h2>Seed Box</h2>
      {allVarieties.map((variety, index) => {
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

export default HomePage;
