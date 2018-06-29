import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollToCalendar() {
    const config: ScrollToConfigOptions = {
      target: 'calendar-scroll'
    };
    this._scrollToService.scrollTo(config);
  }

  public triggerScrollToLabs() {
    const config: ScrollToConfigOptions = {
      target: 'lab-scroll'
    };
    this._scrollToService.scrollTo(config);
  }

  public triggerScrollToUserReservations() {
    const config: ScrollToConfigOptions = {
      target: 'user-scroll'
    };
    this._scrollToService.scrollTo(config);
  }

  public triggerScrollToNavbar() {
    const config: ScrollToConfigOptions = {
      target: 'navbar-scroll'
    };
    this._scrollToService.scrollTo(config);
  }

}
