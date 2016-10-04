/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $playArea = $('#playArea'); // 游戏区域
    var $edition_t = $('.edition-t'); // 模式显示
    var $buttons = $('.buttons');

    var Grammar = {
        xiaogu: new Audio('../../public/audio/Tabour.wav'),
        daluo: new Audio('../../public/audio/bigbong.wav'),
        xiaoluo: new Audio('../../public/audio/maluo.wav'),
        dabo: new Audio('../../public/audio/dabo.wav'),
        tanggu: new Audio('../../public/audio/tanggu.wav')

    };

    var Readygo = new Audio('../../public/audio/ready_go.mp3');

    var game = {
        init: function() {
            this.$el = $('.game-scene');
            this.comp = {
                $readyText: $('.ready-text'),
                $ktvStart: $('.ktv-start')
            };
            this._bindEvent();
            this.showCountDown();
        },
        _bindEvent: function() {
            $('.hit-area').on('click', '.grammar', function() {
                var $this = $(this);
                var g = $this.attr('class').split(' ')[1].replace(/g-/, '');
                Grammar[g].play();
            });
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
                    Readygo.play();
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