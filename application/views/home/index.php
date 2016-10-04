<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="../../public/css/normalize.css">
	<link rel="stylesheet" href="../../public/css/index.css">
</head>
<body>
	<div class="wrap">
		<div class="container">
			<div class="logo"></div>
			<div class="form">
				<div class="username">
					<label class="t-label" for="username">输入姓名</label>
					<input id="username" type="text">
					<input id="group_id" type="hidden">
				</div>
				<div class="group">
					<div class="t-label">选择组别</div>
					<div class="ilb">

						<?php foreach($groups as $group) : ?>
							<div class="group-item group-<?php echo $group['alias']; ?> " data-group="<?php echo $group['id']; ?>">
								<div class="group-bg">
									<div class="group-icon"></div>
								</div>
								<div class="gruop-text"><?php echo $group['name']; ?></div>
							</div>
						<?php endforeach;?>
<!--						<div class="group-item group-a selected" data-group="a">-->
<!--							<div class="group-bg">-->
<!--								<div class="group-icon"></div>-->
<!--							</div>-->
<!--							<div class="gruop-text">A组</div>-->
<!--						</div>-->
<!--						<div class="group-item group-b" data-group="b">-->
<!--							<div class="group-bg">-->
<!--								<div class="group-icon"></div>-->
<!--							</div>-->
<!--							<div class="gruop-text">B组</div>-->
<!--						</div>-->
<!--						<div class="group-item group-c" data-group="c">-->
<!--							<div class="group-bg">-->
<!--								<div class="group-icon"></div>-->
<!--							</div>-->
<!--							<div class="gruop-text">C组</div>-->
<!--						</div>-->
					</div>
				</div>
				<div class="btn-start"></div>
			</div>
		</div>
	</div>
	<script src="../../public/js/jquery-1.11.1.min.js"></script>
	<script src="../../public/js/index.js"></script>
</body>
</html>
