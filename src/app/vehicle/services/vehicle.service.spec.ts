import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '../interfaces/vehicle.interface';

describe('VehicleService', () => {
    let service: VehicleService;
    let httpMock: HttpTestingController;
    const apiUrl =
        'https://gist.githubusercontent.com/josejbocanegra/17bb8c76405e43655d551a90800c8a81/raw/d41b4acc3457e51e7533fad6d5e9925ee9676457/202212_MISW4104_Grupo1.json';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VehicleService,
                provideHttpClient(),
                provideHttpClientTesting(),
                provideZonelessChangeDetection(),
            ],
        });
        service = TestBed.inject(VehicleService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve vehicles from the API via GET', () => {
        const mockVehicles: Vehicle[] = [
            {
                id: 1,
                marca: 'Renault',
                linea: 'Kangoo',
                referencia: 'VU Express',
                modelo: 2017,
                kilometraje: 93272,
                color: 'Blanco',
                imagen: 'https://example.com/car1.jpg',
            },
            {
                id: 2,
                marca: 'Chevrolet',
                linea: 'Spark',
                referencia: 'Life',
                modelo: 2018,
                kilometraje: 55926,
                color: 'Plata',
                imagen: 'https://example.com/car2.jpg',
            },
            {
                id: 3,
                marca: 'Nissan',
                linea: 'March',
                referencia: 'Active',
                modelo: 2019,
                kilometraje: 28000,
                color: 'Rojo',
                imagen: 'https://example.com/car3.jpg',
            },
        ];

        service.getVehicles().subscribe((vehicles) => {
            expect(vehicles).toBeTruthy();
            expect(vehicles.length).toBe(3);
            expect(vehicles).toEqual(mockVehicles);
        });

        const req = httpMock.expectOne(apiUrl);
        expect(req.request.method).toBe('GET');
        req.flush(mockVehicles);
    });
});
