/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $startBtn = $('.btn-start-exec');
    var $mask = $('.mask');
    var $selectBtn = $('.btn-select-level');
    var $selectLevel = $('.select-level');
    var $musicName = $('.music-name');

    // 关卡
    var level = 1;
    var musicNameObj = {
        '1': 'music-name',
        '2': 'music-name second',
        '3': 'music-name third',
        '4': 'music-name fourth',
        '5': 'music-name fifth'
    };

    $('.hit-area').off("touchstart").on('touchstart', '.grammar', function() {
        var $this = $(this);
        $this.addClass('hover');
        var g = $this.attr('class').split(' ')[1].replace(/g-/, '');

        var grammarIndex  = window.grammarIndex[g] || 0;
        window.grammar[g][grammarIndex].currentTime = 0.02;
        window.grammar[g][grammarIndex].play();
        window.grammarIndex[g]++;
        if(window.grammarIndex[g] == 10) {
            window.grammarIndex[g] = 0;
        }

    }).on('touchend', '.grammar', function() {
        $(this).removeClass('hover');
    });

    // 选择关卡
    $selectBtn.click(function() {
        $selectLevel.show();
        $mask.show();
    });

    $selectLevel.on('click', '.level', function () {
        level = $(this).data('level');
        $('.level').removeClass('selected');
        $(this).addClass('selected');
        $selectLevel.hide();
        $mask.hide();
        $musicName.removeClass().addClass(musicNameObj[level]);
    });

    $startBtn.click(function() {
        window.Game.init(level, 'exec');
    });

});
