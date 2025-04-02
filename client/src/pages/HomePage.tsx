import '../App.css';
import PopsicleStickButton from '../components/PopsicleSticks';


const HomePage = () => {
  return (
    <div className="main-container">
      <h2>Seed Box</h2>
      <div>
        <PopsicleStickButton  title="Basil" />
        <PopsicleStickButton title="Tomato" />
        <PopsicleStickButton title="Carrot" />
      </div>
 
    </div>
  );
}

export default HomePage;