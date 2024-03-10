import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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

  const handlerOpenEditForm = () => {
    const editForm = document.getElementById("form-2");
    editForm.style.display = "block";
  };

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
              onClick={() => handlerOpenEditForm(student)}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteStudent(student.id)}
            ></i>
          </div>
        </tr>
      ))}
    </>
  );
}

export default DataTable;