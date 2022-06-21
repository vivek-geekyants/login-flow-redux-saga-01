import "../App.css";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { useEffect } from "react";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    console.log(token);
    if (token) {
      let user: string = jwt(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        navigate("../login");
      }
    }
  }, [navigate]);

  return (
    <div className="App-header"> Login using redux, redux-saga, redux-form</div>
  );
};

export default Homepage;
