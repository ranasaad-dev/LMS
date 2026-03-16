import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";
import notify from "../../../components/ui/notify/Notify";
import './Register.css';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  if(password === confimPassword){
    
      try {
        await register(name, email, password);
        navigate("/login");
        notify("Successfuly registred", "success");
      } catch {
        alert("Registration failed");
      }
      
    }else{
      alert("password didn;t matched.");
    }

  };

  return (
    <div className="register-container">
      <div className="register-card">
     
          <h3 className="register-title">Register</h3>

          <form className="register-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" minLength={8} value={confimPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <button type="submit" className="register-btn">
              Register
            </button>

          </form>

        </div>

    </div>
  );
}

export default Register;