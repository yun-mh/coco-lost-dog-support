import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../routes/Main";
import Dog from "../routes/Dog";

const Routes = () => (
  <div className="container mx-auto border-r bg-secondary-light min-h-screen">
    <div className="w-full pl-16">
      <div className="p-8">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/:dogId" component={Dog} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  </div>
);

const AppRouter = ({ isLoggedIn }) => {
  return <Routes />;
};

export default AppRouter;