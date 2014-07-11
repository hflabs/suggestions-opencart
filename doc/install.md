Инструкция по модификации исходных кодов магазина
---------------

Измените файлы, как описано ниже.

### 1. catalog/view/theme/default/template/common/header.tpl

После строчек:

```
    <?php foreach ($scripts as $script) { ?>
        <script type="text/javascript" src="<?php echo $script; ?>"></script>
    <?php } ?>
```

Добавить:

```
    <link href="catalog/view/theme/default/stylesheet/dadata/suggestions-4.4.css" type="text/css" rel="stylesheet" />
    <!--[if lt IE 10]>
      <script type="text/javascript" src="catalog/view/javascript/jquery/dadata/jquery.xdomainrequest.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="catalog/view/javascript/jquery/dadata/jquery.suggestions-4.4.min.js"></script>
    <script type="text/javascript" src="catalog/view/javascript/jquery/dadata/dadata.js"></script>
```

### 2. catalog/controller/account/register.php

Перед строчкой: `$this->data['breadcrumbs'] = array();`

Добавить:

```
    $this->data['dadata_api'] = $this->config->get('dadata_api');
    $this->data['dadata_tips'] = $this->config->get('dadata_tips');
    $this->data['dadata_correction'] = $this->config->get('dadata_correction');
    $this->data['dadata_additional'] = $this->config->get('dadata_additional');
    $this->data['dadata_gender'] = $this->config->get('dadata_gender');
    $this->data['dadata_status'] = $this->config->get('dadata_status');
```

### 3. catalog/controller/account/edit.php

Перед строчкой: `$this->data['breadcrumbs'] = array();`

Добавить:

```
    $this->data['dadata_api'] = $this->config->get('dadata_api');
    $this->data['dadata_tips'] = $this->config->get('dadata_tips');
    $this->data['dadata_correction'] = $this->config->get('dadata_correction');
    $this->data['dadata_additional'] = $this->config->get('dadata_additional');
    $this->data['dadata_gender'] = $this->config->get('dadata_gender');
    $this->data['dadata_status'] = $this->config->get('dadata_status');
```
        
### 4. catalog/controller/account/address.php

После строчки: `protected function getForm() {`

Добавить: 

```
    $this->data['dadata_api'] = $this->config->get('dadata_api');
    $this->data['dadata_tips'] = $this->config->get('dadata_tips');
    $this->data['dadata_correction'] = $this->config->get('dadata_correction');
    $this->data['dadata_additional'] = $this->config->get('dadata_additional');
    $this->data['dadata_gender'] = $this->config->get('dadata_gender');
    $this->data['dadata_status'] = $this->config->get('dadata_status');
```
        
### 5. catalog/controller/checkout/guest.php

После строчки: `public function index() {`

Добавить:

```
    $this->data['dadata_api'] = $this->config->get('dadata_api');
    $this->data['dadata_tips'] = $this->config->get('dadata_tips');
    $this->data['dadata_correction'] = $this->config->get('dadata_correction');
    $this->data['dadata_additional'] = $this->config->get('dadata_additional');
    $this->data['dadata_gender'] = $this->config->get('dadata_gender');
    $this->data['dadata_status'] = $this->config->get('dadata_status');
```

### 6. catalog/controller/checkout/register.php

После строчки: `public function index() {`

Добавить:

```
    $this->data['dadata_api'] = $this->config->get('dadata_api');
    $this->data['dadata_tips'] = $this->config->get('dadata_tips');
    $this->data['dadata_correction'] = $this->config->get('dadata_correction');
    $this->data['dadata_additional'] = $this->config->get('dadata_additional');
    $this->data['dadata_gender'] = $this->config->get('dadata_gender');
    $this->data['dadata_status'] = $this->config->get('dadata_status');
```

### 7. catalog/controller/checkout/payment_address.php
   
После строчки:

```
    $this->data['button_continue'] = $this->language->get('button_continue');
```

Добавить:

```
    $this->data['dadata_api'] = $this->config->get('dadata_api');
    $this->data['dadata_tips'] = $this->config->get('dadata_tips');
    $this->data['dadata_correction'] = $this->config->get('dadata_correction');
    $this->data['dadata_additional'] = $this->config->get('dadata_additional');
    $this->data['dadata_gender'] = $this->config->get('dadata_gender');
    $this->data['dadata_status'] = $this->config->get('dadata_status');
```

### 8. catalog/controller/checkout/shipping_address.php
   
После строчки:

```
    $this->data['button_continue'] = $this->language->get('button_continue');
```

Добавить:

```
    $this->data['dadata_api'] = $this->config->get('dadata_api');
    $this->data['dadata_tips'] = $this->config->get('dadata_tips');
    $this->data['dadata_correction'] = $this->config->get('dadata_correction');
    $this->data['dadata_additional'] = $this->config->get('dadata_additional');
    $this->data['dadata_gender'] = $this->config->get('dadata_gender');
    $this->data['dadata_status'] = $this->config->get('dadata_status');
```

### 9. catalog/view/theme/default/template/account/register.tpl

После строчки: `<h2><?php echo $text_your_details; ?></h2>`

Изменить строку: `<div class="content">`

на строку: `<div class="content" style="overflow: visible;">`

---

Перед строчкой: `<?php echo $footer; ?>`

Добавить: 

```
    <script type="text/javascript"><!--
      var status = <?php echo $dadata_status; ?>;
      if(status == '1') {
        FullNameSuggestions.init({
          name: $('input[name=\'firstname\']'),
          surname: $('input[name=\'lastname\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          view_gender: "<?php echo $dadata_gender; ?>"
        });
        FullAddressSuggestions.init({
          address: $('input[name=\'address\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          additional: "<?php echo $dadata_additional; ?>",
        });
      }
    //--></script>
```

