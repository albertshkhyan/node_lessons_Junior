const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.url === "/") {
      fs.readFile(path.join(__dirname, "views", "index.html"), "utf-8", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    }
    else if (req.url === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile(path.join(__dirname, "views", "about.html"), "utf-8", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    }
  }
  else if (method === "POST") {
    res.writeHead(201, { "Content-Type": "text/html" });
    const body = [];
    req
      .on("data", (chunk) => {
        body.push(Buffer.from(chunk));
      })
      .on("end", () => {
        const mssg = body.toString().split("=")[1];
        res.end(`<h1>Your message is: ${mssg}</h1>`);
      })
  }
});

server.listen(3000, () => {
  console.log("Server is running...");
});
