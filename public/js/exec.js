/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $freedomBtn = $('.btn-freedom-exec');
    var $startBtn = $('.btn-start-exec');
    var $waitArea = $('#waitingArea');
    var $mask = $('.mask');

    // 自由练习
    $freedomBtn.click(function() {
        window.Game.init();
    });

    $startBtn.click(function() {
        $waitArea.show();
        $mask.show();
    });
});