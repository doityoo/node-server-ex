const http = require('http');

const PORT = 4999;

const ip = 'localhost';

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(200, defaultCorsHeader)
    response.end("Preflight OPTIOS success")
  }

  if (request.method === "POST" && request.url === "/upper") {
    let strBody = '';
    request.on("data", (contents) => {
      strBody = strBody + contents;
    }).on('end', ()=> {
      strBody = strBody.toUpperCase();
      response.writeHead(200, defaultCorsHeader);
      response.end(strBody);
    });
  } else if (request.method === "POST" && request.url === "/lower") {
    let strBody = '';
    request.on("data", (contents) => {
    strBody = strBody + contents;
    }).on('end', () => {
      strBody = strBody.toLowerCase();
      response.writeHead(200, defaultCorsHeader);
      response.end(strBody);
    });
  } else {
    request.on('error', () => {
      response.writeHead(400, defaultCorsHeader);
      request.end()
    })
  }

  console.log(
    `http request method is ${request.method}, url is ${request.url}`
  );
  // response.writeHead(200, defaultCorsHeader);
  // response.end('hello mini-server sprints');
});

server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': 10
};
