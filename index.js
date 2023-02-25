const express = require("express");

const app = express();

app.get("/longPoll", (req, res) => {
  // Wait for new data
  setTimeout(() => {
    // Send response with new data
    res.send("New data");
  }, 5000);
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Long Polling Example</title>
      </head>
      <body>
        <h1>Long Polling Example</h1>
        <p>Waiting for updates...</p>
        <script>
          function longPoll() {
            fetch('/longPoll')
              .then(response => response.text())
              .then(data => {
                document.body.innerHTML += '<p>' + data + '</p>';
                longPoll();
              });
          }
          longPoll();
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
