import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { CommonModule } from '@angular/common';
import { SocialShareComponent } from '../social-share/social-share.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  
  @Input() recipe: any;
  liked: boolean = false;

  constructor(public dialog: MatDialog, private recipeService: RecipeServiceService) {}

  ngOnInit() {
    this.recipeService.fetchRecipeById(this.recipe.id).subscribe(
      (recipe: any) => {
        this.recipe = recipe;
        this.liked = this.recipe.isLiked; // Assuming the backend provides an `isLiked` property
      },
      (error: any) => {
        console.error('Error fetching recipe:', error);
      }
    );
  }
  

  handleOpenEditRecipeForm() {
    this.dialog.open(UpdateRecipeFormComponent, { data: this.recipe });
  }

  handleDeleteRecipe() {
    this.recipeService.deleteRecipes(this.recipe.id).subscribe();
  }

  handleLikeRecipe() {
    this.liked = !this.liked;
    this.recipeService.likeRecipes(this.recipe.id).subscribe(
      (updatedRecipe: any) => {
        console.log('Updated recipe:', updatedRecipe);
        this.recipe = updatedRecipe;
        this.liked = updatedRecipe.isLiked;
      },
      (error: any) => {
        console.error('Error occurred while liking the recipe:', error);
      }
    );
  }

  openShareDialog() {
    this.dialog.open(SocialShareComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container'
    });
  }
}
