import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { authService } from "../services/auth.service";
const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.isAuthenticated() &&
        (authService.hasPermission(rest.permissionKey) ||
          !rest.permissionKey) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default AuthenticatedRoute;
