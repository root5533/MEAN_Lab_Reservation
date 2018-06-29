import { TestBed, inject } from '@angular/core/testing';

import { CalendarEventsService } from './calendar-events.service';

describe('CalendarEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarEventsService]
    });
  });

  it('should be created', inject([CalendarEventsService], (service: CalendarEventsService) => {
    expect(service).toBeTruthy();
  }));
});
