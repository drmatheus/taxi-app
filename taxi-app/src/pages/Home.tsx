import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul>
          <li>
            <a href="/new-ride">New Ride</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
        </ul>
      </nav>

      {/* Outlet para renderizar as rotas filhas */}
      <Outlet />
    </div>
  );
};

export default Home;
