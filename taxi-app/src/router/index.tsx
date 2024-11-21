import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NewRide from '../pages/NewRide';
import History from '../pages/History';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="new-ride" element={<NewRide />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
};

export default Router;
