import React, { useState } from "react";
import { useNavigate } from "react-router";

const InputPassword = ({ setHandleUserDetails, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  



  return (
    <div className="field">
      <label>Password</label>
      <div className="input-wrapper">
        <span className="icon">🔒</span>
        <input
          onChange={(e) =>
            setHandleUserDetails((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          value={value}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
        />
        {/* Eye toggle button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {showPassword ? "👁️" : "🙈"}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;
