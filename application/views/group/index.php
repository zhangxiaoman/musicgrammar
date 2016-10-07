
<style>
    table ,tr ,td {border :1px solid #4a4a4a}
</style>
<h2>组管理</h2>

<button class="begin_brk"  type="button">开始创作</button>
<?php foreach ($groups as $item): ?>

<h3><?php echo $item['name']; ?>
    <button class="begin" data-group-id = <?php echo $item['id'];?> type="button">开始</button>
    <button class="reset" data-group-id = <?php echo $item['id'];?> type="button">重置</button>
</h3>
<div class="main">
    <table>
        <tbody>
            <tr>
                <td>名称</td>
                <td>关卡</td>
                <td>状态</td>
            </tr>
            <?php foreach($item['users'] as $user) :  ?>
                <tr>
                    <td><?php echo $user['name']?></td>
                    <td><?php echo $user['level']?></td>
                    <td><?php echo $user['status_name']?></td>
                </tr>

            <?php endforeach; ?>

        </tbody>
    </table>
</div>

<?php endforeach; ?>
<script src="../../public/js/jquery-1.11.1.min.js"></script>
<script>

    $(function(){

        $(".begin").click(function(){

            var group_id = $(this).data('group-id');
            $.ajax({
                url: '/group/begin',
                type: 'post',
                data:{
                    group_id:group_id
                },
                dataType: 'json',
                success: function(re) {
                    location.reload();
                }
            });
        });
        $(".reset").click(function(){

            var group_id = $(this).data('group-id');
            $.ajax({
                url: '/group/clear',
                type: 'post',
                data:{
                    group_id:group_id
                },
                dataType: 'json',
                success: function(re) {
                    location.reload();
                }
            });
        });
        $(".begin_brk").click(function(){

            $.ajax({
                url: '/group/begin_brk',
                type: 'post',
                dataType: 'json',
                success: function(re) {
                    location.reload();
                }
            });
        })
    });
</script>
