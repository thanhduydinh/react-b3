import "./style.scss";
import { useState } from "react";

function Header() {
  const [displayStyle, setDisplayStyle] = useState("none");
  const [isLogoHide, setIsLogoHide] = useState(false);

  const [logoStyle, setLogoStyle] = useState({
    width: "227px",
    fontSize: "20px",
  });
  const [navbarStyle, setNavbarStyle] = useState({
    width: "calc(99vw - 227px)",
  });

  const handleNavbarIconClick = () => {
    setIsLogoHide((prevState) => !prevState);
    setLogoStyle({
      width: isLogoHide ? "227px" : "50px",
      fontSize: isLogoHide ? "20px" : "18px",
    });
    setNavbarStyle({
      width: isLogoHide ? "calc(99vw - 227px)" : "calc(99vw - 50px)",
    });
  };

  const toggleDisplay = () => {
    setDisplayStyle((prevStyle) => (prevStyle === "none" ? "block" : "none"));
  };

  return (
    <header>
      <div className="logo" style={logoStyle}>
        {isLogoHide ? <p>ALT</p> : <p>AdminLTE</p>}
      </div>

      <div className="navbar" style={navbarStyle}>
        <div className="navbar__icon" onClick={handleNavbarIconClick}>
          <i className="fa-solid fa-bars"></i>
        </div>

        <ul className="navbar__menu">
          <li>
            <i className="fa-solid fa-envelope"></i>
          </li>
          <li>
            <i className="fa-solid fa-bell"></i>
          </li>
          <li>
            <i className="fa-solid fa-flag"></i>
          </li>
          <li onClick={toggleDisplay}>
            <img
              className="img-menunav"
              src="/src/component/img/teacher.jpg"
              alt="/avarta"
            />
            <p>Nguyễn Quý Sỹ</p>

            <div className="dropdown__user" style={{ display: displayStyle }}>
              <div className="dropdown__header">
                <img
                  className="img-user"
                  src="/src/component/img/user2-160x160.jpg"
                  alt=""
                />
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </div>
              <div className="dropdown__content">
                <p>Followers</p>
                <p>Sales</p>
                <p>Friends</p>
              </div>
              <div className="dropdown__footer">
                <button>Profile</button>
                <button>Sign out</button>
              </div>
            </div>
          </li>
          <li>
            <i className="fa-solid fa-gears"></i>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
