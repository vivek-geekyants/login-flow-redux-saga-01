import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Homepage from "./routes/Homepage";
import ProtectedRoute from "./routes/Users";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from "./redux/reducers";
import { logoutUser } from "./redux/actions";
import { useEffect, useState } from "react";
import { loginUser } from "./redux/actions";

function App() {
  type RootStore = ReturnType<typeof rootReducer>;
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootStore) => state.reduceUsers.userVariable
  ) || {
    email: "",
    password: "",
  };

  const handleLogoutUser = () => {
    console.log("handleLogoutUser");
    dispatch(logoutUser({ email: "", password: "" }));
  };

  return (
    <div className='App'>
      <Router>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          {user.email ? (
            <Link to='/login' onClick={handleLogoutUser}>
              logout
            </Link>
          ) : (
            <Link to='/login'>login</Link>
          )}
        </nav>

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute user={user}>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route path='/signup' element={<Signup />} />

          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
