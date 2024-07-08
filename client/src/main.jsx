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

  return (
    <main>
      <article>
        <h1>Acme HR ({employees.length})</h1>
        <ul>
          {employees.map((employee) => {
            return (
              <li key={employee.id}>
                {employee.name}
                {employee.is_admin ? (
                  //   <span  style={{ paddingLeft: "1rem" }}>Administrator</span>
                  // ) : null}
                  <span className="admin">Administrator</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </article>
    </main>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
