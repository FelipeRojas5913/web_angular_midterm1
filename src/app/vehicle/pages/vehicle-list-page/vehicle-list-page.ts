import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { VehicleService } from '../../services/vehicle.service';

@Component({
    selector: 'app-vehicle-list-page',
    imports: [],
    templateUrl: './vehicle-list-page.html',
    styleUrl: './vehicle-list-page.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListPage implements OnInit {
    public readonly vehicles = signal<Vehicle[]>([]);
    private readonly vehicleService = inject(VehicleService);

    ngOnInit(): void {
        this.getVehicles();
    }

    private getVehicles(): void {
        this.vehicleService.getVehicles().subscribe({
            next: (vehiclesResponse) => {
                this.vehicles.set(vehiclesResponse);
            },
            error: (error) => {
                console.error('Error fetching vehicles:', error);
            },
        });
    }
}
