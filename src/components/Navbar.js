import React, { useContext, useEffect } from "react";
import { mainContext } from "../contexts/MainContext";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const { user, setUser, logOut } = useContext(mainContext);
  const history = useHistory();

  useEffect(() => {
    setUser();
  }, []);
  if (!user) {
    history.push("/auth");
  }
  return (
    <div>
      <div className="navbar">Главная</div>
      <div>
        {user ? (
          <div>
            <strong>Username</strong>
            <button onClick={logOut}>выйти</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
