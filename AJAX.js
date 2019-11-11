window.jQuery = function(ondeOrSelector) {
  let nodes = {};
  nodes.addClass = function() {};
  nodes.html = function() {};
  return nodes;
};
window.$ = window.jQuery;
window.jQuery.ajax = function(options) {
// 这种写法支持给jQuery.ajax传两个参数，只需把下面的let url = options.url; 替换成下面几行注释代码就可以了
//   let url
//   if(arguments.length ===1){
//     url = options.url;
//   }else if(arguments.length === 2){
//       url=arguments[0]
//       options=arguments[1]
//   } 

//   let url = options.url; 
//   let method = options.metjod;
//   let body = options.body;
//   let successFn = options.successFn;
//   let failFn = options.failFn;
//   let headers = options.headers;
  //   上面六行在ES6中可以优化成下面一行,叫解析赋值,即把options的value赋值给与这些value的key名字一样的变量，名字必须一样
  let {url, method, body, headers, successFn, failFn} = options

  let request = new XMLHttpRequest();
  request.open(method, url);
  for(let key in headers){
      let value = headers[key];
      request.setRequestHeader(key,value)
  }
  request.send(body);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        successFn.call(undefined, request.responseText);
      } else if (request.status >= 400) {
        failFn.call(undefined, request);
      }
    }
  };
};
function f1(responseText){}
function f2(responseText){}

myButton.addEventListener("click", (e) => {
  window.jQuery.ajax(
      url: "/xxx",
      method: "post", 
      headers:{
          'content-type':'application-x-www-form-urlencoded'
      },
      body: "a=1&b=2",
      successFn: (x) => {console.log(x)},
    //   回调也叫callback，给successFn传一个函数，但是自己不执行，再另一个函数内执行
      failFn: (x) => {console.log(x)});
});
