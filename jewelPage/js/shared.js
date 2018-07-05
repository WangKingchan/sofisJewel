/**
 * Created by Administrator on 2017/5/3.
 */
$(document).ready(function(){
    $(".middle_down>.middleDown_li").click(function(){
        if ($(this).is("._homePage")) {
            window.location.href = "./index.html";
            $(this).css("color","#84d8d1");
        }else if ($(this).is("._jewel")) {
            window.location.href = "./jewel.html";
            $(this).css("color","#84d8d1");
        }else if ($(this).is("._acc")) {
            window.location.href = "./Accessories.html";
            $(this).css("color","#84d8d1");
        }else if ($(this).is("._jewelry")) {
            window.location.href = "./jewelryList.html";
            $(this).css("color","#84d8d1");
        }else if ($(this).is("._gems")) {
            window.location.href = "./jewelryList.html";
            $(this).css("color","#84d8d1");
        }else if ($(this).is("._order")) {
            window.location.href = "./personalTailor.html";
            $(this).css("color","#84d8d1");
        }
    });
});