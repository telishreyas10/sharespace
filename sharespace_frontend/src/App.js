import { Route, Routes, useNavigate } from "react-router";
import Login from "./components/Login";
import Home from "./containers/Home";

function App() {
  return <Routes>
    <Route path="login" element={<Login/>}/>
    <Route path="/*" element={<Home/>}/>
  </Routes>;
}

export default App;
