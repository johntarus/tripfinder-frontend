import {Trip} from '../../models/trip.interface';

export const DEFAULT_ERROR_TRIP: Trip = {
  id: 0,
  pickup: 'Error',
  dropoff: 'Error',
  type: '',
  requestDate: '',
  status: 'Error',
  distance: 0,
  duration: 0,
  fare: 0,
  driverName: '',
  driverRating: 0,
  pickUpTime: '',
  dropOffTime: '',
  carMake: '',
  carModel: '',
  carNumber: '',
  carPictureUrl: '',
  driverPicture: '',
  pickupLat: 0,
  pickupLng: 0,
  dropoffLat: 0,
  dropoffLng: 0
};
