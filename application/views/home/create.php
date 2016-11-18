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
<div class="wrap create-bg">
    <div class="title">
        <div class="user-name"><?php echo $user_name; ?></div>
    </div>
    <a href="/home/select"><div class="edition-t create"></div></a>
    <div id="main">
        <div class="left-area">
            <div class="buttons">
                <!--<div class="btn-freedom-exec"></div>-->
                <div class="btn-ready"></div>
            </div>
        </div>
        <div class="student-play-area group-a">
            <div class="group-title"></div>
            <div class="grammar-lt">
                <span class="cymbal" data-name="cymbal"></span>
                <span class="tam" data-name="tam"></span>
                <span class="tupan" data-name="tupan"></span>
                <span class="sidedrum"  data-name="sidedrum"></span>
                <span class="mule"  data-name="mule"></span>
            </div>
        </div>
        <div class="student-play-area group-b">
            <div class="group-title"></div>
            <div class="grammar-lt">
                <span class="cymbal" data-name="cymbal"></span>
                <span class="tam" data-name="tam"></span>
                <span class="tupan" data-name="tupan"></span>
                <span class="sidedrum"  data-name="sidedrum"></span>
                <span class="mule"  data-name="mule"></span>
            </div>
        </div>
        <div class="student-play-area group-c">
            <div class="group-title"></div>
            <div class="grammar-lt">
                <span class="cymbal" data-name="cymbal"></span>
                <span class="tam" data-name="tam"></span>
                <span class="tupan" data-name="tupan"></span>
                <span class="sidedrum"  data-name="sidedrum"></span>
                <span class="mule"  data-name="mule"></span>
            </div>
        </div>
        <div class="btn-teacher-hit btn-teacher-hit-show"></div>
    </div>
    <div class="hit-area">
        <div class="grammar g-cymbal" data-value = 0>
            <div class="grammar-image"></div>
            <p>大钵</p>
        </div>
        <div class="grammar g-tam"  data-value = 1>
            <div class="grammar-image"></div>
            <p>大锣</p>
        </div>
        <div class="grammar g-mule"  data-value = 2>
            <div class="grammar-image"></div>
            <p>小锣</p>
        </div>
        <div class="grammar g-tupan"  data-value = 3>
            <div class="grammar-image"></div>
            <p>堂鼓</p>
        </div>
        <div class="grammar g-sidedrum"  data-value = 4>
            <div class="grammar-image"></div>
            <p>小鼓</p>
        </div>
    </div>
</div>
<div id="waitingArea" class="waiting-wrap">
    <h2>等待开始</h2>
    <div class="player-list">
    </div>
</div>
<div class="result success">
    <div class="result-text"></div>
    <div class="btn-reload" style="left:110px;"></div>
</div>
<div class="mask"></div>
<script src="../../public/js/jquery-1.11.1.min.js"></script>
<script src="../../public/js/play.js"></script>
<script src="../../public/js/create.js"></script>
</body>
</html>
