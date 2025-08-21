import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    NgForOf

  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() title?: string;
  @Input() showBackButton = false;
  @Input() filters?: string[];
  @Input() showSearchBar = false;
  @Output() backClick = new EventEmitter<void>();

  onBackClick() {
    this.backClick.emit();
  }
}
