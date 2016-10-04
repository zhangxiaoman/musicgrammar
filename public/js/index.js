/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $username = $('#username');
    var group = 'a';

    $('.btn-start').on('click', function() {
        $.ajax({
            url: '',
            type: 'post',
            data: {
                username: $username.val(),
                group: group
            },
            dataType: 'json',
            success: function(re) {

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