import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../AuthService.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
}) 
export class LoginPageComponent implements OnInit{

  loginForm!: FormGroup;
  otpSent: boolean = false;
  captchaImageUrl: string = ''; 
  msg: any ='';

  constructor(private fb: FormBuilder, private auth_service :AuthService, private router: Router) {
  }

  ngOnInit(): void {
   // this.auth_service.fetchKey();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
    this.loadCaptcha();
  }

  loadCaptcha(): void {
    console.log("inside load captcha");
    this.auth_service.getCaptcha().subscribe({
      next: (response: any) => {
        console.log("got response");
        this.loginForm.patchValue({ captchaId: response.captchaId });
        this.captchaImageUrl = response.image;
      },
      error: (err: any) => {
        console.error('Error fetching captcha', err);
      }
    });
  }

  onVerifyUsername(): void {
    console.log(this.loginForm.get('username'), "user name")
    if (this.loginForm.get('username')?.value == '' || this.loginForm.get('username')?.value ==null){
      this.msg = 'Please enter user name before proceeding';
    }
    else if(this.loginForm.get('captcha')?.value == '' || this.loginForm.get('captcha')?.value ==null) {
      this.msg = 'Please enter CAPTCHA before proceeding';
    }else{
      const body = {
        username: this.loginForm.get('username')?.value,
        captcha: this.loginForm.get('captcha')?.value
      };
    //  const encrypted = this.encryptionService.encryptObject(body);
      this.auth_service.verifyDetails(body).subscribe({
        next: (response: any) => {
      //    const decryptedString = this.encryptionService.decryptBase64(response);
       //   const decrypted = JSON.parse(decryptedString);
          if(!response.result){
             this.msg = response.message;
          }else{
            this.msg = '';
            this.otpSent = true;
            this.loginForm.get('username')?.disable();
            this.loginForm.get('captcha')?.disable();
          }
        },
        error: (err: any) => {
          console.error('Error fetching captcha', err);
        }
      });
    }
  }


  onSubmit(): void {

    const body = {
      username: this.loginForm.get('username')?.value,
      otp: this.loginForm.get('otp')?.value
    };

  //  const encrypted = this.encryptionService.encryptObject(body);
    this.auth_service.validateOtp(body).subscribe({
      next: (response: any) => {
     //   const decryptedString = this.encryptionService.decryptBase64(response);
     //   const decrypted = JSON.parse(decryptedString);
     console.log(response, "response");
        if(response.result){
        this.router.navigate(['/dashboard']);
        this.auth_service.checking().subscribe({
        });
        }else{
          this.msg = response.message;
        }
      },
      error: (err: any) => {
        console.error('Error fetching captcha', err);
      }
    });

  }

 
  onRegister(): void {
    console.log('Redirecting to register...');
  }

  onForgotUsername(): void {
    console.log('Redirecting to forgot username...');
  }

  refreshCaptcha(): void {
    console.log('Refreshing captcha...');
    this.loadCaptcha();
  }
}
