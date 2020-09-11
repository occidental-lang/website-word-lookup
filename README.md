# website-word-lookup
A library that you can add to your website to enable Occidental word lookup for selected text.

## Install

The `index.html` file in this repo serves as an example.

1. Include the `lookup.js` file in your website.

2. Add the following elements to your website and style them however you like:

```
<div id='langPicker'></div>

<div id="definition"></div>
```

3. After you have finished loading the page content, use the following javascript to initialize the lookup functionality:

```
document.onselectionchange = debounce(lookup, 500);
```
