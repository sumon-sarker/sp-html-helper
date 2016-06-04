var SP = new SpHtmlHelper({
	debugMode 	: true,
	screenSize 	: 2000
});

SP.MenuConfig({
	multiSiteMenu	: false,
	languageString 	: '/en/',
	copyTargetMenu 	: {
		copy 		: true,
		targetTag 	: "ul"
	}
});

SP.AddMenu({
	menuLogo 		: 'dist/img/sp-html-helper.png',
	targetContainer : 'body',
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

SP.AddClass({
	targetAll 		: true,
	targetTag 		: '.SpHtmlHelperMenuItems ul',
	className 		: 'SpHtmlHelperMenuItems'
});

SP.RemoveClass({
	targetAll 		: true,
	targetTag 		: 'p',
	className 		: 'SpHtmlHelperClass'
});

SP.RemoveInlineCss({
	removeAll 		: true,
	targetTag 		: '#SpHtmlHelperMenu',
	targetCSS 		: 'width,height,float'
});

SP.CopyPaste({
	copyTarget 		: 'body ul',
	pasteTarget 	: 'p',
	pasteTagClass 	: 'SpHtmlHelperCopyPaste'
});

SP.debug();