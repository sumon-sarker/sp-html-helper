###SpHtmlHelper
SpHtmlHelper is a custom JavaScript helper for existing non-responsive websites.
#####Features
```javascript
1. Create Smartphone Menu [Single Website]
2. Create Smartphone Menu [Multilingual Website]
3. Add/Remove CSS Class From HTML Target Tag
4. Remove Inline CSS From HTML Target Tag
5. Copy/Move Content To Another Target HTML Tag
6. Console Debugging For Developers
```
#####Basic HTML
```javascript
<!DOCTYPE html>
<html>
<head>
	<title>SP HTML Helper</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="dist/css/sp-html-helper.css">
</head>
<body>
	<h1>Getting Started SpHtmlHelper</h1>
	<script type="text/javascript" src="dist/js/sp-html-helper.js"></script>
	<script type="text/javascript" src="dist/js/sp-html-helper-config.js"></script>
</body>
</html>
```
#####SpHtmlHelper Initializer [Required]
```javascript
var SP = new SpHtmlHelper({
	debugMode 	: false,
	screenSize 	: 768,
	domainName 	: 'http://www.sumonsarker.com'
});
```
#####Menu Configuration [Optional, But Required For Multilingual Menu]
```javascript
SP.MenuConfig({
	multiSiteMenu	: false,
	languageString 	: '/en/'
});
```
#####Adding Menu
```javascript
SP.addMenu({
	targetContainer : 'CSS-SELECTOR',
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
#####Add Custom Class Name To Target HTML Tag
```javascript
SP.AddTagClass({
	targetAll 		: false,
	targetTag 		: 'CSS-SELECTOR',
	className 		: 'YOUR_CLASS_NAME'
});
```
#####Remove Inline CSS From Html Tag
```javascript
SP.RemoveInlineCss({
	removeAll 		: false,
	targetTag 		: 'CSS-SELECTOR',
	targetCSS 		: 'width,height,float'
});
```
#####Developer Console Debugging
```javascript
SP.debug();
```
#####Documentation URL
[SpHtmlHelper Decumentation](http://sumon-sarker.github.io/sp-html-helper)