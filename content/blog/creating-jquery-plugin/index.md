---
title: Creating a jquery plugin
date: "2020-09-21"
description: "A jQuery plugin is simply a new method that we use to extend jQuery's prototype object. By extending the prototype object you enable all jQuery objects to inherit any methods that you add. - Jquery"
draft: true
---

Jquery has been used quite largely in many web projects because it gives you all javascript functions and commands wrapped in a nice API interface. For example: "jquery selectors", used very heavily.

Also, there were a lot of plugins which were build on top of jquery. for example: bootstrap's modal, tooltip etc.

Example usage of bootstrap modal:

```javascript
$("#target").modal("show")
```

Whenver we use `$` instead of `document.querySelector()` it returns a jquery object which has some methods available like `.css(), .click()` etc.

> Jquery object gets these methods from `$.fn` object

So, let's say we want to write our own method and add it in `$.fn` definition so that every jquery object can also use that method.

Let's take a use case of [Dropcap/s](https://css-tricks.com/snippets/css/drop-caps/). We want to apply a function on a jquery object which will basically make the first letter bigger in size relative to the sentence or paragraph.
(_Something like we see in newsletters_ 🤔)

Let's name this function `dropCap` and the definition will look somthing like this:

```javascript
$.fn.dropCap = function () {
  // your definition goes here
}
```

We can use this function on any jquery object now:

```javascript
$(".some-element").dropCap()
```

and it will execute whatever functionality we write in our `dropCap` function.
