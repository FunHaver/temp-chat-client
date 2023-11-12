import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-users-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>Users</p>
    <div *ngFor="let user of this.users; index as i;">
      {{user.username}}
    </div>
  `,
  styleUrls: ['./users-display.component.scss']
})
export class UsersDisplayComponent {
 @Input() users!:Array<User>
}
