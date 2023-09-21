import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Register from "./Component/Register";
import Chart from "./Component/Chart";


function App() {
 
  return (
    <div >
    
      <Router>
        <Routes>
        <Route  exact path="/" element={<Register/>}/>
        <Route  exact path="/chart" element={<Chart/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
