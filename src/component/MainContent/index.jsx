/* eslint-disable no-undef */
import "./style.css";
import { useState } from "react";
import DataTable from "./dataTable";
import FormLayout from "./formLayout";

function MainContent() {
  const [formData1, setFormData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const formData = (data) => {
    setFormData(data);
  };

  return (
    <div className="wrapper">
      {isFormVisible && <FormLayout sendMain={formData} />}

      <h3>
        Thông tin sinh viên
        <button onClick={handleAddButtonClick}>Add</button>
      </h3>
      <table>
        <thead>
          <tr>
            <th>
              Tên sinh viên
              <i className="fa-solid fa-arrow-down-wide-short"></i>
            </th>
            <th>
              Email <i className="fa-solid fa-sort"></i>
            </th>
            <th>
              Địa chỉ<i className="fa-solid fa-sort"></i>
            </th>
            <th>
              Số điện thoại <i className="fa-solid fa-sort"></i>
            </th>
            <th>
              Điểm kết thúc học phần <i className="fa-solid fa-sort"></i>
            </th>
          </tr>
        </thead>

        <tbody>
          <DataTable formData={formData1} />
        </tbody>

        <thead>
          <tr>
            <th>Rendering engine</th>
            <th>Browser</th>
            <th>Platform(s)</th>
            <th>Engine version</th>
            <th>CSS grade</th>
          </tr>
        </thead>
      </table>

      <div className="navigation">
        <p>Showing 1 to 10 of 57 entries</p>

        <ul className="pagination">
          <li
            className="paginate_button previous disabled"
            id="example2_previous"
          >
            Previous
          </li>
          <li className="paginate_button active">1</li>
          <li className="paginate_button ">2</li>
          <li className="paginate_button ">3</li>
          <li className="paginate_button ">4</li>
          <li className="paginate_button ">5</li>
          <li className="paginate_button ">6</li>
          <li className="paginate_button next" id="example2_next">
            Next
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainContent;
