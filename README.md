###SpHtmlHelper (Version-1.0)
SpHtmlHelper is a custom JavaScript helper for existing non-responsive websites.
#####  :earth_americas: Features
```javascript
1. Create Menu Anywhere [Non Multilingual and Multilingual Website]
2. Copy Existing Menu As SP Menu
3. Add/Remove Class Name From Tag
4. Remove Inline CSS From HTML Target Tag
5. Copy/Paste HTML Markup
6. Console Debugging For Developers
```
#####  :blue_book: Documentation (Version-1.0)
[SpHtmlHelper Decumentation](http://sumon-sarker.github.io/sp-html-helper/version-1.0)
#####  :herb: Basic HTML
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
#####  :balloon: SpHtmlHelper Initializer [Required]
```javascript
var SP = new SpHtmlHelper({
	debugMode 	: false,
	screenSize 	: 768
});
```
#####  :pager: Menu Configuration [Optional, But Required For Multilingual Menu]
```javascript
SP.MenuConfig({
	multiSiteMenu	: false,
	languageString 	: '/en/',
	copyTargetMenu 	: {
		copy 		: false,
		targetTag 	: "CSS-SELECTOR"
	}
});
```
#####  :bulb: Adding Menu
```javascript
SP.AddMenu({
	targetContainer : 'CSS-SELECTOR',
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
#####  :nut_and_bolt: Add Custom Class Name To HTML Tag
```javascript
SP.AddClass({
	urlMatch 		: false, /*Or any url string. Ex: '/jpn/'*/
	targetTag 		: 'CSS-SELECTOR',
	className 		: 'YOUR_CLASS_NAME'
});
```
#####  :o: Remove Class Name From HTML Tag
```javascript
SP.RemoveClass({
	urlMatch 		: false, /*Or any url string. Ex: '/eng/'*/
	targetTag 		: 'CSS-SELECTOR',
	className 		: 'YOUR_CLASS_NAME'
});
```
#####   :white_square_button: Remove Inline CSS From Html Tag
```javascript
SP.RemoveInlineCss({
	urlMatch 		: false, /*Or any url string. Ex: '/jpn/'*/
	targetTag 		: 'CSS-SELECTOR',
	targetCSS 		: 'width,height,float'
});
```
#####  :pushpin: Copy and Paste Html Tags
```javascript
SP.CopyPaste({
	urlMatch 		: false, /*Or any url string. Ex: '/jpn/'*/
	copyTarget 		: 'CSS-SELECTOR',
	pasteTarget 	: 'CSS-SELECTOR',
	pasteTagClass 	: 'YOUR-NEW-CLASS'
});
```
#####  :football: Developer Console Debugging
```javascript
SP.debug();
```
#####  :blue_book: Documentation (Version-1.0)
[SpHtmlHelper Decumentation](http://sumon-sarker.github.io/sp-html-helper/version-1.0)