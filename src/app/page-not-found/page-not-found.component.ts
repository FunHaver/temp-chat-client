import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-page-not-found',
    imports: [],
    template: `
    <p>
      404!
    </p>
    <p>
      <a href="/">Back to Home</a>
    </p>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  homeUrl: string = window.location.hostname;

}
