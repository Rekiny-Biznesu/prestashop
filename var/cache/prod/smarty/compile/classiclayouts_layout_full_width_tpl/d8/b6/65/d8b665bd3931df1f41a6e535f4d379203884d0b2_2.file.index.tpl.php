<?php
/* Smarty version 3.1.39, created on 2021-11-12 23:50:07
  from '/var/www/html/prestashop/prestashop/themes/classic/templates/index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_618eef9fbba493_17440572',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd8b665bd3931df1f41a6e535f4d379203884d0b2' => 
    array (
      0 => '/var/www/html/prestashop/prestashop/themes/classic/templates/index.tpl',
      1 => 1636577994,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_618eef9fbba493_17440572 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_481829688618eef9fbb5089_23049679', 'page_content_container');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, 'page.tpl');
}
/* {block 'page_content_top'} */
class Block_1384531720618eef9fbb5e22_38508072 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_content_top'} */
/* {block 'hook_home'} */
class Block_2090742400618eef9fbb7956_68450058 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <?php echo $_smarty_tpl->tpl_vars['HOOK_HOME']->value;?>

          <?php
}
}
/* {/block 'hook_home'} */
/* {block 'page_content'} */
class Block_279889317618eef9fbb6f97_66207222 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_2090742400618eef9fbb7956_68450058', 'hook_home', $this->tplIndex);
?>

        <?php
}
}
/* {/block 'page_content'} */
/* {block 'page_content_container'} */
class Block_481829688618eef9fbb5089_23049679 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_content_container' => 
  array (
    0 => 'Block_481829688618eef9fbb5089_23049679',
  ),
  'page_content_top' => 
  array (
    0 => 'Block_1384531720618eef9fbb5e22_38508072',
  ),
  'page_content' => 
  array (
    0 => 'Block_279889317618eef9fbb6f97_66207222',
  ),
  'hook_home' => 
  array (
    0 => 'Block_2090742400618eef9fbb7956_68450058',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <section id="content" class="page-home">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1384531720618eef9fbb5e22_38508072', 'page_content_top', $this->tplIndex);
?>


        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_279889317618eef9fbb6f97_66207222', 'page_content', $this->tplIndex);
?>

      </section>
    <?php
}
}
/* {/block 'page_content_container'} */
}
