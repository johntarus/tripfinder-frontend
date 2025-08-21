export interface Trip {
  id: string;
  date: string;
  time: string;
  status: 'Complete' | 'Canceled';
  rating: number; // 0-5, 0 means no rating
  startLocation: string;
  endLocation: string;
  price: number;
  distance: string;
  backgroundImage: string;
}
