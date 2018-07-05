/**
 * Created by Administrator on 2016/5/6.
 */
//禁止用户复制粘贴页面内容
document.oncontextmenu=new Function("event.returnValue=false");
document.onselectstart=new Function("event.returnValue=false");

$(function () {
    $(".btn").each(function () {
        $(this).click(function () {
            //获取显示框的文本内容并执行trim()函数去掉收尾的空格
            var Text = $("#displayer").text().trim();
            //把当前点击的数字或符号添加到显示框
            $("#displayer").append($(this).val());
            // 判断当前被点击的符号并作出相应的操作处理
            switch ($(this).val()) {//获取当前点击的元素的文本内容
                //如果当前元素的文本值是“C”,即单词“clear”的首字母，代表清空屏幕。
                case "C":
                    //执行$("#input").text("");来清除
                    $("#displayer").text("");
                    //break 语句可用于跳出循环。
                    // 与之相类似的continue 语句中断循环中的迭代，
                    // 如果出现了指定的条件，然后继续循环中的下一个迭代。
                    break;
                //如果当前元素的文本值是“D”,即单词“Delete”的首字母，代表删除。
                case "D":
                    //执行$("#input").text(Text.substr(0,Text.length-1));从最后一位开始删除
                    $("#displayer").text(Text.substr(0, Text.length - 1));
                    //break 语句可用于跳出循环。
                    break;
                //如果当前元素的文本值是“=”代表求值计算。
                case "=":
                //执行函数 compute进行计算求值。
                function compute(content){
                    //当无法确定在某个字符串中是否确实存在一个字符的时候,就可调用 indexOf() 和 lastIndexOf() 方法。indexOf() 和 lastIndexOf() 方法返回的都是指定的子串在另一个字符串中的位置，如果没有找不到子串，则返回 -1。这两个方法的不同之处在于，indexOf() 方法是从字符串的开头（位置 0）开始检索字符串，而 lastIndexOf() 方法则是从字符串的结尾开始检索子串。
                    var index = content.lastIndexOf("(");
                    //lastIndexOf("(")从后往前检索“（”，如果index大于-1证明字符串中存在“（”
                    if(index > -1){
                        //indexOf(")",index);从前往后检索“）”，
                        var nextIndex = content.indexOf(")",index);

                        if(nextIndex > -1){
                            //递归的思想,一步一步的递归
                            var result=compute(content.substring(index + 1,nextIndex));
                            return compute(content.substring(0,index)+(""+result)+content.substring(nextIndex+1));
                        }
                    }
                    //实现运算符优先级的代码：
                    index=content.indexOf("+");
                    if(index>-1){
                        return compute(content.substring(0,index))+compute(content.substring(index+1));
                    }
                    index=content.lastIndexOf("-");
                    if(index>-1){
                        return compute(content.substring(0,index))-compute(content.substring(index+1));
                    }
                    //如果返回的content为空,则返回0
                    index=content.indexOf("*");
                    if(index>-1){
                        return compute(content.substring(0,index))*compute(content.substring(index+1));
                    }
                    index=content.lastIndexOf("/");
                    if(index>-1){
                        return compute(content.substring(0,index))/compute(content.substring(index+1));
                    }
                    if(content==""){
                        return 0;
                    }else{
                        //将content字符串转化为数值,
                        //这儿也可以使用一些技巧,比如 content-1+1,使用加减操作符,将字符串转化为数值
                        return Number(content);
                    };
                };
                $("#displayer").text(compute(Text));
            };
        });
    });
});

/* 代码详解与开发思路：
一、给每个td元素添加一个click事件，通过判断点击不同的按钮来实现不同的行为。
例如：当判断点击的元素是操作符“C”的时候，使用$("#input").text("");来清空元素的文本内容。

二、实现计算的思路：
    最后做出的代码运用了递归的思想，思路如下：
    （1）在点击等号之后，获取到输入的运算式，这个运算式是以字符串的形式存在的，运行compute函数，这个函数的目的是循环查找在字符串中的操作符，在找到操作符之后，将字符串中的以操作符为间隔分为两部分，对于每一部分再进行compute函数的运算，再查找运算符，再进行一次运算，循环，这样一直循环嵌套，一直运算到没有出现运算符为止

    （2）实现优先级的代码：
我们知道，在等式运算中，加号和减号的地位是相同的，乘号和除号地位是相同的，先乘除后加减，这就是运算符的优先问题，如何实现运算符优先问题呢？
在这个代码中，是通过根据判断不同运算符是否存在的顺序先后来实现的，在程序中有下面这一段代码：
    index=content.indexOf("+");
    if(index>-1){
        return compute(content.substring(0,index))+compute(content.substring(index+1));
    }
    index=content.lastIndexOf("-");
    if(index>-1){
        return compute(content.substring(0,index))-compute(content.substring(index+1));
    }
    //如果返回的content为空,则返回0
    index=content.indexOf("*");
    if(index>-1){
        return compute(content.substring(0,index))*compute(content.substring(index+1));
    }
    index=content.lastIndexOf("/");
    if(index>-1){
        return compute(content.substring(0,index))/compute(content.substring(index+1));
    }
在上面的代码中，先判断的加减号，后判断的乘除号，这里解决的是优先级问题，
例如下面表达式：
    1+2*3+4
    在程序中，先查找到加号运算符，分成两部分，1和 2*3+4  在后面的那一部分中，在进行循环运算，根据程序，先查找加号，又分为了两部分，2*3和4对于2*3运行函数，找到了*号运算符，这时候没有多余的运算符，直接计算2*3等式。
注意知识点：
    1、$(selector).trim()用于消除字符串之间的间隔；
    2、$(selector).each（function(){}）用于遍历每个元素，
    3、$(selector).text()用于获取匹配元素内的文本，注意：在我们使用的是$(selector).text()来获取元素的，在一般的情况下 对于$("td").[0]===$("td:eq(0)")===document.getElementByTagName("td")[0]是等价的。
如果我们要获取元素内的文本元素，我们需要通过$("td:eq(0)")来获得，而对于$("td").[0]则获取不到，因此要注意，不要混用
    4、对于字符串的操作方法：
在ECMAScript中存在三种基于子字符串创建新字符串的方法：
slice()、substr()、substring()这三种方法都会返回被操作字符的一个子字符串，当接受两个参数的时候，第一个参数指定字符串的开始位置，第二个参数指定子字符串在哪里结束，对于slice()，substring()和substr()第二个参数表示的意思还不同，对于slice()和substring()第二个参数表示子字符串最后一个字符后面的位置，而对于substr()表示的是返回的字符个数：
代码如下：
    var stringValue="hello world";
    alert(stringValue.substring(3,7));//"lo w"
    alert(stringValue.slice(3,7));//"lo w"
    alert(stringValue.substr(3,7)//"lo worl"
如上：
字符串的序号从零开始，对于substring()和slice（）截取的是从3开始到7后面的那个字符结束的位置，实际上不包括字符位置为7的位置（最后截取的字符串因此不包括字符"o"）,但是包括一开始就截取的开头的字符（"l"）
而对于substr()表示的是从3的位置开始，要截取7个字符的字符长度作为字符串
如果没有第二个参数，这表示将字符串的长度作为结束位置：代码如下：
    alert(stringValue.substring(3));
    alert(stringValue.slice(3));
    alert(stringValue.substr(3))
最后输出结果均为：
    "lo world"
如上:
 */