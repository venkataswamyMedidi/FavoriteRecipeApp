import { useState } from "react";
import axios from "axios";
//import { useCookies } from "react-cookie";
//import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth-container">
      {/* <h2>Login</h2> */}
      <Form>
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        textLabel="Login" onSubmit={onSubmit}
      </Form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="auth-container">
      {/* <h2>Register</h2> */}
      <Form>
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        textLabel="Register" onSubmit={onSubmit}
      </Form>
    </div>
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  textLabel,
  onSubmit,
}) => {

  return (
    <div className="auth-container">
      <h2>{textLabel}</h2>
      <form onSubmit={onSubmit}>
        <h2>{textLabel}</h2>
        <div className="form-group">
          <label htmlFor="username"> username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </form>
      <div className="input">
        {" "}
        <button type="text">{textLabel}</button>
      </div>
    </div>
  );
};
