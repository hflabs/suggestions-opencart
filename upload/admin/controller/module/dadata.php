<?php

class ControllerModuleDadata extends Controller
{
    private $error = array();

    public function index()
    {
        $this->load->language('module/dadata');

        $this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('dadata', $this->request->post);
            $this->session->data['success'] = $this->language->get('text_success');
            $this->redirect($this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL'));
        }

        $this->data['heading_title'] = $this->language->get('heading_title');

        $this->data['text_enabled'] = $this->language->get('text_enabled');
        $this->data['text_disabled'] = $this->language->get('text_disabled');
        $this->data['text_module'] = $this->language->get('text_module');
        $this->data['text_yes'] = $this->language->get('text_yes');
        $this->data['text_free'] = $this->language->get('text_free');
        $this->data['text_paid'] = $this->language->get('text_paid');
        $this->data['text_no'] = $this->language->get('text_no');

        $this->data['entry_status'] = $this->language->get('entry_status');
        $this->data['entry_api'] = $this->language->get('entry_api');
        $this->data['entry_tips'] = $this->language->get('entry_tips');
        $this->data['entry_correction'] = $this->language->get('entry_correction');
        $this->data['entry_additional'] = $this->language->get('entry_additional');
        $this->data['entry_gender'] = $this->language->get('entry_gender');
        $this->data['entry_paid'] = $this->language->get('entry_paid');
        $this->data['entry_citytype'] = $this->language->get('entry_citytype');

        $this->data['button_save'] = $this->language->get('button_save');
        $this->data['button_cancel'] = $this->language->get('button_cancel');

        if (isset($this->error['warning'])) {
            $this->data['error_warning'] = $this->error['warning'];
        } else {
            $this->data['error_warning'] = '';
        }

        if (isset($this->error['dadata_api'])) {
            $this->data['error_api'] = $this->error['dadata_api'];
        } else {
            $this->data['error_api'] = '';
        }

        $this->data['breadcrumbs'] = array();

        $this->data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL'),
            'separator' => false
        );

        $this->data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL'),
            'separator' => ' :: '
        );

        $this->data['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link('module/dadata', 'token=' . $this->session->data['token'], 'SSL'),
            'separator' => ' :: '
        );

        $this->data['action'] = $this->url->link('module/dadata', 'token=' . $this->session->data['token'], 'SSL');

        $this->data['cancel'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL');


        if (isset($this->request->post['dadata_api'])) {
            $this->data['dadata_api'] = $this->request->post['dadata_api'];
        } elseif ($this->config->get('dadata_api')) {
            $this->data['dadata_api'] = $this->config->get('dadata_api');
        } else {
            $this->data['dadata_api'] = '';
        }

        if (isset($this->request->post['dadata_tips'])) {
            $this->data['dadata_tips'] = $this->request->post['dadata_tips'];
        } elseif ($this->config->get('dadata_tips')) {
            $this->data['dadata_tips'] = $this->config->get('dadata_tips');
        } else {
            $this->data['dadata_tips'] = 10;
        }

        if (isset($this->request->post['dadata_correction'])) {
            $this->data['dadata_correction'] = $this->request->post['dadata_correction'];
        } else {
            $correction = $this->config->get('dadata_correction');
            if (strlen(trim($correction)) > 0) {
                $this->data['dadata_correction'] = $this->config->get('dadata_correction');
            } else {
                $this->data['dadata_correction'] = 1;
            }
        }

        if (isset($this->request->post['dadata_additional'])) {
            $this->data['dadata_additional'] = $this->request->post['dadata_additional'];
        } else {
            $additional = $this->config->get('dadata_additional');
            if (strlen(trim($additional)) > 0) {
                $this->data['dadata_additional'] = $this->config->get('dadata_additional');
            } else {
                $this->data['dadata_additional'] = 0;
            }
        }

        if (isset($this->request->post['dadata_gender'])) {
            $this->data['dadata_gender'] = $this->request->post['dadata_gender'];
        } else {
            $gender = $this->config->get('dadata_gender');
            if (strlen(trim($gender)) > 0) {
                $this->data['dadata_gender'] = $this->config->get('dadata_gender');
            } else {
                $this->data['dadata_gender'] = 0;
            }
        }

        if (isset($this->request->post['dadata_status'])) {
            $this->data['dadata_status'] = $this->request->post['dadata_status'];
        } else {
            $status = $this->config->get('dadata_status');
            if (strlen(trim($status)) > 0) {
                $this->data['dadata_status'] = $this->config->get('dadata_status');
            } else {
                $this->data['dadata_status'] = 0;
            }
        }

        if (isset($this->request->post['dadata_paid'])) {
            $this->data['dadata_paid'] = $this->request->post['dadata_paid'];
        } else {
            $paid = $this->config->get('dadata_paid');
            if (strlen(trim($paid)) > 0) {
                $this->data['dadata_paid'] = $this->config->get('dadata_paid');
            } else {
                $this->data['dadata_paid'] = 'free';
            }
        }

        if (isset($this->request->post['dadata_citytype'])) {
            $this->data['dadata_citytype'] = $this->request->post['dadata_citytype'];
        } else {
            $citytype = $this->config->get('dadata_citytype');
            if (strlen(trim($citytype)) > 0) {
                $this->data['dadata_citytype'] = $this->config->get('dadata_citytype');
            } else {
                $this->data['dadata_citytype'] = 1;
            }
        }

        $this->template = 'module/dadata.tpl';
        $this->children = array(
            'common/header',
            'common/footer'
        );

        $this->data['modules'] = array();
        if ($this->config->get('dadata_module')) {
            $this->data['modules'] = $this->config->get('dadata_module');
        }

        $this->load->model('design/layout');
        $layouts = array('Account', 'Checkout', 'Аккаунт', 'Оформление заказ');
        $i = 0;
        foreach ($this->model_design_layout->getLayouts() as $layval) {
            if (in_array($layval['name'], $layouts)) {
                $this->data['modules'][$i]['layout_id'] = $layval['layout_id'];
                $this->data['modules'][$i]['position'] = 'content_bottom';
                $this->data['modules'][$i]['status'] = true;
                $this->data['modules'][$i]['sort_order'] = 0;
                $i++;
            }
        }

        $this->response->setOutput($this->render());
    }

    private function validate()
    {
        if (!$this->user->hasPermission('modify', 'module/dadata')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        if (!$this->request->post['dadata_api']) {
            $this->error['dadata_api'] = $this->language->get('error_api');
        }

        if (!$this->error) {
            return true;
        } else {
            return false;
        }
    }
}
