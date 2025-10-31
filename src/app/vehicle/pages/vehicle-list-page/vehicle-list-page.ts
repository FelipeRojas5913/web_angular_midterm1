import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    OnInit,
    signal,
} from '@angular/core';
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
    private readonly vehiclesCountMap = signal<Record<string, number>>({});

    public readonly vehiclesCount = computed(() => {
        const countMap = this.vehiclesCountMap();
        return Object.entries(countMap).map(([marca, count]) => ({
            marca,
            count,
        }));
    });

    ngOnInit(): void {
        this.getVehicles();
    }

    private getVehicles(): void {
        this.vehicleService.getVehicles().subscribe({
            next: (vehiclesResponse) => {
                this.vehicles.set(vehiclesResponse);
                this.processCount(vehiclesResponse);
            },
            error: (error) => {
                console.error('Error fetching vehicles:', error);
            },
        });
    }

    private processCount(vehicles: Vehicle[]) {
        for (const vehicle of vehicles) {
            if (this.vehiclesCountMap().hasOwnProperty(vehicle.marca)) {
                const count = this.vehiclesCountMap()[vehicle.marca] || 0;
                this.vehiclesCountMap.set({
                    ...this.vehiclesCountMap(),
                    [vehicle.marca]: count + 1,
                });
            } else {
                this.vehiclesCountMap.set({
                    ...this.vehiclesCountMap(),
                    [vehicle.marca]: 1,
                });
            }
        }
    }
}
