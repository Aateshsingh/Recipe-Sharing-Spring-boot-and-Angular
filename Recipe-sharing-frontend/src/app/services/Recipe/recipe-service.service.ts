import { N } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  getRecipeById(id: any) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:5454'

  constructor(private http:HttpClient) { }

  recipeSubject = new BehaviorSubject<any>({
    recipes:[],
    loading:false,
    newRecipe:null
  })

  private getHeaders():HttpHeaders{
    const token = localStorage.getItem("jwt")
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    })
  }

  fetchRecipeById(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/api/recipes/${id}`, { headers });
  }
  

  getRecipes():Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/api/recipes`, {headers}).pipe(tap((recipes)=>{
      const currentState = this.recipeSubject.value;
      this.recipeSubject.next({...currentState,recipes});
    }));
  }
  

  createRecipe(recipe:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/api/recipes`, recipe,{headers}).pipe(tap((newRecipe)=>{
      const currentState = this.recipeSubject.value;
      this.recipeSubject.next({...currentState,recipes:[newRecipe,...currentState.recipes]});
    }));
  }

  updateRecipes(recipe:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/api/recipes/${recipe.id}`, recipe, {headers}).pipe(tap((updatedRecipe:any)=>{
      const currentState = this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.map((item:any)=>item.id===updatedRecipe.id?updatedRecipe:item);
      this.recipeSubject.next({...currentState,recipes:updatedRecipes});
    }));
  }

  deleteRecipes(id:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/api/recipes/${id}`,{headers}).pipe(tap((deletedRecipe:any)=>{
      const currentState = this.recipeSubject.value;
      const updatedRecipes = currentState.recipes.filter((item:any)=>item.id !== id);
      this.recipeSubject.next({...currentState,recipes:updatedRecipes});
    }));
  }

  likeRecipes(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/api/recipes/${id}/like`, {}, { headers }).pipe(
      tap((updatedRecipe: any) => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.map((item: any) =>
          item.id === updatedRecipe.id ? updatedRecipe : item
        );
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
}




  
}
