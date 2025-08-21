export interface Trip {
  id: number;
  pickup: string;
  dropoff: string;
  type: string;
  requestDate: string;
  status: string;
  distance: number;
  duration: number;
  fare: number;

  driverName: string;
  driverRating: number;
  pickUpTime: string;
  carMake: string;
  carModel: string;
  carNumber: string;

  carPictureUrl: string;
  driverPicture: string;

  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
}
