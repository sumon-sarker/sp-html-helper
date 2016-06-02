(function(){
	
	this.SpHtmlHelper = function(options){	/*Constructor*/

		this.app_configs 		= {	/*App config*/
			debugMode 	: false,
			domainName 	: window.location.origin,
			screenSize 	: 768
		};

		this.multi_menu_configs	= {	/*Multimenu config*/
			multiSiteMenu	: false,
			languageString 	: ''
		};

		this.app_configs = this.getDefaultOptions(this.app_configs,options);

		this.displayLog("SpHtmlHelper Constructor Started!","font-size:20px");
		this.displayLog(this.app_configs);
	};

	SpHtmlHelper.prototype.menu = function(options) {
		var defaultOptions = {
			containerId 	: 'SpHtmlHelper',
			containerClass 	: 'SpHtmlHelper',
			menuPosition 	: 0,	/*0,1,2,3,4,5,6,N*/
			menuItems 		: [
				{
					title 		: 'SpHtmlHelper',
					link 		: '#',
					css_class 	: 'active'
				}
			]
		};
		options = this.getDefaultOptions(defaultOptions,options);

		this.displayLog("SpHtmlHelper Menu Started!","font-size:20px");
		this.displayLog(options);
		
		this.makeSpMenu(options);
	};

	SpHtmlHelper.prototype.getObjById = function(ID) {
		return document.getElementById(ID);
	};

	SpHtmlHelper.prototype.displayLog = function(message,css='font-size:10px;color:green'){
		if(this.app_configs.debugMode){
			console.log("%c%o",css,message);
		}
	};

	SpHtmlHelper.prototype.getDefaultOptions = function(defaultOptions,options){
		var property;
		for(property in options){
			if (options.hasOwnProperty(property)) {
				defaultOptions[property] = options[property];
			}
		}
		return defaultOptions;
	};

	SpHtmlHelper.prototype.addMultiSiteMenu = function(options){
		this.multi_menu_configs = this.getDefaultOptions(this.multi_menu_configs,options);
	};

	SpHtmlHelper.prototype.makeSpMenu = function(options){
		var items 		= options.menuItems;
		var template	= '';
		template = '<div class="SpHtmlHelperMenuContainer">\n';
			template+= '\t<div class="SpHtmlHelperMenuHeader">\n';
				template+='\t\t<div class="SpHtmlHelperMenuSiteLogo">\n';
					template+='\t\t\t<img src="{SITE_LOGO}" alt="Sp Html Helper">\n';
				template+='\t\t</div>\n';
				template+='\t\t<div class="SpHtmlHelperMenuBrand">\n';
					template+='\t\t\t<span></span>\n';
					template+='\t\t\t<span></span>\n';
					template+='\t\t\t<span></span>\n';
				template+='\t\t</div>\n';
			template+='\t</div>\n';
			template+='\t<ul class="SpHtmlHelperMenuItems">\n';
				for(var item in items){
					template+='\t\t<li><a href="'+items[item].link+'">'+items[item].title+'</a></li>\n';
				}
			template+='\t</ul>\n';
		template+='</div>\n';
		this.displayLog(template);

		var container = this.getObjById(options.containerId);
		if (container) {

		}else{
			this.displayLog('SpHtmlHelper menu containerId:"'+options.containerId+'" not found!','color:red;font-size:15px');
		}
	}

}());