import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="loginForm" (submit)="login()">
    <label for="username">Username: </label>
    <input id="username" type="text" formControlName="username">
    <button type="submit">Create Room</button>
</form>
  `,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    username: new FormControl('')
  })

  login = function(){
    //foo 
  }
}
