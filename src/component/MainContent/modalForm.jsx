/* eslint-disable react/prop-types */
import "./style.scss";
import { useState, useEffect } from "react";

var formInputs = [
  {
    nameInput: "Tên Đầy đủ",
    id: "name",
    placeholder: "VD: Đinh Duy Thành",
    value: "name",
  },
  {
    nameInput: "Email",
    id: "email",
    placeholder: "VD: email@domain.com",
    value: "email",
  },
  {
    nameInput: "Địa chỉ",
    id: "city",
    placeholder: "VD : Hà Nội",
    value: "city",
  },
  {
    nameInput: "Số điện thoại",
    id: "phoneNumber",
    placeholder: "VD : 093xxx",
    value: "phoneNumber",
  },
  {
    nameInput: "Điểm kết thúc học phần",
    id: "score",
    placeholder: "Vui lòng nhập số",
    value: "score",
  },
];

function ModalForm({ getData, getModal, sendData }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState();

  useEffect(() => {
    setIsFormVisible(true);
  }, [getModal.isShow]);
  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    setFormData({
      name: getData.name,
      email: getData.email,
      city: getData.city,
      phoneNumber: getData.phoneNumber,
      score: getData.score,
      id: getData.id,
    });
  }, [getData]);

  const [inputErrors, setInputErrors] = useState({
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

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setInputErrors({
          ...inputErrors,
          [name]: "Trường này phải là một địa chỉ email hợp lệ.",
        });
        return;
      }
    }
    if (value === "") {
      setInputErrors({ ...inputErrors, [name]: "Vui lòng nhập trường này." });
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    const updatedErrors = {};
    formInputs.forEach((formInput) => {
      if (formData[formInput.value] === "") {
        updatedErrors[formInput.value] = "Vui lòng nhập trường này.";
        isValid = false;
      } else if (formInput.value === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[formInput.value])) {
          updatedErrors[formInput.value] =
            "Trường này phải là một địa chỉ email hợp lệ.";
          isValid = false;
        }
      }
    });

    if (!isValid) {
      setInputErrors(updatedErrors);
    } else {
      setInputErrors({});
      sendData(formData, getModal.modal);
      handleCloseForm();
    }
  };

  return (
    <>
      {isFormVisible && (
        <div className="modal__form">
          <form action="" method="POST" className="form" id="form-1">
            <h3 className="heading">{getModal.modal} sinh viên</h3>
            <i className="fa-solid fa-x" onClick={handleCloseForm}></i>
            <div className="spacer"></div>

            {formInputs.map((formInput) => (
              <div key={formInput.id} className="form-group">
                <label className="form-label">{formInput.nameInput}</label>
                <input
                  className="form-control"
                  type="text"
                  id={formInput.id}
                  name={formInput.value}
                  placeholder={formInput.placeholder}
                  value={formData[formInput.value]}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                />
                {inputErrors[formInput.value] && (
                  <span className="form-message">
                    {inputErrors[formInput.value]}
                  </span>
                )}
              </div>
            ))}

            <button className="form-submit" onClick={handlerSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ModalForm;
