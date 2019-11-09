myButton.addEventListener("click", e => {
  let request = new XMLHttpRequest(); 
  request.open("GET", "/xxx");
  //   配置request
  request.send();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
        // 当前文档的状态，浏览器发出请求后并不是瞬间得到全部相应，而是分为0,1,2,3,4,五个状态，4表示已完成下载
        // 0表示未调用open，1表示open以及调用，2表示send以及调用并且相应头和相应状态可获得，3表示下载中
      if (request.status >= 200 && request.status < 300) {
        let string = request.responseText
        let object = window.JSON.parse(string)
        // 把请求的相应的第四部分的符合JSON语法的字符串转换成JS对应的值
        // window.JSON.parse由浏览器提供
      } 
    }
  };
});
