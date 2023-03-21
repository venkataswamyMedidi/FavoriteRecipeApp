import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-mernurl.herokuapp.com/recipes/savedRecipes/${userID}`
          //`http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        // console.log("userId_savedRecipe.js16", response)
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);
  return (
    <div style={{ display: "contents" }}>
      <h1>Saved Recipes</h1>
      <div>
        <ul>
          {savedRecipes &&
            savedRecipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                </div>
                <p>{recipe.ingredients}</p>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
