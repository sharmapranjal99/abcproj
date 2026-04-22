import { useState } from "react";
import "./App.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await fetch("https://abcproj.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "User",
        email,
        password
      })
    });

    alert("Registered ✅");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={register}>Register</button>

        <p><a href="/login">Go to Login</a></p>
      </div>
    </div>
  );
}

export default Register;
