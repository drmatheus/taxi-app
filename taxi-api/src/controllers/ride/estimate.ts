import { Request, Response } from 'express';
import { EstimateRideDTO } from '../../dtos/ride/estimateRideDTO';
import rideEstimateService from '../../services/ride/estimate';

async function rideEstimateController(req: Request, res: Response) {
  const rideData = res.locals as EstimateRideDTO;

  const ride = await rideEstimateService(rideData);

  return res.status(200).json(ride);
}

export default rideEstimateController;
