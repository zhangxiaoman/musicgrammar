<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>创作版</title>
    <meta name="viewport" content="maximum-scale=1.0,user-scalable=0" />
    <link rel="stylesheet" href="../../public/css/normalize.css">
    <link rel="stylesheet" href="../../public/css/play.css">
    <link rel="stylesheet" href="../../public/css/create.css">
</head>
<body>
<div class="wrap">
    <div class="title">
        <div class="user-name"><?php echo $user_name; ?></div>
    </div>
    <a href="/home/select"><div class="edition-t create"></div></a>
    <div id="main">
        <div class="student-play-area group-a">
            <div class="group-title"></div>
            <div class="grammar-lt">
                <span class="cymbal"></span>
                <span class="tam"></span>
                <span class="sidedrum"></span>
                <span class="tupan"></span>
                <span class="mule"></span>
            </div>
        </div>
        <div class="student-play-area group-b">
            <div class="group-title"></div>
            <div class="grammar-lt">
                <span class="cymbal"></span>
                <span class="tam"></span>
                <span class="sidedrum"></span>
                <span class="tupan"></span>
                <span class="mule"></span>
            </div>
        </div>
        <div class="student-play-area group-c">
            <div class="group-title"></div>
            <div class="grammar-lt">
                <span class="cymbal"></span>
                <span class="tam"></span>
                <span class="sidedrum"></span>
                <span class="tupan"></span>
                <span class="mule"></span>
            </div>
        </div>
        <div class="btn-teacher-hit"></div>
    </div>
    <div class="hit-area">
        <div class="grammar g-cymbal">大钵</div>
        <div class="grammar g-tam">大锣</div>
        <div class="grammar g-sidedrum">小鼓</div>
        <div class="grammar g-tupan">堂鼓</div>
        <div class="grammar g-mule">马锣</div>
    </div>
</div>
<div id="waitingArea" class="waiting-wrap">
    <h2>等待其他小伙伴</h2>
    <div class="player-list">
        <div class="player">
            <div class="player-avatar avatar_1"></div>
            <div class="player-name">小苹果大眼睛</div>
        </div>
        <div class="player">
            <div class="player-avatar wait"></div>
            <div class="player-name">等待中</div>
        </div>
        <div class="player">
            <div class="player-avatar wait"></div>
            <div class="player-name">等待中</div>
        </div>
        <div class="player">
            <div class="player-avatar wait"></div>
            <div class="player-name">等待中</div>
        </div>
        <div class="player">
            <div class="player-avatar wait"></div>
            <div class="player-name">等待中</div>
        </div>
    </div>
</div>
<div class="mask"></div>
<script src="../../public/js/jquery-1.11.1.min.js"></script>
<script src="../../public/js/play.js"></script>
<script src="../../public/js/create.js"></script>
</body>
</html>
