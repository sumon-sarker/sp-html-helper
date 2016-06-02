var SP = new SpHtmlHelper({
	screenSize : 750,
	domainName : 'www.sumonsarker.com'
});

SP.menu({
	multiSiteMenu 	: {
		multiSiteMenu	: false,
		languageString 	: '/en/'
	},
	containerId 	: 'SpHtmlHelperMenu',
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