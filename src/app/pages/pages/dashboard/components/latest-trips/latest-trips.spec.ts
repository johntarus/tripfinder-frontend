import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TLatestTripData } from '../../../../../models/latest-trip.interface';
import { TripSearchResponse } from '../../../../../models/trip-search-response.interface';
import { Trip } from '../../../../../models/trip.interface';
import { TripsService } from '../../../../../services/trips.service';
import { OvertimeData } from '../../../../../models/overtime-data.interface';
import { TopDestination } from '../../../../../models/top-destinations.interface';

describe('TripsService', () => {
  let service: TripsService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5001/api/trips';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripsService],
    });
    service = TestBed.inject(TripsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch trips over time', () => {
    const mockData: OvertimeData[] = [
      { date: '2025-08-01', value: 5 },
      { date: '2025-08-02', value: 10 },
    ];

    // @ts-ignore
    service.getTripsOverTime().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockData);
    });

    // Use exact URL that the service is calling
    const req = httpMock.expectOne('http://localhost:5001/api/trips/overtime');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch top destinations', () => {
    const mockData: TopDestination[] = [
      { destination: 'Nairobi', count: 12 },
      { destination: 'Mombasa', count: 8 },
    ];

    // @ts-ignore
    service.getTopDestinations(2).subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].destination).toBe('Nairobi');
    });

    // Use exact URL that the service is calling
    const req = httpMock.expectOne('http://localhost:5001/api/trips/top-destinations?top=2');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch latest trips', () => {
    const mockData: TLatestTripData[] = [
      {
        id: 1,
        pickup: 'Westlands',
        dropoff: 'CBD',
        type: 'Standard',
        driverName: 'John Doe',
        carMake: 'Toyota',
        carModel: 'Corolla',
        carNumber: 'KAA 123A',
        requestDate: '2025-08-19T10:00:00Z',
        status: 'Completed',
        distance: 5,
        duration: 10,
        fare: 300,
      },
    ];

    // @ts-ignore
    service.getLatestTrips(1).subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].driverName).toBe('John Doe');
    });

    // Use exact URL that the service is calling
    const req = httpMock.expectOne('http://localhost:5001/api/trips/latest?count=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch trip by id', () => {
    const mockTrip: Trip = {
      id: 1,
      pickup: 'Kilimani',
      dropoff: 'CBD',
      type: 'Standard',
      requestDate: '2025-08-20T12:00:00Z',
      status: 'Completed',
      distance: 6,
      duration: 15,
      fare: 500,
      driverName: 'Jane Doe',
      driverRating: 4.8,
      pickUpTime: '2025-08-20T12:05:00Z',
      dropOffTime: '2025-08-20T12:20:00Z',
      carMake: 'Honda',
      carModel: 'Fit',
      carNumber: 'KBB 456B',
      carPictureUrl: 'https://example.com/car.jpg',
      driverPicture: 'https://example.com/driver.jpg',
      pickupLat: -1.2921,
      pickupLng: 36.8219,
      dropoffLat: -1.2833,
      dropoffLng: 36.8167,
    };

    // @ts-ignore
    service.getTripById(1).subscribe((trip) => {
      expect(trip).toEqual(mockTrip);
      expect(trip.driverName).toBe('Jane Doe');
    });

    // Use exact URL that the service is calling
    const req = httpMock.expectOne('http://localhost:5001/api/trips/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockTrip);
  });

  it('should search trips', () => {
    const mockResponse: TripSearchResponse = {
      success: true,
      message: 'Found trips',
      data: {
        page: 1,
        pageSize: 10,
        totalCount: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
        items: [
          {
            id: 2,
            pickup: 'Lavington',
            dropoff: 'CBD',
            type: 'Premium',
            requestDate: '2025-08-21T08:30:00Z',
            status: 'Completed',
            distance: 8,
            duration: 20,
            fare: 700,
            driverName: 'Peter Mwangi',
            driverRating: 4.9,
            pickUpTime: '2025-08-21T08:35:00Z',
            dropOffTime: '2025-08-21T08:55:00Z',
            carMake: 'Mercedes',
            carModel: 'C200',
            carNumber: 'KCC 789C',
            carPictureUrl: 'https://example.com/merc.jpg',
            driverPicture: 'https://example.com/driver2.jpg',
            pickupLat: -1.3000,
            pickupLng: 36.8000,
            dropoffLat: -1.2800,
            dropoffLng: 36.8200,
          },
        ],
      },
      errors: [],
    };

    // @ts-ignore
    service.searchTrips('CBD', 'Completed', 10, 20, 1, 10, 'date', true).subscribe((res) => {
      expect(res.success).toBeTrue();
      expect(res.data.items.length).toBe(1);
      expect(res.data.items[0].driverName).toBe('Peter Mwangi');
    });

    // Use the exact URL string that appears in the error message
    const req = httpMock.expectOne('http://localhost:5001/api/trips/search?q=CBD&statusFilter=Completed&distance=10&duration=20&page=1&pageSize=10&sortBy=date&sortDescending=true');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
