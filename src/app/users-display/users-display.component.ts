import { Component, Input } from '@angular/core';

import { User } from '../interfaces/user';

@Component({
    selector: 'app-users-display',
    imports: [],
    template: `
  <div class="users-list">
    <ul>
      @for (user of this.users; track user; let i = $index) {
        <li>
          {{user.username}}
        </li>
      }
    </ul>
  </div>
  `,
    styleUrls: ['./users-display.component.scss']
})
export class UsersDisplayComponent {
 @Input() users!:Array<User>
}
