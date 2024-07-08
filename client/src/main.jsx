import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
      setIsLoading(false);
    };
    fetchEmployees();
  }, []);
  console.log(employees);

  if (isLoading) {
    return <section className="loading">Loading</section>;
  }

  function EmployeeRow({ employee }) {
    if (employee.is_admin) {
      return <li > <p > {employee.name}</p><p className="admin"> Administrator</p> </li>;
    }
    return <li>{employee.name}</li>;
  }

  return (
    <main>
      <article>
        <h1>Acme HR ({employees.length})</h1>
        <ul>
          {employees.map((employee) => {
            return <EmployeeRow employee={employee} />;
          })}
        </ul>
      </article>
    </main>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
