# website-word-lookup
A library that you can add to your website to enable Occidental word lookup for selected text.

This tool requires you to have a dictionary in the following JSON format:

```
{
  "targetWord" : {
    "en" : "translation",
    "es" : "stuff",
  },
  "anotherWord": {}
}
```

See the `dict.json` file in this repo for an example.

## Usage

If you highlight one word with your mouse, it will look it up and return all of the properties under that key in the JSON. (all languages)

If you highlight multiple words, it will look each word up in your user's language (this is set by the `langPicker`) and show a crudely translated version of the highlighted phrase. For this to work well, I suggest that you have the language ISO code key in the dictionary match to a translation that is as direct as possible (ideally 1-to-1 translation). You can always add more info in other fields too.

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
