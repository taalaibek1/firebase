import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mainContext } from "../contexts/MainContext";

const Auth = () => {
  const { authUser, setUser, user } = useContext(mainContext);
  const history = useHistory();
  useEffect(() => {
    setUser();
  }, []);
  if (user) {
    history.push("/");
  }
  return (
    <div className="auth">
      <div>
        <h2>Войдите юю</h2>
        <button onClick={authUser}>войти c google</button>
      </div>
    </div>
  );
};

export default Auth;