---

Перед строчкой: `<td><?php echo $entry_company; ?></td>`

Добавить:

```
    <?php if($dadata_status) { ?>
      <tr>
        <td colspan="2">
          <input type="text" name="address" placeholder="Введите адрес в свободной форме, остальные поля заполнятся автоматически" />
        </td>   
      </tr>
    <?php } ?>
```

### 10. catalog/view/theme/default/template/account/edit.tpl

После строчки: `<h2><?php echo $text_your_details; ?></h2>`

Изменить строку: `<div class="content">`

на строку: `<div class="content" style="overflow: visible;">`

---

Перед строчкой: `<?php echo $footer; ?>`

Добавить: 

```
    <script type="text/javascript"><!--
      var status = <?php echo $dadata_status; ?>;
      if(status == '1') {
        FullNameSuggestions.init({
          name: $('input[name=\'firstname\']'),
          surname: $('input[name=\'lastname\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          view_gender: "<?php echo $dadata_gender; ?>"
        });
      }
    //--></script>
```

### 11. catalog/view/theme/default/template/account/address_form.tpl

После строчек:

```
    <tr>
      <td><span class="required">*</span> <?php echo $entry_lastname; ?></td>
      <td><input type="text" name="lastname" value="<?php echo $lastname; ?>" />
      <?php if ($error_lastname) { ?>
        <span class="error"><?php echo $error_lastname; ?></span>
      <?php } ?></td>
    </tr>
```

Добавить:        

```
    <?php if($dadata_status) { ?>
      <tr>
        <td colspan="2">
          <input type="text" name="address" placeholder="Введите адрес в свободной форме, остальные поля заполнятся автоматически" />
        </td>   
      </tr>
    <?php } ?>
```

---

Перед строчкой: `<?php echo $footer; ?>`

Добавить: 

```
    <script type="text/javascript"><!--
      var status = <?php echo $dadata_status; ?>;
      if(status == '1') {
        FullNameSuggestions.init({
          name: $('input[name=\'firstname\']'),
          surname: $('input[name=\'lastname\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          view_gender: "<?php echo $dadata_gender; ?>"
        });
      }
    //--></script>
```

### 12. catalog/view/theme/default/template/checkout/guest.tpl

После строчки: `<h2><?php echo $text_your_details; ?></h2>`
Изменить строку: `<div class="content">`
на строку: `<div class="content" style="overflow: visible;">`

---

После строчки: `<h2><?php echo $text_your_address; ?></h2>`

Добавить:

```
    <?php if($dadata_status) { ?>
      <tr>
        <td colspan="2">
          <input type="text" name="address" placeholder="Введите адрес в свободной форме, остальные поля заполнятся автоматически" />
        </td>   
      </tr>
    <?php } ?>
```

---

В конец файла добавить:

```
    <script type="text/javascript"><!--
      var status = <?php echo $dadata_status; ?>;
      if(status == '1') {
        FullNameSuggestions.init({
          name: $('input[name=\'firstname\']'),
          surname: $('input[name=\'lastname\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          view_gender: "<?php echo $dadata_gender; ?>"
        });
        FullAddressSuggestions.init({
          address: $('input[name=\'address\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          additional: "<?php echo $dadata_additional; ?>",
        });
      }
    //--></script>
```

### 13. catalog/view/theme/default/template/checkout/register.tpl

После строчки: `<h2><?php echo $text_your_details; ?></h2>`
Изменить строку: `<div class="content">`
на строку: `<div class="content" style="overflow: visible;">`

---

После строчки: `<h2><?php echo $text_your_address; ?></h2>`

Добавить:

```
    <?php if($dadata_status) { ?>
      <tr>
        <td colspan="2">
          <input type="text" name="address" placeholder="Введите адрес в свободной форме, остальные поля заполнятся автоматически" />
        </td>   
      </tr>
    <?php } ?>
```

---

В конец файла добавить:

```
    <script type="text/javascript"><!--
      var status = <?php echo $dadata_status; ?>;
      if(status == '1') {
        FullNameSuggestions.init({
          name: $('input[name=\'firstname\']'),
          surname: $('input[name=\'lastname\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          view_gender: "<?php echo $dadata_gender; ?>"
        });
        FullAddressSuggestions.init({
          address: $('input[name=\'address\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          additional: "<?php echo $dadata_additional; ?>",
        });
      }
    //--></script>
```

### 14. catalog/view/theme/default/template/checkout/payment_address.tpl

В конец файла добавить:

```
    <script type="text/javascript"><!--
      var status = <?php echo $dadata_status; ?>;
      if(status == '1') {
        FullNameSuggestions.init({
          name: $('input[name=\'firstname\']'),
          surname: $('input[name=\'lastname\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          view_gender: "<?php echo $dadata_gender; ?>"
        });
        FullAddressSuggestions.init({
          address: $('input[name=\'address\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          additional: "<?php echo $dadata_additional; ?>",
        });
      }
    //--></script>
```

### 15. catalog/view/theme/default/template/checkout/shipping_address.tpl

В конец файла добавить:

```
    <script type="text/javascript"><!--
      var status = <?php echo $dadata_status; ?>;
      if(status == '1') {
        FullNameSuggestions.init({
          name: $('input[name=\'firstname\']'),
          surname: $('input[name=\'lastname\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          view_gender: "<?php echo $dadata_gender; ?>"
        });
        FullAddressSuggestions.init({
          address: $('input[name=\'address\']'),
          token: "<?php echo $dadata_api; ?>",
          tips: "<?php echo $dadata_tips;?>",
          correction: "<?php echo $dadata_correction; ?>",
          additional: "<?php echo $dadata_additional; ?>",
        });
      }
    //--></script>
```
