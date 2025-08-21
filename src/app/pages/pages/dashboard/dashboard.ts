import { Component } from '@angular/core';
import {Sidebar} from '../../../components/shared/sidebar/sidebar';
import {TripsOverTime} from './components/trips-over-time/trips-over-time';
import {LatestTrips} from './components/latest-trips/latest-trips';
import {TopDestinations} from './components/top-destinations/top-destinations';
import {Header} from '../../../components/shared/header/header';

@Component({
  selector: 'app-dashboard',
  imports: [
    TripsOverTime,
    LatestTrips,
    TopDestinations,
    TripsOverTime,
    Sidebar,
    Header
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
