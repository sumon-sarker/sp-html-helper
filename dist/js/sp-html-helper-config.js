var SP = new SpHtmlHelper({
	screenSize : 750,
	domainName : 'www.sumonsarker.com'
});

SP.menu({
	containerId 	: 'SpHtmlHelper',
	containerClass 	: 'SpHtmlHelper',
	menuPosition 	: 0,
	menuItems 		: [
		{
			item 		: 'SpHtmlHelper1',
			link 		: '#',
			css_class 	: 'first'
		},
		{
			item 		: 'SpHtmlHelper2',
			link 		: '#',
			css_class 	: 'last'
		},
	]
});