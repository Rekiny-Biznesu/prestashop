<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the public 'ps_metrics.presenter.store.store' shared service.

return $this->services['ps_metrics.presenter.store.store'] = new \PrestaShop\Module\Ps_metrics\Presenter\Store\StorePresenter(${($_ = isset($this->services['ps_metrics.module']) ? $this->services['ps_metrics.module'] : $this->load('getPsMetrics_ModuleService.php')) && false ?: '_'}, ${($_ = isset($this->services['ps_metrics.context.prestashop']) ? $this->services['ps_metrics.context.prestashop'] : ($this->services['ps_metrics.context.prestashop'] = new \PrestaShop\Module\Ps_metrics\Context\PrestaShopContext())) && false ?: '_'}, ${($_ = isset($this->services['ps_metrics.presenter.store.context']) ? $this->services['ps_metrics.presenter.store.context'] : $this->load('getPsMetrics_Presenter_Store_ContextService.php')) && false ?: '_'}, ${($_ = isset($this->services['ps_metrics.presenter.store.dashboard']) ? $this->services['ps_metrics.presenter.store.dashboard'] : $this->load('getPsMetrics_Presenter_Store_DashboardService.php')) && false ?: '_'}, ${($_ = isset($this->services['ps_metrics.presenter.store.settings']) ? $this->services['ps_metrics.presenter.store.settings'] : $this->load('getPsMetrics_Presenter_Store_SettingsService.php')) && false ?: '_'});