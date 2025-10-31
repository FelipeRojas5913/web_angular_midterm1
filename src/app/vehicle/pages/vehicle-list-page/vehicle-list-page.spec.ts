import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { VehicleListPage } from './vehicle-list-page';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { of, throwError } from 'rxjs';

describe('VehicleListPage', () => {
    let component: VehicleListPage;
    let fixture: ComponentFixture<VehicleListPage>;
    let vehicleService: VehicleService;
    let httpMock: HttpTestingController;

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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VehicleListPage],
            providers: [
                VehicleService,
                provideHttpClient(),
                provideHttpClientTesting(),
                provideZonelessChangeDetection(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(VehicleListPage);
        component = fixture.componentInstance;
        vehicleService = TestBed.inject(VehicleService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load 3 vehicles on initialization and show table', () => {
        spyOn(vehicleService, 'getVehicles').and.returnValue(of(mockVehicles));

        component.ngOnInit();

        expect(vehicleService.getVehicles).toHaveBeenCalled();
        expect(component.vehicles()).toEqual(mockVehicles);
        expect(component.vehicles().length).toBe(3);

        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const tableRows = compiled.querySelectorAll('table tbody tr');
        expect(tableRows.length).toBe(3);
    });
});
