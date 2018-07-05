/**
 * Created by Administrator on 2016/12/15.
 */

$('.up_left,.up_right,.earrings,.bracelet,.down_right').mouseover(function(){
    $(this).animate({
        opacity:0.5
    }, 50 );
    $(this).animate({
        opacity:1
    },100 );
})

