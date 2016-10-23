/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $buttons = $('.buttons');
    var FOUTHBARRIER = window.FOUTHBARRIER = new Audio('../../public/audio/4.mp3');
    var FIFTHBARRIER = new Audio('../../public/audio/5.mp3');

    var FAILSOUND = new Audio('../../public/audio/fail.mp3');
    var $result = $('.result');
    window.grammarIndex = {
        sidedrum : 0,
        tam : 0,
        mule : 0,
        cymbal : 0,
        tupan : 0,
    };
    var audio = window.audio = {
        analyser: {},
        buffer: {},
        buffer_effects: {},
        compatibility: {},
        convolver: {},
        grammer_files : [
            "../../public/audio/dabo.mp3",
            "../../public/audio/daluo.mp3",
            "../../public/audio/maluo.mp3",
            "../../public/audio/xiaogu.mp3",
            "../../public/audio/tanggu.mp3",
        ],

        success_files : [
            '../../public/audio/come_on.mp3',
            '../../public/audio/perfect.mp3',
            '../../public/audio/potential.mp3',
            '../../public/audio/wonderful.mp3'
        ],
        success_buffer : {},
        success_loop: {},
        daojishi_file: '../../public/audio/daojishi.wav',
        daojishi_buffer:{},
        daojishi_loop:{},
        ready_go_file : '../../public/audio/ready_go.mp3',
        ready_go_buffer : {},
        ready_go_loop : {},
        fail_file : '../../public/audio/fail.mp3',
        fail_buffer:{},
        fail_loop:{},
        pause_vis: true,
        playing: 0,
        proceed: true,
        source_loop: {},
        source_once: {},
        volume_fade_time: .7
    };

    audio.loadSingle = function (type) {

        var loop = {};var buffers = {};
        var file = '';
        if (type == 'daojishi') {
            file = audio.daojishi_file;
        } else if (type == 'ready_go') {
            file = audio.ready_go_file;
        } else {
            file = audio.fail_file;
        }
        var req = new XMLHttpRequest;
        req.open("GET", file, true);
        req.responseType = "arraybuffer";
        req.onload = function () {
            audio.context.decodeAudioData(req.response, function (buffer) {
                if (type == 'daojishi') {
                    audio.daojishi_buffer = buffer;
                    audio.daojishi_loop = loop;
                } else if (type == 'ready_go') {
                    audio.ready_go_buffer = buffer;
                    audio.ready_go_loop = loop;
                } else {
                    audio.fail_buffer = buffer;
                    audio.fail_loop = loop;
                }
            }, function () {
                alert("error");
                console.log('Error decoding audio "' + file + '".')
            })
        };
        req.send();
    };
    audio.load = function(type) {
        var list = audio.grammer_files;
        if (type == 'success') {
            list = audio.success_files;
        }

        for (var a in list) {
            (function () {
                var i = parseInt(a-1)+1;
                var req = new XMLHttpRequest;
                console.log(list[i]);
                req.open("GET", list[i], true);
                req.responseType = "arraybuffer";
                req.onload = function () {
                    audio.context.decodeAudioData(req.response, function (buffer) {
                        if (type == 'success') {
                            audio.success_buffer[i] = buffer;
                            audio.success_loop[i] = {};
                        } else {
                            audio.buffer[i] = buffer;
                            audio.source_loop[i] = {};
                        }
                    }, function () {
                        alert("error");
                        console.log('Error decoding audio "' + list[i] + '".')
                    })
                };
                req.send()
            })();
        };

    };
    audio._enableiOSAudio = function() {
        var self = this;
        // 已解除限制或非 iOS 设备不执行此函数
        ctx = audio.context;
        if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
            return;
        }

        self._iOSEnabled = false;

        // touchstart 事件函数
        // 创建并播放一个缓冲区, 然后通过检测音频是否播放来判断 iOS 的音频限制是否解除
        var unlock = function() {
            // iOS 支持 Web Audio API, 创建一个空的缓冲区 (单声道, 1帧, 22050赫兹)
            var buffer = ctx.createBuffer(1, 1, 22050);
            var source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);

            // 播放空缓冲区
            if (typeof source.start === 'undefined') {
                source.noteOn(0);
            } else {
                source.start(0);
            }

            // 在下一个事件循环检测 iOS 限制是否解除
            setTimeout(function() {
                if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
                    // 限制解除, 更新标志位并且防止 unlock 事件函数再次执行
                    self._iOSEnabled = true;
                    self.iOSAutoEnable = false;

                    // 移除 touchstart 事件函数
                    window.removeEventListener('touchstart', unlock, false);
                }
            }, 0);
        };

        // 绑定 touchstart 事件以解除限制
        window.addEventListener('touchstart', unlock, false);

        return self;
    };

    audio.play = function (n) {
        audio.source_loop[n] = audio.context.createBufferSource();
        audio.source_loop[n].buffer = audio.buffer[n];
        audio.source_loop[n].connect(audio.context.destination);
        audio.source_loop[n].loop = false;
        audio.source_loop[n].start();
    };

    audio.daojishi = function() {
        audio.daojishi_loop = audio.context.createBufferSource();
        audio.daojishi_loop.buffer = audio.daojishi_buffer;
        audio.daojishi_loop.connect(audio.context.destination);
        audio.daojishi_loop.loop = false;
        audio.daojishi_loop.start();
    };

    audio.ready_go = function() {
        audio.ready_go_loop = audio.context.createBufferSource();
        audio.ready_go_loop.buffer = audio.ready_go_buffer;
        audio.ready_go_loop.connect(audio.context.destination);
        audio.ready_go_loop.loop = false;
        audio.ready_go_loop.start();
    };
    audio.fail = function() {
        audio.fail_loop = audio.context.createBufferSource();
        audio.fail_loop.buffer = audio.fail_buffer;
        audio.fail_loop.connect(audio.context.destination);
        audio.fail_loop.loop = false;
        audio.fail_loop.start();
    };

    audio.success = function() {
        var n = parseInt(Math.random()*10)%4;
        audio.success_loop[n] = audio.context.createBufferSource();
        audio.success_loop[n].buffer = audio.success_buffer[n];
        audio.success_loop[n].connect(audio.context.destination);
        audio.success_loop[n].loop = false;
        audio.success_loop[n].start();
    };

    audio.init = function() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audio.context = new window.AudioContext
        } catch (e) {
            audio.proceed = false;
            alert("Web Audio API not supported in this browser.")
        }

        audio.load('grammar');
        audio.load('success');
        audio.loadSingle('daojishi');
        audio.loadSingle('ready_go');
        audio.loadSingle('fail');
        //var req = new XMLHttpRequest;
        //console.log(audio.daojishi_file);
        //req.open("GET", audio.daojishi_file, true);
        //req.responseType = "arraybuffer";
        //req.onload = function () {
        //    audio.context.decodeAudioData(req.response, function (buffer) {
        //        audio.daojishi_buffer = buffer;
        //        audio.daojishi_loop = {};
        //    }, function () {
        //        alert("error");
        //        console.log('Error decoding audio "' + audio.daojishi_file + '".')
        //    })
        //};
        //req.send();
        //
        //var req2 = new XMLHttpRequest;
        //console.log(audio.ready_go_file);
        //req2.open("GET", audio.ready_go_file, true);
        //req2.responseType = "arraybuffer";
        //req2.onload = function () {
        //        audio.context.decodeAudioData(req2.response, function (buffer) {
        //        audio.ready_go_buffer = buffer;
        //        audio.ready_go_loop = {};
        //    }, function () {
        //        alert("error");
        //        console.log('Error decoding audio "' + audio.ready_go_file + '".')
        //    })
        //};
        //req2.send();

    };
    audio.init();
    audio._enableiOSAudio();

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
            $('.hit-area').off('click').on('click', '.grammar', function() {
                var $this = $(this);
                $this.addClass('hover');
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

                var _value = $this.data('value');
                window.audio.play(_value);
                setTimeout(function(){
                    $this.removeClass("hover");
                    }, 200
                )
            })
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
            if (this.level == 4 && this.type == 'exec') {
                FOUTHBARRIER.load();
            }

            if (this.level == 5 && this.type == 'exec') {
                FIFTHBARRIER.load();
            }
            var time = ~~this.data.temps_time;
            var $ktvStart = self.comp.$ktvStart;
            var $k1 = $ktvStart.find('.k1');
            var $k2 = $ktvStart.find('.k2');
            var $k3 = $ktvStart.find('.k3');

            $buttons.hide();
            $ktvStart.show();

            $k1.addClass('show');
            audio.ready_go();
            audio.daojishi();
            setTimeout(function() {
                $k2.addClass('show');
                audio.daojishi();
                setTimeout(function() {
                    $k3.addClass('show');
                    audio.daojishi();
                    setTimeout(function() {
                        self.start();
                        setTimeout(function () {
                            $ktvStart.hide();
                            $ktvStart.find('span').removeClass('show');
                        }, 200);
                    },time);
                }, time);
            }, time);
        },
        start: function() {
            var self = this;
            var $content = this.$el.find('.rhythm-container');
            this._bindEvent();
            this.startTime = Date.now();
            if (this.level == 4) {
                FOUTHBARRIER.currentTime = 0.02;
                FOUTHBARRIER.play();
            }
            if (this.level == 5) {
                FIFTHBARRIER.play();
            }
            $content.show().animate(
                {
                    left: -134 * (self.data.temps - 1),
                    speed:~~this.data.temps_time
                },
                {
                    duration: ~~self.data.length,
                    easing: "linear",
                    speed:~~this.data.temps_time,
                    complete: function(){
                        self.end();
                    },
                    step: function(now, fx ) {
                    }
                });
        },
        end: function() {
            this.comp.$container.find("div span").remove();
            this.comp.$container.find("div.division-line").remove();
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
                        setTimeout(self.getScore, 2000);
                    }

                });
            }
        },

        getScore :function (){
            $.ajax({
                url: '/user/cal_score',
                type: 'post',
                dataType: 'json',
                success: function (re) {
                    if (re.code == 0) {

                        if (re.data.is_success == 1) {
                            $result.removeClass('fail').addClass("success").show();
                            $('.mask').show();
                            audio.success();
                        } else {
                            $result.removeClass('success').addClass("fail").show();
                            $('.mask').show();
                            audio.fail();
                        }
                    }
                }
            });
        },
    };
    window.Game = game;
});
