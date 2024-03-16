import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function DeleteFormLayout({ student, getModalDelete, sendDelete }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsFormVisible(true);
  }, [getModalDelete]);

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCloseForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handlerDeleteSubmit = () => {
    if (isChecked) {
      sendDelete(isChecked, student);
      setIsFormVisible(false);
    }
  };

  return (
    <>
      {isFormVisible && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseForm}>
              &times;
            </span>
            <div className="content">
              <div className="checkbox-wrapper-1">
                <input
                  id="example-1"
                  className="substituted"
                  type="checkbox"
                  aria-hidden="true"
                  checked={isChecked}
                  onChange={handleCheck}
                />
                <label htmlFor="example-1"></label>
              </div>
              <p>Tôi không phải người máy</p>
              <img
                src="/src/component/img/z5241423580382_743311370f186f9e4951fec60ed18bd5.jpg"
                alt=""
              />
            </div>
            <button className="delete-btn" onClick={handlerDeleteSubmit}>
              Xác nhận xóa
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteFormLayout;
