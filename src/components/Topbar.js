import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../services/auth.service";
import { Routes } from "../routes";

export default (props) => {
  const history = useHistory();
  const [user, setUser] = useState("");

  const logout = () => {
    authService.logout();
    history.push(Routes.Signin.path);
  };

  useEffect(() => {
    var user = authService.getUser();
    if (user) setUser(user.description);
  }, []);

  function toggleSidenav() {
    const iconSidenav = document.getElementById("iconSidenav");
    const sidenav = document.getElementById("sidenav-main");
    let body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      body.classList.remove("g-sidenav-pinned");
      setTimeout(function () {
        sidenav.classList.remove("bg-white");
      }, 100);
      sidenav.classList.remove("bg-transparent");
    } else {
      body.classList.add("g-sidenav-pinned");
      sidenav.classList.add("bg-white");
      sidenav.classList.remove("bg-transparent");
      iconSidenav.classList.remove("d-none");
    }
  }

  return (
    <nav
      className='navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl'
      id='navbarBlur'
      navbar-scroll='true'>
      <div className='container-fluid py-1 px-3'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5'>
            <li className='breadcrumb-item text-sm'>
              <Link className='opacity-5 text-dark' to={props.preRoute}>
                {props.preTitle}
              </Link>
            </li>
            <li
              className='breadcrumb-item text-sm text-dark active'
              aria-current='page'>
              {props.title}
            </li>
          </ol>
          <h6 className='font-weight-bolder mb-0'>{props.title}</h6>
        </nav>
        <div
          className='collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4'
          id='navbar'>
          <div className='ms-md-auto pe-md-3 d-flex align-items-center'>
            <div className='input-group'>
              {/* <span className='input-group-text text-body'>
                <i className='fas fa-search' aria-hidden='true'></i>
              </span>
              <input
                type='text'
                className='form-control'
                placeholder='Type here...'
              /> */}
            </div>
          </div>
          <ul className='navbar-nav  justify-content-end'>
            <li className='nav-item dropdown pe-2 d-flex align-items-center'>
              <a
                href='javascript:;'
                className='nav-link text-body p-0'
                id='dropdownMenuButton'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <i className='fa fa-user cursor-pointer'></i> {user && user}
              </a>
              <ul
                className='dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4'
                aria-labelledby='dropdownMenuButton'>
                <li className='mb-2'>
                  <span
                    className='dropdown-item border-radius-md'
                    onClick={() => logout()}>
                    <div className='d-flex py-1 px-2'>
                      <div className='d-flex flex-column justify-content-center'>
                        <h6 className='text-sm font-weight-normal mb-1'>
                          <span className='font-weight-bold'>Sair</span>
                        </h6>
                      </div>
                    </div>
                  </span>
                </li>
              </ul>
            </li>

            <li className='nav-item d-xl-none ps-3 d-flex align-items-center'>
              <span
                className='nav-link text-body p-0 pointer'
                id='iconNavbarSidenav'
                onClick={() => toggleSidenav()}>
                <div className='sidenav-toggler-inner'>
                  <i className='sidenav-toggler-line'></i>
                  <i className='sidenav-toggler-line'></i>
                  <i className='sidenav-toggler-line'></i>
                </div>
              </span>
            </li>
            {/* <li className='nav-item px-3 d-flex align-items-center'>
              <a href='javascript:;' className='nav-link text-body p-0'>
                <i className='fa fa-cog fixed-plugin-button-nav cursor-pointer'></i>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
