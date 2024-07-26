import url from "node:url"
import http from "node:http"

http.createServer(async (req, res) => {
  const uri = url.parse(req.url, true).pathname

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  switch(uri) {
    case '/sse':
      writeHead(res);
      pushEvent(res);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end('404 Not Found')
  }
}).listen(4000)


function writeHead(res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
}

function pushEvent(res) {
  const n = Math.random()
  res.write(`event: random\n`)
  res.write(`data: ${n}\n\n`)

  setTimeout(() => {
    pushEvent(res)
  }, 1000)
}



