import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonApi } from "../Api/commonApi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const data = await commonApi(
      "http://127.0.0.1:8000/api/users/login/",
      "POST",
      { username, password }
    );

    if (data.access) {
      localStorage.setItem("token", data.access);
      alert("Login successful!");

      if (data.is_admin) {
        navigate("/admin"); 
      } else if (data.is_approved) {
        navigate("/flights/list"); 
      } else {
        setError("Your account is not approved yet.");
      }
    } else if (data.error) {
      setError(data.error);
    } else {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ paddingTop: '100px', paddingBottom: '50px', marginLeft: '400px', width: '70%' }}
    >
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="form-control mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
