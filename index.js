const http = require("http");

const server = http.createServer((req, res) => {
  const { method } = req;
  if (method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
  <form method="post" action="/">
    <input type="tex" name="mssg"/>
    <button type="submit">Send</button>
  </form>
  `);

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
