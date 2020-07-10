const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(path.join(__dirname, "views", "index.html"), "utf-8", (err, data) => {
      if (err) throw err;
      res.end(data);
    });


  }
  else if(method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(path.join(__dirname, "views", "about.html"), "utf-8", (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
  else if (method === "POST") {
    res.writeHead(201, { "Content-Type": "text/html" });
    const body = [];
    req
      .on("data", (chunk) => {
        // console.log('chunk', chunk);//<Buffer 6d 73 73 67 3d 68 65 6c 6c 6f> - unhandle buffer
        // console.log('Buffer.from(chunk)', Buffer.from(chunk));//<Buffer 6d 73 73 67 3d 68 65 6c 6c 6f> - in this case chunk is handle
        const handledChunk = Buffer.from(chunk);

        body.push(handledChunk);//[ <Buffer 6d 73 73 67 3d 68 65 6c 6c 6f> ]
        // console.log('body', body);
      })
      .on("end", () => {
        // console.log('body.toString()', body.toString());//mssg=hello
        const mssg = body.toString().split("=")[1];

        res.end(`<h1>Your message is: ${mssg}</h1>`);
      })
  }
  // console.log('method', method);//POST
});

server.listen(3000, () => {
  console.log("Server is running...");
});
