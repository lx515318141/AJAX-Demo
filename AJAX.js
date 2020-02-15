myButton.addEventListener("click", e => {
  $.ajax({
    url: "/xxx",
    method: "get",
  }).then(
    //   成功和失败不需要给函数命名，成功对应的函数放在第一位，失败的放在第二位
    responseText => {
      console.log(responseText);
      return "成功"
    },
    request => {
      console.log("error");
      return "已经处理"
    }
  ).then(
    上一次的处理结果 => {
        console.log(上一次的处理结果);
      },
      request => {
        console.log("error2");
      }
  )
  console.log("此段代码用作实验")
//   透传当对于一个结果需要进行两个函数处理是在then后面再then一次，第二次是对第一次处理结果的返回值进行再次处理
});
