import "./style.css";
import DataTable from "./dataTable";

function MainContent() {
  return (
    <div className="wrapper">
      <DataTable />
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
