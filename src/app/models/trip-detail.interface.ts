export interface TripDetailInterface {
  id: string;
  date: string;
  time: string;
  status: 'Complete' | 'Canceled';
  rating: number;
  price: number;
  duration: string;
  distance: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  dropoffTime: string;
  mapImage: string;
  driver: {
    name: string;
    rating: number;
    avatar: string;
  };
  car: {
    makeModel: string;
    year: number;
    plate: string;
    color: string;
    image: string;
  };
}
