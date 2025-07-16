import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


interface CaptchaResponse {
    image: string;
  }

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  preUrl: any = 'http://localhost:8080';
  getCaptcha(): Observable<CaptchaResponse> {
    return this.http.get<CaptchaResponse>(`${this.preUrl}/captcha`, { 
      withCredentials: true 
    });
  }

  verifyDetails(data: any): Observable<any> {
    return this.http.post(`${this.preUrl}/verify`, data, {
      withCredentials: true
    });
  }

  validateOtp(data: any): Observable<any> {
    return this.http.post(`${this.preUrl}/validateOtp`, data, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }

  checking() {
    return this.http.get(`${this.preUrl}/demo`, { 
      withCredentials: true 
    });
  }

  getMailId(data: any) {
    return this.http.post(`${this.preUrl}/getMailId`, data, { 
      withCredentials: true 
    });
  }


}