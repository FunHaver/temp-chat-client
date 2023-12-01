import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      404!
    </p>
    <p>
      <a href="{{this.homeUrl}}">Back to Home</a>
    </p>
  `,
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  homeUrl: string = window.location.hostname;

}
