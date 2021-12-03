import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import SideNav from "./components/SideNav";
import Topbar from "./components/Topbar";
import { Routes } from "./routes";
import { Pages } from "./models/pages.model";

// Components
//import Preloader from "./components/Preloader";
import "react-perfect-scrollbar/dist/css/styles.css";
//import PerfectScrollbar from "react-perfect-scrollbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import { NotFound } from "./pages/auth/notFound";
import { Signin } from "./pages/auth/signin";
import Dashboard from "./pages/dash";
import Actives from "./pages/actives/actives";

// Services
import { authService } from "./services/auth.service";

function App() {
  const RouteWithLoader = ({ component: Component, ...rest }) => {
    // useEffect(() => {
    //   const timer = setTimeout(() => setLoaded(true), 1000);
    //   return () => clearTimeout(timer);
    // }, []);

    return (
      <Route
        {...rest}
        render={(props) => (
          <>
            {" "}
            {/* <Preloader show={loaded ? false : true} />  */}
            <Component {...props} />{" "}
          </>
        )}
      />
    );
  };

  const RouteCommon = ({ component: Component, ...rest }) => {
    // useEffect(() => {
    //   const timer = setTimeout(() => setLoaded(true), 1000);
    //   return () => clearTimeout(timer);
    // }, []);

    return (
      <Route
        {...rest}
        render={(props) => (
          <>
            {" "}
            {/* <Preloader show={loaded ? false : true} />  */}
            <Component {...props} />{" "}
          </>
        )}
      />
    );
  };

  const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const localStorageIsSettingsVisible = () => {
      return localStorage.getItem("settingsVisible") === "false" ? false : true;
    };

    const [showSettings, setShowSettings] = useState(
      localStorageIsSettingsVisible
    );

    const toggleSettings = () => {
      setShowSettings(!showSettings);
      localStorage.setItem("settingsVisible", (!showSettings).toString());
    };

    return (
      <Route
        {...rest}
        render={(props) =>
          authService.isAuthenticated() ? (
            <>
              {/* <Preloader show={loaded ? false : true} /> */}
              <SideNav />

              <main className='main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ps'>
                <Topbar
                  title={rest.title}
                  preTitle={rest.preTitle}
                  preRoute={rest.preRoute}
                />

                <ToastContainer />

                <div className='container-fluid py-4'>
                  <Component {...props} />
                </div>
              </main>
            </>
          ) : (
            <>
              <Redirect
                to={{
                  pathname: Routes.Signin.path,
                  state: { from: props.location },
                }}
              />
            </>
          )
        }
      />
    );
  };

  return (
    <>
      <Switch>
        <Route exact path={Routes.NotFound.path} component={NotFound} />
        <RouteCommon exact path={Routes.Signin.path} component={Signin} />

        <RouteWithSidebar
          exact
          path={Routes.Dashboard.path}
          title={Pages.Dashboard.title}
          preTitle={Pages.Dashboard.preTitle}
          preRoute={Pages.Dashboard.preRoute}
          component={Dashboard}
        />

        <RouteWithSidebar
          exact
          path={Routes.Actives.path}
          title={Pages.Actives.title}
          preTitle={Pages.Actives.preTitle}
          preRoute={Pages.Actives.preRoute}
          component={Actives}></RouteWithSidebar>

        <Redirect to={Routes.NotFound.path} />
      </Switch>
    </>
  );
}
export default App;
