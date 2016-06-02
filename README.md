##SpHtmlHelper
SpHtmlHelper is a custom JavaScript helper for existing non-responsive websites.
####Basic HTML codes
```javascript
<!DOCTYPE html>
<html>
<head>
	<title>SP HTML Helper</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="dist/css/sp-html-helper.css">
</head>
<body>
	<div id="SpHtmlHelperMenu"></div>
	<script type="text/javascript" src="dist/js/sp-html-helper.js"></script>
	<script type="text/javascript" src="dist/js/sp-html-helper-config.js"></script>
</body>
</html>
```
####SpHtmlHelper Initializer
```javascript
var SP = new SpHtmlHelper({
	debugMode 	: true, /*To disable console debugging set "false"*/
	screenSize 	: 768,
	domainName 	: 'http://www.sumonsarker.com'
});
```
####Add Menu
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
####Display Debug Log
```javascript
SP.debug();
```
