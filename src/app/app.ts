import { Component, signal } from '@angular/core';
import { VehicleListPage } from './vehicle/pages/vehicle-list-page/vehicle-list-page';

@Component({
    selector: 'app-root',
    imports: [VehicleListPage],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('parcial-1');
}
