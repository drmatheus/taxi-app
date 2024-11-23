import { Request, Response } from 'express';
import rideListService from '../../services/ride/list';
import { ListRideDTO } from '../../dtos/ride/listRideDTO';

async function rideListController(req: Request, res: Response) {
  const rideData = res.locals as ListRideDTO;

  const rides = await rideListService(rideData);

  return res.status(200).json(rides);
}

export default rideListController;
