###SpHtmlHelper
SpHtmlHelper is a custom JavaScript helper for existing non-responsive websites.
#####Basic HTML codes
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
#####SpHtmlHelper Initializer
```javascript
var SP = new SpHtmlHelper({
	debugMode 	: true,
	screenSize 	: 768,
	domainName 	: 'http://www.sumonsarker.com'
});
```
#####Adding SP Menu
```javascript
SP.addMenu({
	targetContainer : 'CSS SELECTOR',
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
#####Developer Console Debugging
```javascript
SP.debug();
```