$(function () {
    var windowH = $(window).height(),
        startX,
        startY,
        laststage = $('.slide_stage').length;
        slideWrap = $('#slide_wrap');


    //通用页面划屏
    slideWrap.on('touchstart','.slide_stage',function(event){
        event.preventDefault();
        var myIndex = $(this).attr('id').substr(5,1);
        var touch = event.originalEvent.touches[0];
        startX = touch.pageX;
        startY = touch.pageY + (myIndex-1)*windowH;

        slideWrap.removeClass('autoslide');
    })

    slideWrap.on('touchmove','.slide_stage',function(event){
        event.preventDefault();
        var myIndex = $(this).attr('id').substr(5,1);
        var touch = event.originalEvent.touches[0];
        var x = touch.pageX - startX;
        var y = touch.pageY - startY;
        //定义位移方位
        var moveDis = touch.pageY - startY + (myIndex-1)*windowH;
        
        if(myIndex==1 && moveDis>0){
            return false;
        }
        if(myIndex == laststage && moveDis<0){
            return false;
        }

        slideWrap.css('-webkit-transform','translate3d(0,' + y + 'px,0)');
    })

    slideWrap.on('touchend','.slide_stage',function(event){
        event.preventDefault();
        var myIndex = $(this).attr('id').substr(5,1);
        var touch = event.originalEvent.changedTouches[0];
        var x = touch.pageX - startX;
        var y = touch.pageY - startY + (myIndex-1)*windowH;

        $(this).removeClass('active');
        slideWrap.addClass('autoslide');
        //向下滑动
        if(myIndex!=laststage && y<=-50){
            slideWrap.css('-webkit-transform','translate3d(0,'+ -myIndex * windowH +'px,0)');
            $(this).next('.slide_stage').addClass('active');
        }
        //保持原页
        if(y>=-50 && y <50){
            slideWrap.css('-webkit-transform','translate3d(0,'+ -(myIndex-1) * windowH +'px,0)');
        }
        //向上滑动
        if(myIndex!=1 && y>=50){
            slideWrap.css('-webkit-transform','translate3d(0,'+ -(myIndex-2) * windowH +'px,0)');
            $(this).prev('.slide_stage').addClass('active');
        }   
        $(this).removeClass('stage_scale')
    })

    //滑动时页面微缩
    slideWrap.on('touchmove','.slide_stage',function(event){
        $(this).addClass('stage_scale');
    })
    slideWrap.on('touchend','.slide_stage',function(){
        $(this).removeClass('stage_scale');
    })


    //左右切换图
    $('.pic_box').on('touchstart','li',function(event){
        event.stopPropagation();  
        var touch = event.originalEvent.touches[0];
        slideX = touch.pageX;
    })
    $('.pic_box').on('touchmove','li',function(event){
        event.stopPropagation();
        var touch = event.originalEvent.touches[0];
        var x = touch.pageX - slideX;
        $('.pic_box ul').css('-webkit-transform','translate3d('+ x +'px,0,0)') 
    })
    $('.pic_box').on('touchend','li',function(event){
        event.stopPropagation();   
    })


    //音频处理
    $('#audio_switch').on('click',function(){
        
    })

});