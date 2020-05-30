import React from 'react';
import { Route, Switch } from "react-router-dom";
import About from "./App";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Create from './Create';
import SingleMedicine from './SingleMedicine';
import UpdateMedicine from './UpdateMedicine';


function App() {
  return (
    <div >
     <Switch>
        
        <Route path = "/" exact component = {About} />
        <Route path = "/login" exact component = {Login} />
        <Route path = "/register" exact component = {Register} />
        <Route path = "/home" exact component = {Home} />
        <Route path="/create" exact component={Create} />
        <Route path="/medicines/:slug" exact component={SingleMedicine} />
        <Route path="/medicines/update/:slug" exact component={UpdateMedicine} />
            


     </Switch>
    </div>
  );
}

export default App;
