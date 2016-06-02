# SpHtmlHelper
SpHtmlHelper is a custom JavaScript helper for existing non-responsive websites.
###SpHtmlHelper Initializer
```javascript
var SP = new SpHtmlHelper({
	debugMode 	: true, /*To disable console debugging set "false"*/
	screenSize 	: 768,
	domainName 	: 'http://www.sumonsarker.com'
});
```
###Add Menu
```javascript
SP.addMenu({
	/*
		CSS Selector for "targetContainer"
		======================================
		Example:
		1. "body" 				[TagName]
		2. ".any-class" 		[ClassName]
		3. "#any-id" 			[ID]
		4. "#any-id > div" 		[Parent-Child]
		5. "rest of CSS selectors"
	*/
	targetContainer : '#DEMO-ID',
	menuPosition 	: 0,
	menuItems 		: [
		{
			title 		: 'ITEM 1',
			link 		: '#',
			css_class 	: ''
		},
		{
			title 		: 'ITEM 2',
			link 		: '#',
			css_class 	: ''
		},
	]
});
```
###Display Debug Log
```javascript
SP.debug();
```