import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/authContext"; // Import AuthContext
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from AuthContext

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(""); // Reset error message
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setLoginError(data.message || "Login failed");
      } else {
        const { user, token } = await response.json(); // Extract user and token from the response
        login(user, token); // Use login function from AuthContext
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegisterError(""); // Reset error message
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: registerUsername, // Make sure the backend expects `displayName`
          email: registerEmail,
          password: registerPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setRegisterError(data.message || "Registration failed");
      } else {
        handleTab("tabButton1"); // Switch to login tab on successful registration
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError("An error occurred during registration. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSignUpSection">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabs">
          <p
            onClick={() => handleTab("tabButton1")}
            className={activeTab === "tabButton1" ? "active" : ""}
          >
            Login
          </p>
          <p
            onClick={() => handleTab("tabButton2")}
            className={activeTab === "tabButton2" ? "active" : ""}
          >
            Register
          </p>
        </div>
        <div className="loginSignUpTabsContent">
          {activeTab === "tabButton1" && (
            <div className="loginSignUpTabsContentLogin">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email address *"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password *"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <div className="loginSignUpForgetPass">
                  <label>
                    <input type="checkbox" className="brandRadio" />
                    <p>Remember me</p>
                  </label>
                  <p>
                    <Link to="/resetPassword">Lost password?</Link>
                  </p>
                </div>
                <button type="submit" disabled={loading}>
                  Log In
                </button>
                {loginError && <p className="error">{loginError}</p>}
              </form>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  No account yet?{" "}
                  <span onClick={() => handleTab("tabButton2")}>
                    Create Account
                  </span>
                </p>
              </div>
            </div>
          )}
          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Username *"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email address *"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password *"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
                <p>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account,
                  and for other purposes described in our
                  <Link
                    to="/terms"
                    style={{ textDecoration: "none", color: "#c32929" }}
                  >
                    {" "}
                    privacy policy
                  </Link>
                  .
                </p>
                <button type="submit" disabled={loading}>
                  Register
                </button>
                {registerError && <p className="error">{registerError}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;