<?php
/* Smarty version 3.1.39, created on 2021-11-08 16:12:14
  from '/var/www/html/prestashop/prestashop/admin057uc2t3k/themes/default/template/content.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_61893e4e5b0210_48806700',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '32c5e7fe0db7040032ed326ff889bfe81459aacb' => 
    array (
      0 => '/var/www/html/prestashop/prestashop/admin057uc2t3k/themes/default/template/content.tpl',
      1 => 1633363913,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_61893e4e5b0210_48806700 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="ajax_confirmation" class="alert alert-success hide"></div>
<div id="ajaxBox" style="display:none"></div>

<div class="row">
	<div class="col-lg-12">
		<?php if ((isset($_smarty_tpl->tpl_vars['content']->value))) {?>
			<?php echo $_smarty_tpl->tpl_vars['content']->value;?>

		<?php }?>
	</div>
</div>
<?php }
}
