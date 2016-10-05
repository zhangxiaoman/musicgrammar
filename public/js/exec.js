/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $freedomBtn = $('.btn-freedom-exec');
    var $startBtn = $('.btn-start-exec');
    var $mask = $('.mask');
    var $selectBtn = $('.btn-select-level');
    var $selectLevel = $('.select-level');
    var $musicName = $('.music-name');


    var Grammar = {
        sidedrum: new Audio('../../public/audio/Tabour.wav'),
        tam: new Audio('../../public/audio/bigbong.wav'),
        mule: new Audio('../../public/audio/maluo.wav'),
        cymbal: new Audio('../../public/audio/dabo.wav'),
        tupan: new Audio('../../public/audio/tanggu.wav')
    };

    // 关卡
    var level = 1;
    var musicNameObj = {
        '1': 'music-name',
        '2': 'music-name second',
        '3': 'music-name third',
        '4': 'music-name fourth'
    };

    // 自由练习
    $freedomBtn.click(function() {
        $('.freedom-exec-mask').show();
        $('.hit-area').on('click', '.grammar', function() {
            var $this = $(this);
            var g = $this.attr('class').split(' ')[1].replace(/g-/, '');
            Grammar[g].play();
        });
    });

    // 关闭自由练习
    $('.freedom-exec-mask').click(function() {
        $(this).hide();
        $('.hit-area').unbind('click');
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