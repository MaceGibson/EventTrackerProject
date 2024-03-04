import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, NgbModule, LogoutComponent, LoginComponent, CommonModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  isCollapsed: boolean = false;

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.checkLogin();
  }
}
