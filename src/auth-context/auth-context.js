import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userId: '',
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = (props) => {

  const initialToken = localStorage.getItem("token");
  const initalUserId = localStorage.getItem('userId');
  const [id, setId] = useState(initalUserId);
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const loginHandler = (token, userId) => {
    setToken(token);
    setId(userId);
    localStorage.setItem('userId',userId)
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    setId(null);
    localStorage.removeItem("token");
    localStorage.removeItem('userId')
  };
  const authContextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: id,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
