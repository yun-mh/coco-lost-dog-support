import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dog from "../routes/Dog";
import NotFound from "../routes/NotFound";

const AppRouter = () => (
  <div className="container mx-auto">
    <div className="w-full">
        <Switch>
          <Route path="/:dogId" component={Dog} />
          <Route exact path="/" component={NotFound} />
          <Redirect from="*" to="/" />
        </Switch>
    </div>
  </div>
);

export default AppRouter;