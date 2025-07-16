import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
   { path : 'login', component: LoginPageComponent},
   {path: 'dashboard', component:  DashboardComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}