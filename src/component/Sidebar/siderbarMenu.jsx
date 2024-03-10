import "./style.css";
import { useState } from "react";

var components = [
  {
    name: "Dasboard",
    logo: "fa-gauge",
    child: ["Dasboard v1", "Dasboard v2"],
  },
  {
    name: "Layout Opitions",
    logo: "fa-file",
    isPrimary: 4,
    child: ["Top Navigation", "Boxed", "Fixed", "Collapsed Sidebar"],
  },
  {
    name: "Widgets",
    logo: "fa-table-cells",
    isSucess: 1,
    child: [],
  },
  {
    name: "Charts",
    logo: "fa-chart-pie",
    child: ["ChartJS", "Morris", "Flot", "Inline charts"],
  },
  {
    name: "UI Elements",
    logo: "fa-laptop",
    child: ["General", "Icons", "Buttons", "Sliders", "Timeline", "Modals"],
  },
  {
    name: "Form",
    logo: "fa-pen-to-square",
    child: ["General Elements", "Advanced Elements", "Editors"],
  },
  {
    name: "Tables",
    logo: "fa-table",
    child: ["Simple Tables", "Data Tables"],
  },
  {
    name: "Calendar",
    logo: "fa-calendar-days",
    isPrimary: 17,
    isDanger: 3,
    child: [],
  },
  {
    name: "Mailbox",
    logo: "fa-envelope",
    isSucess: 16,
    isDanger: 5,
    isWarning: 12,
    child: [],
  },
  {
    name: "Examples",
    logo: "fa-folder",
    child: [
      "Invoice",
      "Profile",
      "Login",
      "Register",
      "Lockscreen",
      "404 Error",
      "500 Error",
      "Black Page",
      "Pace Page",
    ],
  },
  {
    name: "Multilevel",
    logo: "fa-share",
    child: ["Level One", "Level Two", "Level Three"],
  },
  {
    name: "Documentation",
    logo: "fa-book",
    child: [],
  },
];
function SidebarMenu() {
  const [showChild, setShowChild] = useState([]);

  const toggleSidebarChild = (index) => {
    const newShowChild = [...showChild]; // Tạo một bản sao của mảng trạng thái hiện tại
    newShowChild[index] = !newShowChild[index]; // Đảo ngược trạng thái của `li` tương ứng
    setShowChild(newShowChild); // Cập nhật mảng trạng thái mới
    var iconleft = document.querySelector(`.chevron-left${index}`);
    var li = document.querySelector(`.component${index}`);
    if (newShowChild[index] === true) {
      li.style.background = "#1e282c";
      li.style.color = "#fff";
      iconleft.style.animation = "rotate-90 0.8s ease forwards";
    } else if (newShowChild[index] === false) {
      li.style.background = "#1a2226";
      li.style.color = "#b8c7ce";
      iconleft.style.animation = "rotate90 0.8s ease forwards";
    }
  };

  return (
    <ul className="sidebar__menu">
      {components.map((component, index) => (
        <>
          <li
            key={index}
            className={`component${index}`}
            onClick={() => toggleSidebarChild(index)}
          >
            <i className={`fa-solid  ${component.logo}`}>
              <span>{component.name}</span>
            </i>
            <div className="notifications">
              {component.isPrimary ||
              component.isSucess ||
              component.isWarning ||
              component.isDanger ? (
                ""
              ) : (
                <i
                  className={`fa-solid fa-chevron-left chevron-left${index}`}
                ></i>
              )}
              {component.isPrimary && (
                <span className="primary">
                  {component.isPrimary === 1 ? "new" : component.isPrimary}
                </span>
              )}
              {component.isSucess && (
                <span className="success">
                  {component.isSucess === 1 ? "new" : component.isSucess}
                </span>
              )}
              {component.isWarning && (
                <span className="warning">
                  {component.isWarning === 1 ? "new" : component.isWarning}
                </span>
              )}
              {component.isDanger && (
                <span className="danger">
                  {component.isDanger === 1 ? "new" : component.isDanger}
                </span>
              )}
            </div>
          </li>

          {showChild[index] ? (
            <ul className={"sideBarChild"}>
              {component.child.map((child, index) => (
                <li key={index}>
                  <i className="fa-regular fa-circle"></i>
                  {child}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </>
      ))}
    </ul>
  );
}

export default SidebarMenu;
