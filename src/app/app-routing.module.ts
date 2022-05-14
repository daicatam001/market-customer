import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupModule } from 'src/modules/signup/signup.module';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  {
    path: 'signup', loadChildren: () => SignupModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
