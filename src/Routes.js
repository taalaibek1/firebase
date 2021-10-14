import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import MainContextProvider from "./contexts/MainContext";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Update from "./pages/Update";

const Routes = () => {
  return (
    <MainContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={Main} />
          <Route exact path="/update/:docId" component={Update} />
        </Switch>
      </BrowserRouter>
    </MainContextProvider>
  );
};

export default Routes;
