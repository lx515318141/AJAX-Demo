var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  if (path === "/") {
    let string = fs.readFileSync("./index.html", "utf8");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(string);
    response.end();
  } else if (path === "/main.js") {
    let string = fs.readFileSync("./main.js", "utf8");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(string);
    response.end();
  } else if (path === "/xxx") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/xml;charset=utf-8");
    response.setHeader('Access-Control-Allow-Origin', 'http://xxxxxxxxx')
    // CORS 跨站资源共享，允许另一个网站发送AJAX请求，'http://xxxxxxx'为允许的那个网站的网址
    // 如果网址用*号代替，表示允许所有网址发送AJAX请求
    response.write(`
    {
        note{
            "to": "小刘"
            "from": "小李"
            "heading": "打招呼"
            "content": "hello"
        }
    }
    `);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write("呜呜呜");
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
