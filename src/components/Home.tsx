import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Fit.Solo</h1>
      <p>Your personal guide to building a strong, clean body.</p>
      <p>Discover exercises tailored to your fitness journey, no gym required.</p>
      <Link to="/exercises" className="cta-button">Start Your Solo Fitness Journey</Link>
    </div>
  );
};

export default Home;