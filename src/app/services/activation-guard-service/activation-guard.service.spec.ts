import { TestBed } from '@angular/core/testing';

import { ActivationGuardService } from './activation-guard.service';

describe('ActivationGuardService', () => {
	let service: ActivationGuardService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ActivationGuardService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
