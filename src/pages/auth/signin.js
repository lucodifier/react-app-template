import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../../services/auth.service";

export const Signin = (props) => {
  const history = useHistory();
  const [identity, setIdentity] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [loginDisabled, setLoginDisabled] = useState(true);

  const login = async (event) => {
    event.preventDefault();
    if (!identity.email || !identity.pass)
      setAlert({ show: true, message: "Forneça login e senha" });
    else {
      setAlert({ show: false, message: "" });

      try {
        const logged = await authService.login(identity.email, identity.pass);
        if (logged) {
          history.push("/", null);
        } else {
          setAlert({ show: true, message: "Login ou senha inválidos" });
        }
      } catch (error) {
        console.log(error);
        setAlert({ show: true, message: "Login ou senha inválidos" });
      }
    }
  };

  const buildIdentity = (field, value) => {
    identity[field] = value;
    setIdentity(identity);
    canLogin();
  };

  const canLogin = () => {
    if (!identity.email || !identity.pass) setLoginDisabled(true);
    else setLoginDisabled(false);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await login(event);
    }
  };

  useEffect(() => {}, [loginDisabled]);

  return (
    <>
      <main className='main-content mt-0'>
        <section>
          <div className='page-header min-vh-75'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto'>
                  <div className='card card-plain mt-8'>
                    <div className='card-header pb-0 text-left bg-transparent'>
                      <p className='navbar-brand m-0' to={"/"}>
                        <img
                          src='../assets/img/favicon.png'
                          class='navbar-brand-img h-100'
                          alt='main_logo'
                        />
                        <span class='ms-1 font-weight-bold'>InvestBoard</span>
                      </p>

                      <h3 className='font-weight-bolder text-primary text-gradient'>
                        Bem vindo de volta
                      </h3>
                      <p className='mb-0'>
                        Forneça seu email e senha para entrar
                      </p>
                    </div>
                    <div className='card-body'>
                      {alert && alert.show ? (
                        <div class='alert alert-warning' role='alert'>
                          <strong>Atenção!</strong> {alert.message}
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <form role='form'>
                        <label>Email</label>
                        <div className='mb-3'>
                          <input
                            type='email'
                            className='form-control'
                            placeholder='Email'
                            aria-label='Email'
                            aria-describedby='email-addon'
                            onChange={(e) =>
                              buildIdentity("email", e.target.value)
                            }
                          />
                        </div>
                        <label>Senha</label>
                        <div className='mb-3'>
                          <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                            aria-label='Password'
                            aria-describedby='password-addon'
                            onKeyDown={handleKeyDown}
                            onChange={(e) =>
                              buildIdentity("pass", e.target.value)
                            }
                          />
                        </div>
                        {/* <div className='form-check form-switch'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='rememberMe'
                            checked=''
                          />
                          <label className='form-check-label' for='rememberMe'>
                            Lembrar-me
                          </label>
                        </div> */}
                        <div className='text-center'>
                          <button
                            type='button'
                            disabled={loginDisabled}
                            onClick={(event) => login(event)}
                            className='btn bg-gradient-primary w-100 mt-4 mb-0'>
                            Entrar
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* <div className='card-footer text-center pt-0 px-lg-2 px-1'>
                      <p className='mb-4 text-sm mx-auto'>
                        Você não tem conta?
                        <a
                          href='javascript:;'
                          className='text-info text-gradient font-weight-bold'>
                         Criar conta
                        </a>
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className='col-md-6'>
                  <div
                    className='
                    oblique
                    position-absolute
                    top-0
                    h-100
                    d-md-block d-none
                    me-n8
                  '>
                    <div
                      className='
                      oblique-image
                      bg-cover
                      position-absolute
                      fixed-top
                      ms-auto
                      h-100
                      z-index-0
                      ms-n6
                    '
                      style={{
                        backgroundImage:
                          "url('../../assets/img/curved-images/curved6.jpg')",
                      }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
