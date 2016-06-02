var SP = new SpHtmlHelper({
	debugMode 	: true,
	screenSize 	: 750,
	domainName 	: 'www.sumonsarker.com'
});

SP.addMultiSiteMenu({
	multiSiteMenu 	: {
		multiSiteMenu	: false,
		languageString 	: '/en/'
	}
});

SP.menu({
	containerId 	: 'SpHtmlHelperMenus',
	containerClass 	: '',
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