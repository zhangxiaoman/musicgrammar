/**
 * Created by chaofan on 2016/10/5.
 */
$(function() {
    var $buttons = $('.buttons');
    var $selectBtn = $('.btn-select-level');
    var $startBtn = $('.btn-start-cg');
    var $selectLevel = $('.select-level');
    var $mask = $('.mask');
    var $musicName = $('.music-name');
    var $result = $('.result');

    var level = '1';
    var musicNameObj = {
        '1': 'music-name',
        '2': 'music-name second',
        '3': 'music-name third',
        '4': 'music-name fourth'
    };

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

    $startBtn.click(function () {
        window.Game.init(level, 'brk');
    });

    $mask.click(function() {
        $(this).hide();
        $result.hide();
    });

    $('.btn-reload').click(function() {
        window.Game.init(level, 'brk');
        $mask.hide();
        $result.hide();
    });

    $('.btn-next').click(function() {
        if (level < 5) {
            level = ~~level + 1;
        } else {
            alert('已经最后一关了');
        }
        window.Game.init(level, 'brk');
        $mask.hide();
        $result.hide();
    })
});