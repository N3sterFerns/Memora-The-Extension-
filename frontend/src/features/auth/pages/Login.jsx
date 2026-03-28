import React, { useState } from "react";
import "../styles/login.scss";
import { Link, Navigate, useNavigate } from "react-router";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const user = useSelector((state)=> state.auth.user)

  const [handleLoginDetails, sethandleLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const handleLogins = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const success = await handleLogin(handleLoginDetails);
    setLoginLoading(false);

    if(success){
      navigate("/dashboard");
    }
    sethandleLoginDetails({
      email: "",
      password: "",
    });
  };

  if(user){
    return <Navigate to={"/dashboard"} replace/>
  }

  return (
    <div className="login-con">
      <div className="auth-container">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div>
            <h2>Elevate your content creation journey.</h2>
            <p>
              Join thousands of creators building modern editorial experiences.
            </p>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h3>Login Account</h3>
          <p>Start your journey in seconds </p>

          <form onSubmit={handleLogins} className="form">
            {/* Email */}
            <Input
              title="Email Address"
              id="email"
              placeholder="Enter Your Email"
              setUserDetails={sethandleLoginDetails}
              value={handleLoginDetails.email}
            />

            {/* Password */}
            <InputPassword
              setHandleUserDetails={sethandleLoginDetails}
              value={handleLoginDetails.password}
            />

            {/* Terms */}
            <div className="checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms</a> &{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            {/* Button */}
            <button className="btn-primary">
              {loginLoading ? (
                <svg
                  width={25}
                  height={25}
                  fill="hsl(194, 82%, 58%)"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      dur="0.75s"
                      values="0 12 12;360 12 12"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              ) : (
                <span>Log Account</span>
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <span>Or continue with</span>
            </div>

            {/* Social */}
            <div className="social">
              <button type="button">Google</button>
              <button type="button">Apple</button>
            </div>
          </form>

          {/* Footer */}
          <div className="footer">
            Already have an account? <Link to={"/register"}>Create Account</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
