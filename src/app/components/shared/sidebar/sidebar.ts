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

  isActive(path: string): boolean {
    const current = this.router.url;
    if (path === '/') {
      return current === '/' || current === '/dashboard';
    }
    return current === path;
  }

  showIndicator(path: string): boolean {
    return this.isActive(path);
  }
}
