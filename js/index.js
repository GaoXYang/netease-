//滑屏操作
(function () {    
    var scrollWrap = document.querySelector('.scrollWrap'),
        inner = document.querySelector('.inner');

    var startPointX = 0,   
        startLeft = 0,   
        movePointX = 0;  

    inner.style.transform = 'translateX(0px)';

    scrollWrap.addEventListener('touchstart', function (ev) {   
        startPointX = ev.changedTouches[0].pageX;  
        startLeft = parseInt(inner.style.transform.split('(')[1]);
    });

    scrollWrap.addEventListener('touchmove', function (ev) {  
        movePointX = ev.changedTouches[0].pageX - startPointX;  
        var x = movePointX + startLeft; 

        if (x >= 0) {   
            x = 0;
        } else if (x <= scrollWrap.offsetWidth - inner.offsetWidth) {
            x = scrollWrap.offsetWidth - inner.offsetWidth;
        }

        inner.style.transform = 'translateX(' + x + 'px)';
        ev.preventDefault();   
    });
})();

  //折叠导航 
(function () {  
    var more = document.querySelector('.channel .more span'),
        channel = document.querySelector('.channel'),
        inner = document.querySelector('.inner'),
        shadow = document.querySelector('.shadow');

    var shrink = true;
    more.addEventListener('touchend', function () {
        if (shrink) {
            channel.classList.add('blockChannel');
            shadow.style.display = 'block';
        } else {
            channel.classList.remove('blockChannel');
            shadow.style.display = 'none';

        }

        shrink = !shrink;
    });

    shadow.addEventListener('touchstart', function (ev) {
        ev.preventDefault();
    })

})();

 //轮播图
(function () {   
    var banner = document.querySelector('.banner'),
        wrap = document.querySelector('.wrap'),
        circles = document.querySelectorAll('.banner .circle span'),
        imgWidth = banner.offsetWidth;    
    var startPointX = 0,
        startLeft = 0,
        movePointX = 0,
        cn = 0,   
        ln = 0,   
        timer = null;

    //初始化
    wrap.innerHTML += wrap.innerHTML;
    var len = wrap.children.length; 
    wrap.style.width = len * 100 + 'vw';
    wrap.style.transform = 'translateX(0px)';

    banner.addEventListener('touchstart', function (ev) {
        clearInterval(timer);

        wrap.style.transition = 'null';
        if (cn == 0) {  
            cn = len / 2;
        }
        if (cn == len - 1) {   
            cn = len / 2 - 1;
        }
        wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';

        startPointX = ev.changedTouches[0].pageX;
        startLeft = parseInt(wrap.style.transform.split('(')[1]);
    });

    banner.addEventListener('touchmove', function (ev) {
        movePointX = ev.changedTouches[0].pageX - startPointX;  
        wrap.style.transform = 'translateX(' + (movePointX + startLeft) + 'px)';

    })

    banner.addEventListener('touchend', function (ev) {
        movePointX = ev.changedTouches[0].pageX - startPointX;  

       
        var backWidth = imgWidth / 8;   
        if (Math.abs(movePointX) > backWidth) { 
            cn -= movePointX / Math.abs(movePointX);
        }

        wrap.style.transition = '.3s';
        wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';

        var hn = cn % (len / 2);
        circles[ln].className = '';
        circles[hn].className = 'active';
        ln = hn;

        timer = setInterval(move, 3000);
    });

    function move() {
        cn++;

        wrap.style.transition = '.3s';
        wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';

        wrap.addEventListener('transitionend', function () {
            if (cn > len - 1) {
                cn = len / 2 - 1;
            }

            wrap.style.transition = 'null';
            wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';

            var hn = cn % (len / 2);
            circles[ln].className = '';
            circles[hn].className = 'active';
            ln = hn;
        });
    }

    timer = setInterval(move, 3000);
})();

(function () {
    var backTop = document.querySelector('.backTop');

    window.onscroll = function () {
        var top = window.pageYOffset; 
        backTop.style.opacity = top > 600 ? 1 : 0;
    }

    backTop.addEventListener('touchend', function () {
        window.scrollTo(0, 0); 
    })
})();