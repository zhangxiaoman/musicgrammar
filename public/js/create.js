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
    //var Grammar    = {
        //    sidedrum: new Audio('../../public/audio/Tabour.wav'),
        //    tam: new Audio('../../public/audio/bigbong.wav'),
        //    mule: new Audio('../../public/audio/maluo.wav'),
        //    cymbal: new Audio('../../public/audio/dabo.wav'),
        //    tupan: new Audio('../../public/audio/tanggu.wav')
        //};

    var result = [];

    $ready.on('touchstart',function(){
        FIFTHBARRIER.load();
        FIFTHBARRIER.pause();
        $mask.show();
        $waitArea.show();
    });

    FIFTHBARRIER.addEventListener('ended', function() {
        end();
    });


    $teacherHit.on('touchstart',function(){
        var $this = $(this);
        $this.addClass("btn-teacher-hit-hover");
        var g = "sidedrum";
        var grammarIndex  = window.grammarIndex[g] || 0;
        window.grammar[g][grammarIndex].currentTime = 0.02;
        window.grammar[g][grammarIndex].play();
        window.grammarIndex[g]++;
        window.grammar[g][9-grammarIndex].load();
        if(window.grammarIndex[g] == 10) {
            window.grammarIndex[g] = 0;
        }
    }).on("touchend",function(){
        $(this).removeClass("btn-teacher-hit-hover");
    });
    $('.hit-area').on('touchstart', '.grammar', function() {
        var $this = $(this);
        $this.addClass('hover');
        var g = $this.attr('class').split(' ')[1].replace(/g-/, '');
        var grammarIndex  = window.grammarIndex[g] || 0;
        window.grammar[g][grammarIndex].currentTime = 0.02;
        window.grammar[g][grammarIndex].play();
        window.grammarIndex[g]++;
        window.grammar[g][9-grammarIndex].load();
        if(window.grammarIndex[g] == 10) {
            window.grammarIndex[g] = 0;
        }

        var time = Date.now();
        //console.error(time);
        result.push({time: time, item: g});
        console.log(JSON.stringify(result));
    }).on('touchend', '.grammar', function() {
        $(this).removeClass('hover');
    });

    $('.btn-reload').click(function() {
        $result.hide();
        $ready.trigger('touchstart');
    });

    function end() {
        $('.hit-area').unbind('click');
        $.ajax({
            url: '/user/end',
            type: 'post',
            dataType: 'json',
            data: {
                result:JSON.stringify(result)
            },
            success: function (re) {
                getScore();
            }

        });
    };
    function getScore(){

        setInterval(
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
            }), 2000);
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
                        FIFTHBARRIER.play();
                    }

                }
            }
        });
    }

    var checkBeginBrkInterval =  setInterval(check_begin_brk, 1000);
});