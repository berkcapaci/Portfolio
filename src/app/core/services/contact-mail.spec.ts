import { TestBed } from '@angular/core/testing';
import { ContactMail } from './contact-mail';

describe('ContactMail', () => {
  let service: ContactMail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactMail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
