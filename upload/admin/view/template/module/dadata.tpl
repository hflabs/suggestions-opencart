<?php echo $header; ?>
<div id="content">
<div class="breadcrumb">
  <?php foreach ($breadcrumbs as $breadcrumb) { ?>
  <?php echo $breadcrumb['separator']; ?><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a>
  <?php } ?>
</div>
<?php if ($error_warning) { ?>
<div class="warning"><?php echo $error_warning; ?></div>
<?php } ?>
<div class="box">
  <div class="heading">
    <h1><img src="view/image/module.png" alt="" /> <?php echo $heading_title; ?></h1>
    <div class="buttons"><a onclick="$('#form').submit();" class="button"><?php echo $button_save; ?></a><a onclick="location = '<?php echo $cancel; ?>';" class="button"><?php echo $button_cancel; ?></a></div>
  </div>
  <div class="content">
    <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form">
		<table id="module" class="form">
			<tr>
				<td>
					<span class="required">*</span>
					<?php echo $entry_api; ?>
				</td>
				<td>
					<input name="dadata_api" size="40" value="<?php echo $dadata_api; ?>" />
					<?php if(isset($error_api)) { ?>
						<span class="error"><?php echo $error_api; ?></span>
					<?php } ?>
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_tips; ?>
				</td>
				<td>
					<input name="dadata_tips" value="<?php echo $dadata_tips; ?>" />
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_correction; ?>
				</td>
				<td>
					<select name="dadata_correction">
						<?php if($dadata_correction) { ?>
							<option value="1" selected="selected"><?php echo $text_yes; ?></option>
							<option value="0"><?php echo $text_no; ?></option>
						<?php } else { ?>
							<option value="1"><?php echo $text_yes; ?></option>
							<option value="0" selected="selected"><?php echo $text_no; ?></option>
						<?php } ?>
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_additional; ?>
				</td>
				<td>
					<select name="dadata_additional">
						<?php if($dadata_additional) { ?>
							<option value="1" selected="selected"><?php echo $text_yes; ?></option>
							<option value="0"><?php echo $text_no; ?></option>
						<?php } else { ?>
							<option value="1"><?php echo $text_yes; ?></option>
							<option value="0" selected="selected"><?php echo $text_no; ?></option>
						<?php } ?>
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<?php echo $entry_gender; ?>
				</td>
				<td>
					<select name="dadata_gender">
						<?php if($dadata_gender) { ?>
							<option value="1" selected="selected"><?php echo $text_yes; ?></option>
							<option value="0"><?php echo $text_no; ?></option>
						<?php } else { ?>
							<option value="1"><?php echo $text_yes; ?></option>
							<option value="0" selected="selected"><?php echo $text_no; ?></option>
						<?php } ?>
					</select>
				</td>
			</tr>
            <tr>
                <td><?php echo $entry_status; ?></td>
                <td class="left">
                    <select name="dadata_status">
                        <?php if($dadata_status) { ?>
                        <option value="1" selected="selected"><?php echo $text_enabled; ?></option>
                        <option value="0"><?php echo $text_disabled; ?></option>
                        <?php } else { ?>
                        <option value="1"><?php echo $text_enabled; ?></option>
                        <option value="0" selected="selected"><?php echo $text_disabled; ?></option>
                        <?php } ?>
                    </select>
                </td>
            </tr>
            <tr>
                <td><?php echo $entry_paid; ?></td>
                <td class="left">
                    <select name="dadata_paid">
                        <?php if($dadata_paid=='free') { ?>
                        <option value="free" selected="selected"><?php echo $text_free; ?></option>
                        <option value="paid"><?php echo $text_paid; ?></option>
                        <?php } else { ?>
                        <option value="free"><?php echo $text_free; ?></option>
                        <option value="paid" selected="selected"><?php echo $text_paid; ?></option>
                        <?php } ?>
                    </select>
                </td>
            </tr>
            <tr>
                <td><?php echo $entry_citytype; ?></td>
                <td class="left">
                    <select name="dadata_citytype">
                        <?php if($dadata_citytype) { ?>
                        <option value="1" selected="selected"><?php echo $text_yes; ?></option>
                        <option value="0"><?php echo $text_no; ?></option>
                        <?php } else { ?>
                        <option value="1"><?php echo $text_yes; ?></option>
                        <option value="0" selected="selected"><?php echo $text_no; ?></option>
                        <?php } ?>
                    </select>
                </td>
            </tr>
        </table>
        <?php foreach ($modules as $mod_id => $mod_val)
        foreach ($mod_val as $attr_id => $attr_val) { ?>
        <input type="hidden" value="<?php echo $attr_val ?>" name="dadata_module[<?php echo $mod_id ?>][<?php echo $attr_id ?>]"/>
        <?php } ?>
    </form>
  </div>
</div>
<?php echo $footer; ?>