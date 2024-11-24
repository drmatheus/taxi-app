import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NewRide from '../pages/EstimateRide';
import History from '../pages/RideHistory';
import WelcomeCard from '../components/Home/welcomeCard';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<WelcomeCard />} />
        <Route path="new-ride" element={<NewRide />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
};

export default Router;
