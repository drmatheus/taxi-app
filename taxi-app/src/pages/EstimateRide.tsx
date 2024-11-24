import ListRideOptions from '../components/NewRide/listRideOptions';
import RideInfo from '../components/NewRide/rideInfo';
import NoRideEstimated from '../components/NewRide/noRideEstimated';

const NewRide = () => {
  return (
    <>
      <RideInfo />
      <NoRideEstimated />
      <ListRideOptions />
    </>
  );
};

export default NewRide;
