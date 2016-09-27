<h2><?php echo $title; ?></h2>

<style>
    table thead tr td {border: 1px solid #000000;}
    table tbody tr td {border: 1px solid #000000;}
</style>
<table>
    <thead>
        <tr>
            <td>名称</td>
            <td>状态</td>
        </tr>
    </thead>
    <tbody>

    <?php foreach ($users as $user): ?>

        <tr>
            <td><?php echo $user['name']; ?></td>
            <td><?php echo empty($user['status']) ? "未准备" : '准备好了'; ?></td>
        </tr>

    <?php endforeach; ?>
    </tbody>
</table>

