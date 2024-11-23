import { Router } from 'express';
import { validatePayload } from '../../../middlewares/validatePayload';
import {
  ConfirmRideDTO,
  EstimateRideDTO,
  ListRideDTO,
} from '../../../dtos/ride';
import {
  rideConfirmController,
  rideEstimateController,
  rideListController,
} from '..';

const rideRouter = Router();

rideRouter.post(
  '/estimate',
  validatePayload(EstimateRideDTO),
  rideEstimateController
);
rideRouter.patch(
  '/confirm',
  validatePayload(ConfirmRideDTO),
  rideConfirmController
);
rideRouter.get(
  '/:customer_id',
  validatePayload(ListRideDTO),
  rideListController
);

export default rideRouter;
