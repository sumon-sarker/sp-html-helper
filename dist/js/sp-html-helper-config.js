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
	menuLogo 		: 'dist/img/sp-html-helper.png',
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