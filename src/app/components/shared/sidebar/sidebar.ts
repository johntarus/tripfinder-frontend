import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    NgIf,
    NgClass,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  constructor(private router: Router) {}

  // Check if a route is active
  isActive(path: string): boolean {
    const current = this.router.url;
    // Home is active if route is "/" or "/dashboard"
    if (path === '/') {
      return current === '/' || current === '/dashboard';
    }
    return current === path;
  }

  // Return color class for active/inactive
  getColorClass(path: string): string {
    return this.isActive(path) ? 'text-purple-400' : 'text-gray-400';
  }

  // Return border indicator for active route
  showIndicator(path: string): boolean {
    return this.isActive(path);
  }
}
