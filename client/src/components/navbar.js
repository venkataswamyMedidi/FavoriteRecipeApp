import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token", ""); //set the accesstoken to be empty
    window.localStorage.removeItem("userID");
    //window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/" style={{ textdecoration: "none" }}>
        Home
      </Link>
      <Link to="/createrecipe">CreateRecipe</Link>

      {!cookies.access_token ? (
        <Link to="/auth">Login/register</Link>
      ) : (
        <>
          <Link to="/savedrecipe">SavedRecipe</Link>
          <Button primary onClick={Logout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
};
