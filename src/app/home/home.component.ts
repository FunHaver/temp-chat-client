import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RestApiService } from '../services/rest-api.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
            LoginFormComponent],
  template: `
  <app-login-form></app-login-form>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  api: RestApiService = inject(RestApiService);
}
