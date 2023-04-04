import React, { useEffect, useState, useRef } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Button, Accordion } from "semantic-ui-react";
import { Collapsible } from "collapsible-react-component";
import "collapsible-react-component/dist/index.css";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const [open, setOpen] = useState(false);
  const userID = useGetUserID();

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
      <h1 style={{ fontFamily: "fantasy" }}>Recipes Home</h1>
      <ul>
        <div>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                {/* <button class="btn btn-link" >
              <h2 className="title" onClick={() => {
                setOpen(!open)
              }} > {open ? 'Close' : 'Open'}{recipe.name}</h2>
            </button> */}
                <Button
                  type="button"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {/* {open ? "Close" : "Open"} */}
                  <h5 className="recipeTitle">{recipe.name} &nbsp;
                    <i class="chevron up icon"></i>
                  </h5>
                </Button>

                <Collapsible open={open}>
                  {/* <h2 className="title">{recipe.name}</h2> */}
                  <br />
                  <Button
                    class="ui fade animated button"
                    style={{ width: "150px" }}
                    animated
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    <Button.Content visible>
                      {" "}
                      {isRecipeSaved(recipe._id) ? "Saved" : "Click To Save"}
                    </Button.Content>
                    <Button.Content hidden>Save Recipe to Login</Button.Content>
                  </Button>
                  <div className="instructions">
                    <p>{recipe.instructions}</p>
                  </div>
                  <img src={recipe.imageUrl} alt={recipe.name} />
                  <h6 className="instructions">Cooking Time: {recipe.cookingTime} minutes</h6>
                </Collapsible>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};
