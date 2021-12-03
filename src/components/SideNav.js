import React from "react";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import { Pages } from "../models/pages.model";

import "./SideNav.css";

const SideNav = (props) => {
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
    <aside
      className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 '
      id='sidenav-main'>
      <div className='sidenav-header'>
        <i
          className='fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none'
          aria-hidden='true'
          onClick={() => toggleSidenav()}
          id='iconSidenav'></i>
        <Link className='navbar-brand m-0' to={"/"}>
          <img
            src='../assets/img/favicon.png'
            class='navbar-brand-img h-100'
            alt='main_logo'
          />
          <span class='ms-1 font-weight-bold'>InvestBoard</span>
        </Link>
      </div>
      <hr className='horizontal dark mt-0' />

      <div
        className='collapse navbar-collapse  w-auto  max-height-vh-100 h-100'
        id='sidenav-collapse-main'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link
              key='dash'
              onClick={() => toggleSidenav()}
              to={Routes.Dashboard.path}
              className='nav-link  active'>
              <div className='icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center'>
                <i
                  className='ni ni-shop text-lg opacity-10'
                  aria-hidden='true'></i>
              </div>
              <span className='nav-link-text ms-1'>
                {Pages.Dashboard.title}
              </span>
            </Link>

            {/*<span className='nav-link  active' href='/'>
              <div className='icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center'>
                <i
                  className='ni ni-shop text-lg opacity-10'
                  aria-hidden='true'></i>
              </div>
              <span className='nav-link-text ms-1'>Dashboard</span>
            </span> */}
          </li>
          {/* <li className='nav-item'>
           <span className='nav-link' href='/'>
              <div className='icon  icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center'>
                <i
                  className='ni ni-briefcase-24 text-lg opacity-10'
                  aria-hidden='true'></i>
              </div>
              <span className='nav-link-text ms-1'>Contas</span>
            </span>
          </li> */}

          <li className='nav-item'>
            <span
              className='nav-link dropdown-toggle pointer'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <div className='icon  icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center'>
                <i
                  className='ni ni-money-coins text-lg opacity-10'
                  aria-hidden='true'></i>
              </div>
              <span className='nav-link-text ms-1'>Contas</span>
            </span>
            <ul class='dropdown-menu ' aria-labelledby='dropdownMenuButton'>
              <li>
                <span class='dropdown-item border-radius-md pointer'>
                  Gerenciar
                </span>
              </li>
              <li>
                <Link
                  to={Routes.AccountTransactions.path}
                  onClick={() => toggleSidenav()}
                  className='dropdown-item border-radius-md pointer'>
                  {Pages.AccountTransactions.title}
                </Link>
              </li>
              <li>
                <Link
                  to={Routes.BillToPay.path}
                  onClick={() => toggleSidenav()}
                  className='dropdown-item border-radius-md pointer'>
                  {Pages.BillToPay.title}
                </Link>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <span
              className='nav-link dropdown-toggle pointer'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <div className='icon  icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center'>
                <i
                  className='ni ni-chart-pie-35 text-lg opacity-10'
                  aria-hidden='true'></i>
              </div>
              <span className='nav-link-text ms-1 '>Investimentos</span>
            </span>
            <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <li>
                <Link
                  to={Routes.Actives.path}
                  onClick={() => toggleSidenav()}
                  className='dropdown-item border-radius-md'>
                  {Pages.Actives.title}
                </Link>
              </li>
              <li>
                <Link
                  to={Routes.Portfolio.path}
                  onClick={() => toggleSidenav()}
                  className='dropdown-item border-radius-md'>
                  {Pages.Portfolio.title}
                </Link>
              </li>
              <li>
                <Link
                  to={Routes.InvestmentTransactions.path}
                  onClick={() => toggleSidenav()}
                  className='dropdown-item border-radius-md'>
                  {Pages.InvestmentTransactions.title}
                </Link>
              </li>
              <li>
                <Link
                  to={Routes.InvestmentTrack.path}
                  onClick={() => toggleSidenav()}
                  className='dropdown-item border-radius-md'>
                  {Pages.InvestmentTrack.title}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
