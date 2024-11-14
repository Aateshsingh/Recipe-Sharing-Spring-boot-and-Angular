import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecipeCardComponent } from './pages/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthServiceService } from './services/Auth/auth-service.service';
import { A } from '@angular/cdk/keycodes';
import { SocialShareComponent } from './pages/social-share/social-share.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent,HomePageComponent,RecipeCardComponent,CommonModule,AuthComponent,SocialShareComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Recipe-sharing-frontend';

  user:any=null;

  constructor(public authService:AuthServiceService) { }


  ngOnInit(){
    this.authService.getUserProfile().subscribe({
      next:data=>console.log("req user",data),
      error:error=>console.log("error",error)
    });
    this.authService.authSubject.subscribe((auth)=>{
      console.log("auth state",auth)
      this.user=auth.user
    })
  }
}
