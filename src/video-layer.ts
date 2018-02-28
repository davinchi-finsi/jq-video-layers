/**
 * @module jqVideoLayers
 *//** */
/**
 * Options for the widget
 */
export interface VideoLayerOptions {
    /**
     * Element to use. Could be a valid jquery selector, a jquery object or an element object
     * **Note** this option is optional if 'content' is provided
     * @example `element:".some-query"`
     * @example `element:document.querySelector(".some-query")`
     * @example `element:$(".some-query")`
     */
    element?:string|JQuery|Element;
    /**
     * Raw content to use as layer. The content will be appended to a new div
     * **Note** this option is optional if 'element' is provided
     * @example `content:"Some text"//will create <div class="c-video-layers__layer">Some text</div>`
     * @example `content:"<strong>Some text</strong>"//will create <div class="c-video-layers__layer"><strong>Some text</strong></div>`
     */
    content?:string;
    /**
     * Position for the layer.
     * Could be an array of numbers corresponding to left-top coordintates or a jquery ui position object. See [jquery ui position](http://jqueryui.com/position/)
     * If a jquery ui position object is provided, the default "of" will be the wrapper of the video
     * If the layer is located inside the [[layersContainer]] the default behavior is positioning the layer over the video.
     * However, the layer could be outside the video without position. Please, see the examples for more info
     * @example `position:[20,100]//left 20, top 100`
     * @example `position:{my:"center", at:"center"}//of the jq-video-layers root element`
     * @example `position:{my:"center", at:"center",of:document.body}//the layer will be positioned relative to the body`
     */
    position?:number[]|{my:string;to:string;of:any;};
    /**
     * Css classes to add to the element. Useful when the [[content]] option is used.
     * Multiple classes could be provided separated by space
     * @example `cssClass:"someClassToAdd anotherClassToAdd"`
     */
    cssClass?:string;
    /**
     * Inline styles to add. Uses [jquery css](http://api.jquery.com/css/)
     * @example `styles:{background:"red"}`
     */
    styles?:any;
    /**
     * The second in which to show the layer.
     */
    start?:number;
    /**
     * The second in which to hide the layer.
     * If is not provided, the layer will not be hidden when the video time is after the [[start]] option.
     * If the video is rewound and the video time is before the [[start]] option, the layer will be hidden
     */
    stop?:number;
    /**
     * Animation to perform to show the layer
     * Uses [jquery ui show](https://jqueryui.com/show/) if is available or [jquery show](http://api.jquery.com/show/)
     */
    show?:any;
    /**
     * Animation to perform to hide the layer
     * Uses [jquery ui hide](https://jqueryui.com/hide/) if is available or [jquery hide](http://api.jquery.com/hide/)
     */
    hide?:any;
    /**
     * By default all the layers are appended to the [[layerContainer]]
     * To avoid this behavior, set appendToLayers to false
     */
    appendToLayers?:boolean;
    //Allow any property
    [key: string]: any;
}

/**
 * Represents a layer
 */
export class VideoLayer implements VideoLayerOptions{
    /**
     * Element to use. Could be a valid jquery selector, a jquery object or an element object
     * **Note** this option is optional if 'content' is provided
     * @example `element:".some-query"`
     * @example `element:document.querySelector(".some-query")`
     * @example `element:$(".some-query")`
     */
    element?:string|JQuery|Element;
    /**
     * Raw content to use as layer. The content will be appended to a new div
     * **Note** this option is optional if 'element' is provided
     * @example `content:"Some text"//will create <div class="c-video-layers__layer">Some text</div>`
     * @example `content:"<strong>Some text</strong>"//will create <div class="c-video-layers__layer"><strong>Some text</strong></div>`
     */
    content?:string;
    /**
     * Position for the layer.
     * Could be an array of numbers corresponding to left-top coordintates or a jquery ui position object. See [jquery ui position](http://jqueryui.com/position/)
     * If a jquery ui position object is provided, the default "of" will be the wrapper of the video
     * If the layer is located inside the [[layersContainer]] the default behavior is positioning the layer over the video.
     * However, the layer could be outside the video without position. Please, see the examples for more info
     * @example `position:[20,100]//left 20, top 100`
     * @example `position:{my:"center", at:"center"}//of the jq-video-layers root element`
     * @example `position:{my:"center", at:"center",of:document.body}//the layer will be positioned relative to the body`
     */
    position?:number[]|{my:string;to:string;of:any;};
    /**
     * Css classes to add to the element. Useful when the [[content]] option is used.
     * Multiple classes could be provided separated by space
     * @example `cssClass:"someClassToAdd anotherClassToAdd"`
     */
    cssClass?:string;
    /**
     * Inline styles to add. Uses [jquery css](http://api.jquery.com/css/)
     * @example `styles:{background:"red"}`
     */
    styles?:any;
    /**
     * The second in which to show the layer.
     */
    start?:number;
    /**
     * The second in which to hide the layer.
     * If is not provided, the layer will not be hidden when the video time is after the [[start]] option.
     * If the video is rewound and the video time is before the [[start]] option, the layer will be hidden
     */
    stop?:number;
    /**
     * Animation to perform to show the layer
     * Uses [jquery ui show](https://jqueryui.com/show/) if is available or [jquery show](http://api.jquery.com/show/)
     */
    show?:any;
    /**
     * Animation to perform to hide the layer
     * Uses [jquery ui hide](https://jqueryui.com/hide/) if is available or [jquery hide](http://api.jquery.com/hide/)
     */
    hide?:any;
    /**
     * By default all the layers are appended to the [[layerContainer]]
     * To avoid this behavior, set appendToLayers to false
     */
    appendToLayers?:boolean;
    //Allow any property
    [key: string]: any;
    constructor(params:VideoLayerOptions={}){
        for(let key in params){
            this[key] = params[key];
        }
    }
}