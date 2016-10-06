/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $buttons = $('.buttons');
    var FOUTHBARRIER = new Audio('../../public/audio/fourthbarrier.mp3');
    var FIFTHBARRIER = new Audio('../../public/audio/fifthbarrier.mp3');
    var SUCCESSSOUND = new Audio('../../public/audio/success.mp3');
    var FAILSOUND = new Audio('../../public/audio/fail.mp3');
    var $result = $('.result');

    window.grammarIndex = 0;
    var Grammar = window.grammar = {
        sidedrum: [
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav'),
            new Audio('../../public/audio/Tabour.wav')
        ],
        tam: [
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav'),
            new Audio('../../public/audio/bigbong.wav')
        ],
        mule: [
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav'),
            new Audio('../../public/audio/maluo.wav')
        ],
        cymbal: [
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav'),
            new Audio('../../public/audio/dabo.wav')
        ],
        tupan: [
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav'),
            new Audio('../../public/audio/tanggu.wav')
        ]
    };
    var CountMusic = new Audio('../../public/audio/daojishi.wav');
    CountMusic.load();

    var Readygo = new Audio('../../public/audio/ready_go.mp3');

    var mock = {
        "code": 0,
        "data": {
            "id": "1",
            "content": [
                [
                    {
                        "name": "tupan",
                        "begin": 0,
                        "begin_time": 0
                    }
                ],
                [
                    {
                        "name": "tupan",
                        "begin": 0,
                        "begin_time": 3440
                    },
                    {
                        "name": "mule",
                        "begin": 5,
                        "begin_time": 5160
                    }
                ],
                [
                    {
                        "name": "tupan",
                        "begin": 0,
                        "begin_time": 6880
                    },
                    {
                        "name": "tam",
                        "begin": 0,
                        "begin_time": 6880
                    },
                    {
                        "name": "cymbal",
                        "begin": 0,
                        "begin_time": 6880
                    },
                    {
                        "name": "sidedrum",
                        "begin": 0,
                        "begin_time": 6880
                    }
                ]
            ],
            "length": "10320",
            "temps": 3,
            "temps_time": "3440"
        }
    };

    var game = {
        init: function(level, type) {
            this.$el = $('.game-scene');
            this.comp = {
                $readyText: $('.ready-text'),
                $ktvStart: $('.ktv-start'),
                $container: $('.rhythm-container')
            };
            this.level = level || 1;
            this.type = type || 'exec';
            this.startTime = 0;
            this.data = this._getLevelData(level);
            this.result = [];
            this._createScene();
            this.showCountDown();
        },
        _getLevelData: function(level) {
            var _data;
            $.ajax({
                url: '/home/get_musical',
                type: 'post',
                async: false,
                data: {
                    id: level
                },
                dataType: 'json',
                success: function(re) {
                    _data = re.data;
                }
            });

            return _data;
        },
        _bindEvent: function() {
            var self = this;
            $('.hit-area').on('touchstart', '.grammar', function() {
                var $this = $(this);
                var g = $this.attr('class').split(' ')[1].replace(/g-/, '');
                if (self.startTime > 0) {
                    var n = (Date.now() - self.startTime) / (~~self.data.length / (~~self.data.temps + 1));
                    n = Math.floor(n);
                    var selector = '.' + n + '-' + g;
                    if ($(selector).length > 0) { // 计算分数
                        $(selector).addClass('animated shake');
                    }
                    self.result[n] ? self.result[n].push(g) : (self.result[n] = [g]);
                }
                if (Grammar[g].currentTime > 0) {
                    Grammar[g].currentTime = 0;
                } else {
                    Grammar[g].play();
                }
            });
        },
        _unbindEvent: function() {
            if (this.type != 'exec') {
                $('.hit-area').unbind('click');
            }
        },
        _createScene: function() {
            console.log(this.data);
            var content = this.data.content;
            var tempTime = ~~this.data.temps_time;
            var $container = this.comp.$container;
            var i, j, len;
            $container.width(134 * this.data.temps);
            $container.css('left', '134px');
            for(i = 0, len = content.length; i < len; i++) {
                var t = content[i];
                $container.append('<div class="division-line" style="left:'+ 134 * i +'px;">');
                for (j = 0; j < t.length; j++) {
                    var span = $('<span />');
                    span.addClass(i + '-' + t[j].name).css('left', t[j].begin_time / tempTime * 134);
                    $('.' + t[j].name + '-row').append(span);
                }
            }
            $container.append('<div class="division-line" style="left:'+ 134 * i +'px;">');
        },
        showCountDown: function() {
            var self = this;
            var time = ~~this.data.temps_time;
            var $ktvStart = self.comp.$ktvStart;
            var $k1 = $ktvStart.find('.k1');
            var $k2 = $ktvStart.find('.k2');
            var $k3 = $ktvStart.find('.k3');

            $buttons.hide();
            $ktvStart.show();

            $k1.addClass('show');
            CountMusic.play();
            setTimeout(function() {
                $k2.addClass('show');
                CountMusic.play();
                setTimeout(function() {
                    $k3.addClass('show');
                    CountMusic.play();
                    self.start();
                    setTimeout(function() {
                        $ktvStart.hide();
                        $ktvStart.find('span').removeClass('show');
                    }, 200);
                }, time);
            }, time);
        },
        start: function() {
            var self = this;
            var $content = this.$el.find('.rhythm-container');
            this._bindEvent();
            this.startTime = Date.now();
            if (this.level == 4) {
                FOUTHBARRIER.play();
            }
            if (this.level == 5) {
                FIFTHBARRIER.play();
            }
            $content.show().animate(
                { left: -134 * self.data.temps },
                ~~self.data.length,
                'linear',
                function() {
                    self.end();
                });
        },
        end: function() {
            $buttons.show();
            this.startTime = 0;
            this._unbindEvent();
            if (this.type === 'brk') {
                var _result = this.result;
                var self = this;

                $.ajax({
                    url: '/user/end',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        result:JSON.stringify(_result)
                    },
                    success: function (re) {
                        self.getScore();
                    }

                });
            }
        },

        getScore :function (){

            setInterval(
                $.ajax({
                url: '/user/cal_score',
                type: 'post',
                dataType: 'json',
                success: function(re) {
                    if (re.code == 0) {

                        if (re.data.is_success == 1) {
                            $result.removeClass('fail').addClass("success").show();
                            $('.mask').show();
                            SUCCESSSOUND.play();
                        } else {
                            $result.removeClass('success').addClass("fail").show();
                            $('.mask').show();
                            FAILSOUND.play();
                        }
                    }
                }
            }), 2000);
        },
        showResult: function() {
            console.log(this.result);
            $.ajax({});
            $('.mask').show();
            if (this.result > 20) {
                $('.result').removeClass('fail').addClass('success').show();
                SUCCESSSOUND.play();
            } else {
                $('.result').removeClass('success').addClass('fail').show();
                FAILSOUND.play();
            }

        }
    };
    window.Game = game;
});
