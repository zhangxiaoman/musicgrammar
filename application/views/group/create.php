<h2><?php echo $title; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('group/create'); ?>

<label for="name">Name</label>
<input type="input" name="name" /><br />
<input type="hidden" name="ajax" value="1" /><br />
<input type="submit" name="submit" value="Create group item" />

</form>
