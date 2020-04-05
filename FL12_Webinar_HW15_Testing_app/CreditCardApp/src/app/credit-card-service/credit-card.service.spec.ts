import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });

  it('should return "Credit card has a valid format" when format is correct', () => {
    expect(service.testCreditCard('4111 1111 1111 1111', 'Visa')).toEqual({
      isValid: true,
      message: 'Credit card has a valid format'
    });
  });

  it('should return "Unknown card type" if credit card type is invalid', () => {
    expect(service.testCreditCard('3242 2334 1412 1523', 'Unknown type')).toEqual({
      isValid: false,
      message: 'Unknown card type'
    });
  });

  it('shold return "Credit card number is in invalid format" when format is incorrect', () => {
    expect(service.testCreditCard('3530 1113333', 'JCB')).toEqual({
      isValid: false,
      message: 'Credit card number is in invalid format'
    });
  });

  it('shold return "Credit card number is in invalid format" when code format has less than 13 digits ', () => {
    expect(service.testCreditCard('3530 1113 3330', 'JCB')).toEqual({
      isValid: false,
      message: 'Credit card number is in invalid format'
    });
  });

  it('shold return "Credit card number is in invalid format" when code format has more than 19 digits', () => {
    expect(service.testCreditCard('2014 0000 0000 0091 1111', 'enRoute')).toEqual({
      isValid: false,
      message: 'Credit card number is in invalid format'
    });
  });

  it('shold return "Credit card number is in invalid format" when code format contains other symbols or letters', () => {
    expect(service.testCreditCard('6334 0!*%0 0AA0 0004', 'Solo')).toEqual({
      isValid: false,
      message: 'Credit card number is in invalid format'
    });
  });

  it('shold return "Credit card number is invalid" when prefix is incorrect', () => {
    expect(service.testCreditCard('3100 0000 0000 04', 'CarteBlanche')).toEqual({
      isValid: false,
      message: 'Credit card number is invalid'
    });
  });

  it('shold return "Credit card number is invalid" when ten digits module is invalid ', () => {
    expect(service.testCreditCard('4903 0100 0000 0008', 'Switch')).toEqual({
      isValid: false,
      message: 'Credit card number is invalid'
    });
  });

  it('shold return "Warning! This credit card number is associated with a scam attempt"', () => {
    expect(service.testCreditCard('5490 9977 7109 2064', 'DinersClub')).toEqual({
      isValid: false,
      message: 'Warning! This credit card number is associated with a scam attempt'
    });
  });

  it('shold return "Credit card number has an inappropriate number of digits"', () => {
    expect(service.testCreditCard('3530 1113333000001', 'JCB')).toEqual({
      isValid: false,
      message: 'Credit card number has an inappropriate number of digits'
    });
  });



});
 