import React from "react";
import { Switch, Route } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Repository from "../pages/Repository";

const Routes: React.FC = () =>{
    return(
        <Switch>
            <Route exact path="/"  component={DashBoard} />
            <Route path="/repository" component={Repository} />
        </Switch>
    );
}

export default Routes;