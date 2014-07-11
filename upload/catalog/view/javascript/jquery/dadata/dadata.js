
var FullNameSuggestions = {
	init: function($options) {

		var self = this;
		self.$surname = $options.surname;
		self.$name = $options.name;
		var fioParts = ["SURNAME", "NAME"];
		
		var triggerSelectOnSpace = true;
		if($options.correction == '1') {
			triggerSelectOnSpace = true;
		} else {
			triggerSelectOnSpace = false;
		}
		
		$.each([$options.surname, $options.name], function(index, $el) {
			$el.suggestions({
				serviceUrl: "https://dadata.ru/api/v2",
				token: $options.token,
				type: "NAME",
				triggerSelectOnSpace: triggerSelectOnSpace,
				useDadata: false,
				hint: "",
				count: $options.tips,
				noCache: true,
				params: {
					// каждому полю --- соответствующая подсказка
					parts: [fioParts[index]]
				},

				onSearchStart: function(params) {
					// если пол известен на основании других полей,
					// используем его
					var $el = $(this);
					params.gender = self.isGenderKnown($el) ? self.gender : "UNKNOWN";
					if(index == 1) {
						$('.dadata-gender').remove();
					}
				},

				onSelect: function(suggestion) {
					// определяем пол по выбранной подсказке
					self.gender = suggestion.data.gender;
					if($options.view_gender == '1') {
						if(self.gender == 'MALE') {
							gender = 'Мужской';
						} else {
							gender = 'Женский';
						}
						if(index == 1) {
							$(this).next('.suggestions-wrapper').after('<span class="dadata-gender">Пол: ' + gender + '<br /></span>');
						}
					}
				}
			});
		});
	},
	
	isGenderKnown: function($el) {
		var self = this;
		var surname = self.$surname.val(),
		name = self.$name.val();
		if ( ($el.attr('id') == self.$surname.attr('id') && !name) || ($el.attr('id') == self.$name.attr('id') && !surname) ) {
				return false;
		} else {
				return true;
		}
	}
};


var FullAddressSuggestions = {

	init: function($options) {

		var self = this;
		self.$address = $options.address;

		var triggerSelectOnSpace = true;
		if($options.correction == '1') {
			triggerSelectOnSpace = true;
		} else {
			triggerSelectOnSpace = false;
		}
		
		// инициализируем подсказки на всех трех текстовых полях
		// (фамилия, имя, отчество)
		$.each([$options.address], function(index, $el) {
			$el.suggestions({
				serviceUrl: "https://dadata.ru/api/v2",
				token: $options.token,
				type: "ADDRESS",
				triggerSelectOnSpace: triggerSelectOnSpace,
				count: $options.tips,
				onSearchStart: function(params) {
					$('.dadata-additional').remove();
				},

				onSelect: function(suggestion) {
					if (suggestion.data) {
						$('.dadata-additional').remove();
						var address = suggestion.data;

						if($options.additional == '1') {
							var kladr = ''; 
							var okato = '';
							var oktmo = '';
							var ifns = '';
							if(address.kladr_id != null) {
								kladr = address.kladr_id;
							}
							if(address.okato != null) {
								okato = address.okato;
							}
							if(address.oktmo != null) {
								oktmo = address.oktmo;
							}
							if(address.tax_office != null) {
								ifns = address.tax_office;
							}
							$(this).next('.suggestions-wrapper').after('<span class="dadata-additional">Код КЛАДР: ' + kladr + '<br /> Код ОКАТО: ' + okato + '<br />Код ОКТМО: ' + oktmo + '<br />Код ИФНС: ' + ifns + '<br /></span>');
						}

						if(address.postal_code != null) {
							$("input[name=\'postcode\']").val(address.postal_code);
						}

						var city = '';
						if (address.city == null && address.settlement == null) {
							city = address.region_type + '. ' + address.region;
						} else {
							if(address.city_type != null && address.city != null) {
								city = address.city_type + '. ' + address.city;
							}
							if(address.settlement_type != null && address.settlement != null) {
								city = city + ' ' + address.settlement_type + '. ' +
								address.settlement;
							}
						}
						$("input[name=\'city\']").val(city);

						var address_1 = '';
						if(address.street_type != null && address.street != null) {
							address_1 = address.street_type + '. ' + address.street;
						}
						if(address.house_type != null && address.house != null) {
							address_1 = address_1 + ', ' + address.house_type + '. ' + address.house;
						}
						if(address.flat_type != null && address.flat != null) {
							address_1 = address_1 + ', ' + address.flat_type + '. ' + address.flat;
						}
						$("input[name=\'address_1\']").val(address_1);

						var region;
						if(address.region != null && address.region_type != null) {
							region = address.region + ',' + address.region_type;
							$("select[name=\'zone_id\'] option").each(function(){
								if(this.text == region) { 
									$("select[name=\'zone_id\']").find("option:contains('" + region + "')").attr("selected", "selected");
								}
							});
						}

					}
				}
				
			});
		});
	}
};