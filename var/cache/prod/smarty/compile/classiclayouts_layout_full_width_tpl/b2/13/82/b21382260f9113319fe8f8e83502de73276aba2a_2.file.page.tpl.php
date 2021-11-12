<?php
/* Smarty version 3.1.39, created on 2021-11-12 23:50:07
  from '/var/www/html/prestashop/prestashop/themes/classic/templates/page.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_618eef9fbcd3f9_11665032',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b21382260f9113319fe8f8e83502de73276aba2a' => 
    array (
      0 => '/var/www/html/prestashop/prestashop/themes/classic/templates/page.tpl',
      1 => 1636577994,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_618eef9fbcd3f9_11665032 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_274816136618eef9fbbfc53_55106408', 'content');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, $_smarty_tpl->tpl_vars['layout']->value);
}
/* {block 'page_title'} */
class Block_2123910460618eef9fbc1784_68234009 extends Smarty_Internal_Block
{
public $callsChild = 'true';
public $hide = 'true';
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <header class="page-header">
          <h1><?php 
$_smarty_tpl->inheritance->callChild($_smarty_tpl, $this);
?>
</h1>
        </header>
      <?php
}
}
/* {/block 'page_title'} */
/* {block 'page_header_container'} */
class Block_1293288203618eef9fbc0a29_13307541 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_2123910460618eef9fbc1784_68234009', 'page_title', $this->tplIndex);
?>

    <?php
}
}
/* {/block 'page_header_container'} */
/* {block 'page_content_top'} */
class Block_1976684926618eef9fbc6490_05818666 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_content_top'} */
/* {block 'page_content'} */
class Block_242653786618eef9fbc73a6_18475755 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <!-- Page content -->
        <?php
}
}
/* {/block 'page_content'} */
/* {block 'page_content_container'} */
class Block_1488981685618eef9fbc5504_76062297 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <div id="content" class="page-content card card-block">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1976684926618eef9fbc6490_05818666', 'page_content_top', $this->tplIndex);
?>

        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_242653786618eef9fbc73a6_18475755', 'page_content', $this->tplIndex);
?>

      </div>
    <?php
}
}
/* {/block 'page_content_container'} */
/* {block 'page_footer'} */
class Block_1147993504618eef9fbc9741_72538323 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <!-- Footer content -->
        <?php
}
}
/* {/block 'page_footer'} */
/* {block 'page_footer_container'} */
class Block_1869870584618eef9fbc8cf8_02773091 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <footer class="page-footer">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1147993504618eef9fbc9741_72538323', 'page_footer', $this->tplIndex);
?>

      </footer>
    <?php
}
}
/* {/block 'page_footer_container'} */
/* {block 'content'} */
class Block_274816136618eef9fbbfc53_55106408 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'content' => 
  array (
    0 => 'Block_274816136618eef9fbbfc53_55106408',
  ),
  'page_header_container' => 
  array (
    0 => 'Block_1293288203618eef9fbc0a29_13307541',
  ),
  'page_title' => 
  array (
    0 => 'Block_2123910460618eef9fbc1784_68234009',
  ),
  'page_content_container' => 
  array (
    0 => 'Block_1488981685618eef9fbc5504_76062297',
  ),
  'page_content_top' => 
  array (
    0 => 'Block_1976684926618eef9fbc6490_05818666',
  ),
  'page_content' => 
  array (
    0 => 'Block_242653786618eef9fbc73a6_18475755',
  ),
  'page_footer_container' => 
  array (
    0 => 'Block_1869870584618eef9fbc8cf8_02773091',
  ),
  'page_footer' => 
  array (
    0 => 'Block_1147993504618eef9fbc9741_72538323',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>


  <section id="main">

    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1293288203618eef9fbc0a29_13307541', 'page_header_container', $this->tplIndex);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1488981685618eef9fbc5504_76062297', 'page_content_container', $this->tplIndex);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1869870584618eef9fbc8cf8_02773091', 'page_footer_container', $this->tplIndex);
?>


  </section>

<?php
}
}
/* {/block 'content'} */
}
