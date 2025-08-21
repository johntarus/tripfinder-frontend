import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgForOf, NgIf } from '@angular/common';
import {Header} from '../header/header';

describe('HeaderComponent', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, NgIf, NgForOf]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display title when no filters are provided', () => {
    component.title = 'Test Title';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain('Test Title');
  });

  it('should display filters when provided', () => {
    component.filters = ['Today', 'Week', 'Month'];
    fixture.detectChanges();

    const filterElements = fixture.debugElement.queryAll(By.css('.bg-gray-700'));
    expect(filterElements.length).toBe(3);

    filterElements.forEach((filter, index) => {
      expect(filter.nativeElement.textContent).toContain(component.filters![index]);
    });
  });

  it('should show back button when showBackButton is true', () => {
    component.showBackButton = true;
    fixture.detectChanges();

    const backButton = fixture.debugElement.query(By.css('button'));
    expect(backButton).toBeTruthy();
  });

  it('should hide back button when showBackButton is false', () => {
    component.showBackButton = false;
    fixture.detectChanges();

    const backButton = fixture.debugElement.query(By.css('button'));
    expect(backButton).toBeNull();
  });

  it('should emit backClick event when back button is clicked', () => {
    component.showBackButton = true;
    fixture.detectChanges();

    spyOn(component.backClick, 'emit');
    const backButton = fixture.debugElement.query(By.css('button'));
    backButton.triggerEventHandler('click', null);

    expect(component.backClick.emit).toHaveBeenCalled();
  });

  it('should emit removeFilter event when filter close button is clicked', () => {
    component.filters = ['Today', 'Week'];
    fixture.detectChanges();

    spyOn(component.removeFilter, 'emit');
    const closeButtons = fixture.debugElement.queryAll(By.css('.w-4.h-4'));

    closeButtons[0].triggerEventHandler('click', null);

    expect(component.removeFilter.emit).toHaveBeenCalledWith('Today');
  });

  it('should show search bar when showSearchBar is true', () => {
    component.showSearchBar = true;
    fixture.detectChanges();

    const searchBar = fixture.debugElement.query(By.css('.bg-gray-900'));
    expect(searchBar).toBeTruthy();
  });

  it('should hide search bar when showSearchBar is false', () => {
    component.showSearchBar = false;
    fixture.detectChanges();

    const searchBar = fixture.debugElement.query(By.css('.bg-gray-900'));
    expect(searchBar).toBeNull();
  });

  it('should display avatar section', () => {
    const avatar = fixture.debugElement.query(By.css('.bg-yellow-400'));
    expect(avatar).toBeTruthy();
  });

  describe('Edge Cases', () => {
    it('should handle empty filters array', () => {
      component.filters = [];
      fixture.detectChanges();

      const filterElements = fixture.debugElement.queryAll(By.css('.bg-gray-700'));
      expect(filterElements.length).toBe(0);

      // Should show title instead
      const titleElement = fixture.debugElement.query(By.css('h1'));
      expect(titleElement).toBeTruthy();
    });

    it('should handle undefined filters', () => {
      component.filters = undefined;
      component.title = 'Test Title';
      fixture.detectChanges();

      const filterElements = fixture.debugElement.queryAll(By.css('.bg-gray-700'));
      expect(filterElements.length).toBe(0);

      // Should show title
      const titleElement = fixture.debugElement.query(By.css('h1'));
      expect(titleElement.nativeElement.textContent).toContain('Test Title');
    });

    it('should handle undefined title', () => {
      component.title = undefined;
      component.filters = ['Today'];
      fixture.detectChanges();

      const filterElements = fixture.debugElement.queryAll(By.css('.bg-gray-700'));
      expect(filterElements.length).toBe(1);

      const titleElement = fixture.debugElement.query(By.css('h1'));
      expect(titleElement).toBeNull();
    });
  });
});
