import "./style.css";
import SidebarMenu from "./siderbarMenu";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="user">
          <img src="/src/component/img/user2-160x160.jpg" alt="" />
          <div className="user__inf">
            <h3>Alexander Pierce</h3>
            <p>
              <i className="fa-solid fa-circle"></i> Online
            </p>
          </div>
        </div>

        <form action="">
          <input
            type="text"
            name=""
            id="form-control"
            placeholder="Search..."
          />
          <button type="submit" name="search" id="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      <div className="sidebar__main">
        <h4>MAIN NAVIGATION</h4>
        <SidebarMenu />
        <h4>LABELS</h4>
        <ul className="sidebar__menu menu__footer">
          <li>
            <i className="fa-regular fa-circle Important"></i>Important
          </li>
          <li>
            <i className="fa-regular fa-circle Warning"></i>Warning
          </li>
          <li>
            <i className="fa-regular fa-circle Information"></i>Information
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
