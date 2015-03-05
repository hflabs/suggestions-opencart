<?php

class ControllerModuleDadata extends Controller
{
    protected function index($setting)
    {
        static $module = 0;

        $this->document->addStyle('https://dadata.ru/static/css/lib/suggestions-4.7.css', 'stylesheet', 'all');
        $this->document->addScript('https://dadata.ru/static/js/lib/jquery.suggestions-4.7.min.js');
        $this->document->addScript('catalog/view/javascript/jquery/dadata/dadata.js');


        if (file_exists('catalog/view/theme/' . $this->config->get('config_template') . '/stylesheet/dadata.css')) {
            $this->document->addStyle('catalog/view/theme/' . $this->config->get('config_template') . '/stylesheet/dadata.css');
        }
        $this->data['module'] = $module++;

        $this->data['dadata_api'] = $this->config->get('dadata_api');
        $this->data['dadata_tips'] = $this->config->get('dadata_tips');
        $this->data['dadata_correction'] = $this->config->get('dadata_correction');
        $this->data['dadata_additional'] = $this->config->get('dadata_additional');
        $this->data['dadata_gender'] = $this->config->get('dadata_gender');
        $this->data['dadata_paid'] = $this->config->get('dadata_paid');
        $this->data['dadata_status'] = $this->config->get('dadata_status');
        $this->data['dadata_citytype'] = $this->config->get('dadata_citytype');


        if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/module/dadata.tpl')) {
            $this->template = $this->config->get('config_template') . '/template/module/dadata.tpl';
        } else {
            $this->template = 'default/template/module/dadata.tpl';
        }

        $this->render();
    }
}

?>