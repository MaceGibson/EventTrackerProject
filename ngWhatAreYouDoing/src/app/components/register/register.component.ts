import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  newUser: User = new User();

  register(user: User): void {
    console.log('Registering user:');
    console.log(user);
    this.authService.register(user).subscribe({
      next: (newUser) => {
        this.authService.login(user.username, user.password).subscribe({
          next: (loggedInUser) => {
            this.router.navigateByUrl('/habits');
          },
          error: (problem) => {
            console.error(
              'RegisterComponent.register(): Error logging in user:'
            );
            console.error(problem);
          },
        });
      },
      error: (fail) => {
        console.error(
          'RegisterComponent.register(): Error registering account'
        );
        console.error(fail);
      },
    });
  }

  constructor(private authService: AuthService, private router: Router) {}
}
