import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import EditFormLayout from "./editFormLayout";

function calculateGrade(score) {
  if (score > 9) {
    return "A";
  } else if (score > 8) {
    return "B";
  } else if (score > 6) {
    return "C";
  } else if (score > 4) {
    return "D";
  } else if (score < 4) {
    return "F";
  }
}

function DataTable(formData1) {
  const [dataApi, setDataApi] = useState([]);
  const postApi = "https://60becf8e6035840017c17a48.mockapi.io/users";
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
        .then((response) => {
          console.log("Data posted successfully:", response);
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

  // const editStudent = (id) => {
  //   axios
  //     .delete(`${postApi}/${id}`)
  //     .then(() => {
  //       console.log("Student deleted successfully");
  //       setDataApi((prevData) => prevData.map((student) => student.id !== id));
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting student:", error);
  //     });
  // };

  const deleteStudent = (id) => {
    axios
      .delete(`${postApi}/${id}`)
      .then(() => {
        console.log("Student deleted successfully");
        setDataApi((prevData) =>
          prevData.filter((student) => student.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const editStudent = (student) => {
    setIsFormVisible(!isFormVisible);
    setSelectedStudent(student);
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
              onClick={() => editStudent(student)}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteStudent(student.id)}
            ></i>
          </div>
        </tr>
      ))}
      {isFormVisible && <EditFormLayout student={selectedStudent} />}
    </>
  );
}

export default DataTable;
