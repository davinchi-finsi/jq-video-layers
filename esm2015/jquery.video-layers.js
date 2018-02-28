/**
 * @license jq-video-layers v1.0.0
 * (c) 2018 Finsi, Inc.
 */

/**
 * Represents a layer
 */
class VideoLayer {
    constructor(params = {}) {
        for (let key in params) {
            this[key] = params[key];
        }
    }
}

/**
 * @module jqVideoLayers
 */ /** */
/**
 * Available events
 */
var VideoLayersEvents;
(function (VideoLayersEvents) {
    /**
     * Triggered before show a layer
     * @see [[VideoLayerEvent]]
     * @example
     * ```typescript
     * $("someSelector").on(VideoLayersEvents.beforeShowLayer,(e,data:VideoLayerEvent)=>{
     *      console.log(data)
     *  });
     * ```
     */
    VideoLayersEvents["beforeShowLayer"] = "videoLayer:beforeShowLayer";
    /**
     * Triggered when a layer has been shown
     * @see [[VideoLayerEvent]]
     * @example
     * ```typescript
     * $("someSelector").on(VideoLayersEvents.showLayer,(e,data:VideoLayerEvent)=>{
     *      console.log(data)
     *  });
     * ```
     */
    VideoLayersEvents["showLayer"] = "videoLayer:showLayer";
    /**
     * Triggered before hide a layer
     * @see [[VideoLayerEvent]]
     * @example
     * ```typescript
     * $("someSelector").on(VideoLayersEvents.beforeHideLayer,(e,data:VideoLayerEvent)=>{
     *      console.log(data)
     *  });
     * ```
     */
    VideoLayersEvents["beforeHideLayer"] = "videoLayer:beforeHideLayer";
    /**
     * Triggered when a layer has been hidden
     * @see [[VideoLayerEvent]]
     * @example
     * ```typescript
     * $("someSelector").on(VideoLayersEvents.hideLayer,(e,data:VideoLayerEvent)=>{
     *      console.log(data)
     *  });
     * ```
     */
    VideoLayersEvents["hideLayer"] = "videoLayer:hideLayer";
})(VideoLayersEvents || (VideoLayersEvents = {}));

/**
 * @module jqVideoLayers
 */ /** */
/**
 * Video layer widget
 */
