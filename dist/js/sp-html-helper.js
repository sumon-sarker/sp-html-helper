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
			removeAll 		: false,
			targetTag 		: 'CSS-SELECTOR',
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
		this.app_configs = this.get_default_options(this.app_configs,options);
		this.keep_debug_log("SpHtmlHelper App configuration!","font-size:15px");
		this.keep_debug_log(this.app_configs);
	};

	SpHtmlHelper.prototype.MenuConfig = function(options){
		this.multi_menu_configs = this.get_default_options(this.multi_menu_configs,options);
		this.keep_debug_log("SpHtmlHelper MultiSiteMenu configuration!","font-size:15px");
		this.keep_debug_log(this.multi_menu_configs);
	};

	SpHtmlHelper.prototype.AddMenu = function(options) {
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
		options = this.get_default_options(defaultOptions,options);
		this.keep_debug_log("SpHtmlHelper Menu configuration","font-size:15px");
		this.keep_debug_log(options);
		this.make_sp_menu(options);
	};

	SpHtmlHelper.prototype.AddTagClass = function(options){
		this.add_tag_class_configs = this.get_default_options(this.add_tag_class_configs,options);
		options = this.add_tag_class_configs;
		var objects,object;
		this.keep_debug_log("SpHtmlHelper AddTagClass configuration!","font-size:15px");
		this.keep_debug_log(options);
		if (options.targetAll){
			objects = this.get_multiple_obj(options.targetTag);
			if(objects.length){
				for(object in objects){
					this.add_class_to_tag(objects[object],options.className);
				}
			}else{
				this.keep_debug_log('WARNING : AddTagClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
			}
		}else{
			objects = this.get_single_obj(options.targetTag);
			if(objects){
				this.add_class_to_tag(objects,options.className);
			}else{
				this.keep_debug_log('WARNING : AddTagClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
			}
		}
	};

	SpHtmlHelper.prototype.RemoveInlineCss = function(options){
		this.inline_css_configs = this.get_default_options(this.inline_css_configs,options);
		var isExists = this.get_single_obj(this.inline_css_configs.targetTag);
		this.keep_debug_log("SpHtmlHelper RemoveInlineCSS configuration!","font-size:15px");
		this.keep_debug_log(this.inline_css_configs);
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
			this.keep_debug_log('WARNING : RemoveInlineCSS {targetTag:"'+this.inline_css_configs.targetTag+'"} not found!','color:red;font-size:12px');
		}
	}

	SpHtmlHelper.prototype.add_class_to_tag = function(obj,cls){
		var existingClass = obj.className;
		var str = '';
		if (existingClass) {
			str = existingClass+' '+cls;
			obj.className = str;
		}else{
			obj.className = cls;
		}
	};

	SpHtmlHelper.prototype.get_single_obj = function(SELECTOR) {
		return document.querySelector(SELECTOR);
	};

	SpHtmlHelper.prototype.get_multiple_obj = function(SELECTOR) {
		return document.querySelectorAll(SELECTOR);
	};

	SpHtmlHelper.prototype.create_tag = function(TAG) {
		return document.createElement(TAG);
	};

	SpHtmlHelper.prototype.keep_debug_log = function(message,css='font-size:10px;color:green'){
		if(this.app_configs.debugMode){
			this.debug_logs.push({css:css,message:message});
		}
	};

	SpHtmlHelper.prototype.get_url = function(){
		return window.location.href;
	}

	SpHtmlHelper.prototype.get_match = function(string){
		var url = this.get_url().lastIndexOf(string);
		if(url>=0){
			return true;
		}
		return false;
	}

	SpHtmlHelper.prototype.check_multi_menu = function(){
		if (this.multi_menu_configs.multiSiteMenu) {
			return this.get_match(this.multi_menu_configs.languageString);
		}
		return false;
	}

	SpHtmlHelper.prototype.set_menu_brand_control = function(wrapperID,clickID){
		var wrapper = this.get_single_obj('#'+wrapperID);
		var click 	= this.get_single_obj('#'+clickID);
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

	SpHtmlHelper.prototype.get_default_options = function(defaultOptions,options){
		var property;
		for(property in options){
			if (options.hasOwnProperty(property)) {
				defaultOptions[property] = options[property];
			}
		}
		return defaultOptions;
	};

	SpHtmlHelper.prototype.make_sp_menu = function(options){
		/*Check Multimenu*/
		if(this.multi_menu_configs.multiSiteMenu){
			if (!this.check_multi_menu()) {
				this.keep_debug_log('WARNING : MultiSiteMenu {languageString:"'+this.multi_menu_configs.languageString+'"} not found! MultiSiteMenu adding failed!','color:red;font-size:12px');
				return false;
			};
		};
		var menuLogo 	= options.menuLogo;
		var items 		= options.menuItems;
		var uniqueID 	= this.app_configs.countMenu;
		var newNode 	= this.create_tag('div');
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
		var container = this.get_single_obj(options.targetContainer);
		if (container) {
			var child = container.childNodes.length;
			if (child) {
				if (child<options.menuPosition){
					container.insertBefore(newNode,container.childNodes[options.menuPosition]);
				}else{
					container.insertBefore(newNode,container.firstChild);
					this.keep_debug_log('WARNING : SpHtmlHelper menu {menuPosition:"'+options.menuPosition+'"} not found! Menu added as firstChild','color:green;font-size:12px');
				}
			}else{
				container.insertBefore(newNode,container.firstChild);
				this.keep_debug_log('WARNING : SpHtmlHelper menu {menuPosition:"'+options.menuPosition+'"} not found! Menu added as firstChild','color:green;font-size:12px');
			}
			this.set_menu_brand_control(wrapperID,clickID);
		}else{
			this.keep_debug_log('WARNING: SpHtmlHelper menu {targetContainer:"'+options.targetContainer+'"} not found!','color:red;font-size:15px');
		}
	}
}());