(function(){
	
	this.SpHtmlHelper = function(options){	/*Constructor*/
		this.displayLog("SpHtmlHelper is getting Started!","color:green;font-size:20px");
		var defaultOptions = {
			screenSize : 768,
		};
		this.options = this.getDefaultOptions(defaultOptions,options);
	};

	SpHtmlHelper.prototype.menu = function(options) {
		this.displayLog("SpHtmlHelper Menu Started!","color:blue;font-size:20px");
		var defaultOptions = {
			containerId 	: 'SpHtmlHelper',
			containerClass 	: 'SpHtmlHelper',
			menuPosition 	: 0,	/*0,1,2,3,4,5,6,N*/
		};
	};

	SpHtmlHelper.prototype.displayLog = function(message,css='font-size:10px;color:#3cf'){
		console.log("%c%o",css,message);
	};

	SpHtmlHelper.prototype.getDefaultOptions = function(defaultOptions,options){
		var property;
		for(property in options){
			if (options.hasOwnProperty(property)) {
				defaultOptions[property] = options[property];
			}
		}
		this.displayLog(defaultOptions);
	};

}());