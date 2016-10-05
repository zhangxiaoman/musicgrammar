/**
 * Created by chaofan on 2016/10/5.
 */
$(function() {
    var $buttons = $('.buttons');
    var $selectBtn = $('.btn-select-level');
    var $startBtn = $('.btn-start-cg');
    var $selectLevel = $('.select-level');
    var $mask = $('.mask');
    var $waitArea = $('#waitingArea');
    var $musicName = $('.music-name');
    var $result = $('.result');
    var beginCheckUserCount = false;
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
        $.ajax({
            url: '/home/begin_exercise',
            type: 'post',
            dataType: 'json',
            success: function(re) {
                if (re.code == 0) {
                    location.href= "/home/select";
                }

                if (re.code == 1) {
                    renderWaitUser(re.data.users);
                    $waitArea.show();
                    $mask.show();
                }
            }
        });
    });

    function renderWaitUser ($data) {

        $(".player-list").empty();
        var temp = $("<div class='player'>" +
            "<div class='player-avatar wait'></div>" +
            "<div class='player-name'>&nbsp;</div> " +
            "</div>");


        for (var i = 0;  i < $data.length; i++) {
            var $item = $data[i];
            var clone = temp.clone();
            clone.find(".player-avatar").removeClass("wait").addClass($item.avatar);
            clone.find(".player-name").html($item.name);
            $(".player-list").append(clone);
        }

        $waitCount = 5 - $data.length;
        console.log($waitCount);

        for (var j = 0;  j < $waitCount; j++) {
            console.log(j);
            var cloneTemp = temp.clone();
            $(".player-list").append(cloneTemp);
        }

        if (!beginCheckUserCount) {
            setInterval(checkGroupUserCount, 1000);
            beginCheckUserCount = true;
        }

    }

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

    function checkGroupUserCount()
    {
        $.ajax({
            url: '/group/view',
            type: 'post',
            dataType: 'json',
            success: function(re) {
                if (re.code == 0) {
                    var users = re.data.users;
                    if (users.length < 5) {
                        renderWaitUser(users);
                    }
                }
            }
        });
    }
});