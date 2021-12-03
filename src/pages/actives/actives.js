import React from "react";
import { Route, Switch } from "react-router-dom";

import { ActiveList } from "./list";

export default ({ match }) => {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={ActiveList} />
    </Switch>
  );
};
