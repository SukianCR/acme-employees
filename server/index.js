// static routes here (you only need these for deployment)

const express = require("express");
const app = express();
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_hr_db"
);

const PORT = process.env.PORT || 3023;

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", async (req, res, next) => {
  res.send("Acme Employees");
});

app.get("/api/employees", async (req, res, next) => {
  try {
    const SQL = `
          SELECT * from employees;
        `;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});

const init = async () => {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  await client.connect();
  const SQL = `
    DROP TABLE IF EXISTS employees;
    CREATE TABLE employees(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50),
      is_admin BOOLEAN DEFAULT FALSE
    );
    INSERT INTO employees(name, is_admin) VALUES('Mariana Vega', true);
    INSERT INTO employees(name, is_admin) VALUES('Carlos Jimenez', true);
    INSERT INTO employees(name) VALUES('Sonia Soto');
    INSERT INTO employees(name) VALUES('Daniel Sanchez');
  `;
  await client.query(SQL);
  console.log("data seeded");
};

init();

// app routes here

// create your init function

// init function invocation
