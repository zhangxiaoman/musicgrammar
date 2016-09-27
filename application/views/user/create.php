<h2><?php echo $title; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('user/create'); ?>

<label for="name">Name</label>
<input type="input" name="name" /><br />
<input type="hidden" name="ajax" value="1" /><br />
<input type="hidden" name="group_id" value="1" /><br />
<input type="submit" name="submit" value="进入" />

</form>
