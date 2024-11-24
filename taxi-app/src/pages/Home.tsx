import { Outlet } from 'react-router-dom';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import Container from '../components/layout/container';
import { RideProvider } from '../context/ride';
import EstimateRideForm from '../components/Home/estimateRideForm';

const Home = () => {
  return (
    <main className="flex flex-col gap-8 min-h-screen bg-gray-200 ">
      <RideProvider>
        <Header />
        <Container>
          <aside className="w-full">
            <EstimateRideForm />
          </aside>
          <div className="md:col-span-2 lg:col-span-3 ">
            <Outlet />
          </div>
        </Container>

        <Footer />
      </RideProvider>
    </main>
  );
};

export default Home;
