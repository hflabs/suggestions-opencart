(function($) {
    "use strict";

    function nvl(val) {
        return val || '';
    }

    var FullNameSuggestions = {
        init: function($options) {

            var self = this;
            self.$surname = $options.surname;
            self.$name = $options.name;
            var fioParts = [["SURNAME"], ["NAME", "PATRONYMIC"]];
            
            $.each([$options.surname, $options.name], function(index, $el) {
                $el.suggestions({
                    serviceUrl: $options.url,
                    token: $options.token,
                    type: "NAME",
                    triggerSelectOnSpace: ($options.correction == "1"),
                    useDadata: false,
                    hint: "",
                    count: $options.tips,
                    noCache: true,
                    params: {
                        // каждому полю --- соответствующая подсказка
                        parts: fioParts[index]
                    },

                    onSearchStart: function(params) {
                        // если пол известен на основании других полей,
                        // используем его
                        var $el = $(this);
                        params.gender = self.isGenderKnown($el) ? self.gender : "UNKNOWN";
                        if (index == 1) {
                            $(".dadata-gender").remove();
                        }
                    },

                    onSelect: function(suggestion) {
                        // определяем пол по выбранной подсказке
                        self.gender = suggestion.data.gender;
                        if ($options.view_gender == "1") {
                            var gender = self.gender === "MALE" ? "Мужской" : 
                                         self.gender === "FEMALE" ? "Женский" :
                                         "Неизвестный";
                            if (index == 1) {
                                $(this).next('.suggestions-wrapper').after(
                                    '<span class="dadata-gender">Пол: ' + gender + '<br /></span>'
                                );
                            }
                        }
                    }
                });
            });
        },
        
        isGenderKnown: function($el) {
            var self = this,
                surname = self.$surname.val(),
                name = self.$name.val(),
                nameUnknown = $el.attr('id') == self.$surname.attr('id') && !name,
                surnameUnknown = $el.attr('id') == self.$name.attr('id') && !surname;
            return !(nameUnknown || surnameUnknown);
        }
    };

    var FullAddressSuggestions = {

        init: function($options) {
            var self = this;
            self.$address = $options.address;
            
            // инициализируем подсказки на всех трех текстовых полях
            // (фамилия, имя, отчество)
            $.each([$options.address], function(index, $el) {
                self.initSuggestions($el, $options);
            });
        },

        initSuggestions: function($el, $options) {
            var self = this;
            $el.suggestions({
                serviceUrl: $options.url,
                token: $options.token,
                type: "ADDRESS",
                triggerSelectOnSpace: ($options.correction == '1'),
                count: $options.tips,
                
                onSearchStart: function(params) {
                    $('.dadata-additional').remove();
                },

                onSelect: function(suggestion) {
                    if (!suggestion.data) {
                        return;
                    }
                    $('.dadata-additional').remove();
                    var $where = $(this).parents(".simplecheckout-block");
                    
                    if (!$where.length) {
                        $where = $(document);
                    }
                    var address = suggestion.data;
                    if ($options.additional == '1') {
                        $(this).next('.suggestions-wrapper').after(
                            self.getAdditional(address)
                        );
                    }
                    $where.find("input[name*=postcode]").val(
                        nvl(address.postal_code)
                    );
                    $where.find("input[name*=city]").val(
                        self.getCity(address,$options.dadata_citytype)
                    );
                    $where.find("input[name*=address_1]").val(
                        self.getStreetAddress(address)
                    );
                    if (address.region) {
                        self.selectRegion(address, $where.find("select[name*=zone_id]"));
                    }
                }
                
            });
        },

        getCity: function(address,showType) {
            var city = '';
            // города-регионы пишем в город
            if (address.city === null && address.settlement === null && address.area === null) {
                city = (showType?address.region_type + '. ':'') + address.region;
            // район + город + населенный пункт
            } else {
                if (address.area) {
                    city += (showType?address.area_type + ' ':'') + address.area;
                }
                if (address.city) {
                    city += (city ? ', ' : '') + (showType?address.city_type + ' ':'') + address.city;
                }
                if (address.settlement) {
                    city += (city ? ', ' : '') + (showType?address.settlement_type + ' ':'') + address.settlement;
                }
            }
            return city;
        },

        getStreetAddress: function(address) {
            // улица + дом + квартира
            var address_1 = '';
            if (address.street_type && address.street) {
                address_1 += address.street_type + ' ' + address.street;
            }
            if(address.house_type !== null && address.house !== null) {
                address_1 += (address_1 ? ', ' : '') + address.house_type + ' ' + address.house;
            }
            if(address.flat_type !== null && address.flat !== null) {
                address_1 += (address_1 ? ', ' : '') + address.flat_type + ' ' + address.flat;
            }
            return address_1;
        },

        getAdditional: function(address) {
            return '<span class="dadata-additional">Код КЛАДР: ' + nvl(address.kladr_id) + 
                    '<br /> Код ОКАТО: ' + nvl(address.okato) + 
                    '<br />Код ОКТМО: ' + nvl(address.oktmo) + 
                    '<br />Код ИФНС: ' + nvl(address.ifns) + '<br /></span>';
        },

        selectRegion: function(address, $el) {
            $el.children("option").each(function() {
                if (this.text.indexOf(address.region) !== -1) { 
                    $(this).attr("selected", "selected");
                }
            });
        }

    };

    window.FullNameSuggestions = FullNameSuggestions;
    window.FullAddressSuggestions = FullAddressSuggestions;
})(jQuery);