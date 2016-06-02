var SP = new SpHtmlHelper({
	debugMode 	: true,
	screenSize 	: 750,
	domainName 	: 'www.sumonsarker.com'
});

SP.menuConfig({
	multiSiteMenu	: false,
	languageString 	: '/en/'
});

SP.addMenu({
	/*
		CSS Selector
		Example:
		1. "body" 				[TagName]
		2. ".any-class" 		[ClassName]
		3. "#any-id" 			[ID]
		4. "#any-id > div" 		[H]
	*/
	targetContainer : '#SpHtmlHelperMenu',
	menuPosition 	: 0,
	menuItems 		: [
		{
			title 		: 'SpHtmlHelper1',
			link 		: '#1',
			css_class 	: 'first'
		},
		{
			title 		: 'SpHtmlHelper2',
			link 		: '#2',
			css_class 	: 'last'
		},
	]
});

SP.debug();