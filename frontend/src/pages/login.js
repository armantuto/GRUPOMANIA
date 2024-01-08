import React, { useRef, useEffect } from 'react';
import '../styles/login.css';
import { useHistory, Link } from 'react-router-dom';
import Logo from '../GRUPOMANIA IMG/icon-left-font-monochrome-black.svg';

const YourComponent = () => {
  const navigate = useHistory();
  const wrapperRef = useRef(null);
  const registerLinkRef = useRef(null);
  const loginLinkRef = useRef(null);
  const btnPopUpRef = useRef(null);
  const iconCloseRef = useRef(null);
  const btnPopUp1Ref = useRef(null);

  useEffect(() => {
    // Recuperar el estado desde localStorage al cargar el componente
    const storedLoggedIn = localStorage.getItem('token');
    if (storedLoggedIn) {
      navigate.push('/dashboard');
    }
  }, []);

  const handleRegisterClick = () => {
    wrapperRef.current.classList.add('active');
  };

  const handleLoginClick = () => {
    wrapperRef.current.classList.remove('active');
  };

  const handleBtnPopUpClick = () => {
    wrapperRef.current.classList.add('active-popup');
    wrapperRef.current.classList.remove('active');
  };

  const handleIconCloseClick = () => {
    wrapperRef.current.classList.remove('active-popup');
    wrapperRef.current.classList.add('active');
  };

  const handleBtnPopUp1Click = () => {
    wrapperRef.current.classList.add('active-popup');
    wrapperRef.current.classList.add('active');
  };

  const handleLogin = async () => {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (email && password)
      try {
        const response = await fetch('http://localhost:4200/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          const token = await response.json();
          if (token) {
            // Actualiza el estado de autenticación    
            localStorage.setItem('token', token)
            // Redirecciona a la página deseada
            navigate.push('/dashboard');
          } else {
            console.log("nope");
          }
        } else {
          const error = await response.json();
          alert(error.error)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    else {
      alert("rellena todos los campos")
    }
  };

  const handleCreate = async (req) => {
    const firstName = document.getElementById('Name').value;
    const lastName = document.getElementById('Lastname').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    if (firstName && lastName && email && password) {
      try {
        const response = await fetch('http://localhost:4200/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        });
        const data = await response.json();
        console.log(data);
        if (data) {
          console.log("exitosa")
          const response = await fetch('http://localhost:4200/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          if (response.ok) {
            const token = await response.json();
            if (token) {
              // Actualiza el estado de autenticación   
              localStorage.setItem('token', token)
              // Redirecciona a la página deseada
              navigate.push('/edit');
            } else {
              console.log("nope");
            }
          }
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      alert("rellena todos los campos")
    }
  };

  return (
    <>
      <Link to="/">
        <div className="container2">
          <div className="logoP2">
            <img className="logo2" src={Logo} alt="logo" />
          </div>
        </div>
      </Link>
      <div className='principal'>
        <div className='buttons'>
          <button className="btnLogin-popup " ref={btnPopUpRef} onClick={handleBtnPopUpClick}>Login</button>
          <button className="btnLogin-popup1 " ref={btnPopUp1Ref} onClick={handleBtnPopUp1Click}>
            Register
          </button>
        </div>
        <div div className='ok'>
          <div className="wrapper  active-popup" ref={wrapperRef}>
            <span className="icon-close">
              <i name="close" ref={iconCloseRef} onClick={handleIconCloseClick}>X</i>
            </span>
            <div className="form-box login">
              <h2>Login</h2>
              <div id="LOGIN" >
                <div className="input-box">
                  <span className="icon">
                    <icon name="mail"></icon>
                  </span>
                  <input
                    className="username"
                    type="text"
                    id="username"
                    name="username"
                    required
                  />
                  <label>Email</label>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <i name="lock-closed"></i>
                  </span>
                  <input
                    className="password"
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" />Remember me
                  </label>
                  <a href="*">Forgot Password?</a>
                </div>
                <button
                  className="btn"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div className="login-register">
                  <p>
                    Dont have an account?
                    <div className="register-link" onClick={handleRegisterClick} ref={registerLinkRef}>
                      Register
                    </div>
                  </p>
                </div>
              </div>
            </div>

            <div className="form-box register" >
              <h2>Registration</h2>
              <div >
                <div className="input-box">
                  <span className="icon">
                    <i name="person"></i>
                  </span>
                  <input type="text" id='Name' name='Name' required />
                  <label>Name</label>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <i name="person"></i>
                  </span>
                  <input type="text" id='Lastname' name='Lastname' required />
                  <label>LastName</label>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <i name="mail"></i>
                  </span>
                  <input type="email" id='Email' name='Email' required />
                  <label>Email</label>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <i name="lock-closed"></i>
                  </span>
                  <input type="password" id='Password' name='Password' required />
                  <label>Password</label>
                </div>
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" />I agree to the terms & conditions
                  </label>
                </div>
                <button className="btn" onClick={handleCreate}>
                  Register
                </button>
                <div className="login-register">
                  <p>
                    Already have an account?
                    <div className="login-link" ref={loginLinkRef} onClick={handleLoginClick}>
                      Login
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourComponent;
