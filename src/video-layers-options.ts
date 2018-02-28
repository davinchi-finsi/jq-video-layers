/**
 * @module jqVideoLayers
 *//** */
import {
    VideoLayer,
    VideoLayerOptions
} from "./video-layer";

/**
 * Options for the plugin
 */
export interface VideoLayersOptions{
    /**
     * Namespace for events.
     * Update this option will reconstruct the markup and the progress will be lost
     * @default jq-videolayers
     */
    namespace:"videolayers",
    /**
     * Css classes to use
     */
    classes?: {//css classes for elements
        /**
         * Root element
         * @default `c-video-layers`
         */
        root?: "c-video-layers",
        /**
         * Class to add to the video element
         * @default `c-video-layers`
         */
        video?:"c-video-layers__video",
        /**
         * Class to add to the layers
         * @default `c-video-layers__video`
         */
        layer?:"c-video-layers__layer",
        /**
         * Class to add to the layer when is visible
         * @default `c-video-layers__layer`
         */
        visible?:"c-video-layers__visible",
        /**
         * Class to add to the layers container
         * @default `c-video-layers__visible`
         */
        layersContainer?:"c-video-layers__container"
    },
    /**
     * Layers to use
     */
    layers?:VideoLayer[] | VideoLayerOptions[];
    /**
     * The element to use as parent of the video.
     * The layers container will be appended to this element.
     * By default, a new `<div>` will be created and the video will be appended to the new element, however, is possible to set a different element as container
     * The element must be a parent of the video.
     * This option is useful when the layers are used with a custom player instead of the html5 default
     * @example For example, if plyr video player is used:
     * `useParentAsContainer:'.plyr__video-wrapper'`
     * This will look for the first parent that matches with the selector
     */
    useParentAsContainer?:string|JQuery|Element;
}