import React, { useState } from "react";
import "../styles/register.scss";
import { Link, useNavigate } from "react-router";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [handleUserDetails, setHandleUserDetails] = useState({
    email: "",
    password: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    await handleRegister(handleUserDetails);
    setRegisterLoading(false);
    navigate("/login");
    setHandleUserDetails({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="register-con">
      <div className="auth-container">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div>
            <h2>Elevate your content creation journey.</h2>
            <p>
              Join thousands of creators building modern editorial experiences.
            </p>
          </div>

          <div>
            <p>✨ 2,400+ creators joined</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h3>Create Account</h3>
          <p>Start your journey in seconds 🚀</p>

          <form onSubmit={handleRegisterSubmit} className="form">
            {/* Email */}
            <Input
              title="Email Address"
              id="email"
              placeholder="Enter Your Email"
              setUserDetails={setHandleUserDetails}
              value={handleUserDetails.email}
            />

            {/* Password */}
            <InputPassword
              setHandleUserDetails={setHandleUserDetails}
              value={handleUserDetails.password}
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
              {registerLoading ? (
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
                <span>Create Account</span>
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
            Already have an account? <Link to={"/login"}>Login Account</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
