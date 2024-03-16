import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteFormLayout from "./deleteFormLayout";
import ModalForm from "./modalForm";

function calculateGrade(score) {
  if (score >= 9) {
    return "A";
  } else if (score >= 8) {
    return "B";
  } else if (score >= 6) {
    return "C";
  } else if (score >= 4) {
    return "D";
  } else if (score < 4) {
    return "F";
  }
}

// eslint-disable-next-line react/prop-types
function DataTable() {
  const [dataApi, setDataApi] = useState([]);
  const postApi = "https://60becf8e6035840017c17a48.mockapi.io/users";

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormDeleteVisible, setIsFormDeleteVisible] = useState(false);
  const [getModal, setGetModal] = useState(false);
  const [getModalDelete, setGetModalDelete] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedStudentDelete, setSelectedStudentDelete] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(postApi)
        .then((response) => {
          setDataApi(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getData();
  }, []);

  const openEditLayout = (student) => {
    setSelectedStudent(student);
    setGetModal({
      modal: "Sửa",
      isShow: isFormVisible,
    });
    setIsFormVisible(!isFormVisible);
  };

  const openAddLayout = () => {
    setSelectedStudent({
      name: "",
      email: "",
      city: "",
      phoneNumber: "",
      score: "",
      id: "",
    });
    setGetModal({
      modal: "Thêm",
      isShow: isFormVisible,
    });
    setIsFormVisible(!isFormVisible);
  };

  const OpenDeleteLayout = (student) => {
    setGetModalDelete({
      isShow: isFormVisible,
    });
    setIsFormDeleteVisible(!isFormDeleteVisible);
    setSelectedStudentDelete(student);
  };

  const handleForm = async (formData, modal) => {
    if (modal === "Thêm") {
      await axios.post(postApi, formData).then((response) => {
        setDataApi([...dataApi, response.data]);
      });
    } else if (modal === "Sửa") {
      await axios
        .put(`${postApi}/${formData.id}`, formData)
        .then((response) => {
          const updatedDataApi = dataApi.map((item) => {
            if (item.id === formData.id) {
              return response.data;
            }
            return item;
          });
          setDataApi(updatedDataApi);
        });
    }
  };

  const handlerDelete = async (isChecked, student) => {
    if (isChecked) {
      await axios
        .delete(`${postApi}/${student.id}`)
        .then(() => {
          setDataApi((prevData) =>
            prevData.filter((data) => data.id !== student.id)
          );
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    }
  };

  return (
    <>
      <h3>
        Thông tin sinh viên
        <button onClick={openAddLayout}>Add</button>
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
          {dataApi.length > 0 &&
            dataApi.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.city}</td>
                <td>{student.phoneNumber}</td>
                <td
                  className="score"
                  style={
                    calculateGrade(student.score) === "F"
                      ? { color: "red" }
                      : { color: "black" }
                  }
                >
                  {calculateGrade(student.score)}
                </td>
                <div className="icon">
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => openEditLayout(student)}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => OpenDeleteLayout(student)}
                  ></i>
                </div>
              </tr>
            ))}
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
      {getModal && selectedStudent && (
        <ModalForm
          getData={selectedStudent}
          getModal={getModal}
          sendData={handleForm}
        />
      )}

      {getModalDelete && (
        <DeleteFormLayout
          student={selectedStudentDelete}
          getModalDelete={getModalDelete}
          sendDelete={handlerDelete}
        />
      )}
    </>
  );
}

export default DataTable;
