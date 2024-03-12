import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import EditFormLayout from "./editFormLayout";
import DeleteFormLayout from "./deleteFormLayout";

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

function DataTable(formData1) {
  const [dataApi, setDataApi] = useState([]);
  const postApi = "https://60becf8e6035840017c17a48.mockapi.io/users";
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormDeleteVisible, setIsFormDeleteVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentDelete, setSelectedStudentDelete] = useState(null);

  useEffect(() => {
    axios
      .get(postApi)
      .then((response) => {
        setDataApi(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (formData1.formData) {
      axios
        .post(postApi, formData1.formData)
        .then(() => {
          return axios.get(postApi);
        })
        .then((response) => {
          setDataApi(response.data);
          console.log("Data refreshed successfully:", response);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  }, [formData1.formData]);

  const OpenEditLayout = (student) => {
    setIsFormVisible(!isFormVisible);
    setSelectedStudent(student);
  };

  const handlerEdit = (formData) => {
    axios
      .put(
        `https://60becf8e6035840017c17a48.mockapi.io/users/${formData.id}`,
        formData
      )
      .then((response) => {
        const updatedDataApi = dataApi.map((item) => {
          if (item.id === formData.id) {
            return response.data;
          }
          return item;
        });
        setDataApi(updatedDataApi);
      });
  };

  const OpenDeleteLayout = (student) => {
    setIsFormDeleteVisible(!isFormDeleteVisible);
    setSelectedStudentDelete(student);
  };

  const handlerDelete = (isChecked, student) => {
    if (isChecked) {
      axios
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
      {dataApi.map((student) => (
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
              onClick={() => OpenEditLayout(student)}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={() => OpenDeleteLayout(student)}
            ></i>
          </div>
        </tr>
      ))}
      {isFormVisible && (
        <EditFormLayout student={selectedStudent} sendDataTable={handlerEdit} />
      )}
      {isFormDeleteVisible && (
        <DeleteFormLayout
          student={selectedStudentDelete}
          sendDelete={handlerDelete}
        />
      )}
    </>
  );
}

export default DataTable;
