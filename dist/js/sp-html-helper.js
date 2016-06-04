(function(){
	/*Constructor*/
	this.SpHtmlHelper = function(options){
		/*App config*/
		this.app_configs 		= {
			debugMode 	: false,
			screenSize 	: 768,
			totalMenus 	: 0,
			workStatus 	: false,
			isWarning 	: false
		};
		/*Multimenu config*/
		this.multi_menu_configs	= {
			multiSiteMenu	: false,
			languageString 	: '',
			copyTargetMenu 	: {
				copy 		: false,
				targetTag 	: "CSS-SELECTOR"
			}
		};
		/*Remove inline CSS config*/
		this.inline_css_configs = {
			removeAll 		: false,
			targetTag 		: 'CSS-SELECTOR',
			targetCSS 		: 'PROPERTIES-BY-COMMA'	/*width,height,font-size,...*/
		};
		/*Add tag class config*/
		this.add_tag_class_configs = {
			targetAll 		: false,
			targetTag 		: 'CSS-SELECTOR',
			className 		: 'CLASS-NAME'
		};
		/*Remove tag class config*/
		this.remove_tag_class_configs = {
			targetAll 		: false,
			targetTag 		: 'CSS-SELECTOR',
			className 		: 'CLASS-NAME'
		};
		/*Copy paste configs*/
		this.copy_paste_configs = {
			copyTarget 		: 'CSS-SELECTOR',
			pasteTarget 	: 'CSS-SELECTOR',
			pasteTagClass 	: 'SpHtmlHelperCopyPaste'
		};
		/*Getting started*/
		this.app_configs 	= this.get_default_options(this.app_configs,options);
		if (window.innerWidth<=this.app_configs.screenSize) {
			this.app_configs.workStatus = true;
		};
		/*Store debug logs*/
		this.debug_logs 	= Array();
		this.keep_debug_log("SpHtmlHelper App configuration!","font-size:15px");
		this.keep_debug_log(this.app_configs);
	};

	SpHtmlHelper.prototype.MenuConfig = function(options){
		if (this.app_configs.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.multi_menu_configs = this.get_default_options(this.multi_menu_configs,options);
		this.keep_debug_log("SpHtmlHelper MultiSiteMenu configuration!","font-size:15px");
		this.keep_debug_log(this.multi_menu_configs);
	};

	SpHtmlHelper.prototype.AddMenu = function(options) {
		if (this.app_configs.workStatus==false) {
			this.application_warning();
			return false;
		};
		var defaultOptions = {
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
		options = this.get_default_options(defaultOptions,options);
		this.keep_debug_log("SpHtmlHelper Menu configuration","font-size:15px");
		this.keep_debug_log(options);
		this.make_sp_menu(options);
	};

	SpHtmlHelper.prototype.AddClass = function(options){
		if (this.app_configs.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.add_tag_class_configs = this.get_default_options(this.add_tag_class_configs,options);
		options = this.add_tag_class_configs;
		var objects,object;
		this.keep_debug_log("SpHtmlHelper AddClass configuration!","font-size:15px");
		this.keep_debug_log(options);
		if (options.targetAll){
			objects = this.get_multiple_obj(options.targetTag);
			if(objects.length){
				for(object in objects){
					this.add_class_to_tag(objects[object],options.className);
				}
			}else{
				this.keep_debug_log('WARNING : AddClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
			}
		}else{
			objects = this.get_single_obj(options.targetTag);
			if(objects){
				this.add_class_to_tag(objects,options.className);
			}else{
				this.keep_debug_log('WARNING : AddClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
			}
		}
	};

	SpHtmlHelper.prototype.RemoveClass = function(options){
		if (this.app_configs.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.remove_tag_class_configs = this.get_default_options(this.remove_tag_class_configs,options);
		options = this.remove_tag_class_configs;
		var objects,object;
		this.keep_debug_log("SpHtmlHelper RemoveClass configuration!","font-size:15px");
		this.keep_debug_log(options);
		if (options.targetAll){
			objects = this.get_multiple_obj(options.targetTag);
			if(objects.length){
				for(object in objects){
					this.remove_class_to_tag(objects[object],options.className);
				}
			}else{
				this.keep_debug_log('WARNING : RemoveClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
			}
		}else{
			objects = this.get_single_obj(options.targetTag);
			if(objects){
				this.remove_class_to_tag(objects,options.className);
			}else{
				this.keep_debug_log('WARNING : RemoveClass {targetTag:"'+options.targetTag+'"} not found!','color:red;font-size:12px');
			}
		}
	};

	SpHtmlHelper.prototype.RemoveInlineCss = function(options){
		if (this.app_configs.workStatus==false) {
			this.application_warning();
			return false;
		};
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

	SpHtmlHelper.prototype.CopyPaste = function(options){
		if (this.app_configs.workStatus==false) {
			this.application_warning();
			return false;
		};
		this.copy_paste_configs = this.get_default_options(this.copy_paste_configs,options);
		options = this.copy_paste_configs;
		this.keep_debug_log("SpHtmlHelper CopyPaste configuration!","font-size:15px");
		this.keep_debug_log(this.copy_paste_configs);
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

	SpHtmlHelper.prototype.application_warning = function(){
		if (this.app_configs.isWarning) {
			return false;
		};
		this.app_configs.isWarning = true;
		this.keep_debug_log("SpHtmlHelper actions are disabled! Required maximum ScreenSize "+this.app_configs.screenSize,"color:red;font-size:15px");
	}

	SpHtmlHelper.prototype.make_sp_menu = function(options){
		/*Check Multimenu*/
		var mMenu = this.multi_menu_configs;
		if(mMenu.multiSiteMenu){
			if (!this.check_multi_menu()) {
				this.keep_debug_log('WARNING : MultiSiteMenu {languageString:"'+mMenu.languageString+'"} not found! MultiSiteMenu adding failed!','color:red;font-size:12px');
				return false;
			};
		};
		var menuLogo 	= options.menuLogo;
		var items 		= options.menuItems;
		var uniqueID 	= this.app_configs.totalMenus;
		var newNode 	= this.create_tag('div');
		var wrapperID 	= 'SpHtmlHelperMenuWrapper'
		var clickID 	= 'SpHtmlHelperCtrl';
		++uniqueID;
		this.app_configs.totalMenus = uniqueID;
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

			if (mMenu.copyTargetMenu.copy){
				var contents = this.get_single_obj(mMenu.copyTargetMenu.targetTag);
				if(contents){
					template+='\t<div class="SpHtmlHelperMenuItems">\n';
					template+=contents.outerHTML;
					template+='\t</div>\n';
				}else{
					this.keep_debug_log('WARNING : SpHtmlHelper menu {copyTargetMenu.targetTag:"'+mMenu.copyTargetMenu.targetTag+'"} not found! Copy failed!','color:red;font-size:12px');
				}
			}else{
				template+='\t<ul class="SpHtmlHelperMenuItems">\n';
					for(var item in items){
						template+='\t\t<li><a href="'+items[item].link+'">'+items[item].title+'</a></li>\n';
					}
				template+='\t</ul>\n';
			}
		template+='</div>\n';
		newNode.innerHTML = template;
		var container = this.get_single_obj(options.targetContainer);
		if (container) {
			container.insertBefore(newNode,container.firstChild);
			this.set_menu_brand_control(wrapperID,clickID);
		}else{
			this.keep_debug_log('WARNING: SpHtmlHelper menu {targetContainer:"'+options.targetContainer+'"} not found!','color:red;font-size:15px');
		}
	}
}());