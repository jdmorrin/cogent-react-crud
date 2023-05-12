import {Routes, Route} from "react-router-dom";
import Home from "./component/home";
import User from "./component/user";
import UserCreate from "./component/create";
import UserUpdate from "./component/edit";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/create" element={<UserCreate/>}/>
        <Route path="/edit/:id" element={<UserUpdate/>}/>
        <Route path="/user/:id" element={<User/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
