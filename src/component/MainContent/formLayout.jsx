/* eslint-disable react/prop-types */
import "./style.scss";
import { useState } from "react";

function FormLayout({ sendMain }) {
  function checkInput() {
    var fullnameInput = document.getElementById("fullname");
    var emailInput = document.getElementById("email");
    var locationInput = document.getElementById("location");
    var phoneNumberInput = document.getElementById("phoneNumber");
    var scoreInput = document.getElementById("score");

    var isValid = true;

    // Kiểm tra trường fullname không được để trống
    if (fullnameInput.value.trim() === "") {
      setErrorMessage(fullnameInput, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(fullnameInput);
    }

    // Kiểm tra trường email
    var emailValue = emailInput.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setErrorMessage(
        emailInput,
        "Trường này phải là một địa chỉ email hợp lệ."
      );
      isValid = false;
    } else {
      clearErrorMessage(emailInput);
    }

    // Kiểm tra trường location không được để trống
    if (locationInput.value.trim() === "") {
      setErrorMessage(locationInput, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(locationInput);
    }

    if (phoneNumberInput.value.trim() === "") {
      setErrorMessage(phoneNumberInput, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(phoneNumberInput);
    }

    if (scoreInput.value.trim() === "") {
      setErrorMessage(scoreInput, "Trường này không được để trống.");
      isValid = false;
    } else {
      clearErrorMessage(scoreInput);
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phoneNumber: "",
    score: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isFormVisible, setIsFormVisible] = useState(true);
  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    var isValid = checkInput();
    if (isValid) {
      sendMain(formData);
      handleCloseForm();
    }
  };

  return (
    <>
      {isFormVisible && (
        <div className="wrapper__form">
          <form action="" method="POST" className="form" id="form-1">
            <h3 className="heading">Thêm sinh viên</h3>
            <i className="fa-solid fa-x" onClick={handleCloseForm}></i>
            <div className="spacer"></div>

            <div className="form-group">
              <label className="form-label">Tên đầy đủ</label>
              <input
                id="fullname"
                name="name"
                onBlur={checkInput}
                type="text"
                placeholder="VD: Đinh Duy Thành"
                className="form-control"
                onChange={handleInputChange}
                value={formData.fullname}
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                name="email"
                onBlur={checkInput}
                id="email"
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
                id="location"
                type="text"
                placeholder="VD : Hà Nội"
                className="form-control"
                onChange={handleInputChange}
                value={formData.location}
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <input
                name="phoneNumber"
                onBlur={checkInput}
                id="phoneNumber"
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
                id="score"
                placeholder="Vui lòng nhập số"
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={formData.score}
              />
              <span className="form-message"></span>
            </div>

            <button className="form-submit" onClick={handlerSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default FormLayout;
