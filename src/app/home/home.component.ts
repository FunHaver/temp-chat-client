import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRoomFormComponent } from '../new-room-form/new-room-form.component';
import { RestApiService } from '../services/rest-api.service';
import { JoinRoomFormComponent } from '../join-room-form/join-room-form.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
            NewRoomFormComponent,
            JoinRoomFormComponent],
  template: `
  <app-new-room-form></app-new-room-form>
  <app-join-room-form></app-join-room-form>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  api: RestApiService = inject(RestApiService);
}
