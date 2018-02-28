# jq-video-layers
`jqVideoLayers` is a JQuery widget that allows to add layers like Youtube to any html5 video.

Is extensible using [jQuery UI widget](https://jqueryui.com/widget/)

## Dependencies
- jquery
- jQuery UI:
    - jQuery UI widget
    - jQuery UI position[optional]
    - jQuery UI effects[optional]


## Features
- Typescript sources
- All the css classes are configurable. See [css classes](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayersoptions.html#classes)
- Show/Hide layers depending on the video time
- Extensible with Widget. See [jQuery UI widget docs](http://api.jqueryui.com/jQuery.widget/)
- Layers could be over the video or in external containers
- Compatible with any html5 native video
- [Compatible with Javascript video players](#usage-with-other-video-players)
- Possibility to set positions with [jQuery UI Position](http://jqueryui.com/position/)
- Possibility to use [jQuery UI Show/Hide effects](http://jqueryui.com/show/)

**Note** `jqVideoLayers` doesn't provide (for now) the posibility to set overlays when the video is in full screen
**BUT**, if is used with a Javascript video player like [plyr](https://plyr.io/) is possible. Please see the [example](https://jsfiddle.net/Haztivity/69uftqjn/)

## Docs
For more info, please check the [docs](https://davinchi-finsi.github.io/jq-video-layers)

## Playground
[Demo in jsfiddle](https://jsfiddle.net/Haztivity/bhdemb2a/)

## Plyr with fullscreen
[Demo in jsfiddle](https://jsfiddle.net/Haztivity/69uftqjn/)

## Usage
Install with `npm i jq-video-layers`
or download the [latest release](https://github.com/davinchi-finsi/jq-video-layers/releases)

### Import as module
#### Typescript:
```typescript
import * as $ from "jquery";
//choose one of the follow options
//for jquery-ui package
import "jq-video-layers/esm2015/jquery-ui-deps";
//for jquery-ui-dist package
import "jquery-ui-dist/jquery-ui";
import {VideoLayers} from "jq-video-layers";
$("someSelector").videoLayers(<VideoLayersOptions>{
    //options
});
```
#### Vanilla ES2015
```javascript
import * as $ from "jquery";
//choose one of the follow options
//for jquery-ui package
import "jq-video-layers/esm2015/jquery-ui-deps";
//for jquery-ui-dist package
import "jquery-ui-dist/jquery-ui";
import "jq-video-layers";
$("someSelector").videoLayers({
    //options
});
```
**Please note** that depending of the bundler you are using other configurations may be necessary. For example, shimming JQuery and jQuery UI.
### Traditional way
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Some Title</title>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="path/to/jquery.video-layers"></script>
    </head>
    <body>
         <video width="400" controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
            Your browser does not support HTML5 video.
        </video>
        <div id="layer-img" class="layer">
            <img src="./image.jpg">
        </div>
        <script type="text/javascript">
            //jq-snap-puzzle will wait until de image is loaded
            $("video").videoLayers({
                layers:[
                    {
                        //The layer could be simple text, the text will be wrapped in a div element
                        content:"Some text for the layer",
                        position:[25,25],
                        start:1,
                        stop:4
                    },
                    {
                        //Or could be a valid jQuery selector, jQuery object or Element instance
                        element:"#layer-img",
                        //Use c-video-layers__layer--strip to avoid the default styles of the layer
                        cssClass:"addThisClass andThisOne c-video-layers__layer--strip",
                        styles:{
                            width:"50%"
                        },
                        position:{
                            my:"center",
                            to:"center"
                            //of is by default the container of the video
                        },
                        start:5,
                        stop:10,
                        show:{effect:"fade",duration:1000},
                        hide:{effect:"blind",duration:500}
                    }
                ]
            });
        </script>
    </body>
</html>
```

### Layers
The layers accepts two configurations:
- [content](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayeroptions.html#content): Will be used as raw content performing and append to the layers container
- [element](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayeroptions.html#element): Could be a jQuery valid selector, jQuery object or Element instance.

By default, the layers will be appended to the [layersContainerEl](https://davinchi-finsi.github.io/jq-video-layers/classes/jqvideolayers.videolayers.html#layerscontainer), to avoid this behavior specify [appendToLayers](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayeroptions.html#appendtolayers)
```javascript
$("video").videoLayers({
    layers:[
        {
            //The layer could be simple text, the text will be wrapped in a div element
            element:"#someQuery",
            position:[25,25],
            start:1,
            //Don't append the layer to the layers container
            appendToLayers:false
        }
    ]
});
```
This is useful to handle layers outside the video.

## jQuery UI
jQuery UI could be included in the projects in many different ways and with different packages, instead
of force you to use one, we leave up to you how to include it:

### Modularized
Using `npm i jquery-ui` that install the package allowing to import the widgets you want.

We provided a file with the imports of the required dependencies:
```typescript
import "jq-video-layers/esm2015/jquery-ui-deps";
```

### dist package
In npm is available the package [jquery-ui-dist](https://www.npmjs.com/package/jquery-ui-dist). Recommended if you will use the most of the framework.

### Downloading a custom bundle
Go to the [jQuery UI download page](https://jqueryui.com/download) and checks:
- Core:
    - Widget
    - Position [optional]: check it if you are going to use the in the [position option](https://davinchi-finsi.github.io/jq-video-layers/classes/jqvideolayers.videolayer.html#position) the [jQuery UI Position](http://jqueryui.com/position/)
- Effects
    - Check the effects you want to use

or use [this configuration](http://jqueryui.com/download/#!version=1.12.1&components=110000000000000000000000000000001111111111111111)

## Options
Please go to [docs](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayersoptions.html)

## Events

| Event name    | Detail           | Emit  |
| ------------- | ---------------- | ----- |
| [videoLayers:beforeShowLayer](https://davinchi-finsi.github.io/jq-video-layers/enums/jqvideolayers.videolayersevents.html#beforeshowlayer) | Triggered before show a layer | [VideoLayerEvent](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayerevent.html) |
| [videoLayers:showLayer](https://davinchi-finsi.github.io/jq-video-layers/enums/jqvideolayers.videolayersevents.html#showlayer) | Triggered when a layer has been shown | [VideoLayerEvent](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayerevent.html) |
| [videoLayers:beforeHideLayer](https://davinchi-finsi.github.io/jq-video-layers/enums/jqvideolayers.videolayersevents.html#beforehidelayer) | Triggered before hide a layer | [VideoLayerEvent](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayerevent.html) |
| [videoLayers:hideLayer](https://davinchi-finsi.github.io/jq-video-layers/enums/jqvideolayers.videolayersevents.html#hidelayer) | Triggered when a layer has been hidden | [VideoLayerEvent](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayerevent.html) |

For more info, please go to [docs](https://davinchi-finsi.github.io/jq-video-layers/enums/jqvideolayers.videolayersevents.html)

## Usage with other video players
By default `jqVideoLayers` wraps the video in a container and uses that container as reference for the layer position.

To use with other video players you must set the option [useParentAsContainer](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayersoptions.html#useParentAsContainer) to specify which element of the video player must be used as container.

For example, [plyr](https://plyr.io/) generates this structure:
```html
<div tabindex="0" class="plyr plyr--video plyr--fullscreen-enabled plyr--stopped plyr--ready">
    <div class="plyr__video-wrapper" style="cursor: pointer;">
        <div class="plyr__captions"></div>
        <video width="400" class="plyr--setup">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
            Your browser does not support HTML5 video.
        </video>
    </div>
    <button type="button" data-plyr="play" class="plyr__play-large" aria-label="Play">
        <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#plyr-play"></use>
        </svg>
        <span class="plyr__sr-only">Play</span>
    </button>
    <div class="plyr__controls">

    </div>
</div>
```
The video wrapper to use for the layers could be `plyr__video-wrapper`, so in the `jqVideoLayers` options:
```javascript
$("video").videoLayers({
  //set the plyr container as wrapper container
  useParentAsContainer:".plyr__video-wrapper",
  layers: [
    //layers
  ]
});
```

With `useParentAsContainer` `jqVideoLayers` will use the container specified as the root element, the [layersContainerEl](https://davinchi-finsi.github.io/jq-video-layers/classes/jqvideolayers.videolayers.html#layerscontainer) will be appended to the specified container

**Please note** that `useParentAsContainer` performs a [JQuery parents](https://api.jquery.com/parents/) search and the query must match with an element parent of the video

## jQuery UI position
jQuery UI provides a util to handle positioning. By default, `jqVideoLayers` doesn't require jQuery UI position, could be used by css styles or using an array in the [position option](https://davinchi-finsi.github.io/jq-video-layers/interfaces/jqvideolayers.videolayeroptions.html#position)
```javascript
$("video").videoLayers({
  layers: [
    {
        start:0
        position:[25,100]//left-top
    }
  ]
});
```

To use jQuery UI position, [include the module](#jqueryui) and use it normally
```javascript
$("video").videoLayers({
  layers: [
    {
        start:0
        position:{
            my:"left top",
            at:"center"
        }
    }
  ]
});
```
By default, the "of" option of jQuery UI position is the [wrapperEl](https://davinchi-finsi.github.io/jq-video-layers/classes/jqvideolayers.videolayers.html#wrapperel) of the widget