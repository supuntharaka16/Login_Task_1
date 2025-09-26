const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "database"
let users = [
  { email: "test@example.com", password: "123456", name: "Demo User" }
];

// LOGIN route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, message: `Welcome ${user.name}!` });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// SIGNUP route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.json({ success: false, message: "User already exists!" });
  }

  // save new user
  users.push({ name, email, password });
  res.json({ success: true, message: "User registered successfully!" });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
);
