<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../../public/css/normalize.css">
    <link rel="stylesheet" href="../../public/css/selectMode.css">
</head>
<body>
    <div class="wrap">
        <div class="title">
            <div class="group-icon <?php echo $group_alias ?> "></div>
            <div class="user-name"><?php echo $user_name;?></div>
        </div>
        <div class="container">
            <div class="h3">请选择训练模式</div>
            <a href="/home/exercise"><div class="edition btn-exercise"></div></a>
            <a href="/home/breakthrough"><div class="edition btn-breakthrough"></div></a>
            <a href="/home/create"><div class="edition btn-create"></div></a>
        </div>
    </div>
<script src="../../public/js/jquery-1.11.1.min.js"></script>
<script>


</script>
</body>
</html>