class VideoLayers {
    /**
     * Destroy the component
     */
    destroy() {
        //@ts-ignore
        this.element.unwrap();
        //@ts-ignore
        this._super();
    }
    addLayer(layer) {
    }
    /**
     * JQuery ui function to get the default options
     * @protected
     */
    _getCreateOptions() {
        let options = {
            namespace: "jq-videolayers",
            classes: {
                root: "c-video-layers",
                video: "c-video-layers__video",
                layer: "c-video-layers__layer",
                visible: "c-video-layers__visible",
                layersContainer: "c-video-layers__container"
            },
            layers: []
        };
        return options;
    }
    _create() {
        const useParentAsContainer = this.options.useParentAsContainer;
        //if useParent is provided
        if (useParentAsContainer) {
            //if is a string, use it as query
            if (typeof useParentAsContainer == "string") {
                this.wrapperEl = this.element.parents(useParentAsContainer);
                if (this.wrapperEl.length == 0) {
                    throw "[VideoLayers] useParentAsContainer must match with an existing element, the query provided doesn't match with any element";
                }
            }
            else {
                this.wrapperEl = useParentAsContainer;
            }
        }
        else {
            this.wrapperEl = $(`<div></div>`);
            this.wrapperEl.insertAfter(this.element);
            this.element.appendTo(this.wrapperEl);
        }
        this.wrapperEl.addClass(this.options.classes.root);
        this.layersContainer = $(`<div class="${this.options.classes.layersContainer}"></div>`);
        this.wrapperEl.append(this.layersContainer);
        this.element.addClass(this.options.classes.video);
        this.layers = [];
        this.visibleLayers = [];
        this.hiddenLayers = [];
        this._assignEvents();
        this._processLayers(this.options.layers);
    }
    /**
     * Invoked each time the video time is updated
     * Resolve if there are layers to show or hide
     * @param e
     * @private
     */
    _onTimeUpdate(e) {
        //get current progress
        const currentTime = e.target.currentTime;
        let visibleLayers = this.visibleLayers, hiddenLayers = this.hiddenLayers, addToVisible = [], addToHidden = [];
        //hide layers
        for (let visibleLayerIndex = 0, visibleLayersLength = visibleLayers.length; visibleLayerIndex < visibleLayersLength; visibleLayerIndex++) {
            let currentVisibleLayer = visibleLayers[visibleLayerIndex];
            //if the currentTime is after the stop time or is before the start time (rewind)
            if (currentTime >= currentVisibleLayer.stop || currentTime < currentVisibleLayer.start) {
                this._hideLayer(currentVisibleLayer);
                addToHidden.push(visibleLayers.splice(visibleLayerIndex, 1)[0]);
                visibleLayersLength--;
                visibleLayerIndex--;
            }
        }
        //show layers
        for (let hiddenLayerIndex = 0, hiddenLayersLength = hiddenLayers.length; hiddenLayerIndex < hiddenLayersLength; hiddenLayerIndex++) {
            let currentHiddenLayer = hiddenLayers[hiddenLayerIndex];
            if (currentTime >= currentHiddenLayer.start && (currentHiddenLayer.stop == undefined || currentTime < currentHiddenLayer.stop)) {
                this._showLayer(currentHiddenLayer);
                addToVisible.push(hiddenLayers.splice(hiddenLayerIndex, 1)[0]);
                hiddenLayersLength--;
                hiddenLayerIndex--;
            }
        }
        //update the registry
        this.visibleLayers = visibleLayers.concat(addToVisible);
        this.hiddenLayers = hiddenLayers.concat(addToHidden);
    }
    /**
     * Assign event listeners
     * @private
     */
    _assignEvents() {
        this.element.off("." + this.options.namespace);
        this.element.on(`timeupdate.${this.options.namespace}`, this._onTimeUpdate.bind(this));
    }
    /**
     * Show a layer
     * @param {VideoLayer} layer
     * @private
     */
    _showLayer(layer) {
        const element = layer.element;
        this.element.trigger(VideoLayersEvents.beforeShowLayer, { instance: this, layer: layer });
        element.addClass(this.options.classes.visible);
        if (layer.position) {
            if (Array.isArray(layer.position)) {
                element.css({
                    left: layer.position[0],
                    top: layer.position[1]
                });
            }
            else {
                layer.position.of = layer.position.of || this.wrapperEl;
                element.position(layer.position);
            }
        }
        if (layer.show) {
            layer.show.complete = () => {
                this.element.trigger(VideoLayersEvents.showLayer, { instance: this, layer: layer });
            };
            element.show(layer.show);
        }
        else {
            element.show();
            this.element.trigger(VideoLayersEvents.showLayer, { instance: this, layer: layer });
        }
    }
    /**
     * Hide a layer
     * @param {VideoLayer} layer
     * @private
     */
    _hideLayer(layer) {
        const element = layer.element;
        this.element.trigger(VideoLayersEvents.beforeHideLayer, { instance: this, layer: layer });
        if (layer.hide) {
            layer.hide.complete = () => {
                element.removeClass(this.options.classes.visible);
                this._resetPosition(layer);
                this.element.trigger(VideoLayersEvents.hideLayer, { instance: this, layer: layer });
            };
            element.hide(layer.hide);
        }
        else {
            element.hide().removeClass(this.options.classes.visible);
            this._resetPosition(layer);
            this.element.trigger(VideoLayersEvents.hideLayer, { instance: this, layer: layer });
        }
    }
    /**
     * Reset the position of a layer if jquery ui position object has been provided as position option
     * @param layer
     * @private
     */
    _resetPosition(layer) {
        if (layer.position && !Array.isArray(layer.position)) {
            layer.element.css({
                left: "",
                top: ""
            });
        }
    }
    /**
     * Process the layers
     * @param {VideoLayer[]} layers
     * @private
     */
    _processLayers(layers) {
        let processedLayers = [];
        for (let layerIndex = 0, layersLength = layers.length; layerIndex < layersLength; layerIndex++) {
            let currentLayer = new VideoLayer($.extend(true, {}, layers[layerIndex])), layerElement;
            //check if element is provided
            if (currentLayer.element) {
                //element could be a query
                if (typeof currentLayer.element == "string") {
                    currentLayer.element = $(currentLayer.element);
                }
                if (currentLayer.appendToLayers != false) {
                    this.layersContainer.append(currentLayer.element);
                }
            }
            else {
                //if content is string or inline html
                currentLayer.element = $(`<div>${currentLayer.content}</div>`);
                this.layersContainer.append(currentLayer.element);
            }
            layerElement = currentLayer.element;
            if (layerElement == undefined || layerElement.length == 0) {
                throw "[VideoLayers] The layer must has an element or a content";
            }
            layerElement.addClass(this.options.classes.layer);
            if (currentLayer.styles) {
                layerElement.css(currentLayer.styles);
            }
            layerElement.addClass(currentLayer.cssClass);
            processedLayers.push(currentLayer);
        }
        this.layers = this.layers.concat(processedLayers);
        this.hiddenLayers = this.hiddenLayers.concat(processedLayers);
    }
}

/**
 * @module jqVideoLayers
 */ /** */
//$.widget extends the prototype that receives, to extend the prototype all the properties must be enumerable
//the properties of a es6 class prototype aren't enumerable so it's necessary to get the propertyNames and get the descriptor of each one
if (Object.hasOwnProperty("getOwnPropertyDescriptors")) {
    //@ts-ignore
    let proto = {}, names = Object.getOwnPropertyNames(VideoLayers.prototype);
    for (let nameIndex = 0, namesLength = names.length; nameIndex < namesLength; nameIndex++) {
        let currentName = names[nameIndex];
        proto[currentName] = Object.getOwnPropertyDescriptor(VideoLayers.prototype, currentName).value;
    }
    $.widget("ui.videoLayers", proto);
}
else {
    $.widget("ui.videoLayers", VideoLayers);
}

/**
 * jqVideoLayers module
 *
 * @module jqVideoLayers
 * @preferred
 * @example For browser usage, all the members are available using the namespace `jqVideoLayers`
 * ```typescript
 * jqVideoLayers.VideoLayersEvents
 * ```
 */ /** */

export { VideoLayer, VideoLayersEvents, VideoLayers };
