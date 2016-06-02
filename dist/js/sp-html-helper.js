(function(){
	
	this.SpHtmlHelper = function(options){	/*Constructor*/
		this.displayLog("SpHtmlHelper Constructor Started!","font-size:20px");
		this.APP 			= null;
		var defaultOptions 	= {
			domainName : window.location.origin,
			screenSize : 768,
		};
		this.APP = this.getDefaultOptions(defaultOptions,options);
		this.displayLog(this.APP);
	};

	SpHtmlHelper.prototype.menu = function(options) {
		this.displayLog("SpHtmlHelper Menu Started!","font-size:20px");
		var defaultOptions = {
			multiSiteMenu 	: false,
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
		this.displayLog(options);


		this.makeSpMenu(options);
	};

	SpHtmlHelper.prototype.displayLog = function(message,css='font-size:10px;color:green'){
		console.log("%c%o",css,message);
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

	SpHtmlHelper.prototype.makeSpMenu = function(options){
		var items 		= options.menuItems;
		var template	= '';
		template = '<div class="SpHtmlHelperMenuContainer">';
			template+= '<div class="SpHtmlHelperMenuHeader">';
				template+='<div class="SpHtmlHelperMenuSiteLogo">';
					template+='<img src="{SITE_LOGO}" alt="Sp Html Helper">';
				template+='</div>';
				template+='<div class="SpHtmlHelperMenuBrand">';
					template+='<span></span>';
					template+='<span></span>';
					template+='<span></span>';
				template+='</div>';
				template+='</div>';
			template+='<ul class="SpHtmlHelperMenuItems">';
				for(var item in items){
					template+='<li><a href="'+items[item].link+'">'+items[item].title+'</a></li>';
				}
				template+='<li><a href="#">ITEM 2</a></li>';
			template+='</ul>';
		template+='</div>';
	}

}());