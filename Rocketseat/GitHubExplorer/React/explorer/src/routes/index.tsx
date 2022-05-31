import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Repository from "../pages/Repository";

const Routes: React.FC = () =>(
    <Switch>
        <Route exact path="/"  component={DashBoard} />
        <Route exact path="/repository/:repository+" component={Repository} />
    </Switch>
);


export default Routes;