import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <button class="room-control">Leave Room</button>
      <button class="room-control">Share Room</button>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
