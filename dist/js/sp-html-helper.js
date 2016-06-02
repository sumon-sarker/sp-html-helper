(function(){
	
	this.SpHtmlHelper = function(options){	/*Constructor*/

		this.app_configs 		= {	/*App config*/
			debugMode 	: false,
			domainName 	: window.location.origin,
			screenSize 	: 768,
			countMenu 	: 0
		};

		this.multi_menu_configs	= {	/*Multimenu config*/
			multiSiteMenu	: false,
			languageString 	: ''
		};

		this.debug_logs 		= Array();	/*Store logs*/

		this.app_configs = this.getDefaultOptions(this.app_configs,options);

		this.keepDebugLog("SpHtmlHelper App configuration!","font-size:15px");
		this.keepDebugLog(this.app_configs);
	};

	SpHtmlHelper.prototype.addMenu = function(options) {
		var defaultOptions = {
			targetContainer	: '#SpHtmlHelper', 	/*First Priority [CSS Selector]*/
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

		this.keepDebugLog("SpHtmlHelper Menu configuration","font-size:15px");
		this.keepDebugLog(options);
		this.makeSpMenu(options);
	};

	SpHtmlHelper.prototype.getObjByCssSelector = function(ID) {
		return document.querySelector(ID);
	};

	SpHtmlHelper.prototype.createTag = function(TAG) {
		return document.createElement(TAG);
	};

	SpHtmlHelper.prototype.keepDebugLog = function(message,css='font-size:10px;color:green'){
		if(this.app_configs.debugMode){
			this.debug_logs.push({css:css,message:message});
		}
	};

	SpHtmlHelper.prototype.setMenuBrandControl = function(wrapperID,clickID){
		var wrapper = this.getObjByCssSelector('#'+wrapperID);
		var click 	= this.getObjByCssSelector('#'+clickID);

		click.onclick = function(){
			if (wrapper.className=='expanded') {
				wrapper.className = '';
			}else{
				wrapper.className = 'expanded';
			}
		}
	}

	SpHtmlHelper.prototype.debug = function(){
		var logs = this.debug_logs;
		var log;
		if (logs.length) {
			for(log in logs){
				console.log("%c%o",logs[log].css,logs[log].message);
			}
		};
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

	SpHtmlHelper.prototype.menuConfig = function(options){
		this.multi_menu_configs = this.getDefaultOptions(this.multi_menu_configs,options);
		this.keepDebugLog("SpHtmlHelper MultiSiteMenu configuration!","font-size:15px");
		this.keepDebugLog(this.multi_menu_configs);
	};

	SpHtmlHelper.prototype.makeSpMenu = function(options){
		var items 		= options.menuItems;
		var uniqueID 	= this.app_configs.countMenu;
		var newNode 	= this.createTag('div');
		var wrapperID 	= 'SpHtmlHelperMenuWrapper'
		var clickID 	= 'SpHtmlHelperCtrl';

		++uniqueID;
		this.app_configs.countMenu = uniqueID;
		wrapperID 		= wrapperID+uniqueID;
		clickID 		= clickID+uniqueID;
		
		newNode.id 		= wrapperID;
		
		var template	= '';
		template = '<div class="SpHtmlHelperMenuContainer">\n';
			template+= '\t<div class="SpHtmlHelperMenuHeader">\n';
				template+='\t\t<div class="SpHtmlHelperMenuSiteLogo">\n';
					template+='\t\t\t<img src="{SITE_LOGO}" alt="Sp Html Helper">\n';
				template+='\t\t</div>\n';
				template+='\t\t<div class="SpHtmlHelperMenuBrand" id="'+clickID+'">\n';
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

		newNode.innerHTML = template;

		var container = this.getObjByCssSelector(options.targetContainer);
		if (container) {
			var child = container.childNodes.length;
			if (child) {
				if (child<options.menuPosition){
					container.insertBefore(newNode,container.childNodes[options.menuPosition]);
				}else{
					container.insertBefore(newNode,container.firstChild);
					this.keepDebugLog('WORNING : SpHtmlHelper menu {menuPosition:"'+options.menuPosition+'"} not found! Menu added as firstChild','color:green;font-size:12px');
				}
			}else{
				container.insertBefore(newNode,container.firstChild);
				this.keepDebugLog('WORNING : SpHtmlHelper menu {menuPosition:"'+options.menuPosition+'"} not found! Menu added as firstChild','color:green;font-size:12px');
			}
			this.setMenuBrandControl(wrapperID,clickID);
		}else{
			this.keepDebugLog('SpHtmlHelper menu {targetContainer:"'+options.targetContainer+'"} not found!','color:red;font-size:15px');
		}
	}

}());