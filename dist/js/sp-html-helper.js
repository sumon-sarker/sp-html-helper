/*
* Plugin Name 	: SpHtmlHelper
* Developer 	: Sumon Sarker
* Version 	: 1.0
* Website 	: http://www.sumonsarker.com
*/
(function(){
	this.SpHtmlHelper = function(options){
		this.plugin_config 		= {
			debugMode 	: false,
			screenSize 	: 768,
			totalMenus 	: 0,
			workStatus 	: false,
			isWarning 	: false
		};
		this.menu_config	= {
			multiSiteMenu	: false,
			languageString 	: '',
			copyTargetMenu 	: {
				copy 		: false,
				targetTag 	: "CSS-SELECTOR"
			}
		};
		this.add_menu_config = {
			menuLogo 		: 'sp-html-helper.png',
			targetContainer	: '#SpHtmlHelper',
			menuItems 		: [
				{
					title 		: 'SpHtmlHelper',
					link 		: '#',
					css_class 	: 'active'
				}
			]
		};
		this.remove_inline_css_config = {
			urlMatch 		: false, /*Or URL string. Ex: '/bn/'*/
			targetTag 		: 'CSS-SELECTOR',
			targetCSS 		: '*'	/*'*' Or width,height,......*/
		};
		this.add_class_config = {
			urlMatch 		: false, /*Or URL string. Ex: '/bn/'*/
			targetTag 		: 'CSS-SELECTOR',
			className 		: 'CLASS-NAME'
		};
		this.remove_class_config = {
			urlMatch 		: false, /*Or URL string. Ex: '/bn/'*/
			targetTag 		: 'CSS-SELECTOR',
			className 		: 'CLASS-NAME'
		};
		this.copy_paste_config = {
			urlMatch 		: false,
			copyTarget 		: 'CSS-SELECTOR',
			pasteTarget 	: 'CSS-SELECTOR',
			pasteTagClass 	: 'SpHtmlHelperCopyPaste'
		};
		/*Getting started*/
		this.plugin_config 	= this.get_default_options(this.plugin_config,options);
		if (window.innerWidth<=this.plugin_config.screenSize) {
			this.plugin_config.workStatus = true;
		};
		/*Store debug logs*/
		this.debug_logs 	= Array();
		this.keep_debug_log("SpHtmlHelper App Configuration!","font-size:15px;color:green");
		this.keep_debug_log(this.plugin_config);
	};

	SpHtmlHelper.prototype.MenuConfig = function(options){
		if (this.plugin_config.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.menu_config = this.get_default_options(this.menu_config,options);
		this.keep_debug_log("SpHtmlHelper MenuConfig Configuration!","font-size:15px;color:green");
		this.keep_debug_log(this.menu_config);
	};

	SpHtmlHelper.prototype.AddMenu = function(options) {
		if (this.plugin_config.workStatus==false) {
			this.application_warning();
			return false;
		};
		
		this.add_menu_config = this.get_default_options(this.add_menu_config,options);
		options = this.add_menu_config;
		this.keep_debug_log("SpHtmlHelper AddMenu Configuration","font-size:15px;color:green");
		this.keep_debug_log(options);
		this.make_sp_menu(options);
	};

	SpHtmlHelper.prototype.AddClass = function(options){
		if (this.plugin_config.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.add_class_config = this.get_default_options(this.add_class_config,options);
		options = this.add_class_config;
		var objects,object;
		this.keep_debug_log("SpHtmlHelper AddClass Configuration!","font-size:15px;color:green");
		this.keep_debug_log(options);
		if (options.urlMatch) {
			if(!this.get_match(options.urlMatch)){
				this.keep_debug_log('WARNING : AddClass {urlMatch:"'+options.urlMatch+'"} not match with current url!','color:red;font-size:12px');
				return false;
			};
		};
		objects = this.get_multiple_obj(options.targetTag);
		if(objects.length){
			for(object in objects){
				this.add_class_to_tag(objects[object],options.className);
			}
		}else{
			this.keep_debug_log('WARNING : AddClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
		}
	};

	SpHtmlHelper.prototype.RemoveClass = function(options){
		if (this.plugin_config.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.remove_class_config = this.get_default_options(this.remove_class_config,options);
		options = this.remove_class_config;
		var objects,object;
		this.keep_debug_log("SpHtmlHelper RemoveClass Configuration!","font-size:15px;color:green");
		this.keep_debug_log(options);
		if (options.urlMatch) {
			if(!this.get_match(options.urlMatch)){
				this.keep_debug_log('WARNING : RemoveClass {urlMatch:"'+options.urlMatch+'"} not match with current url!','color:red;font-size:12px');
				return false;
			};
		};
		objects = this.get_multiple_obj(options.targetTag);
		if(objects.length){
			for(object in objects){
				this.remove_class_to_tag(objects[object],options.className);
			}
		}else{
			this.keep_debug_log('WARNING : RemoveClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
		}
	};

	SpHtmlHelper.prototype.RemoveInlineCss = function(options){
		if (this.plugin_config.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.remove_inline_css_config = this.get_default_options(this.remove_inline_css_config,options);
		options = this.remove_inline_css_config;
		var isExists = this.get_multiple_obj(options.targetTag);
		this.keep_debug_log("SpHtmlHelper RemoveInlineCSS Configuration!","font-size:15px;color:green");
		this.keep_debug_log(options);
		if (options.urlMatch) {
			if(!this.get_match(options.urlMatch)){
				this.keep_debug_log('WARNING : RemoveInlineCSS {urlMatch:"'+options.urlMatch+'"} not match with current url!','color:red;font-size:12px');
				return false;
			};
		};
		if (isExists.length) {
			var i,property,properties;
			if (options.targetCSS=='*') {
				for(i in isExists){
					isExists[i].style = '';
				}
			}else{
				properties 	= options.targetCSS.split(',');
				for(i=0; i<isExists.length;i++){
					for(property in properties){
						isExists[i].style[properties[property]] = ''; /*Remove individual inline CSS*/
						if(isExists[i].getAttribute(properties[property])){ /*Remove attributes. Ex: width="10px"*/
							isExists[i].removeAttribute(properties[property]);
						}
					}
				}
			}
		}else{
			this.keep_debug_log('WARNING : RemoveInlineCSS {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
		}
	}

	SpHtmlHelper.prototype.CopyPaste = function(options){
		if (this.plugin_config.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.copy_paste_config = this.get_default_options(this.copy_paste_config,options);
		options = this.copy_paste_config;
		this.keep_debug_log("SpHtmlHelper CopyPaste Configuration!","font-size:15px;color:green");
		this.keep_debug_log(options);
		if (options.urlMatch) {
			if(!this.get_match(options.urlMatch)){
				this.keep_debug_log('WARNING : CopyPaste {urlMatch:"'+options.urlMatch+'"} not match with current url!','color:red;font-size:12px');
				return false;
			};
		};
		var copy_target 	= this.get_single_obj(options.copyTarget);
		var paste_target 	= this.get_single_obj(options.pasteTarget);
		if (!copy_target){
			this.keep_debug_log('WARNING : CopyPaste {copyTarget:"'+options.copyTarget+'"} not found!','color:red;font-size:12px');
		}
		if (!paste_target){
			this.keep_debug_log('WARNING : CopyPaste {pasteTarget:"'+options.pasteTarget+'"} not found!','color:red;font-size:12px');
		}
		if (copy_target && paste_target){
			var tagName,newNode;
			tagName = copy_target.nodeName;
			newNode = this.create_tag(tagName);
			newNode.className = options.pasteTagClass;
			newNode.innerHTML = copy_target.innerHTML;
			paste_target.insertBefore(newNode,paste_target.lastChild);
		};
	};

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

	SpHtmlHelper.prototype.remove_class_to_tag = function(obj,cls){
		var existingClass = obj.className;
		var str = '';
		if (existingClass) {
			str =existingClass.replace(cls,'');
			obj.className = str;
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
		if(this.plugin_config.debugMode){
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
		if (this.menu_config.multiSiteMenu) {
			return this.get_match(this.menu_config.languageString);
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

	SpHtmlHelper.prototype.application_warning = function(){
		if (this.plugin_config.isWarning) {
			return false;
		};
		this.plugin_config.isWarning = true;
		this.keep_debug_log("SpHtmlHelper actions are disabled! Required maximum ScreenSize "+this.plugin_config.screenSize,"color:red;font-size:15px");
	}

	SpHtmlHelper.prototype.prepare_sp_menu = function(options){
		var mMenu,menuLogo,item,items,uniqueID,newNode,wrapperID,clickID;
		mMenu 		= this.menu_config;
		menuLogo 	= options.menuLogo;
		items 		= options.menuItems;
		uniqueID 	= this.plugin_config.totalMenus;
		newNode 	= this.create_tag('div');
		wrapperID 	= 'SpHtmlHelperMenuWrapper'
		clickID 	= 'SpHtmlHelperCtrl';
		++uniqueID;
		this.plugin_config.totalMenus = uniqueID;
		wrapperID 		= wrapperID+uniqueID;
		clickID 		= clickID+uniqueID;
		newNode.id 		= wrapperID;
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

			if (mMenu.copyTargetMenu.copy){
				contents = this.get_single_obj(mMenu.copyTargetMenu.targetTag);
				if(contents){
					template+='\t<div class="SpHtmlHelperMenuItems">\n';
					template+=contents.outerHTML;
					template+='\t</div>\n';
				}else{
					this.keep_debug_log('WARNING : SpHtmlHelper menu {copyTargetMenu.targetTag:"'+mMenu.copyTargetMenu.targetTag+'"} not found! Copy failed!','color:red;font-size:12px');
				}
			}else{
				template+='\t<ul class="SpHtmlHelperMenuItems">\n';
					for(item in items){
						template+='\t\t<li><a href="'+items[item].link+'">'+items[item].title+'</a></li>\n';
					}
				template+='\t</ul>\n';
			}
		template+='</div>\n';
		newNode.innerHTML = template;
		return {
			newNode 	: newNode,
			wrapperID 	: wrapperID,
			clickID 	: clickID
		};
	}

	SpHtmlHelper.prototype.make_sp_menu = function(options){
		var mMenu,container,tag,menu_data;
		mMenu = this.menu_config;
		if(mMenu.multiSiteMenu){
			if (!this.check_multi_menu()) {
				this.keep_debug_log('WARNING : MultiSiteMenu {languageString:"'+mMenu.languageString+'"} not found! MultiSiteMenu adding failed!','color:red;font-size:12px');
				return false;
			};
		};
		container = this.get_multiple_obj(options.targetContainer);
		if (container.length) {
			for(tag =0; tag<container.length;tag++){
				menu_data = this.prepare_sp_menu(options);
				container[tag].insertBefore(menu_data.newNode,container[tag].firstChild);
				this.set_menu_brand_control(menu_data.wrapperID,menu_data.clickID);
			}
		}else{
			this.keep_debug_log('WARNING: SpHtmlHelper menu {targetContainer:"'+options.targetContainer+'"} not found!','color:red;font-size:15px');
		}
	}
}());