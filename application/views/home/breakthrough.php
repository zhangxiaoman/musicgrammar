<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>闯关</title>
    <meta name="viewport" content="maximum-scale=1.0,user-scalable=0" />
    <link rel="stylesheet" href="../../public/css/normalize.css">
    <link rel="stylesheet" href="../../public/css/play.css">
</head>
<body>
<div class="wrap bg-create">
    <div class="title">
        <div class="group-icon <?php echo $group_alias; ?>"></div>
        <div class="user-name"><?php echo $user_name; ?></div>
    </div>
    <a href="/home/select"><div class="edition-t brk"></div></a>
    <div id="main">
        <div class="left-area">
            <div class="game-info">
                <div class="game-name brk1"></div>
                <div class="music-name"></div>
            </div>
            <div class="buttons">
                <div class="btn-select-level"></div>
                <div class="btn-start-cg"></div>
            </div>
            <div class="ktv-start">
                <span class="k1"></span>
                <span class="k2"></span>
                <span class="k3"></span>
            </div>
        </div>
        <div class="game-scene">
            <div class="play-line">
                <div class="line"></div>
            </div>
            <div class="rhythm-wrap">
                <div class="rhythm-container">
                    <div class="mg-row tupan-row"> </div>
                    <div class="mg-row mule-row"> </div>
                    <div class="mg-row tam-row"> </div>
                    <div class="mg-row cymbal-row"> </div>
                    <div class="mg-row sidedrum-row"> </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hit-area">
        <div class="grammar g-cymbal">大钵</div>
        <div class="grammar g-tam">大锣</div>
        <div class="grammar g-sidedrum">小鼓</div>
        <div class="grammar g-tupan">堂鼓</div>
        <div class="grammar g-mule">马锣</div>
    </div>
</div>
<div class="result success">
    <div class="result-text"></div>
    <div class="btn-reload"></div>
    <div class="btn-next"></div>
</div>
<div id="waitingArea" class="waiting-wrap">
    <h2>等待其他小伙伴</h2>
    <div class="player-list">
        <!--            <div class="player">-->
        <!--                <div class="player-avatar wait"></div>-->
        <!--                <div class="player-name">小苹果大眼睛</div>-->
        <!--            </div>-->
        <!--            <div class="player">-->
        <!--                <div class="player-avatar avatar_2"></div>-->
        <!--                <div class="player-name">小苹果大眼睛</div>-->
        <!--            </div>-->
        <!--            <div class="player">-->
        <!--                <div class="player-avatar avatar_3"></div>-->
        <!--                <div class="player-name">小苹果大眼睛</div>-->
        <!--            </div>-->
        <!--            <div class="player">-->
        <!--                <div class="player-avatar avatar_4"></div>-->
        <!--                <div class="player-name">小苹果大眼睛</div>-->
        <!--            </div>-->
        <!--            <div class="player">-->
        <!--                <div class="player-avatar avatar_5"></div>-->
        <!--                <div class="player-name">小苹果大眼睛</div>-->
        <!--            </div>-->
    </div>
</div>
<div class="select-level">
    <div class="level one selected" data-level="1">
        <span class="level-text"></span>
    </div>
    <div class="level two" data-level="2"><span class="level-text"></span></div>
    <div class="level three" data-level="3"><span class="level-text"></span></div>
    <div class="level four" data-level="4"><span class="level-text"></span></div>
</div>
<div class="mask"></div>
<script src="../../public/js/jquery-1.11.1.min.js"></script>
<script src="../../public/js/play.js"></script>
<script src="../../public/js/brk.js"></script>
<script src="../../public/js/json2.js"></script>
<script>
</script>
</body>
</html>
