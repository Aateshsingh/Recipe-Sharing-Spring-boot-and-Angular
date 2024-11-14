package com.zosh.service;

import com.zosh.model.Recipe;
import com.zosh.model.User;

import java.util.List;

public interface RecipeService {

    public Recipe createRecipe(Recipe recipe, User user);
    public Recipe findRecipeById(Long id ) throws Exception;
    public void deleteRecipe(Long id) throws Exception;
    public Recipe updateRecipe(Recipe recipe, Long Id) throws Exception;
    public List<Recipe> findAllRecipe();
    public Recipe likeRecipe(Long recipeId,User user) throws Exception;
}
