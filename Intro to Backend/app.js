const express = require("express");

const app = express();

const PORT = 3000;

// Homepage
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Backend Project</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            text-align: center;
            padding: 40px;
          }

          h1 {
            color: #2563eb;
          }

          p {
            font-size: 18px;
            margin: 20px;
          }
        </style>
      </head>

      <body>
        <h1>Welcome to my backend :D !</h1>

        <p id="user-count">Loading user count...</p>

        <script>
          fetch('/user-count')
            .then(response => response.json())
            .then(data => {
              document.getElementById('user-count').textContent =
                'Total users: ' + data.count;
            });
        </script>
      </body>
    </html>
  `);
});

app.get("/user-count", (req, res) => {
  res.json({
    count: 67,
  });
});

app.get("/time", (req, res) => {
  res.send(new Date().toString());
});

app.get("/about", (req, res) => {
  res.send(`
    <h1>About My Backend</h1>
    <p>Project: Backend Week 1</p>
    <p>Student: Peter</p>
    <p>This is my first Express API.</p>
  `);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
