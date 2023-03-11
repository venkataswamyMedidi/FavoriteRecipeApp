import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './pages/home';
import { CreateRecipe } from './pages/createRecipe';
import { SavedRecipe } from './pages/savedRecipe'
import { Navbar } from "./components/navbar"
import { Auth } from './pages/auth';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/savedrecipe" element={<SavedRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
