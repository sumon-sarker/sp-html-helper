(function(){
	/*Constructor*/
	this.SpHtmlHelper = function(options){
		/*App config*/
		this.app_configs 		= {
			debugMode 	: false,
			domainName 	: window.location.origin,
			screenSize 	: 768,
			countMenu 	: 0
		};
		/*Multimenu config*/
		this.multi_menu_configs	= {
			multiSiteMenu	: false,
			languageString 	: ''
		};
		/*Remove inline CSS config*/
		this.inline_css_configs = {
			removeAll 			: false,
			targetTag 		: '#SpHtmlHelperMenu',
			targetCSS 		: 'width,height'
		};
		/*Add tag class config*/
		this.add_tag_class_configs = {
			targetAll 		: true,
			targetTag 		: '#SpHtmlHelperMenu',
			className 		: 'helloDolly'
		};
		/*Store debug logs*/
		this.debug_logs 		= Array();
		this.app_configs = this.getDefaultOptions(this.app_configs,options);
		this.keepDebugLog("SpHtmlHelper App configuration!","font-size:15px");
		this.keepDebugLog(this.app_configs);
	};

	SpHtmlHelper.prototype.addMenu = function(options) {
		var defaultOptions = {
			menuLogo 		: 'sp-html-helper.png',
			targetContainer	: '#SpHtmlHelper',
			/*0,1,2,3,4,5,6,N*/
			menuPosition 	: 0,
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

	SpHtmlHelper.prototype.removeInlineCss = function(options){
		this.inline_css_configs = this.getDefaultOptions(this.inline_css_configs,options);
		var isExists = this.getSingleObj(this.inline_css_configs.targetTag);
		this.keepDebugLog("SpHtmlHelper RemoveInlineCSS configuration!","font-size:15px");
		this.keepDebugLog(this.inline_css_configs);
		if (isExists) {
			isExists.style = '';
			if (this.inline_css_configs.removeAll) {
				var properties 	= this.inline_css_configs.targetCSS.split(',');
				var property;
				for(property in properties){
					/*Remove individual inline CSS*/
					isExists.style[properties[property]] = '';
				}
			}else{
				/*Remove all inline CSS*/
				isExists.style = '';
			}
		}else{
			this.keepDebugLog('WARNING : RemoveInlineCSS {targetTag:"'+this.inline_css_configs.targetTag+'"} not found!','color:red;font-size:12px');
		}
	}

	SpHtmlHelper.prototype.addTagClass = function(options){
		this.add_tag_class_configs = this.getDefaultOptions(this.add_tag_class_configs,options);
		this.keepDebugLog("SpHtmlHelper AddTagClass configuration!","font-size:15px");
		this.keepDebugLog(this.add_tag_class_configs);
		//this.keepDebugLog('WARNING : AddTagClass {targetTag:"'+this.add_tag_class_configs.targetTag+'"} not found!','color:red;font-size:12px');
	};

	SpHtmlHelper.prototype.getSingleObj = function(SELECTOR) {
		return document.querySelector(SELECTOR);
	};

	SpHtmlHelper.prototype.getMultipleObj = function(SELECTOR) {
		return document.querySelectorAll(SELECTOR);
	};

	SpHtmlHelper.prototype.createTag = function(TAG) {
		return document.createElement(TAG);
	};

	SpHtmlHelper.prototype.keepDebugLog = function(message,css='font-size:10px;color:green'){
		if(this.app_configs.debugMode){
			this.debug_logs.push({css:css,message:message});
		}
	};

	SpHtmlHelper.prototype.getUrl = function(){
		return window.location.href;
	}

	SpHtmlHelper.prototype.getMatch = function(string){
		var url = this.getUrl().lastIndexOf(string);
		if(url>=0){
			return true;
		}
		return false;
	}

	SpHtmlHelper.prototype.checkMultiMenu = function(){
		if (this.multi_menu_configs.multiSiteMenu) {
			return this.getMatch(this.multi_menu_configs.languageString);
		}
		return false;
	}

	SpHtmlHelper.prototype.setMenuBrandControl = function(wrapperID,clickID){
		var wrapper = this.getSingleObj('#'+wrapperID);
		var click 	= this.getSingleObj('#'+clickID);
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
		/*Check Multimenu*/
		if(this.multi_menu_configs.multiSiteMenu){
			if (!this.checkMultiMenu()) {
				this.keepDebugLog('WARNING : MultiSiteMenu {languageString:"'+this.multi_menu_configs.languageString+'"} not found! MultiSiteMenu adding failed!','color:red;font-size:12px');
				return false;
			};
		};
		var menuLogo 	= options.menuLogo;
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
					template+='\t\t\t<img src="'+menuLogo+'" alt="MENU">\n';
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
		var container = this.getSingleObj(options.targetContainer);
		if (container) {
			var child = container.childNodes.length;
			if (child) {
				if (child<options.menuPosition){
					container.insertBefore(newNode,container.childNodes[options.menuPosition]);
				}else{
					container.insertBefore(newNode,container.firstChild);
					this.keepDebugLog('WARNING : SpHtmlHelper menu {menuPosition:"'+options.menuPosition+'"} not found! Menu added as firstChild','color:green;font-size:12px');
				}
			}else{
				container.insertBefore(newNode,container.firstChild);
				this.keepDebugLog('WARNING : SpHtmlHelper menu {menuPosition:"'+options.menuPosition+'"} not found! Menu added as firstChild','color:green;font-size:12px');
			}
			this.setMenuBrandControl(wrapperID,clickID);
		}else{
			this.keepDebugLog('WARNING: SpHtmlHelper menu {targetContainer:"'+options.targetContainer+'"} not found!','color:red;font-size:15px');
		}
	}
}());