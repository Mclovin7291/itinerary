import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import './Styles/Login.css';

function Login() {
  const [user, setUser] = useState({});
  const [googleLoaded, setGoogleLoaded] = useState(false);

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    const loadGoogleScript = () => {
      // Check if script is already loaded
      if (!window.google || !window.google.accounts) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
              client_id: "1005325099127-qdh6mv05e08eqtqhb6v4o31t0vb9m43d.apps.googleusercontent.com",
              callback: handleCallBackResponse
            });
            window.google.accounts.id.renderButton(
              document.getElementById("signInDiv"),
              { theme: "outline", size: "large" }
            );
          }
        };
        document.body.appendChild(script);
      }
    };
    loadGoogleScript();
  }, []);

  return (
    <div className="login-container">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <div className="user-info">
          <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
          {user.picture && <img src={user.picture} alt="profile" className="profile-image" />}
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default Login;