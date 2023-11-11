import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      page-not-found works!
    </p>
  `,
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
