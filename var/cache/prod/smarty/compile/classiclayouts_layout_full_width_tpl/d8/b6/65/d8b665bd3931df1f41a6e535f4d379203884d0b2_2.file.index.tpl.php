<?php
/* Smarty version 3.1.39, created on 2021-11-11 19:39:54
  from '/var/www/html/prestashop/prestashop/themes/classic/templates/index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_618d637accc778_70976191',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd8b665bd3931df1f41a6e535f4d379203884d0b2' => 
    array (
      0 => '/var/www/html/prestashop/prestashop/themes/classic/templates/index.tpl',
      1 => 1633363913,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_618d637accc778_70976191 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1703609328618d637acc8878_49815036', 'page_content_container');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, 'page.tpl');
}
/* {block 'page_content_top'} */
class Block_613562548618d637acc9003_42020351 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_content_top'} */
/* {block 'hook_home'} */
class Block_421192572618d637acca229_63319875 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <?php echo $_smarty_tpl->tpl_vars['HOOK_HOME']->value;?>

          <?php
}
}
/* {/block 'hook_home'} */
/* {block 'page_content'} */
class Block_657479647618d637acc9aa1_66622050 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_421192572618d637acca229_63319875', 'hook_home', $this->tplIndex);
?>

        <?php
}
}
/* {/block 'page_content'} */
/* {block 'page_content_container'} */
class Block_1703609328618d637acc8878_49815036 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_content_container' => 
  array (
    0 => 'Block_1703609328618d637acc8878_49815036',
  ),
  'page_content_top' => 
  array (
    0 => 'Block_613562548618d637acc9003_42020351',
  ),
  'page_content' => 
  array (
    0 => 'Block_657479647618d637acc9aa1_66622050',
  ),
  'hook_home' => 
  array (
    0 => 'Block_421192572618d637acca229_63319875',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <section id="content" class="page-home">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_613562548618d637acc9003_42020351', 'page_content_top', $this->tplIndex);
?>


        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_657479647618d637acc9aa1_66622050', 'page_content', $this->tplIndex);
?>

      </section>
    <?php
}
}
/* {/block 'page_content_container'} */
}
