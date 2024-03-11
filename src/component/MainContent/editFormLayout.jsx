/* eslint-disable react/prop-types */
import "./style.scss";
import { useState } from "react";

function EditFormLayout(student) {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const handleCloseForm = () => {
    setIsFormVisible(false);
  };
  const [formData, setFormData] = useState({
    name: student.student.name,
    email: student.student.email,
    city: student.student.city,
    phoneNumber: student.student.phoneNumber,
    score: student.student.score,
  });

  function checkInput() {
    var isValid = true;

    // Kiểm tra trường fullname không được để trống
    if (formData.name.trim() === "") {
      setErrorMessage(formData.name, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(formData.name);
    }

    // Kiểm tra trường email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(
        formData.email,
        "Trường này phải là một địa chỉ email hợp lệ."
      );
      isValid = false;
    } else {
      clearErrorMessage(formData.email);
    }

    // Kiểm tra trường location không được để trống
    if (formData.city.trim() === "") {
      setErrorMessage(formData.city, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(formData.city);
    }

    if (formData.phoneNumber.trim() === "") {
      setErrorMessage(formData.email, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(formData.email);
    }

    if (formData.score.trim() === "") {
      setErrorMessage(formData.score, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(formData.score);
    }

    return isValid;
  }

  function setErrorMessage(input, message) {
    var errorMessage = input.nextElementSibling;
    errorMessage.textContent = message;
  }

  function clearErrorMessage(input) {
    var errorMessage = input.nextElementSibling;
    errorMessage.textContent = "";
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    var isValid = checkInput();
    if (isValid) {
      // sendMain(formData);
      handleCloseForm();
    }
  };

  return (
    <>
      {isFormVisible && (
        <div className="wrapper__form">
          <form action="" method="POST" className="form" id="form-2">
            <h3 className="heading">Sửa Sinh viên</h3>
            <i className="fa-solid fa-x" onClick={handleCloseForm}></i>
            <div className="spacer"></div>

            <div className="form-group">
              <label className="form-label">Tên đầy đủ</label>
              <input
                id="fullnameEdit"
                name="name"
                onBlur={checkInput}
                type="text"
                placeholder="VD: Đinh Duy Thành"
                className="form-control"
                onChange={handleInputChange}
                value={formData.name}
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                name="email"
                onBlur={checkInput}
                id="emailEdit"
                type="text"
                placeholder="VD: email@domain.com"
                className="form-control"
                onChange={handleInputChange}
                value={formData.email}
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <label className="form-label">Địa chỉ</label>
              <input
                name="city"
                onBlur={checkInput}
                id="locationEdit"
                type="text"
                placeholder="VD : Hà Nội"
                className="form-control"
                onChange={handleInputChange}
                value={formData.city}
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <input
                name="phoneNumber"
                onBlur={checkInput}
                id="phoneNumberEdit"
                placeholder="VD : 093xxx"
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={formData.phoneNumber}
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <label className="form-label">Điểm kết thúc học phần</label>
              <input
                name="score"
                onBlur={checkInput}
                id="scoreEdit"
                placeholder="Vui lòng nhập số"
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={formData.score}
              />
              <span className="form-message"></span>
            </div>

            <button className="form-submit" onClick={handlerSubmit}>
              Sửa
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditFormLayout;
