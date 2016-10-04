/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $freedomBtn = $('.btn-freedom-exec');
    var $startBtn = $('.btn-start-exec');
    var $waitArea = $('#waitingArea');
    var $mask = $('.mask');

    var beginCheckUserCount = false;

    // 自由练习
    $freedomBtn.click(function() {
        window.Game.init();
    });

    $startBtn.click(function() {

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