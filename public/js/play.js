/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $playArea = $('#playArea'); // 游戏区域
    var $edition_t = $('.edition-t'); // 模式显示
    var $buttons = $('.buttons');

    var Reaygo = new Audio('../../public/audio/ready_go.mp3');
    var Tabour = new Audio('../../public/audio/Tabour.wav');
    var Bigbong = new Audio('../../public/audio/bigbong.wav');
    var Maluo = new Audio('../../public/audio/maluo.wav');
    var Dabo = new Audio('../../public/audio/dabo.wav');
    var Tanggu = new Audio('../../public/audio/tanggu.wav');

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
            this.$el = $('.game-scene');
            this.comp = {
                $readyText: $('.ready-text'),
                $ktvStart: $('.ktv-start')
            };
            this.showCountDown();
        },
        showCountDown: function() {
            var self = this;
            var $ktvStart = self.comp.$ktvStart;
            var $k1 = $ktvStart.find('.k1');
            var $k2 = $ktvStart.find('.k2');
            var $k3 = $ktvStart.find('.k3');

            $buttons.hide();
            $ktvStart.show();

            $k1.addClass('show');
            setTimeout(function() {
                $k2.addClass('show');
                setTimeout(function() {
                    $k3.addClass('show');
                    Reaygo.play();
                    setTimeout(function() {
                        $ktvStart.hide();
                        $ktvStart.find('span').removeClass('show');
                        self.start();
                    }, 1200);
                }, 1000);
            }, 1000);
        },
        start: function() {
            var self = this;
            var $content = this.$el.find('.rhythm-container');
            var wrapWidth = this.$el.width();
            var contentWidth = $content.width();
            $content.css('right', -contentWidth);
            $content.show().animate(
                {right: contentWidth + wrapWidth},
                wrapWidth * 10,
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
    };
    window.Game = game;
});