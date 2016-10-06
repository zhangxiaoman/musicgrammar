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

    var Grammar = window.grammar = {
        sidedrum: new Audio('../../public/audio/Tabour.wav'),
        tam: new Audio('../../public/audio/bigbong.wav'),
        mule: new Audio('../../public/audio/maluo.wav'),
        cymbal: new Audio('../../public/audio/dabo.wav'),
        tupan: new Audio('../../public/audio/tanggu.wav')
    };

    for (var k in window.grammar) {
        window.grammar[k].load();
    }

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
            return mock.data;
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
                        $(selector).addClass('animated pulse');
                    }
                    self.result[n] ? self.result[n].push(g) : (self.result[n] = [g]);
                }
                Grammar[g].load()
                Grammar[g].play();
            });
        },
        _unbindEvent: function() {
            $('.hit-area').unbind('click');
        },
        _createScene: function() {
            console.log(this.data);
            var content = this.data.content;
            var tempTime = ~~this.data.temps_time;
            var i, j, len;
            this.comp.$container.width(134 * this.data.temps);
            this.comp.$container.css('left', '134px');
            for(i = 0, len = content.length; i < len; i++) {
                var t = content[i];
                for (j = 0; j < t.length; j++) {
                    var span = $('<span />');
                    span.addClass(i + '-' + t[j].name).css('left', t[j].begin_time / tempTime * 134);
                    $('.' + t[j].name + '-row').append(span);
                }
            }
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