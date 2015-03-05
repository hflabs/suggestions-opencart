<script type="text/javascript"><!--
    var status = '<?php echo $dadata_status;?>';

    var dadataUrl = '<?php echo ($dadata_paid=="free"?"https://dadata.ru/api/v2":"http://suggestions.dadata.ru/suggestions/api/4_1/rs/")?>'
    var addressInputHtml = '<input type = "text" ' +
            'name = "address" ' +
            'placeholder = "Введите адрес в свободной форме, остальные поля заполнятся автоматически"/>';

    function initFields() {
        if (status == '1') {
            $('div#content').css('overflow', 'visible');


            FullNameSuggestions.init({
                name: $('input[name*=firstname]'),
                surname: $('input[name*=lastname]'),
                url: dadataUrl,
                token: "<?php echo $dadata_api; ?>",
                tips: "<?php echo $dadata_tips;?>",
                correction: "<?php echo $dadata_correction; ?>",
                view_gender: "<?php echo $dadata_gender; ?>"
            });

            if ($('input[name=address]').length == 0) {
                var addressParent = $('input[name*=address_1]').parents("tbody");
                if (addressParent.length > 0) addressParent.prepend('<tr><td colspan = "2">' + addressInputHtml + '</td></tr >')
                else {
                    addressParent = $('input[name*=address_1]').prevAll("span");
                    if (addressParent.length > 0)
                        addressParent.before(addressInputHtml);
                }

                FullAddressSuggestions.init({
                    address: $('input[name=address]'),
                    url: dadataUrl ,
                    dadata_citytype: <?php echo (isset($dadata_citytype)?$dadata_citytype:'1'); ?>,
                    token: "<?php echo $dadata_api; ?>",
                    tips: "<?php echo $dadata_tips;?>",
                    correction: "<?php echo $dadata_correction; ?>",
                    additional: "<?php echo $dadata_additional; ?>"
                });
            }
        }

    }

    $(document).ready(function () {
        initFields();
        $(document).ajaxComplete(function (e, xhr, settings) {
            if (settings.url == "index.php?route=checkout/guest" ||
                    settings.url == "index.php?route=checkout/guest_shipping" ||
                    settings.url == "index.php?route=checkout/register" ||
                    settings.url == "index.php?route=checkout/shipping_address" ||
                    settings.url == "index.php?route=checkout/payment_address" ||
                    settings.url.indexOf("route=checkout/simplecheckout") > 0 ||
                    settings.url.indexOf("route=account/simpleaddress") > 0 ||
                    settings.url.indexOf("route=account/simpleedit") > 0 ||
                    settings.url.indexOf("route=account/simpleregister") > 0)
                initFields();
        });
    });
    //--></script>