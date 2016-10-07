/**
 * Created by chaofan on 2016/10/6.
 */
$(function() {
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

    FIFTHBARRIER.addEventListener('ended', function() {
        end();
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
        result.push(g);
    }).on('touchend', '.grammar', function() {
        $(this).removeClass('hover');
    });;

    function end() {
        $('.hit-area').unbind('click');
        $.ajax({
            url: '/user/end',
            type: 'post',
            dataType: 'json',
            data: {
                result:JSON.stringify([])
            },
            success: function (re) {
                //self.getScore();
            }

        });
    }

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
                        FIFTHBARRIER.play();
                    }

                }
            }
        });
    }


    var checkBeginBrkInterval =  setInterval(check_begin_brk, 1000);
});