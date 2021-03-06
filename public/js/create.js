/**
 * Created by chaofan on 2016/10/6.
 */
$(function() {

    var $mask = $('.mask');
    var $waitArea = $('#waitingArea');
    var $teacherHit = $('.btn-teacher-hit');
    var $ready = $('.btn-ready');
    var $result = $('.result');
    var FIFTHBARRIER = new Audio('../../public/audio/fifthbarrier.mp3');
    var SUCCESSSOUND = new Audio('../../public/audio/success.mp3');
    var FAILSOUND = new Audio('../../public/audio/fail.mp3');
    var renderInterval ;
    var result = [];
    var checkBeginBrkInterval ;
    var isBegin = 0;

    var timea, timeb, timec,teacherTime;
    $ready.on('touchstart',function($e){

        if (isBegin == 1) {
            return ;
        }
        $e.stopPropagation();
        FIFTHBARRIER.load();
        FIFTHBARRIER.pause();
        FAILSOUND.load();
        FAILSOUND.pause();
        SUCCESSSOUND.load();
        SUCCESSSOUND.pause();
        $mask.show();
        $waitArea.show();
        clearTimeout(timea);
        clearTimeout(timeb);
        clearTimeout(timec);
        clearTimeout(teacherTime);
        clearInterval(renderInterval);
        //FIFTHBARRIER.play();
        ////FIFTHBARRIER.playbackRate = 10;
        //render_xiaotu();
        ready();
        checkBeginBrkInterval = setInterval(check_begin_brk, 120);


    });

    FIFTHBARRIER.addEventListener('ended', function() {
        end();
    });



    $teacherHit.on('touchstart',function(){
        var $this = $(this);
        $this.addClass("btn-teacher-hit-show");
        window.audio.play(3);
    }).on("touchend",function(){
        $(this).removeClass("btn-teacher-hit-hover");
    });
    $('.hit-area').on('touchstart', '.grammar', function() {
        var $this = $(this);
        $this.addClass('hover');
        var g = $this.attr('class').split(' ')[1].replace(/g-/, '');
        var _value = $this.data('value');
        window.audio.play(_value);
        var time = Date.now();
        //console.error(time);
        result.push({time: time, item: g});
        console.log(JSON.stringify(result));
    }).on('touchend', '.grammar', function() {
        $(this).removeClass('hover');
    });

    $mask.on('touchstart',function() {
        $(this).hide();
        $result.hide();
        $waitArea.hide();
    });
    $waitArea.on('touchstart',function() {
        $(this).hide();
        $result.hide();
        $mask.hide();
    });

    $('.btn-reload').click(function() {
        $result.hide();
        $ready.trigger('touchstart');
    });

    function end() {
        isBegin = 0;
        clearInterval(renderInterval);
        $('.hit-area').unbind('click');
        $.ajax({
            url: '/user/end',
            type: 'post',
            dataType: 'json',
            data: {
                result:JSON.stringify(result)
            },
            success: function (re) {
                setTimeout(getScore, 3000);
            }

        });
    };
    function getScore(){

            $.ajax({
                url: '/user/cal_score',
                type: 'post',
                dataType: 'json',
                success: function(re) {
                    if (re.code == 0) {

                        if (re.data.is_success == 1) {
                            $result.removeClass('fail').addClass("success").show();
                            $('.mask').show();
                            SUCCESSSOUND.play();
                        } else {
                            $result.removeClass('success').addClass("fail").show();
                            $('.mask').show();
                            FAILSOUND.play();
                        }
                    }
                }
            });
    };

    function check_begin_brk()
    {
        $.ajax({
            url: '/user/view',
            type: 'post',
            dataType: 'json',
            success: function(re) {
                if (re.code == 0) {
                    var user = re.data.user;
                    if (user.status == 2) {
                        clearInterval(checkBeginBrkInterval);
                        $mask.hide();
                        $waitArea.hide();
                        result = [];
                        //$teacherHit.addClass("btn-teacher-hit-hover");
                        //setTimeout(function(){
                        //    $teacherHit.removeClass("btn-teacher-hit-hover");
                        //}, 300);
                        FIFTHBARRIER.play();
                        FIFTHBARRIER.playbackRate = 1.1;
                        render_xiaotu();
                    }

                }
            }
        });
    }


    function render_xiaotu()
    {
        isBegin = 1;
        var count = 1;
        var teacher = [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
            25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
            49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,
            73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88
        ];
        var group_a = [17,18,19,20,21,22,23,24];
        var group_b = [41,42,43,44,45,46,47,48];
        var group_c = [65,66,67,68,69,70,71,72];

        clearInterval(renderInterval);
        renderInterval = setInterval(function(){

            var _li = "<li> "+ count+"</li>";
            $("#log").append(_li);

            if ($.inArray(count, teacher) == 0 || $.inArray(count, teacher) != -1 ) {
                $teacherHit.addClass("btn-teacher-hit-hover");
                teacherTime = setTimeout(function(){
                    $teacherHit.removeClass("btn-teacher-hit-hover");
                    clearTimeout(teacherTime);
                }, 300);
            }
            if ($.inArray(count, group_a) == 0 || $.inArray(count, group_a) != -1 ) {
                $(".group-a span").addClass("grammar-show");
                 timea = setTimeout(function () {
                    $(".group-a span").removeClass("grammar-show");
                    clearTimeout(timea);
                }, 300);

            }
            if ($.inArray(count, group_b) == 0 || $.inArray(count, group_b) != -1) {
                $(".group-b span").addClass("grammar-show");
                 timeb = setTimeout(function () {
                    $(".group-b span").removeClass("grammar-show");
                    clearTimeout(timeb);
                }, 300);
            }
            if ($.inArray(count, group_c) == 0 || $.inArray(count, group_c) != -1) {
                $(".group-c span").addClass("grammar-show");
                 timec = setTimeout(function () {
                    $(".group-c span").removeClass("grammar-show");
                    clearTimeout(timec);
                }, 300);

            }
            count++;

            if (count > 72) {
                clearInterval(renderInterval);
            }
        }, 796);
    }

    function ready () {
        $.ajax({
            url: '/home/ready_break',
            type: 'post',
            data: {
                'level': 5
            },
            dataType: 'json',
            success: function(re) {
            }
        });
    }
});