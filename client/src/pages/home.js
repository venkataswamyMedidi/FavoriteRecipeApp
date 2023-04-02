import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Button } from 'semantic-ui-react'

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);

  const userID = useGetUserID();
  // console.log("userIDHome12", userID);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://recipe-mernurl.herokuapp.com/recipes"
        );
        //const response = await axios.get("http://localhost:3001/recipes")
        setRecipes(response.data);
        // console.log("userIDHome22", response.data)
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-mernurl.herokuapp.com/recipes/savedRecipes/ids/${userID}`
          //`http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        // console.log("userIDHome34", response)
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipe-mernurl.herokuapp.com/recipes",
        {
          //const response = await axios.put("http://localhost:3001/recipes", {
          recipeID,
          userID,
        },
        { headers: { Authorization: cookies.access_token } }
      );
      // console.log("userIDHome54", response)
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  return (
    <div className="title">
      <h1 style={{ fontFamily: "fantasy" }} >Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2 className="title">{recipe.name}</h2>
              <Button class="ui fade animated button" style={{ width: '150px' }} animated onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}>
                {/* {isRecipeSaved(recipe._id) ? "Saved" : "Save"} */}
                <Button.Content visible> {isRecipeSaved(recipe._id) ? "Saved" : "Click To Save"}</Button.Content>
                <Button.Content hidden>Save Recipe to Login</Button.Content>
              </Button>
              {/* <button class="ui button"
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button> */}
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
