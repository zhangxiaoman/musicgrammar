/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $username = $('#username');
    var group = '1';

    $('.btn-start').on('click', function() {

        if (!$username.val()) {
            alert("请输入姓名");
            return false;
        }
        $.ajax({
            url: '/user/create',
            type: 'post',
            data: {
                username: $username.val(),
                group_id: group
            },
            dataType: 'json',
            success: function(re) {
                if (re.code == 0) {
                    location.href= "/home/select";
                } else {
                    alert(re.message);
                }
            }
        })
    });

    $('.group').on('click', '.group-item', function() {
        if ($(this).hasClass('selected')) {
            return;
        }
        group = $(this).data('group');
        $('.group-item').removeClass('selected');
        $(this).addClass('selected');
    });
});