/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $selectArea = $('#selectArea'); // 选择训练模式
    var $playArea = $('#playArea'); // 游戏区域
    var $waitingArea = $('#waitingArea'); // 等待区域
    var $edition_t = $('.edition-t'); // 模式显示
    var MODE = ['exec', 'brk', 'create'];

    var Reaygo = new Audio('../../public/audio/ready_go.mp3');
    var Tabour = new Audio('../../public/audio/Tabour.wav');
    var Bigbong = new Audio('../../public/audio/bigbong.wav');
    var Maluo = new Audio('../../public/audio/maluo.wav');
    var Dabo = new Audio('../../public/audio/dabo.wav');
    var Tanggu = new Audio('../../public/audio/tanggu.wav');

    $selectArea.on('click', '.edition', function() {
        var mode = $(this).data('mode');
        $edition_t.removeClass().addClass('edition-t ' + mode);
        $selectArea.hide();
        $playArea.show();
    });

    $('.btn-start').on('click', function() {
        game.init();
    });

    $('.handler-area').on('click', '.operat-button', function() {
        var $this = $(this);
        var id = $this.attr('id');
        switch(id) {
            case 'tabour':
                Tabour.play(); break;
            case 'bigbong':
                Bigbong.play(); break;
            case 'maluo':
                Maluo.play(); break;
            case 'dabo':
                Dabo.play(); break;
            case 'tanggu':
                Tanggu.play(); break;
            default:
        }
    });

    var game = {
        init: function() {
            this.$el = $('.jiezou-con');
            this.comp = {
                $countdown: $('.countdown'),
                $readyText: $('.ready-text')
            }
            this.showCountDown();
        },
        showCountDown: function() {
            var self = this;
            self.comp.$countdown.show();
            setTimeout(function() {
                $('.ready-text').show();
                Reaygo.play();
                setTimeout(function() {
                    self.comp.$countdown.hide();
                    self.comp.$readyText.hide();
                    self.start();
                }, 1200);
            }, 3000);
        },
        start: function() {
            var self = this;
            var w = this.$el.width();
            $('.btn-start').hide();
            this.$el.css('right', -w);
            this.$el.show().animate(
                {right: w},
                w * 10,
                'linear',
                function() {
                    self.end();
                });
        },
        end: function() {
            console.log('end');
            $('.btn-start').show();
        },
        fixScore: function() {

        }
    }
});