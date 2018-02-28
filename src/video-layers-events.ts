/**
 * @module jqVideoLayers
 *//** */

import {VideoLayers} from "./video-layers";
import {VideoLayer} from "./video-layer";

/**
 * Event related to a layer
 * ```
 */
export interface VideoLayerEvent{
    /**
     * Instance of snapPuzzle that triggers the event
     */
    instance:VideoLayers;
    /**
     * Layer that throws the event
     */
    layer:VideoLayer;
}
/**
 * Available events
 */
export enum VideoLayersEvents{
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
    beforeShowLayer = "videoLayer:beforeShowLayer",
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
    showLayer = "videoLayer:showLayer",
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
    beforeHideLayer = "videoLayer:beforeHideLayer",
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
    hideLayer = "videoLayer:hideLayer"
}