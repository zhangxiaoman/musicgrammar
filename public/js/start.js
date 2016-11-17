/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $school_name = $('#school_name');
    var group = '1';

    $('.btn-start').on('click', function() {

        if (!$school_name.val()) {
            alert("请输入姓名");
            return false;
        }
        $.ajax({
            url: '/home/check',
            type: 'post',
            data: {
                school_name: $school_name.val(),
            },
            dataType: 'json',
            success: function(re) {
                if (re.code == 0) {
                    location.href= "/home/start";
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