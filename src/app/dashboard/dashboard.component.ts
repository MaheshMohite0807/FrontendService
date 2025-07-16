import { Component } from '@angular/core';
import { AuthService } from '../AuthService.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private auth_service :AuthService) {
  }
  getMailId(): void {
    this.auth_service.getMailId("Mahesh").subscribe({
      next: (response: any) => {
       
      },
      error: (err: any) => {
        console.error('Error fetching captcha', err);
      }
    });
  }
}
