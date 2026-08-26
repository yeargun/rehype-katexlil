/*! @itslil/rehype-katex 7.0.1 | LilScript reimplementation of rehype-katex | MIT */


// html-host.js
var __defProp = Object.defineProperty;
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
function ok() {
}
var Schema = class {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(property, normal, space) {
    this.normal = normal;
    this.property = property;
    if (space) {
      this.space = space;
    }
  }
};
Schema.prototype.normal = {};
Schema.prototype.property = {};
Schema.prototype.space = void 0;
function merge(definitions, space) {
  const property = {};
  const normal = {};
  for (const definition of definitions) {
    Object.assign(property, definition.property);
    Object.assign(normal, definition.normal);
  }
  return new Schema(property, normal, space);
}
function normalize(value) {
  return value.toLowerCase();
}
var Info = class {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(property, attribute) {
    this.attribute = attribute;
    this.property = property;
  }
};
Info.prototype.attribute = "";
Info.prototype.booleanish = false;
Info.prototype.boolean = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.commaSeparated = false;
Info.prototype.defined = false;
Info.prototype.mustUseProperty = false;
Info.prototype.number = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.property = "";
Info.prototype.spaceSeparated = false;
Info.prototype.space = void 0;
var types_exports = {};
__export(types_exports, {
  boolean: () => boolean,
  booleanish: () => booleanish,
  commaOrSpaceSeparated: () => commaOrSpaceSeparated,
  commaSeparated: () => commaSeparated,
  number: () => number,
  overloadedBoolean: () => overloadedBoolean,
  spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}
var checks = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(types_exports)
);
var DefinedInfo = class extends Info {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(property, attribute, mask, space) {
    let index2 = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index2 < checks.length) {
        const check = checks[index2];
        mark(this, checks[index2], (mask & types_exports[check]) === types_exports[check]);
      }
    }
  }
};
DefinedInfo.prototype.defined = true;
function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}
function create(definition) {
  const properties = {};
  const normals = {};
  for (const [property, value] of Object.entries(definition.properties)) {
    const info = new DefinedInfo(
      property,
      definition.transform(definition.attributes || {}, property),
      value,
      definition.space
    );
    if (definition.mustUseProperty && definition.mustUseProperty.includes(property)) {
      info.mustUseProperty = true;
    }
    properties[property] = info;
    normals[normalize(property)] = property;
    normals[normalize(info.attribute)] = property;
  }
  return new Schema(properties, normals, definition.space);
}
var aria = create({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  },
  transform(_2, property) {
    return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
  }
});
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
var html = create({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alpha: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    blocking: spaceSeparated,
    capture: null,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    closedBy: null,
    colorSpace: null,
    cols: number,
    colSpan: number,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: overloadedBoolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: boolean,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shadowRootClonable: boolean,
    shadowRootCustomElementRegistry: boolean,
    shadowRootDelegatesFocus: boolean,
    shadowRootMode: null,
    shadowRootSerializable: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number,
    // `<img>` and `<object>`
    leftMargin: number,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number,
    // `<body>`
    marginWidth: number,
    // `<body>`
    noResize: boolean,
    // `<frame>`
    noHref: boolean,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: boolean,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    exportParts: commaSeparated,
    part: spaceSeparated,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: caseInsensitiveTransform
});
var svg = create({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    maskType: "mask-type",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskType: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: caseSensitiveTransform
});
var xlink = create({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(_2, property) {
    return "xlink:" + property.slice(5).toLowerCase();
  }
});
var xmlns = create({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: caseInsensitiveTransform
});
var xml = create({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(_2, property) {
    return "xml:" + property.slice(3).toLowerCase();
  }
});
var cap = /[A-Z]/g;
var dash = /-[a-z]/g;
var valid = /^data[-\w.:]+$/i;
function find(schema, value) {
  const normal = normalize(value);
  let property = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(property, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
var html2 = merge([aria, html, xlink, xmlns, xml], "html");
var svg2 = merge([aria, svg, xlink, xmlns, xml], "svg");
function parse(value) {
  const tokens = [];
  const input = String(value || "");
  let index2 = input.indexOf(",");
  let start = 0;
  let end = false;
  while (!end) {
    if (index2 === -1) {
      index2 = input.length;
      end = true;
    }
    const token = input.slice(start, index2).trim();
    if (token || !end) {
      tokens.push(token);
    }
    start = index2 + 1;
    index2 = input.indexOf(",", start);
  }
  return tokens;
}
var search = /[#.]/g;
function parseSelector(selector, defaultTagName) {
  const value = selector || "";
  const props = {};
  let start = 0;
  let previous;
  let tagName;
  while (start < value.length) {
    search.lastIndex = start;
    const match = search.exec(value);
    const subvalue = value.slice(start, match ? match.index : value.length);
    if (subvalue) {
      if (!previous) {
        tagName = subvalue;
      } else if (previous === "#") {
        props.id = subvalue;
      } else if (Array.isArray(props.className)) {
        props.className.push(subvalue);
      } else {
        props.className = [subvalue];
      }
      start += subvalue.length;
    }
    if (match) {
      previous = match[0];
      start++;
    }
  }
  return {
    type: "element",
    // @ts-expect-error: tag name is parsed.
    tagName: tagName || defaultTagName || "div",
    properties: props,
    children: []
  };
}
function parse2(value) {
  const input = String(value || "").trim();
  return input ? input.split(/[ \t\n\r\f]+/g) : [];
}
function createH(schema, defaultTagName, caseSensitive) {
  const adjust = caseSensitive ? createAdjustMap(caseSensitive) : void 0;
  function h22(selector, properties, ...children) {
    let node;
    if (selector === null || selector === void 0) {
      node = { type: "root", children: [] };
      const child = (
        /** @type {Child} */
        properties
      );
      children.unshift(child);
    } else {
      node = parseSelector(selector, defaultTagName);
      const lower = node.tagName.toLowerCase();
      const adjusted = adjust ? adjust.get(lower) : void 0;
      node.tagName = adjusted || lower;
      if (isChild(properties)) {
        children.unshift(properties);
      } else {
        for (const [key, value] of Object.entries(properties)) {
          addProperty(schema, node.properties, key, value);
        }
      }
    }
    for (const child of children) {
      addChild(node.children, child);
    }
    if (node.type === "element" && node.tagName === "template") {
      node.content = { type: "root", children: node.children };
      node.children = [];
    }
    return node;
  }
  return h22;
}
function isChild(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return true;
  }
  if (typeof value.type !== "string") return false;
  const record = (
    /** @type {Record<string, unknown>} */
    value
  );
  const keys = Object.keys(value);
  for (const key of keys) {
    const value2 = record[key];
    if (value2 && typeof value2 === "object") {
      if (!Array.isArray(value2)) return true;
      const list = (
        /** @type {ReadonlyArray<unknown>} */
        value2
      );
      for (const item of list) {
        if (typeof item !== "number" && typeof item !== "string") {
          return true;
        }
      }
    }
  }
  if ("children" in value && Array.isArray(value.children)) {
    return true;
  }
  return false;
}
function addProperty(schema, properties, key, value) {
  const info = find(schema, key);
  let result;
  if (value === null || value === void 0) return;
  if (typeof value === "number") {
    if (Number.isNaN(value)) return;
    result = value;
  } else if (typeof value === "boolean") {
    result = value;
  } else if (typeof value === "string") {
    if (info.spaceSeparated) {
      result = parse2(value);
    } else if (info.commaSeparated) {
      result = parse(value);
    } else if (info.commaOrSpaceSeparated) {
      result = parse2(parse(value).join(" "));
    } else {
      result = parsePrimitive(info, info.property, value);
    }
  } else if (Array.isArray(value)) {
    result = [...value];
  } else {
    result = info.property === "style" ? style(value) : String(value);
  }
  if (Array.isArray(result)) {
    const finalResult = [];
    for (const item of result) {
      finalResult.push(
        /** @type {number | string} */
        parsePrimitive(info, info.property, item)
      );
    }
    result = finalResult;
  }
  if (info.property === "className" && Array.isArray(properties.className)) {
    result = properties.className.concat(
      /** @type {Array<number | string> | number | string} */
      result
    );
  }
  properties[info.property] = result;
}
function addChild(nodes, value) {
  if (value === null || value === void 0) {
  } else if (typeof value === "number" || typeof value === "string") {
    nodes.push({ type: "text", value: String(value) });
  } else if (Array.isArray(value)) {
    for (const child of value) {
      addChild(nodes, child);
    }
  } else if (typeof value === "object" && "type" in value) {
    if (value.type === "root") {
      addChild(nodes, value.children);
    } else {
      nodes.push(value);
    }
  } else {
    throw new Error("Expected node, nodes, or string, got `" + value + "`");
  }
}
function parsePrimitive(info, name, value) {
  if (typeof value === "string") {
    if (info.number && value && !Number.isNaN(Number(value))) {
      return Number(value);
    }
    if ((info.boolean || info.overloadedBoolean) && (value === "" || normalize(value) === normalize(name))) {
      return true;
    }
  }
  return value;
}
function style(styles) {
  const result = [];
  for (const [key, value] of Object.entries(styles)) {
    result.push([key, value].join(": "));
  }
  return result.join("; ");
}
function createAdjustMap(values) {
  const result = /* @__PURE__ */ new Map();
  for (const value of values) {
    result.set(value.toLowerCase(), value);
  }
  return result;
}
var svgCaseSensitiveTagNames = [
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "solidColor",
  "textArea",
  "textPath"
];
var h = createH(html2, "div");
var s = createH(svg2, "g", svgCaseSensitiveTagNames);
function location(file) {
  const value = String(file);
  const indices = [];
  return { toOffset, toPoint };
  function toPoint(offset) {
    if (typeof offset === "number" && offset > -1 && offset <= value.length) {
      let index2 = 0;
      while (true) {
        let end = indices[index2];
        if (end === void 0) {
          const eol = next(value, indices[index2 - 1]);
          end = eol === -1 ? value.length + 1 : eol + 1;
          indices[index2] = end;
        }
        if (end > offset) {
          return {
            line: index2 + 1,
            column: offset - (index2 > 0 ? indices[index2 - 1] : 0) + 1,
            offset
          };
        }
        index2++;
      }
    }
  }
  function toOffset(point3) {
    if (point3 && typeof point3.line === "number" && typeof point3.column === "number" && !Number.isNaN(point3.line) && !Number.isNaN(point3.column)) {
      while (indices.length < point3.line) {
        const from = indices[indices.length - 1];
        const eol = next(value, from);
        const end = eol === -1 ? value.length + 1 : eol + 1;
        if (from === end) break;
        indices.push(end);
      }
      const offset = (point3.line > 1 ? indices[point3.line - 2] : 0) + point3.column - 1;
      if (offset < indices[point3.line - 1]) return offset;
    }
  }
}
function next(value, from) {
  const cr2 = value.indexOf("\r", from);
  const lf2 = value.indexOf("\n", from);
  if (lf2 === -1) return cr2;
  if (cr2 === -1 || cr2 + 1 === lf2) return lf2;
  return cr2 < lf2 ? cr2 : lf2;
}
var webNamespaces = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
var own = {}.hasOwnProperty;
var proto = Object.prototype;
function fromParse5(tree, options) {
  const settings = options || {};
  return one(
    {
      file: settings.file || void 0,
      location: false,
      schema: settings.space === "svg" ? svg2 : html2,
      verbose: settings.verbose || false
    },
    tree
  );
}
function one(state, node) {
  let result;
  switch (node.nodeName) {
    case "#comment": {
      const reference = (
        /** @type {DefaultTreeAdapterMap['commentNode']} */
        node
      );
      result = { type: "comment", value: reference.data };
      patch(state, reference, result);
      return result;
    }
    case "#document":
    case "#document-fragment": {
      const reference = (
        /** @type {DefaultTreeAdapterMap['document'] | DefaultTreeAdapterMap['documentFragment']} */
        node
      );
      const quirksMode = "mode" in reference ? reference.mode === "quirks" || reference.mode === "limited-quirks" : false;
      result = {
        type: "root",
        children: all(state, node.childNodes),
        data: { quirksMode }
      };
      if (state.file && state.location) {
        const document = String(state.file);
        const loc = location(document);
        const start = loc.toPoint(0);
        const end = loc.toPoint(document.length);
        ok(start, "expected `start`");
        ok(end, "expected `end`");
        result.position = { start, end };
      }
      return result;
    }
    case "#documentType": {
      const reference = (
        /** @type {DefaultTreeAdapterMap['documentType']} */
        node
      );
      result = { type: "doctype" };
      patch(state, reference, result);
      return result;
    }
    case "#text": {
      const reference = (
        /** @type {DefaultTreeAdapterMap['textNode']} */
        node
      );
      result = { type: "text", value: reference.value };
      patch(state, reference, result);
      return result;
    }
    // Element.
    default: {
      const reference = (
        /** @type {DefaultTreeAdapterMap['element']} */
        node
      );
      result = element(state, reference);
      return result;
    }
  }
}
function all(state, nodes) {
  let index2 = -1;
  const results = [];
  while (++index2 < nodes.length) {
    const result = (
      /** @type {RootContent} */
      one(state, nodes[index2])
    );
    results.push(result);
  }
  return results;
}
function element(state, node) {
  const schema = state.schema;
  state.schema = node.namespaceURI === webNamespaces.svg ? svg2 : html2;
  let index2 = -1;
  const properties = {};
  while (++index2 < node.attrs.length) {
    const attribute = node.attrs[index2];
    const name = (attribute.prefix ? attribute.prefix + ":" : "") + attribute.name;
    if (!own.call(proto, name)) {
      properties[name] = attribute.value;
    }
  }
  const x2 = state.schema.space === "svg" ? s : h;
  const result = x2(node.tagName, properties, all(state, node.childNodes));
  patch(state, node, result);
  if (result.tagName === "template") {
    const reference = (
      /** @type {DefaultTreeAdapterMap['template']} */
      node
    );
    const pos = reference.sourceCodeLocation;
    const startTag = pos && pos.startTag && position(pos.startTag);
    const endTag = pos && pos.endTag && position(pos.endTag);
    const content = (
      /** @type {Root} */
      one(state, reference.content)
    );
    if (startTag && endTag && state.file) {
      content.position = { start: startTag.end, end: endTag.start };
    }
    result.content = content;
  }
  state.schema = schema;
  return result;
}
function patch(state, from, to) {
  if ("sourceCodeLocation" in from && from.sourceCodeLocation && state.file) {
    const position3 = createLocation(state, to, from.sourceCodeLocation);
    if (position3) {
      state.location = true;
      to.position = position3;
    }
  }
}
function createLocation(state, node, location2) {
  const result = position(location2);
  if (node.type === "element") {
    const tail = node.children[node.children.length - 1];
    if (result && !location2.endTag && tail && tail.position && tail.position.end) {
      result.end = Object.assign({}, tail.position.end);
    }
    if (state.verbose) {
      const properties = {};
      let key;
      if (location2.attrs) {
        for (key in location2.attrs) {
          if (own.call(location2.attrs, key)) {
            properties[find(state.schema, key).property] = position(
              location2.attrs[key]
            );
          }
        }
      }
      ok(location2.startTag, "a start tag should exist");
      const opening = position(location2.startTag);
      const closing = location2.endTag ? position(location2.endTag) : void 0;
      const data = { opening };
      if (closing) data.closing = closing;
      data.properties = properties;
      node.data = { position: data };
    }
  }
  return result;
}
function position(loc) {
  const start = point({
    line: loc.startLine,
    column: loc.startCol,
    offset: loc.startOffset
  });
  const end = point({
    line: loc.endLine,
    column: loc.endCol,
    offset: loc.endOffset
  });
  return start || end ? { start, end } : void 0;
}
function point(point3) {
  return point3.line && point3.column ? point3 : void 0;
}
var UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]);
var REPLACEMENT_CHARACTER = "\uFFFD";
var CODE_POINTS;
(function(CODE_POINTS2) {
  CODE_POINTS2[CODE_POINTS2["EOF"] = -1] = "EOF";
  CODE_POINTS2[CODE_POINTS2["NULL"] = 0] = "NULL";
  CODE_POINTS2[CODE_POINTS2["TABULATION"] = 9] = "TABULATION";
  CODE_POINTS2[CODE_POINTS2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
  CODE_POINTS2[CODE_POINTS2["LINE_FEED"] = 10] = "LINE_FEED";
  CODE_POINTS2[CODE_POINTS2["FORM_FEED"] = 12] = "FORM_FEED";
  CODE_POINTS2[CODE_POINTS2["SPACE"] = 32] = "SPACE";
  CODE_POINTS2[CODE_POINTS2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
  CODE_POINTS2[CODE_POINTS2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
  CODE_POINTS2[CODE_POINTS2["AMPERSAND"] = 38] = "AMPERSAND";
  CODE_POINTS2[CODE_POINTS2["APOSTROPHE"] = 39] = "APOSTROPHE";
  CODE_POINTS2[CODE_POINTS2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
  CODE_POINTS2[CODE_POINTS2["SOLIDUS"] = 47] = "SOLIDUS";
  CODE_POINTS2[CODE_POINTS2["DIGIT_0"] = 48] = "DIGIT_0";
  CODE_POINTS2[CODE_POINTS2["DIGIT_9"] = 57] = "DIGIT_9";
  CODE_POINTS2[CODE_POINTS2["SEMICOLON"] = 59] = "SEMICOLON";
  CODE_POINTS2[CODE_POINTS2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
  CODE_POINTS2[CODE_POINTS2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
  CODE_POINTS2[CODE_POINTS2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
  CODE_POINTS2[CODE_POINTS2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
  CODE_POINTS2[CODE_POINTS2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
  CODE_POINTS2[CODE_POINTS2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
})(CODE_POINTS || (CODE_POINTS = {}));
var SEQUENCES = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function isSurrogate(cp2) {
  return cp2 >= 55296 && cp2 <= 57343;
}
function isSurrogatePair(cp2) {
  return cp2 >= 56320 && cp2 <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
  return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp2) {
  return cp2 !== 32 && cp2 !== 10 && cp2 !== 13 && cp2 !== 9 && cp2 !== 12 && cp2 >= 1 && cp2 <= 31 || cp2 >= 127 && cp2 <= 159;
}
function isUndefinedCodePoint(cp2) {
  return cp2 >= 64976 && cp2 <= 65007 || UNDEFINED_CODE_POINTS.has(cp2);
}
var ERR;
(function(ERR2) {
  ERR2["controlCharacterInInputStream"] = "control-character-in-input-stream";
  ERR2["noncharacterInInputStream"] = "noncharacter-in-input-stream";
  ERR2["surrogateInInputStream"] = "surrogate-in-input-stream";
  ERR2["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
  ERR2["endTagWithAttributes"] = "end-tag-with-attributes";
  ERR2["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
  ERR2["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
  ERR2["unexpectedNullCharacter"] = "unexpected-null-character";
  ERR2["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
  ERR2["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
  ERR2["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
  ERR2["missingEndTagName"] = "missing-end-tag-name";
  ERR2["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
  ERR2["unknownNamedCharacterReference"] = "unknown-named-character-reference";
  ERR2["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
  ERR2["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
  ERR2["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
  ERR2["eofBeforeTagName"] = "eof-before-tag-name";
  ERR2["eofInTag"] = "eof-in-tag";
  ERR2["missingAttributeValue"] = "missing-attribute-value";
  ERR2["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
  ERR2["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
  ERR2["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
  ERR2["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
  ERR2["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
  ERR2["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
  ERR2["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
  ERR2["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
  ERR2["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
  ERR2["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
  ERR2["cdataInHtmlContent"] = "cdata-in-html-content";
  ERR2["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
  ERR2["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
  ERR2["eofInDoctype"] = "eof-in-doctype";
  ERR2["nestedComment"] = "nested-comment";
  ERR2["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
  ERR2["eofInComment"] = "eof-in-comment";
  ERR2["incorrectlyClosedComment"] = "incorrectly-closed-comment";
  ERR2["eofInCdata"] = "eof-in-cdata";
  ERR2["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
  ERR2["nullCharacterReference"] = "null-character-reference";
  ERR2["surrogateCharacterReference"] = "surrogate-character-reference";
  ERR2["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
  ERR2["controlCharacterReference"] = "control-character-reference";
  ERR2["noncharacterCharacterReference"] = "noncharacter-character-reference";
  ERR2["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
  ERR2["missingDoctypeName"] = "missing-doctype-name";
  ERR2["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
  ERR2["duplicateAttribute"] = "duplicate-attribute";
  ERR2["nonConformingDoctype"] = "non-conforming-doctype";
  ERR2["missingDoctype"] = "missing-doctype";
  ERR2["misplacedDoctype"] = "misplaced-doctype";
  ERR2["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
  ERR2["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
  ERR2["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
  ERR2["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
  ERR2["abandonedHeadElementChild"] = "abandoned-head-element-child";
  ERR2["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
  ERR2["nestedNoscriptInHead"] = "nested-noscript-in-head";
  ERR2["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR || (ERR = {}));
var DEFAULT_BUFFER_WATERLINE = 1 << 16;
var Preprocessor = class {
  constructor(handler) {
    this.handler = handler;
    this.html = "";
    this.pos = -1;
    this.lastGapPos = -2;
    this.gapStack = [];
    this.skipNextNewLine = false;
    this.lastChunkWritten = false;
    this.endOfChunkHit = false;
    this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
    this.isEol = false;
    this.lineStartPos = 0;
    this.droppedBufferSize = 0;
    this.line = 1;
    this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(code, cpOffset) {
    const { line, col, offset } = this;
    const startCol = col + cpOffset;
    const startOffset = offset + cpOffset;
    return {
      code,
      startLine: line,
      endLine: line,
      startCol,
      endCol: startCol,
      startOffset,
      endOffset: startOffset
    };
  }
  _err(code) {
    if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
      this.lastErrOffset = this.offset;
      this.handler.onParseError(this.getError(code, 0));
    }
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos);
    this.lastGapPos = this.pos;
  }
  _processSurrogate(cp2) {
    if (this.pos !== this.html.length - 1) {
      const nextCp = this.html.charCodeAt(this.pos + 1);
      if (isSurrogatePair(nextCp)) {
        this.pos++;
        this._addGap();
        return getSurrogatePairCodePoint(cp2, nextCp);
      }
    } else if (!this.lastChunkWritten) {
      this.endOfChunkHit = true;
      return CODE_POINTS.EOF;
    }
    this._err(ERR.surrogateInInputStream);
    return cp2;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    if (this.willDropParsedChunk()) {
      this.html = this.html.substring(this.pos);
      this.lineStartPos -= this.pos;
      this.droppedBufferSize += this.pos;
      this.pos = 0;
      this.lastGapPos = -2;
      this.gapStack.length = 0;
    }
  }
  write(chunk, isLastChunk) {
    if (this.html.length > 0) {
      this.html += chunk;
    } else {
      this.html = chunk;
    }
    this.endOfChunkHit = false;
    this.lastChunkWritten = isLastChunk;
  }
  insertHtmlAtCurrentPos(chunk) {
    this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
    this.endOfChunkHit = false;
  }
  startsWith(pattern, caseSensitive) {
    if (this.pos + pattern.length > this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return false;
    }
    if (caseSensitive) {
      return this.html.startsWith(pattern, this.pos);
    }
    for (let i2 = 0; i2 < pattern.length; i2++) {
      const cp2 = this.html.charCodeAt(this.pos + i2) | 32;
      if (cp2 !== pattern.charCodeAt(i2)) {
        return false;
      }
    }
    return true;
  }
  peek(offset) {
    const pos = this.pos + offset;
    if (pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    const code = this.html.charCodeAt(pos);
    return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
  }
  advance() {
    this.pos++;
    if (this.isEol) {
      this.isEol = false;
      this.line++;
      this.lineStartPos = this.pos;
    }
    if (this.pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    let cp2 = this.html.charCodeAt(this.pos);
    if (cp2 === CODE_POINTS.CARRIAGE_RETURN) {
      this.isEol = true;
      this.skipNextNewLine = true;
      return CODE_POINTS.LINE_FEED;
    }
    if (cp2 === CODE_POINTS.LINE_FEED) {
      this.isEol = true;
      if (this.skipNextNewLine) {
        this.line--;
        this.skipNextNewLine = false;
        this._addGap();
        return this.advance();
      }
    }
    this.skipNextNewLine = false;
    if (isSurrogate(cp2)) {
      cp2 = this._processSurrogate(cp2);
    }
    const isCommonValidRange = this.handler.onParseError === null || cp2 > 31 && cp2 < 127 || cp2 === CODE_POINTS.LINE_FEED || cp2 === CODE_POINTS.CARRIAGE_RETURN || cp2 > 159 && cp2 < 64976;
    if (!isCommonValidRange) {
      this._checkForProblematicCharacters(cp2);
    }
    return cp2;
  }
  _checkForProblematicCharacters(cp2) {
    if (isControlCodePoint(cp2)) {
      this._err(ERR.controlCharacterInInputStream);
    } else if (isUndefinedCodePoint(cp2)) {
      this._err(ERR.noncharacterInInputStream);
    }
  }
  retreat(count) {
    this.pos -= count;
    while (this.pos < this.lastGapPos) {
      this.lastGapPos = this.gapStack.pop();
      this.pos--;
    }
    this.isEol = false;
  }
};
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2["CHARACTER"] = 0] = "CHARACTER";
  TokenType2[TokenType2["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
  TokenType2[TokenType2["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
  TokenType2[TokenType2["START_TAG"] = 3] = "START_TAG";
  TokenType2[TokenType2["END_TAG"] = 4] = "END_TAG";
  TokenType2[TokenType2["COMMENT"] = 5] = "COMMENT";
  TokenType2[TokenType2["DOCTYPE"] = 6] = "DOCTYPE";
  TokenType2[TokenType2["EOF"] = 7] = "EOF";
  TokenType2[TokenType2["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType || (TokenType = {}));
function getTokenAttr(token, attrName) {
  for (let i2 = token.attrs.length - 1; i2 >= 0; i2--) {
    if (token.attrs[i2].name === attrName) {
      return token.attrs[i2].value;
    }
  }
  return null;
}
var htmlDecodeTree = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c2) => c2.charCodeAt(0))
);
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a22;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a22 = decodeMap.get(codePoint)) !== null && _a22 !== void 0 ? _a22 : codePoint;
}
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
  return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors2) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors2;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(input, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (input.charCodeAt(offset) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(input, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(input, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(input, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(input, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(input, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(input, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(input, offset) {
    if (offset >= input.length) {
      return -1;
    }
    if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(input, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(input, offset);
  }
  addToNumericResult(input, start, end, base2) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base2, digitCount) + Number.parseInt(input.substr(start, digitCount), base2);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(input, offset) {
    const startIndex = offset;
    while (offset < input.length) {
      const char = input.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(input, startIndex, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(input, startIndex, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(input, offset) {
    const startIndex = offset;
    while (offset < input.length) {
      const char = input.charCodeAt(offset);
      if (isNumber(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(input, startIndex, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(input, startIndex, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a22;
    if (this.consumed <= expectedLength) {
      (_a22 = this.errors) === null || _a22 === void 0 ? void 0 : _a22.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(input, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < input.length; offset++, this.excess++) {
      const char = input.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a22;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a22 = this.errors) === null || _a22 === void 0 ? void 0 : _a22.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a22;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a22 = this.errors) === null || _a22 === void 0 ? void 0 : _a22.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function determineBranch(decodeTree, current, nodeIndex, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
  }
  let lo = nodeIndex;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midValue = decodeTree[mid];
    if (midValue < char) {
      lo = mid + 1;
    } else if (midValue > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var NS;
(function(NS2) {
  NS2["HTML"] = "http://www.w3.org/1999/xhtml";
  NS2["MATHML"] = "http://www.w3.org/1998/Math/MathML";
  NS2["SVG"] = "http://www.w3.org/2000/svg";
  NS2["XLINK"] = "http://www.w3.org/1999/xlink";
  NS2["XML"] = "http://www.w3.org/XML/1998/namespace";
  NS2["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS || (NS = {}));
var ATTRS;
(function(ATTRS2) {
  ATTRS2["TYPE"] = "type";
  ATTRS2["ACTION"] = "action";
  ATTRS2["ENCODING"] = "encoding";
  ATTRS2["PROMPT"] = "prompt";
  ATTRS2["NAME"] = "name";
  ATTRS2["COLOR"] = "color";
  ATTRS2["FACE"] = "face";
  ATTRS2["SIZE"] = "size";
})(ATTRS || (ATTRS = {}));
var DOCUMENT_MODE;
(function(DOCUMENT_MODE2) {
  DOCUMENT_MODE2["NO_QUIRKS"] = "no-quirks";
  DOCUMENT_MODE2["QUIRKS"] = "quirks";
  DOCUMENT_MODE2["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES2) {
  TAG_NAMES2["A"] = "a";
  TAG_NAMES2["ADDRESS"] = "address";
  TAG_NAMES2["ANNOTATION_XML"] = "annotation-xml";
  TAG_NAMES2["APPLET"] = "applet";
  TAG_NAMES2["AREA"] = "area";
  TAG_NAMES2["ARTICLE"] = "article";
  TAG_NAMES2["ASIDE"] = "aside";
  TAG_NAMES2["B"] = "b";
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BASEFONT"] = "basefont";
  TAG_NAMES2["BGSOUND"] = "bgsound";
  TAG_NAMES2["BIG"] = "big";
  TAG_NAMES2["BLOCKQUOTE"] = "blockquote";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["BR"] = "br";
  TAG_NAMES2["BUTTON"] = "button";
  TAG_NAMES2["CAPTION"] = "caption";
  TAG_NAMES2["CENTER"] = "center";
  TAG_NAMES2["CODE"] = "code";
  TAG_NAMES2["COL"] = "col";
  TAG_NAMES2["COLGROUP"] = "colgroup";
  TAG_NAMES2["DD"] = "dd";
  TAG_NAMES2["DESC"] = "desc";
  TAG_NAMES2["DETAILS"] = "details";
  TAG_NAMES2["DIALOG"] = "dialog";
  TAG_NAMES2["DIR"] = "dir";
  TAG_NAMES2["DIV"] = "div";
  TAG_NAMES2["DL"] = "dl";
  TAG_NAMES2["DT"] = "dt";
  TAG_NAMES2["EM"] = "em";
  TAG_NAMES2["EMBED"] = "embed";
  TAG_NAMES2["FIELDSET"] = "fieldset";
  TAG_NAMES2["FIGCAPTION"] = "figcaption";
  TAG_NAMES2["FIGURE"] = "figure";
  TAG_NAMES2["FONT"] = "font";
  TAG_NAMES2["FOOTER"] = "footer";
  TAG_NAMES2["FOREIGN_OBJECT"] = "foreignObject";
  TAG_NAMES2["FORM"] = "form";
  TAG_NAMES2["FRAME"] = "frame";
  TAG_NAMES2["FRAMESET"] = "frameset";
  TAG_NAMES2["H1"] = "h1";
  TAG_NAMES2["H2"] = "h2";
  TAG_NAMES2["H3"] = "h3";
  TAG_NAMES2["H4"] = "h4";
  TAG_NAMES2["H5"] = "h5";
  TAG_NAMES2["H6"] = "h6";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HEADER"] = "header";
  TAG_NAMES2["HGROUP"] = "hgroup";
  TAG_NAMES2["HR"] = "hr";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["I"] = "i";
  TAG_NAMES2["IMG"] = "img";
  TAG_NAMES2["IMAGE"] = "image";
  TAG_NAMES2["INPUT"] = "input";
  TAG_NAMES2["IFRAME"] = "iframe";
  TAG_NAMES2["KEYGEN"] = "keygen";
  TAG_NAMES2["LABEL"] = "label";
  TAG_NAMES2["LI"] = "li";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["LISTING"] = "listing";
  TAG_NAMES2["MAIN"] = "main";
  TAG_NAMES2["MALIGNMARK"] = "malignmark";
  TAG_NAMES2["MARQUEE"] = "marquee";
  TAG_NAMES2["MATH"] = "math";
  TAG_NAMES2["MENU"] = "menu";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["MGLYPH"] = "mglyph";
  TAG_NAMES2["MI"] = "mi";
  TAG_NAMES2["MO"] = "mo";
  TAG_NAMES2["MN"] = "mn";
  TAG_NAMES2["MS"] = "ms";
  TAG_NAMES2["MTEXT"] = "mtext";
  TAG_NAMES2["NAV"] = "nav";
  TAG_NAMES2["NOBR"] = "nobr";
  TAG_NAMES2["NOFRAMES"] = "noframes";
  TAG_NAMES2["NOEMBED"] = "noembed";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["OBJECT"] = "object";
  TAG_NAMES2["OL"] = "ol";
  TAG_NAMES2["OPTGROUP"] = "optgroup";
  TAG_NAMES2["OPTION"] = "option";
  TAG_NAMES2["P"] = "p";
  TAG_NAMES2["PARAM"] = "param";
  TAG_NAMES2["PLAINTEXT"] = "plaintext";
  TAG_NAMES2["PRE"] = "pre";
  TAG_NAMES2["RB"] = "rb";
  TAG_NAMES2["RP"] = "rp";
  TAG_NAMES2["RT"] = "rt";
  TAG_NAMES2["RTC"] = "rtc";
  TAG_NAMES2["RUBY"] = "ruby";
  TAG_NAMES2["S"] = "s";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["SEARCH"] = "search";
  TAG_NAMES2["SECTION"] = "section";
  TAG_NAMES2["SELECT"] = "select";
  TAG_NAMES2["SOURCE"] = "source";
  TAG_NAMES2["SMALL"] = "small";
  TAG_NAMES2["SPAN"] = "span";
  TAG_NAMES2["STRIKE"] = "strike";
  TAG_NAMES2["STRONG"] = "strong";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["SUB"] = "sub";
  TAG_NAMES2["SUMMARY"] = "summary";
  TAG_NAMES2["SUP"] = "sup";
  TAG_NAMES2["TABLE"] = "table";
  TAG_NAMES2["TBODY"] = "tbody";
  TAG_NAMES2["TEMPLATE"] = "template";
  TAG_NAMES2["TEXTAREA"] = "textarea";
  TAG_NAMES2["TFOOT"] = "tfoot";
  TAG_NAMES2["TD"] = "td";
  TAG_NAMES2["TH"] = "th";
  TAG_NAMES2["THEAD"] = "thead";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["TR"] = "tr";
  TAG_NAMES2["TRACK"] = "track";
  TAG_NAMES2["TT"] = "tt";
  TAG_NAMES2["U"] = "u";
  TAG_NAMES2["UL"] = "ul";
  TAG_NAMES2["SVG"] = "svg";
  TAG_NAMES2["VAR"] = "var";
  TAG_NAMES2["WBR"] = "wbr";
  TAG_NAMES2["XMP"] = "xmp";
})(TAG_NAMES || (TAG_NAMES = {}));
var TAG_ID;
(function(TAG_ID2) {
  TAG_ID2[TAG_ID2["UNKNOWN"] = 0] = "UNKNOWN";
  TAG_ID2[TAG_ID2["A"] = 1] = "A";
  TAG_ID2[TAG_ID2["ADDRESS"] = 2] = "ADDRESS";
  TAG_ID2[TAG_ID2["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
  TAG_ID2[TAG_ID2["APPLET"] = 4] = "APPLET";
  TAG_ID2[TAG_ID2["AREA"] = 5] = "AREA";
  TAG_ID2[TAG_ID2["ARTICLE"] = 6] = "ARTICLE";
  TAG_ID2[TAG_ID2["ASIDE"] = 7] = "ASIDE";
  TAG_ID2[TAG_ID2["B"] = 8] = "B";
  TAG_ID2[TAG_ID2["BASE"] = 9] = "BASE";
  TAG_ID2[TAG_ID2["BASEFONT"] = 10] = "BASEFONT";
  TAG_ID2[TAG_ID2["BGSOUND"] = 11] = "BGSOUND";
  TAG_ID2[TAG_ID2["BIG"] = 12] = "BIG";
  TAG_ID2[TAG_ID2["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
  TAG_ID2[TAG_ID2["BODY"] = 14] = "BODY";
  TAG_ID2[TAG_ID2["BR"] = 15] = "BR";
  TAG_ID2[TAG_ID2["BUTTON"] = 16] = "BUTTON";
  TAG_ID2[TAG_ID2["CAPTION"] = 17] = "CAPTION";
  TAG_ID2[TAG_ID2["CENTER"] = 18] = "CENTER";
  TAG_ID2[TAG_ID2["CODE"] = 19] = "CODE";
  TAG_ID2[TAG_ID2["COL"] = 20] = "COL";
  TAG_ID2[TAG_ID2["COLGROUP"] = 21] = "COLGROUP";
  TAG_ID2[TAG_ID2["DD"] = 22] = "DD";
  TAG_ID2[TAG_ID2["DESC"] = 23] = "DESC";
  TAG_ID2[TAG_ID2["DETAILS"] = 24] = "DETAILS";
  TAG_ID2[TAG_ID2["DIALOG"] = 25] = "DIALOG";
  TAG_ID2[TAG_ID2["DIR"] = 26] = "DIR";
  TAG_ID2[TAG_ID2["DIV"] = 27] = "DIV";
  TAG_ID2[TAG_ID2["DL"] = 28] = "DL";
  TAG_ID2[TAG_ID2["DT"] = 29] = "DT";
  TAG_ID2[TAG_ID2["EM"] = 30] = "EM";
  TAG_ID2[TAG_ID2["EMBED"] = 31] = "EMBED";
  TAG_ID2[TAG_ID2["FIELDSET"] = 32] = "FIELDSET";
  TAG_ID2[TAG_ID2["FIGCAPTION"] = 33] = "FIGCAPTION";
  TAG_ID2[TAG_ID2["FIGURE"] = 34] = "FIGURE";
  TAG_ID2[TAG_ID2["FONT"] = 35] = "FONT";
  TAG_ID2[TAG_ID2["FOOTER"] = 36] = "FOOTER";
  TAG_ID2[TAG_ID2["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
  TAG_ID2[TAG_ID2["FORM"] = 38] = "FORM";
  TAG_ID2[TAG_ID2["FRAME"] = 39] = "FRAME";
  TAG_ID2[TAG_ID2["FRAMESET"] = 40] = "FRAMESET";
  TAG_ID2[TAG_ID2["H1"] = 41] = "H1";
  TAG_ID2[TAG_ID2["H2"] = 42] = "H2";
  TAG_ID2[TAG_ID2["H3"] = 43] = "H3";
  TAG_ID2[TAG_ID2["H4"] = 44] = "H4";
  TAG_ID2[TAG_ID2["H5"] = 45] = "H5";
  TAG_ID2[TAG_ID2["H6"] = 46] = "H6";
  TAG_ID2[TAG_ID2["HEAD"] = 47] = "HEAD";
  TAG_ID2[TAG_ID2["HEADER"] = 48] = "HEADER";
  TAG_ID2[TAG_ID2["HGROUP"] = 49] = "HGROUP";
  TAG_ID2[TAG_ID2["HR"] = 50] = "HR";
  TAG_ID2[TAG_ID2["HTML"] = 51] = "HTML";
  TAG_ID2[TAG_ID2["I"] = 52] = "I";
  TAG_ID2[TAG_ID2["IMG"] = 53] = "IMG";
  TAG_ID2[TAG_ID2["IMAGE"] = 54] = "IMAGE";
  TAG_ID2[TAG_ID2["INPUT"] = 55] = "INPUT";
  TAG_ID2[TAG_ID2["IFRAME"] = 56] = "IFRAME";
  TAG_ID2[TAG_ID2["KEYGEN"] = 57] = "KEYGEN";
  TAG_ID2[TAG_ID2["LABEL"] = 58] = "LABEL";
  TAG_ID2[TAG_ID2["LI"] = 59] = "LI";
  TAG_ID2[TAG_ID2["LINK"] = 60] = "LINK";
  TAG_ID2[TAG_ID2["LISTING"] = 61] = "LISTING";
  TAG_ID2[TAG_ID2["MAIN"] = 62] = "MAIN";
  TAG_ID2[TAG_ID2["MALIGNMARK"] = 63] = "MALIGNMARK";
  TAG_ID2[TAG_ID2["MARQUEE"] = 64] = "MARQUEE";
  TAG_ID2[TAG_ID2["MATH"] = 65] = "MATH";
  TAG_ID2[TAG_ID2["MENU"] = 66] = "MENU";
  TAG_ID2[TAG_ID2["META"] = 67] = "META";
  TAG_ID2[TAG_ID2["MGLYPH"] = 68] = "MGLYPH";
  TAG_ID2[TAG_ID2["MI"] = 69] = "MI";
  TAG_ID2[TAG_ID2["MO"] = 70] = "MO";
  TAG_ID2[TAG_ID2["MN"] = 71] = "MN";
  TAG_ID2[TAG_ID2["MS"] = 72] = "MS";
  TAG_ID2[TAG_ID2["MTEXT"] = 73] = "MTEXT";
  TAG_ID2[TAG_ID2["NAV"] = 74] = "NAV";
  TAG_ID2[TAG_ID2["NOBR"] = 75] = "NOBR";
  TAG_ID2[TAG_ID2["NOFRAMES"] = 76] = "NOFRAMES";
  TAG_ID2[TAG_ID2["NOEMBED"] = 77] = "NOEMBED";
  TAG_ID2[TAG_ID2["NOSCRIPT"] = 78] = "NOSCRIPT";
  TAG_ID2[TAG_ID2["OBJECT"] = 79] = "OBJECT";
  TAG_ID2[TAG_ID2["OL"] = 80] = "OL";
  TAG_ID2[TAG_ID2["OPTGROUP"] = 81] = "OPTGROUP";
  TAG_ID2[TAG_ID2["OPTION"] = 82] = "OPTION";
  TAG_ID2[TAG_ID2["P"] = 83] = "P";
  TAG_ID2[TAG_ID2["PARAM"] = 84] = "PARAM";
  TAG_ID2[TAG_ID2["PLAINTEXT"] = 85] = "PLAINTEXT";
  TAG_ID2[TAG_ID2["PRE"] = 86] = "PRE";
  TAG_ID2[TAG_ID2["RB"] = 87] = "RB";
  TAG_ID2[TAG_ID2["RP"] = 88] = "RP";
  TAG_ID2[TAG_ID2["RT"] = 89] = "RT";
  TAG_ID2[TAG_ID2["RTC"] = 90] = "RTC";
  TAG_ID2[TAG_ID2["RUBY"] = 91] = "RUBY";
  TAG_ID2[TAG_ID2["S"] = 92] = "S";
  TAG_ID2[TAG_ID2["SCRIPT"] = 93] = "SCRIPT";
  TAG_ID2[TAG_ID2["SEARCH"] = 94] = "SEARCH";
  TAG_ID2[TAG_ID2["SECTION"] = 95] = "SECTION";
  TAG_ID2[TAG_ID2["SELECT"] = 96] = "SELECT";
  TAG_ID2[TAG_ID2["SOURCE"] = 97] = "SOURCE";
  TAG_ID2[TAG_ID2["SMALL"] = 98] = "SMALL";
  TAG_ID2[TAG_ID2["SPAN"] = 99] = "SPAN";
  TAG_ID2[TAG_ID2["STRIKE"] = 100] = "STRIKE";
  TAG_ID2[TAG_ID2["STRONG"] = 101] = "STRONG";
  TAG_ID2[TAG_ID2["STYLE"] = 102] = "STYLE";
  TAG_ID2[TAG_ID2["SUB"] = 103] = "SUB";
  TAG_ID2[TAG_ID2["SUMMARY"] = 104] = "SUMMARY";
  TAG_ID2[TAG_ID2["SUP"] = 105] = "SUP";
  TAG_ID2[TAG_ID2["TABLE"] = 106] = "TABLE";
  TAG_ID2[TAG_ID2["TBODY"] = 107] = "TBODY";
  TAG_ID2[TAG_ID2["TEMPLATE"] = 108] = "TEMPLATE";
  TAG_ID2[TAG_ID2["TEXTAREA"] = 109] = "TEXTAREA";
  TAG_ID2[TAG_ID2["TFOOT"] = 110] = "TFOOT";
  TAG_ID2[TAG_ID2["TD"] = 111] = "TD";
  TAG_ID2[TAG_ID2["TH"] = 112] = "TH";
  TAG_ID2[TAG_ID2["THEAD"] = 113] = "THEAD";
  TAG_ID2[TAG_ID2["TITLE"] = 114] = "TITLE";
  TAG_ID2[TAG_ID2["TR"] = 115] = "TR";
  TAG_ID2[TAG_ID2["TRACK"] = 116] = "TRACK";
  TAG_ID2[TAG_ID2["TT"] = 117] = "TT";
  TAG_ID2[TAG_ID2["U"] = 118] = "U";
  TAG_ID2[TAG_ID2["UL"] = 119] = "UL";
  TAG_ID2[TAG_ID2["SVG"] = 120] = "SVG";
  TAG_ID2[TAG_ID2["VAR"] = 121] = "VAR";
  TAG_ID2[TAG_ID2["WBR"] = 122] = "WBR";
  TAG_ID2[TAG_ID2["XMP"] = 123] = "XMP";
})(TAG_ID || (TAG_ID = {}));
var TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
  [TAG_NAMES.A, TAG_ID.A],
  [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
  [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
  [TAG_NAMES.APPLET, TAG_ID.APPLET],
  [TAG_NAMES.AREA, TAG_ID.AREA],
  [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
  [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
  [TAG_NAMES.B, TAG_ID.B],
  [TAG_NAMES.BASE, TAG_ID.BASE],
  [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
  [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
  [TAG_NAMES.BIG, TAG_ID.BIG],
  [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
  [TAG_NAMES.BODY, TAG_ID.BODY],
  [TAG_NAMES.BR, TAG_ID.BR],
  [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
  [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
  [TAG_NAMES.CENTER, TAG_ID.CENTER],
  [TAG_NAMES.CODE, TAG_ID.CODE],
  [TAG_NAMES.COL, TAG_ID.COL],
  [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
  [TAG_NAMES.DD, TAG_ID.DD],
  [TAG_NAMES.DESC, TAG_ID.DESC],
  [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
  [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
  [TAG_NAMES.DIR, TAG_ID.DIR],
  [TAG_NAMES.DIV, TAG_ID.DIV],
  [TAG_NAMES.DL, TAG_ID.DL],
  [TAG_NAMES.DT, TAG_ID.DT],
  [TAG_NAMES.EM, TAG_ID.EM],
  [TAG_NAMES.EMBED, TAG_ID.EMBED],
  [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
  [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
  [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
  [TAG_NAMES.FONT, TAG_ID.FONT],
  [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
  [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
  [TAG_NAMES.FORM, TAG_ID.FORM],
  [TAG_NAMES.FRAME, TAG_ID.FRAME],
  [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
  [TAG_NAMES.H1, TAG_ID.H1],
  [TAG_NAMES.H2, TAG_ID.H2],
  [TAG_NAMES.H3, TAG_ID.H3],
  [TAG_NAMES.H4, TAG_ID.H4],
  [TAG_NAMES.H5, TAG_ID.H5],
  [TAG_NAMES.H6, TAG_ID.H6],
  [TAG_NAMES.HEAD, TAG_ID.HEAD],
  [TAG_NAMES.HEADER, TAG_ID.HEADER],
  [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
  [TAG_NAMES.HR, TAG_ID.HR],
  [TAG_NAMES.HTML, TAG_ID.HTML],
  [TAG_NAMES.I, TAG_ID.I],
  [TAG_NAMES.IMG, TAG_ID.IMG],
  [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
  [TAG_NAMES.INPUT, TAG_ID.INPUT],
  [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
  [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
  [TAG_NAMES.LABEL, TAG_ID.LABEL],
  [TAG_NAMES.LI, TAG_ID.LI],
  [TAG_NAMES.LINK, TAG_ID.LINK],
  [TAG_NAMES.LISTING, TAG_ID.LISTING],
  [TAG_NAMES.MAIN, TAG_ID.MAIN],
  [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
  [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
  [TAG_NAMES.MATH, TAG_ID.MATH],
  [TAG_NAMES.MENU, TAG_ID.MENU],
  [TAG_NAMES.META, TAG_ID.META],
  [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
  [TAG_NAMES.MI, TAG_ID.MI],
  [TAG_NAMES.MO, TAG_ID.MO],
  [TAG_NAMES.MN, TAG_ID.MN],
  [TAG_NAMES.MS, TAG_ID.MS],
  [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
  [TAG_NAMES.NAV, TAG_ID.NAV],
  [TAG_NAMES.NOBR, TAG_ID.NOBR],
  [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
  [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
  [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
  [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
  [TAG_NAMES.OL, TAG_ID.OL],
  [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
  [TAG_NAMES.OPTION, TAG_ID.OPTION],
  [TAG_NAMES.P, TAG_ID.P],
  [TAG_NAMES.PARAM, TAG_ID.PARAM],
  [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
  [TAG_NAMES.PRE, TAG_ID.PRE],
  [TAG_NAMES.RB, TAG_ID.RB],
  [TAG_NAMES.RP, TAG_ID.RP],
  [TAG_NAMES.RT, TAG_ID.RT],
  [TAG_NAMES.RTC, TAG_ID.RTC],
  [TAG_NAMES.RUBY, TAG_ID.RUBY],
  [TAG_NAMES.S, TAG_ID.S],
  [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
  [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
  [TAG_NAMES.SECTION, TAG_ID.SECTION],
  [TAG_NAMES.SELECT, TAG_ID.SELECT],
  [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
  [TAG_NAMES.SMALL, TAG_ID.SMALL],
  [TAG_NAMES.SPAN, TAG_ID.SPAN],
  [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
  [TAG_NAMES.STRONG, TAG_ID.STRONG],
  [TAG_NAMES.STYLE, TAG_ID.STYLE],
  [TAG_NAMES.SUB, TAG_ID.SUB],
  [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
  [TAG_NAMES.SUP, TAG_ID.SUP],
  [TAG_NAMES.TABLE, TAG_ID.TABLE],
  [TAG_NAMES.TBODY, TAG_ID.TBODY],
  [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
  [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
  [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
  [TAG_NAMES.TD, TAG_ID.TD],
  [TAG_NAMES.TH, TAG_ID.TH],
  [TAG_NAMES.THEAD, TAG_ID.THEAD],
  [TAG_NAMES.TITLE, TAG_ID.TITLE],
  [TAG_NAMES.TR, TAG_ID.TR],
  [TAG_NAMES.TRACK, TAG_ID.TRACK],
  [TAG_NAMES.TT, TAG_ID.TT],
  [TAG_NAMES.U, TAG_ID.U],
  [TAG_NAMES.UL, TAG_ID.UL],
  [TAG_NAMES.SVG, TAG_ID.SVG],
  [TAG_NAMES.VAR, TAG_ID.VAR],
  [TAG_NAMES.WBR, TAG_ID.WBR],
  [TAG_NAMES.XMP, TAG_ID.XMP]
]);
function getTagID(tagName) {
  var _a22;
  return (_a22 = TAG_NAME_TO_ID.get(tagName)) !== null && _a22 !== void 0 ? _a22 : TAG_ID.UNKNOWN;
}
var $ = TAG_ID;
var SPECIAL_ELEMENTS = {
  [NS.HTML]: /* @__PURE__ */ new Set([
    $.ADDRESS,
    $.APPLET,
    $.AREA,
    $.ARTICLE,
    $.ASIDE,
    $.BASE,
    $.BASEFONT,
    $.BGSOUND,
    $.BLOCKQUOTE,
    $.BODY,
    $.BR,
    $.BUTTON,
    $.CAPTION,
    $.CENTER,
    $.COL,
    $.COLGROUP,
    $.DD,
    $.DETAILS,
    $.DIR,
    $.DIV,
    $.DL,
    $.DT,
    $.EMBED,
    $.FIELDSET,
    $.FIGCAPTION,
    $.FIGURE,
    $.FOOTER,
    $.FORM,
    $.FRAME,
    $.FRAMESET,
    $.H1,
    $.H2,
    $.H3,
    $.H4,
    $.H5,
    $.H6,
    $.HEAD,
    $.HEADER,
    $.HGROUP,
    $.HR,
    $.HTML,
    $.IFRAME,
    $.IMG,
    $.INPUT,
    $.LI,
    $.LINK,
    $.LISTING,
    $.MAIN,
    $.MARQUEE,
    $.MENU,
    $.META,
    $.NAV,
    $.NOEMBED,
    $.NOFRAMES,
    $.NOSCRIPT,
    $.OBJECT,
    $.OL,
    $.P,
    $.PARAM,
    $.PLAINTEXT,
    $.PRE,
    $.SCRIPT,
    $.SECTION,
    $.SELECT,
    $.SOURCE,
    $.STYLE,
    $.SUMMARY,
    $.TABLE,
    $.TBODY,
    $.TD,
    $.TEMPLATE,
    $.TEXTAREA,
    $.TFOOT,
    $.TH,
    $.THEAD,
    $.TITLE,
    $.TR,
    $.TRACK,
    $.UL,
    $.WBR,
    $.XMP
  ]),
  [NS.MATHML]: /* @__PURE__ */ new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
  [NS.SVG]: /* @__PURE__ */ new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
  [NS.XLINK]: /* @__PURE__ */ new Set(),
  [NS.XML]: /* @__PURE__ */ new Set(),
  [NS.XMLNS]: /* @__PURE__ */ new Set()
};
var NUMBERED_HEADERS = /* @__PURE__ */ new Set([$.H1, $.H2, $.H3, $.H4, $.H5, $.H6]);
var UNESCAPED_TEXT = /* @__PURE__ */ new Set([
  TAG_NAMES.STYLE,
  TAG_NAMES.SCRIPT,
  TAG_NAMES.XMP,
  TAG_NAMES.IFRAME,
  TAG_NAMES.NOEMBED,
  TAG_NAMES.NOFRAMES,
  TAG_NAMES.PLAINTEXT
]);
var State;
(function(State2) {
  State2[State2["DATA"] = 0] = "DATA";
  State2[State2["RCDATA"] = 1] = "RCDATA";
  State2[State2["RAWTEXT"] = 2] = "RAWTEXT";
  State2[State2["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
  State2[State2["PLAINTEXT"] = 4] = "PLAINTEXT";
  State2[State2["TAG_OPEN"] = 5] = "TAG_OPEN";
  State2[State2["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
  State2[State2["TAG_NAME"] = 7] = "TAG_NAME";
  State2[State2["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
  State2[State2["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
  State2[State2["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
  State2[State2["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
  State2[State2["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
  State2[State2["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
  State2[State2["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
  State2[State2["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
  State2[State2["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
  State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
  State2[State2["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
  State2[State2["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
  State2[State2["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
  State2[State2["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
  State2[State2["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
  State2[State2["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
  State2[State2["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
  State2[State2["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
  State2[State2["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
  State2[State2["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
  State2[State2["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
  State2[State2["COMMENT_START"] = 42] = "COMMENT_START";
  State2[State2["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
  State2[State2["COMMENT"] = 44] = "COMMENT";
  State2[State2["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
  State2[State2["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
  State2[State2["COMMENT_END"] = 50] = "COMMENT_END";
  State2[State2["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
  State2[State2["DOCTYPE"] = 52] = "DOCTYPE";
  State2[State2["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
  State2[State2["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
  State2[State2["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
  State2[State2["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
  State2[State2["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
  State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
  State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
  State2[State2["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
  State2[State2["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
  State2[State2["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
  State2[State2["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
  State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
  State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
  State2[State2["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
  State2[State2["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
  State2[State2["CDATA_SECTION"] = 68] = "CDATA_SECTION";
  State2[State2["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
  State2[State2["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
  State2[State2["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
  State2[State2["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
})(State || (State = {}));
var TokenizerMode = {
  DATA: State.DATA,
  RCDATA: State.RCDATA,
  RAWTEXT: State.RAWTEXT,
  SCRIPT_DATA: State.SCRIPT_DATA,
  PLAINTEXT: State.PLAINTEXT,
  CDATA_SECTION: State.CDATA_SECTION
};
function isAsciiDigit(cp2) {
  return cp2 >= CODE_POINTS.DIGIT_0 && cp2 <= CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp2) {
  return cp2 >= CODE_POINTS.LATIN_CAPITAL_A && cp2 <= CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp2) {
  return cp2 >= CODE_POINTS.LATIN_SMALL_A && cp2 <= CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp2) {
  return isAsciiLower(cp2) || isAsciiUpper(cp2);
}
function isAsciiAlphaNumeric2(cp2) {
  return isAsciiLetter(cp2) || isAsciiDigit(cp2);
}
function toAsciiLower(cp2) {
  return cp2 + 32;
}
function isWhitespace(cp2) {
  return cp2 === CODE_POINTS.SPACE || cp2 === CODE_POINTS.LINE_FEED || cp2 === CODE_POINTS.TABULATION || cp2 === CODE_POINTS.FORM_FEED;
}
function isScriptDataDoubleEscapeSequenceEnd(cp2) {
  return isWhitespace(cp2) || cp2 === CODE_POINTS.SOLIDUS || cp2 === CODE_POINTS.GREATER_THAN_SIGN;
}
function getErrorForNumericCharacterReference(code) {
  if (code === CODE_POINTS.NULL) {
    return ERR.nullCharacterReference;
  } else if (code > 1114111) {
    return ERR.characterReferenceOutsideUnicodeRange;
  } else if (isSurrogate(code)) {
    return ERR.surrogateCharacterReference;
  } else if (isUndefinedCodePoint(code)) {
    return ERR.noncharacterCharacterReference;
  } else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) {
    return ERR.controlCharacterReference;
  }
  return null;
}
var Tokenizer = class {
  constructor(options, handler) {
    this.options = options;
    this.handler = handler;
    this.paused = false;
    this.inLoop = false;
    this.inForeignNode = false;
    this.lastStartTagName = "";
    this.active = false;
    this.state = State.DATA;
    this.returnState = State.DATA;
    this.entityStartPos = 0;
    this.consumedAfterSnapshot = -1;
    this.currentCharacterToken = null;
    this.currentToken = null;
    this.currentAttr = { name: "", value: "" };
    this.preprocessor = new Preprocessor(handler);
    this.currentLocation = this.getCurrentLocation(-1);
    this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp2, consumed) => {
      this.preprocessor.pos = this.entityStartPos + consumed - 1;
      this._flushCodePointConsumedAsCharacterReference(cp2);
    }, handler.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(ERR.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (consumed) => {
        this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
      },
      validateNumericCharacterReference: (code) => {
        const error = getErrorForNumericCharacterReference(code);
        if (error)
          this._err(error, 1);
      }
    } : void 0);
  }
  //Errors
  _err(code, cpOffset = 0) {
    var _a22, _b2;
    (_b2 = (_a22 = this.handler).onParseError) === null || _b2 === void 0 ? void 0 : _b2.call(_a22, this.preprocessor.getError(code, cpOffset));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(offset) {
    if (!this.options.sourceCodeLocationInfo) {
      return null;
    }
    return {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - offset,
      startOffset: this.preprocessor.offset - offset,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    };
  }
  _runParsingLoop() {
    if (this.inLoop)
      return;
    this.inLoop = true;
    while (this.active && !this.paused) {
      this.consumedAfterSnapshot = 0;
      const cp2 = this._consume();
      if (!this._ensureHibernation()) {
        this._callState(cp2);
      }
    }
    this.inLoop = false;
  }
  //API
  pause() {
    this.paused = true;
  }
  resume(writeCallback) {
    if (!this.paused) {
      throw new Error("Parser was already resumed");
    }
    this.paused = false;
    if (this.inLoop)
      return;
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
    }
  }
  write(chunk, isLastChunk, writeCallback) {
    this.active = true;
    this.preprocessor.write(chunk, isLastChunk);
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
    }
  }
  insertHtmlAtCurrentPos(chunk) {
    this.active = true;
    this.preprocessor.insertHtmlAtCurrentPos(chunk);
    this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    if (this.preprocessor.endOfChunkHit) {
      this.preprocessor.retreat(this.consumedAfterSnapshot);
      this.consumedAfterSnapshot = 0;
      this.active = false;
      return true;
    }
    return false;
  }
  //Consumption
  _consume() {
    this.consumedAfterSnapshot++;
    return this.preprocessor.advance();
  }
  _advanceBy(count) {
    this.consumedAfterSnapshot += count;
    for (let i2 = 0; i2 < count; i2++) {
      this.preprocessor.advance();
    }
  }
  _consumeSequenceIfMatch(pattern, caseSensitive) {
    if (this.preprocessor.startsWith(pattern, caseSensitive)) {
      this._advanceBy(pattern.length - 1);
      return true;
    }
    return false;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: TokenType.START_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: TokenType.END_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(offset) {
    this.currentToken = {
      type: TokenType.COMMENT,
      data: "",
      location: this.getCurrentLocation(offset)
    };
  }
  _createDoctypeToken(initialName) {
    this.currentToken = {
      type: TokenType.DOCTYPE,
      name: initialName,
      forceQuirks: false,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(type, chars) {
    this.currentCharacterToken = {
      type,
      chars,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(attrNameFirstCh) {
    this.currentAttr = {
      name: attrNameFirstCh,
      value: ""
    };
    this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var _a22;
    var _b2;
    const token = this.currentToken;
    if (getTokenAttr(token, this.currentAttr.name) === null) {
      token.attrs.push(this.currentAttr);
      if (token.location && this.currentLocation) {
        const attrLocations = (_a22 = (_b2 = token.location).attrs) !== null && _a22 !== void 0 ? _a22 : _b2.attrs = /* @__PURE__ */ Object.create(null);
        attrLocations[this.currentAttr.name] = this.currentLocation;
        this._leaveAttrValue();
      }
    } else {
      this._err(ERR.duplicateAttribute);
    }
  }
  _leaveAttrValue() {
    if (this.currentLocation) {
      this.currentLocation.endLine = this.preprocessor.line;
      this.currentLocation.endCol = this.preprocessor.col;
      this.currentLocation.endOffset = this.preprocessor.offset;
    }
  }
  //Token emission
  prepareToken(ct2) {
    this._emitCurrentCharacterToken(ct2.location);
    this.currentToken = null;
    if (ct2.location) {
      ct2.location.endLine = this.preprocessor.line;
      ct2.location.endCol = this.preprocessor.col + 1;
      ct2.location.endOffset = this.preprocessor.offset + 1;
    }
    this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const ct2 = this.currentToken;
    this.prepareToken(ct2);
    ct2.tagID = getTagID(ct2.tagName);
    if (ct2.type === TokenType.START_TAG) {
      this.lastStartTagName = ct2.tagName;
      this.handler.onStartTag(ct2);
    } else {
      if (ct2.attrs.length > 0) {
        this._err(ERR.endTagWithAttributes);
      }
      if (ct2.selfClosing) {
        this._err(ERR.endTagWithTrailingSolidus);
      }
      this.handler.onEndTag(ct2);
    }
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(ct2) {
    this.prepareToken(ct2);
    this.handler.onComment(ct2);
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(ct2) {
    this.prepareToken(ct2);
    this.handler.onDoctype(ct2);
    this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(nextLocation) {
    if (this.currentCharacterToken) {
      if (nextLocation && this.currentCharacterToken.location) {
        this.currentCharacterToken.location.endLine = nextLocation.startLine;
        this.currentCharacterToken.location.endCol = nextLocation.startCol;
        this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
      }
      switch (this.currentCharacterToken.type) {
        case TokenType.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const location2 = this.getCurrentLocation(0);
    if (location2) {
      location2.endLine = location2.startLine;
      location2.endCol = location2.startCol;
      location2.endOffset = location2.startOffset;
    }
    this._emitCurrentCharacterToken(location2);
    this.handler.onEof({ type: TokenType.EOF, location: location2 });
    this.active = false;
  }
  //Characters emission
  //OPTIMIZATION: The specification uses only one type of character token (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(type, ch) {
    if (this.currentCharacterToken) {
      if (this.currentCharacterToken.type === type) {
        this.currentCharacterToken.chars += ch;
        return;
      } else {
        this.currentLocation = this.getCurrentLocation(0);
        this._emitCurrentCharacterToken(this.currentLocation);
        this.preprocessor.dropParsedChunk();
      }
    }
    this._createCharacterToken(type, ch);
  }
  _emitCodePoint(cp2) {
    const type = isWhitespace(cp2) ? TokenType.WHITESPACE_CHARACTER : cp2 === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
    this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp2));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(ch) {
    this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state;
    this.state = State.CHARACTER_REFERENCE;
    this.entityStartPos = this.preprocessor.pos;
    this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(cp2) {
    if (this._isCharacterReferenceInAttribute()) {
      this.currentAttr.value += String.fromCodePoint(cp2);
    } else {
      this._emitCodePoint(cp2);
    }
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(cp2) {
    switch (this.state) {
      case State.DATA: {
        this._stateData(cp2);
        break;
      }
      case State.RCDATA: {
        this._stateRcdata(cp2);
        break;
      }
      case State.RAWTEXT: {
        this._stateRawtext(cp2);
        break;
      }
      case State.SCRIPT_DATA: {
        this._stateScriptData(cp2);
        break;
      }
      case State.PLAINTEXT: {
        this._statePlaintext(cp2);
        break;
      }
      case State.TAG_OPEN: {
        this._stateTagOpen(cp2);
        break;
      }
      case State.END_TAG_OPEN: {
        this._stateEndTagOpen(cp2);
        break;
      }
      case State.TAG_NAME: {
        this._stateTagName(cp2);
        break;
      }
      case State.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(cp2);
        break;
      }
      case State.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(cp2);
        break;
      }
      case State.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(cp2);
        break;
      }
      case State.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(cp2);
        break;
      }
      case State.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(cp2);
        break;
      }
      case State.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(cp2);
        break;
      }
      case State.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(cp2);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(cp2);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(cp2);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(cp2);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(cp2);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(cp2);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(cp2);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(cp2);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(cp2);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(cp2);
        break;
      }
      case State.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(cp2);
        break;
      }
      case State.ATTRIBUTE_NAME: {
        this._stateAttributeName(cp2);
        break;
      }
      case State.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(cp2);
        break;
      }
      case State.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(cp2);
        break;
      }
      case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(cp2);
        break;
      }
      case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(cp2);
        break;
      }
      case State.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(cp2);
        break;
      }
      case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(cp2);
        break;
      }
      case State.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(cp2);
        break;
      }
      case State.BOGUS_COMMENT: {
        this._stateBogusComment(cp2);
        break;
      }
      case State.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(cp2);
        break;
      }
      case State.COMMENT_START: {
        this._stateCommentStart(cp2);
        break;
      }
      case State.COMMENT_START_DASH: {
        this._stateCommentStartDash(cp2);
        break;
      }
      case State.COMMENT: {
        this._stateComment(cp2);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(cp2);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(cp2);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(cp2);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(cp2);
        break;
      }
      case State.COMMENT_END_DASH: {
        this._stateCommentEndDash(cp2);
        break;
      }
      case State.COMMENT_END: {
        this._stateCommentEnd(cp2);
        break;
      }
      case State.COMMENT_END_BANG: {
        this._stateCommentEndBang(cp2);
        break;
      }
      case State.DOCTYPE: {
        this._stateDoctype(cp2);
        break;
      }
      case State.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(cp2);
        break;
      }
      case State.DOCTYPE_NAME: {
        this._stateDoctypeName(cp2);
        break;
      }
      case State.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(cp2);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(cp2);
        break;
      }
      case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(cp2);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(cp2);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(cp2);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(cp2);
        break;
      }
      case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(cp2);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(cp2);
        break;
      }
      case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(cp2);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(cp2);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(cp2);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(cp2);
        break;
      }
      case State.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(cp2);
        break;
      }
      case State.CDATA_SECTION: {
        this._stateCdataSection(cp2);
        break;
      }
      case State.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(cp2);
        break;
      }
      case State.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(cp2);
        break;
      }
      case State.CHARACTER_REFERENCE: {
        this._stateCharacterReference();
        break;
      }
      case State.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(cp2);
        break;
      }
      default: {
        throw new Error("Unknown state");
      }
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(cp2) {
    switch (cp2) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.TAG_OPEN;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitCodePoint(cp2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(cp2) {
    switch (cp2) {
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(cp2) {
    switch (cp2) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(cp2) {
    switch (cp2) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(cp2) {
    switch (cp2) {
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(cp2) {
    if (isAsciiLetter(cp2)) {
      this._createStartTagToken();
      this.state = State.TAG_NAME;
      this._stateTagName(cp2);
    } else
      switch (cp2) {
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.MARKUP_DECLARATION_OPEN;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.END_TAG_OPEN;
          break;
        }
        case CODE_POINTS.QUESTION_MARK: {
          this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
          this._createCommentToken(1);
          this.state = State.BOGUS_COMMENT;
          this._stateBogusComment(cp2);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("<");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._emitChars("<");
          this.state = State.DATA;
          this._stateData(cp2);
        }
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(cp2) {
    if (isAsciiLetter(cp2)) {
      this._createEndTagToken();
      this.state = State.TAG_NAME;
      this._stateTagName(cp2);
    } else
      switch (cp2) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingEndTagName);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("</");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._createCommentToken(2);
          this.state = State.BOGUS_COMMENT;
          this._stateBogusComment(cp2);
        }
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.tagName += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        token.tagName += String.fromCodePoint(isAsciiUpper(cp2) ? toAsciiLower(cp2) : cp2);
      }
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(cp2) {
    if (cp2 === CODE_POINTS.SOLIDUS) {
      this.state = State.RCDATA_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State.RCDATA;
      this._stateRcdata(cp2);
    }
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(cp2) {
    if (isAsciiLetter(cp2)) {
      this.state = State.RCDATA_END_TAG_NAME;
      this._stateRcdataEndTagName(cp2);
    } else {
      this._emitChars("</");
      this.state = State.RCDATA;
      this._stateRcdata(cp2);
    }
  }
  handleSpecialEndTag(_cp) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
      return !this._ensureHibernation();
    }
    this._createEndTagToken();
    const token = this.currentToken;
    token.tagName = this.lastStartTagName;
    const cp2 = this.preprocessor.peek(this.lastStartTagName.length);
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        return false;
      }
      case CODE_POINTS.SOLIDUS: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State.SELF_CLOSING_START_TAG;
        return false;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._advanceBy(this.lastStartTagName.length);
        this.emitCurrentTagToken();
        this.state = State.DATA;
        return false;
      }
      default: {
        return !this._ensureHibernation();
      }
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(cp2) {
    if (this.handleSpecialEndTag(cp2)) {
      this._emitChars("</");
      this.state = State.RCDATA;
      this._stateRcdata(cp2);
    }
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(cp2) {
    if (cp2 === CODE_POINTS.SOLIDUS) {
      this.state = State.RAWTEXT_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp2);
    }
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(cp2) {
    if (isAsciiLetter(cp2)) {
      this.state = State.RAWTEXT_END_TAG_NAME;
      this._stateRawtextEndTagName(cp2);
    } else {
      this._emitChars("</");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp2);
    }
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(cp2) {
    if (this.handleSpecialEndTag(cp2)) {
      this._emitChars("</");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp2);
    }
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(cp2) {
    switch (cp2) {
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.SCRIPT_DATA_ESCAPE_START;
        this._emitChars("<!");
        break;
      }
      default: {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp2);
      }
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(cp2) {
    if (isAsciiLetter(cp2)) {
      this.state = State.SCRIPT_DATA_END_TAG_NAME;
      this._stateScriptDataEndTagName(cp2);
    } else {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp2);
    }
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(cp2) {
    if (this.handleSpecialEndTag(cp2)) {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp2);
    }
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(cp2) {
    if (cp2 === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
      this._emitChars("-");
    } else {
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp2);
    }
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(cp2) {
    if (cp2 === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
      this._emitChars("-");
    } else {
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp2);
    }
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(cp2) {
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(cp2) {
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp2);
      }
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(cp2) {
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp2);
      }
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(cp2) {
    if (cp2 === CODE_POINTS.SOLIDUS) {
      this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
    } else if (isAsciiLetter(cp2)) {
      this._emitChars("<");
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
      this._stateScriptDataDoubleEscapeStart(cp2);
    } else {
      this._emitChars("<");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp2);
    }
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(cp2) {
    if (isAsciiLetter(cp2)) {
      this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
      this._stateScriptDataEscapedEndTagName(cp2);
    } else {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp2);
    }
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(cp2) {
    if (this.handleSpecialEndTag(cp2)) {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp2);
    }
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(cp2) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp2);
      for (let i2 = 0; i2 < SEQUENCES.SCRIPT.length; i2++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp2);
    }
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(cp2) {
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(cp2) {
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp2);
      }
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(cp2) {
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp2);
      }
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(cp2) {
    if (cp2 === CODE_POINTS.SOLIDUS) {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
      this._emitChars("/");
    } else {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp2);
    }
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(cp2) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp2);
      for (let i2 = 0; i2 < SEQUENCES.SCRIPT.length; i2++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State.SCRIPT_DATA_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp2);
    }
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(cp2) {
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this.state = State.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp2);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
        this._createAttr("=");
        this.state = State.ATTRIBUTE_NAME;
        break;
      }
      default: {
        this._createAttr("");
        this.state = State.ATTRIBUTE_NAME;
        this._stateAttributeName(cp2);
      }
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(cp2) {
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this._leaveAttrName();
        this.state = State.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp2);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._leaveAttrName();
        this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN: {
        this._err(ERR.unexpectedCharacterInAttributeName);
        this.currentAttr.name += String.fromCodePoint(cp2);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.name += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp2) ? toAsciiLower(cp2) : cp2);
      }
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(cp2) {
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._createAttr("");
        this.state = State.ATTRIBUTE_NAME;
        this._stateAttributeName(cp2);
      }
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(cp2) {
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingAttributeValue);
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      default: {
        this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
        this._stateAttributeValueUnquoted(cp2);
      }
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(cp2) {
    switch (cp2) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp2);
      }
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(cp2) {
    switch (cp2) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp2);
      }
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(cp2) {
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN:
      case CODE_POINTS.EQUALS_SIGN:
      case CODE_POINTS.GRAVE_ACCENT: {
        this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
        this.currentAttr.value += String.fromCodePoint(cp2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp2);
      }
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(cp2) {
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this._leaveAttrValue();
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBetweenAttributes);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp2);
      }
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(cp2) {
    switch (cp2) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        const token = this.currentToken;
        token.selfClosing = true;
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedSolidusInTag);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp2);
      }
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.data += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        token.data += String.fromCodePoint(cp2);
      }
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(cp2) {
    if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
      this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
      this.state = State.COMMENT_START;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
      this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
      this.state = State.DOCTYPE;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
      if (this.inForeignNode) {
        this.state = State.CDATA_SECTION;
      } else {
        this._err(ERR.cdataInHtmlContent);
        this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
        this.currentToken.data = "[CDATA[";
        this.state = State.BOGUS_COMMENT;
      }
    } else if (!this._ensureHibernation()) {
      this._err(ERR.incorrectlyOpenedComment);
      this._createCommentToken(2);
      this.state = State.BOGUS_COMMENT;
      this._stateBogusComment(cp2);
    }
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(cp2) {
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_START_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State.DATA;
        const token = this.currentToken;
        this.emitCurrentComment(token);
        break;
      }
      default: {
        this.state = State.COMMENT;
        this._stateComment(cp2);
      }
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "-";
        this.state = State.COMMENT;
        this._stateComment(cp2);
      }
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<";
        this.state = State.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.data += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += String.fromCodePoint(cp2);
      }
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.EXCLAMATION_MARK: {
        token.data += "!";
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<";
        break;
      }
      default: {
        this.state = State.COMMENT;
        this._stateComment(cp2);
      }
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(cp2) {
    if (cp2 === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
    } else {
      this.state = State.COMMENT;
      this._stateComment(cp2);
    }
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(cp2) {
    if (cp2 === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
    } else {
      this.state = State.COMMENT_END_DASH;
      this._stateCommentEndDash(cp2);
    }
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(cp2) {
    if (cp2 !== CODE_POINTS.GREATER_THAN_SIGN && cp2 !== CODE_POINTS.EOF) {
      this._err(ERR.nestedComment);
    }
    this.state = State.COMMENT_END;
    this._stateCommentEnd(cp2);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "-";
        this.state = State.COMMENT;
        this._stateComment(cp2);
      }
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.COMMENT_END_BANG;
        break;
      }
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "-";
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "--";
        this.state = State.COMMENT;
        this._stateComment(cp2);
      }
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "--!";
        this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.incorrectlyClosedComment);
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "--!";
        this.state = State.COMMENT;
        this._stateComment(cp2);
      }
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(cp2) {
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        this._createDoctypeToken(null);
        const token = this.currentToken;
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBeforeDoctypeName);
        this.state = State.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp2);
      }
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(cp2) {
    if (isAsciiUpper(cp2)) {
      this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp2)));
      this.state = State.DOCTYPE_NAME;
    } else
      switch (cp2) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._createDoctypeToken(REPLACEMENT_CHARACTER);
          this.state = State.DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeName);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._createDoctypeToken(String.fromCodePoint(cp2));
          this.state = State.DOCTYPE_NAME;
        }
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.AFTER_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.name += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.name += String.fromCodePoint(isAsciiUpper(cp2) ? toAsciiLower(cp2) : cp2);
      }
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
          this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
        } else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
          this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
        } else if (!this._ensureHibernation()) {
          this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp2);
        }
      }
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp2);
      }
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp2);
      }
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.publicId += String.fromCodePoint(cp2);
      }
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.publicId += String.fromCodePoint(cp2);
      }
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp2);
      }
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp2);
      }
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp2);
      }
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp2);
      }
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.systemId += String.fromCodePoint(cp2);
      }
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.systemId += String.fromCodePoint(cp2);
      }
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp2);
      }
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(cp2) {
    const token = this.currentToken;
    switch (cp2) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default:
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(cp2) {
    switch (cp2) {
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this.state = State.CDATA_SECTION_BRACKET;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInCdata);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp2);
      }
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(cp2) {
    if (cp2 === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
      this.state = State.CDATA_SECTION_END;
    } else {
      this._emitChars("]");
      this.state = State.CDATA_SECTION;
      this._stateCdataSection(cp2);
    }
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(cp2) {
    switch (cp2) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default: {
        this._emitChars("]]");
        this.state = State.CDATA_SECTION;
        this._stateCdataSection(cp2);
      }
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference() {
    let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
    if (length < 0) {
      if (this.preprocessor.lastChunkWritten) {
        length = this.entityDecoder.end();
      } else {
        this.active = false;
        this.preprocessor.pos = this.preprocessor.html.length - 1;
        this.consumedAfterSnapshot = 0;
        this.preprocessor.endOfChunkHit = true;
        return;
      }
    }
    if (length === 0) {
      this.preprocessor.pos = this.entityStartPos;
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric2(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
    } else {
      this.state = this.returnState;
    }
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(cp2) {
    if (isAsciiAlphaNumeric2(cp2)) {
      this._flushCodePointConsumedAsCharacterReference(cp2);
    } else {
      if (cp2 === CODE_POINTS.SEMICOLON) {
        this._err(ERR.unknownNamedCharacterReference);
      }
      this.state = this.returnState;
      this._callState(cp2);
    }
  }
};
var IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
  ...IMPLICIT_END_TAG_REQUIRED,
  TAG_ID.CAPTION,
  TAG_ID.COLGROUP,
  TAG_ID.TBODY,
  TAG_ID.TD,
  TAG_ID.TFOOT,
  TAG_ID.TH,
  TAG_ID.THEAD,
  TAG_ID.TR
]);
var SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
  TAG_ID.APPLET,
  TAG_ID.CAPTION,
  TAG_ID.HTML,
  TAG_ID.MARQUEE,
  TAG_ID.OBJECT,
  TAG_ID.TABLE,
  TAG_ID.TD,
  TAG_ID.TEMPLATE,
  TAG_ID.TH
]);
var SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.OL, TAG_ID.UL]);
var SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
var SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([TAG_ID.ANNOTATION_XML, TAG_ID.MI, TAG_ID.MN, TAG_ID.MO, TAG_ID.MS, TAG_ID.MTEXT]);
var SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([TAG_ID.DESC, TAG_ID.FOREIGN_OBJECT, TAG_ID.TITLE]);
var TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML]);
var TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML]);
var TABLE_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML]);
var TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
var OpenElementStack = class {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(document, treeAdapter, handler) {
    this.treeAdapter = treeAdapter;
    this.handler = handler;
    this.items = [];
    this.tagIDs = [];
    this.stackTop = -1;
    this.tmplCount = 0;
    this.currentTagId = TAG_ID.UNKNOWN;
    this.current = document;
  }
  //Index of element
  _indexOf(element2) {
    return this.items.lastIndexOf(element2, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop];
    this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(element2, tagID) {
    this.stackTop++;
    this.items[this.stackTop] = element2;
    this.current = element2;
    this.tagIDs[this.stackTop] = tagID;
    this.currentTagId = tagID;
    if (this._isInTemplate()) {
      this.tmplCount++;
    }
    this.handler.onItemPush(element2, tagID, true);
  }
  pop() {
    const popped = this.current;
    if (this.tmplCount > 0 && this._isInTemplate()) {
      this.tmplCount--;
    }
    this.stackTop--;
    this._updateCurrentElement();
    this.handler.onItemPop(popped, true);
  }
  replace(oldElement, newElement) {
    const idx = this._indexOf(oldElement);
    this.items[idx] = newElement;
    if (idx === this.stackTop) {
      this.current = newElement;
    }
  }
  insertAfter(referenceElement, newElement, newElementID) {
    const insertionIdx = this._indexOf(referenceElement) + 1;
    this.items.splice(insertionIdx, 0, newElement);
    this.tagIDs.splice(insertionIdx, 0, newElementID);
    this.stackTop++;
    if (insertionIdx === this.stackTop) {
      this._updateCurrentElement();
    }
    if (this.current && this.currentTagId !== void 0) {
      this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
    }
  }
  popUntilTagNamePopped(tagName) {
    let targetIdx = this.stackTop + 1;
    do {
      targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
    } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
    this.shortenToLength(Math.max(targetIdx, 0));
  }
  shortenToLength(idx) {
    while (this.stackTop >= idx) {
      const popped = this.current;
      if (this.tmplCount > 0 && this._isInTemplate()) {
        this.tmplCount -= 1;
      }
      this.stackTop--;
      this._updateCurrentElement();
      this.handler.onItemPop(popped, this.stackTop < idx);
    }
  }
  popUntilElementPopped(element2) {
    const idx = this._indexOf(element2);
    this.shortenToLength(Math.max(idx, 0));
  }
  popUntilPopped(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(Math.max(idx, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(TABLE_CELLS, NS.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0;
    this.shortenToLength(1);
  }
  _indexOfTagNames(tagNames, namespace) {
    for (let i2 = this.stackTop; i2 >= 0; i2--) {
      if (tagNames.has(this.tagIDs[i2]) && this.treeAdapter.getNamespaceURI(this.items[i2]) === namespace) {
        return i2;
      }
    }
    return -1;
  }
  clearBackTo(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(idx + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(TABLE_CONTEXT, NS.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
  }
  remove(element2) {
    const idx = this._indexOf(element2);
    if (idx >= 0) {
      if (idx === this.stackTop) {
        this.pop();
      } else {
        this.items.splice(idx, 1);
        this.tagIDs.splice(idx, 1);
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(element2, false);
      }
    }
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
  }
  contains(element2) {
    return this._indexOf(element2) > -1;
  }
  getCommonAncestor(element2) {
    const elementIdx = this._indexOf(element2) - 1;
    return elementIdx >= 0 ? this.items[elementIdx] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
  }
  //Element in scope
  hasInDynamicScope(tagName, htmlScope) {
    for (let i2 = this.stackTop; i2 >= 0; i2--) {
      const tn2 = this.tagIDs[i2];
      switch (this.treeAdapter.getNamespaceURI(this.items[i2])) {
        case NS.HTML: {
          if (tn2 === tagName)
            return true;
          if (htmlScope.has(tn2))
            return false;
          break;
        }
        case NS.SVG: {
          if (SCOPING_ELEMENTS_SVG.has(tn2))
            return false;
          break;
        }
        case NS.MATHML: {
          if (SCOPING_ELEMENTS_MATHML.has(tn2))
            return false;
          break;
        }
      }
    }
    return true;
  }
  hasInScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
  }
  hasInListItemScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
  }
  hasInButtonScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
  }
  hasNumberedHeaderInScope() {
    for (let i2 = this.stackTop; i2 >= 0; i2--) {
      const tn2 = this.tagIDs[i2];
      switch (this.treeAdapter.getNamespaceURI(this.items[i2])) {
        case NS.HTML: {
          if (NUMBERED_HEADERS.has(tn2))
            return true;
          if (SCOPING_ELEMENTS_HTML.has(tn2))
            return false;
          break;
        }
        case NS.SVG: {
          if (SCOPING_ELEMENTS_SVG.has(tn2))
            return false;
          break;
        }
        case NS.MATHML: {
          if (SCOPING_ELEMENTS_MATHML.has(tn2))
            return false;
          break;
        }
      }
    }
    return true;
  }
  hasInTableScope(tagName) {
    for (let i2 = this.stackTop; i2 >= 0; i2--) {
      if (this.treeAdapter.getNamespaceURI(this.items[i2]) !== NS.HTML) {
        continue;
      }
      switch (this.tagIDs[i2]) {
        case tagName: {
          return true;
        }
        case TAG_ID.TABLE:
        case TAG_ID.HTML: {
          return false;
        }
      }
    }
    return true;
  }
  hasTableBodyContextInTableScope() {
    for (let i2 = this.stackTop; i2 >= 0; i2--) {
      if (this.treeAdapter.getNamespaceURI(this.items[i2]) !== NS.HTML) {
        continue;
      }
      switch (this.tagIDs[i2]) {
        case TAG_ID.TBODY:
        case TAG_ID.THEAD:
        case TAG_ID.TFOOT: {
          return true;
        }
        case TAG_ID.TABLE:
        case TAG_ID.HTML: {
          return false;
        }
      }
    }
    return true;
  }
  hasInSelectScope(tagName) {
    for (let i2 = this.stackTop; i2 >= 0; i2--) {
      if (this.treeAdapter.getNamespaceURI(this.items[i2]) !== NS.HTML) {
        continue;
      }
      switch (this.tagIDs[i2]) {
        case tagName: {
          return true;
        }
        case TAG_ID.OPTION:
        case TAG_ID.OPTGROUP: {
          break;
        }
        default: {
          return false;
        }
      }
    }
    return true;
  }
  //Implied end tags
  generateImpliedEndTags() {
    while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsThoroughly() {
    while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsWithExclusion(exclusionId) {
    while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
};
var NOAH_ARK_CAPACITY = 3;
var EntryType;
(function(EntryType2) {
  EntryType2[EntryType2["Marker"] = 0] = "Marker";
  EntryType2[EntryType2["Element"] = 1] = "Element";
})(EntryType || (EntryType = {}));
var MARKER = { type: EntryType.Marker };
var FormattingElementList = class {
  constructor(treeAdapter) {
    this.treeAdapter = treeAdapter;
    this.entries = [];
    this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(newElement, neAttrs) {
    const candidates = [];
    const neAttrsLength = neAttrs.length;
    const neTagName = this.treeAdapter.getTagName(newElement);
    const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
    for (let i2 = 0; i2 < this.entries.length; i2++) {
      const entry = this.entries[i2];
      if (entry.type === EntryType.Marker) {
        break;
      }
      const { element: element2 } = entry;
      if (this.treeAdapter.getTagName(element2) === neTagName && this.treeAdapter.getNamespaceURI(element2) === neNamespaceURI) {
        const elementAttrs = this.treeAdapter.getAttrList(element2);
        if (elementAttrs.length === neAttrsLength) {
          candidates.push({ idx: i2, attrs: elementAttrs });
        }
      }
    }
    return candidates;
  }
  _ensureNoahArkCondition(newElement) {
    if (this.entries.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrs = this.treeAdapter.getAttrList(newElement);
    const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
    if (candidates.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
    let validCandidates = 0;
    for (let i2 = 0; i2 < candidates.length; i2++) {
      const candidate = candidates[i2];
      if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
        validCandidates += 1;
        if (validCandidates >= NOAH_ARK_CAPACITY) {
          this.entries.splice(candidate.idx, 1);
        }
      }
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(MARKER);
  }
  pushElement(element2, token) {
    this._ensureNoahArkCondition(element2);
    this.entries.unshift({
      type: EntryType.Element,
      element: element2,
      token
    });
  }
  insertElementAfterBookmark(element2, token) {
    const bookmarkIdx = this.entries.indexOf(this.bookmark);
    this.entries.splice(bookmarkIdx, 0, {
      type: EntryType.Element,
      element: element2,
      token
    });
  }
  removeEntry(entry) {
    const entryIndex = this.entries.indexOf(entry);
    if (entryIndex !== -1) {
      this.entries.splice(entryIndex, 1);
    }
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const markerIdx = this.entries.indexOf(MARKER);
    if (markerIdx === -1) {
      this.entries.length = 0;
    } else {
      this.entries.splice(0, markerIdx + 1);
    }
  }
  //Search
  getElementEntryInScopeWithTagName(tagName) {
    const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
    return entry && entry.type === EntryType.Element ? entry : null;
  }
  getElementEntry(element2) {
    return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element2);
  }
};
var defaultTreeAdapter = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: DOCUMENT_MODE.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(tagName, namespaceURI, attrs) {
    return {
      nodeName: tagName,
      tagName,
      attrs,
      namespaceURI,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(data) {
    return {
      nodeName: "#comment",
      data,
      parentNode: null
    };
  },
  createTextNode(value) {
    return {
      nodeName: "#text",
      value,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(parentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    templateElement.content = contentElement;
  },
  getTemplateContent(templateElement) {
    return templateElement.content;
  },
  setDocumentType(document, name, publicId, systemId) {
    const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
    if (doctypeNode) {
      doctypeNode.name = name;
      doctypeNode.publicId = publicId;
      doctypeNode.systemId = systemId;
    } else {
      const node = {
        nodeName: "#documentType",
        name,
        publicId,
        systemId,
        parentNode: null
      };
      defaultTreeAdapter.appendChild(document, node);
    }
  },
  setDocumentMode(document, mode) {
    document.mode = mode;
  },
  getDocumentMode(document) {
    return document.mode;
  },
  detachNode(node) {
    if (node.parentNode) {
      const idx = node.parentNode.childNodes.indexOf(node);
      node.parentNode.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  },
  insertText(parentNode, text) {
    if (parentNode.childNodes.length > 0) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
      if (defaultTreeAdapter.isTextNode(prevNode)) {
        prevNode.value += text;
        return;
      }
    }
    defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text));
  },
  insertTextBefore(parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
      prevNode.value += text;
    } else {
      defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text), referenceNode);
    }
  },
  adoptAttributes(recipient, attrs) {
    const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
    for (let j2 = 0; j2 < attrs.length; j2++) {
      if (!recipientAttrsMap.has(attrs[j2].name)) {
        recipient.attrs.push(attrs[j2]);
      }
    }
  },
  //Tree traversing
  getFirstChild(node) {
    return node.childNodes[0];
  },
  getChildNodes(node) {
    return node.childNodes;
  },
  getParentNode(node) {
    return node.parentNode;
  },
  getAttrList(element2) {
    return element2.attrs;
  },
  //Node data
  getTagName(element2) {
    return element2.tagName;
  },
  getNamespaceURI(element2) {
    return element2.namespaceURI;
  },
  getTextNodeContent(textNode) {
    return textNode.value;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    return doctypeNode.name;
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    return doctypeNode.publicId;
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    return doctypeNode.systemId;
  },
  //Node types
  isTextNode(node) {
    return node.nodeName === "#text";
  },
  isCommentNode(node) {
    return node.nodeName === "#comment";
  },
  isDocumentTypeNode(node) {
    return node.nodeName === "#documentType";
  },
  isElementNode(node) {
    return Object.prototype.hasOwnProperty.call(node, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(node, location2) {
    node.sourceCodeLocation = location2;
  },
  getNodeSourceCodeLocation(node) {
    return node.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node, endLocation) {
    node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
  }
};
var VALID_DOCTYPE_NAME = "html";
var VALID_SYSTEM_ID = "about:legacy-compat";
var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
];
var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
var QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]);
var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function hasPrefix(publicId, prefixes) {
  return prefixes.some((prefix) => publicId.startsWith(prefix));
}
function isConforming(token) {
  return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token) {
  if (token.name !== VALID_DOCTYPE_NAME) {
    return DOCUMENT_MODE.QUIRKS;
  }
  const { systemId } = token;
  if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
    return DOCUMENT_MODE.QUIRKS;
  }
  let { publicId } = token;
  if (publicId !== null) {
    publicId = publicId.toLowerCase();
    if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.LIMITED_QUIRKS;
    }
  }
  return DOCUMENT_MODE.NO_QUIRKS;
}
var MIME_TYPES = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
};
var DEFINITION_URL_ATTR = "definitionurl";
var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
var SVG_ATTRS_ADJUSTMENT_MAP = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr]));
var XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
]);
var SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((tn2) => [tn2.toLowerCase(), tn2]));
var EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
  TAG_ID.B,
  TAG_ID.BIG,
  TAG_ID.BLOCKQUOTE,
  TAG_ID.BODY,
  TAG_ID.BR,
  TAG_ID.CENTER,
  TAG_ID.CODE,
  TAG_ID.DD,
  TAG_ID.DIV,
  TAG_ID.DL,
  TAG_ID.DT,
  TAG_ID.EM,
  TAG_ID.EMBED,
  TAG_ID.H1,
  TAG_ID.H2,
  TAG_ID.H3,
  TAG_ID.H4,
  TAG_ID.H5,
  TAG_ID.H6,
  TAG_ID.HEAD,
  TAG_ID.HR,
  TAG_ID.I,
  TAG_ID.IMG,
  TAG_ID.LI,
  TAG_ID.LISTING,
  TAG_ID.MENU,
  TAG_ID.META,
  TAG_ID.NOBR,
  TAG_ID.OL,
  TAG_ID.P,
  TAG_ID.PRE,
  TAG_ID.RUBY,
  TAG_ID.S,
  TAG_ID.SMALL,
  TAG_ID.SPAN,
  TAG_ID.STRONG,
  TAG_ID.STRIKE,
  TAG_ID.SUB,
  TAG_ID.SUP,
  TAG_ID.TABLE,
  TAG_ID.TT,
  TAG_ID.U,
  TAG_ID.UL,
  TAG_ID.VAR
]);
function causesExit(startTagToken) {
  const tn2 = startTagToken.tagID;
  const isFontWithAttrs = tn2 === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
  return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn2);
}
function adjustTokenMathMLAttrs(token) {
  for (let i2 = 0; i2 < token.attrs.length; i2++) {
    if (token.attrs[i2].name === DEFINITION_URL_ATTR) {
      token.attrs[i2].name = ADJUSTED_DEFINITION_URL_ATTR;
      break;
    }
  }
}
function adjustTokenSVGAttrs(token) {
  for (let i2 = 0; i2 < token.attrs.length; i2++) {
    const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i2].name);
    if (adjustedAttrName != null) {
      token.attrs[i2].name = adjustedAttrName;
    }
  }
}
function adjustTokenXMLAttrs(token) {
  for (let i2 = 0; i2 < token.attrs.length; i2++) {
    const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i2].name);
    if (adjustedAttrEntry) {
      token.attrs[i2].prefix = adjustedAttrEntry.prefix;
      token.attrs[i2].name = adjustedAttrEntry.name;
      token.attrs[i2].namespace = adjustedAttrEntry.namespace;
    }
  }
}
function adjustTokenSVGTagName(token) {
  const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
  if (adjustedTagName != null) {
    token.tagName = adjustedTagName;
    token.tagID = getTagID(token.tagName);
  }
}
function isMathMLTextIntegrationPoint(tn2, ns2) {
  return ns2 === NS.MATHML && (tn2 === TAG_ID.MI || tn2 === TAG_ID.MO || tn2 === TAG_ID.MN || tn2 === TAG_ID.MS || tn2 === TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn2, ns2, attrs) {
  if (ns2 === NS.MATHML && tn2 === TAG_ID.ANNOTATION_XML) {
    for (let i2 = 0; i2 < attrs.length; i2++) {
      if (attrs[i2].name === ATTRS.ENCODING) {
        const value = attrs[i2].value.toLowerCase();
        return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
      }
    }
  }
  return ns2 === NS.SVG && (tn2 === TAG_ID.FOREIGN_OBJECT || tn2 === TAG_ID.DESC || tn2 === TAG_ID.TITLE);
}
function isIntegrationPoint(tn2, ns2, attrs, foreignNS) {
  return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn2, ns2, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn2, ns2);
}
var HIDDEN_INPUT_TYPE = "hidden";
var AA_OUTER_LOOP_ITER = 8;
var AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode2) {
  InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
  InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
  InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
  InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
  InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
  InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
  InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
  InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
  InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
  InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
  InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
  InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
  InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
  InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
  InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
  InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
  InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
var BASE_LOC = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
};
var TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
var defaultParserOptions = {
  scriptingEnabled: true,
  sourceCodeLocationInfo: false,
  treeAdapter: defaultTreeAdapter,
  onParseError: null
};
var Parser = class {
  constructor(options, document, fragmentContext = null, scriptHandler = null) {
    this.fragmentContext = fragmentContext;
    this.scriptHandler = scriptHandler;
    this.currentToken = null;
    this.stopped = false;
    this.insertionMode = InsertionMode.INITIAL;
    this.originalInsertionMode = InsertionMode.INITIAL;
    this.headElement = null;
    this.formElement = null;
    this.currentNotInHTML = false;
    this.tmplInsertionModeStack = [];
    this.pendingCharacterTokens = [];
    this.hasNonWhitespacePendingCharacterToken = false;
    this.framesetOk = true;
    this.skipNextNewLine = false;
    this.fosterParentingEnabled = false;
    this.options = {
      ...defaultParserOptions,
      ...options
    };
    this.treeAdapter = this.options.treeAdapter;
    this.onParseError = this.options.onParseError;
    if (this.onParseError) {
      this.options.sourceCodeLocationInfo = true;
    }
    this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
    this.tokenizer = new Tokenizer(this.options, this);
    this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
    this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
    this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
    this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
  }
  // API
  static parse(html3, options) {
    const parser = new this(options);
    parser.tokenizer.write(html3, true);
    return parser.document;
  }
  static getFragmentParser(fragmentContext, options) {
    const opts = {
      ...defaultParserOptions,
      ...options
    };
    fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []);
    const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
    const parser = new this(opts, documentMock, fragmentContext);
    if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
      parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
    }
    parser._initTokenizerForFragmentParsing();
    parser._insertFakeRootElement();
    parser._resetInsertionMode();
    parser._findFormInFragmentContext();
    return parser;
  }
  getFragment() {
    const rootElement = this.treeAdapter.getFirstChild(this.document);
    const fragment = this.treeAdapter.createDocumentFragment();
    this._adoptNodes(rootElement, fragment);
    return fragment;
  }
  //Errors
  /** @internal */
  _err(token, code, beforeToken) {
    var _a22;
    if (!this.onParseError)
      return;
    const loc = (_a22 = token.location) !== null && _a22 !== void 0 ? _a22 : BASE_LOC;
    const err = {
      code,
      startLine: loc.startLine,
      startCol: loc.startCol,
      startOffset: loc.startOffset,
      endLine: beforeToken ? loc.startLine : loc.endLine,
      endCol: beforeToken ? loc.startCol : loc.endCol,
      endOffset: beforeToken ? loc.startOffset : loc.endOffset
    };
    this.onParseError(err);
  }
  //Stack events
  /** @internal */
  onItemPush(node, tid, isTop) {
    var _a22, _b2;
    (_b2 = (_a22 = this.treeAdapter).onItemPush) === null || _b2 === void 0 ? void 0 : _b2.call(_a22, node);
    if (isTop && this.openElements.stackTop > 0)
      this._setContextModes(node, tid);
  }
  /** @internal */
  onItemPop(node, isTop) {
    var _a22, _b2;
    if (this.options.sourceCodeLocationInfo) {
      this._setEndLocation(node, this.currentToken);
    }
    (_b2 = (_a22 = this.treeAdapter).onItemPop) === null || _b2 === void 0 ? void 0 : _b2.call(_a22, node, this.openElements.current);
    if (isTop) {
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      this._setContextModes(current, currentTagId);
    }
  }
  _setContextModes(current, tid) {
    const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
    this.currentNotInHTML = !isHTML;
    this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
  }
  /** @protected */
  _switchToTextParsing(currentToken, nextTokenizerState) {
    this._insertElement(currentToken, NS.HTML);
    this.tokenizer.state = nextTokenizerState;
    this.originalInsertionMode = this.insertionMode;
    this.insertionMode = InsertionMode.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = InsertionMode.TEXT;
    this.originalInsertionMode = InsertionMode.IN_BODY;
    this.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  //Fragment parsing
  /** @protected */
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  /** @protected */
  _findFormInFragmentContext() {
    let node = this.fragmentContext;
    while (node) {
      if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
        this.formElement = node;
        break;
      }
      node = this.treeAdapter.getParentNode(node);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
      return;
    }
    switch (this.fragmentContextID) {
      case TAG_ID.TITLE:
      case TAG_ID.TEXTAREA: {
        this.tokenizer.state = TokenizerMode.RCDATA;
        break;
      }
      case TAG_ID.STYLE:
      case TAG_ID.XMP:
      case TAG_ID.IFRAME:
      case TAG_ID.NOEMBED:
      case TAG_ID.NOFRAMES:
      case TAG_ID.NOSCRIPT: {
        this.tokenizer.state = TokenizerMode.RAWTEXT;
        break;
      }
      case TAG_ID.SCRIPT: {
        this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
        break;
      }
      case TAG_ID.PLAINTEXT: {
        this.tokenizer.state = TokenizerMode.PLAINTEXT;
        break;
      }
      default:
    }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(token) {
    const name = token.name || "";
    const publicId = token.publicId || "";
    const systemId = token.systemId || "";
    this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
    if (token.location) {
      const documentChildren = this.treeAdapter.getChildNodes(this.document);
      const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
      if (docTypeNode) {
        this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
      }
    }
  }
  /** @protected */
  _attachElementToTree(element2, location2) {
    if (this.options.sourceCodeLocationInfo) {
      const loc = location2 && {
        ...location2,
        startTag: location2
      };
      this.treeAdapter.setNodeSourceCodeLocation(element2, loc);
    }
    if (this._shouldFosterParentOnInsertion()) {
      this._fosterParentElement(element2);
    } else {
      const parent = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element2);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(token, namespaceURI) {
    const element2 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element2, token.location);
  }
  /** @protected */
  _insertElement(token, namespaceURI) {
    const element2 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element2, token.location);
    this.openElements.push(element2, token.tagID);
  }
  /** @protected */
  _insertFakeElement(tagName, tagID) {
    const element2 = this.treeAdapter.createElement(tagName, NS.HTML, []);
    this._attachElementToTree(element2, null);
    this.openElements.push(element2, tagID);
  }
  /** @protected */
  _insertTemplate(token) {
    const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
    const content = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(tmpl, content);
    this._attachElementToTree(tmpl, token.location);
    this.openElements.push(tmpl, token.tagID);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(content, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const element2 = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(element2, null);
    this.treeAdapter.appendChild(this.openElements.current, element2);
    this.openElements.push(element2, TAG_ID.HTML);
  }
  /** @protected */
  _appendCommentNode(token, parent) {
    const commentNode = this.treeAdapter.createCommentNode(token.data);
    this.treeAdapter.appendChild(parent, commentNode);
    if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
    }
  }
  /** @protected */
  _insertCharacters(token) {
    let parent;
    let beforeElement;
    if (this._shouldFosterParentOnInsertion()) {
      ({ parent, beforeElement } = this._findFosterParentingLocation());
      if (beforeElement) {
        this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
      } else {
        this.treeAdapter.insertText(parent, token.chars);
      }
    } else {
      parent = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.insertText(parent, token.chars);
    }
    if (!token.location)
      return;
    const siblings = this.treeAdapter.getChildNodes(parent);
    const textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length;
    const textNode = siblings[textNodeIdx - 1];
    const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
    if (tnLoc) {
      const { endLine, endCol, endOffset } = token.location;
      this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
    } else if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
    }
  }
  /** @protected */
  _adoptNodes(donor, recipient) {
    for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
      this.treeAdapter.detachNode(child);
      this.treeAdapter.appendChild(recipient, child);
    }
  }
  /** @protected */
  _setEndLocation(element2, closingToken) {
    if (this.treeAdapter.getNodeSourceCodeLocation(element2) && closingToken.location) {
      const ctLoc = closingToken.location;
      const tn2 = this.treeAdapter.getTagName(element2);
      const endLoc = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        closingToken.type === TokenType.END_TAG && tn2 === closingToken.tagName ? {
          endTag: { ...ctLoc },
          endLine: ctLoc.endLine,
          endCol: ctLoc.endCol,
          endOffset: ctLoc.endOffset
        } : {
          endLine: ctLoc.startLine,
          endCol: ctLoc.startCol,
          endOffset: ctLoc.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(element2, endLoc);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(token) {
    if (!this.currentNotInHTML)
      return false;
    let current;
    let currentTagId;
    if (this.openElements.stackTop === 0 && this.fragmentContext) {
      current = this.fragmentContext;
      currentTagId = this.fragmentContextID;
    } else {
      ({ current, currentTagId } = this.openElements);
    }
    if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
      return false;
    }
    return (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML)
    );
  }
  /** @protected */
  _processToken(token) {
    switch (token.type) {
      case TokenType.CHARACTER: {
        this.onCharacter(token);
        break;
      }
      case TokenType.NULL_CHARACTER: {
        this.onNullCharacter(token);
        break;
      }
      case TokenType.COMMENT: {
        this.onComment(token);
        break;
      }
      case TokenType.DOCTYPE: {
        this.onDoctype(token);
        break;
      }
      case TokenType.START_TAG: {
        this._processStartTag(token);
        break;
      }
      case TokenType.END_TAG: {
        this.onEndTag(token);
        break;
      }
      case TokenType.EOF: {
        this.onEof(token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(token);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(tid, element2, foreignNS) {
    const ns2 = this.treeAdapter.getNamespaceURI(element2);
    const attrs = this.treeAdapter.getAttrList(element2);
    return isIntegrationPoint(tid, ns2, attrs, foreignNS);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const listLength = this.activeFormattingElements.entries.length;
    if (listLength) {
      const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
      const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
      for (let i2 = unopenIdx; i2 >= 0; i2--) {
        const entry = this.activeFormattingElements.entries[i2];
        this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
        entry.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags();
    this.openElements.popUntilTableCellPopped();
    this.activeFormattingElements.clearToLastMarker();
    this.insertionMode = InsertionMode.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
    this.openElements.popUntilTagNamePopped(TAG_ID.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let i2 = this.openElements.stackTop; i2 >= 0; i2--) {
      switch (i2 === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i2]) {
        case TAG_ID.TR: {
          this.insertionMode = InsertionMode.IN_ROW;
          return;
        }
        case TAG_ID.TBODY:
        case TAG_ID.THEAD:
        case TAG_ID.TFOOT: {
          this.insertionMode = InsertionMode.IN_TABLE_BODY;
          return;
        }
        case TAG_ID.CAPTION: {
          this.insertionMode = InsertionMode.IN_CAPTION;
          return;
        }
        case TAG_ID.COLGROUP: {
          this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
          return;
        }
        case TAG_ID.TABLE: {
          this.insertionMode = InsertionMode.IN_TABLE;
          return;
        }
        case TAG_ID.BODY: {
          this.insertionMode = InsertionMode.IN_BODY;
          return;
        }
        case TAG_ID.FRAMESET: {
          this.insertionMode = InsertionMode.IN_FRAMESET;
          return;
        }
        case TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(i2);
          return;
        }
        case TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case TAG_ID.HTML: {
          this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
          return;
        }
        case TAG_ID.TD:
        case TAG_ID.TH: {
          if (i2 > 0) {
            this.insertionMode = InsertionMode.IN_CELL;
            return;
          }
          break;
        }
        case TAG_ID.HEAD: {
          if (i2 > 0) {
            this.insertionMode = InsertionMode.IN_HEAD;
            return;
          }
          break;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(selectIdx) {
    if (selectIdx > 0) {
      for (let i2 = selectIdx - 1; i2 > 0; i2--) {
        const tn2 = this.openElements.tagIDs[i2];
        if (tn2 === TAG_ID.TEMPLATE) {
          break;
        } else if (tn2 === TAG_ID.TABLE) {
          this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
          return;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(tn2) {
    return TABLE_STRUCTURE_TAGS.has(tn2);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let i2 = this.openElements.stackTop; i2 >= 0; i2--) {
      const openElement = this.openElements.items[i2];
      switch (this.openElements.tagIDs[i2]) {
        case TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
            return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
          }
          break;
        }
        case TAG_ID.TABLE: {
          const parent = this.treeAdapter.getParentNode(openElement);
          if (parent) {
            return { parent, beforeElement: openElement };
          }
          return { parent: this.openElements.items[i2 - 1], beforeElement: null };
        }
        default:
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(element2) {
    const location2 = this._findFosterParentingLocation();
    if (location2.beforeElement) {
      this.treeAdapter.insertBefore(location2.parent, element2, location2.beforeElement);
    } else {
      this.treeAdapter.appendChild(location2.parent, element2);
    }
  }
  //Special elements
  /** @protected */
  _isSpecialElement(element2, id2) {
    const ns2 = this.treeAdapter.getNamespaceURI(element2);
    return SPECIAL_ELEMENTS[ns2].has(id2);
  }
  /** @internal */
  onCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      characterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE: {
        characterInBody(this, token);
        break;
      }
      case InsertionMode.TEXT:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        characterInTableText(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onNullCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      nullCharacterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onComment(token) {
    this.skipNextNewLine = false;
    if (this.currentNotInHTML) {
      appendComment(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL:
      case InsertionMode.BEFORE_HTML:
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        appendComment(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        appendCommentToRootHtmlElement(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        appendCommentToDocument(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onDoctype(token) {
    this.skipNextNewLine = false;
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        doctypeInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD: {
        this._err(token, ERR.misplacedDoctype);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onStartTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    this._processStartTag(token);
    if (token.selfClosing && !token.ackSelfClosing) {
      this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   * @protected
   */
  _processStartTag(token) {
    if (this.shouldProcessStartTagTokenInForeignContent(token)) {
      startTagInForeignContent(this, token);
    } else {
      this._startTagOutsideForeignContent(token);
    }
  }
  /** @protected */
  _startTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        startTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        startTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        startTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        startTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        startTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        startTagInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        startTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        startTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        startTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        startTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        startTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        startTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        startTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        startTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        startTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        startTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        startTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        startTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        startTagAfterAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        startTagAfterAfterFrameset(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEndTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    if (this.currentNotInHTML) {
      endTagInForeignContent(this, token);
    } else {
      this._endTagOutsideForeignContent(token);
    }
  }
  /** @protected */
  _endTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        endTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        endTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        endTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        endTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        endTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        endTagInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        endTagInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        endTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        endTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        endTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        endTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        endTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        endTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        endTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        endTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        endTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        endTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        endTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        endTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEof(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        eofInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        eofInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        eofInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        stopParsing(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onWhitespaceCharacter(token) {
    if (this.skipNextNewLine) {
      this.skipNextNewLine = false;
      if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
        if (token.chars.length === 1) {
          return;
        }
        token.chars = token.chars.substr(1);
      }
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.TEXT:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.AFTER_BODY:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        whitespaceCharacterInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        whitespaceCharacterInTableText(this, token);
        break;
      }
      default:
    }
  }
};
function aaObtainFormattingElementEntry(p2, token) {
  let formattingElementEntry = p2.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
  if (formattingElementEntry) {
    if (!p2.openElements.contains(formattingElementEntry.element)) {
      p2.activeFormattingElements.removeEntry(formattingElementEntry);
      formattingElementEntry = null;
    } else if (!p2.openElements.hasInScope(token.tagID)) {
      formattingElementEntry = null;
    }
  } else {
    genericEndTagInBody(p2, token);
  }
  return formattingElementEntry;
}
function aaObtainFurthestBlock(p2, formattingElementEntry) {
  let furthestBlock = null;
  let idx = p2.openElements.stackTop;
  for (; idx >= 0; idx--) {
    const element2 = p2.openElements.items[idx];
    if (element2 === formattingElementEntry.element) {
      break;
    }
    if (p2._isSpecialElement(element2, p2.openElements.tagIDs[idx])) {
      furthestBlock = element2;
    }
  }
  if (!furthestBlock) {
    p2.openElements.shortenToLength(Math.max(idx, 0));
    p2.activeFormattingElements.removeEntry(formattingElementEntry);
  }
  return furthestBlock;
}
function aaInnerLoop(p2, furthestBlock, formattingElement) {
  let lastElement = furthestBlock;
  let nextElement = p2.openElements.getCommonAncestor(furthestBlock);
  for (let i2 = 0, element2 = nextElement; element2 !== formattingElement; i2++, element2 = nextElement) {
    nextElement = p2.openElements.getCommonAncestor(element2);
    const elementEntry = p2.activeFormattingElements.getElementEntry(element2);
    const counterOverflow = elementEntry && i2 >= AA_INNER_LOOP_ITER;
    const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
    if (shouldRemoveFromOpenElements) {
      if (counterOverflow) {
        p2.activeFormattingElements.removeEntry(elementEntry);
      }
      p2.openElements.remove(element2);
    } else {
      element2 = aaRecreateElementFromEntry(p2, elementEntry);
      if (lastElement === furthestBlock) {
        p2.activeFormattingElements.bookmark = elementEntry;
      }
      p2.treeAdapter.detachNode(lastElement);
      p2.treeAdapter.appendChild(element2, lastElement);
      lastElement = element2;
    }
  }
  return lastElement;
}
function aaRecreateElementFromEntry(p2, elementEntry) {
  const ns2 = p2.treeAdapter.getNamespaceURI(elementEntry.element);
  const newElement = p2.treeAdapter.createElement(elementEntry.token.tagName, ns2, elementEntry.token.attrs);
  p2.openElements.replace(elementEntry.element, newElement);
  elementEntry.element = newElement;
  return newElement;
}
function aaInsertLastNodeInCommonAncestor(p2, commonAncestor, lastElement) {
  const tn2 = p2.treeAdapter.getTagName(commonAncestor);
  const tid = getTagID(tn2);
  if (p2._isElementCausesFosterParenting(tid)) {
    p2._fosterParentElement(lastElement);
  } else {
    const ns2 = p2.treeAdapter.getNamespaceURI(commonAncestor);
    if (tid === TAG_ID.TEMPLATE && ns2 === NS.HTML) {
      commonAncestor = p2.treeAdapter.getTemplateContent(commonAncestor);
    }
    p2.treeAdapter.appendChild(commonAncestor, lastElement);
  }
}
function aaReplaceFormattingElement(p2, furthestBlock, formattingElementEntry) {
  const ns2 = p2.treeAdapter.getNamespaceURI(formattingElementEntry.element);
  const { token } = formattingElementEntry;
  const newElement = p2.treeAdapter.createElement(token.tagName, ns2, token.attrs);
  p2._adoptNodes(furthestBlock, newElement);
  p2.treeAdapter.appendChild(furthestBlock, newElement);
  p2.activeFormattingElements.insertElementAfterBookmark(newElement, token);
  p2.activeFormattingElements.removeEntry(formattingElementEntry);
  p2.openElements.remove(formattingElementEntry.element);
  p2.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p2, token) {
  for (let i2 = 0; i2 < AA_OUTER_LOOP_ITER; i2++) {
    const formattingElementEntry = aaObtainFormattingElementEntry(p2, token);
    if (!formattingElementEntry) {
      break;
    }
    const furthestBlock = aaObtainFurthestBlock(p2, formattingElementEntry);
    if (!furthestBlock) {
      break;
    }
    p2.activeFormattingElements.bookmark = formattingElementEntry;
    const lastElement = aaInnerLoop(p2, furthestBlock, formattingElementEntry.element);
    const commonAncestor = p2.openElements.getCommonAncestor(formattingElementEntry.element);
    p2.treeAdapter.detachNode(lastElement);
    if (commonAncestor)
      aaInsertLastNodeInCommonAncestor(p2, commonAncestor, lastElement);
    aaReplaceFormattingElement(p2, furthestBlock, formattingElementEntry);
  }
}
function appendComment(p2, token) {
  p2._appendCommentNode(token, p2.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p2, token) {
  p2._appendCommentNode(token, p2.openElements.items[0]);
}
function appendCommentToDocument(p2, token) {
  p2._appendCommentNode(token, p2.document);
}
function stopParsing(p2, token) {
  p2.stopped = true;
  if (token.location) {
    const target = p2.fragmentContext ? 0 : 2;
    for (let i2 = p2.openElements.stackTop; i2 >= target; i2--) {
      p2._setEndLocation(p2.openElements.items[i2], token);
    }
    if (!p2.fragmentContext && p2.openElements.stackTop >= 0) {
      const htmlElement = p2.openElements.items[0];
      const htmlLocation = p2.treeAdapter.getNodeSourceCodeLocation(htmlElement);
      if (htmlLocation && !htmlLocation.endTag) {
        p2._setEndLocation(htmlElement, token);
        if (p2.openElements.stackTop >= 1) {
          const bodyElement = p2.openElements.items[1];
          const bodyLocation = p2.treeAdapter.getNodeSourceCodeLocation(bodyElement);
          if (bodyLocation && !bodyLocation.endTag) {
            p2._setEndLocation(bodyElement, token);
          }
        }
      }
    }
  }
}
function doctypeInInitialMode(p2, token) {
  p2._setDocumentType(token);
  const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
  if (!isConforming(token)) {
    p2._err(token, ERR.nonConformingDoctype);
  }
  p2.treeAdapter.setDocumentMode(p2.document, mode);
  p2.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p2, token) {
  p2._err(token, ERR.missingDoctype, true);
  p2.treeAdapter.setDocumentMode(p2.document, DOCUMENT_MODE.QUIRKS);
  p2.insertionMode = InsertionMode.BEFORE_HTML;
  p2._processToken(token);
}
function startTagBeforeHtml(p2, token) {
  if (token.tagID === TAG_ID.HTML) {
    p2._insertElement(token, NS.HTML);
    p2.insertionMode = InsertionMode.BEFORE_HEAD;
  } else {
    tokenBeforeHtml(p2, token);
  }
}
function endTagBeforeHtml(p2, token) {
  const tn2 = token.tagID;
  if (tn2 === TAG_ID.HTML || tn2 === TAG_ID.HEAD || tn2 === TAG_ID.BODY || tn2 === TAG_ID.BR) {
    tokenBeforeHtml(p2, token);
  }
}
function tokenBeforeHtml(p2, token) {
  p2._insertFakeRootElement();
  p2.insertionMode = InsertionMode.BEFORE_HEAD;
  p2._processToken(token);
}
function startTagBeforeHead(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.HEAD: {
      p2._insertElement(token, NS.HTML);
      p2.headElement = p2.openElements.current;
      p2.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    default: {
      tokenBeforeHead(p2, token);
    }
  }
}
function endTagBeforeHead(p2, token) {
  const tn2 = token.tagID;
  if (tn2 === TAG_ID.HEAD || tn2 === TAG_ID.BODY || tn2 === TAG_ID.HTML || tn2 === TAG_ID.BR) {
    tokenBeforeHead(p2, token);
  } else {
    p2._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenBeforeHead(p2, token) {
  p2._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
  p2.headElement = p2.openElements.current;
  p2.insertionMode = InsertionMode.IN_HEAD;
  p2._processToken(token);
}
function startTagInHead(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META: {
      p2._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TITLE: {
      p2._switchToTextParsing(token, TokenizerMode.RCDATA);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p2.options.scriptingEnabled) {
        p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
      } else {
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
      }
      break;
    }
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
      break;
    }
    case TAG_ID.SCRIPT: {
      p2._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
      break;
    }
    case TAG_ID.TEMPLATE: {
      p2._insertTemplate(token);
      p2.activeFormattingElements.insertMarker();
      p2.framesetOk = false;
      p2.insertionMode = InsertionMode.IN_TEMPLATE;
      p2.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      break;
    }
    case TAG_ID.HEAD: {
      p2._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenInHead(p2, token);
    }
  }
}
function endTagInHead(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HEAD: {
      p2.openElements.pop();
      p2.insertionMode = InsertionMode.AFTER_HEAD;
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.BR:
    case TAG_ID.HTML: {
      tokenInHead(p2, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p2, token);
      break;
    }
    default: {
      p2._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function templateEndTagInHead(p2, token) {
  if (p2.openElements.tmplCount > 0) {
    p2.openElements.generateImpliedEndTagsThoroughly();
    if (p2.openElements.currentTagId !== TAG_ID.TEMPLATE) {
      p2._err(token, ERR.closingOfElementWithOpenChildElements);
    }
    p2.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p2.activeFormattingElements.clearToLastMarker();
    p2.tmplInsertionModeStack.shift();
    p2._resetInsertionMode();
  } else {
    p2._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenInHead(p2, token) {
  p2.openElements.pop();
  p2.insertionMode = InsertionMode.AFTER_HEAD;
  p2._processToken(token);
}
function startTagInHeadNoScript(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.HEAD:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      startTagInHead(p2, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      p2._err(token, ERR.nestedNoscriptInHead);
      break;
    }
    default: {
      tokenInHeadNoScript(p2, token);
    }
  }
}
function endTagInHeadNoScript(p2, token) {
  switch (token.tagID) {
    case TAG_ID.NOSCRIPT: {
      p2.openElements.pop();
      p2.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    case TAG_ID.BR: {
      tokenInHeadNoScript(p2, token);
      break;
    }
    default: {
      p2._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenInHeadNoScript(p2, token) {
  const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
  p2._err(token, errCode);
  p2.openElements.pop();
  p2.insertionMode = InsertionMode.IN_HEAD;
  p2._processToken(token);
}
function startTagAfterHead(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.BODY: {
      p2._insertElement(token, NS.HTML);
      p2.framesetOk = false;
      p2.insertionMode = InsertionMode.IN_BODY;
      break;
    }
    case TAG_ID.FRAMESET: {
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = InsertionMode.IN_FRAMESET;
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      p2._err(token, ERR.abandonedHeadElementChild);
      p2.openElements.push(p2.headElement, TAG_ID.HEAD);
      startTagInHead(p2, token);
      p2.openElements.remove(p2.headElement);
      break;
    }
    case TAG_ID.HEAD: {
      p2._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenAfterHead(p2, token);
    }
  }
}
function endTagAfterHead(p2, token) {
  switch (token.tagID) {
    case TAG_ID.BODY:
    case TAG_ID.HTML:
    case TAG_ID.BR: {
      tokenAfterHead(p2, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p2, token);
      break;
    }
    default: {
      p2._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenAfterHead(p2, token) {
  p2._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
  p2.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p2, token);
}
function modeInBody(p2, token) {
  switch (token.type) {
    case TokenType.CHARACTER: {
      characterInBody(p2, token);
      break;
    }
    case TokenType.WHITESPACE_CHARACTER: {
      whitespaceCharacterInBody(p2, token);
      break;
    }
    case TokenType.COMMENT: {
      appendComment(p2, token);
      break;
    }
    case TokenType.START_TAG: {
      startTagInBody(p2, token);
      break;
    }
    case TokenType.END_TAG: {
      endTagInBody(p2, token);
      break;
    }
    case TokenType.EOF: {
      eofInBody(p2, token);
      break;
    }
    default:
  }
}
function whitespaceCharacterInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._insertCharacters(token);
}
function characterInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._insertCharacters(token);
  p2.framesetOk = false;
}
function htmlStartTagInBody(p2, token) {
  if (p2.openElements.tmplCount === 0) {
    p2.treeAdapter.adoptAttributes(p2.openElements.items[0], token.attrs);
  }
}
function bodyStartTagInBody(p2, token) {
  const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
  if (bodyElement && p2.openElements.tmplCount === 0) {
    p2.framesetOk = false;
    p2.treeAdapter.adoptAttributes(bodyElement, token.attrs);
  }
}
function framesetStartTagInBody(p2, token) {
  const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
  if (p2.framesetOk && bodyElement) {
    p2.treeAdapter.detachNode(bodyElement);
    p2.openElements.popAllUpToHtmlElement();
    p2._insertElement(token, NS.HTML);
    p2.insertionMode = InsertionMode.IN_FRAMESET;
  }
}
function addressStartTagInBody(p2, token) {
  if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  p2._insertElement(token, NS.HTML);
}
function numberedHeaderStartTagInBody(p2, token) {
  if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  if (p2.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p2.openElements.currentTagId)) {
    p2.openElements.pop();
  }
  p2._insertElement(token, NS.HTML);
}
function preStartTagInBody(p2, token) {
  if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  p2._insertElement(token, NS.HTML);
  p2.skipNextNewLine = true;
  p2.framesetOk = false;
}
function formStartTagInBody(p2, token) {
  const inTemplate = p2.openElements.tmplCount > 0;
  if (!p2.formElement || inTemplate) {
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._insertElement(token, NS.HTML);
    if (!inTemplate) {
      p2.formElement = p2.openElements.current;
    }
  }
}
function listItemStartTagInBody(p2, token) {
  p2.framesetOk = false;
  const tn2 = token.tagID;
  for (let i2 = p2.openElements.stackTop; i2 >= 0; i2--) {
    const elementId = p2.openElements.tagIDs[i2];
    if (tn2 === TAG_ID.LI && elementId === TAG_ID.LI || (tn2 === TAG_ID.DD || tn2 === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
      p2.openElements.generateImpliedEndTagsWithExclusion(elementId);
      p2.openElements.popUntilTagNamePopped(elementId);
      break;
    }
    if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p2._isSpecialElement(p2.openElements.items[i2], elementId)) {
      break;
    }
  }
  if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  p2._insertElement(token, NS.HTML);
}
function plaintextStartTagInBody(p2, token) {
  if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  p2._insertElement(token, NS.HTML);
  p2.tokenizer.state = TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p2, token) {
  if (p2.openElements.hasInScope(TAG_ID.BUTTON)) {
    p2.openElements.generateImpliedEndTags();
    p2.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
  }
  p2._reconstructActiveFormattingElements();
  p2._insertElement(token, NS.HTML);
  p2.framesetOk = false;
}
function aStartTagInBody(p2, token) {
  const activeElementEntry = p2.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
  if (activeElementEntry) {
    callAdoptionAgency(p2, token);
    p2.openElements.remove(activeElementEntry.element);
    p2.activeFormattingElements.removeEntry(activeElementEntry);
  }
  p2._reconstructActiveFormattingElements();
  p2._insertElement(token, NS.HTML);
  p2.activeFormattingElements.pushElement(p2.openElements.current, token);
}
function bStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._insertElement(token, NS.HTML);
  p2.activeFormattingElements.pushElement(p2.openElements.current, token);
}
function nobrStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  if (p2.openElements.hasInScope(TAG_ID.NOBR)) {
    callAdoptionAgency(p2, token);
    p2._reconstructActiveFormattingElements();
  }
  p2._insertElement(token, NS.HTML);
  p2.activeFormattingElements.pushElement(p2.openElements.current, token);
}
function appletStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._insertElement(token, NS.HTML);
  p2.activeFormattingElements.insertMarker();
  p2.framesetOk = false;
}
function tableStartTagInBody(p2, token) {
  if (p2.treeAdapter.getDocumentMode(p2.document) !== DOCUMENT_MODE.QUIRKS && p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  p2._insertElement(token, NS.HTML);
  p2.framesetOk = false;
  p2.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._appendElement(token, NS.HTML);
  p2.framesetOk = false;
  token.ackSelfClosing = true;
}
function isHiddenInput(token) {
  const inputType = getTokenAttr(token, ATTRS.TYPE);
  return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._appendElement(token, NS.HTML);
  if (!isHiddenInput(token)) {
    p2.framesetOk = false;
  }
  token.ackSelfClosing = true;
}
function paramStartTagInBody(p2, token) {
  p2._appendElement(token, NS.HTML);
  token.ackSelfClosing = true;
}
function hrStartTagInBody(p2, token) {
  if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  p2._appendElement(token, NS.HTML);
  p2.framesetOk = false;
  token.ackSelfClosing = true;
}
function imageStartTagInBody(p2, token) {
  token.tagName = TAG_NAMES.IMG;
  token.tagID = TAG_ID.IMG;
  areaStartTagInBody(p2, token);
}
function textareaStartTagInBody(p2, token) {
  p2._insertElement(token, NS.HTML);
  p2.skipNextNewLine = true;
  p2.tokenizer.state = TokenizerMode.RCDATA;
  p2.originalInsertionMode = p2.insertionMode;
  p2.framesetOk = false;
  p2.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p2, token) {
  if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._closePElement();
  }
  p2._reconstructActiveFormattingElements();
  p2.framesetOk = false;
  p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p2, token) {
  p2.framesetOk = false;
  p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function rawTextStartTagInBody(p2, token) {
  p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._insertElement(token, NS.HTML);
  p2.framesetOk = false;
  p2.insertionMode = p2.insertionMode === InsertionMode.IN_TABLE || p2.insertionMode === InsertionMode.IN_CAPTION || p2.insertionMode === InsertionMode.IN_TABLE_BODY || p2.insertionMode === InsertionMode.IN_ROW || p2.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p2, token) {
  if (p2.openElements.currentTagId === TAG_ID.OPTION) {
    p2.openElements.pop();
  }
  p2._reconstructActiveFormattingElements();
  p2._insertElement(token, NS.HTML);
}
function rbStartTagInBody(p2, token) {
  if (p2.openElements.hasInScope(TAG_ID.RUBY)) {
    p2.openElements.generateImpliedEndTags();
  }
  p2._insertElement(token, NS.HTML);
}
function rtStartTagInBody(p2, token) {
  if (p2.openElements.hasInScope(TAG_ID.RUBY)) {
    p2.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
  }
  p2._insertElement(token, NS.HTML);
}
function mathStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  adjustTokenMathMLAttrs(token);
  adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p2._appendElement(token, NS.MATHML);
  } else {
    p2._insertElement(token, NS.MATHML);
  }
  token.ackSelfClosing = true;
}
function svgStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  adjustTokenSVGAttrs(token);
  adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p2._appendElement(token, NS.SVG);
  } else {
    p2._insertElement(token, NS.SVG);
  }
  token.ackSelfClosing = true;
}
function genericStartTagInBody(p2, token) {
  p2._reconstructActiveFormattingElements();
  p2._insertElement(token, NS.HTML);
}
function startTagInBody(p2, token) {
  switch (token.tagID) {
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.B:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      bStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.A: {
      aStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.P:
    case TAG_ID.DL:
    case TAG_ID.OL:
    case TAG_ID.UL:
    case TAG_ID.DIV:
    case TAG_ID.DIR:
    case TAG_ID.NAV:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.DETAILS:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.SEARCH:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.LI:
    case TAG_ID.DD:
    case TAG_ID.DT: {
      listItemStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.BR:
    case TAG_ID.IMG:
    case TAG_ID.WBR:
    case TAG_ID.AREA:
    case TAG_ID.EMBED:
    case TAG_ID.KEYGEN: {
      areaStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.HR: {
      hrStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.RB:
    case TAG_ID.RTC: {
      rbStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.RT:
    case TAG_ID.RP: {
      rtStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.PRE:
    case TAG_ID.LISTING: {
      preStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.XMP: {
      xmpStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.SVG: {
      svgStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.STYLE:
    case TAG_ID.TITLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.BGSOUND:
    case TAG_ID.BASEFONT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p2, token);
      break;
    }
    case TAG_ID.BODY: {
      bodyStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.NOBR: {
      nobrStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.MATH: {
      mathStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.PARAM:
    case TAG_ID.TRACK:
    case TAG_ID.SOURCE: {
      paramStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.IMAGE: {
      imageStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.BUTTON: {
      buttonStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.IFRAME: {
      iframeStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.SELECT: {
      selectStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.OPTION:
    case TAG_ID.OPTGROUP: {
      optgroupStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.NOEMBED:
    case TAG_ID.NOFRAMES: {
      rawTextStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      framesetStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.TEXTAREA: {
      textareaStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p2.options.scriptingEnabled) {
        rawTextStartTagInBody(p2, token);
      } else {
        genericStartTagInBody(p2, token);
      }
      break;
    }
    case TAG_ID.PLAINTEXT: {
      plaintextStartTagInBody(p2, token);
      break;
    }
    case TAG_ID.COL:
    case TAG_ID.TH:
    case TAG_ID.TD:
    case TAG_ID.TR:
    case TAG_ID.HEAD:
    case TAG_ID.FRAME:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP: {
      break;
    }
    default: {
      genericStartTagInBody(p2, token);
    }
  }
}
function bodyEndTagInBody(p2, token) {
  if (p2.openElements.hasInScope(TAG_ID.BODY)) {
    p2.insertionMode = InsertionMode.AFTER_BODY;
    if (p2.options.sourceCodeLocationInfo) {
      const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement) {
        p2._setEndLocation(bodyElement, token);
      }
    }
  }
}
function htmlEndTagInBody(p2, token) {
  if (p2.openElements.hasInScope(TAG_ID.BODY)) {
    p2.insertionMode = InsertionMode.AFTER_BODY;
    endTagAfterBody(p2, token);
  }
}
function addressEndTagInBody(p2, token) {
  const tn2 = token.tagID;
  if (p2.openElements.hasInScope(tn2)) {
    p2.openElements.generateImpliedEndTags();
    p2.openElements.popUntilTagNamePopped(tn2);
  }
}
function formEndTagInBody(p2) {
  const inTemplate = p2.openElements.tmplCount > 0;
  const { formElement } = p2;
  if (!inTemplate) {
    p2.formElement = null;
  }
  if ((formElement || inTemplate) && p2.openElements.hasInScope(TAG_ID.FORM)) {
    p2.openElements.generateImpliedEndTags();
    if (inTemplate) {
      p2.openElements.popUntilTagNamePopped(TAG_ID.FORM);
    } else if (formElement) {
      p2.openElements.remove(formElement);
    }
  }
}
function pEndTagInBody(p2) {
  if (!p2.openElements.hasInButtonScope(TAG_ID.P)) {
    p2._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
  }
  p2._closePElement();
}
function liEndTagInBody(p2) {
  if (p2.openElements.hasInListItemScope(TAG_ID.LI)) {
    p2.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
    p2.openElements.popUntilTagNamePopped(TAG_ID.LI);
  }
}
function ddEndTagInBody(p2, token) {
  const tn2 = token.tagID;
  if (p2.openElements.hasInScope(tn2)) {
    p2.openElements.generateImpliedEndTagsWithExclusion(tn2);
    p2.openElements.popUntilTagNamePopped(tn2);
  }
}
function numberedHeaderEndTagInBody(p2) {
  if (p2.openElements.hasNumberedHeaderInScope()) {
    p2.openElements.generateImpliedEndTags();
    p2.openElements.popUntilNumberedHeaderPopped();
  }
}
function appletEndTagInBody(p2, token) {
  const tn2 = token.tagID;
  if (p2.openElements.hasInScope(tn2)) {
    p2.openElements.generateImpliedEndTags();
    p2.openElements.popUntilTagNamePopped(tn2);
    p2.activeFormattingElements.clearToLastMarker();
  }
}
function brEndTagInBody(p2) {
  p2._reconstructActiveFormattingElements();
  p2._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
  p2.openElements.pop();
  p2.framesetOk = false;
}
function genericEndTagInBody(p2, token) {
  const tn2 = token.tagName;
  const tid = token.tagID;
  for (let i2 = p2.openElements.stackTop; i2 > 0; i2--) {
    const element2 = p2.openElements.items[i2];
    const elementId = p2.openElements.tagIDs[i2];
    if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p2.treeAdapter.getTagName(element2) === tn2)) {
      p2.openElements.generateImpliedEndTagsWithExclusion(tid);
      if (p2.openElements.stackTop >= i2)
        p2.openElements.shortenToLength(i2);
      break;
    }
    if (p2._isSpecialElement(element2, elementId)) {
      break;
    }
  }
}
function endTagInBody(p2, token) {
  switch (token.tagID) {
    case TAG_ID.A:
    case TAG_ID.B:
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.NOBR:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      callAdoptionAgency(p2, token);
      break;
    }
    case TAG_ID.P: {
      pEndTagInBody(p2);
      break;
    }
    case TAG_ID.DL:
    case TAG_ID.UL:
    case TAG_ID.OL:
    case TAG_ID.DIR:
    case TAG_ID.DIV:
    case TAG_ID.NAV:
    case TAG_ID.PRE:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.BUTTON:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.DETAILS:
    case TAG_ID.SEARCH:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.LISTING:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressEndTagInBody(p2, token);
      break;
    }
    case TAG_ID.LI: {
      liEndTagInBody(p2);
      break;
    }
    case TAG_ID.DD:
    case TAG_ID.DT: {
      ddEndTagInBody(p2, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderEndTagInBody(p2);
      break;
    }
    case TAG_ID.BR: {
      brEndTagInBody(p2);
      break;
    }
    case TAG_ID.BODY: {
      bodyEndTagInBody(p2, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlEndTagInBody(p2, token);
      break;
    }
    case TAG_ID.FORM: {
      formEndTagInBody(p2);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletEndTagInBody(p2, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p2, token);
      break;
    }
    default: {
      genericEndTagInBody(p2, token);
    }
  }
}
function eofInBody(p2, token) {
  if (p2.tmplInsertionModeStack.length > 0) {
    eofInTemplate(p2, token);
  } else {
    stopParsing(p2, token);
  }
}
function endTagInText(p2, token) {
  var _a22;
  if (token.tagID === TAG_ID.SCRIPT) {
    (_a22 = p2.scriptHandler) === null || _a22 === void 0 ? void 0 : _a22.call(p2, p2.openElements.current);
  }
  p2.openElements.pop();
  p2.insertionMode = p2.originalInsertionMode;
}
function eofInText(p2, token) {
  p2._err(token, ERR.eofInElementThatCanContainOnlyText);
  p2.openElements.pop();
  p2.insertionMode = p2.originalInsertionMode;
  p2.onEof(token);
}
function characterInTable(p2, token) {
  if (p2.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p2.openElements.currentTagId)) {
    p2.pendingCharacterTokens.length = 0;
    p2.hasNonWhitespacePendingCharacterToken = false;
    p2.originalInsertionMode = p2.insertionMode;
    p2.insertionMode = InsertionMode.IN_TABLE_TEXT;
    switch (token.type) {
      case TokenType.CHARACTER: {
        characterInTableText(p2, token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInTableText(p2, token);
        break;
      }
    }
  } else {
    tokenInTable(p2, token);
  }
}
function captionStartTagInTable(p2, token) {
  p2.openElements.clearBackToTableContext();
  p2.activeFormattingElements.insertMarker();
  p2._insertElement(token, NS.HTML);
  p2.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p2, token) {
  p2.openElements.clearBackToTableContext();
  p2._insertElement(token, NS.HTML);
  p2.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p2, token) {
  p2.openElements.clearBackToTableContext();
  p2._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
  p2.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  startTagInColumnGroup(p2, token);
}
function tbodyStartTagInTable(p2, token) {
  p2.openElements.clearBackToTableContext();
  p2._insertElement(token, NS.HTML);
  p2.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p2, token) {
  p2.openElements.clearBackToTableContext();
  p2._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
  p2.insertionMode = InsertionMode.IN_TABLE_BODY;
  startTagInTableBody(p2, token);
}
function tableStartTagInTable(p2, token) {
  if (p2.openElements.hasInTableScope(TAG_ID.TABLE)) {
    p2.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
    p2._resetInsertionMode();
    p2._processStartTag(token);
  }
}
function inputStartTagInTable(p2, token) {
  if (isHiddenInput(token)) {
    p2._appendElement(token, NS.HTML);
  } else {
    tokenInTable(p2, token);
  }
  token.ackSelfClosing = true;
}
function formStartTagInTable(p2, token) {
  if (!p2.formElement && p2.openElements.tmplCount === 0) {
    p2._insertElement(token, NS.HTML);
    p2.formElement = p2.openElements.current;
    p2.openElements.pop();
  }
}
function startTagInTable(p2, token) {
  switch (token.tagID) {
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      tdStartTagInTable(p2, token);
      break;
    }
    case TAG_ID.STYLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p2, token);
      break;
    }
    case TAG_ID.COL: {
      colStartTagInTable(p2, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInTable(p2, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInTable(p2, token);
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      tbodyStartTagInTable(p2, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInTable(p2, token);
      break;
    }
    case TAG_ID.CAPTION: {
      captionStartTagInTable(p2, token);
      break;
    }
    case TAG_ID.COLGROUP: {
      colgroupStartTagInTable(p2, token);
      break;
    }
    default: {
      tokenInTable(p2, token);
    }
  }
}
function endTagInTable(p2, token) {
  switch (token.tagID) {
    case TAG_ID.TABLE: {
      if (p2.openElements.hasInTableScope(TAG_ID.TABLE)) {
        p2.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
        p2._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p2, token);
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      tokenInTable(p2, token);
    }
  }
}
function tokenInTable(p2, token) {
  const savedFosterParentingState = p2.fosterParentingEnabled;
  p2.fosterParentingEnabled = true;
  modeInBody(p2, token);
  p2.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p2, token) {
  p2.pendingCharacterTokens.push(token);
}
function characterInTableText(p2, token) {
  p2.pendingCharacterTokens.push(token);
  p2.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p2, token) {
  let i2 = 0;
  if (p2.hasNonWhitespacePendingCharacterToken) {
    for (; i2 < p2.pendingCharacterTokens.length; i2++) {
      tokenInTable(p2, p2.pendingCharacterTokens[i2]);
    }
  } else {
    for (; i2 < p2.pendingCharacterTokens.length; i2++) {
      p2._insertCharacters(p2.pendingCharacterTokens[i2]);
    }
  }
  p2.insertionMode = p2.originalInsertionMode;
  p2._processToken(token);
}
var TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
function startTagInCaption(p2, token) {
  const tn2 = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn2)) {
    if (p2.openElements.hasInTableScope(TAG_ID.CAPTION)) {
      p2.openElements.generateImpliedEndTags();
      p2.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
      p2.activeFormattingElements.clearToLastMarker();
      p2.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p2, token);
    }
  } else {
    startTagInBody(p2, token);
  }
}
function endTagInCaption(p2, token) {
  const tn2 = token.tagID;
  switch (tn2) {
    case TAG_ID.CAPTION:
    case TAG_ID.TABLE: {
      if (p2.openElements.hasInTableScope(TAG_ID.CAPTION)) {
        p2.openElements.generateImpliedEndTags();
        p2.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
        p2.activeFormattingElements.clearToLastMarker();
        p2.insertionMode = InsertionMode.IN_TABLE;
        if (tn2 === TAG_ID.TABLE) {
          endTagInTable(p2, token);
        }
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInBody(p2, token);
    }
  }
}
function startTagInColumnGroup(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.COL: {
      p2._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TEMPLATE: {
      startTagInHead(p2, token);
      break;
    }
    default: {
      tokenInColumnGroup(p2, token);
    }
  }
}
function endTagInColumnGroup(p2, token) {
  switch (token.tagID) {
    case TAG_ID.COLGROUP: {
      if (p2.openElements.currentTagId === TAG_ID.COLGROUP) {
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p2, token);
      break;
    }
    case TAG_ID.COL: {
      break;
    }
    default: {
      tokenInColumnGroup(p2, token);
    }
  }
}
function tokenInColumnGroup(p2, token) {
  if (p2.openElements.currentTagId === TAG_ID.COLGROUP) {
    p2.openElements.pop();
    p2.insertionMode = InsertionMode.IN_TABLE;
    p2._processToken(token);
  }
}
function startTagInTableBody(p2, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      p2.openElements.clearBackToTableBodyContext();
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = InsertionMode.IN_ROW;
      break;
    }
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p2.openElements.clearBackToTableBodyContext();
      p2._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
      p2.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p2, token);
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p2.openElements.hasTableBodyContextInTableScope()) {
        p2.openElements.clearBackToTableBodyContext();
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p2, token);
      }
      break;
    }
    default: {
      startTagInTable(p2, token);
    }
  }
}
function endTagInTableBody(p2, token) {
  const tn2 = token.tagID;
  switch (token.tagID) {
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p2.openElements.hasInTableScope(tn2)) {
        p2.openElements.clearBackToTableBodyContext();
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p2.openElements.hasTableBodyContextInTableScope()) {
        p2.openElements.clearBackToTableBodyContext();
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE;
        endTagInTable(p2, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInTable(p2, token);
    }
  }
}
function startTagInRow(p2, token) {
  switch (token.tagID) {
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p2.openElements.clearBackToTableRowContext();
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = InsertionMode.IN_CELL;
      p2.activeFormattingElements.insertMarker();
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p2.openElements.hasInTableScope(TAG_ID.TR)) {
        p2.openElements.clearBackToTableRowContext();
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p2, token);
      }
      break;
    }
    default: {
      startTagInTable(p2, token);
    }
  }
}
function endTagInRow(p2, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      if (p2.openElements.hasInTableScope(TAG_ID.TR)) {
        p2.openElements.clearBackToTableRowContext();
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE_BODY;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p2.openElements.hasInTableScope(TAG_ID.TR)) {
        p2.openElements.clearBackToTableRowContext();
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p2, token);
      }
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p2.openElements.hasInTableScope(token.tagID) || p2.openElements.hasInTableScope(TAG_ID.TR)) {
        p2.openElements.clearBackToTableRowContext();
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p2, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH: {
      break;
    }
    default: {
      endTagInTable(p2, token);
    }
  }
}
function startTagInCell(p2, token) {
  const tn2 = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn2)) {
    if (p2.openElements.hasInTableScope(TAG_ID.TD) || p2.openElements.hasInTableScope(TAG_ID.TH)) {
      p2._closeTableCell();
      startTagInRow(p2, token);
    }
  } else {
    startTagInBody(p2, token);
  }
}
function endTagInCell(p2, token) {
  const tn2 = token.tagID;
  switch (tn2) {
    case TAG_ID.TD:
    case TAG_ID.TH: {
      if (p2.openElements.hasInTableScope(tn2)) {
        p2.openElements.generateImpliedEndTags();
        p2.openElements.popUntilTagNamePopped(tn2);
        p2.activeFormattingElements.clearToLastMarker();
        p2.insertionMode = InsertionMode.IN_ROW;
      }
      break;
    }
    case TAG_ID.TABLE:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p2.openElements.hasInTableScope(tn2)) {
        p2._closeTableCell();
        endTagInRow(p2, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML: {
      break;
    }
    default: {
      endTagInBody(p2, token);
    }
  }
}
function startTagInSelect(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.OPTION: {
      if (p2.openElements.currentTagId === TAG_ID.OPTION) {
        p2.openElements.pop();
      }
      p2._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.OPTGROUP: {
      if (p2.openElements.currentTagId === TAG_ID.OPTION) {
        p2.openElements.pop();
      }
      if (p2.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p2.openElements.pop();
      }
      p2._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.HR: {
      if (p2.openElements.currentTagId === TAG_ID.OPTION) {
        p2.openElements.pop();
      }
      if (p2.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p2.openElements.pop();
      }
      p2._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.INPUT:
    case TAG_ID.KEYGEN:
    case TAG_ID.TEXTAREA:
    case TAG_ID.SELECT: {
      if (p2.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p2._resetInsertionMode();
        if (token.tagID !== TAG_ID.SELECT) {
          p2._processStartTag(token);
        }
      }
      break;
    }
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p2, token);
      break;
    }
    default:
  }
}
function endTagInSelect(p2, token) {
  switch (token.tagID) {
    case TAG_ID.OPTGROUP: {
      if (p2.openElements.stackTop > 0 && p2.openElements.currentTagId === TAG_ID.OPTION && p2.openElements.tagIDs[p2.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
        p2.openElements.pop();
      }
      if (p2.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p2.openElements.pop();
      }
      break;
    }
    case TAG_ID.OPTION: {
      if (p2.openElements.currentTagId === TAG_ID.OPTION) {
        p2.openElements.pop();
      }
      break;
    }
    case TAG_ID.SELECT: {
      if (p2.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p2._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p2, token);
      break;
    }
    default:
  }
}
function startTagInSelectInTable(p2, token) {
  const tn2 = token.tagID;
  if (tn2 === TAG_ID.CAPTION || tn2 === TAG_ID.TABLE || tn2 === TAG_ID.TBODY || tn2 === TAG_ID.TFOOT || tn2 === TAG_ID.THEAD || tn2 === TAG_ID.TR || tn2 === TAG_ID.TD || tn2 === TAG_ID.TH) {
    p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
    p2._resetInsertionMode();
    p2._processStartTag(token);
  } else {
    startTagInSelect(p2, token);
  }
}
function endTagInSelectInTable(p2, token) {
  const tn2 = token.tagID;
  if (tn2 === TAG_ID.CAPTION || tn2 === TAG_ID.TABLE || tn2 === TAG_ID.TBODY || tn2 === TAG_ID.TFOOT || tn2 === TAG_ID.THEAD || tn2 === TAG_ID.TR || tn2 === TAG_ID.TD || tn2 === TAG_ID.TH) {
    if (p2.openElements.hasInTableScope(tn2)) {
      p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
      p2._resetInsertionMode();
      p2.onEndTag(token);
    }
  } else {
    endTagInSelect(p2, token);
  }
}
function startTagInTemplate(p2, token) {
  switch (token.tagID) {
    // First, handle tags that can start without a mode change
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      startTagInHead(p2, token);
      break;
    }
    // Re-process the token in the appropriate mode
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      p2.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
      p2.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p2, token);
      break;
    }
    case TAG_ID.COL: {
      p2.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
      p2.insertionMode = InsertionMode.IN_COLUMN_GROUP;
      startTagInColumnGroup(p2, token);
      break;
    }
    case TAG_ID.TR: {
      p2.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
      p2.insertionMode = InsertionMode.IN_TABLE_BODY;
      startTagInTableBody(p2, token);
      break;
    }
    case TAG_ID.TD:
    case TAG_ID.TH: {
      p2.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
      p2.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p2, token);
      break;
    }
    default: {
      p2.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
      p2.insertionMode = InsertionMode.IN_BODY;
      startTagInBody(p2, token);
    }
  }
}
function endTagInTemplate(p2, token) {
  if (token.tagID === TAG_ID.TEMPLATE) {
    templateEndTagInHead(p2, token);
  }
}
function eofInTemplate(p2, token) {
  if (p2.openElements.tmplCount > 0) {
    p2.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p2.activeFormattingElements.clearToLastMarker();
    p2.tmplInsertionModeStack.shift();
    p2._resetInsertionMode();
    p2.onEof(token);
  } else {
    stopParsing(p2, token);
  }
}
function startTagAfterBody(p2, token) {
  if (token.tagID === TAG_ID.HTML) {
    startTagInBody(p2, token);
  } else {
    tokenAfterBody(p2, token);
  }
}
function endTagAfterBody(p2, token) {
  var _a22;
  if (token.tagID === TAG_ID.HTML) {
    if (!p2.fragmentContext) {
      p2.insertionMode = InsertionMode.AFTER_AFTER_BODY;
    }
    if (p2.options.sourceCodeLocationInfo && p2.openElements.tagIDs[0] === TAG_ID.HTML) {
      p2._setEndLocation(p2.openElements.items[0], token);
      const bodyElement = p2.openElements.items[1];
      if (bodyElement && !((_a22 = p2.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a22 === void 0 ? void 0 : _a22.endTag)) {
        p2._setEndLocation(bodyElement, token);
      }
    }
  } else {
    tokenAfterBody(p2, token);
  }
}
function tokenAfterBody(p2, token) {
  p2.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p2, token);
}
function startTagInFrameset(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      p2._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.FRAME: {
      p2._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p2, token);
      break;
    }
    default:
  }
}
function endTagInFrameset(p2, token) {
  if (token.tagID === TAG_ID.FRAMESET && !p2.openElements.isRootHtmlElementCurrent()) {
    p2.openElements.pop();
    if (!p2.fragmentContext && p2.openElements.currentTagId !== TAG_ID.FRAMESET) {
      p2.insertionMode = InsertionMode.AFTER_FRAMESET;
    }
  }
}
function startTagAfterFrameset(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p2, token);
      break;
    }
    default:
  }
}
function endTagAfterFrameset(p2, token) {
  if (token.tagID === TAG_ID.HTML) {
    p2.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
  }
}
function startTagAfterAfterBody(p2, token) {
  if (token.tagID === TAG_ID.HTML) {
    startTagInBody(p2, token);
  } else {
    tokenAfterAfterBody(p2, token);
  }
}
function tokenAfterAfterBody(p2, token) {
  p2.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p2, token);
}
function startTagAfterAfterFrameset(p2, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p2, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p2, token);
      break;
    }
    default:
  }
}
function nullCharacterInForeignContent(p2, token) {
  token.chars = REPLACEMENT_CHARACTER;
  p2._insertCharacters(token);
}
function characterInForeignContent(p2, token) {
  p2._insertCharacters(token);
  p2.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p2) {
  while (p2.treeAdapter.getNamespaceURI(p2.openElements.current) !== NS.HTML && p2.openElements.currentTagId !== void 0 && !p2._isIntegrationPoint(p2.openElements.currentTagId, p2.openElements.current)) {
    p2.openElements.pop();
  }
}
function startTagInForeignContent(p2, token) {
  if (causesExit(token)) {
    popUntilHtmlOrIntegrationPoint(p2);
    p2._startTagOutsideForeignContent(token);
  } else {
    const current = p2._getAdjustedCurrentElement();
    const currentNs = p2.treeAdapter.getNamespaceURI(current);
    if (currentNs === NS.MATHML) {
      adjustTokenMathMLAttrs(token);
    } else if (currentNs === NS.SVG) {
      adjustTokenSVGTagName(token);
      adjustTokenSVGAttrs(token);
    }
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p2._appendElement(token, currentNs);
    } else {
      p2._insertElement(token, currentNs);
    }
    token.ackSelfClosing = true;
  }
}
function endTagInForeignContent(p2, token) {
  if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
    popUntilHtmlOrIntegrationPoint(p2);
    p2._endTagOutsideForeignContent(token);
    return;
  }
  for (let i2 = p2.openElements.stackTop; i2 > 0; i2--) {
    const element2 = p2.openElements.items[i2];
    if (p2.treeAdapter.getNamespaceURI(element2) === NS.HTML) {
      p2._endTagOutsideForeignContent(token);
      break;
    }
    const tagName = p2.treeAdapter.getTagName(element2);
    if (tagName.toLowerCase() === token.tagName) {
      token.tagName = tagName;
      p2.openElements.shortenToLength(i2);
      break;
    }
  }
}
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt == null ? (c2, index2) => (c2.charCodeAt(index2) & 64512) === 55296 ? (c2.charCodeAt(index2) - 55296) * 1024 + c2.charCodeAt(index2 + 1) - 56320 + 65536 : c2.charCodeAt(index2) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    ((input, index2) => input.codePointAt(index2))
  )
);
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
  TAG_NAMES.AREA,
  TAG_NAMES.BASE,
  TAG_NAMES.BASEFONT,
  TAG_NAMES.BGSOUND,
  TAG_NAMES.BR,
  TAG_NAMES.COL,
  TAG_NAMES.EMBED,
  TAG_NAMES.FRAME,
  TAG_NAMES.HR,
  TAG_NAMES.IMG,
  TAG_NAMES.INPUT,
  TAG_NAMES.KEYGEN,
  TAG_NAMES.LINK,
  TAG_NAMES.META,
  TAG_NAMES.PARAM,
  TAG_NAMES.SOURCE,
  TAG_NAMES.TRACK,
  TAG_NAMES.WBR
]);
function parse3(html3, options) {
  return Parser.parse(html3, options);
}
function parseFragment(fragmentContext, html3, options) {
  if (typeof fragmentContext === "string") {
    options = html3;
    html3 = fragmentContext;
    fragmentContext = null;
  }
  const parser = Parser.getFragmentParser(fragmentContext, options);
  parser.tokenizer.write(html3, true);
  return parser.getFragment();
}
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position2(value.position);
  }
  if ("start" in value || "end" in value) {
    return position2(value);
  }
  if ("line" in value || "column" in value) {
    return point2(value);
  }
  return "";
}
function point2(point3) {
  return index(point3 && point3.line) + ":" + index(point3 && point3.column);
}
function position2(pos) {
  return point2(pos && pos.start) + "-" + point2(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}
var VFileMessage = class extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(causeOrReason, optionsOrParentOrPlace, origin) {
    super();
    if (typeof optionsOrParentOrPlace === "string") {
      origin = optionsOrParentOrPlace;
      optionsOrParentOrPlace = void 0;
    }
    let reason = "";
    let options = {};
    let legacyCause = false;
    if (optionsOrParentOrPlace) {
      if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) {
        options = { place: optionsOrParentOrPlace };
      } else if ("type" in optionsOrParentOrPlace) {
        options = {
          ancestors: [optionsOrParentOrPlace],
          place: optionsOrParentOrPlace.position
        };
      } else {
        options = { ...optionsOrParentOrPlace };
      }
    }
    if (typeof causeOrReason === "string") {
      reason = causeOrReason;
    } else if (!options.cause && causeOrReason) {
      legacyCause = true;
      reason = causeOrReason.message;
      options.cause = causeOrReason;
    }
    if (!options.ruleId && !options.source && typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        options.ruleId = origin;
      } else {
        options.source = origin.slice(0, index2);
        options.ruleId = origin.slice(index2 + 1);
      }
    }
    if (!options.place && options.ancestors && options.ancestors) {
      const parent = options.ancestors[options.ancestors.length - 1];
      if (parent) {
        options.place = parent.position;
      }
    }
    const start = options.place && "start" in options.place ? options.place.start : options.place;
    this.ancestors = options.ancestors || void 0;
    this.cause = options.cause || void 0;
    this.column = start ? start.column : void 0;
    this.fatal = void 0;
    this.file;
    this.message = reason;
    this.line = start ? start.line : void 0;
    this.name = stringifyPosition(options.place) || "1:1";
    this.place = options.place || void 0;
    this.reason = this.message;
    this.ruleId = options.ruleId || void 0;
    this.source = options.source || void 0;
    this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
    this.actual;
    this.expected;
    this.note;
    this.url;
  }
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;
var minpath = { basename, dirname, extname, join, sep: "/" };
function basename(path, extname2) {
  if (extname2 !== void 0 && typeof extname2 !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath(path);
  let start = 0;
  let end = -1;
  let index2 = path.length;
  let seenNonSlash;
  if (extname2 === void 0 || extname2.length === 0 || extname2.length > path.length) {
    while (index2--) {
      if (path.codePointAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else if (end < 0) {
        seenNonSlash = true;
        end = index2 + 1;
      }
    }
    return end < 0 ? "" : path.slice(start, end);
  }
  if (extname2 === path) {
    return "";
  }
  let firstNonSlashEnd = -1;
  let extnameIndex = extname2.length - 1;
  while (index2--) {
    if (path.codePointAt(index2) === 47) {
      if (seenNonSlash) {
        start = index2 + 1;
        break;
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true;
        firstNonSlashEnd = index2 + 1;
      }
      if (extnameIndex > -1) {
        if (path.codePointAt(index2) === extname2.codePointAt(extnameIndex--)) {
          if (extnameIndex < 0) {
            end = index2;
          }
        } else {
          extnameIndex = -1;
          end = firstNonSlashEnd;
        }
      }
    }
  }
  if (start === end) {
    end = firstNonSlashEnd;
  } else if (end < 0) {
    end = path.length;
  }
  return path.slice(start, end);
}
function dirname(path) {
  assertPath(path);
  if (path.length === 0) {
    return ".";
  }
  let end = -1;
  let index2 = path.length;
  let unmatchedSlash;
  while (--index2) {
    if (path.codePointAt(index2) === 47) {
      if (unmatchedSlash) {
        end = index2;
        break;
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true;
    }
  }
  return end < 0 ? path.codePointAt(0) === 47 ? "/" : "." : end === 1 && path.codePointAt(0) === 47 ? "//" : path.slice(0, end);
}
function extname(path) {
  assertPath(path);
  let index2 = path.length;
  let end = -1;
  let startPart = 0;
  let startDot = -1;
  let preDotState = 0;
  let unmatchedSlash;
  while (index2--) {
    const code = path.codePointAt(index2);
    if (code === 47) {
      if (unmatchedSlash) {
        startPart = index2 + 1;
        break;
      }
      continue;
    }
    if (end < 0) {
      unmatchedSlash = true;
      end = index2 + 1;
    }
    if (code === 46) {
      if (startDot < 0) {
        startDot = index2;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot > -1) {
      preDotState = -1;
    }
  }
  if (startDot < 0 || end < 0 || // We saw a non-dot character immediately before the dot.
  preDotState === 0 || // The (right-most) trimmed path component is exactly `..`.
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path.slice(startDot, end);
}
function join(...segments) {
  let index2 = -1;
  let joined;
  while (++index2 < segments.length) {
    assertPath(segments[index2]);
    if (segments[index2]) {
      joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
    }
  }
  return joined === void 0 ? "." : normalize2(joined);
}
function normalize2(path) {
  assertPath(path);
  const absolute = path.codePointAt(0) === 47;
  let value = normalizeString(path, !absolute);
  if (value.length === 0 && !absolute) {
    value = ".";
  }
  if (value.length > 0 && path.codePointAt(path.length - 1) === 47) {
    value += "/";
  }
  return absolute ? "/" + value : value;
}
function normalizeString(path, allowAboveRoot) {
  let result = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let index2 = -1;
  let code;
  let lastSlashIndex;
  while (++index2 <= path.length) {
    if (index2 < path.length) {
      code = path.codePointAt(index2);
    } else if (code === 47) {
      break;
    } else {
      code = 47;
    }
    if (code === 47) {
      if (lastSlash === index2 - 1 || dots === 1) {
      } else if (lastSlash !== index2 - 1 && dots === 2) {
        if (result.length < 2 || lastSegmentLength !== 2 || result.codePointAt(result.length - 1) !== 46 || result.codePointAt(result.length - 2) !== 46) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = "";
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
              }
              lastSlash = index2;
              dots = 0;
              continue;
            }
          } else if (result.length > 0) {
            result = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += "/" + path.slice(lastSlash + 1, index2);
        } else {
          result = path.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (code === 46 && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }
  return result;
}
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(path)
    );
  }
}
var minproc = { cwd };
function cwd() {
  return "/";
}
function isUrl(fileUrlOrPath) {
  return Boolean(
    fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && // @ts-expect-error: indexing is fine.
    fileUrlOrPath.auth === void 0
  );
}
function urlToPath(path) {
  if (typeof path === "string") {
    path = new URL(path);
  } else if (!isUrl(path)) {
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + path + "`"
    );
    error.code = "ERR_INVALID_ARG_TYPE";
    throw error;
  }
  if (path.protocol !== "file:") {
    const error = new TypeError("The URL must be of scheme file");
    error.code = "ERR_INVALID_URL_SCHEME";
    throw error;
  }
  return getPathFromURLPosix(path);
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    error.code = "ERR_INVALID_FILE_URL_HOST";
    throw error;
  }
  const pathname = url.pathname;
  let index2 = -1;
  while (++index2 < pathname.length) {
    if (pathname.codePointAt(index2) === 37 && pathname.codePointAt(index2 + 1) === 50) {
      const third = pathname.codePointAt(index2 + 2);
      if (third === 70 || third === 102) {
        const error = new TypeError(
          "File URL path must not include encoded / characters"
        );
        error.code = "ERR_INVALID_FILE_URL_PATH";
        throw error;
      }
    }
  }
  return decodeURIComponent(pathname);
}
var order = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
var VFile = class {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (isUrl(value)) {
      options = { path: value };
    } else if (typeof value === "string" || isUint8Array(value)) {
      options = { value };
    } else {
      options = value;
    }
    this.cwd = "cwd" in options ? "" : minproc.cwd();
    this.data = {};
    this.history = [];
    this.messages = [];
    this.value;
    this.map;
    this.result;
    this.stored;
    let index2 = -1;
    while (++index2 < order.length) {
      const field2 = order[index2];
      if (field2 in options && options[field2] !== void 0 && options[field2] !== null) {
        this[field2] = field2 === "history" ? [...options[field2]] : options[field2];
      }
    }
    let field;
    for (field in options) {
      if (!order.includes(field)) {
        this[field] = options[field];
      }
    }
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path === "string" ? minpath.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(basename2) {
    assertNonEmpty(basename2, "basename");
    assertPart(basename2, "basename");
    this.path = minpath.join(this.dirname || "", basename2);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path === "string" ? minpath.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(dirname2) {
    assertPath2(this.basename, "dirname");
    this.path = minpath.join(dirname2 || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path === "string" ? minpath.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(extname2) {
    assertPart(extname2, "extname");
    assertPath2(this.dirname, "extname");
    if (extname2) {
      if (extname2.codePointAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = minpath.join(this.dirname, this.stem + (extname2 || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(path) {
    if (isUrl(path)) {
      path = urlToPath(path);
    }
    assertNonEmpty(path, "path");
    if (this.path !== path) {
      this.history.push(path);
    }
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path === "string" ? minpath.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = minpath.join(this.dirname || "", stem + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = true;
    throw message;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
    message.fatal = void 0;
    return message;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(causeOrReason, optionsOrParentOrPlace, origin) {
    const message = new VFileMessage(
      // @ts-expect-error: the overloads are fine.
      causeOrReason,
      optionsOrParentOrPlace,
      origin
    );
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    if (this.value === void 0) {
      return "";
    }
    if (typeof this.value === "string") {
      return this.value;
    }
    const decoder = new TextDecoder(encoding || void 0);
    return decoder.decode(this.value);
  }
};
function assertPart(part, name) {
  if (part && part.includes(minpath.sep)) {
    throw new Error(
      "`" + name + "` cannot be a path: did not expect `" + minpath.sep + "`"
    );
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty");
  }
}
function assertPath2(path, name) {
  if (!path) {
    throw new Error("Setting `" + name + "` requires `path` to be set too");
  }
}
function isUint8Array(value) {
  return Boolean(
    value && typeof value === "object" && "byteLength" in value && "byteOffset" in value
  );
}
var errors = {
  /** @type {ErrorInfo} */
  abandonedHeadElementChild: {
    reason: "Unexpected metadata element after head",
    description: "Unexpected element after head. Expected the element before `</head>`",
    url: false
  },
  /** @type {ErrorInfo} */
  abruptClosingOfEmptyComment: {
    reason: "Unexpected abruptly closed empty comment",
    description: "Unexpected `>` or `->`. Expected `-->` to close comments"
  },
  /** @type {ErrorInfo} */
  abruptDoctypePublicIdentifier: {
    reason: "Unexpected abruptly closed public identifier",
    description: "Unexpected `>`. Expected a closing `\"` or `'` after the public identifier"
  },
  /** @type {ErrorInfo} */
  abruptDoctypeSystemIdentifier: {
    reason: "Unexpected abruptly closed system identifier",
    description: "Unexpected `>`. Expected a closing `\"` or `'` after the identifier identifier"
  },
  /** @type {ErrorInfo} */
  absenceOfDigitsInNumericCharacterReference: {
    reason: "Unexpected non-digit at start of numeric character reference",
    description: "Unexpected `%c`. Expected `[0-9]` for decimal references or `[0-9a-fA-F]` for hexadecimal references"
  },
  /** @type {ErrorInfo} */
  cdataInHtmlContent: {
    reason: "Unexpected CDATA section in HTML",
    description: "Unexpected `<![CDATA[` in HTML. Remove it, use a comment, or encode special characters instead"
  },
  /** @type {ErrorInfo} */
  characterReferenceOutsideUnicodeRange: {
    reason: "Unexpected too big numeric character reference",
    description: "Unexpectedly high character reference. Expected character references to be at most hexadecimal 10ffff (or decimal 1114111)"
  },
  /** @type {ErrorInfo} */
  closingOfElementWithOpenChildElements: {
    reason: "Unexpected closing tag with open child elements",
    description: "Unexpectedly closing tag. Expected other tags to be closed first",
    url: false
  },
  /** @type {ErrorInfo} */
  controlCharacterInInputStream: {
    reason: "Unexpected control character",
    description: "Unexpected control character `%x`. Expected a non-control code point, 0x00, or ASCII whitespace"
  },
  /** @type {ErrorInfo} */
  controlCharacterReference: {
    reason: "Unexpected control character reference",
    description: "Unexpectedly control character in reference. Expected a non-control code point, 0x00, or ASCII whitespace"
  },
  /** @type {ErrorInfo} */
  disallowedContentInNoscriptInHead: {
    reason: "Disallowed content inside `<noscript>` in `<head>`",
    description: "Unexpected text character `%c`. Only use text in `<noscript>`s in `<body>`",
    url: false
  },
  /** @type {ErrorInfo} */
  duplicateAttribute: {
    reason: "Unexpected duplicate attribute",
    description: "Unexpectedly double attribute. Expected attributes to occur only once"
  },
  /** @type {ErrorInfo} */
  endTagWithAttributes: {
    reason: "Unexpected attribute on closing tag",
    description: "Unexpected attribute. Expected `>` instead"
  },
  /** @type {ErrorInfo} */
  endTagWithTrailingSolidus: {
    reason: "Unexpected slash at end of closing tag",
    description: "Unexpected `%c-1`. Expected `>` instead"
  },
  /** @type {ErrorInfo} */
  endTagWithoutMatchingOpenElement: {
    reason: "Unexpected unopened end tag",
    description: "Unexpected end tag. Expected no end tag or another end tag",
    url: false
  },
  /** @type {ErrorInfo} */
  eofBeforeTagName: {
    reason: "Unexpected end of file",
    description: "Unexpected end of file. Expected tag name instead"
  },
  /** @type {ErrorInfo} */
  eofInCdata: {
    reason: "Unexpected end of file in CDATA",
    description: "Unexpected end of file. Expected `]]>` to close the CDATA"
  },
  /** @type {ErrorInfo} */
  eofInComment: {
    reason: "Unexpected end of file in comment",
    description: "Unexpected end of file. Expected `-->` to close the comment"
  },
  /** @type {ErrorInfo} */
  eofInDoctype: {
    reason: "Unexpected end of file in doctype",
    description: "Unexpected end of file. Expected a valid doctype (such as `<!doctype html>`)"
  },
  /** @type {ErrorInfo} */
  eofInElementThatCanContainOnlyText: {
    reason: "Unexpected end of file in element that can only contain text",
    description: "Unexpected end of file. Expected text or a closing tag",
    url: false
  },
  /** @type {ErrorInfo} */
  eofInScriptHtmlCommentLikeText: {
    reason: "Unexpected end of file in comment inside script",
    description: "Unexpected end of file. Expected `-->` to close the comment"
  },
  /** @type {ErrorInfo} */
  eofInTag: {
    reason: "Unexpected end of file in tag",
    description: "Unexpected end of file. Expected `>` to close the tag"
  },
  /** @type {ErrorInfo} */
  incorrectlyClosedComment: {
    reason: "Incorrectly closed comment",
    description: "Unexpected `%c-1`. Expected `-->` to close the comment"
  },
  /** @type {ErrorInfo} */
  incorrectlyOpenedComment: {
    reason: "Incorrectly opened comment",
    description: "Unexpected `%c`. Expected `<!--` to open the comment"
  },
  /** @type {ErrorInfo} */
  invalidCharacterSequenceAfterDoctypeName: {
    reason: "Invalid sequence after doctype name",
    description: "Unexpected sequence at `%c`. Expected `public` or `system`"
  },
  /** @type {ErrorInfo} */
  invalidFirstCharacterOfTagName: {
    reason: "Invalid first character in tag name",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  /** @type {ErrorInfo} */
  misplacedDoctype: {
    reason: "Misplaced doctype",
    description: "Unexpected doctype. Expected doctype before head",
    url: false
  },
  /** @type {ErrorInfo} */
  misplacedStartTagForHeadElement: {
    reason: "Misplaced `<head>` start tag",
    description: "Unexpected start tag `<head>`. Expected `<head>` directly after doctype",
    url: false
  },
  /** @type {ErrorInfo} */
  missingAttributeValue: {
    reason: "Missing attribute value",
    description: "Unexpected `%c-1`. Expected an attribute value or no `%c-1` instead"
  },
  /** @type {ErrorInfo} */
  missingDoctype: {
    reason: "Missing doctype before other content",
    description: "Expected a `<!doctype html>` before anything else",
    url: false
  },
  /** @type {ErrorInfo} */
  missingDoctypeName: {
    reason: "Missing doctype name",
    description: "Unexpected doctype end at `%c`. Expected `html` instead"
  },
  /** @type {ErrorInfo} */
  missingDoctypePublicIdentifier: {
    reason: "Missing public identifier in doctype",
    description: "Unexpected `%c`. Expected identifier for `public` instead"
  },
  /** @type {ErrorInfo} */
  missingDoctypeSystemIdentifier: {
    reason: "Missing system identifier in doctype",
    description: 'Unexpected `%c`. Expected identifier for `system` instead (suggested: `"about:legacy-compat"`)'
  },
  /** @type {ErrorInfo} */
  missingEndTagName: {
    reason: "Missing name in end tag",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  /** @type {ErrorInfo} */
  missingQuoteBeforeDoctypePublicIdentifier: {
    reason: "Missing quote before public identifier in doctype",
    description: "Unexpected `%c`. Expected `\"` or `'` instead"
  },
  /** @type {ErrorInfo} */
  missingQuoteBeforeDoctypeSystemIdentifier: {
    reason: "Missing quote before system identifier in doctype",
    description: "Unexpected `%c`. Expected `\"` or `'` instead"
  },
  /** @type {ErrorInfo} */
  missingSemicolonAfterCharacterReference: {
    reason: "Missing semicolon after character reference",
    description: "Unexpected `%c`. Expected `;` instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceAfterDoctypePublicKeyword: {
    reason: "Missing whitespace after public identifier in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceAfterDoctypeSystemKeyword: {
    reason: "Missing whitespace after system identifier in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceBeforeDoctypeName: {
    reason: "Missing whitespace before doctype name",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceBetweenAttributes: {
    reason: "Missing whitespace between attributes",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: {
    reason: "Missing whitespace between public and system identifiers in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  /** @type {ErrorInfo} */
  nestedComment: {
    reason: "Unexpected nested comment",
    description: "Unexpected `<!--`. Expected `-->`"
  },
  /** @type {ErrorInfo} */
  nestedNoscriptInHead: {
    reason: "Unexpected nested `<noscript>` in `<head>`",
    description: "Unexpected `<noscript>`. Expected a closing tag or a meta element",
    url: false
  },
  /** @type {ErrorInfo} */
  nonConformingDoctype: {
    reason: "Unexpected non-conforming doctype declaration",
    description: 'Expected `<!doctype html>` or `<!doctype html system "about:legacy-compat">`',
    url: false
  },
  /** @type {ErrorInfo} */
  nonVoidHtmlElementStartTagWithTrailingSolidus: {
    reason: "Unexpected trailing slash on start tag of non-void element",
    description: "Unexpected `/`. Expected `>` instead"
  },
  /** @type {ErrorInfo} */
  noncharacterCharacterReference: {
    reason: "Unexpected noncharacter code point referenced by character reference",
    description: "Unexpected code point. Do not use noncharacters in HTML"
  },
  /** @type {ErrorInfo} */
  noncharacterInInputStream: {
    reason: "Unexpected noncharacter character",
    description: "Unexpected code point `%x`. Do not use noncharacters in HTML"
  },
  /** @type {ErrorInfo} */
  nullCharacterReference: {
    reason: "Unexpected NULL character referenced by character reference",
    description: "Unexpected code point. Do not use NULL characters in HTML"
  },
  /** @type {ErrorInfo} */
  openElementsLeftAfterEof: {
    reason: "Unexpected end of file",
    description: "Unexpected end of file. Expected closing tag instead",
    url: false
  },
  /** @type {ErrorInfo} */
  surrogateCharacterReference: {
    reason: "Unexpected surrogate character referenced by character reference",
    description: "Unexpected code point. Do not use lone surrogate characters in HTML"
  },
  /** @type {ErrorInfo} */
  surrogateInInputStream: {
    reason: "Unexpected surrogate character",
    description: "Unexpected code point `%x`. Do not use lone surrogate characters in HTML"
  },
  /** @type {ErrorInfo} */
  unexpectedCharacterAfterDoctypeSystemIdentifier: {
    reason: "Invalid character after system identifier in doctype",
    description: "Unexpected character at `%c`. Expected `>`"
  },
  /** @type {ErrorInfo} */
  unexpectedCharacterInAttributeName: {
    reason: "Unexpected character in attribute name",
    description: "Unexpected `%c`. Expected whitespace, `/`, `>`, `=`, or probably an ASCII letter"
  },
  /** @type {ErrorInfo} */
  unexpectedCharacterInUnquotedAttributeValue: {
    reason: "Unexpected character in unquoted attribute value",
    description: "Unexpected `%c`. Quote the attribute value to include it"
  },
  /** @type {ErrorInfo} */
  unexpectedEqualsSignBeforeAttributeName: {
    reason: "Unexpected equals sign before attribute name",
    description: "Unexpected `%c`. Add an attribute name before it"
  },
  /** @type {ErrorInfo} */
  unexpectedNullCharacter: {
    reason: "Unexpected NULL character",
    description: "Unexpected code point `%x`. Do not use NULL characters in HTML"
  },
  /** @type {ErrorInfo} */
  unexpectedQuestionMarkInsteadOfTagName: {
    reason: "Unexpected question mark instead of tag name",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  /** @type {ErrorInfo} */
  unexpectedSolidusInTag: {
    reason: "Unexpected slash in tag",
    description: "Unexpected `%c-1`. Expected it followed by `>` or in a quoted attribute value"
  },
  /** @type {ErrorInfo} */
  unknownNamedCharacterReference: {
    reason: "Unexpected unknown named character reference",
    description: "Unexpected character reference. Expected known named character references"
  }
};
var base = "https://html.spec.whatwg.org/multipage/parsing.html#parse-error-";
var dashToCamelRe = /-[a-z]/g;
var formatCRe = /%c(?:([-+])(\d+))?/g;
var formatXRe = /%x/g;
var fatalities = { 2: true, 1: false, 0: null };
var emptyOptions = {};
function fromHtml(value, options) {
  const settings = options || emptyOptions;
  const onerror = settings.onerror;
  const file = value instanceof VFile ? value : new VFile(value);
  const parseFunction = settings.fragment ? parseFragment : parse3;
  const document = String(file);
  const p5Document = parseFunction(document, {
    sourceCodeLocationInfo: true,
    // Note `parse5` types currently do not allow `undefined`.
    onParseError: settings.onerror ? internalOnerror : null,
    scriptingEnabled: false
  });
  return (
    /** @type {Root} */
    fromParse5(p5Document, {
      file,
      space: settings.space,
      verbose: settings.verbose
    })
  );
  function internalOnerror(error) {
    const code = error.code;
    const name = camelcase2(code);
    const setting = settings[name];
    const config = setting === null || setting === void 0 ? true : setting;
    const level = typeof config === "number" ? config : config ? 1 : 0;
    if (level) {
      const info = errors[name];
      ok(info, "expected known error from `parse5`");
      const message = new VFileMessage(format(info.reason), {
        place: {
          start: {
            line: error.startLine,
            column: error.startCol,
            offset: error.startOffset
          },
          end: {
            line: error.endLine,
            column: error.endCol,
            offset: error.endOffset
          }
        },
        ruleId: code,
        source: "hast-util-from-html"
      });
      if (file.path) {
        message.file = file.path;
        message.name = file.path + ":" + message.name;
      }
      message.fatal = fatalities[level];
      message.note = format(info.description);
      message.url = info.url === false ? void 0 : base + code;
      ok(onerror, "`internalOnerror` is not passed if `onerror` is not set");
      onerror(message);
    }
    function format(value2) {
      return value2.replace(formatCRe, formatC).replace(formatXRe, formatX);
      function formatC(_2, $1, $22) {
        const offset = ($22 ? Number.parseInt($22, 10) : 0) * ($1 === "-" ? -1 : 1);
        const char = document.charAt(error.startOffset + offset);
        return visualizeCharacter(char);
      }
      function formatX() {
        return visualizeCharacterCode(document.charCodeAt(error.startOffset));
      }
    }
  }
}
function camelcase2(value) {
  return (
    /** @type {ErrorCode} */
    value.replace(dashToCamelRe, dashToCamel)
  );
}
function dashToCamel($0) {
  return $0.charAt(1).toUpperCase();
}
function visualizeCharacter(char) {
  return char === "`" ? "` ` `" : char;
}
function visualizeCharacterCode(charCode) {
  return "0x" + charCode.toString(16).toUpperCase();
}
var convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(test) {
    if (test === null || test === void 0) {
      return ok2;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        propertiesFactory(
          /** @type {Props} */
          test
        )
      );
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  })
);
function anyFactory(tests) {
  const checks2 = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks2[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks2.length) {
      if (checks2[index3].apply(this, parameters)) return true;
    }
    return false;
  }
}
function propertiesFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all2);
  function all2(node) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index2, parent) {
    return Boolean(
      looksLikeANode(value) && testFunction.call(
        this,
        value,
        typeof index2 === "number" ? index2 : void 0,
        parent || void 0
      )
    );
  }
}
function ok2() {
  return true;
}
function looksLikeANode(value) {
  return value !== null && typeof value === "object" && "type" in value;
}
function color(d2) {
  return d2;
}
var empty = [];
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, void 0, [])();
  function factory(node, index2, parents) {
    const value = (
      /** @type {Record<string, unknown>} */
      node && typeof node === "object" ? node : {}
    );
    if (typeof value.type === "string") {
      const name = (
        // `hast`
        typeof value.tagName === "string" ? value.tagName : (
          // `xast`
          typeof value.name === "string" ? value.name : void 0
        )
      );
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = empty;
      let subresult;
      let offset;
      let grandparents;
      if (!test || is2(node, index2, parents[parents.length - 1] || void 0)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if ("children" in node && node.children) {
        const nodeAsParent = (
          /** @type {UnistParent} */
          node
        );
        if (nodeAsParent.children && result[0] !== SKIP) {
          offset = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset > -1 && offset < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset];
            subresult = factory(child, offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
      }
      return result;
    }
  }
}
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return value === null || value === void 0 ? empty : [value];
}
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
    test = void 0;
    visitor = testOrVisitor;
    reverse = visitorOrReverse;
  } else {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    const index2 = parent ? parent.children.indexOf(node) : void 0;
    return visitor(node, index2, parent);
  }
}
function removePosition(tree, options) {
  const config = options || {};
  const force = config.force || false;
  visit(tree, remove);
  function remove(node) {
    if (force) {
      delete node.position;
    } else {
      node.position = void 0;
    }
  }
}
function fromHtmlIsomorphic(value, options) {
  const tree = fromHtml(value, options);
  removePosition(tree, { force: true });
  delete tree.data;
  return tree;
}

// katex/fontMetricsData.js
var fontMetricsData_default = {
  "AMS-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "65": [0, 0.68889, 0, 0, 0.72222],
    "66": [0, 0.68889, 0, 0, 0.66667],
    "67": [0, 0.68889, 0, 0, 0.72222],
    "68": [0, 0.68889, 0, 0, 0.72222],
    "69": [0, 0.68889, 0, 0, 0.66667],
    "70": [0, 0.68889, 0, 0, 0.61111],
    "71": [0, 0.68889, 0, 0, 0.77778],
    "72": [0, 0.68889, 0, 0, 0.77778],
    "73": [0, 0.68889, 0, 0, 0.38889],
    "74": [0.16667, 0.68889, 0, 0, 0.5],
    "75": [0, 0.68889, 0, 0, 0.77778],
    "76": [0, 0.68889, 0, 0, 0.66667],
    "77": [0, 0.68889, 0, 0, 0.94445],
    "78": [0, 0.68889, 0, 0, 0.72222],
    "79": [0.16667, 0.68889, 0, 0, 0.77778],
    "80": [0, 0.68889, 0, 0, 0.61111],
    "81": [0.16667, 0.68889, 0, 0, 0.77778],
    "82": [0, 0.68889, 0, 0, 0.72222],
    "83": [0, 0.68889, 0, 0, 0.55556],
    "84": [0, 0.68889, 0, 0, 0.66667],
    "85": [0, 0.68889, 0, 0, 0.72222],
    "86": [0, 0.68889, 0, 0, 0.72222],
    "87": [0, 0.68889, 0, 0, 1],
    "88": [0, 0.68889, 0, 0, 0.72222],
    "89": [0, 0.68889, 0, 0, 0.72222],
    "90": [0, 0.68889, 0, 0, 0.66667],
    "107": [0, 0.68889, 0, 0, 0.55556],
    "160": [0, 0, 0, 0, 0.25],
    "165": [0, 0.675, 0.025, 0, 0.75],
    "174": [0.15559, 0.69224, 0, 0, 0.94666],
    "240": [0, 0.68889, 0, 0, 0.55556],
    "295": [0, 0.68889, 0, 0, 0.54028],
    "710": [0, 0.825, 0, 0, 2.33334],
    "732": [0, 0.9, 0, 0, 2.33334],
    "770": [0, 0.825, 0, 0, 2.33334],
    "771": [0, 0.9, 0, 0, 2.33334],
    "989": [0.08167, 0.58167, 0, 0, 0.77778],
    "1008": [0, 0.43056, 0.04028, 0, 0.66667],
    "8245": [0, 0.54986, 0, 0, 0.275],
    "8463": [0, 0.68889, 0, 0, 0.54028],
    "8487": [0, 0.68889, 0, 0, 0.72222],
    "8498": [0, 0.68889, 0, 0, 0.55556],
    "8502": [0, 0.68889, 0, 0, 0.66667],
    "8503": [0, 0.68889, 0, 0, 0.44445],
    "8504": [0, 0.68889, 0, 0, 0.66667],
    "8513": [0, 0.68889, 0, 0, 0.63889],
    "8592": [-0.03598, 0.46402, 0, 0, 0.5],
    "8594": [-0.03598, 0.46402, 0, 0, 0.5],
    "8602": [-0.13313, 0.36687, 0, 0, 1],
    "8603": [-0.13313, 0.36687, 0, 0, 1],
    "8606": [0.01354, 0.52239, 0, 0, 1],
    "8608": [0.01354, 0.52239, 0, 0, 1],
    "8610": [0.01354, 0.52239, 0, 0, 1.11111],
    "8611": [0.01354, 0.52239, 0, 0, 1.11111],
    "8619": [0, 0.54986, 0, 0, 1],
    "8620": [0, 0.54986, 0, 0, 1],
    "8621": [-0.13313, 0.37788, 0, 0, 1.38889],
    "8622": [-0.13313, 0.36687, 0, 0, 1],
    "8624": [0, 0.69224, 0, 0, 0.5],
    "8625": [0, 0.69224, 0, 0, 0.5],
    "8630": [0, 0.43056, 0, 0, 1],
    "8631": [0, 0.43056, 0, 0, 1],
    "8634": [0.08198, 0.58198, 0, 0, 0.77778],
    "8635": [0.08198, 0.58198, 0, 0, 0.77778],
    "8638": [0.19444, 0.69224, 0, 0, 0.41667],
    "8639": [0.19444, 0.69224, 0, 0, 0.41667],
    "8642": [0.19444, 0.69224, 0, 0, 0.41667],
    "8643": [0.19444, 0.69224, 0, 0, 0.41667],
    "8644": [0.1808, 0.675, 0, 0, 1],
    "8646": [0.1808, 0.675, 0, 0, 1],
    "8647": [0.1808, 0.675, 0, 0, 1],
    "8648": [0.19444, 0.69224, 0, 0, 0.83334],
    "8649": [0.1808, 0.675, 0, 0, 1],
    "8650": [0.19444, 0.69224, 0, 0, 0.83334],
    "8651": [0.01354, 0.52239, 0, 0, 1],
    "8652": [0.01354, 0.52239, 0, 0, 1],
    "8653": [-0.13313, 0.36687, 0, 0, 1],
    "8654": [-0.13313, 0.36687, 0, 0, 1],
    "8655": [-0.13313, 0.36687, 0, 0, 1],
    "8666": [0.13667, 0.63667, 0, 0, 1],
    "8667": [0.13667, 0.63667, 0, 0, 1],
    "8669": [-0.13313, 0.37788, 0, 0, 1],
    "8672": [-0.064, 0.437, 0, 0, 1.334],
    "8674": [-0.064, 0.437, 0, 0, 1.334],
    "8705": [0, 0.825, 0, 0, 0.5],
    "8708": [0, 0.68889, 0, 0, 0.55556],
    "8709": [0.08167, 0.58167, 0, 0, 0.77778],
    "8717": [0, 0.43056, 0, 0, 0.42917],
    "8722": [-0.03598, 0.46402, 0, 0, 0.5],
    "8724": [0.08198, 0.69224, 0, 0, 0.77778],
    "8726": [0.08167, 0.58167, 0, 0, 0.77778],
    "8733": [0, 0.69224, 0, 0, 0.77778],
    "8736": [0, 0.69224, 0, 0, 0.72222],
    "8737": [0, 0.69224, 0, 0, 0.72222],
    "8738": [0.03517, 0.52239, 0, 0, 0.72222],
    "8739": [0.08167, 0.58167, 0, 0, 0.22222],
    "8740": [0.25142, 0.74111, 0, 0, 0.27778],
    "8741": [0.08167, 0.58167, 0, 0, 0.38889],
    "8742": [0.25142, 0.74111, 0, 0, 0.5],
    "8756": [0, 0.69224, 0, 0, 0.66667],
    "8757": [0, 0.69224, 0, 0, 0.66667],
    "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
    "8765": [-0.13313, 0.37788, 0, 0, 0.77778],
    "8769": [-0.13313, 0.36687, 0, 0, 0.77778],
    "8770": [-0.03625, 0.46375, 0, 0, 0.77778],
    "8774": [0.30274, 0.79383, 0, 0, 0.77778],
    "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
    "8778": [0.08167, 0.58167, 0, 0, 0.77778],
    "8782": [0.06062, 0.54986, 0, 0, 0.77778],
    "8783": [0.06062, 0.54986, 0, 0, 0.77778],
    "8785": [0.08198, 0.58198, 0, 0, 0.77778],
    "8786": [0.08198, 0.58198, 0, 0, 0.77778],
    "8787": [0.08198, 0.58198, 0, 0, 0.77778],
    "8790": [0, 0.69224, 0, 0, 0.77778],
    "8791": [0.22958, 0.72958, 0, 0, 0.77778],
    "8796": [0.08198, 0.91667, 0, 0, 0.77778],
    "8806": [0.25583, 0.75583, 0, 0, 0.77778],
    "8807": [0.25583, 0.75583, 0, 0, 0.77778],
    "8808": [0.25142, 0.75726, 0, 0, 0.77778],
    "8809": [0.25142, 0.75726, 0, 0, 0.77778],
    "8812": [0.25583, 0.75583, 0, 0, 0.5],
    "8814": [0.20576, 0.70576, 0, 0, 0.77778],
    "8815": [0.20576, 0.70576, 0, 0, 0.77778],
    "8816": [0.30274, 0.79383, 0, 0, 0.77778],
    "8817": [0.30274, 0.79383, 0, 0, 0.77778],
    "8818": [0.22958, 0.72958, 0, 0, 0.77778],
    "8819": [0.22958, 0.72958, 0, 0, 0.77778],
    "8822": [0.1808, 0.675, 0, 0, 0.77778],
    "8823": [0.1808, 0.675, 0, 0, 0.77778],
    "8828": [0.13667, 0.63667, 0, 0, 0.77778],
    "8829": [0.13667, 0.63667, 0, 0, 0.77778],
    "8830": [0.22958, 0.72958, 0, 0, 0.77778],
    "8831": [0.22958, 0.72958, 0, 0, 0.77778],
    "8832": [0.20576, 0.70576, 0, 0, 0.77778],
    "8833": [0.20576, 0.70576, 0, 0, 0.77778],
    "8840": [0.30274, 0.79383, 0, 0, 0.77778],
    "8841": [0.30274, 0.79383, 0, 0, 0.77778],
    "8842": [0.13597, 0.63597, 0, 0, 0.77778],
    "8843": [0.13597, 0.63597, 0, 0, 0.77778],
    "8847": [0.03517, 0.54986, 0, 0, 0.77778],
    "8848": [0.03517, 0.54986, 0, 0, 0.77778],
    "8858": [0.08198, 0.58198, 0, 0, 0.77778],
    "8859": [0.08198, 0.58198, 0, 0, 0.77778],
    "8861": [0.08198, 0.58198, 0, 0, 0.77778],
    "8862": [0, 0.675, 0, 0, 0.77778],
    "8863": [0, 0.675, 0, 0, 0.77778],
    "8864": [0, 0.675, 0, 0, 0.77778],
    "8865": [0, 0.675, 0, 0, 0.77778],
    "8872": [0, 0.69224, 0, 0, 0.61111],
    "8873": [0, 0.69224, 0, 0, 0.72222],
    "8874": [0, 0.69224, 0, 0, 0.88889],
    "8876": [0, 0.68889, 0, 0, 0.61111],
    "8877": [0, 0.68889, 0, 0, 0.61111],
    "8878": [0, 0.68889, 0, 0, 0.72222],
    "8879": [0, 0.68889, 0, 0, 0.72222],
    "8882": [0.03517, 0.54986, 0, 0, 0.77778],
    "8883": [0.03517, 0.54986, 0, 0, 0.77778],
    "8884": [0.13667, 0.63667, 0, 0, 0.77778],
    "8885": [0.13667, 0.63667, 0, 0, 0.77778],
    "8888": [0, 0.54986, 0, 0, 1.11111],
    "8890": [0.19444, 0.43056, 0, 0, 0.55556],
    "8891": [0.19444, 0.69224, 0, 0, 0.61111],
    "8892": [0.19444, 0.69224, 0, 0, 0.61111],
    "8901": [0, 0.54986, 0, 0, 0.27778],
    "8903": [0.08167, 0.58167, 0, 0, 0.77778],
    "8905": [0.08167, 0.58167, 0, 0, 0.77778],
    "8906": [0.08167, 0.58167, 0, 0, 0.77778],
    "8907": [0, 0.69224, 0, 0, 0.77778],
    "8908": [0, 0.69224, 0, 0, 0.77778],
    "8909": [-0.03598, 0.46402, 0, 0, 0.77778],
    "8910": [0, 0.54986, 0, 0, 0.76042],
    "8911": [0, 0.54986, 0, 0, 0.76042],
    "8912": [0.03517, 0.54986, 0, 0, 0.77778],
    "8913": [0.03517, 0.54986, 0, 0, 0.77778],
    "8914": [0, 0.54986, 0, 0, 0.66667],
    "8915": [0, 0.54986, 0, 0, 0.66667],
    "8916": [0, 0.69224, 0, 0, 0.66667],
    "8918": [0.0391, 0.5391, 0, 0, 0.77778],
    "8919": [0.0391, 0.5391, 0, 0, 0.77778],
    "8920": [0.03517, 0.54986, 0, 0, 1.33334],
    "8921": [0.03517, 0.54986, 0, 0, 1.33334],
    "8922": [0.38569, 0.88569, 0, 0, 0.77778],
    "8923": [0.38569, 0.88569, 0, 0, 0.77778],
    "8926": [0.13667, 0.63667, 0, 0, 0.77778],
    "8927": [0.13667, 0.63667, 0, 0, 0.77778],
    "8928": [0.30274, 0.79383, 0, 0, 0.77778],
    "8929": [0.30274, 0.79383, 0, 0, 0.77778],
    "8934": [0.23222, 0.74111, 0, 0, 0.77778],
    "8935": [0.23222, 0.74111, 0, 0, 0.77778],
    "8936": [0.23222, 0.74111, 0, 0, 0.77778],
    "8937": [0.23222, 0.74111, 0, 0, 0.77778],
    "8938": [0.20576, 0.70576, 0, 0, 0.77778],
    "8939": [0.20576, 0.70576, 0, 0, 0.77778],
    "8940": [0.30274, 0.79383, 0, 0, 0.77778],
    "8941": [0.30274, 0.79383, 0, 0, 0.77778],
    "8994": [0.19444, 0.69224, 0, 0, 0.77778],
    "8995": [0.19444, 0.69224, 0, 0, 0.77778],
    "9416": [0.15559, 0.69224, 0, 0, 0.90222],
    "9484": [0, 0.69224, 0, 0, 0.5],
    "9488": [0, 0.69224, 0, 0, 0.5],
    "9492": [0, 0.37788, 0, 0, 0.5],
    "9496": [0, 0.37788, 0, 0, 0.5],
    "9585": [0.19444, 0.68889, 0, 0, 0.88889],
    "9586": [0.19444, 0.74111, 0, 0, 0.88889],
    "9632": [0, 0.675, 0, 0, 0.77778],
    "9633": [0, 0.675, 0, 0, 0.77778],
    "9650": [0, 0.54986, 0, 0, 0.72222],
    "9651": [0, 0.54986, 0, 0, 0.72222],
    "9654": [0.03517, 0.54986, 0, 0, 0.77778],
    "9660": [0, 0.54986, 0, 0, 0.72222],
    "9661": [0, 0.54986, 0, 0, 0.72222],
    "9664": [0.03517, 0.54986, 0, 0, 0.77778],
    "9674": [0.11111, 0.69224, 0, 0, 0.66667],
    "9733": [0.19444, 0.69224, 0, 0, 0.94445],
    "10003": [0, 0.69224, 0, 0, 0.83334],
    "10016": [0, 0.69224, 0, 0, 0.83334],
    "10731": [0.11111, 0.69224, 0, 0, 0.66667],
    "10846": [0.19444, 0.75583, 0, 0, 0.61111],
    "10877": [0.13667, 0.63667, 0, 0, 0.77778],
    "10878": [0.13667, 0.63667, 0, 0, 0.77778],
    "10885": [0.25583, 0.75583, 0, 0, 0.77778],
    "10886": [0.25583, 0.75583, 0, 0, 0.77778],
    "10887": [0.13597, 0.63597, 0, 0, 0.77778],
    "10888": [0.13597, 0.63597, 0, 0, 0.77778],
    "10889": [0.26167, 0.75726, 0, 0, 0.77778],
    "10890": [0.26167, 0.75726, 0, 0, 0.77778],
    "10891": [0.48256, 0.98256, 0, 0, 0.77778],
    "10892": [0.48256, 0.98256, 0, 0, 0.77778],
    "10901": [0.13667, 0.63667, 0, 0, 0.77778],
    "10902": [0.13667, 0.63667, 0, 0, 0.77778],
    "10933": [0.25142, 0.75726, 0, 0, 0.77778],
    "10934": [0.25142, 0.75726, 0, 0, 0.77778],
    "10935": [0.26167, 0.75726, 0, 0, 0.77778],
    "10936": [0.26167, 0.75726, 0, 0, 0.77778],
    "10937": [0.26167, 0.75726, 0, 0, 0.77778],
    "10938": [0.26167, 0.75726, 0, 0, 0.77778],
    "10949": [0.25583, 0.75583, 0, 0, 0.77778],
    "10950": [0.25583, 0.75583, 0, 0, 0.77778],
    "10955": [0.28481, 0.79383, 0, 0, 0.77778],
    "10956": [0.28481, 0.79383, 0, 0, 0.77778],
    "57350": [0.08167, 0.58167, 0, 0, 0.22222],
    "57351": [0.08167, 0.58167, 0, 0, 0.38889],
    "57352": [0.08167, 0.58167, 0, 0, 0.77778],
    "57353": [0, 0.43056, 0.04028, 0, 0.66667],
    "57356": [0.25142, 0.75726, 0, 0, 0.77778],
    "57357": [0.25142, 0.75726, 0, 0, 0.77778],
    "57358": [0.41951, 0.91951, 0, 0, 0.77778],
    "57359": [0.30274, 0.79383, 0, 0, 0.77778],
    "57360": [0.30274, 0.79383, 0, 0, 0.77778],
    "57361": [0.41951, 0.91951, 0, 0, 0.77778],
    "57366": [0.25142, 0.75726, 0, 0, 0.77778],
    "57367": [0.25142, 0.75726, 0, 0, 0.77778],
    "57368": [0.25142, 0.75726, 0, 0, 0.77778],
    "57369": [0.25142, 0.75726, 0, 0, 0.77778],
    "57370": [0.13597, 0.63597, 0, 0, 0.77778],
    "57371": [0.13597, 0.63597, 0, 0, 0.77778]
  },
  "Caligraphic-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "65": [0, 0.68333, 0, 0.19445, 0.79847],
    "66": [0, 0.68333, 0.03041, 0.13889, 0.65681],
    "67": [0, 0.68333, 0.05834, 0.13889, 0.52653],
    "68": [0, 0.68333, 0.02778, 0.08334, 0.77139],
    "69": [0, 0.68333, 0.08944, 0.11111, 0.52778],
    "70": [0, 0.68333, 0.09931, 0.11111, 0.71875],
    "71": [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
    "72": [0, 0.68333, 965e-5, 0.11111, 0.84452],
    "73": [0, 0.68333, 0.07382, 0, 0.54452],
    "74": [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
    "75": [0, 0.68333, 0.01445, 0.05556, 0.76195],
    "76": [0, 0.68333, 0, 0.13889, 0.68972],
    "77": [0, 0.68333, 0, 0.13889, 1.2009],
    "78": [0, 0.68333, 0.14736, 0.08334, 0.82049],
    "79": [0, 0.68333, 0.02778, 0.11111, 0.79611],
    "80": [0, 0.68333, 0.08222, 0.08334, 0.69556],
    "81": [0.09722, 0.68333, 0, 0.11111, 0.81667],
    "82": [0, 0.68333, 0, 0.08334, 0.8475],
    "83": [0, 0.68333, 0.075, 0.13889, 0.60556],
    "84": [0, 0.68333, 0.25417, 0, 0.54464],
    "85": [0, 0.68333, 0.09931, 0.08334, 0.62583],
    "86": [0, 0.68333, 0.08222, 0, 0.61278],
    "87": [0, 0.68333, 0.08222, 0.08334, 0.98778],
    "88": [0, 0.68333, 0.14643, 0.13889, 0.7133],
    "89": [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
    "90": [0, 0.68333, 0.07944, 0.13889, 0.72473],
    "160": [0, 0, 0, 0, 0.25]
  },
  "Fraktur-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69141, 0, 0, 0.29574],
    "34": [0, 0.69141, 0, 0, 0.21471],
    "38": [0, 0.69141, 0, 0, 0.73786],
    "39": [0, 0.69141, 0, 0, 0.21201],
    "40": [0.24982, 0.74947, 0, 0, 0.38865],
    "41": [0.24982, 0.74947, 0, 0, 0.38865],
    "42": [0, 0.62119, 0, 0, 0.27764],
    "43": [0.08319, 0.58283, 0, 0, 0.75623],
    "44": [0, 0.10803, 0, 0, 0.27764],
    "45": [0.08319, 0.58283, 0, 0, 0.75623],
    "46": [0, 0.10803, 0, 0, 0.27764],
    "47": [0.24982, 0.74947, 0, 0, 0.50181],
    "48": [0, 0.47534, 0, 0, 0.50181],
    "49": [0, 0.47534, 0, 0, 0.50181],
    "50": [0, 0.47534, 0, 0, 0.50181],
    "51": [0.18906, 0.47534, 0, 0, 0.50181],
    "52": [0.18906, 0.47534, 0, 0, 0.50181],
    "53": [0.18906, 0.47534, 0, 0, 0.50181],
    "54": [0, 0.69141, 0, 0, 0.50181],
    "55": [0.18906, 0.47534, 0, 0, 0.50181],
    "56": [0, 0.69141, 0, 0, 0.50181],
    "57": [0.18906, 0.47534, 0, 0, 0.50181],
    "58": [0, 0.47534, 0, 0, 0.21606],
    "59": [0.12604, 0.47534, 0, 0, 0.21606],
    "61": [-0.13099, 0.36866, 0, 0, 0.75623],
    "63": [0, 0.69141, 0, 0, 0.36245],
    "65": [0, 0.69141, 0, 0, 0.7176],
    "66": [0, 0.69141, 0, 0, 0.88397],
    "67": [0, 0.69141, 0, 0, 0.61254],
    "68": [0, 0.69141, 0, 0, 0.83158],
    "69": [0, 0.69141, 0, 0, 0.66278],
    "70": [0.12604, 0.69141, 0, 0, 0.61119],
    "71": [0, 0.69141, 0, 0, 0.78539],
    "72": [0.06302, 0.69141, 0, 0, 0.7203],
    "73": [0, 0.69141, 0, 0, 0.55448],
    "74": [0.12604, 0.69141, 0, 0, 0.55231],
    "75": [0, 0.69141, 0, 0, 0.66845],
    "76": [0, 0.69141, 0, 0, 0.66602],
    "77": [0, 0.69141, 0, 0, 1.04953],
    "78": [0, 0.69141, 0, 0, 0.83212],
    "79": [0, 0.69141, 0, 0, 0.82699],
    "80": [0.18906, 0.69141, 0, 0, 0.82753],
    "81": [0.03781, 0.69141, 0, 0, 0.82699],
    "82": [0, 0.69141, 0, 0, 0.82807],
    "83": [0, 0.69141, 0, 0, 0.82861],
    "84": [0, 0.69141, 0, 0, 0.66899],
    "85": [0, 0.69141, 0, 0, 0.64576],
    "86": [0, 0.69141, 0, 0, 0.83131],
    "87": [0, 0.69141, 0, 0, 1.04602],
    "88": [0, 0.69141, 0, 0, 0.71922],
    "89": [0.18906, 0.69141, 0, 0, 0.83293],
    "90": [0.12604, 0.69141, 0, 0, 0.60201],
    "91": [0.24982, 0.74947, 0, 0, 0.27764],
    "93": [0.24982, 0.74947, 0, 0, 0.27764],
    "94": [0, 0.69141, 0, 0, 0.49965],
    "97": [0, 0.47534, 0, 0, 0.50046],
    "98": [0, 0.69141, 0, 0, 0.51315],
    "99": [0, 0.47534, 0, 0, 0.38946],
    "100": [0, 0.62119, 0, 0, 0.49857],
    "101": [0, 0.47534, 0, 0, 0.40053],
    "102": [0.18906, 0.69141, 0, 0, 0.32626],
    "103": [0.18906, 0.47534, 0, 0, 0.5037],
    "104": [0.18906, 0.69141, 0, 0, 0.52126],
    "105": [0, 0.69141, 0, 0, 0.27899],
    "106": [0, 0.69141, 0, 0, 0.28088],
    "107": [0, 0.69141, 0, 0, 0.38946],
    "108": [0, 0.69141, 0, 0, 0.27953],
    "109": [0, 0.47534, 0, 0, 0.76676],
    "110": [0, 0.47534, 0, 0, 0.52666],
    "111": [0, 0.47534, 0, 0, 0.48885],
    "112": [0.18906, 0.52396, 0, 0, 0.50046],
    "113": [0.18906, 0.47534, 0, 0, 0.48912],
    "114": [0, 0.47534, 0, 0, 0.38919],
    "115": [0, 0.47534, 0, 0, 0.44266],
    "116": [0, 0.62119, 0, 0, 0.33301],
    "117": [0, 0.47534, 0, 0, 0.5172],
    "118": [0, 0.52396, 0, 0, 0.5118],
    "119": [0, 0.52396, 0, 0, 0.77351],
    "120": [0.18906, 0.47534, 0, 0, 0.38865],
    "121": [0.18906, 0.47534, 0, 0, 0.49884],
    "122": [0.18906, 0.47534, 0, 0, 0.39054],
    "160": [0, 0, 0, 0, 0.25],
    "8216": [0, 0.69141, 0, 0, 0.21471],
    "8217": [0, 0.69141, 0, 0, 0.21471],
    "58112": [0, 0.62119, 0, 0, 0.49749],
    "58113": [0, 0.62119, 0, 0, 0.4983],
    "58114": [0.18906, 0.69141, 0, 0, 0.33328],
    "58115": [0.18906, 0.69141, 0, 0, 0.32923],
    "58116": [0.18906, 0.47534, 0, 0, 0.50343],
    "58117": [0, 0.69141, 0, 0, 0.33301],
    "58118": [0, 0.62119, 0, 0, 0.33409],
    "58119": [0, 0.47534, 0, 0, 0.50073]
  },
  "Main-Bold": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69444, 0, 0, 0.35],
    "34": [0, 0.69444, 0, 0, 0.60278],
    "35": [0.19444, 0.69444, 0, 0, 0.95833],
    "36": [0.05556, 0.75, 0, 0, 0.575],
    "37": [0.05556, 0.75, 0, 0, 0.95833],
    "38": [0, 0.69444, 0, 0, 0.89444],
    "39": [0, 0.69444, 0, 0, 0.31944],
    "40": [0.25, 0.75, 0, 0, 0.44722],
    "41": [0.25, 0.75, 0, 0, 0.44722],
    "42": [0, 0.75, 0, 0, 0.575],
    "43": [0.13333, 0.63333, 0, 0, 0.89444],
    "44": [0.19444, 0.15556, 0, 0, 0.31944],
    "45": [0, 0.44444, 0, 0, 0.38333],
    "46": [0, 0.15556, 0, 0, 0.31944],
    "47": [0.25, 0.75, 0, 0, 0.575],
    "48": [0, 0.64444, 0, 0, 0.575],
    "49": [0, 0.64444, 0, 0, 0.575],
    "50": [0, 0.64444, 0, 0, 0.575],
    "51": [0, 0.64444, 0, 0, 0.575],
    "52": [0, 0.64444, 0, 0, 0.575],
    "53": [0, 0.64444, 0, 0, 0.575],
    "54": [0, 0.64444, 0, 0, 0.575],
    "55": [0, 0.64444, 0, 0, 0.575],
    "56": [0, 0.64444, 0, 0, 0.575],
    "57": [0, 0.64444, 0, 0, 0.575],
    "58": [0, 0.44444, 0, 0, 0.31944],
    "59": [0.19444, 0.44444, 0, 0, 0.31944],
    "60": [0.08556, 0.58556, 0, 0, 0.89444],
    "61": [-0.10889, 0.39111, 0, 0, 0.89444],
    "62": [0.08556, 0.58556, 0, 0, 0.89444],
    "63": [0, 0.69444, 0, 0, 0.54305],
    "64": [0, 0.69444, 0, 0, 0.89444],
    "65": [0, 0.68611, 0, 0, 0.86944],
    "66": [0, 0.68611, 0, 0, 0.81805],
    "67": [0, 0.68611, 0, 0, 0.83055],
    "68": [0, 0.68611, 0, 0, 0.88194],
    "69": [0, 0.68611, 0, 0, 0.75555],
    "70": [0, 0.68611, 0, 0, 0.72361],
    "71": [0, 0.68611, 0, 0, 0.90416],
    "72": [0, 0.68611, 0, 0, 0.9],
    "73": [0, 0.68611, 0, 0, 0.43611],
    "74": [0, 0.68611, 0, 0, 0.59444],
    "75": [0, 0.68611, 0, 0, 0.90138],
    "76": [0, 0.68611, 0, 0, 0.69166],
    "77": [0, 0.68611, 0, 0, 1.09166],
    "78": [0, 0.68611, 0, 0, 0.9],
    "79": [0, 0.68611, 0, 0, 0.86388],
    "80": [0, 0.68611, 0, 0, 0.78611],
    "81": [0.19444, 0.68611, 0, 0, 0.86388],
    "82": [0, 0.68611, 0, 0, 0.8625],
    "83": [0, 0.68611, 0, 0, 0.63889],
    "84": [0, 0.68611, 0, 0, 0.8],
    "85": [0, 0.68611, 0, 0, 0.88472],
    "86": [0, 0.68611, 0.01597, 0, 0.86944],
    "87": [0, 0.68611, 0.01597, 0, 1.18888],
    "88": [0, 0.68611, 0, 0, 0.86944],
    "89": [0, 0.68611, 0.02875, 0, 0.86944],
    "90": [0, 0.68611, 0, 0, 0.70277],
    "91": [0.25, 0.75, 0, 0, 0.31944],
    "92": [0.25, 0.75, 0, 0, 0.575],
    "93": [0.25, 0.75, 0, 0, 0.31944],
    "94": [0, 0.69444, 0, 0, 0.575],
    "95": [0.31, 0.13444, 0.03194, 0, 0.575],
    "97": [0, 0.44444, 0, 0, 0.55902],
    "98": [0, 0.69444, 0, 0, 0.63889],
    "99": [0, 0.44444, 0, 0, 0.51111],
    "100": [0, 0.69444, 0, 0, 0.63889],
    "101": [0, 0.44444, 0, 0, 0.52708],
    "102": [0, 0.69444, 0.10903, 0, 0.35139],
    "103": [0.19444, 0.44444, 0.01597, 0, 0.575],
    "104": [0, 0.69444, 0, 0, 0.63889],
    "105": [0, 0.69444, 0, 0, 0.31944],
    "106": [0.19444, 0.69444, 0, 0, 0.35139],
    "107": [0, 0.69444, 0, 0, 0.60694],
    "108": [0, 0.69444, 0, 0, 0.31944],
    "109": [0, 0.44444, 0, 0, 0.95833],
    "110": [0, 0.44444, 0, 0, 0.63889],
    "111": [0, 0.44444, 0, 0, 0.575],
    "112": [0.19444, 0.44444, 0, 0, 0.63889],
    "113": [0.19444, 0.44444, 0, 0, 0.60694],
    "114": [0, 0.44444, 0, 0, 0.47361],
    "115": [0, 0.44444, 0, 0, 0.45361],
    "116": [0, 0.63492, 0, 0, 0.44722],
    "117": [0, 0.44444, 0, 0, 0.63889],
    "118": [0, 0.44444, 0.01597, 0, 0.60694],
    "119": [0, 0.44444, 0.01597, 0, 0.83055],
    "120": [0, 0.44444, 0, 0, 0.60694],
    "121": [0.19444, 0.44444, 0.01597, 0, 0.60694],
    "122": [0, 0.44444, 0, 0, 0.51111],
    "123": [0.25, 0.75, 0, 0, 0.575],
    "124": [0.25, 0.75, 0, 0, 0.31944],
    "125": [0.25, 0.75, 0, 0, 0.575],
    "126": [0.35, 0.34444, 0, 0, 0.575],
    "160": [0, 0, 0, 0, 0.25],
    "163": [0, 0.69444, 0, 0, 0.86853],
    "168": [0, 0.69444, 0, 0, 0.575],
    "172": [0, 0.44444, 0, 0, 0.76666],
    "176": [0, 0.69444, 0, 0, 0.86944],
    "177": [0.13333, 0.63333, 0, 0, 0.89444],
    "184": [0.17014, 0, 0, 0, 0.51111],
    "198": [0, 0.68611, 0, 0, 1.04166],
    "215": [0.13333, 0.63333, 0, 0, 0.89444],
    "216": [0.04861, 0.73472, 0, 0, 0.89444],
    "223": [0, 0.69444, 0, 0, 0.59722],
    "230": [0, 0.44444, 0, 0, 0.83055],
    "247": [0.13333, 0.63333, 0, 0, 0.89444],
    "248": [0.09722, 0.54167, 0, 0, 0.575],
    "305": [0, 0.44444, 0, 0, 0.31944],
    "338": [0, 0.68611, 0, 0, 1.16944],
    "339": [0, 0.44444, 0, 0, 0.89444],
    "567": [0.19444, 0.44444, 0, 0, 0.35139],
    "710": [0, 0.69444, 0, 0, 0.575],
    "711": [0, 0.63194, 0, 0, 0.575],
    "713": [0, 0.59611, 0, 0, 0.575],
    "714": [0, 0.69444, 0, 0, 0.575],
    "715": [0, 0.69444, 0, 0, 0.575],
    "728": [0, 0.69444, 0, 0, 0.575],
    "729": [0, 0.69444, 0, 0, 0.31944],
    "730": [0, 0.69444, 0, 0, 0.86944],
    "732": [0, 0.69444, 0, 0, 0.575],
    "733": [0, 0.69444, 0, 0, 0.575],
    "915": [0, 0.68611, 0, 0, 0.69166],
    "916": [0, 0.68611, 0, 0, 0.95833],
    "920": [0, 0.68611, 0, 0, 0.89444],
    "923": [0, 0.68611, 0, 0, 0.80555],
    "926": [0, 0.68611, 0, 0, 0.76666],
    "928": [0, 0.68611, 0, 0, 0.9],
    "931": [0, 0.68611, 0, 0, 0.83055],
    "933": [0, 0.68611, 0, 0, 0.89444],
    "934": [0, 0.68611, 0, 0, 0.83055],
    "936": [0, 0.68611, 0, 0, 0.89444],
    "937": [0, 0.68611, 0, 0, 0.83055],
    "8211": [0, 0.44444, 0.03194, 0, 0.575],
    "8212": [0, 0.44444, 0.03194, 0, 1.14999],
    "8216": [0, 0.69444, 0, 0, 0.31944],
    "8217": [0, 0.69444, 0, 0, 0.31944],
    "8220": [0, 0.69444, 0, 0, 0.60278],
    "8221": [0, 0.69444, 0, 0, 0.60278],
    "8224": [0.19444, 0.69444, 0, 0, 0.51111],
    "8225": [0.19444, 0.69444, 0, 0, 0.51111],
    "8242": [0, 0.55556, 0, 0, 0.34444],
    "8407": [0, 0.72444, 0.15486, 0, 0.575],
    "8463": [0, 0.69444, 0, 0, 0.66759],
    "8465": [0, 0.69444, 0, 0, 0.83055],
    "8467": [0, 0.69444, 0, 0, 0.47361],
    "8472": [0.19444, 0.44444, 0, 0, 0.74027],
    "8476": [0, 0.69444, 0, 0, 0.83055],
    "8501": [0, 0.69444, 0, 0, 0.70277],
    "8592": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8593": [0.19444, 0.69444, 0, 0, 0.575],
    "8594": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8595": [0.19444, 0.69444, 0, 0, 0.575],
    "8596": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8597": [0.25, 0.75, 0, 0, 0.575],
    "8598": [0.19444, 0.69444, 0, 0, 1.14999],
    "8599": [0.19444, 0.69444, 0, 0, 1.14999],
    "8600": [0.19444, 0.69444, 0, 0, 1.14999],
    "8601": [0.19444, 0.69444, 0, 0, 1.14999],
    "8636": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8637": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8640": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8641": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8656": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8657": [0.19444, 0.69444, 0, 0, 0.70277],
    "8658": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8659": [0.19444, 0.69444, 0, 0, 0.70277],
    "8660": [-0.10889, 0.39111, 0, 0, 1.14999],
    "8661": [0.25, 0.75, 0, 0, 0.70277],
    "8704": [0, 0.69444, 0, 0, 0.63889],
    "8706": [0, 0.69444, 0.06389, 0, 0.62847],
    "8707": [0, 0.69444, 0, 0, 0.63889],
    "8709": [0.05556, 0.75, 0, 0, 0.575],
    "8711": [0, 0.68611, 0, 0, 0.95833],
    "8712": [0.08556, 0.58556, 0, 0, 0.76666],
    "8715": [0.08556, 0.58556, 0, 0, 0.76666],
    "8722": [0.13333, 0.63333, 0, 0, 0.89444],
    "8723": [0.13333, 0.63333, 0, 0, 0.89444],
    "8725": [0.25, 0.75, 0, 0, 0.575],
    "8726": [0.25, 0.75, 0, 0, 0.575],
    "8727": [-0.02778, 0.47222, 0, 0, 0.575],
    "8728": [-0.02639, 0.47361, 0, 0, 0.575],
    "8729": [-0.02639, 0.47361, 0, 0, 0.575],
    "8730": [0.18, 0.82, 0, 0, 0.95833],
    "8733": [0, 0.44444, 0, 0, 0.89444],
    "8734": [0, 0.44444, 0, 0, 1.14999],
    "8736": [0, 0.69224, 0, 0, 0.72222],
    "8739": [0.25, 0.75, 0, 0, 0.31944],
    "8741": [0.25, 0.75, 0, 0, 0.575],
    "8743": [0, 0.55556, 0, 0, 0.76666],
    "8744": [0, 0.55556, 0, 0, 0.76666],
    "8745": [0, 0.55556, 0, 0, 0.76666],
    "8746": [0, 0.55556, 0, 0, 0.76666],
    "8747": [0.19444, 0.69444, 0.12778, 0, 0.56875],
    "8764": [-0.10889, 0.39111, 0, 0, 0.89444],
    "8768": [0.19444, 0.69444, 0, 0, 0.31944],
    "8771": [222e-5, 0.50222, 0, 0, 0.89444],
    "8773": [0.027, 0.638, 0, 0, 0.894],
    "8776": [0.02444, 0.52444, 0, 0, 0.89444],
    "8781": [222e-5, 0.50222, 0, 0, 0.89444],
    "8801": [222e-5, 0.50222, 0, 0, 0.89444],
    "8804": [0.19667, 0.69667, 0, 0, 0.89444],
    "8805": [0.19667, 0.69667, 0, 0, 0.89444],
    "8810": [0.08556, 0.58556, 0, 0, 1.14999],
    "8811": [0.08556, 0.58556, 0, 0, 1.14999],
    "8826": [0.08556, 0.58556, 0, 0, 0.89444],
    "8827": [0.08556, 0.58556, 0, 0, 0.89444],
    "8834": [0.08556, 0.58556, 0, 0, 0.89444],
    "8835": [0.08556, 0.58556, 0, 0, 0.89444],
    "8838": [0.19667, 0.69667, 0, 0, 0.89444],
    "8839": [0.19667, 0.69667, 0, 0, 0.89444],
    "8846": [0, 0.55556, 0, 0, 0.76666],
    "8849": [0.19667, 0.69667, 0, 0, 0.89444],
    "8850": [0.19667, 0.69667, 0, 0, 0.89444],
    "8851": [0, 0.55556, 0, 0, 0.76666],
    "8852": [0, 0.55556, 0, 0, 0.76666],
    "8853": [0.13333, 0.63333, 0, 0, 0.89444],
    "8854": [0.13333, 0.63333, 0, 0, 0.89444],
    "8855": [0.13333, 0.63333, 0, 0, 0.89444],
    "8856": [0.13333, 0.63333, 0, 0, 0.89444],
    "8857": [0.13333, 0.63333, 0, 0, 0.89444],
    "8866": [0, 0.69444, 0, 0, 0.70277],
    "8867": [0, 0.69444, 0, 0, 0.70277],
    "8868": [0, 0.69444, 0, 0, 0.89444],
    "8869": [0, 0.69444, 0, 0, 0.89444],
    "8900": [-0.02639, 0.47361, 0, 0, 0.575],
    "8901": [-0.02639, 0.47361, 0, 0, 0.31944],
    "8902": [-0.02778, 0.47222, 0, 0, 0.575],
    "8968": [0.25, 0.75, 0, 0, 0.51111],
    "8969": [0.25, 0.75, 0, 0, 0.51111],
    "8970": [0.25, 0.75, 0, 0, 0.51111],
    "8971": [0.25, 0.75, 0, 0, 0.51111],
    "8994": [-0.13889, 0.36111, 0, 0, 1.14999],
    "8995": [-0.13889, 0.36111, 0, 0, 1.14999],
    "9651": [0.19444, 0.69444, 0, 0, 1.02222],
    "9657": [-0.02778, 0.47222, 0, 0, 0.575],
    "9661": [0.19444, 0.69444, 0, 0, 1.02222],
    "9667": [-0.02778, 0.47222, 0, 0, 0.575],
    "9711": [0.19444, 0.69444, 0, 0, 1.14999],
    "9824": [0.12963, 0.69444, 0, 0, 0.89444],
    "9825": [0.12963, 0.69444, 0, 0, 0.89444],
    "9826": [0.12963, 0.69444, 0, 0, 0.89444],
    "9827": [0.12963, 0.69444, 0, 0, 0.89444],
    "9837": [0, 0.75, 0, 0, 0.44722],
    "9838": [0.19444, 0.69444, 0, 0, 0.44722],
    "9839": [0.19444, 0.69444, 0, 0, 0.44722],
    "10216": [0.25, 0.75, 0, 0, 0.44722],
    "10217": [0.25, 0.75, 0, 0, 0.44722],
    "10815": [0, 0.68611, 0, 0, 0.9],
    "10927": [0.19667, 0.69667, 0, 0, 0.89444],
    "10928": [0.19667, 0.69667, 0, 0, 0.89444],
    "57376": [0.19444, 0.69444, 0, 0, 0]
  },
  "Main-BoldItalic": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69444, 0.11417, 0, 0.38611],
    "34": [0, 0.69444, 0.07939, 0, 0.62055],
    "35": [0.19444, 0.69444, 0.06833, 0, 0.94444],
    "37": [0.05556, 0.75, 0.12861, 0, 0.94444],
    "38": [0, 0.69444, 0.08528, 0, 0.88555],
    "39": [0, 0.69444, 0.12945, 0, 0.35555],
    "40": [0.25, 0.75, 0.15806, 0, 0.47333],
    "41": [0.25, 0.75, 0.03306, 0, 0.47333],
    "42": [0, 0.75, 0.14333, 0, 0.59111],
    "43": [0.10333, 0.60333, 0.03306, 0, 0.88555],
    "44": [0.19444, 0.14722, 0, 0, 0.35555],
    "45": [0, 0.44444, 0.02611, 0, 0.41444],
    "46": [0, 0.14722, 0, 0, 0.35555],
    "47": [0.25, 0.75, 0.15806, 0, 0.59111],
    "48": [0, 0.64444, 0.13167, 0, 0.59111],
    "49": [0, 0.64444, 0.13167, 0, 0.59111],
    "50": [0, 0.64444, 0.13167, 0, 0.59111],
    "51": [0, 0.64444, 0.13167, 0, 0.59111],
    "52": [0.19444, 0.64444, 0.13167, 0, 0.59111],
    "53": [0, 0.64444, 0.13167, 0, 0.59111],
    "54": [0, 0.64444, 0.13167, 0, 0.59111],
    "55": [0.19444, 0.64444, 0.13167, 0, 0.59111],
    "56": [0, 0.64444, 0.13167, 0, 0.59111],
    "57": [0, 0.64444, 0.13167, 0, 0.59111],
    "58": [0, 0.44444, 0.06695, 0, 0.35555],
    "59": [0.19444, 0.44444, 0.06695, 0, 0.35555],
    "61": [-0.10889, 0.39111, 0.06833, 0, 0.88555],
    "63": [0, 0.69444, 0.11472, 0, 0.59111],
    "64": [0, 0.69444, 0.09208, 0, 0.88555],
    "65": [0, 0.68611, 0, 0, 0.86555],
    "66": [0, 0.68611, 0.0992, 0, 0.81666],
    "67": [0, 0.68611, 0.14208, 0, 0.82666],
    "68": [0, 0.68611, 0.09062, 0, 0.87555],
    "69": [0, 0.68611, 0.11431, 0, 0.75666],
    "70": [0, 0.68611, 0.12903, 0, 0.72722],
    "71": [0, 0.68611, 0.07347, 0, 0.89527],
    "72": [0, 0.68611, 0.17208, 0, 0.8961],
    "73": [0, 0.68611, 0.15681, 0, 0.47166],
    "74": [0, 0.68611, 0.145, 0, 0.61055],
    "75": [0, 0.68611, 0.14208, 0, 0.89499],
    "76": [0, 0.68611, 0, 0, 0.69777],
    "77": [0, 0.68611, 0.17208, 0, 1.07277],
    "78": [0, 0.68611, 0.17208, 0, 0.8961],
    "79": [0, 0.68611, 0.09062, 0, 0.85499],
    "80": [0, 0.68611, 0.0992, 0, 0.78721],
    "81": [0.19444, 0.68611, 0.09062, 0, 0.85499],
    "82": [0, 0.68611, 0.02559, 0, 0.85944],
    "83": [0, 0.68611, 0.11264, 0, 0.64999],
    "84": [0, 0.68611, 0.12903, 0, 0.7961],
    "85": [0, 0.68611, 0.17208, 0, 0.88083],
    "86": [0, 0.68611, 0.18625, 0, 0.86555],
    "87": [0, 0.68611, 0.18625, 0, 1.15999],
    "88": [0, 0.68611, 0.15681, 0, 0.86555],
    "89": [0, 0.68611, 0.19803, 0, 0.86555],
    "90": [0, 0.68611, 0.14208, 0, 0.70888],
    "91": [0.25, 0.75, 0.1875, 0, 0.35611],
    "93": [0.25, 0.75, 0.09972, 0, 0.35611],
    "94": [0, 0.69444, 0.06709, 0, 0.59111],
    "95": [0.31, 0.13444, 0.09811, 0, 0.59111],
    "97": [0, 0.44444, 0.09426, 0, 0.59111],
    "98": [0, 0.69444, 0.07861, 0, 0.53222],
    "99": [0, 0.44444, 0.05222, 0, 0.53222],
    "100": [0, 0.69444, 0.10861, 0, 0.59111],
    "101": [0, 0.44444, 0.085, 0, 0.53222],
    "102": [0.19444, 0.69444, 0.21778, 0, 0.4],
    "103": [0.19444, 0.44444, 0.105, 0, 0.53222],
    "104": [0, 0.69444, 0.09426, 0, 0.59111],
    "105": [0, 0.69326, 0.11387, 0, 0.35555],
    "106": [0.19444, 0.69326, 0.1672, 0, 0.35555],
    "107": [0, 0.69444, 0.11111, 0, 0.53222],
    "108": [0, 0.69444, 0.10861, 0, 0.29666],
    "109": [0, 0.44444, 0.09426, 0, 0.94444],
    "110": [0, 0.44444, 0.09426, 0, 0.64999],
    "111": [0, 0.44444, 0.07861, 0, 0.59111],
    "112": [0.19444, 0.44444, 0.07861, 0, 0.59111],
    "113": [0.19444, 0.44444, 0.105, 0, 0.53222],
    "114": [0, 0.44444, 0.11111, 0, 0.50167],
    "115": [0, 0.44444, 0.08167, 0, 0.48694],
    "116": [0, 0.63492, 0.09639, 0, 0.385],
    "117": [0, 0.44444, 0.09426, 0, 0.62055],
    "118": [0, 0.44444, 0.11111, 0, 0.53222],
    "119": [0, 0.44444, 0.11111, 0, 0.76777],
    "120": [0, 0.44444, 0.12583, 0, 0.56055],
    "121": [0.19444, 0.44444, 0.105, 0, 0.56166],
    "122": [0, 0.44444, 0.13889, 0, 0.49055],
    "126": [0.35, 0.34444, 0.11472, 0, 0.59111],
    "160": [0, 0, 0, 0, 0.25],
    "168": [0, 0.69444, 0.11473, 0, 0.59111],
    "176": [0, 0.69444, 0, 0, 0.94888],
    "184": [0.17014, 0, 0, 0, 0.53222],
    "198": [0, 0.68611, 0.11431, 0, 1.02277],
    "216": [0.04861, 0.73472, 0.09062, 0, 0.88555],
    "223": [0.19444, 0.69444, 0.09736, 0, 0.665],
    "230": [0, 0.44444, 0.085, 0, 0.82666],
    "248": [0.09722, 0.54167, 0.09458, 0, 0.59111],
    "305": [0, 0.44444, 0.09426, 0, 0.35555],
    "338": [0, 0.68611, 0.11431, 0, 1.14054],
    "339": [0, 0.44444, 0.085, 0, 0.82666],
    "567": [0.19444, 0.44444, 0.04611, 0, 0.385],
    "710": [0, 0.69444, 0.06709, 0, 0.59111],
    "711": [0, 0.63194, 0.08271, 0, 0.59111],
    "713": [0, 0.59444, 0.10444, 0, 0.59111],
    "714": [0, 0.69444, 0.08528, 0, 0.59111],
    "715": [0, 0.69444, 0, 0, 0.59111],
    "728": [0, 0.69444, 0.10333, 0, 0.59111],
    "729": [0, 0.69444, 0.12945, 0, 0.35555],
    "730": [0, 0.69444, 0, 0, 0.94888],
    "732": [0, 0.69444, 0.11472, 0, 0.59111],
    "733": [0, 0.69444, 0.11472, 0, 0.59111],
    "915": [0, 0.68611, 0.12903, 0, 0.69777],
    "916": [0, 0.68611, 0, 0, 0.94444],
    "920": [0, 0.68611, 0.09062, 0, 0.88555],
    "923": [0, 0.68611, 0, 0, 0.80666],
    "926": [0, 0.68611, 0.15092, 0, 0.76777],
    "928": [0, 0.68611, 0.17208, 0, 0.8961],
    "931": [0, 0.68611, 0.11431, 0, 0.82666],
    "933": [0, 0.68611, 0.10778, 0, 0.88555],
    "934": [0, 0.68611, 0.05632, 0, 0.82666],
    "936": [0, 0.68611, 0.10778, 0, 0.88555],
    "937": [0, 0.68611, 0.0992, 0, 0.82666],
    "8211": [0, 0.44444, 0.09811, 0, 0.59111],
    "8212": [0, 0.44444, 0.09811, 0, 1.18221],
    "8216": [0, 0.69444, 0.12945, 0, 0.35555],
    "8217": [0, 0.69444, 0.12945, 0, 0.35555],
    "8220": [0, 0.69444, 0.16772, 0, 0.62055],
    "8221": [0, 0.69444, 0.07939, 0, 0.62055]
  },
  "Main-Italic": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69444, 0.12417, 0, 0.30667],
    "34": [0, 0.69444, 0.06961, 0, 0.51444],
    "35": [0.19444, 0.69444, 0.06616, 0, 0.81777],
    "37": [0.05556, 0.75, 0.13639, 0, 0.81777],
    "38": [0, 0.69444, 0.09694, 0, 0.76666],
    "39": [0, 0.69444, 0.12417, 0, 0.30667],
    "40": [0.25, 0.75, 0.16194, 0, 0.40889],
    "41": [0.25, 0.75, 0.03694, 0, 0.40889],
    "42": [0, 0.75, 0.14917, 0, 0.51111],
    "43": [0.05667, 0.56167, 0.03694, 0, 0.76666],
    "44": [0.19444, 0.10556, 0, 0, 0.30667],
    "45": [0, 0.43056, 0.02826, 0, 0.35778],
    "46": [0, 0.10556, 0, 0, 0.30667],
    "47": [0.25, 0.75, 0.16194, 0, 0.51111],
    "48": [0, 0.64444, 0.13556, 0, 0.51111],
    "49": [0, 0.64444, 0.13556, 0, 0.51111],
    "50": [0, 0.64444, 0.13556, 0, 0.51111],
    "51": [0, 0.64444, 0.13556, 0, 0.51111],
    "52": [0.19444, 0.64444, 0.13556, 0, 0.51111],
    "53": [0, 0.64444, 0.13556, 0, 0.51111],
    "54": [0, 0.64444, 0.13556, 0, 0.51111],
    "55": [0.19444, 0.64444, 0.13556, 0, 0.51111],
    "56": [0, 0.64444, 0.13556, 0, 0.51111],
    "57": [0, 0.64444, 0.13556, 0, 0.51111],
    "58": [0, 0.43056, 0.0582, 0, 0.30667],
    "59": [0.19444, 0.43056, 0.0582, 0, 0.30667],
    "61": [-0.13313, 0.36687, 0.06616, 0, 0.76666],
    "63": [0, 0.69444, 0.1225, 0, 0.51111],
    "64": [0, 0.69444, 0.09597, 0, 0.76666],
    "65": [0, 0.68333, 0, 0, 0.74333],
    "66": [0, 0.68333, 0.10257, 0, 0.70389],
    "67": [0, 0.68333, 0.14528, 0, 0.71555],
    "68": [0, 0.68333, 0.09403, 0, 0.755],
    "69": [0, 0.68333, 0.12028, 0, 0.67833],
    "70": [0, 0.68333, 0.13305, 0, 0.65277],
    "71": [0, 0.68333, 0.08722, 0, 0.77361],
    "72": [0, 0.68333, 0.16389, 0, 0.74333],
    "73": [0, 0.68333, 0.15806, 0, 0.38555],
    "74": [0, 0.68333, 0.14028, 0, 0.525],
    "75": [0, 0.68333, 0.14528, 0, 0.76888],
    "76": [0, 0.68333, 0, 0, 0.62722],
    "77": [0, 0.68333, 0.16389, 0, 0.89666],
    "78": [0, 0.68333, 0.16389, 0, 0.74333],
    "79": [0, 0.68333, 0.09403, 0, 0.76666],
    "80": [0, 0.68333, 0.10257, 0, 0.67833],
    "81": [0.19444, 0.68333, 0.09403, 0, 0.76666],
    "82": [0, 0.68333, 0.03868, 0, 0.72944],
    "83": [0, 0.68333, 0.11972, 0, 0.56222],
    "84": [0, 0.68333, 0.13305, 0, 0.71555],
    "85": [0, 0.68333, 0.16389, 0, 0.74333],
    "86": [0, 0.68333, 0.18361, 0, 0.74333],
    "87": [0, 0.68333, 0.18361, 0, 0.99888],
    "88": [0, 0.68333, 0.15806, 0, 0.74333],
    "89": [0, 0.68333, 0.19383, 0, 0.74333],
    "90": [0, 0.68333, 0.14528, 0, 0.61333],
    "91": [0.25, 0.75, 0.1875, 0, 0.30667],
    "93": [0.25, 0.75, 0.10528, 0, 0.30667],
    "94": [0, 0.69444, 0.06646, 0, 0.51111],
    "95": [0.31, 0.12056, 0.09208, 0, 0.51111],
    "97": [0, 0.43056, 0.07671, 0, 0.51111],
    "98": [0, 0.69444, 0.06312, 0, 0.46],
    "99": [0, 0.43056, 0.05653, 0, 0.46],
    "100": [0, 0.69444, 0.10333, 0, 0.51111],
    "101": [0, 0.43056, 0.07514, 0, 0.46],
    "102": [0.19444, 0.69444, 0.21194, 0, 0.30667],
    "103": [0.19444, 0.43056, 0.08847, 0, 0.46],
    "104": [0, 0.69444, 0.07671, 0, 0.51111],
    "105": [0, 0.65536, 0.1019, 0, 0.30667],
    "106": [0.19444, 0.65536, 0.14467, 0, 0.30667],
    "107": [0, 0.69444, 0.10764, 0, 0.46],
    "108": [0, 0.69444, 0.10333, 0, 0.25555],
    "109": [0, 0.43056, 0.07671, 0, 0.81777],
    "110": [0, 0.43056, 0.07671, 0, 0.56222],
    "111": [0, 0.43056, 0.06312, 0, 0.51111],
    "112": [0.19444, 0.43056, 0.06312, 0, 0.51111],
    "113": [0.19444, 0.43056, 0.08847, 0, 0.46],
    "114": [0, 0.43056, 0.10764, 0, 0.42166],
    "115": [0, 0.43056, 0.08208, 0, 0.40889],
    "116": [0, 0.61508, 0.09486, 0, 0.33222],
    "117": [0, 0.43056, 0.07671, 0, 0.53666],
    "118": [0, 0.43056, 0.10764, 0, 0.46],
    "119": [0, 0.43056, 0.10764, 0, 0.66444],
    "120": [0, 0.43056, 0.12042, 0, 0.46389],
    "121": [0.19444, 0.43056, 0.08847, 0, 0.48555],
    "122": [0, 0.43056, 0.12292, 0, 0.40889],
    "126": [0.35, 0.31786, 0.11585, 0, 0.51111],
    "160": [0, 0, 0, 0, 0.25],
    "168": [0, 0.66786, 0.10474, 0, 0.51111],
    "176": [0, 0.69444, 0, 0, 0.83129],
    "184": [0.17014, 0, 0, 0, 0.46],
    "198": [0, 0.68333, 0.12028, 0, 0.88277],
    "216": [0.04861, 0.73194, 0.09403, 0, 0.76666],
    "223": [0.19444, 0.69444, 0.10514, 0, 0.53666],
    "230": [0, 0.43056, 0.07514, 0, 0.71555],
    "248": [0.09722, 0.52778, 0.09194, 0, 0.51111],
    "338": [0, 0.68333, 0.12028, 0, 0.98499],
    "339": [0, 0.43056, 0.07514, 0, 0.71555],
    "710": [0, 0.69444, 0.06646, 0, 0.51111],
    "711": [0, 0.62847, 0.08295, 0, 0.51111],
    "713": [0, 0.56167, 0.10333, 0, 0.51111],
    "714": [0, 0.69444, 0.09694, 0, 0.51111],
    "715": [0, 0.69444, 0, 0, 0.51111],
    "728": [0, 0.69444, 0.10806, 0, 0.51111],
    "729": [0, 0.66786, 0.11752, 0, 0.30667],
    "730": [0, 0.69444, 0, 0, 0.83129],
    "732": [0, 0.66786, 0.11585, 0, 0.51111],
    "733": [0, 0.69444, 0.1225, 0, 0.51111],
    "915": [0, 0.68333, 0.13305, 0, 0.62722],
    "916": [0, 0.68333, 0, 0, 0.81777],
    "920": [0, 0.68333, 0.09403, 0, 0.76666],
    "923": [0, 0.68333, 0, 0, 0.69222],
    "926": [0, 0.68333, 0.15294, 0, 0.66444],
    "928": [0, 0.68333, 0.16389, 0, 0.74333],
    "931": [0, 0.68333, 0.12028, 0, 0.71555],
    "933": [0, 0.68333, 0.11111, 0, 0.76666],
    "934": [0, 0.68333, 0.05986, 0, 0.71555],
    "936": [0, 0.68333, 0.11111, 0, 0.76666],
    "937": [0, 0.68333, 0.10257, 0, 0.71555],
    "8211": [0, 0.43056, 0.09208, 0, 0.51111],
    "8212": [0, 0.43056, 0.09208, 0, 1.02222],
    "8216": [0, 0.69444, 0.12417, 0, 0.30667],
    "8217": [0, 0.69444, 0.12417, 0, 0.30667],
    "8220": [0, 0.69444, 0.1685, 0, 0.51444],
    "8221": [0, 0.69444, 0.06961, 0, 0.51444],
    "8463": [0, 0.68889, 0, 0, 0.54028]
  },
  "Main-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69444, 0, 0, 0.27778],
    "34": [0, 0.69444, 0, 0, 0.5],
    "35": [0.19444, 0.69444, 0, 0, 0.83334],
    "36": [0.05556, 0.75, 0, 0, 0.5],
    "37": [0.05556, 0.75, 0, 0, 0.83334],
    "38": [0, 0.69444, 0, 0, 0.77778],
    "39": [0, 0.69444, 0, 0, 0.27778],
    "40": [0.25, 0.75, 0, 0, 0.38889],
    "41": [0.25, 0.75, 0, 0, 0.38889],
    "42": [0, 0.75, 0, 0, 0.5],
    "43": [0.08333, 0.58333, 0, 0, 0.77778],
    "44": [0.19444, 0.10556, 0, 0, 0.27778],
    "45": [0, 0.43056, 0, 0, 0.33333],
    "46": [0, 0.10556, 0, 0, 0.27778],
    "47": [0.25, 0.75, 0, 0, 0.5],
    "48": [0, 0.64444, 0, 0, 0.5],
    "49": [0, 0.64444, 0, 0, 0.5],
    "50": [0, 0.64444, 0, 0, 0.5],
    "51": [0, 0.64444, 0, 0, 0.5],
    "52": [0, 0.64444, 0, 0, 0.5],
    "53": [0, 0.64444, 0, 0, 0.5],
    "54": [0, 0.64444, 0, 0, 0.5],
    "55": [0, 0.64444, 0, 0, 0.5],
    "56": [0, 0.64444, 0, 0, 0.5],
    "57": [0, 0.64444, 0, 0, 0.5],
    "58": [0, 0.43056, 0, 0, 0.27778],
    "59": [0.19444, 0.43056, 0, 0, 0.27778],
    "60": [0.0391, 0.5391, 0, 0, 0.77778],
    "61": [-0.13313, 0.36687, 0, 0, 0.77778],
    "62": [0.0391, 0.5391, 0, 0, 0.77778],
    "63": [0, 0.69444, 0, 0, 0.47222],
    "64": [0, 0.69444, 0, 0, 0.77778],
    "65": [0, 0.68333, 0, 0, 0.75],
    "66": [0, 0.68333, 0, 0, 0.70834],
    "67": [0, 0.68333, 0, 0, 0.72222],
    "68": [0, 0.68333, 0, 0, 0.76389],
    "69": [0, 0.68333, 0, 0, 0.68056],
    "70": [0, 0.68333, 0, 0, 0.65278],
    "71": [0, 0.68333, 0, 0, 0.78472],
    "72": [0, 0.68333, 0, 0, 0.75],
    "73": [0, 0.68333, 0, 0, 0.36111],
    "74": [0, 0.68333, 0, 0, 0.51389],
    "75": [0, 0.68333, 0, 0, 0.77778],
    "76": [0, 0.68333, 0, 0, 0.625],
    "77": [0, 0.68333, 0, 0, 0.91667],
    "78": [0, 0.68333, 0, 0, 0.75],
    "79": [0, 0.68333, 0, 0, 0.77778],
    "80": [0, 0.68333, 0, 0, 0.68056],
    "81": [0.19444, 0.68333, 0, 0, 0.77778],
    "82": [0, 0.68333, 0, 0, 0.73611],
    "83": [0, 0.68333, 0, 0, 0.55556],
    "84": [0, 0.68333, 0, 0, 0.72222],
    "85": [0, 0.68333, 0, 0, 0.75],
    "86": [0, 0.68333, 0.01389, 0, 0.75],
    "87": [0, 0.68333, 0.01389, 0, 1.02778],
    "88": [0, 0.68333, 0, 0, 0.75],
    "89": [0, 0.68333, 0.025, 0, 0.75],
    "90": [0, 0.68333, 0, 0, 0.61111],
    "91": [0.25, 0.75, 0, 0, 0.27778],
    "92": [0.25, 0.75, 0, 0, 0.5],
    "93": [0.25, 0.75, 0, 0, 0.27778],
    "94": [0, 0.69444, 0, 0, 0.5],
    "95": [0.31, 0.12056, 0.02778, 0, 0.5],
    "97": [0, 0.43056, 0, 0, 0.5],
    "98": [0, 0.69444, 0, 0, 0.55556],
    "99": [0, 0.43056, 0, 0, 0.44445],
    "100": [0, 0.69444, 0, 0, 0.55556],
    "101": [0, 0.43056, 0, 0, 0.44445],
    "102": [0, 0.69444, 0.07778, 0, 0.30556],
    "103": [0.19444, 0.43056, 0.01389, 0, 0.5],
    "104": [0, 0.69444, 0, 0, 0.55556],
    "105": [0, 0.66786, 0, 0, 0.27778],
    "106": [0.19444, 0.66786, 0, 0, 0.30556],
    "107": [0, 0.69444, 0, 0, 0.52778],
    "108": [0, 0.69444, 0, 0, 0.27778],
    "109": [0, 0.43056, 0, 0, 0.83334],
    "110": [0, 0.43056, 0, 0, 0.55556],
    "111": [0, 0.43056, 0, 0, 0.5],
    "112": [0.19444, 0.43056, 0, 0, 0.55556],
    "113": [0.19444, 0.43056, 0, 0, 0.52778],
    "114": [0, 0.43056, 0, 0, 0.39167],
    "115": [0, 0.43056, 0, 0, 0.39445],
    "116": [0, 0.61508, 0, 0, 0.38889],
    "117": [0, 0.43056, 0, 0, 0.55556],
    "118": [0, 0.43056, 0.01389, 0, 0.52778],
    "119": [0, 0.43056, 0.01389, 0, 0.72222],
    "120": [0, 0.43056, 0, 0, 0.52778],
    "121": [0.19444, 0.43056, 0.01389, 0, 0.52778],
    "122": [0, 0.43056, 0, 0, 0.44445],
    "123": [0.25, 0.75, 0, 0, 0.5],
    "124": [0.25, 0.75, 0, 0, 0.27778],
    "125": [0.25, 0.75, 0, 0, 0.5],
    "126": [0.35, 0.31786, 0, 0, 0.5],
    "160": [0, 0, 0, 0, 0.25],
    "163": [0, 0.69444, 0, 0, 0.76909],
    "167": [0.19444, 0.69444, 0, 0, 0.44445],
    "168": [0, 0.66786, 0, 0, 0.5],
    "172": [0, 0.43056, 0, 0, 0.66667],
    "176": [0, 0.69444, 0, 0, 0.75],
    "177": [0.08333, 0.58333, 0, 0, 0.77778],
    "182": [0.19444, 0.69444, 0, 0, 0.61111],
    "184": [0.17014, 0, 0, 0, 0.44445],
    "198": [0, 0.68333, 0, 0, 0.90278],
    "215": [0.08333, 0.58333, 0, 0, 0.77778],
    "216": [0.04861, 0.73194, 0, 0, 0.77778],
    "223": [0, 0.69444, 0, 0, 0.5],
    "230": [0, 0.43056, 0, 0, 0.72222],
    "247": [0.08333, 0.58333, 0, 0, 0.77778],
    "248": [0.09722, 0.52778, 0, 0, 0.5],
    "305": [0, 0.43056, 0, 0, 0.27778],
    "338": [0, 0.68333, 0, 0, 1.01389],
    "339": [0, 0.43056, 0, 0, 0.77778],
    "567": [0.19444, 0.43056, 0, 0, 0.30556],
    "710": [0, 0.69444, 0, 0, 0.5],
    "711": [0, 0.62847, 0, 0, 0.5],
    "713": [0, 0.56778, 0, 0, 0.5],
    "714": [0, 0.69444, 0, 0, 0.5],
    "715": [0, 0.69444, 0, 0, 0.5],
    "728": [0, 0.69444, 0, 0, 0.5],
    "729": [0, 0.66786, 0, 0, 0.27778],
    "730": [0, 0.69444, 0, 0, 0.75],
    "732": [0, 0.66786, 0, 0, 0.5],
    "733": [0, 0.69444, 0, 0, 0.5],
    "915": [0, 0.68333, 0, 0, 0.625],
    "916": [0, 0.68333, 0, 0, 0.83334],
    "920": [0, 0.68333, 0, 0, 0.77778],
    "923": [0, 0.68333, 0, 0, 0.69445],
    "926": [0, 0.68333, 0, 0, 0.66667],
    "928": [0, 0.68333, 0, 0, 0.75],
    "931": [0, 0.68333, 0, 0, 0.72222],
    "933": [0, 0.68333, 0, 0, 0.77778],
    "934": [0, 0.68333, 0, 0, 0.72222],
    "936": [0, 0.68333, 0, 0, 0.77778],
    "937": [0, 0.68333, 0, 0, 0.72222],
    "8211": [0, 0.43056, 0.02778, 0, 0.5],
    "8212": [0, 0.43056, 0.02778, 0, 1],
    "8216": [0, 0.69444, 0, 0, 0.27778],
    "8217": [0, 0.69444, 0, 0, 0.27778],
    "8220": [0, 0.69444, 0, 0, 0.5],
    "8221": [0, 0.69444, 0, 0, 0.5],
    "8224": [0.19444, 0.69444, 0, 0, 0.44445],
    "8225": [0.19444, 0.69444, 0, 0, 0.44445],
    "8230": [0, 0.123, 0, 0, 1.172],
    "8242": [0, 0.55556, 0, 0, 0.275],
    "8407": [0, 0.71444, 0.15382, 0, 0.5],
    "8463": [0, 0.68889, 0, 0, 0.54028],
    "8465": [0, 0.69444, 0, 0, 0.72222],
    "8467": [0, 0.69444, 0, 0.11111, 0.41667],
    "8472": [0.19444, 0.43056, 0, 0.11111, 0.63646],
    "8476": [0, 0.69444, 0, 0, 0.72222],
    "8501": [0, 0.69444, 0, 0, 0.61111],
    "8592": [-0.13313, 0.36687, 0, 0, 1],
    "8593": [0.19444, 0.69444, 0, 0, 0.5],
    "8594": [-0.13313, 0.36687, 0, 0, 1],
    "8595": [0.19444, 0.69444, 0, 0, 0.5],
    "8596": [-0.13313, 0.36687, 0, 0, 1],
    "8597": [0.25, 0.75, 0, 0, 0.5],
    "8598": [0.19444, 0.69444, 0, 0, 1],
    "8599": [0.19444, 0.69444, 0, 0, 1],
    "8600": [0.19444, 0.69444, 0, 0, 1],
    "8601": [0.19444, 0.69444, 0, 0, 1],
    "8614": [0.011, 0.511, 0, 0, 1],
    "8617": [0.011, 0.511, 0, 0, 1.126],
    "8618": [0.011, 0.511, 0, 0, 1.126],
    "8636": [-0.13313, 0.36687, 0, 0, 1],
    "8637": [-0.13313, 0.36687, 0, 0, 1],
    "8640": [-0.13313, 0.36687, 0, 0, 1],
    "8641": [-0.13313, 0.36687, 0, 0, 1],
    "8652": [0.011, 0.671, 0, 0, 1],
    "8656": [-0.13313, 0.36687, 0, 0, 1],
    "8657": [0.19444, 0.69444, 0, 0, 0.61111],
    "8658": [-0.13313, 0.36687, 0, 0, 1],
    "8659": [0.19444, 0.69444, 0, 0, 0.61111],
    "8660": [-0.13313, 0.36687, 0, 0, 1],
    "8661": [0.25, 0.75, 0, 0, 0.61111],
    "8704": [0, 0.69444, 0, 0, 0.55556],
    "8706": [0, 0.69444, 0.05556, 0.08334, 0.5309],
    "8707": [0, 0.69444, 0, 0, 0.55556],
    "8709": [0.05556, 0.75, 0, 0, 0.5],
    "8711": [0, 0.68333, 0, 0, 0.83334],
    "8712": [0.0391, 0.5391, 0, 0, 0.66667],
    "8715": [0.0391, 0.5391, 0, 0, 0.66667],
    "8722": [0.08333, 0.58333, 0, 0, 0.77778],
    "8723": [0.08333, 0.58333, 0, 0, 0.77778],
    "8725": [0.25, 0.75, 0, 0, 0.5],
    "8726": [0.25, 0.75, 0, 0, 0.5],
    "8727": [-0.03472, 0.46528, 0, 0, 0.5],
    "8728": [-0.05555, 0.44445, 0, 0, 0.5],
    "8729": [-0.05555, 0.44445, 0, 0, 0.5],
    "8730": [0.2, 0.8, 0, 0, 0.83334],
    "8733": [0, 0.43056, 0, 0, 0.77778],
    "8734": [0, 0.43056, 0, 0, 1],
    "8736": [0, 0.69224, 0, 0, 0.72222],
    "8739": [0.25, 0.75, 0, 0, 0.27778],
    "8741": [0.25, 0.75, 0, 0, 0.5],
    "8743": [0, 0.55556, 0, 0, 0.66667],
    "8744": [0, 0.55556, 0, 0, 0.66667],
    "8745": [0, 0.55556, 0, 0, 0.66667],
    "8746": [0, 0.55556, 0, 0, 0.66667],
    "8747": [0.19444, 0.69444, 0.11111, 0, 0.41667],
    "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
    "8768": [0.19444, 0.69444, 0, 0, 0.27778],
    "8771": [-0.03625, 0.46375, 0, 0, 0.77778],
    "8773": [-0.022, 0.589, 0, 0, 0.778],
    "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
    "8781": [-0.03625, 0.46375, 0, 0, 0.77778],
    "8784": [-0.133, 0.673, 0, 0, 0.778],
    "8801": [-0.03625, 0.46375, 0, 0, 0.77778],
    "8804": [0.13597, 0.63597, 0, 0, 0.77778],
    "8805": [0.13597, 0.63597, 0, 0, 0.77778],
    "8810": [0.0391, 0.5391, 0, 0, 1],
    "8811": [0.0391, 0.5391, 0, 0, 1],
    "8826": [0.0391, 0.5391, 0, 0, 0.77778],
    "8827": [0.0391, 0.5391, 0, 0, 0.77778],
    "8834": [0.0391, 0.5391, 0, 0, 0.77778],
    "8835": [0.0391, 0.5391, 0, 0, 0.77778],
    "8838": [0.13597, 0.63597, 0, 0, 0.77778],
    "8839": [0.13597, 0.63597, 0, 0, 0.77778],
    "8846": [0, 0.55556, 0, 0, 0.66667],
    "8849": [0.13597, 0.63597, 0, 0, 0.77778],
    "8850": [0.13597, 0.63597, 0, 0, 0.77778],
    "8851": [0, 0.55556, 0, 0, 0.66667],
    "8852": [0, 0.55556, 0, 0, 0.66667],
    "8853": [0.08333, 0.58333, 0, 0, 0.77778],
    "8854": [0.08333, 0.58333, 0, 0, 0.77778],
    "8855": [0.08333, 0.58333, 0, 0, 0.77778],
    "8856": [0.08333, 0.58333, 0, 0, 0.77778],
    "8857": [0.08333, 0.58333, 0, 0, 0.77778],
    "8866": [0, 0.69444, 0, 0, 0.61111],
    "8867": [0, 0.69444, 0, 0, 0.61111],
    "8868": [0, 0.69444, 0, 0, 0.77778],
    "8869": [0, 0.69444, 0, 0, 0.77778],
    "8872": [0.249, 0.75, 0, 0, 0.867],
    "8900": [-0.05555, 0.44445, 0, 0, 0.5],
    "8901": [-0.05555, 0.44445, 0, 0, 0.27778],
    "8902": [-0.03472, 0.46528, 0, 0, 0.5],
    "8904": [5e-3, 0.505, 0, 0, 0.9],
    "8942": [0.03, 0.903, 0, 0, 0.278],
    "8943": [-0.19, 0.313, 0, 0, 1.172],
    "8945": [-0.1, 0.823, 0, 0, 1.282],
    "8968": [0.25, 0.75, 0, 0, 0.44445],
    "8969": [0.25, 0.75, 0, 0, 0.44445],
    "8970": [0.25, 0.75, 0, 0, 0.44445],
    "8971": [0.25, 0.75, 0, 0, 0.44445],
    "8994": [-0.14236, 0.35764, 0, 0, 1],
    "8995": [-0.14236, 0.35764, 0, 0, 1],
    "9136": [0.244, 0.744, 0, 0, 0.412],
    "9137": [0.244, 0.745, 0, 0, 0.412],
    "9651": [0.19444, 0.69444, 0, 0, 0.88889],
    "9657": [-0.03472, 0.46528, 0, 0, 0.5],
    "9661": [0.19444, 0.69444, 0, 0, 0.88889],
    "9667": [-0.03472, 0.46528, 0, 0, 0.5],
    "9711": [0.19444, 0.69444, 0, 0, 1],
    "9824": [0.12963, 0.69444, 0, 0, 0.77778],
    "9825": [0.12963, 0.69444, 0, 0, 0.77778],
    "9826": [0.12963, 0.69444, 0, 0, 0.77778],
    "9827": [0.12963, 0.69444, 0, 0, 0.77778],
    "9837": [0, 0.75, 0, 0, 0.38889],
    "9838": [0.19444, 0.69444, 0, 0, 0.38889],
    "9839": [0.19444, 0.69444, 0, 0, 0.38889],
    "10216": [0.25, 0.75, 0, 0, 0.38889],
    "10217": [0.25, 0.75, 0, 0, 0.38889],
    "10222": [0.244, 0.744, 0, 0, 0.412],
    "10223": [0.244, 0.745, 0, 0, 0.412],
    "10229": [0.011, 0.511, 0, 0, 1.609],
    "10230": [0.011, 0.511, 0, 0, 1.638],
    "10231": [0.011, 0.511, 0, 0, 1.859],
    "10232": [0.024, 0.525, 0, 0, 1.609],
    "10233": [0.024, 0.525, 0, 0, 1.638],
    "10234": [0.024, 0.525, 0, 0, 1.858],
    "10236": [0.011, 0.511, 0, 0, 1.638],
    "10815": [0, 0.68333, 0, 0, 0.75],
    "10927": [0.13597, 0.63597, 0, 0, 0.77778],
    "10928": [0.13597, 0.63597, 0, 0, 0.77778],
    "57376": [0.19444, 0.69444, 0, 0, 0]
  },
  "Math-BoldItalic": {
    "32": [0, 0, 0, 0, 0.25],
    "48": [0, 0.44444, 0, 0, 0.575],
    "49": [0, 0.44444, 0, 0, 0.575],
    "50": [0, 0.44444, 0, 0, 0.575],
    "51": [0.19444, 0.44444, 0, 0, 0.575],
    "52": [0.19444, 0.44444, 0, 0, 0.575],
    "53": [0.19444, 0.44444, 0, 0, 0.575],
    "54": [0, 0.64444, 0, 0, 0.575],
    "55": [0.19444, 0.44444, 0, 0, 0.575],
    "56": [0, 0.64444, 0, 0, 0.575],
    "57": [0.19444, 0.44444, 0, 0, 0.575],
    "65": [0, 0.68611, 0, 0, 0.86944],
    "66": [0, 0.68611, 0.04835, 0, 0.8664],
    "67": [0, 0.68611, 0.06979, 0, 0.81694],
    "68": [0, 0.68611, 0.03194, 0, 0.93812],
    "69": [0, 0.68611, 0.05451, 0, 0.81007],
    "70": [0, 0.68611, 0.15972, 0, 0.68889],
    "71": [0, 0.68611, 0, 0, 0.88673],
    "72": [0, 0.68611, 0.08229, 0, 0.98229],
    "73": [0, 0.68611, 0.07778, 0, 0.51111],
    "74": [0, 0.68611, 0.10069, 0, 0.63125],
    "75": [0, 0.68611, 0.06979, 0, 0.97118],
    "76": [0, 0.68611, 0, 0, 0.75555],
    "77": [0, 0.68611, 0.11424, 0, 1.14201],
    "78": [0, 0.68611, 0.11424, 0, 0.95034],
    "79": [0, 0.68611, 0.03194, 0, 0.83666],
    "80": [0, 0.68611, 0.15972, 0, 0.72309],
    "81": [0.19444, 0.68611, 0, 0, 0.86861],
    "82": [0, 0.68611, 421e-5, 0, 0.87235],
    "83": [0, 0.68611, 0.05382, 0, 0.69271],
    "84": [0, 0.68611, 0.15972, 0, 0.63663],
    "85": [0, 0.68611, 0.11424, 0, 0.80027],
    "86": [0, 0.68611, 0.25555, 0, 0.67778],
    "87": [0, 0.68611, 0.15972, 0, 1.09305],
    "88": [0, 0.68611, 0.07778, 0, 0.94722],
    "89": [0, 0.68611, 0.25555, 0, 0.67458],
    "90": [0, 0.68611, 0.06979, 0, 0.77257],
    "97": [0, 0.44444, 0, 0, 0.63287],
    "98": [0, 0.69444, 0, 0, 0.52083],
    "99": [0, 0.44444, 0, 0, 0.51342],
    "100": [0, 0.69444, 0, 0, 0.60972],
    "101": [0, 0.44444, 0, 0, 0.55361],
    "102": [0.19444, 0.69444, 0.11042, 0, 0.56806],
    "103": [0.19444, 0.44444, 0.03704, 0, 0.5449],
    "104": [0, 0.69444, 0, 0, 0.66759],
    "105": [0, 0.69326, 0, 0, 0.4048],
    "106": [0.19444, 0.69326, 0.0622, 0, 0.47083],
    "107": [0, 0.69444, 0.01852, 0, 0.6037],
    "108": [0, 0.69444, 88e-4, 0, 0.34815],
    "109": [0, 0.44444, 0, 0, 1.0324],
    "110": [0, 0.44444, 0, 0, 0.71296],
    "111": [0, 0.44444, 0, 0, 0.58472],
    "112": [0.19444, 0.44444, 0, 0, 0.60092],
    "113": [0.19444, 0.44444, 0.03704, 0, 0.54213],
    "114": [0, 0.44444, 0.03194, 0, 0.5287],
    "115": [0, 0.44444, 0, 0, 0.53125],
    "116": [0, 0.63492, 0, 0, 0.41528],
    "117": [0, 0.44444, 0, 0, 0.68102],
    "118": [0, 0.44444, 0.03704, 0, 0.56666],
    "119": [0, 0.44444, 0.02778, 0, 0.83148],
    "120": [0, 0.44444, 0, 0, 0.65903],
    "121": [0.19444, 0.44444, 0.03704, 0, 0.59028],
    "122": [0, 0.44444, 0.04213, 0, 0.55509],
    "160": [0, 0, 0, 0, 0.25],
    "915": [0, 0.68611, 0.15972, 0, 0.65694],
    "916": [0, 0.68611, 0, 0, 0.95833],
    "920": [0, 0.68611, 0.03194, 0, 0.86722],
    "923": [0, 0.68611, 0, 0, 0.80555],
    "926": [0, 0.68611, 0.07458, 0, 0.84125],
    "928": [0, 0.68611, 0.08229, 0, 0.98229],
    "931": [0, 0.68611, 0.05451, 0, 0.88507],
    "933": [0, 0.68611, 0.15972, 0, 0.67083],
    "934": [0, 0.68611, 0, 0, 0.76666],
    "936": [0, 0.68611, 0.11653, 0, 0.71402],
    "937": [0, 0.68611, 0.04835, 0, 0.8789],
    "945": [0, 0.44444, 0, 0, 0.76064],
    "946": [0.19444, 0.69444, 0.03403, 0, 0.65972],
    "947": [0.19444, 0.44444, 0.06389, 0, 0.59003],
    "948": [0, 0.69444, 0.03819, 0, 0.52222],
    "949": [0, 0.44444, 0, 0, 0.52882],
    "950": [0.19444, 0.69444, 0.06215, 0, 0.50833],
    "951": [0.19444, 0.44444, 0.03704, 0, 0.6],
    "952": [0, 0.69444, 0.03194, 0, 0.5618],
    "953": [0, 0.44444, 0, 0, 0.41204],
    "954": [0, 0.44444, 0, 0, 0.66759],
    "955": [0, 0.69444, 0, 0, 0.67083],
    "956": [0.19444, 0.44444, 0, 0, 0.70787],
    "957": [0, 0.44444, 0.06898, 0, 0.57685],
    "958": [0.19444, 0.69444, 0.03021, 0, 0.50833],
    "959": [0, 0.44444, 0, 0, 0.58472],
    "960": [0, 0.44444, 0.03704, 0, 0.68241],
    "961": [0.19444, 0.44444, 0, 0, 0.6118],
    "962": [0.09722, 0.44444, 0.07917, 0, 0.42361],
    "963": [0, 0.44444, 0.03704, 0, 0.68588],
    "964": [0, 0.44444, 0.13472, 0, 0.52083],
    "965": [0, 0.44444, 0.03704, 0, 0.63055],
    "966": [0.19444, 0.44444, 0, 0, 0.74722],
    "967": [0.19444, 0.44444, 0, 0, 0.71805],
    "968": [0.19444, 0.69444, 0.03704, 0, 0.75833],
    "969": [0, 0.44444, 0.03704, 0, 0.71782],
    "977": [0, 0.69444, 0, 0, 0.69155],
    "981": [0.19444, 0.69444, 0, 0, 0.7125],
    "982": [0, 0.44444, 0.03194, 0, 0.975],
    "1009": [0.19444, 0.44444, 0, 0, 0.6118],
    "1013": [0, 0.44444, 0, 0, 0.48333],
    "57649": [0, 0.44444, 0, 0, 0.39352],
    "57911": [0.19444, 0.44444, 0, 0, 0.43889]
  },
  "Math-Italic": {
    "32": [0, 0, 0, 0, 0.25],
    "48": [0, 0.43056, 0, 0, 0.5],
    "49": [0, 0.43056, 0, 0, 0.5],
    "50": [0, 0.43056, 0, 0, 0.5],
    "51": [0.19444, 0.43056, 0, 0, 0.5],
    "52": [0.19444, 0.43056, 0, 0, 0.5],
    "53": [0.19444, 0.43056, 0, 0, 0.5],
    "54": [0, 0.64444, 0, 0, 0.5],
    "55": [0.19444, 0.43056, 0, 0, 0.5],
    "56": [0, 0.64444, 0, 0, 0.5],
    "57": [0.19444, 0.43056, 0, 0, 0.5],
    "65": [0, 0.68333, 0, 0.13889, 0.75],
    "66": [0, 0.68333, 0.05017, 0.08334, 0.75851],
    "67": [0, 0.68333, 0.07153, 0.08334, 0.71472],
    "68": [0, 0.68333, 0.02778, 0.05556, 0.82792],
    "69": [0, 0.68333, 0.05764, 0.08334, 0.7382],
    "70": [0, 0.68333, 0.13889, 0.08334, 0.64306],
    "71": [0, 0.68333, 0, 0.08334, 0.78625],
    "72": [0, 0.68333, 0.08125, 0.05556, 0.83125],
    "73": [0, 0.68333, 0.07847, 0.11111, 0.43958],
    "74": [0, 0.68333, 0.09618, 0.16667, 0.55451],
    "75": [0, 0.68333, 0.07153, 0.05556, 0.84931],
    "76": [0, 0.68333, 0, 0.02778, 0.68056],
    "77": [0, 0.68333, 0.10903, 0.08334, 0.97014],
    "78": [0, 0.68333, 0.10903, 0.08334, 0.80347],
    "79": [0, 0.68333, 0.02778, 0.08334, 0.76278],
    "80": [0, 0.68333, 0.13889, 0.08334, 0.64201],
    "81": [0.19444, 0.68333, 0, 0.08334, 0.79056],
    "82": [0, 0.68333, 773e-5, 0.08334, 0.75929],
    "83": [0, 0.68333, 0.05764, 0.08334, 0.6132],
    "84": [0, 0.68333, 0.13889, 0.08334, 0.58438],
    "85": [0, 0.68333, 0.10903, 0.02778, 0.68278],
    "86": [0, 0.68333, 0.22222, 0, 0.58333],
    "87": [0, 0.68333, 0.13889, 0, 0.94445],
    "88": [0, 0.68333, 0.07847, 0.08334, 0.82847],
    "89": [0, 0.68333, 0.22222, 0, 0.58056],
    "90": [0, 0.68333, 0.07153, 0.08334, 0.68264],
    "97": [0, 0.43056, 0, 0, 0.52859],
    "98": [0, 0.69444, 0, 0, 0.42917],
    "99": [0, 0.43056, 0, 0.05556, 0.43276],
    "100": [0, 0.69444, 0, 0.16667, 0.52049],
    "101": [0, 0.43056, 0, 0.05556, 0.46563],
    "102": [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
    "103": [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
    "104": [0, 0.69444, 0, 0, 0.57616],
    "105": [0, 0.65952, 0, 0, 0.34451],
    "106": [0.19444, 0.65952, 0.05724, 0, 0.41181],
    "107": [0, 0.69444, 0.03148, 0, 0.5206],
    "108": [0, 0.69444, 0.01968, 0.08334, 0.29838],
    "109": [0, 0.43056, 0, 0, 0.87801],
    "110": [0, 0.43056, 0, 0, 0.60023],
    "111": [0, 0.43056, 0, 0.05556, 0.48472],
    "112": [0.19444, 0.43056, 0, 0.08334, 0.50313],
    "113": [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
    "114": [0, 0.43056, 0.02778, 0.05556, 0.45116],
    "115": [0, 0.43056, 0, 0.05556, 0.46875],
    "116": [0, 0.61508, 0, 0.08334, 0.36111],
    "117": [0, 0.43056, 0, 0.02778, 0.57246],
    "118": [0, 0.43056, 0.03588, 0.02778, 0.48472],
    "119": [0, 0.43056, 0.02691, 0.08334, 0.71592],
    "120": [0, 0.43056, 0, 0.02778, 0.57153],
    "121": [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
    "122": [0, 0.43056, 0.04398, 0.05556, 0.46505],
    "160": [0, 0, 0, 0, 0.25],
    "915": [0, 0.68333, 0.13889, 0.08334, 0.61528],
    "916": [0, 0.68333, 0, 0.16667, 0.83334],
    "920": [0, 0.68333, 0.02778, 0.08334, 0.76278],
    "923": [0, 0.68333, 0, 0.16667, 0.69445],
    "926": [0, 0.68333, 0.07569, 0.08334, 0.74236],
    "928": [0, 0.68333, 0.08125, 0.05556, 0.83125],
    "931": [0, 0.68333, 0.05764, 0.08334, 0.77986],
    "933": [0, 0.68333, 0.13889, 0.05556, 0.58333],
    "934": [0, 0.68333, 0, 0.08334, 0.66667],
    "936": [0, 0.68333, 0.11, 0.05556, 0.61222],
    "937": [0, 0.68333, 0.05017, 0.08334, 0.7724],
    "945": [0, 0.43056, 37e-4, 0.02778, 0.6397],
    "946": [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
    "947": [0.19444, 0.43056, 0.05556, 0, 0.51773],
    "948": [0, 0.69444, 0.03785, 0.05556, 0.44444],
    "949": [0, 0.43056, 0, 0.08334, 0.46632],
    "950": [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
    "951": [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
    "952": [0, 0.69444, 0.02778, 0.08334, 0.46944],
    "953": [0, 0.43056, 0, 0.05556, 0.35394],
    "954": [0, 0.43056, 0, 0, 0.57616],
    "955": [0, 0.69444, 0, 0, 0.58334],
    "956": [0.19444, 0.43056, 0, 0.02778, 0.60255],
    "957": [0, 0.43056, 0.06366, 0.02778, 0.49398],
    "958": [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
    "959": [0, 0.43056, 0, 0.05556, 0.48472],
    "960": [0, 0.43056, 0.03588, 0, 0.57003],
    "961": [0.19444, 0.43056, 0, 0.08334, 0.51702],
    "962": [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
    "963": [0, 0.43056, 0.03588, 0, 0.57141],
    "964": [0, 0.43056, 0.1132, 0.02778, 0.43715],
    "965": [0, 0.43056, 0.03588, 0.02778, 0.54028],
    "966": [0.19444, 0.43056, 0, 0.08334, 0.65417],
    "967": [0.19444, 0.43056, 0, 0.05556, 0.62569],
    "968": [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
    "969": [0, 0.43056, 0.03588, 0, 0.62245],
    "977": [0, 0.69444, 0, 0.08334, 0.59144],
    "981": [0.19444, 0.69444, 0, 0.08334, 0.59583],
    "982": [0, 0.43056, 0.02778, 0, 0.82813],
    "1009": [0.19444, 0.43056, 0, 0.08334, 0.51702],
    "1013": [0, 0.43056, 0, 0.05556, 0.4059],
    "57649": [0, 0.43056, 0, 0.02778, 0.32246],
    "57911": [0.19444, 0.43056, 0, 0.08334, 0.38403]
  },
  "SansSerif-Bold": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69444, 0, 0, 0.36667],
    "34": [0, 0.69444, 0, 0, 0.55834],
    "35": [0.19444, 0.69444, 0, 0, 0.91667],
    "36": [0.05556, 0.75, 0, 0, 0.55],
    "37": [0.05556, 0.75, 0, 0, 1.02912],
    "38": [0, 0.69444, 0, 0, 0.83056],
    "39": [0, 0.69444, 0, 0, 0.30556],
    "40": [0.25, 0.75, 0, 0, 0.42778],
    "41": [0.25, 0.75, 0, 0, 0.42778],
    "42": [0, 0.75, 0, 0, 0.55],
    "43": [0.11667, 0.61667, 0, 0, 0.85556],
    "44": [0.10556, 0.13056, 0, 0, 0.30556],
    "45": [0, 0.45833, 0, 0, 0.36667],
    "46": [0, 0.13056, 0, 0, 0.30556],
    "47": [0.25, 0.75, 0, 0, 0.55],
    "48": [0, 0.69444, 0, 0, 0.55],
    "49": [0, 0.69444, 0, 0, 0.55],
    "50": [0, 0.69444, 0, 0, 0.55],
    "51": [0, 0.69444, 0, 0, 0.55],
    "52": [0, 0.69444, 0, 0, 0.55],
    "53": [0, 0.69444, 0, 0, 0.55],
    "54": [0, 0.69444, 0, 0, 0.55],
    "55": [0, 0.69444, 0, 0, 0.55],
    "56": [0, 0.69444, 0, 0, 0.55],
    "57": [0, 0.69444, 0, 0, 0.55],
    "58": [0, 0.45833, 0, 0, 0.30556],
    "59": [0.10556, 0.45833, 0, 0, 0.30556],
    "61": [-0.09375, 0.40625, 0, 0, 0.85556],
    "63": [0, 0.69444, 0, 0, 0.51945],
    "64": [0, 0.69444, 0, 0, 0.73334],
    "65": [0, 0.69444, 0, 0, 0.73334],
    "66": [0, 0.69444, 0, 0, 0.73334],
    "67": [0, 0.69444, 0, 0, 0.70278],
    "68": [0, 0.69444, 0, 0, 0.79445],
    "69": [0, 0.69444, 0, 0, 0.64167],
    "70": [0, 0.69444, 0, 0, 0.61111],
    "71": [0, 0.69444, 0, 0, 0.73334],
    "72": [0, 0.69444, 0, 0, 0.79445],
    "73": [0, 0.69444, 0, 0, 0.33056],
    "74": [0, 0.69444, 0, 0, 0.51945],
    "75": [0, 0.69444, 0, 0, 0.76389],
    "76": [0, 0.69444, 0, 0, 0.58056],
    "77": [0, 0.69444, 0, 0, 0.97778],
    "78": [0, 0.69444, 0, 0, 0.79445],
    "79": [0, 0.69444, 0, 0, 0.79445],
    "80": [0, 0.69444, 0, 0, 0.70278],
    "81": [0.10556, 0.69444, 0, 0, 0.79445],
    "82": [0, 0.69444, 0, 0, 0.70278],
    "83": [0, 0.69444, 0, 0, 0.61111],
    "84": [0, 0.69444, 0, 0, 0.73334],
    "85": [0, 0.69444, 0, 0, 0.76389],
    "86": [0, 0.69444, 0.01528, 0, 0.73334],
    "87": [0, 0.69444, 0.01528, 0, 1.03889],
    "88": [0, 0.69444, 0, 0, 0.73334],
    "89": [0, 0.69444, 0.0275, 0, 0.73334],
    "90": [0, 0.69444, 0, 0, 0.67223],
    "91": [0.25, 0.75, 0, 0, 0.34306],
    "93": [0.25, 0.75, 0, 0, 0.34306],
    "94": [0, 0.69444, 0, 0, 0.55],
    "95": [0.35, 0.10833, 0.03056, 0, 0.55],
    "97": [0, 0.45833, 0, 0, 0.525],
    "98": [0, 0.69444, 0, 0, 0.56111],
    "99": [0, 0.45833, 0, 0, 0.48889],
    "100": [0, 0.69444, 0, 0, 0.56111],
    "101": [0, 0.45833, 0, 0, 0.51111],
    "102": [0, 0.69444, 0.07639, 0, 0.33611],
    "103": [0.19444, 0.45833, 0.01528, 0, 0.55],
    "104": [0, 0.69444, 0, 0, 0.56111],
    "105": [0, 0.69444, 0, 0, 0.25556],
    "106": [0.19444, 0.69444, 0, 0, 0.28611],
    "107": [0, 0.69444, 0, 0, 0.53056],
    "108": [0, 0.69444, 0, 0, 0.25556],
    "109": [0, 0.45833, 0, 0, 0.86667],
    "110": [0, 0.45833, 0, 0, 0.56111],
    "111": [0, 0.45833, 0, 0, 0.55],
    "112": [0.19444, 0.45833, 0, 0, 0.56111],
    "113": [0.19444, 0.45833, 0, 0, 0.56111],
    "114": [0, 0.45833, 0.01528, 0, 0.37222],
    "115": [0, 0.45833, 0, 0, 0.42167],
    "116": [0, 0.58929, 0, 0, 0.40417],
    "117": [0, 0.45833, 0, 0, 0.56111],
    "118": [0, 0.45833, 0.01528, 0, 0.5],
    "119": [0, 0.45833, 0.01528, 0, 0.74445],
    "120": [0, 0.45833, 0, 0, 0.5],
    "121": [0.19444, 0.45833, 0.01528, 0, 0.5],
    "122": [0, 0.45833, 0, 0, 0.47639],
    "126": [0.35, 0.34444, 0, 0, 0.55],
    "160": [0, 0, 0, 0, 0.25],
    "168": [0, 0.69444, 0, 0, 0.55],
    "176": [0, 0.69444, 0, 0, 0.73334],
    "180": [0, 0.69444, 0, 0, 0.55],
    "184": [0.17014, 0, 0, 0, 0.48889],
    "305": [0, 0.45833, 0, 0, 0.25556],
    "567": [0.19444, 0.45833, 0, 0, 0.28611],
    "710": [0, 0.69444, 0, 0, 0.55],
    "711": [0, 0.63542, 0, 0, 0.55],
    "713": [0, 0.63778, 0, 0, 0.55],
    "728": [0, 0.69444, 0, 0, 0.55],
    "729": [0, 0.69444, 0, 0, 0.30556],
    "730": [0, 0.69444, 0, 0, 0.73334],
    "732": [0, 0.69444, 0, 0, 0.55],
    "733": [0, 0.69444, 0, 0, 0.55],
    "915": [0, 0.69444, 0, 0, 0.58056],
    "916": [0, 0.69444, 0, 0, 0.91667],
    "920": [0, 0.69444, 0, 0, 0.85556],
    "923": [0, 0.69444, 0, 0, 0.67223],
    "926": [0, 0.69444, 0, 0, 0.73334],
    "928": [0, 0.69444, 0, 0, 0.79445],
    "931": [0, 0.69444, 0, 0, 0.79445],
    "933": [0, 0.69444, 0, 0, 0.85556],
    "934": [0, 0.69444, 0, 0, 0.79445],
    "936": [0, 0.69444, 0, 0, 0.85556],
    "937": [0, 0.69444, 0, 0, 0.79445],
    "8211": [0, 0.45833, 0.03056, 0, 0.55],
    "8212": [0, 0.45833, 0.03056, 0, 1.10001],
    "8216": [0, 0.69444, 0, 0, 0.30556],
    "8217": [0, 0.69444, 0, 0, 0.30556],
    "8220": [0, 0.69444, 0, 0, 0.55834],
    "8221": [0, 0.69444, 0, 0, 0.55834]
  },
  "SansSerif-Italic": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69444, 0.05733, 0, 0.31945],
    "34": [0, 0.69444, 316e-5, 0, 0.5],
    "35": [0.19444, 0.69444, 0.05087, 0, 0.83334],
    "36": [0.05556, 0.75, 0.11156, 0, 0.5],
    "37": [0.05556, 0.75, 0.03126, 0, 0.83334],
    "38": [0, 0.69444, 0.03058, 0, 0.75834],
    "39": [0, 0.69444, 0.07816, 0, 0.27778],
    "40": [0.25, 0.75, 0.13164, 0, 0.38889],
    "41": [0.25, 0.75, 0.02536, 0, 0.38889],
    "42": [0, 0.75, 0.11775, 0, 0.5],
    "43": [0.08333, 0.58333, 0.02536, 0, 0.77778],
    "44": [0.125, 0.08333, 0, 0, 0.27778],
    "45": [0, 0.44444, 0.01946, 0, 0.33333],
    "46": [0, 0.08333, 0, 0, 0.27778],
    "47": [0.25, 0.75, 0.13164, 0, 0.5],
    "48": [0, 0.65556, 0.11156, 0, 0.5],
    "49": [0, 0.65556, 0.11156, 0, 0.5],
    "50": [0, 0.65556, 0.11156, 0, 0.5],
    "51": [0, 0.65556, 0.11156, 0, 0.5],
    "52": [0, 0.65556, 0.11156, 0, 0.5],
    "53": [0, 0.65556, 0.11156, 0, 0.5],
    "54": [0, 0.65556, 0.11156, 0, 0.5],
    "55": [0, 0.65556, 0.11156, 0, 0.5],
    "56": [0, 0.65556, 0.11156, 0, 0.5],
    "57": [0, 0.65556, 0.11156, 0, 0.5],
    "58": [0, 0.44444, 0.02502, 0, 0.27778],
    "59": [0.125, 0.44444, 0.02502, 0, 0.27778],
    "61": [-0.13, 0.37, 0.05087, 0, 0.77778],
    "63": [0, 0.69444, 0.11809, 0, 0.47222],
    "64": [0, 0.69444, 0.07555, 0, 0.66667],
    "65": [0, 0.69444, 0, 0, 0.66667],
    "66": [0, 0.69444, 0.08293, 0, 0.66667],
    "67": [0, 0.69444, 0.11983, 0, 0.63889],
    "68": [0, 0.69444, 0.07555, 0, 0.72223],
    "69": [0, 0.69444, 0.11983, 0, 0.59722],
    "70": [0, 0.69444, 0.13372, 0, 0.56945],
    "71": [0, 0.69444, 0.11983, 0, 0.66667],
    "72": [0, 0.69444, 0.08094, 0, 0.70834],
    "73": [0, 0.69444, 0.13372, 0, 0.27778],
    "74": [0, 0.69444, 0.08094, 0, 0.47222],
    "75": [0, 0.69444, 0.11983, 0, 0.69445],
    "76": [0, 0.69444, 0, 0, 0.54167],
    "77": [0, 0.69444, 0.08094, 0, 0.875],
    "78": [0, 0.69444, 0.08094, 0, 0.70834],
    "79": [0, 0.69444, 0.07555, 0, 0.73611],
    "80": [0, 0.69444, 0.08293, 0, 0.63889],
    "81": [0.125, 0.69444, 0.07555, 0, 0.73611],
    "82": [0, 0.69444, 0.08293, 0, 0.64584],
    "83": [0, 0.69444, 0.09205, 0, 0.55556],
    "84": [0, 0.69444, 0.13372, 0, 0.68056],
    "85": [0, 0.69444, 0.08094, 0, 0.6875],
    "86": [0, 0.69444, 0.1615, 0, 0.66667],
    "87": [0, 0.69444, 0.1615, 0, 0.94445],
    "88": [0, 0.69444, 0.13372, 0, 0.66667],
    "89": [0, 0.69444, 0.17261, 0, 0.66667],
    "90": [0, 0.69444, 0.11983, 0, 0.61111],
    "91": [0.25, 0.75, 0.15942, 0, 0.28889],
    "93": [0.25, 0.75, 0.08719, 0, 0.28889],
    "94": [0, 0.69444, 0.0799, 0, 0.5],
    "95": [0.35, 0.09444, 0.08616, 0, 0.5],
    "97": [0, 0.44444, 981e-5, 0, 0.48056],
    "98": [0, 0.69444, 0.03057, 0, 0.51667],
    "99": [0, 0.44444, 0.08336, 0, 0.44445],
    "100": [0, 0.69444, 0.09483, 0, 0.51667],
    "101": [0, 0.44444, 0.06778, 0, 0.44445],
    "102": [0, 0.69444, 0.21705, 0, 0.30556],
    "103": [0.19444, 0.44444, 0.10836, 0, 0.5],
    "104": [0, 0.69444, 0.01778, 0, 0.51667],
    "105": [0, 0.67937, 0.09718, 0, 0.23889],
    "106": [0.19444, 0.67937, 0.09162, 0, 0.26667],
    "107": [0, 0.69444, 0.08336, 0, 0.48889],
    "108": [0, 0.69444, 0.09483, 0, 0.23889],
    "109": [0, 0.44444, 0.01778, 0, 0.79445],
    "110": [0, 0.44444, 0.01778, 0, 0.51667],
    "111": [0, 0.44444, 0.06613, 0, 0.5],
    "112": [0.19444, 0.44444, 0.0389, 0, 0.51667],
    "113": [0.19444, 0.44444, 0.04169, 0, 0.51667],
    "114": [0, 0.44444, 0.10836, 0, 0.34167],
    "115": [0, 0.44444, 0.0778, 0, 0.38333],
    "116": [0, 0.57143, 0.07225, 0, 0.36111],
    "117": [0, 0.44444, 0.04169, 0, 0.51667],
    "118": [0, 0.44444, 0.10836, 0, 0.46111],
    "119": [0, 0.44444, 0.10836, 0, 0.68334],
    "120": [0, 0.44444, 0.09169, 0, 0.46111],
    "121": [0.19444, 0.44444, 0.10836, 0, 0.46111],
    "122": [0, 0.44444, 0.08752, 0, 0.43472],
    "126": [0.35, 0.32659, 0.08826, 0, 0.5],
    "160": [0, 0, 0, 0, 0.25],
    "168": [0, 0.67937, 0.06385, 0, 0.5],
    "176": [0, 0.69444, 0, 0, 0.73752],
    "184": [0.17014, 0, 0, 0, 0.44445],
    "305": [0, 0.44444, 0.04169, 0, 0.23889],
    "567": [0.19444, 0.44444, 0.04169, 0, 0.26667],
    "710": [0, 0.69444, 0.0799, 0, 0.5],
    "711": [0, 0.63194, 0.08432, 0, 0.5],
    "713": [0, 0.60889, 0.08776, 0, 0.5],
    "714": [0, 0.69444, 0.09205, 0, 0.5],
    "715": [0, 0.69444, 0, 0, 0.5],
    "728": [0, 0.69444, 0.09483, 0, 0.5],
    "729": [0, 0.67937, 0.07774, 0, 0.27778],
    "730": [0, 0.69444, 0, 0, 0.73752],
    "732": [0, 0.67659, 0.08826, 0, 0.5],
    "733": [0, 0.69444, 0.09205, 0, 0.5],
    "915": [0, 0.69444, 0.13372, 0, 0.54167],
    "916": [0, 0.69444, 0, 0, 0.83334],
    "920": [0, 0.69444, 0.07555, 0, 0.77778],
    "923": [0, 0.69444, 0, 0, 0.61111],
    "926": [0, 0.69444, 0.12816, 0, 0.66667],
    "928": [0, 0.69444, 0.08094, 0, 0.70834],
    "931": [0, 0.69444, 0.11983, 0, 0.72222],
    "933": [0, 0.69444, 0.09031, 0, 0.77778],
    "934": [0, 0.69444, 0.04603, 0, 0.72222],
    "936": [0, 0.69444, 0.09031, 0, 0.77778],
    "937": [0, 0.69444, 0.08293, 0, 0.72222],
    "8211": [0, 0.44444, 0.08616, 0, 0.5],
    "8212": [0, 0.44444, 0.08616, 0, 1],
    "8216": [0, 0.69444, 0.07816, 0, 0.27778],
    "8217": [0, 0.69444, 0.07816, 0, 0.27778],
    "8220": [0, 0.69444, 0.14205, 0, 0.5],
    "8221": [0, 0.69444, 316e-5, 0, 0.5]
  },
  "SansSerif-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "33": [0, 0.69444, 0, 0, 0.31945],
    "34": [0, 0.69444, 0, 0, 0.5],
    "35": [0.19444, 0.69444, 0, 0, 0.83334],
    "36": [0.05556, 0.75, 0, 0, 0.5],
    "37": [0.05556, 0.75, 0, 0, 0.83334],
    "38": [0, 0.69444, 0, 0, 0.75834],
    "39": [0, 0.69444, 0, 0, 0.27778],
    "40": [0.25, 0.75, 0, 0, 0.38889],
    "41": [0.25, 0.75, 0, 0, 0.38889],
    "42": [0, 0.75, 0, 0, 0.5],
    "43": [0.08333, 0.58333, 0, 0, 0.77778],
    "44": [0.125, 0.08333, 0, 0, 0.27778],
    "45": [0, 0.44444, 0, 0, 0.33333],
    "46": [0, 0.08333, 0, 0, 0.27778],
    "47": [0.25, 0.75, 0, 0, 0.5],
    "48": [0, 0.65556, 0, 0, 0.5],
    "49": [0, 0.65556, 0, 0, 0.5],
    "50": [0, 0.65556, 0, 0, 0.5],
    "51": [0, 0.65556, 0, 0, 0.5],
    "52": [0, 0.65556, 0, 0, 0.5],
    "53": [0, 0.65556, 0, 0, 0.5],
    "54": [0, 0.65556, 0, 0, 0.5],
    "55": [0, 0.65556, 0, 0, 0.5],
    "56": [0, 0.65556, 0, 0, 0.5],
    "57": [0, 0.65556, 0, 0, 0.5],
    "58": [0, 0.44444, 0, 0, 0.27778],
    "59": [0.125, 0.44444, 0, 0, 0.27778],
    "61": [-0.13, 0.37, 0, 0, 0.77778],
    "63": [0, 0.69444, 0, 0, 0.47222],
    "64": [0, 0.69444, 0, 0, 0.66667],
    "65": [0, 0.69444, 0, 0, 0.66667],
    "66": [0, 0.69444, 0, 0, 0.66667],
    "67": [0, 0.69444, 0, 0, 0.63889],
    "68": [0, 0.69444, 0, 0, 0.72223],
    "69": [0, 0.69444, 0, 0, 0.59722],
    "70": [0, 0.69444, 0, 0, 0.56945],
    "71": [0, 0.69444, 0, 0, 0.66667],
    "72": [0, 0.69444, 0, 0, 0.70834],
    "73": [0, 0.69444, 0, 0, 0.27778],
    "74": [0, 0.69444, 0, 0, 0.47222],
    "75": [0, 0.69444, 0, 0, 0.69445],
    "76": [0, 0.69444, 0, 0, 0.54167],
    "77": [0, 0.69444, 0, 0, 0.875],
    "78": [0, 0.69444, 0, 0, 0.70834],
    "79": [0, 0.69444, 0, 0, 0.73611],
    "80": [0, 0.69444, 0, 0, 0.63889],
    "81": [0.125, 0.69444, 0, 0, 0.73611],
    "82": [0, 0.69444, 0, 0, 0.64584],
    "83": [0, 0.69444, 0, 0, 0.55556],
    "84": [0, 0.69444, 0, 0, 0.68056],
    "85": [0, 0.69444, 0, 0, 0.6875],
    "86": [0, 0.69444, 0.01389, 0, 0.66667],
    "87": [0, 0.69444, 0.01389, 0, 0.94445],
    "88": [0, 0.69444, 0, 0, 0.66667],
    "89": [0, 0.69444, 0.025, 0, 0.66667],
    "90": [0, 0.69444, 0, 0, 0.61111],
    "91": [0.25, 0.75, 0, 0, 0.28889],
    "93": [0.25, 0.75, 0, 0, 0.28889],
    "94": [0, 0.69444, 0, 0, 0.5],
    "95": [0.35, 0.09444, 0.02778, 0, 0.5],
    "97": [0, 0.44444, 0, 0, 0.48056],
    "98": [0, 0.69444, 0, 0, 0.51667],
    "99": [0, 0.44444, 0, 0, 0.44445],
    "100": [0, 0.69444, 0, 0, 0.51667],
    "101": [0, 0.44444, 0, 0, 0.44445],
    "102": [0, 0.69444, 0.06944, 0, 0.30556],
    "103": [0.19444, 0.44444, 0.01389, 0, 0.5],
    "104": [0, 0.69444, 0, 0, 0.51667],
    "105": [0, 0.67937, 0, 0, 0.23889],
    "106": [0.19444, 0.67937, 0, 0, 0.26667],
    "107": [0, 0.69444, 0, 0, 0.48889],
    "108": [0, 0.69444, 0, 0, 0.23889],
    "109": [0, 0.44444, 0, 0, 0.79445],
    "110": [0, 0.44444, 0, 0, 0.51667],
    "111": [0, 0.44444, 0, 0, 0.5],
    "112": [0.19444, 0.44444, 0, 0, 0.51667],
    "113": [0.19444, 0.44444, 0, 0, 0.51667],
    "114": [0, 0.44444, 0.01389, 0, 0.34167],
    "115": [0, 0.44444, 0, 0, 0.38333],
    "116": [0, 0.57143, 0, 0, 0.36111],
    "117": [0, 0.44444, 0, 0, 0.51667],
    "118": [0, 0.44444, 0.01389, 0, 0.46111],
    "119": [0, 0.44444, 0.01389, 0, 0.68334],
    "120": [0, 0.44444, 0, 0, 0.46111],
    "121": [0.19444, 0.44444, 0.01389, 0, 0.46111],
    "122": [0, 0.44444, 0, 0, 0.43472],
    "126": [0.35, 0.32659, 0, 0, 0.5],
    "160": [0, 0, 0, 0, 0.25],
    "168": [0, 0.67937, 0, 0, 0.5],
    "176": [0, 0.69444, 0, 0, 0.66667],
    "184": [0.17014, 0, 0, 0, 0.44445],
    "305": [0, 0.44444, 0, 0, 0.23889],
    "567": [0.19444, 0.44444, 0, 0, 0.26667],
    "710": [0, 0.69444, 0, 0, 0.5],
    "711": [0, 0.63194, 0, 0, 0.5],
    "713": [0, 0.60889, 0, 0, 0.5],
    "714": [0, 0.69444, 0, 0, 0.5],
    "715": [0, 0.69444, 0, 0, 0.5],
    "728": [0, 0.69444, 0, 0, 0.5],
    "729": [0, 0.67937, 0, 0, 0.27778],
    "730": [0, 0.69444, 0, 0, 0.66667],
    "732": [0, 0.67659, 0, 0, 0.5],
    "733": [0, 0.69444, 0, 0, 0.5],
    "915": [0, 0.69444, 0, 0, 0.54167],
    "916": [0, 0.69444, 0, 0, 0.83334],
    "920": [0, 0.69444, 0, 0, 0.77778],
    "923": [0, 0.69444, 0, 0, 0.61111],
    "926": [0, 0.69444, 0, 0, 0.66667],
    "928": [0, 0.69444, 0, 0, 0.70834],
    "931": [0, 0.69444, 0, 0, 0.72222],
    "933": [0, 0.69444, 0, 0, 0.77778],
    "934": [0, 0.69444, 0, 0, 0.72222],
    "936": [0, 0.69444, 0, 0, 0.77778],
    "937": [0, 0.69444, 0, 0, 0.72222],
    "8211": [0, 0.44444, 0.02778, 0, 0.5],
    "8212": [0, 0.44444, 0.02778, 0, 1],
    "8216": [0, 0.69444, 0, 0, 0.27778],
    "8217": [0, 0.69444, 0, 0, 0.27778],
    "8220": [0, 0.69444, 0, 0, 0.5],
    "8221": [0, 0.69444, 0, 0, 0.5]
  },
  "Script-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "65": [0, 0.7, 0.22925, 0, 0.80253],
    "66": [0, 0.7, 0.04087, 0, 0.90757],
    "67": [0, 0.7, 0.1689, 0, 0.66619],
    "68": [0, 0.7, 0.09371, 0, 0.77443],
    "69": [0, 0.7, 0.18583, 0, 0.56162],
    "70": [0, 0.7, 0.13634, 0, 0.89544],
    "71": [0, 0.7, 0.17322, 0, 0.60961],
    "72": [0, 0.7, 0.29694, 0, 0.96919],
    "73": [0, 0.7, 0.19189, 0, 0.80907],
    "74": [0.27778, 0.7, 0.19189, 0, 1.05159],
    "75": [0, 0.7, 0.31259, 0, 0.91364],
    "76": [0, 0.7, 0.19189, 0, 0.87373],
    "77": [0, 0.7, 0.15981, 0, 1.08031],
    "78": [0, 0.7, 0.3525, 0, 0.9015],
    "79": [0, 0.7, 0.08078, 0, 0.73787],
    "80": [0, 0.7, 0.08078, 0, 1.01262],
    "81": [0, 0.7, 0.03305, 0, 0.88282],
    "82": [0, 0.7, 0.06259, 0, 0.85],
    "83": [0, 0.7, 0.19189, 0, 0.86767],
    "84": [0, 0.7, 0.29087, 0, 0.74697],
    "85": [0, 0.7, 0.25815, 0, 0.79996],
    "86": [0, 0.7, 0.27523, 0, 0.62204],
    "87": [0, 0.7, 0.27523, 0, 0.80532],
    "88": [0, 0.7, 0.26006, 0, 0.94445],
    "89": [0, 0.7, 0.2939, 0, 0.70961],
    "90": [0, 0.7, 0.24037, 0, 0.8212],
    "160": [0, 0, 0, 0, 0.25]
  },
  "Size1-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "40": [0.35001, 0.85, 0, 0, 0.45834],
    "41": [0.35001, 0.85, 0, 0, 0.45834],
    "47": [0.35001, 0.85, 0, 0, 0.57778],
    "91": [0.35001, 0.85, 0, 0, 0.41667],
    "92": [0.35001, 0.85, 0, 0, 0.57778],
    "93": [0.35001, 0.85, 0, 0, 0.41667],
    "123": [0.35001, 0.85, 0, 0, 0.58334],
    "125": [0.35001, 0.85, 0, 0, 0.58334],
    "160": [0, 0, 0, 0, 0.25],
    "710": [0, 0.72222, 0, 0, 0.55556],
    "732": [0, 0.72222, 0, 0, 0.55556],
    "770": [0, 0.72222, 0, 0, 0.55556],
    "771": [0, 0.72222, 0, 0, 0.55556],
    "8214": [-99e-5, 0.601, 0, 0, 0.77778],
    "8593": [1e-5, 0.6, 0, 0, 0.66667],
    "8595": [1e-5, 0.6, 0, 0, 0.66667],
    "8657": [1e-5, 0.6, 0, 0, 0.77778],
    "8659": [1e-5, 0.6, 0, 0, 0.77778],
    "8719": [0.25001, 0.75, 0, 0, 0.94445],
    "8720": [0.25001, 0.75, 0, 0, 0.94445],
    "8721": [0.25001, 0.75, 0, 0, 1.05556],
    "8730": [0.35001, 0.85, 0, 0, 1],
    "8739": [-599e-5, 0.606, 0, 0, 0.33333],
    "8741": [-599e-5, 0.606, 0, 0, 0.55556],
    "8747": [0.30612, 0.805, 0.19445, 0, 0.47222],
    "8748": [0.306, 0.805, 0.19445, 0, 0.47222],
    "8749": [0.306, 0.805, 0.19445, 0, 0.47222],
    "8750": [0.30612, 0.805, 0.19445, 0, 0.47222],
    "8896": [0.25001, 0.75, 0, 0, 0.83334],
    "8897": [0.25001, 0.75, 0, 0, 0.83334],
    "8898": [0.25001, 0.75, 0, 0, 0.83334],
    "8899": [0.25001, 0.75, 0, 0, 0.83334],
    "8968": [0.35001, 0.85, 0, 0, 0.47222],
    "8969": [0.35001, 0.85, 0, 0, 0.47222],
    "8970": [0.35001, 0.85, 0, 0, 0.47222],
    "8971": [0.35001, 0.85, 0, 0, 0.47222],
    "9168": [-99e-5, 0.601, 0, 0, 0.66667],
    "10216": [0.35001, 0.85, 0, 0, 0.47222],
    "10217": [0.35001, 0.85, 0, 0, 0.47222],
    "10752": [0.25001, 0.75, 0, 0, 1.11111],
    "10753": [0.25001, 0.75, 0, 0, 1.11111],
    "10754": [0.25001, 0.75, 0, 0, 1.11111],
    "10756": [0.25001, 0.75, 0, 0, 0.83334],
    "10758": [0.25001, 0.75, 0, 0, 0.83334]
  },
  "Size2-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "40": [0.65002, 1.15, 0, 0, 0.59722],
    "41": [0.65002, 1.15, 0, 0, 0.59722],
    "47": [0.65002, 1.15, 0, 0, 0.81111],
    "91": [0.65002, 1.15, 0, 0, 0.47222],
    "92": [0.65002, 1.15, 0, 0, 0.81111],
    "93": [0.65002, 1.15, 0, 0, 0.47222],
    "123": [0.65002, 1.15, 0, 0, 0.66667],
    "125": [0.65002, 1.15, 0, 0, 0.66667],
    "160": [0, 0, 0, 0, 0.25],
    "710": [0, 0.75, 0, 0, 1],
    "732": [0, 0.75, 0, 0, 1],
    "770": [0, 0.75, 0, 0, 1],
    "771": [0, 0.75, 0, 0, 1],
    "8719": [0.55001, 1.05, 0, 0, 1.27778],
    "8720": [0.55001, 1.05, 0, 0, 1.27778],
    "8721": [0.55001, 1.05, 0, 0, 1.44445],
    "8730": [0.65002, 1.15, 0, 0, 1],
    "8747": [0.86225, 1.36, 0.44445, 0, 0.55556],
    "8748": [0.862, 1.36, 0.44445, 0, 0.55556],
    "8749": [0.862, 1.36, 0.44445, 0, 0.55556],
    "8750": [0.86225, 1.36, 0.44445, 0, 0.55556],
    "8896": [0.55001, 1.05, 0, 0, 1.11111],
    "8897": [0.55001, 1.05, 0, 0, 1.11111],
    "8898": [0.55001, 1.05, 0, 0, 1.11111],
    "8899": [0.55001, 1.05, 0, 0, 1.11111],
    "8968": [0.65002, 1.15, 0, 0, 0.52778],
    "8969": [0.65002, 1.15, 0, 0, 0.52778],
    "8970": [0.65002, 1.15, 0, 0, 0.52778],
    "8971": [0.65002, 1.15, 0, 0, 0.52778],
    "10216": [0.65002, 1.15, 0, 0, 0.61111],
    "10217": [0.65002, 1.15, 0, 0, 0.61111],
    "10752": [0.55001, 1.05, 0, 0, 1.51112],
    "10753": [0.55001, 1.05, 0, 0, 1.51112],
    "10754": [0.55001, 1.05, 0, 0, 1.51112],
    "10756": [0.55001, 1.05, 0, 0, 1.11111],
    "10758": [0.55001, 1.05, 0, 0, 1.11111]
  },
  "Size3-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "40": [0.95003, 1.45, 0, 0, 0.73611],
    "41": [0.95003, 1.45, 0, 0, 0.73611],
    "47": [0.95003, 1.45, 0, 0, 1.04445],
    "91": [0.95003, 1.45, 0, 0, 0.52778],
    "92": [0.95003, 1.45, 0, 0, 1.04445],
    "93": [0.95003, 1.45, 0, 0, 0.52778],
    "123": [0.95003, 1.45, 0, 0, 0.75],
    "125": [0.95003, 1.45, 0, 0, 0.75],
    "160": [0, 0, 0, 0, 0.25],
    "710": [0, 0.75, 0, 0, 1.44445],
    "732": [0, 0.75, 0, 0, 1.44445],
    "770": [0, 0.75, 0, 0, 1.44445],
    "771": [0, 0.75, 0, 0, 1.44445],
    "8730": [0.95003, 1.45, 0, 0, 1],
    "8968": [0.95003, 1.45, 0, 0, 0.58334],
    "8969": [0.95003, 1.45, 0, 0, 0.58334],
    "8970": [0.95003, 1.45, 0, 0, 0.58334],
    "8971": [0.95003, 1.45, 0, 0, 0.58334],
    "10216": [0.95003, 1.45, 0, 0, 0.75],
    "10217": [0.95003, 1.45, 0, 0, 0.75]
  },
  "Size4-Regular": {
    "32": [0, 0, 0, 0, 0.25],
    "40": [1.25003, 1.75, 0, 0, 0.79167],
    "41": [1.25003, 1.75, 0, 0, 0.79167],
    "47": [1.25003, 1.75, 0, 0, 1.27778],
    "91": [1.25003, 1.75, 0, 0, 0.58334],
    "92": [1.25003, 1.75, 0, 0, 1.27778],
    "93": [1.25003, 1.75, 0, 0, 0.58334],
    "123": [1.25003, 1.75, 0, 0, 0.80556],
    "125": [1.25003, 1.75, 0, 0, 0.80556],
    "160": [0, 0, 0, 0, 0.25],
    "710": [0, 0.825, 0, 0, 1.8889],
    "732": [0, 0.825, 0, 0, 1.8889],
    "770": [0, 0.825, 0, 0, 1.8889],
    "771": [0, 0.825, 0, 0, 1.8889],
    "8730": [1.25003, 1.75, 0, 0, 1],
    "8968": [1.25003, 1.75, 0, 0, 0.63889],
    "8969": [1.25003, 1.75, 0, 0, 0.63889],
    "8970": [1.25003, 1.75, 0, 0, 0.63889],
    "8971": [1.25003, 1.75, 0, 0, 0.63889],
    "9115": [0.64502, 1.155, 0, 0, 0.875],
    "9116": [1e-5, 0.6, 0, 0, 0.875],
    "9117": [0.64502, 1.155, 0, 0, 0.875],
    "9118": [0.64502, 1.155, 0, 0, 0.875],
    "9119": [1e-5, 0.6, 0, 0, 0.875],
    "9120": [0.64502, 1.155, 0, 0, 0.875],
    "9121": [0.64502, 1.155, 0, 0, 0.66667],
    "9122": [-99e-5, 0.601, 0, 0, 0.66667],
    "9123": [0.64502, 1.155, 0, 0, 0.66667],
    "9124": [0.64502, 1.155, 0, 0, 0.66667],
    "9125": [-99e-5, 0.601, 0, 0, 0.66667],
    "9126": [0.64502, 1.155, 0, 0, 0.66667],
    "9127": [1e-5, 0.9, 0, 0, 0.88889],
    "9128": [0.65002, 1.15, 0, 0, 0.88889],
    "9129": [0.90001, 0, 0, 0, 0.88889],
    "9130": [0, 0.3, 0, 0, 0.88889],
    "9131": [1e-5, 0.9, 0, 0, 0.88889],
    "9132": [0.65002, 1.15, 0, 0, 0.88889],
    "9133": [0.90001, 0, 0, 0, 0.88889],
    "9143": [0.88502, 0.915, 0, 0, 1.05556],
    "10216": [1.25003, 1.75, 0, 0, 0.80556],
    "10217": [1.25003, 1.75, 0, 0, 0.80556],
    "57344": [-499e-5, 0.605, 0, 0, 1.05556],
    "57345": [-499e-5, 0.605, 0, 0, 1.05556],
    "57680": [0, 0.12, 0, 0, 0.45],
    "57681": [0, 0.12, 0, 0, 0.45],
    "57682": [0, 0.12, 0, 0, 0.45],
    "57683": [0, 0.12, 0, 0, 0.45]
  },
  "Typewriter-Regular": {
    "32": [0, 0, 0, 0, 0.525],
    "33": [0, 0.61111, 0, 0, 0.525],
    "34": [0, 0.61111, 0, 0, 0.525],
    "35": [0, 0.61111, 0, 0, 0.525],
    "36": [0.08333, 0.69444, 0, 0, 0.525],
    "37": [0.08333, 0.69444, 0, 0, 0.525],
    "38": [0, 0.61111, 0, 0, 0.525],
    "39": [0, 0.61111, 0, 0, 0.525],
    "40": [0.08333, 0.69444, 0, 0, 0.525],
    "41": [0.08333, 0.69444, 0, 0, 0.525],
    "42": [0, 0.52083, 0, 0, 0.525],
    "43": [-0.08056, 0.53055, 0, 0, 0.525],
    "44": [0.13889, 0.125, 0, 0, 0.525],
    "45": [-0.08056, 0.53055, 0, 0, 0.525],
    "46": [0, 0.125, 0, 0, 0.525],
    "47": [0.08333, 0.69444, 0, 0, 0.525],
    "48": [0, 0.61111, 0, 0, 0.525],
    "49": [0, 0.61111, 0, 0, 0.525],
    "50": [0, 0.61111, 0, 0, 0.525],
    "51": [0, 0.61111, 0, 0, 0.525],
    "52": [0, 0.61111, 0, 0, 0.525],
    "53": [0, 0.61111, 0, 0, 0.525],
    "54": [0, 0.61111, 0, 0, 0.525],
    "55": [0, 0.61111, 0, 0, 0.525],
    "56": [0, 0.61111, 0, 0, 0.525],
    "57": [0, 0.61111, 0, 0, 0.525],
    "58": [0, 0.43056, 0, 0, 0.525],
    "59": [0.13889, 0.43056, 0, 0, 0.525],
    "60": [-0.05556, 0.55556, 0, 0, 0.525],
    "61": [-0.19549, 0.41562, 0, 0, 0.525],
    "62": [-0.05556, 0.55556, 0, 0, 0.525],
    "63": [0, 0.61111, 0, 0, 0.525],
    "64": [0, 0.61111, 0, 0, 0.525],
    "65": [0, 0.61111, 0, 0, 0.525],
    "66": [0, 0.61111, 0, 0, 0.525],
    "67": [0, 0.61111, 0, 0, 0.525],
    "68": [0, 0.61111, 0, 0, 0.525],
    "69": [0, 0.61111, 0, 0, 0.525],
    "70": [0, 0.61111, 0, 0, 0.525],
    "71": [0, 0.61111, 0, 0, 0.525],
    "72": [0, 0.61111, 0, 0, 0.525],
    "73": [0, 0.61111, 0, 0, 0.525],
    "74": [0, 0.61111, 0, 0, 0.525],
    "75": [0, 0.61111, 0, 0, 0.525],
    "76": [0, 0.61111, 0, 0, 0.525],
    "77": [0, 0.61111, 0, 0, 0.525],
    "78": [0, 0.61111, 0, 0, 0.525],
    "79": [0, 0.61111, 0, 0, 0.525],
    "80": [0, 0.61111, 0, 0, 0.525],
    "81": [0.13889, 0.61111, 0, 0, 0.525],
    "82": [0, 0.61111, 0, 0, 0.525],
    "83": [0, 0.61111, 0, 0, 0.525],
    "84": [0, 0.61111, 0, 0, 0.525],
    "85": [0, 0.61111, 0, 0, 0.525],
    "86": [0, 0.61111, 0, 0, 0.525],
    "87": [0, 0.61111, 0, 0, 0.525],
    "88": [0, 0.61111, 0, 0, 0.525],
    "89": [0, 0.61111, 0, 0, 0.525],
    "90": [0, 0.61111, 0, 0, 0.525],
    "91": [0.08333, 0.69444, 0, 0, 0.525],
    "92": [0.08333, 0.69444, 0, 0, 0.525],
    "93": [0.08333, 0.69444, 0, 0, 0.525],
    "94": [0, 0.61111, 0, 0, 0.525],
    "95": [0.09514, 0, 0, 0, 0.525],
    "96": [0, 0.61111, 0, 0, 0.525],
    "97": [0, 0.43056, 0, 0, 0.525],
    "98": [0, 0.61111, 0, 0, 0.525],
    "99": [0, 0.43056, 0, 0, 0.525],
    "100": [0, 0.61111, 0, 0, 0.525],
    "101": [0, 0.43056, 0, 0, 0.525],
    "102": [0, 0.61111, 0, 0, 0.525],
    "103": [0.22222, 0.43056, 0, 0, 0.525],
    "104": [0, 0.61111, 0, 0, 0.525],
    "105": [0, 0.61111, 0, 0, 0.525],
    "106": [0.22222, 0.61111, 0, 0, 0.525],
    "107": [0, 0.61111, 0, 0, 0.525],
    "108": [0, 0.61111, 0, 0, 0.525],
    "109": [0, 0.43056, 0, 0, 0.525],
    "110": [0, 0.43056, 0, 0, 0.525],
    "111": [0, 0.43056, 0, 0, 0.525],
    "112": [0.22222, 0.43056, 0, 0, 0.525],
    "113": [0.22222, 0.43056, 0, 0, 0.525],
    "114": [0, 0.43056, 0, 0, 0.525],
    "115": [0, 0.43056, 0, 0, 0.525],
    "116": [0, 0.55358, 0, 0, 0.525],
    "117": [0, 0.43056, 0, 0, 0.525],
    "118": [0, 0.43056, 0, 0, 0.525],
    "119": [0, 0.43056, 0, 0, 0.525],
    "120": [0, 0.43056, 0, 0, 0.525],
    "121": [0.22222, 0.43056, 0, 0, 0.525],
    "122": [0, 0.43056, 0, 0, 0.525],
    "123": [0.08333, 0.69444, 0, 0, 0.525],
    "124": [0.08333, 0.69444, 0, 0, 0.525],
    "125": [0.08333, 0.69444, 0, 0, 0.525],
    "126": [0, 0.61111, 0, 0, 0.525],
    "127": [0, 0.61111, 0, 0, 0.525],
    "160": [0, 0, 0, 0, 0.525],
    "176": [0, 0.61111, 0, 0, 0.525],
    "184": [0.19445, 0, 0, 0, 0.525],
    "305": [0, 0.43056, 0, 0, 0.525],
    "567": [0.22222, 0.43056, 0, 0, 0.525],
    "711": [0, 0.56597, 0, 0, 0.525],
    "713": [0, 0.56555, 0, 0, 0.525],
    "714": [0, 0.61111, 0, 0, 0.525],
    "715": [0, 0.61111, 0, 0, 0.525],
    "728": [0, 0.61111, 0, 0, 0.525],
    "730": [0, 0.61111, 0, 0, 0.525],
    "770": [0, 0.61111, 0, 0, 0.525],
    "771": [0, 0.61111, 0, 0, 0.525],
    "776": [0, 0.61111, 0, 0, 0.525],
    "915": [0, 0.61111, 0, 0, 0.525],
    "916": [0, 0.61111, 0, 0, 0.525],
    "920": [0, 0.61111, 0, 0, 0.525],
    "923": [0, 0.61111, 0, 0, 0.525],
    "926": [0, 0.61111, 0, 0, 0.525],
    "928": [0, 0.61111, 0, 0, 0.525],
    "931": [0, 0.61111, 0, 0, 0.525],
    "933": [0, 0.61111, 0, 0, 0.525],
    "934": [0, 0.61111, 0, 0, 0.525],
    "936": [0, 0.61111, 0, 0, 0.525],
    "937": [0, 0.61111, 0, 0, 0.525],
    "8216": [0, 0.61111, 0, 0, 0.525],
    "8217": [0, 0.61111, 0, 0, 0.525],
    "8242": [0, 0.61111, 0, 0, 0.525],
    "9251": [0.11111, 0.21944, 0, 0, 0.525]
  }
};

// katex/unicodeSymbols.js
var unicodeSymbols = { "\xE1": "a\u0301", "\xE0": "a\u0300", "\xE4": "a\u0308", "\u01DF": "a\u0308\u0304", "\xE3": "a\u0303", "\u0101": "a\u0304", "\u0103": "a\u0306", "\u1EAF": "a\u0306\u0301", "\u1EB1": "a\u0306\u0300", "\u1EB5": "a\u0306\u0303", "\u01CE": "a\u030C", "\xE2": "a\u0302", "\u1EA5": "a\u0302\u0301", "\u1EA7": "a\u0302\u0300", "\u1EAB": "a\u0302\u0303", "\u0227": "a\u0307", "\u01E1": "a\u0307\u0304", "\xE5": "a\u030A", "\u01FB": "a\u030A\u0301", "\u1E03": "b\u0307", "\u0107": "c\u0301", "\u1E09": "c\u0327\u0301", "\u010D": "c\u030C", "\u0109": "c\u0302", "\u010B": "c\u0307", "\xE7": "c\u0327", "\u010F": "d\u030C", "\u1E0B": "d\u0307", "\u1E11": "d\u0327", "\xE9": "e\u0301", "\xE8": "e\u0300", "\xEB": "e\u0308", "\u1EBD": "e\u0303", "\u0113": "e\u0304", "\u1E17": "e\u0304\u0301", "\u1E15": "e\u0304\u0300", "\u0115": "e\u0306", "\u1E1D": "e\u0327\u0306", "\u011B": "e\u030C", "\xEA": "e\u0302", "\u1EBF": "e\u0302\u0301", "\u1EC1": "e\u0302\u0300", "\u1EC5": "e\u0302\u0303", "\u0117": "e\u0307", "\u0229": "e\u0327", "\u1E1F": "f\u0307", "\u01F5": "g\u0301", "\u1E21": "g\u0304", "\u011F": "g\u0306", "\u01E7": "g\u030C", "\u011D": "g\u0302", "\u0121": "g\u0307", "\u0123": "g\u0327", "\u1E27": "h\u0308", "\u021F": "h\u030C", "\u0125": "h\u0302", "\u1E23": "h\u0307", "\u1E29": "h\u0327", "\xED": "i\u0301", "\xEC": "i\u0300", "\xEF": "i\u0308", "\u1E2F": "i\u0308\u0301", "\u0129": "i\u0303", "\u012B": "i\u0304", "\u012D": "i\u0306", "\u01D0": "i\u030C", "\xEE": "i\u0302", "\u01F0": "j\u030C", "\u0135": "j\u0302", "\u1E31": "k\u0301", "\u01E9": "k\u030C", "\u0137": "k\u0327", "\u013A": "l\u0301", "\u013E": "l\u030C", "\u013C": "l\u0327", "\u1E3F": "m\u0301", "\u1E41": "m\u0307", "\u0144": "n\u0301", "\u01F9": "n\u0300", "\xF1": "n\u0303", "\u0148": "n\u030C", "\u1E45": "n\u0307", "\u0146": "n\u0327", "\xF3": "o\u0301", "\xF2": "o\u0300", "\xF6": "o\u0308", "\u022B": "o\u0308\u0304", "\xF5": "o\u0303", "\u1E4D": "o\u0303\u0301", "\u1E4F": "o\u0303\u0308", "\u022D": "o\u0303\u0304", "\u014D": "o\u0304", "\u1E53": "o\u0304\u0301", "\u1E51": "o\u0304\u0300", "\u014F": "o\u0306", "\u01D2": "o\u030C", "\xF4": "o\u0302", "\u1ED1": "o\u0302\u0301", "\u1ED3": "o\u0302\u0300", "\u1ED7": "o\u0302\u0303", "\u022F": "o\u0307", "\u0231": "o\u0307\u0304", "\u0151": "o\u030B", "\u1E55": "p\u0301", "\u1E57": "p\u0307", "\u0155": "r\u0301", "\u0159": "r\u030C", "\u1E59": "r\u0307", "\u0157": "r\u0327", "\u015B": "s\u0301", "\u1E65": "s\u0301\u0307", "\u0161": "s\u030C", "\u1E67": "s\u030C\u0307", "\u015D": "s\u0302", "\u1E61": "s\u0307", "\u015F": "s\u0327", "\u1E97": "t\u0308", "\u0165": "t\u030C", "\u1E6B": "t\u0307", "\u0163": "t\u0327", "\xFA": "u\u0301", "\xF9": "u\u0300", "\xFC": "u\u0308", "\u01D8": "u\u0308\u0301", "\u01DC": "u\u0308\u0300", "\u01D6": "u\u0308\u0304", "\u01DA": "u\u0308\u030C", "\u0169": "u\u0303", "\u1E79": "u\u0303\u0301", "\u016B": "u\u0304", "\u1E7B": "u\u0304\u0308", "\u016D": "u\u0306", "\u01D4": "u\u030C", "\xFB": "u\u0302", "\u016F": "u\u030A", "\u0171": "u\u030B", "\u1E7D": "v\u0303", "\u1E83": "w\u0301", "\u1E81": "w\u0300", "\u1E85": "w\u0308", "\u0175": "w\u0302", "\u1E87": "w\u0307", "\u1E98": "w\u030A", "\u1E8D": "x\u0308", "\u1E8B": "x\u0307", "\xFD": "y\u0301", "\u1EF3": "y\u0300", "\xFF": "y\u0308", "\u1EF9": "y\u0303", "\u0233": "y\u0304", "\u0177": "y\u0302", "\u1E8F": "y\u0307", "\u1E99": "y\u030A", "\u017A": "z\u0301", "\u017E": "z\u030C", "\u1E91": "z\u0302", "\u017C": "z\u0307", "\xC1": "A\u0301", "\xC0": "A\u0300", "\xC4": "A\u0308", "\u01DE": "A\u0308\u0304", "\xC3": "A\u0303", "\u0100": "A\u0304", "\u0102": "A\u0306", "\u1EAE": "A\u0306\u0301", "\u1EB0": "A\u0306\u0300", "\u1EB4": "A\u0306\u0303", "\u01CD": "A\u030C", "\xC2": "A\u0302", "\u1EA4": "A\u0302\u0301", "\u1EA6": "A\u0302\u0300", "\u1EAA": "A\u0302\u0303", "\u0226": "A\u0307", "\u01E0": "A\u0307\u0304", "\xC5": "A\u030A", "\u01FA": "A\u030A\u0301", "\u1E02": "B\u0307", "\u0106": "C\u0301", "\u1E08": "C\u0327\u0301", "\u010C": "C\u030C", "\u0108": "C\u0302", "\u010A": "C\u0307", "\xC7": "C\u0327", "\u010E": "D\u030C", "\u1E0A": "D\u0307", "\u1E10": "D\u0327", "\xC9": "E\u0301", "\xC8": "E\u0300", "\xCB": "E\u0308", "\u1EBC": "E\u0303", "\u0112": "E\u0304", "\u1E16": "E\u0304\u0301", "\u1E14": "E\u0304\u0300", "\u0114": "E\u0306", "\u1E1C": "E\u0327\u0306", "\u011A": "E\u030C", "\xCA": "E\u0302", "\u1EBE": "E\u0302\u0301", "\u1EC0": "E\u0302\u0300", "\u1EC4": "E\u0302\u0303", "\u0116": "E\u0307", "\u0228": "E\u0327", "\u1E1E": "F\u0307", "\u01F4": "G\u0301", "\u1E20": "G\u0304", "\u011E": "G\u0306", "\u01E6": "G\u030C", "\u011C": "G\u0302", "\u0120": "G\u0307", "\u0122": "G\u0327", "\u1E26": "H\u0308", "\u021E": "H\u030C", "\u0124": "H\u0302", "\u1E22": "H\u0307", "\u1E28": "H\u0327", "\xCD": "I\u0301", "\xCC": "I\u0300", "\xCF": "I\u0308", "\u1E2E": "I\u0308\u0301", "\u0128": "I\u0303", "\u012A": "I\u0304", "\u012C": "I\u0306", "\u01CF": "I\u030C", "\xCE": "I\u0302", "\u0130": "I\u0307", "\u0134": "J\u0302", "\u1E30": "K\u0301", "\u01E8": "K\u030C", "\u0136": "K\u0327", "\u0139": "L\u0301", "\u013D": "L\u030C", "\u013B": "L\u0327", "\u1E3E": "M\u0301", "\u1E40": "M\u0307", "\u0143": "N\u0301", "\u01F8": "N\u0300", "\xD1": "N\u0303", "\u0147": "N\u030C", "\u1E44": "N\u0307", "\u0145": "N\u0327", "\xD3": "O\u0301", "\xD2": "O\u0300", "\xD6": "O\u0308", "\u022A": "O\u0308\u0304", "\xD5": "O\u0303", "\u1E4C": "O\u0303\u0301", "\u1E4E": "O\u0303\u0308", "\u022C": "O\u0303\u0304", "\u014C": "O\u0304", "\u1E52": "O\u0304\u0301", "\u1E50": "O\u0304\u0300", "\u014E": "O\u0306", "\u01D1": "O\u030C", "\xD4": "O\u0302", "\u1ED0": "O\u0302\u0301", "\u1ED2": "O\u0302\u0300", "\u1ED6": "O\u0302\u0303", "\u022E": "O\u0307", "\u0230": "O\u0307\u0304", "\u0150": "O\u030B", "\u1E54": "P\u0301", "\u1E56": "P\u0307", "\u0154": "R\u0301", "\u0158": "R\u030C", "\u1E58": "R\u0307", "\u0156": "R\u0327", "\u015A": "S\u0301", "\u1E64": "S\u0301\u0307", "\u0160": "S\u030C", "\u1E66": "S\u030C\u0307", "\u015C": "S\u0302", "\u1E60": "S\u0307", "\u015E": "S\u0327", "\u0164": "T\u030C", "\u1E6A": "T\u0307", "\u0162": "T\u0327", "\xDA": "U\u0301", "\xD9": "U\u0300", "\xDC": "U\u0308", "\u01D7": "U\u0308\u0301", "\u01DB": "U\u0308\u0300", "\u01D5": "U\u0308\u0304", "\u01D9": "U\u0308\u030C", "\u0168": "U\u0303", "\u1E78": "U\u0303\u0301", "\u016A": "U\u0304", "\u1E7A": "U\u0304\u0308", "\u016C": "U\u0306", "\u01D3": "U\u030C", "\xDB": "U\u0302", "\u016E": "U\u030A", "\u0170": "U\u030B", "\u1E7C": "V\u0303", "\u1E82": "W\u0301", "\u1E80": "W\u0300", "\u1E84": "W\u0308", "\u0174": "W\u0302", "\u1E86": "W\u0307", "\u1E8C": "X\u0308", "\u1E8A": "X\u0307", "\xDD": "Y\u0301", "\u1EF2": "Y\u0300", "\u0178": "Y\u0308", "\u1EF8": "Y\u0303", "\u0232": "Y\u0304", "\u0176": "Y\u0302", "\u1E8E": "Y\u0307", "\u0179": "Z\u0301", "\u017D": "Z\u030C", "\u1E90": "Z\u0302", "\u017B": "Z\u0307", "\u03AC": "\u03B1\u0301", "\u1F70": "\u03B1\u0300", "\u1FB1": "\u03B1\u0304", "\u1FB0": "\u03B1\u0306", "\u03AD": "\u03B5\u0301", "\u1F72": "\u03B5\u0300", "\u03AE": "\u03B7\u0301", "\u1F74": "\u03B7\u0300", "\u03AF": "\u03B9\u0301", "\u1F76": "\u03B9\u0300", "\u03CA": "\u03B9\u0308", "\u0390": "\u03B9\u0308\u0301", "\u1FD2": "\u03B9\u0308\u0300", "\u1FD1": "\u03B9\u0304", "\u1FD0": "\u03B9\u0306", "\u03CC": "\u03BF\u0301", "\u1F78": "\u03BF\u0300", "\u03CD": "\u03C5\u0301", "\u1F7A": "\u03C5\u0300", "\u03CB": "\u03C5\u0308", "\u03B0": "\u03C5\u0308\u0301", "\u1FE2": "\u03C5\u0308\u0300", "\u1FE1": "\u03C5\u0304", "\u1FE0": "\u03C5\u0306", "\u03CE": "\u03C9\u0301", "\u1F7C": "\u03C9\u0300", "\u038E": "\u03A5\u0301", "\u1FEA": "\u03A5\u0300", "\u03AB": "\u03A5\u0308", "\u1FE9": "\u03A5\u0304", "\u1FE8": "\u03A5\u0306", "\u038F": "\u03A9\u0301", "\u1FFA": "\u03A9\u0300" };
var unicodeSymbols_default = unicodeSymbols;

// katex/data-host.js
function getFontMetricsData() {
  return fontMetricsData_default;
}
function getUnicodeSymbols() {
  return unicodeSymbols_default;
}

// rehype-katex.raw.js
var V = (e2) => function() {
  return e2(this);
};
var W = (e2) => function(a2) {
  return e2(this, a2);
};
var Bd = (e2) => function(a2, b2) {
  return e2(this, a2, b2);
};
var $e = (e2) => function(a2, b2, c2) {
  return e2(this, a2, b2, c2);
};
var af = (e2) => function() {
  return e2(this, arguments);
};
var wf = "type";
var yf = "text";
var Af = "style";
var Bf = "body";
var Df = "height";
var Lf = "depth";
var Of = "size";
var Xf = "ordgroup";
var Yf = "elem";
var Zf = "width";
var _f = "Size4-Regular";
var bg = "textord";
var gg = "base";
var kg = "individualShift";
var mg = "shift";
var tg = "math";
var wg = "mord";
var Ag = "number";
var Dg = "mclass";
var Gg = "font";
var Jg = "separator";
var Lg = "color";
var Qg = "operatorname";
var Rg = "italic";
var Tg = "display";
var Ug = "firstBaseline";
var kh = "kern";
var lh = "";
var mh = "string";
var ph = "align";
var Ch = " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v";
var Dh = "true";
var Eh = "mpadded";
var Jh = "stack";
var Mh = "mspace";
var Oh = "whitespace";
var Sh = "styling";
var Th = "tagName";
var Vh = "internal";
var Xh = "lspace";
var _h = "http://www.w3.org/1998/Math/MathML";
var ki = "mo";
var li = "accent";
var ni = "notation";
var oi = "stretchy";
var qi = " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v";
var ti = "svg-align";
var vi = "mathvariant";
var wi = "totalheight";
var yi = "LaTeX-incompatible input and strict mode is set to 'warn': ";
var Fi = "munder";
var Gi = "script";
var Mi = "columnspacing";
var Qi = "span";
var Ri = "boldsymbol";
var Ti = "horizBrace";
var Wi = " ";
var Xi = "mover";
var Yi = "right";
var Zi = "function";
var aj = "http://www.w3.org/2000/svg";
var ej = "scriptscript";
var fj = "LaTeX-incompatible input and strict mode is set to ";
var gj = "atom";
var hj = "left";
var jj = "primitive";
var lj = "bottom";
var mj = "mclose";
var nj = "textit";
var pj = '"';
var rj = "leqno";
var vj = "\\downarrow";
var yj = "color-token";
var Bj = "([-+]?) *(\\d+(?:\\.\\d*)?|\\.\\d+) *([a-z]{2})";
var Cj = "'";
var Dj = "op";
var Fj = "mrow";
var Sj = "unicodeTextInMathMode";
var Uj = "mopen";
var Vj = "small";
var Zj = "mstyle";
var _j = "supsub";
var ak = "Size1-Regular";
var bk = "\\textcircled";
var fk = "EOF";
var jk = "element";
var kk = "enclose";
var lk = "mathord";
var mk = "phantom";
var ok3 = "\\uparrow";
var tk = "undefined";
var vk = "Main-Regular";
var Ak = "{subarray} can contain only one column";
var Bk = ".";
var Ck = "url";
var Ek = "fence";
var Fk = "infix";
var Gk = "mtext";
var Hk = "split";
var Ik = "\\df@tag";
var Jk = "\\oiiint";
var Lk = "xMinYMin";
var Mk = "\\Downarrow";
var Nk = "delimsizing";
var Ok = "scriptlevel";
var Rk = "\\includegraphics";
var Tk = "sans-serif-italic";
var Xk = "normal";
var Zk = "rspace";
var _k = "sizing";
var $k = "textbf";
var al = " character to complete a CD arrow.";
var bl = "M403 1759 V84 H666 V0 H319 V1759 v";
var cl = "\\textasciitilde";
var ll = "reset-size";
var nl = "M347 1759 V0 H0 V84 H263 V1759 v";
var ol = "mop";
var pl = "\\oiint";
var ql = "genfrac";
var ul = "newline";
var wl = "Invalid unit: '";
var xl = "\\\\cdlongequal";
var yl = "\\current@color";
var zl = "leftright-right";
var Al = "mathVsTextUnits";
var Dl = "mi";
var El = "html";
var Gl = "false";
var Kl = "Main-Bold";
var Ll = "\\Uparrow";
var Nl = "h-400000z";
var Pl = "leftright";
var Ql = "monospace";
var Rl = "widecheck";
var Xl = "Got group of unknown type: '";
var Yl = "Undefined control sequence: ";
var Zl = "tag";
var _l = "top";
var $l = "\\Vert";
var am = "object";
var bm = "\\Updownarrow";
var cm = "\\\\abovefrac";
var dm = "\\\\bracefrac";
var em = "\\\\brackfrac";
var fm = "\\updownarrow";
var gm = "Expected a control sequence";
var hm = "mn";
var im = "\\langle";
var jm = "\\limits";
var km = "\\rangle";
var om = "h400000v";
var sm = "Unknown column alignment: ";
var tm = "|";
var um = "\\\\atopfrac";
var vm = "\\lmoustache";
var wm = "\\rmoustache";
var xm = "displaystyle";
var Bm = "rightharpoonaboveshortbar";
var Cm = "shortrightharpoonabovebar";
var Dm = "href";
var Em = "mbin";
var Gm = 'Unknown type of space "';
var Hm = "\\operatornamewithlimits";
var Im = "baraboveshortleftharpoon";
var Jm = "shortbaraboveleftharpoon";
var Km = "]";
var Lm = "\\";
var Mm = "alt";
var Om = "\u23AA";
var Pm = "\\end";
var Qm = "error";
var Rm = "inner";
var Sm = "alignat";
var Zm = "voffset";
var _m = "widehat";
var $m = "\\\\\\relax";
var an = "\\fcolorbox";
var bn = "\\hdashline";
var cn = "\\htmlClass";
var dn = "\\htmlStyle";
var en = "accentunder";
var fn = "arraycolsep";
var gn = "bold-italic";
var hn = "environment";
var mn = "' in \\includegraphics.";
var nn = "M319 602 V0 H403 V602 v";
var on = "^(?:[\\\\{}$&#^_]|EOF)$";
var pn = "{";
var qn = "\\htmlData";
var rn = "\\ldots\\,";
var sn = "\\stackrel";
var tn = "\\underset";
var un = "mathnormal";
var vn = "munderover";
var wn = "sans-serif";
var zn = "gather";
var An = "ignore";
var Bn = "mathbf";
var Cn = "mathml";
var Dn = "minner";
var En = "mtable";
var Gn = "texttt";
var Hn = " H145z M145 0 H188 V";
var In = "Can't use function '";
var Jn = "\\Longleftrightarrow";
var Kn = "\\longleftrightarrow";
var Ln = "rightharpoondownplus";
var Mn = "0em";
var Nn = "0px";
var On = "\\{";
var Pn = "\\}";
var Qn = "pre";
var Rn = "raw";
var Sn = "src";
var Tn = "0 0 ";
var Un = "100%";
var Vn = "\\\\";
var Xn = "sqrt";
var Yn = ' style="';
var ao = "hide-tail";
var fo = "underline";
var go = "leftharpoondownplus";
var ho = "Double superscript";
var io = "Typewriter-Regular";
var jo = "\\xleftequilibrium";
var ko = "rightarrowabovebar";
var no = ">";
var oo = "}";
var po = "class";
var ro = "large";
var vo = "LaTeX's ";
var wo = "\\dbinom";
var xo = "\\htmlId";
var yo = "\\lbrace";
var zo = "\\lbrack";
var Ao = "\\lfloor";
var Bo = "\\lgroup";
var Co = "\\lparen";
var Do = "\\rbrace";
var Eo = "\\rbrack";
var Fo = "\\rfloor";
var Go = "\\rgroup";
var Ho = "\\rparen";
var Io = "\\tbinom";
var Mo = "leftmost";
var Oo = "mphantom";
var Po = "overline";
var So = "xMaxYMin";
var To = "baraboveleftarrow";
var Yo = "twoheadrightarrow";
var _o = "\\Leftrightarrow";
var $o = "\\Longrightarrow";
var ap = "\\\\cdrightarrow";
var bp = "\\\\globalfuture";
var cp = "\\hookrightarrow";
var dp = "\\leftrightarrow";
var ep = "\\longrightarrow";
var gp = "doublerightarrow";
var kp = "rightharpoondown";
var lp = "rightharpoonplus";
var mp = "rightlinesegment";
var np = "twoheadleftarrow";
var op = ":";
var pp = "[";
var qp = "\\|";
var tp = "\\binom";
var up = "\\color";
var vp = "\\dfrac";
var wp = "\\dotsb";
var xp = "\\iiint";
var yp = "\\lceil";
var zp = "\\ldots";
var Ap = "\\prime";
var Bp = "\\rceil";
var Cp = "\\relax";
var Dp = "\\tfrac";
var Kp = "vcenter";
var Lp = "Invalid size: '";
var Mp = "Math-BoldItalic";
var Np = "\\Longleftarrow";
var Op = "\\\\cdleftarrow";
var Pp = "\\longleftarrow";
var Qp = "doubleleftarrow";
var Sp = "includegraphics";
var Tp = "leftharpoondown";
var Up = "leftharpoonplus";
var Vp = "leftlinesegment";
var Zp = "rightbraceunder";
var _p = "rightgroupunder";
var aq = "\\gt";
var bq = "\\lt";
var dq = "bold";
var eq = "main";
var fq = "mrel";
var hq = "open";
var iq = "warn";
var jq = "M145 15 v585 v";
var kq = "\\\\globallong";
var lq = "\\nobreakspace";
var pq = "leftbraceunder";
var qq = "leftgroupunder";
var rq = "mathbackground";
var sq = "unrecognized '";
var tq = "xMinYMin slice";
var uq = "#";
var vq = "-";
var wq = "\\angl";
var xq = "\\fbox";
var yq = "\\frac";
var zq = "\\href";
var Aq = "\\iint";
var Bq = "\\surd";
var Cq = "\\vert";
var Dq = "cancel";
var Fq = "mathit";
var Gq = "mathrm";
var Hq = "mtight";
var Jq = "textrm";
var Kq = "textsf";
var Lq = "M145 0 H188 V";
var Mq = "\\\\globallet";
var Nq = "\\diamondsuit";
var Tq = "cdlabelparent";
var Uq = "double-struck";
var Xq = "linethickness";
var Yq = "midbraceunder";
var Zq = "node of type ";
var $q = " v1715 H319z";
var ar = "\\Rightarrow";
var br = "\\\\cdparent";
var cr = "\\allowbreak";
var dr = "\\begingroup";
var er = "\\longmapsto";
var fr = "\\rightarrow";
var hr = "rightharpoon";
var kr = ")";
var lr = "*";
var mr = "1";
var nr = "g";
var or = " -";
var pr = " [";
var qr = "em";
var rr = "ex";
var sr = '="';
var tr = "bin";
var vr = "mtd";
var wr = "rel";
var xr = "\u2016";
var yr = "\u23A2";
var zr = "\u23A5";
var Ar = "\u23D0";
var Br = "\u27E8";
var Cr = "\u27E9";
var Dr = "400em";
var Er = "\\Big";
var Fr = "\\url";
var Gr = "\\vec";
var Hr = "amsrm";
var Ir = "array";
var Jr = "close";
var Lr = "fleqn";
var Or = "katex";
var Pr = "title";
var Qr = " v1759 h84z";
var Rr = "0 0 400000 ";
var Sr = "AMS-Regular";
var Tr = "Math-Italic";
var Ur = '" used in ';
var Vr = "\\Leftarrow";
var Wr = "\\\\cdright";
var Xr = "\\backslash";
var Yr = "\\bigotimes";
var Zr = "\\heartsuit";
var _r = "\\leftarrow";
var $r = "\\spadesuit";
var as = "\\textcolor";
var bs = "\\widecheck";
var cs = "\\widetilde";
var ds = "accentUnder";
var hs = "katex-error";
var is = "leftharpoon";
var js = "oiiintSize1";
var ks = "oiiintSize2";
var ns = "rightToFrom";
var os = "superscript";
var qs = " v585 h43z";
var rs = " v602 h84z";
var ss = ", but got ";
var ts = "-arrow-pad";
var us = '<path d="';
var vs = "Missing a ";
var ws = "Typewriter";
var xs = "\\\\cdleft";
var ys = "\\bigoplus";
var zs = "\\bigsqcup";
var As = "\\biguplus";
var Bs = "\\bigwedge";
var Cs = "\\clubsuit";
var Ds = "\\colorbox";
var Es = "\\emptyset";
var Fs = "\\endgroup";
var Gs = "\\mathring";
var Hs = "\\nolimits";
var Is = "\\smallint";
var Js = "\\subseteq";
var Ks = "\\supseteq";
var Ls = "\\vartheta";
var Ms = "allowbreak";
var Ps = "doublevert";
var Qs = "htmlmathml";
var Rs = "leftToFrom";
var Ss = "leftmapsto";
var Us = "mathchoice";
var Vs = "oiintSize1";
var Ws = "oiintSize2";
var Xs = "rightarrow";
var Ys = "rightbrace";
var Zs = "rightgroup";
var at = ",";
var bt = "0";
var ct = "<";
var dt = "c";
var et = "m";
var ft = "~";
var gt = "Size";
var ht = '"/>';
var it = "angl";
var jt = "auto";
var kt = "hbox";
var mt = "root";
var nt = "rule";
var pt = ' class="';
var qt = "\\bcancel";
var rt = "\\bigodot";
var st = "\\ddagger";
var tt = "\\nobreak";
var ut = "\\widehat";
var vt = "\\xcancel";
var yt = "enclosing";
var zt = "frac-line";
var At = "leftarrow";
var Bt = "leftbrace";
var Ct = "leftgroup";
var Dt = "longequal";
var Et = "math mode";
var Ft = "mathcolor";
var It = "plaintext";
var Jt = "righthook";
var Kt = "rightmost";
var Pt = "widetilde";
var Qt = "CD";
var Rt = "\n";
var St = "mu";
var Tt = "-Regular";
var Ut = "\\@cdots";
var Vt = "\\@eqnsw";
var Wt = "\\bigcap";
var Xt = "\\bigcup";
var Yt = "\\bigvee";
var Zt = "\\bullet";
var _t = "\\cancel";
var $t = "\\choose";
var au = "\\coprod";
var bu = "\\exists";
var cu = "\\global";
var du = "\\mapsto";
var eu = "\\subset";
var fu = "\\texttt";
var gu = "\\utilde";
var hu = "colorbox";
var iu = "hphantom";
var ku = "lefthook";
var lu = "mathfrak";
var mu = "mathsfit";
var nu = "menclose";
var ou = "midbrace";
var pu = "original";
var qu = "pre-wrap";
var su = "raisebox";
var tu = "sqrtMain";
var uu = "sqrtTall";
var wu = "vphantom";
var xu = 55349;
var yu = 1e3;
var zu = 120782;
var ff = (Au2) => !(Au2 == null) && typeof Au2 == am;
var m = (Au2, Bu2) => {
  if (Au2 == null) return false;
  var Cu2 = typeof Au2;
  if (Cu2 != am && Cu2 != Zi) return false;
  Bu2 = Bu2.prototype;
  return !!Bu2.isPrototypeOf(Au2);
};
var X = (Au2, Bu2) => {
  var Du2 = Bu2.length | 0;
  var Cu2 = 0;
  while (Cu2 < Du2) {
    Array.prototype.push.call(Au2, Bu2[Cu2]);
    Cu2 = Cu2 + 1;
  }
};
var Hd = (Au2, Bu2, Cu2) => {
  var Du2 = [];
  Du2.push(Bu2);
  Du2.push(2);
  var Eu2 = Cu2.length | 0;
  Bu2 = 0;
  while (Bu2 < Eu2) {
    Du2.push(Cu2[Bu2]);
    Bu2 = Bu2 + 1;
  }
  Au2.splice.apply(Au2, Du2);
};
var Id = (Au2) => {
  var Cu2 = [];
  Cu2.push(0);
  var Du2 = Au2.length | 0;
  var Bu2 = 0;
  while (Bu2 < Du2) {
    Cu2.push(Au2[Bu2]);
    Bu2 = Bu2 + 1;
  }
  return Math.max.apply(Math, Cu2);
};
var l = (Au2, Bu2) => {
  let Cu2 = Object.prototype;
  return !!Cu2.hasOwnProperty.call(Au2, Bu2);
};
var t = (Au2) => new Error(Au2);
var u = (Au2) => Object.keys(Au2);
var C = () => globalThis.document;
var wa = (Au2) => {
  var Bu2 = globalThis.console;
  var Cu2;
  !(Bu2 === void 0) && !(Bu2 == null) && Bu2.warn(Au2);
};
var E = (Au2) => {
  if (!Array.isArray(Au2)) return 0;
  return +Au2.length | 0;
};
var z = (Au2, Bu2) => {
  Au2 = Au2[Bu2];
  if ("string" == typeof Au2) return Au2;
  return lh;
};
var kf = (Au2, Bu2) => {
  var Cu2 = [];
  var Eu2 = E(Au2);
  var Du2 = 0;
  while (Du2 < Eu2) {
    Cu2.push(Au2[Du2]);
    Du2 = Du2 + 1;
  }
  Cu2.push(Bu2);
  return Cu2;
};
var sf = (Au2) => {
  if (Array.isArray(Au2)) {
    var Bu2 = void 0;
    var Cu2 = void 0;
    E(Au2) > 0 && (Bu2 = Au2[0]);
    E(Au2) > 1 && (Cu2 = Au2[1]);
    return { action: Bu2, offset: Cu2 };
  }
  if (typeof Au2 == Ag) return { action: true, offset: Au2 };
  if (Au2 === void 0 || Au2 == null) return { action: void 0, offset: void 0 };
  return { action: Au2, offset: void 0 };
};
var hf = (Au2) => {
  Au2 = Au2.action;
  if ("boolean" == typeof Au2) return !Au2;
  return false;
};
var of = (Au2) => {
  Au2 = Au2.action;
  if ("string" == typeof Au2) return "skip" == Au2;
  return false;
};
var df = (Au2, Bu2) => 0 == Bu2.length ? true : z(Au2, wf) == Bu2;
var Cd = (Au2, Bu2, Cu2, Du2) => {
  var Eu2 = { action: void 0, offset: void 0 };
  if (df(Au2, Cu2) && hf(Eu2 = sf(Du2(Au2, Bu2)))) return Eu2;
  var Fu2 = Au2.children;
  var Gu2;
  if (Array.isArray(Fu2) && !of(Eu2)) {
    Gu2 = kf(Bu2, Au2);
    Bu2 = E(Fu2);
    Au2 = 0;
    while (Au2 >= 0 && Au2 < Bu2) {
      Bu2 = Cd(Fu2[Au2], Gu2, Cu2, Du2);
      if (hf(Bu2)) return Bu2;
      Bu2 = Bu2.offset;
      Au2 = typeof Bu2 == Ag ? +Bu2 | 0 : Au2 + 1;
      Bu2 = E(Fu2);
    }
  }
  return Eu2;
};
var Jd = (Au2) => Au2 == null || typeof Au2 != am ? false : "type" in Au2 && "tagName" in Au2;
var xa = (Au2) => {
  if (!Jd(Au2)) return false;
  if (z(Au2, wf) != jk) return false;
  return typeof Au2.tagName == mh;
};
var Y = (Au2, Bu2) => xa(Au2) && z(Au2, Th) == Bu2;
var Dd = (Au2) => {
  if (!xa(Au2)) return false;
  Au2 = z(Au2, Th);
  Au2 = "td" == Au2 || "th" == Au2;
  return Au2;
};
var Kd = (Au2) => {
  if (!xa(Au2)) return false;
  Au2 = Au2.properties;
  if (!ff(Au2)) return false;
  return !!Au2.hidden;
};
var Ld = (Au2) => {
  if (!Y(Au2, "dialog")) return false;
  Au2 = Au2.properties;
  if (!ff(Au2)) return true;
  return !Au2.open;
};
var Md = (Au2) => "datalist" == Au2 || "head" == Au2 || "noembed" == Au2 || "noframes" == Au2 || "noscript" == Au2 || "rp" == Au2 || Au2 == Gi || Au2 == Af || "template" == Au2 || Au2 == Pr;
var cf = (Au2) => {
  if (!xa(Au2)) return false;
  if (Md(z(Au2, Th))) return true;
  if (Kd(Au2)) return true;
  return Ld(Au2);
};
var mf = (Au2) => "address" == Au2 || "article" == Au2 || "aside" == Au2 || "blockquote" == Au2 || Au2 == Bf || "caption" == Au2 || "center" == Au2 || "dd" == Au2 || "dialog" == Au2 || "dir" == Au2 || "dl" == Au2 || "dt" == Au2 || "div" == Au2 || "figure" == Au2 || "figcaption" == Au2 || "footer" == Au2 || "form," == Au2 || "form" == Au2 || "h1" == Au2 || "h2" == Au2 || "h3" == Au2 || "h4" == Au2 || "h5" == Au2 || "h6" == Au2 || "header" == Au2 || "hgroup" == Au2 || "hr" == Au2 || Au2 == El || "legend" == Au2 || "li" == Au2 || "listing" == Au2 || Au2 == eq || "menu" == Au2 || "nav" == Au2 || "ol" == Au2 || "p" == Au2 || Au2 == It || Au2 == Qn || "section" == Au2 || "ul" == Au2 || "xmp" == Au2;
var uf = (Au2) => {
  if (!xa(Au2)) return false;
  return mf(z(Au2, Th));
};
var qf = (Au2, Bu2) => {
  var Du2 = E(Au2);
  var Cu2 = 0;
  while (Cu2 < Du2) {
    if (Au2[Cu2] == Bu2) return Cu2;
    Cu2 = Cu2 + 1;
  }
  return -1;
};
var Ed = (Au2, Bu2, Cu2) => {
  var Du2, Eu2;
  if (!ff(Au2) || !Array.isArray(Au2.children)) return;
  Du2 = Au2.children;
  Au2 = qf(Du2, Bu2);
  if (Au2 < 0) return;
  Eu2 = E(Du2);
  Au2 = Au2 + 1 | 0;
  while (Au2 < Eu2) {
    Bu2 = Du2[Au2];
    if (Cu2(Bu2)) return Bu2;
    Au2 = Au2 + 1 | 0;
  }
};
var Fd = (Au2, Bu2) => {
  var Cu2 = Bu2.whitespace;
  "string" == typeof Cu2 || (Cu2 = Xk);
  if (z(Au2, wf) != jk) return Cu2;
  Bu2 = z(Au2, Th);
  Au2 = Au2.properties;
  ff(Au2) || (Au2 = {});
  if ("listing" == Bu2 || Bu2 == It || "xmp" == Bu2) return Qn;
  if ("nobr" == Bu2) return "nowrap";
  if (Bu2 == Qn) {
    if (Au2.wrap) return qu;
    return Qn;
  }
  if ("td" == Bu2 || "th" == Bu2) return Au2.noWrap ? "nowrap" : Cu2;
  return "textarea" == Bu2 ? qu : Cu2;
};
var rf = (Au2, Bu2, Cu2) => {
  var Gu2 = [];
  var Hu2 = Au2.length;
  var Iu2 = /[\t ]+/g;
  var Eu2 = 0, Du2 = 0, Fu2, Ju2;
  while (Eu2 < Hu2) {
    Iu2.lastIndex = Eu2;
    Fu2 = Iu2.exec(Au2);
    Du2 = Fu2 == null ? Hu2 : +Fu2.index | 0;
    0 == Eu2 && 0 == Du2 && !(Fu2 == null) && !Bu2 && Gu2.push(lh);
    Eu2 != Du2 && Gu2.push(Au2.slice(Eu2, Du2));
    Eu2 = Fu2 == null ? Du2 : Du2 + (Fu2[0] + "").length | 0;
  }
  Eu2 != Du2 && !Cu2 && Gu2.push(lh);
  return Gu2.join(Wi) + "";
};
var lf = (Au2, Bu2) => {
  var Gu2 = Au2.value + "";
  var Hu2 = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;
  var Eu2 = [];
  var Cu2 = [];
  var Fu2 = Gu2.length;
  var Iu2 = /\n/g;
  Au2 = 0;
  while (Au2 <= Fu2) {
    Iu2.lastIndex = Au2;
    var Du2 = Iu2.exec(Gu2);
    var Ju2;
    Du2 = !(Du2 == null) && "index" in Du2 ? +Du2.index | 0 : Fu2;
    Ju2 = Gu2.slice(Au2, Du2);
    Hu2.lastIndex = 0;
    var Ku2 = Ju2.replace(Hu2, lh) + "";
    Au2 = 0 == Au2 ? Bu2.breakBefore : true;
    Ju2 = Du2 == Fu2 ? Bu2.breakAfter : true;
    Eu2.push(rf(Ku2, Au2, Ju2));
    Au2 = Du2 + 1 | 0;
  }
  Fu2 = E(Eu2);
  Au2 = 0;
  Du2 = void 0;
  while (Au2 < Fu2) {
    Bu2 = Eu2[Au2] + "";
    Hu2 = Bu2.length > 0 && 8203 == Bu2.charCodeAt(Bu2.length - 1);
    Au2 < (Fu2 - 1 | 0) ? (Gu2 = Eu2[Au2 + 1] + "", Gu2 = Gu2.length > 0 && 8203 == Gu2.charCodeAt(0)) : Gu2 = false;
    Hu2 || Gu2 ? (Cu2.push(Bu2), Du2 = void 0) : Bu2.length > 0 ? (typeof Du2 == Ag && Cu2.push(Du2), Cu2.push(Bu2), Du2 = 0) : (0 == Au2 || Au2 == (Fu2 - 1 | 0)) && Cu2.push(0);
    Au2 = Au2 + 1;
  }
  return Cu2;
};
var Gd = (Au2, Bu2, Cu2) => {
  if (z(Au2, wf) == yf) {
    if (z(Cu2, Oh) == Xk) return lf(Au2, Cu2);
    Bu2 = [];
    Au2 = Au2.value;
    Au2 = Au2 + "";
    Bu2.push(Au2);
    return Bu2;
  }
  if (z(Au2, wf) != jk) return [];
  var Ku2 = Fd(Au2, Cu2);
  var Gu2 = Au2.children;
  Array.isArray(Gu2) || (Gu2 = []);
  var Du2 = [];
  if (cf(Au2)) return Du2;
  Cu2 = void 0;
  var Eu2 = void 0;
  if (Y(Au2, "br")) {
    Eu2 = Rt;
  } else {
    var Fu2;
    Y(Au2, "tr") && !(Ed(Bu2, Au2, function(Bu3) {
      return Y(Bu3, "tr");
    }) === void 0) ? Eu2 = Rt : Y(Au2, "p") ? (Cu2 = 2, Eu2 = 2) : uf(Au2) && (Cu2 = 1, Eu2 = 1);
  }
  var Hu2 = E(Gu2);
  Fu2 = 0;
  while (Fu2 < Hu2) {
    var Iu2 = void 0;
    0 == Fu2 && (Iu2 = Cu2);
    var Ju2 = Fu2 < (Hu2 - 1 | 0) ? Y(Gu2[Fu2 + 1], "br") : Eu2;
    var Lu2 = Gu2[Fu2];
    Du2 = Du2.concat(Gd(Lu2, Au2, { whitespace: Ku2, breakBefore: Iu2, breakAfter: Ju2 }));
    Fu2 = Fu2 + 1;
  }
  Dd(Au2) && !(Ed(Bu2, Au2, function(Bu3) {
    return Dd(Bu3);
  }) === void 0) && Array.prototype.push.call(Du2, "	");
  !Cu2 || Du2.unshift(Cu2);
  !Eu2 || Array.prototype.push.call(Du2, Eu2);
  return Du2;
};
var gf = (Au2) => {
  var Du2 = [];
  var Gu2 = E(Au2);
  var Bu2 = void 0, Eu2 = 0, Cu2, Fu2, Hu2;
  while (Eu2 < Gu2) {
    Cu2 = Au2[Eu2];
    if (typeof Cu2 == Ag) {
      !(Bu2 === void 0) && Cu2 > Bu2 || (Cu2 = Bu2);
      Bu2 = Cu2;
    } else {
      if (Cu2) {
        if (!(Bu2 === void 0) && Bu2 > -1) {
          Hu2 = +Bu2 | 0;
          Bu2 = lh;
          Fu2 = 0;
          while (Fu2 < Hu2) {
            Bu2 = Bu2 + Rt;
            Fu2 = Fu2 + 1;
          }
          0 == Bu2.length && (Bu2 = Wi);
          Du2.push(Bu2);
        }
        Du2.push(Cu2);
        Bu2 = -1;
      }
    }
    Eu2 = Eu2 + 1;
  }
  return Du2.join(lh) + "";
};
var Nd = (Au2, Bu2) => {
  Bu2 == null && (Bu2 = {});
  var Cu2 = Bu2.whitespace;
  "string" == typeof Cu2 && Cu2.length > 0 || (Cu2 = Xk);
  Bu2 = [];
  if ("children" in Au2) {
    var Du2 = Au2.children;
    Array.isArray(Du2) && (Bu2 = Du2);
  }
  var Eu2 = uf(Au2);
  var Fu2 = Fd(Au2, { whitespace: Cu2, breakBefore: false, breakAfter: false });
  Cu2 = [];
  Du2 = z(Au2, wf);
  (Du2 == yf || "comment" == Du2) && (Cu2 = Cu2.concat(lf(Au2, { whitespace: Fu2, breakBefore: true, breakAfter: true })));
  var Gu2 = E(Bu2);
  Du2 = 0;
  while (Du2 < Gu2) {
    var Hu2 = void 0;
    0 == Du2 && (Hu2 = Eu2);
    var Iu2 = Du2 < (Gu2 - 1 | 0) ? Y(Bu2[Du2 + 1], "br") : Eu2;
    var Ju2 = Bu2[Du2];
    Cu2 = Cu2.concat(Gd(Ju2, Au2, { whitespace: Fu2, breakBefore: Hu2, breakAfter: Iu2 }));
    Du2 = Du2 + 1;
  }
  return gf(Cu2);
};
var Od = (Au2) => {
  var Bu2 = Au2[6];
  var Cu2;
  if (!(Bu2 === void 0) && !(Bu2 == null) && Bu2 !== lh) return Bu2;
  Bu2 = Au2[3];
  if (!(Bu2 === void 0) && !(Bu2 == null) && Bu2 !== lh) return Bu2;
  Bu2 = Au2[2];
  if (!(Bu2 === void 0) && !(Bu2 == null) && Bu2 !== lh) return "\\ ";
  return Wi;
};
var nf = (Au2, Bu2) => {
  Bu2 = new ca(Bu2);
  try {
    var Nu2 = zd(Au2, Bu2);
    return Vc(Nu2, Au2, Bu2);
  } catch (Ku2) {
    return Pd(Ku2, Au2, Bu2);
  }
};
var Pd = (Au2, Bu2, Cu2) => {
  var Du2;
  if (Cu2.throwOnError || !m(Au2, c)) throw Au2;
  Du2 = [];
  Du2.push(new v(Bu2));
  Bu2 = [];
  Bu2.push(hs);
  Bu2 = a.makeSpan(Bu2, Du2);
  Bu2.setAttribute(Pr, Au2.toString());
  Bu2.setAttribute(Af, "color:" + Cu2.errorColor);
  return Bu2;
};
var Qd = (Au2) => {
  Au2 = Au2.properties;
  var Bu2;
  if (Au2 == null || Au2 === void 0) return Ad;
  Au2 = Au2.className;
  if (Array.isArray(Au2)) return Au2;
  return Ad;
};
var jf = (Au2, Bu2, Cu2, Du2) => {
  Au2 = Object.assign({}, Au2);
  Object.assign(Au2, { displayMode: Bu2, throwOnError: Cu2 });
  Du2 === void 0 || (Au2.strict = Du2);
  return Au2;
};
var tf = (Au2) => {
  Au2 = Au2.errorColor;
  var Bu2;
  if ("string" == typeof Au2 && Au2.length > 0) return Au2;
  return "#cc0000";
};
var ef = (Au2) => {
  Au2 = Au2.name;
  if ("string" == typeof Au2) return Au2.toLowerCase();
  return Au2.toLowerCase();
};
var pf = (Au2, Bu2, Cu2) => {
  let Du2 = [];
  Du2.push(hs);
  Au2 = "color:" + tf(Au2);
  Bu2 = { className: Du2, style: Au2, title: Bu2 + "" };
  Au2 = [];
  Au2.push({ type: yf, value: Cu2 });
  return { type: jk, tagName: Qi, properties: Bu2, children: Au2 };
};
var Rd = (Au2, Bu2, Cu2, Du2, Eu2, Fu2) => {
  try {
    return nf(Bu2, jf(Au2, Cu2, true, void 0)).toMarkup() + "";
  } catch (Gu2) {
    var _u2 = kf(Eu2, Fu2);
    Eu2 = _u2;
    Fu2 = Fu2.position;
    var $u2 = { ancestors: Eu2, cause: Gu2, place: Fu2, ruleId: ef(Gu2), source: "rehype-katex" };
    Du2.message("Could not render math with KaTeX", $u2);
    try {
      return nf(Bu2, jf(Au2, Cu2, false, An)).toMarkup() + "";
    } catch {
      var av2 = [];
      Cu2 = av2;
      Array.prototype.push.call(Cu2, pf(Au2, Gu2, Bu2));
      return av2;
    }
  }
};
var Sd = (Au2, Bu2, Cu2, Du2) => {
  var Fu2 = Qd(Au2);
  var Eu2 = !!Fu2.includes("language-math");
  var Hu2 = !!Fu2.includes("math-display");
  var Gu2 = !!Fu2.includes("math-inline");
  if (!Eu2 && !Hu2 && !Gu2) return;
  Gu2 = E(Bu2);
  Fu2 = void 0;
  Gu2 > 0 && (Fu2 = Bu2[Gu2 - 1]);
  "code" == z(Au2, Th) && Eu2 && !(Fu2 === void 0) && !(Fu2 == null) && z(Fu2, wf) == jk && z(Fu2, Th) == Qn ? (Eu2 = Gu2 > 1 ? Bu2[Gu2 - 2] : void 0, Hu2 = true) : (Eu2 = Fu2, Fu2 = Au2);
  if (Eu2 === void 0 || Eu2 == null || !Eu2) return;
  Au2 = Rd(Cu2, Nd(Fu2, { whitespace: Qn }), Hu2, Du2, Bu2, Au2);
  typeof Au2 == mh && (Au2 = fromHtmlIsomorphic(Au2, { fragment: true }).children);
  Cu2 = Eu2.children;
  Du2 = Cu2.indexOf(Fu2);
  Bu2 = [];
  Bu2.push(Du2);
  Bu2.push(1);
  Eu2 = E(Au2);
  Du2 = 0;
  while (Du2 < Eu2) {
    Bu2.push(Au2[Du2]);
    Du2 = Du2 + 1;
  }
  Cu2.splice.apply(Cu2, Bu2);
  return "skip";
};
var bf = (Bu2) => {
  if ((Au2 = Bu2, Bu2 == null) || Bu2 === void 0) {
    var Au2 = {};
  }
  return (Bu3, Cu2) => {
    Cd(Bu3, [], jk, (Gu2, Du2) => Sd(Gu2, Du2, Au2, Cu2));
  };
};
function Td(Bu2, Cu2) {
  let Du2, Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!Cu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      if (!!Bu2) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 2:
      if (!Bu2) {
        Au2 = 7;
      } else {
        Au2 = 6;
      }
      continue;
    case 3:
      Bu2 = Bu2.loc;
      Au2 = 5;
      continue;
    case 4:
      Au2 = 5;
      continue;
    case 5:
      return Bu2;
    case 6:
      Du2 = !Bu2.loc;
      Au2 = 8;
      continue;
    case 7:
      Du2 = true;
      Au2 = 8;
      continue;
    case 8:
      if (Du2) {
        Au2 = 10;
      } else {
        Au2 = 9;
      }
      continue;
    case 9:
      Du2 = !Cu2.loc;
      Au2 = 11;
      continue;
    case 10:
      Du2 = true;
      Au2 = 11;
      continue;
    case 11:
      if (Du2) {
        Au2 = 13;
      } else {
        Au2 = 12;
      }
      continue;
    case 12:
      Du2 = Bu2.loc;
      Du2 = Du2.lexer;
      Du2 = Du2 !== Cu2.loc.lexer;
      Au2 = 14;
      continue;
    case 13:
      Du2 = true;
      Au2 = 14;
      continue;
    case 14:
      if (Du2) {
        Au2 = 15;
      } else {
        Au2 = 16;
      }
      continue;
    case 15:
      return null;
    case 16:
      Du2 = A;
      Eu2 = Bu2.loc;
      Eu2 = Eu2.lexer;
      Bu2 = Bu2.loc;
      Bu2 = Bu2.start;
      Cu2 = Cu2.loc;
      return new Du2(Eu2, Bu2, Cu2.end);
  }
}
function Ud(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.type;
      if (Cu2 === Xf) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = Bu2.body;
      Cu2 = Cu2.length;
      if (1 === Cu2) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 2:
      Cu2 = Bu2.type;
      if (Cu2 === Lg) {
        Au2 = 5;
      } else {
        Au2 = 6;
      }
      continue;
    case 3:
      Cu2 = Z;
      return Cu2(Bu2.body[0]);
    case 4:
      return Bu2;
    case 5:
      Cu2 = Bu2.body;
      Cu2 = Cu2.length;
      if (1 === Cu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 6:
      Cu2 = Bu2.type;
      if (Cu2 === Gg) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 7:
      Cu2 = Z;
      return Cu2(Bu2.body[0]);
    case 8:
      return Bu2;
    case 9:
      return Z(Bu2.body);
    case 10:
      return Bu2;
  }
}
function Vd(Bu2, Cu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if ("\u239C" === Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return "M291 0 H417 V" + Cu2 + " H291z M291 0 H417 V" + Cu2 + " H291z";
    case 2:
      if ("\u2223" === Bu2) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      return Lq + Cu2 + Hn + Cu2 + " H145z";
    case 4:
      if ("\u2225" === Bu2) {
        Au2 = 5;
      } else {
        Au2 = 6;
      }
      continue;
    case 5:
      Bu2 = Lq + Cu2 + Hn + Cu2 + " H145z";
      return Bu2 + ("M367 0 H410 V" + Cu2 + " H367z M367 0 H410 V" + Cu2 + " H367z");
    case 6:
      if ("\u239F" === Bu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      return "M457 0 H583 V" + Cu2 + " H457z M457 0 H583 V" + Cu2 + " H457z";
    case 8:
      if (Bu2 === yr) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      return "M319 0 H403 V" + Cu2 + " H319z M319 0 H403 V" + Cu2 + " H319z";
    case 10:
      if (Bu2 === zr) {
        Au2 = 11;
      } else {
        Au2 = 12;
      }
      continue;
    case 11:
      return "M263 0 H347 V" + Cu2 + " H263z M263 0 H347 V" + Cu2 + " H263z";
    case 12:
      if (Bu2 === Om) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 13:
      return "M384 0 H504 V" + Cu2 + " H384z M384 0 H504 V" + Cu2 + " H384z";
    case 14:
      if (Bu2 === Ar) {
        Au2 = 15;
      } else {
        Au2 = 16;
      }
      continue;
    case 15:
      return "M312 0 H355 V" + Cu2 + " H312z M312 0 H355 V" + Cu2 + " H312z";
    case 16:
      if (Bu2 === xr) {
        Au2 = 17;
      } else {
        Au2 = 18;
      }
      continue;
    case 17:
      Bu2 = "M257 0 H300 V" + Cu2 + " H257z M257 0 H300 V" + Cu2 + " H257z";
      return Bu2 + ("M478 0 H521 V" + Cu2 + " H478z M478 0 H521 V" + Cu2 + " H478z");
    case 18:
      return lh;
  }
}
function Wd(Bu2, Cu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if ("lbrack" === Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return bl + Cu2 + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + Cu2 + Qr;
    case 2:
      if ("rbrack" === Bu2) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      return nl + Cu2 + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + Cu2 + Qr;
    case 4:
      if ("vert" === Bu2) {
        Au2 = 5;
      } else {
        Au2 = 6;
      }
      continue;
    case 5:
      Bu2 = jq + Cu2 + qi;
      return Bu2 + 0 - +Cu2 + "" + Ch + Cu2 + qs;
    case 6:
      if (Bu2 === Ps) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Bu2 = jq + Cu2;
      Bu2 = Bu2 + qi;
      Bu2 = Bu2 + 0 - +Cu2 + "" + Ch + Cu2 + " v585 h43z\nM367 15 v585 v" + Cu2 + qi;
      return Bu2 + 0 - +Cu2 + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + Cu2 + qs;
    case 8:
      if ("lfloor" === Bu2) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      return nn + Cu2 + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + Cu2 + $q;
    case 10:
      if ("rfloor" === Bu2) {
        Au2 = 11;
      } else {
        Au2 = 12;
      }
      continue;
    case 11:
      return nn + Cu2 + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + Cu2 + $q;
    case 12:
      if ("lceil" === Bu2) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 13:
      return bl + Cu2 + " v602 h84z\nM403 1759 V0 H319 V1759 v" + Cu2 + rs;
    case 14:
      if ("rceil" === Bu2) {
        Au2 = 15;
      } else {
        Au2 = 16;
      }
      continue;
    case 15:
      return nl + Cu2 + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + Cu2 + rs;
    case 16:
      if ("lparen" === Bu2) {
        Au2 = 17;
      } else {
        Au2 = 18;
      }
      continue;
    case 17:
      Bu2 = "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (Cu2 + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-";
      return Bu2 + Cu2 + 92 + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
    case 18:
      if ("rparen" === Bu2) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 19:
      Bu2 = "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (Cu2 + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-";
      return Bu2 + Cu2 + 144 + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
    case 20:
      throw t("Unknown stretchy delimiter.");
  }
}
function Xd(Bu2, Cu2) {
  let Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (Bu2.style === Cu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2;
    case 2:
      Du2 = {};
      Object.assign(Du2, { style: Cu2, size: fb(Bu2.textSize, Cu2) });
      return Bu2.extend(Du2);
  }
}
function Yd(Bu2, Cu2) {
  let Du2, Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (Bu2.size === Cu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Du2 = Bu2.textSize === Cu2;
      Au2 = 3;
      continue;
    case 2:
      Du2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Du2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      return Bu2;
    case 5:
      Du2 = {};
      Eu2 = Bu2.style;
      Object.assign(Du2, { style: Eu2.text(), size: Cu2, textSize: Cu2 });
      Eu2 = eb;
      Cu2 = +Cu2;
      Du2.sizeMultiplier = Eu2[Cu2 - 1];
      return Bu2.extend(Du2);
  }
}
function Zd(Bu2, Cu2) {
  let Eu2, Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!Cu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = Bu2.style;
      Cu2 = Cu2.text();
      Au2 = 3;
      continue;
    case 2:
      Au2 = 3;
      continue;
    case 3:
      Eu2 = fb(p.BASESIZE, Cu2);
      if (Bu2.size === Eu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Du2 = Bu2.textSize;
      Du2 = Du2 === p.BASESIZE;
      Au2 = 6;
      continue;
    case 5:
      Du2 = false;
      Au2 = 6;
      continue;
    case 6:
      if (Du2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Du2 = Bu2.style === Cu2;
      Au2 = 9;
      continue;
    case 8:
      Du2 = false;
      Au2 = 9;
      continue;
    case 9:
      if (Du2) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 10:
      return Bu2;
    case 11:
      Du2 = {};
      Object.assign(Du2, { style: Cu2, size: Eu2 });
      return Bu2.extend(Du2);
  }
}
function _d(Bu2, Cu2) {
  let Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = Cu2.size;
      if (Du2 !== Bu2.size) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Du2 = [];
      Du2.push(_k);
      Du2.push(ll + Cu2.size);
      Du2.push(Of + Bu2.size);
      return Du2;
    case 2:
      return [];
  }
}
function $d(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.size;
      if (Cu2 !== p.BASESIZE) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = [];
      Cu2.push(_k);
      Cu2.push(ll + Bu2.size);
      Cu2.push(Of + p.BASESIZE);
      return Cu2;
    case 2:
      return [];
  }
}
function ae(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!!Bu2.phantom) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return "transparent";
    case 2:
      return Bu2.color;
  }
}
function be(Bu2) {
  let Fu2, Cu2, Du2, Gu2, Hu2, Eu2, Iu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Fu2 = C().createTextNode(Bu2.text);
      Cu2 = null;
      Du2 = Bu2.italic;
      if (Du2 > 0) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = C().createElement(Qi);
      Du2 = Cu2.style;
      Du2.marginRight = d(Bu2.italic);
      Au2 = 3;
      continue;
    case 2:
      Au2 = 3;
      continue;
    case 3:
      Du2 = Bu2.classes;
      Du2 = Du2.length;
      if (Du2 > 0) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      if (!Cu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 5:
      Au2 = 6;
      continue;
    case 6:
      Gu2 = u(Bu2.style);
      Iu2 = Gu2.length | 0;
      Eu2 = 0;
      Au2 = 10;
      continue;
    case 7:
      Cu2 = C().createElement(Qi);
      Au2 = 9;
      continue;
    case 8:
      Au2 = 9;
      continue;
    case 9:
      Cu2.className = O(Bu2.classes);
      Au2 = 6;
      continue;
    case 10:
      if (Eu2 < Iu2) {
        Au2 = 11;
      } else {
        Au2 = 12;
      }
      continue;
    case 11:
      Du2 = Gu2[Eu2];
      if (l(Bu2.style, Du2)) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 12:
      if (!!Cu2) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 13:
      if (!Cu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 14:
      Au2 = 15;
      continue;
    case 15:
      Eu2 = Eu2 + 1;
      Au2 = 10;
      continue;
    case 16:
      Cu2 = C().createElement(Qi);
      Au2 = 18;
      continue;
    case 17:
      Au2 = 18;
      continue;
    case 18:
      Hu2 = Cu2.style;
      Hu2[Du2] = Bu2.style[Du2];
      Au2 = 15;
      continue;
    case 19:
      Cu2.appendChild(Fu2);
      return Cu2;
    case 20:
      return Fu2;
  }
}
function ce(Bu2) {
  let Cu2, Du2, Gu2, Eu2, Iu2, Hu2, Fu2, Ju2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.classes;
      if (!!Cu2.length) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = "<span" + pt;
      Du2 = i;
      Du2 = Cu2 + Du2.escape(O(Bu2.classes)) + pj;
      Hu2 = true;
      Au2 = 3;
      continue;
    case 2:
      Hu2 = false;
      Du2 = "<span";
      Au2 = 3;
      continue;
    case 3:
      Cu2 = Bu2.italic;
      if (Cu2 > 0) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Cu2 = lh + ("margin-right:" + Bu2.italic + "em;");
      Au2 = 6;
      continue;
    case 5:
      Cu2 = lh;
      Au2 = 6;
      continue;
    case 6:
      Gu2 = u(Bu2.style);
      Ju2 = Gu2.length | 0;
      Fu2 = 0;
      Au2 = 7;
      continue;
    case 7:
      if (Fu2 < Ju2) {
        Au2 = 8;
      } else {
        Au2 = 9;
      }
      continue;
    case 8:
      Eu2 = Gu2[Fu2];
      if (l(Bu2.style, Eu2)) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 9:
      if (!!Cu2) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 10:
      Iu2 = i.hyphenate(Eu2) + op;
      Cu2 = Cu2 + (Iu2 + Bu2.style[Eu2] + ";");
      Au2 = 12;
      continue;
    case 11:
      Au2 = 12;
      continue;
    case 12:
      Fu2 = Fu2 + 1;
      Au2 = 7;
      continue;
    case 13:
      Du2 = Du2 + (Yn + i.escape(Cu2) + pj);
      Hu2 = true;
      Au2 = 15;
      continue;
    case 14:
      Au2 = 15;
      continue;
    case 15:
      Bu2 = i.escape(Bu2.text);
      if (!!Hu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 16:
      return Du2 + no + Bu2 + "</span>";
    case 17:
      return Bu2;
  }
}
function de(Bu2) {
  let Cu2, Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!!Bu2.alternate) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return us + i.escape(Bu2.alternate) + ht;
    case 2:
      Cu2 = i;
      Du2 = cb;
      return us + Cu2.escape(Du2[Bu2.pathName]) + ht;
  }
}
function ee(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (m(Bu2, v)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2;
    case 2:
      throw t("Expected symbolNode but got " + Bu2 + Bk);
  }
}
function fe(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (m(Bu2, P)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2;
    case 2:
      throw t("Expected span<HtmlDomNode> but got " + Bu2 + Bk);
  }
}
function ge(Bu2, Cu2) {
  let Du2, Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = Bu2.charCodeAt(0);
      Eu2 = Bu2.charCodeAt(1);
      Du2 = +Du2;
      Du2 = +(Du2 - 55296);
      Du2 = Du2 * 1024;
      Eu2 = +Eu2;
      Du2 = Du2 + (Eu2 - 56320) + 65536;
      if (Cu2 === tg) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = 0;
      Au2 = 3;
      continue;
    case 2:
      Cu2 = 1;
      Au2 = 3;
      continue;
    case 3:
      if (119808 <= Du2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Eu2 = Du2 < 120484;
      Au2 = 6;
      continue;
    case 5:
      Eu2 = false;
      Au2 = 6;
      continue;
    case 6:
      if (Eu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Bu2 = Math;
      Du2 = +Du2;
      Du2 = +(Du2 - 119808);
      Du2 = Bu2.floor(Du2 / 26);
      Bu2 = [];
      Bu2.push(ha[Du2][2]);
      Bu2.push(ha[Du2][Cu2]);
      return Bu2;
    case 8:
      if (zu <= Du2) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      Eu2 = Du2 <= 120831;
      Au2 = 11;
      continue;
    case 10:
      Eu2 = false;
      Au2 = 11;
      continue;
    case 11:
      if (Eu2) {
        Au2 = 12;
      } else {
        Au2 = 13;
      }
      continue;
    case 12:
      Bu2 = Math;
      Du2 = +Du2;
      Du2 = +(Du2 - +zu);
      Du2 = Bu2.floor(Du2 / 10);
      Bu2 = [];
      Bu2.push(mb[Du2][2]);
      Bu2.push(mb[Du2][Cu2]);
      return Bu2;
    case 13:
      if (120485 === Du2) {
        Au2 = 15;
      } else {
        Au2 = 14;
      }
      continue;
    case 14:
      Eu2 = 120486 === Du2;
      Au2 = 16;
      continue;
    case 15:
      Eu2 = true;
      Au2 = 16;
      continue;
    case 16:
      if (Eu2) {
        Au2 = 17;
      } else {
        Au2 = 18;
      }
      continue;
    case 17:
      Bu2 = [];
      Bu2.push(ha[0][2]);
      Bu2.push(ha[0][Cu2]);
      return Bu2;
    case 18:
      if (120486 < Du2) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 19:
      Cu2 = Du2 < zu;
      Au2 = 21;
      continue;
    case 20:
      Cu2 = false;
      Au2 = 21;
      continue;
    case 21:
      if (Cu2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 22:
      Bu2 = [];
      Bu2.push(lh);
      Bu2.push(lh);
      return Bu2;
    case 23:
      throw new c("Unsupported character: " + Bu2);
  }
}
function he(Bu2, Cu2, Du2, Eu2) {
  let Fu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (Eu2 === void 0) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Eu2 = [];
      Au2 = 3;
      continue;
    case 2:
      Au2 = 3;
      continue;
    case 3:
      Fu2 = Du2.font;
      if (Fu2 === Ri) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Fu2 = !!ia(Bu2, Kl, Cu2).metrics;
      Au2 = 6;
      continue;
    case 5:
      Fu2 = false;
      Au2 = 6;
      continue;
    case 6:
      if (Fu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Fu2 = [];
      Fu2.push(Bn);
      return F(Bu2, Kl, Cu2, Du2, Eu2.concat(Fu2));
    case 8:
      if (Bu2 === Lm) {
        Au2 = 10;
      } else {
        Au2 = 9;
      }
      continue;
    case 9:
      Fu2 = o[Cu2][Bu2];
      Fu2 = Fu2.font;
      Fu2 = Fu2 === eq;
      Au2 = 11;
      continue;
    case 10:
      Fu2 = true;
      Au2 = 11;
      continue;
    case 11:
      if (Fu2) {
        Au2 = 12;
      } else {
        Au2 = 13;
      }
      continue;
    case 12:
      return F(Bu2, vk, Cu2, Du2, Eu2);
    case 13:
      Fu2 = [];
      Fu2.push(Hr);
      return F(Bu2, Sr, Cu2, Du2, Eu2.concat(Fu2));
  }
}
function ie(Bu2, Cu2, Du2, Eu2, Fu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (Fu2 !== bg) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = !!ia(Bu2, Mp, Cu2).metrics;
      Au2 = 3;
      continue;
    case 2:
      Bu2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Bu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Bu2 = {};
      Object.assign(Bu2, { fontName: Mp, fontClass: Ri });
      return Bu2;
    case 5:
      Bu2 = {};
      Object.assign(Bu2, { fontName: Kl, fontClass: Bn });
      return Bu2;
  }
}
function je(Bu2, Cu2, Du2) {
  let Eu2, Fu2, Hu2, Ju2, Iu2, Ku2, Gu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Eu2 = Bu2.mode;
      Bu2 = Bu2.text;
      Gu2 = [];
      Gu2.push(wg);
      Fu2 = Eu2 === tg;
      if (!Fu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Fu2 = Eu2 === yf;
      if (!!Fu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 2:
      Au2 = 3;
      continue;
    case 3:
      if (!!Fu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 4:
      Fu2 = Cu2.font;
      Au2 = 6;
      continue;
    case 5:
      Au2 = 6;
      continue;
    case 6:
      Au2 = 3;
      continue;
    case 7:
      Hu2 = Cu2.font;
      Au2 = 9;
      continue;
    case 8:
      Hu2 = Cu2.fontFamily;
      Au2 = 9;
      continue;
    case 9:
      if (Bu2.charCodeAt(0) === xu) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 10:
      Ju2 = Jc(Bu2, Eu2);
      Iu2 = Ju2[0];
      Ju2 = Ju2[1];
      Au2 = 12;
      continue;
    case 11:
      Iu2 = lh;
      Ju2 = lh;
      Au2 = 12;
      continue;
    case 12:
      Ku2 = Iu2.length;
      if (Ku2 > 0) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 13:
      return F(Bu2, Iu2, Eu2, Cu2, Gu2.concat(Ju2));
    case 14:
      if (!!Hu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 15:
      if (Du2 === lk) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 16:
      if (Hu2 === Ri) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 17:
      Au2 = 18;
      continue;
    case 18:
      Au2 = 15;
      continue;
    case 19:
      Hu2 = Kc(Bu2, Eu2, Cu2, Gu2, Du2);
      Iu2 = Hu2.fontName;
      Fu2 = [];
      Fu2.push(Hu2.fontClass);
      Au2 = 21;
      continue;
    case 20:
      if (!!Fu2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 21:
      if (!!ia(Bu2, Iu2, Eu2).metrics) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 22:
      Fu2 = pb[Hu2];
      Iu2 = Fu2.fontName;
      Fu2 = [];
      Fu2.push(Hu2);
      Au2 = 24;
      continue;
    case 23:
      Iu2 = ja(Hu2, Cu2.fontWeight, Cu2.fontShape);
      Fu2 = [];
      Fu2.push(Hu2);
      Fu2.push(Cu2.fontWeight);
      Fu2.push(Cu2.fontShape);
      Au2 = 24;
      continue;
    case 24:
      Au2 = 21;
      continue;
    case 25:
      return F(Bu2, Iu2, Eu2, Cu2, Gu2.concat(Fu2));
    case 26:
      if (l(lb, Bu2)) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 27:
      Au2 = 18;
      continue;
    case 28:
      Hu2 = Iu2.slice(0, 10) === ws;
      Au2 = 30;
      continue;
    case 29:
      Hu2 = false;
      Au2 = 30;
      continue;
    case 30:
      if (Hu2) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 31:
      Hu2 = [];
      Du2 = 0;
      Au2 = 34;
      continue;
    case 32:
      Au2 = 33;
      continue;
    case 33:
      Au2 = 27;
      continue;
    case 34:
      if (Du2 < Bu2.length) {
        Au2 = 35;
      } else {
        Au2 = 36;
      }
      continue;
    case 35:
      Hu2.push(F(Bu2[Du2], Iu2, Eu2, Cu2, Gu2.concat(Fu2)));
      Du2 = Du2 + 1;
      Au2 = 34;
      continue;
    case 36:
      return ob(Hu2);
    case 37:
      Du2 = [];
      Du2.push(un);
      return F(Bu2, Tr, Eu2, Cu2, Gu2.concat(Du2));
    case 38:
      if (Du2 === bg) {
        Au2 = 39;
      } else {
        Au2 = 40;
      }
      continue;
    case 39:
      Du2 = o[Eu2][Bu2];
      if (!!Du2) {
        Au2 = 41;
      } else {
        Au2 = 42;
      }
      continue;
    case 40:
      throw t("unexpected type: " + Du2 + " in makeOrd");
    case 41:
      Du2 = o[Eu2][Bu2];
      Du2 = Du2.font;
      Au2 = 43;
      continue;
    case 42:
      Au2 = 43;
      continue;
    case 43:
      if ("ams" === Du2) {
        Au2 = 44;
      } else {
        Au2 = 45;
      }
      continue;
    case 44:
      Du2 = ja(Hr, Cu2.fontWeight, Cu2.fontShape);
      Fu2 = F;
      return Fu2(Bu2, Du2, Eu2, Cu2, Gu2.concat(Hr, Cu2.fontWeight, Cu2.fontShape));
    case 45:
      if (Du2 === eq) {
        Au2 = 47;
      } else {
        Au2 = 46;
      }
      continue;
    case 46:
      Fu2 = !Du2;
      Au2 = 48;
      continue;
    case 47:
      Fu2 = true;
      Au2 = 48;
      continue;
    case 48:
      if (Fu2) {
        Au2 = 49;
      } else {
        Au2 = 50;
      }
      continue;
    case 49:
      Du2 = ja(Jq, Cu2.fontWeight, Cu2.fontShape);
      Fu2 = F;
      return Fu2(Bu2, Du2, Eu2, Cu2, Gu2.concat(Cu2.fontWeight, Cu2.fontShape));
    case 50:
      Du2 = ja(Du2, Cu2.fontWeight, Cu2.fontShape);
      Fu2 = F;
      return Fu2(Bu2, Du2, Eu2, Cu2, Gu2.concat(Du2, Cu2.fontWeight, Cu2.fontShape));
  }
}
function ke(Bu2, Cu2, Du2) {
  let Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return L();
    case 2:
      Au2 = 3;
      continue;
    case 3:
      Eu2 = _;
      if (!!Eu2[Bu2.type]) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Eu2 = _;
      Eu2 = Eu2[Bu2.type].call(_, Bu2, Cu2);
      if (!!Du2) {
        Au2 = 6;
      } else {
        Au2 = 7;
      }
      continue;
    case 5:
      Cu2 = c;
      throw new Cu2(Xl + Bu2.type + Cj);
    case 6:
      Bu2 = Cu2.size;
      Bu2 = Bu2 !== Du2.size;
      Au2 = 8;
      continue;
    case 7:
      Bu2 = false;
      Au2 = 8;
      continue;
    case 8:
      if (Bu2) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      Bu2 = [];
      Bu2.push(Eu2);
      Eu2 = L(Cu2.sizingClasses(Du2), Bu2, Cu2);
      Bu2 = +Cu2.sizeMultiplier;
      Bu2 = Bu2 / +Du2.sizeMultiplier;
      Object.assign(Eu2, { height: +Eu2.height * +Bu2, depth: +Eu2.depth * +Bu2 });
      Au2 = 11;
      continue;
    case 10:
      Au2 = 11;
      continue;
    case 11:
      return Eu2;
  }
}
function le(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!!Bu2.character) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return C().createTextNode(Bu2.character);
    case 2:
      Cu2 = C().createElementNS(_h, Mh);
      Cu2.setAttribute(Zf, d(Bu2.width));
      return Cu2;
  }
}
function me(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!!Bu2.character) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return "<mtext>" + Bu2.character + "</mtext>";
    case 2:
      return '<mspace width="' + d(Bu2.width) + ht;
  }
}
function ne(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!!Bu2.character) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2.character;
    case 2:
      return Wi;
  }
}
function oe(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.length;
      if (1 === Cu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2[0];
    case 2:
      return new b.MathNode(Fj, Bu2);
  }
}
function pe(Bu2, Cu2) {
  let Du2, Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = Cu2.fontFamily;
      if (Du2 === Gn) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Ql;
    case 2:
      Du2 = Cu2.fontFamily;
      if (Du2 === Kq) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 3:
      Cu2 = Cu2.font;
      if (!Cu2) {
        Au2 = 29;
      } else {
        Au2 = 28;
      }
      continue;
    case 4:
      Bu2 = Cu2.fontShape;
      if (Bu2 === nj) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 5:
      Du2 = Cu2.fontShape;
      if (Du2 === nj) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 6:
      Au2 = 3;
      continue;
    case 7:
      Bu2 = Cu2.fontWeight;
      Bu2 = Bu2 === $k;
      Au2 = 9;
      continue;
    case 8:
      Bu2 = false;
      Au2 = 9;
      continue;
    case 9:
      if (Bu2) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 10:
      return "sans-serif-bold-italic";
    case 11:
      Bu2 = Cu2.fontShape;
      if (Bu2 === nj) {
        Au2 = 12;
      } else {
        Au2 = 13;
      }
      continue;
    case 12:
      return Tk;
    case 13:
      Bu2 = Cu2.fontWeight;
      if (Bu2 === $k) {
        Au2 = 14;
      } else {
        Au2 = 15;
      }
      continue;
    case 14:
      return "bold-sans-serif";
    case 15:
      return wn;
    case 16:
      Du2 = Cu2.fontWeight;
      Du2 = Du2 === $k;
      Au2 = 18;
      continue;
    case 17:
      Du2 = false;
      Au2 = 18;
      continue;
    case 18:
      if (Du2) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 19:
      return gn;
    case 20:
      Du2 = Cu2.fontShape;
      if (Du2 === nj) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 21:
      Au2 = 6;
      continue;
    case 22:
      return Rg;
    case 23:
      Du2 = Cu2.fontWeight;
      if (Du2 === $k) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 24:
      Au2 = 21;
      continue;
    case 25:
      return dq;
    case 26:
      Au2 = 27;
      continue;
    case 27:
      Au2 = 24;
      continue;
    case 28:
      Du2 = Cu2 === un;
      Au2 = 30;
      continue;
    case 29:
      Du2 = true;
      Au2 = 30;
      continue;
    case 30:
      if (Du2) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 31:
      return null;
    case 32:
      Au2 = 33;
      continue;
    case 33:
      Du2 = Bu2.mode;
      if (Cu2 === Fq) {
        Au2 = 34;
      } else {
        Au2 = 35;
      }
      continue;
    case 34:
      return Rg;
    case 35:
      if (Cu2 === Ri) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 36:
      Bu2 = Bu2.text;
      Eu2 = [];
      Eu2.push("\\imath");
      Eu2.push("\\jmath");
      if (!!i.contains(Eu2, Bu2)) {
        Au2 = 67;
      } else {
        Au2 = 68;
      }
      continue;
    case 37:
      Bu2 = Bu2.type;
      if (Bu2 === bg) {
        Au2 = 40;
      } else {
        Au2 = 41;
      }
      continue;
    case 38:
      if (Cu2 === Bn) {
        Au2 = 43;
      } else {
        Au2 = 44;
      }
      continue;
    case 39:
      Au2 = 36;
      continue;
    case 40:
      Bu2 = dq;
      Au2 = 42;
      continue;
    case 41:
      Bu2 = gn;
      Au2 = 42;
      continue;
    case 42:
      return Bu2;
    case 43:
      return dq;
    case 44:
      if ("mathbb" === Cu2) {
        Au2 = 46;
      } else {
        Au2 = 47;
      }
      continue;
    case 45:
      Au2 = 39;
      continue;
    case 46:
      return Uq;
    case 47:
      if (Cu2 === mu) {
        Au2 = 49;
      } else {
        Au2 = 50;
      }
      continue;
    case 48:
      Au2 = 45;
      continue;
    case 49:
      return Tk;
    case 50:
      if (Cu2 === lu) {
        Au2 = 52;
      } else {
        Au2 = 53;
      }
      continue;
    case 51:
      Au2 = 48;
      continue;
    case 52:
      return "fraktur";
    case 53:
      if ("mathscr" === Cu2) {
        Au2 = 56;
      } else {
        Au2 = 55;
      }
      continue;
    case 54:
      Au2 = 51;
      continue;
    case 55:
      Eu2 = "mathcal" === Cu2;
      Au2 = 57;
      continue;
    case 56:
      Eu2 = true;
      Au2 = 57;
      continue;
    case 57:
      if (Eu2) {
        Au2 = 58;
      } else {
        Au2 = 59;
      }
      continue;
    case 58:
      return Gi;
    case 59:
      if ("mathsf" === Cu2) {
        Au2 = 61;
      } else {
        Au2 = 62;
      }
      continue;
    case 60:
      Au2 = 54;
      continue;
    case 61:
      return wn;
    case 62:
      if ("mathtt" === Cu2) {
        Au2 = 64;
      } else {
        Au2 = 65;
      }
      continue;
    case 63:
      Au2 = 60;
      continue;
    case 64:
      return Ql;
    case 65:
      Au2 = 66;
      continue;
    case 66:
      Au2 = 63;
      continue;
    case 67:
      return null;
    case 68:
      Au2 = 69;
      continue;
    case 69:
      if (!!o[Du2][Bu2]) {
        Au2 = 70;
      } else {
        Au2 = 71;
      }
      continue;
    case 70:
      Eu2 = o[Du2][Bu2];
      Eu2 = !!Eu2.replace;
      Au2 = 72;
      continue;
    case 71:
      Eu2 = false;
      Au2 = 72;
      continue;
    case 72:
      if (Eu2) {
        Au2 = 73;
      } else {
        Au2 = 74;
      }
      continue;
    case 73:
      Bu2 = o[Du2][Bu2];
      Bu2 = Bu2.replace;
      Au2 = 75;
      continue;
    case 74:
      Au2 = 75;
      continue;
    case 75:
      Eu2 = a.fontMap[Cu2];
      Eu2 = Eu2.fontName;
      if (!!Aa(Bu2, Eu2, Du2)) {
        Au2 = 76;
      } else {
        Au2 = 77;
      }
      continue;
    case 76:
      Bu2 = a.fontMap[Cu2];
      return Bu2.variant;
    case 77:
      Au2 = 78;
      continue;
    case 78:
      return null;
  }
}
function qe(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return false;
    case 2:
      Au2 = 3;
      continue;
    case 3:
      Cu2 = Bu2.type;
      if (Cu2 === Dl) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Cu2 = Bu2.children;
      Cu2 = Cu2.length;
      Cu2 = 1 === Cu2;
      Au2 = 6;
      continue;
    case 5:
      Cu2 = false;
      Au2 = 6;
      continue;
    case 6:
      if (Cu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Cu2 = Bu2.children[0];
      Bu2 = m(Cu2, B);
      if (!!Bu2) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 8:
      Cu2 = Bu2.type;
      if (Cu2 === ki) {
        Au2 = 12;
      } else {
        Au2 = 13;
      }
      continue;
    case 9:
      Bu2 = Cu2.text;
      Bu2 = Bu2 === Bk;
      Au2 = 11;
      continue;
    case 10:
      Au2 = 11;
      continue;
    case 11:
      return Bu2;
    case 12:
      Cu2 = Bu2.children;
      Cu2 = Cu2.length;
      Cu2 = 1 === Cu2;
      Au2 = 14;
      continue;
    case 13:
      Cu2 = false;
      Au2 = 14;
      continue;
    case 14:
      if (Cu2) {
        Au2 = 15;
      } else {
        Au2 = 16;
      }
      continue;
    case 15:
      Cu2 = Bu2.getAttribute(Jg) === Dh;
      Au2 = 17;
      continue;
    case 16:
      Cu2 = false;
      Au2 = 17;
      continue;
    case 17:
      if (Cu2) {
        Au2 = 18;
      } else {
        Au2 = 19;
      }
      continue;
    case 18:
      Cu2 = Bu2.getAttribute(Xh) === Mn;
      Au2 = 20;
      continue;
    case 19:
      Cu2 = false;
      Au2 = 20;
      continue;
    case 20:
      if (Cu2) {
        Au2 = 21;
      } else {
        Au2 = 22;
      }
      continue;
    case 21:
      Cu2 = Bu2.getAttribute(Zk) === Mn;
      Au2 = 23;
      continue;
    case 22:
      Cu2 = false;
      Au2 = 23;
      continue;
    case 23:
      if (Cu2) {
        Au2 = 24;
      } else {
        Au2 = 25;
      }
      continue;
    case 24:
      Cu2 = Bu2.children[0];
      Bu2 = m(Cu2, B);
      if (!!Bu2) {
        Au2 = 26;
      } else {
        Au2 = 27;
      }
      continue;
    case 25:
      return false;
    case 26:
      Bu2 = Cu2.text;
      Bu2 = Bu2 === at;
      Au2 = 28;
      continue;
    case 27:
      Au2 = 28;
      continue;
    case 28:
      return Bu2;
  }
}
function re(Bu2, Cu2) {
  let Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (!Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return new b.MathNode(Fj);
    case 2:
      Au2 = 3;
      continue;
    case 3:
      Du2 = $2;
      if (!!Du2[Bu2.type]) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Du2 = $2;
      return Du2[Bu2.type].call($2, Bu2, Cu2);
    case 5:
      Cu2 = c;
      throw new Cu2(Xl + Bu2.type + Cj);
  }
}
function se(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.type;
      if (Cu2 === Xf) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = Bu2.body;
      return Bu2.length;
    case 2:
      return 1;
  }
}
function te(Bu2, Cu2) {
  let Du2, Eu2, Gu2, Hu2, Fu2, Iu2, Ju2, Ku2, Nu2, Mu2, Lu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = Bu2.label.slice(1);
      Eu2 = [];
      Eu2.push(_m);
      Eu2.push(Rl);
      Eu2.push(Pt);
      Eu2.push("utilde");
      if (!!i.contains(Eu2, Du2)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = Yc(Bu2.base);
      if (Bu2 > 5) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 2:
      Lu2 = [];
      Bu2 = Xc[Du2];
      Iu2 = Bu2[0];
      Ju2 = Bu2[1];
      Ku2 = Bu2[2];
      Du2 = +Ku2;
      Hu2 = Du2 / +yu;
      Eu2 = Iu2.length;
      if (1 === Eu2) {
        Au2 = 18;
      } else {
        Au2 = 19;
      }
      continue;
    case 3:
      if (Du2 === _m) {
        Au2 = 7;
      } else {
        Au2 = 6;
      }
      continue;
    case 4:
      Eu2 = [];
      Eu2.push(1);
      Eu2.push(1);
      Eu2.push(2);
      Eu2.push(2);
      Eu2.push(3);
      Eu2.push(3);
      Eu2 = Eu2[Bu2];
      if (Du2 === _m) {
        Au2 = 13;
      } else {
        Au2 = 12;
      }
      continue;
    case 5:
      Bu2 = new K(Bu2);
      Du2 = [];
      Du2.push(Bu2);
      Bu2 = {};
      Object.assign(Bu2, { width: Un, height: d(Fu2), viewBox: Tn + Gu2 + Wi + Hu2 + "", preserveAspectRatio: "none" });
      Eu2 = new I(Du2, Bu2);
      Bu2 = {};
      Du2 = [];
      Du2.push(Eu2);
      Object.assign(Bu2, { span: a.makeSvgSpan([], Du2, Cu2), minWidth: 0, height: Fu2 });
      return Bu2;
    case 6:
      Bu2 = Du2 === Rl;
      Au2 = 8;
      continue;
    case 7:
      Bu2 = true;
      Au2 = 8;
      continue;
    case 8:
      if (Bu2) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      Bu2 = Du2 + "4";
      Gu2 = 2364;
      Hu2 = 420;
      Fu2 = 0.42;
      Au2 = 11;
      continue;
    case 10:
      Gu2 = 2340;
      Hu2 = 312;
      Bu2 = "tilde4";
      Fu2 = 0.34;
      Au2 = 11;
      continue;
    case 11:
      Au2 = 5;
      continue;
    case 12:
      Bu2 = Du2 === Rl;
      Au2 = 14;
      continue;
    case 13:
      Bu2 = true;
      Au2 = 14;
      continue;
    case 14:
      if (Bu2) {
        Au2 = 15;
      } else {
        Au2 = 16;
      }
      continue;
    case 15:
      Bu2 = [];
      Bu2.push(0);
      Bu2.push(1062);
      Bu2.push(2364);
      Bu2.push(2364);
      Bu2.push(2364);
      Gu2 = Bu2[Eu2];
      Bu2 = [];
      Bu2.push(0);
      Bu2.push(239);
      Bu2.push(300);
      Bu2.push(360);
      Bu2.push(420);
      Hu2 = Bu2[Eu2];
      Bu2 = [];
      Bu2.push(0);
      Bu2.push(0.24);
      Bu2.push(0.3);
      Bu2.push(0.3);
      Bu2.push(0.36);
      Bu2.push(0.42);
      Fu2 = Bu2[Eu2];
      Bu2 = Du2 + Eu2;
      Au2 = 17;
      continue;
    case 16:
      Bu2 = [];
      Bu2.push(0);
      Bu2.push(600);
      Bu2.push(1033);
      Bu2.push(2339);
      Bu2.push(2340);
      Gu2 = Bu2[Eu2];
      Bu2 = [];
      Bu2.push(0);
      Bu2.push(260);
      Bu2.push(286);
      Bu2.push(306);
      Bu2.push(312);
      Hu2 = Bu2[Eu2];
      Bu2 = [];
      Bu2.push(0);
      Bu2.push(0.26);
      Bu2.push(0.286);
      Bu2.push(0.3);
      Bu2.push(0.306);
      Bu2.push(0.34);
      Fu2 = Bu2[Eu2];
      Bu2 = "tilde" + Eu2;
      Au2 = 17;
      continue;
    case 17:
      Au2 = 5;
      continue;
    case 18:
      Fu2 = Bu2[3];
      Bu2 = [];
      Bu2.push(ao);
      Du2 = [];
      Du2.push(Fu2);
      Au2 = 20;
      continue;
    case 19:
      if (2 === Eu2) {
        Au2 = 21;
      } else {
        Au2 = 22;
      }
      continue;
    case 20:
      Fu2 = 0;
      Au2 = 27;
      continue;
    case 21:
      Bu2 = [];
      Bu2.push("halfarrow-left");
      Bu2.push("halfarrow-right");
      Du2 = [];
      Du2.push(Lk);
      Du2.push(So);
      Au2 = 23;
      continue;
    case 22:
      if (3 === Eu2) {
        Au2 = 24;
      } else {
        Au2 = 25;
      }
      continue;
    case 23:
      Au2 = 20;
      continue;
    case 24:
      Bu2 = [];
      Bu2.push("brace-left");
      Bu2.push("brace-center");
      Bu2.push("brace-right");
      Du2 = [];
      Du2.push(Lk);
      Du2.push("xMidYMin");
      Du2.push(So);
      Au2 = 26;
      continue;
    case 25:
      throw t("Correct katexImagesData or update code here to support\n                    " + Eu2 + " children.");
    case 26:
      Au2 = 23;
      continue;
    case 27:
      if (Fu2 < Eu2) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 28:
      Gu2 = new K(Iu2[Fu2]);
      Mu2 = [];
      Mu2.push(Gu2);
      Gu2 = {};
      Object.assign(Gu2, { width: Dr, height: d(Hu2), viewBox: Tn + 4e5 + Wi + Ku2 + "" });
      Nu2 = Du2[Fu2];
      Gu2.preserveAspectRatio = Nu2 + " slice";
      Nu2 = new I(Mu2, Gu2);
      Gu2 = [];
      Gu2.push(Bu2[Fu2]);
      Mu2 = [];
      Mu2.push(Nu2);
      Gu2 = a.makeSvgSpan(Gu2, Mu2, Cu2);
      if (1 === Eu2) {
        Au2 = 30;
      } else {
        Au2 = 31;
      }
      continue;
    case 29:
      Bu2 = {};
      Du2 = [];
      Du2.push(oi);
      Object.assign(Bu2, { span: a.makeSpan(Du2, Lu2, Cu2), minWidth: Ju2, height: Hu2 });
      return Bu2;
    case 30:
      Bu2 = {};
      Object.assign(Bu2, { span: Gu2, minWidth: Ju2, height: Hu2 });
      return Bu2;
    case 31:
      Mu2 = Gu2.style;
      Mu2.height = d(Hu2);
      Lu2.push(Gu2);
      Au2 = 32;
      continue;
    case 32:
      Fu2 = Fu2 + 1;
      Au2 = 27;
      continue;
  }
}
function ue(Bu2, Cu2) {
  let Du2, Fu2, Eu2, Gu2, Ju2, Hu2, Iu2, Ku2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Eu2 = void 0;
      if (!!Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Du2 = Bu2.type;
      Du2 = Du2 === _j;
      Au2 = 3;
      continue;
    case 2:
      Du2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Du2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Du2 = j(Bu2.base, li);
      Fu2 = Du2.base;
      Bu2.base = Fu2;
      Eu2 = Gc(h2.buildGroup(Bu2, Cu2));
      Bu2.base = Du2;
      Au2 = 6;
      continue;
    case 5:
      Du2 = j(Bu2, li);
      Fu2 = Du2.base;
      Au2 = 6;
      continue;
    case 6:
      Gu2 = h2.buildGroup(Fu2, Cu2.havingCrampedStyle());
      Bu2 = Du2.isShifty;
      if (!!Bu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Bu2 = i.isCharacterBox(Fu2);
      Au2 = 9;
      continue;
    case 8:
      Au2 = 9;
      continue;
    case 9:
      if (!!Bu2) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 10:
      Bu2 = i.getBaseElem(Fu2);
      Fu2 = kb(h2.buildGroup(Bu2, Cu2.havingCrampedStyle())).skew;
      Au2 = 12;
      continue;
    case 11:
      Fu2 = 0;
      Au2 = 12;
      continue;
    case 12:
      Bu2 = Du2.label;
      Ju2 = "\\c" === Bu2;
      if (!!Ju2) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 13:
      Bu2 = Gu2.height;
      Bu2 = Bu2 + Gu2.depth;
      Au2 = 15;
      continue;
    case 14:
      Bu2 = Math;
      Hu2 = Gu2.height;
      Bu2 = Bu2.min(Hu2, Cu2.fontMetrics().xHeight);
      Au2 = 15;
      continue;
    case 15:
      if (!Du2.isStretchy) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 16:
      Hu2 = Du2.label;
      if (Hu2 === Gr) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 17:
      Du2 = M.svgSpan(Du2, Cu2);
      Hu2 = {};
      Hu2.positionType = Ug;
      Iu2 = [];
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Gu2 });
      Iu2.push(Bu2);
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Du2 });
      Du2 = [];
      Du2.push(ti);
      Bu2.wrapperClasses = Du2;
      if (Fu2 > 0) {
        Au2 = 34;
      } else {
        Au2 = 35;
      }
      continue;
    case 18:
      Du2 = [];
      Du2.push(wg);
      Du2.push(li);
      Fu2 = [];
      Fu2.push(Bu2);
      Bu2 = a.makeSpan(Du2, Fu2, Cu2);
      if (!!Eu2) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 19:
      Hu2 = a.staticSvg("vec", Cu2);
      Iu2 = a.svgData.vec[1];
      Au2 = 21;
      continue;
    case 20:
      Hu2 = {};
      Object.assign(Hu2, { mode: Du2.mode, text: Du2.label });
      Hu2 = kb(a.makeOrd(Hu2, Cu2, bg));
      Hu2.italic = 0;
      Iu2 = Hu2.width;
      if (!!Ju2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 21:
      Ju2 = [];
      Ju2.push("accent-body");
      Ku2 = [];
      Ku2.push(Hu2);
      Hu2 = a.makeSpan(Ju2, Ku2);
      Ju2 = Du2.label;
      Ju2 = Ju2 === bk;
      if (!!Ju2) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 22:
      Bu2 = Bu2 + Hu2.depth;
      Au2 = 24;
      continue;
    case 23:
      Au2 = 24;
      continue;
    case 24:
      Au2 = 21;
      continue;
    case 25:
      Hu2.classes.push("accent-full");
      Bu2 = Gu2.height;
      Au2 = 27;
      continue;
    case 26:
      Au2 = 27;
      continue;
    case 27:
      if (!Ju2) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 28:
      Fu2 = +Fu2;
      Iu2 = +Iu2;
      Fu2 = Fu2 - +(Iu2 / 2);
      Au2 = 30;
      continue;
    case 29:
      Au2 = 30;
      continue;
    case 30:
      Iu2 = Hu2.style;
      Iu2.left = d(Fu2);
      Du2 = Du2.label;
      if (Du2 === bk) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 31:
      Du2 = Hu2.style;
      Du2.top = ".2em";
      Au2 = 33;
      continue;
    case 32:
      Au2 = 33;
      continue;
    case 33:
      Fu2 = {};
      Fu2.positionType = Ug;
      Du2 = [];
      Iu2 = {};
      Object.assign(Iu2, { type: Yf, elem: Gu2 });
      Du2.push(Iu2);
      Gu2 = {};
      Object.assign(Gu2, { type: kh, size: 0 - +Bu2 });
      Du2.push(Gu2);
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Hu2 });
      Du2.push(Bu2);
      Fu2.children = Du2;
      Bu2 = a.makeVList(Fu2, Cu2);
      Au2 = 18;
      continue;
    case 34:
      Du2 = {};
      Gu2 = d;
      Du2.width = "calc(100% - " + Gu2(2 * +Fu2) + kr;
      Gu2 = d;
      Du2.marginLeft = Gu2(2 * +Fu2);
      Au2 = 36;
      continue;
    case 35:
      Du2 = void 0;
      Au2 = 36;
      continue;
    case 36:
      Bu2.wrapperStyle = Du2;
      Iu2.push(Bu2);
      Hu2.children = Iu2;
      Bu2 = a.makeVList(Hu2, Cu2);
      Au2 = 18;
      continue;
    case 37:
      Cu2 = Eu2.children;
      Cu2[0] = Bu2;
      Eu2.height = Math.max(Bu2.height, Eu2.height);
      Eu2.classes[0] = wg;
      return Eu2;
    case 38:
      return Bu2;
  }
}
function ve(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.type;
      if (Cu2 === Xf) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = Bu2.body;
      Cu2 = !!Cu2.length;
      Au2 = 3;
      continue;
    case 2:
      Cu2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Cu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Bu2 = Bu2.body[0];
      Au2 = 6;
      continue;
    case 5:
      Au2 = 6;
      continue;
    case 6:
      Cu2 = Bu2.type;
      if (Cu2 === gj) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Cu2 = Bu2.family;
      if (Cu2 === tr) {
        Au2 = 11;
      } else {
        Au2 = 10;
      }
      continue;
    case 8:
      Cu2 = false;
      Au2 = 9;
      continue;
    case 9:
      if (Cu2) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 10:
      Cu2 = Bu2.family;
      Cu2 = Cu2 === wr;
      Au2 = 12;
      continue;
    case 11:
      Cu2 = true;
      Au2 = 12;
      continue;
    case 12:
      Au2 = 9;
      continue;
    case 13:
      return et + Bu2.family;
    case 14:
      return wg;
  }
}
function we(Bu2, Cu2, Du2) {
  let Eu2, Fu2, Gu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = ad[Bu2];
      if (Bu2 === ap) {
        Au2 = 2;
      } else {
        Au2 = 1;
      }
      continue;
    case 1:
      Eu2 = Bu2 === Op;
      Au2 = 3;
      continue;
    case 2:
      Eu2 = true;
      Au2 = 3;
      continue;
    case 3:
      if (Eu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Eu2 = [];
      Eu2.push(Cu2[0]);
      Fu2 = [];
      Fu2.push(Cu2[1]);
      return Du2.callFunction(Bu2, Eu2, Fu2);
    case 5:
      if (Bu2 === ok3) {
        Au2 = 7;
      } else {
        Au2 = 6;
      }
      continue;
    case 6:
      Eu2 = Bu2 === vj;
      Au2 = 8;
      continue;
    case 7:
      Eu2 = true;
      Au2 = 8;
      continue;
    case 8:
      if (Eu2) {
        Au2 = 9;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      Eu2 = [];
      Eu2.push(Cu2[0]);
      Fu2 = Du2.callFunction(xs, Eu2, []);
      Eu2 = {};
      Object.assign(Eu2, { type: gj, text: Bu2, mode: tg, family: wr });
      Bu2 = [];
      Bu2.push(Eu2);
      Eu2 = Du2.callFunction(Er, Bu2, []);
      Bu2 = [];
      Bu2.push(Cu2[1]);
      Gu2 = Du2.callFunction(Wr, Bu2, []);
      Bu2 = {};
      Object.assign(Bu2, { type: Xf, mode: tg });
      Cu2 = [];
      Cu2.push(Fu2);
      Cu2.push(Eu2);
      Cu2.push(Gu2);
      Bu2.body = Cu2;
      Cu2 = [];
      Cu2.push(Bu2);
      return Du2.callFunction(br, Cu2, []);
    case 10:
      if (Bu2 === xl) {
        Au2 = 11;
      } else {
        Au2 = 12;
      }
      continue;
    case 11:
      return Du2.callFunction(xl, [], []);
    case 12:
      if (Bu2 === $l) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 13:
      Bu2 = {};
      Object.assign(Bu2, { type: bg, text: $l, mode: tg });
      Cu2 = [];
      Cu2.push(Bu2);
      return Du2.callFunction(Er, Cu2, []);
    case 14:
      Bu2 = {};
      Object.assign(Bu2, { type: bg, text: Wi, mode: tg });
      return Bu2;
  }
}
function xe(Bu2) {
  let Cu2, Du2, Eu2, Gu2, Ku2, Lu2, Mu2, Iu2, Fu2, Hu2, Ju2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Hu2 = [];
      Cu2 = Bu2.gullet;
      Cu2.beginGroup();
      Cu2 = Bu2.gullet;
      Cu2.macros.set("\\cr", $m);
      Bu2.gullet.beginGroup();
      Au2 = 1;
      continue;
    case 1:
      if (true) {
        Au2 = 2;
      } else {
        Au2 = 3;
      }
      continue;
    case 2:
      Hu2.push(Bu2.parseExpression(false, Vn));
      Du2 = Bu2.gullet;
      Du2.endGroup();
      Du2 = Bu2.gullet;
      Du2.beginGroup();
      Cu2 = Bu2.fetch().text;
      if ("&" === Cu2) {
        Au2 = 5;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      Fu2 = [];
      Ju2 = [];
      Ju2.push(Fu2);
      Iu2 = 0;
      Au2 = 15;
      continue;
    case 4:
      Du2 = Cu2 === Vn;
      Au2 = 6;
      continue;
    case 5:
      Du2 = true;
      Au2 = 6;
      continue;
    case 6:
      if (Du2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Bu2.consume();
      Au2 = 9;
      continue;
    case 8:
      if (Cu2 === Pm) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 9:
      Au2 = 1;
      continue;
    case 10:
      Cu2 = Hu2.length;
      Cu2 = Hu2[Cu2 - 1].length;
      if (0 === Cu2) {
        Au2 = 12;
      } else {
        Au2 = 13;
      }
      continue;
    case 11:
      throw new c("Expected \\\\ or \\cr or \\end", Bu2.nextToken);
    case 12:
      Hu2.pop();
      Au2 = 14;
      continue;
    case 13:
      Au2 = 14;
      continue;
    case 14:
      Au2 = 3;
      continue;
    case 15:
      if (Iu2 < Hu2.length) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 16:
      Du2 = Hu2[Iu2];
      Eu2 = vb();
      Cu2 = 0;
      Au2 = 18;
      continue;
    case 17:
      Cu2 = Bu2.gullet;
      Cu2.endGroup();
      Bu2.gullet.endGroup();
      Bu2 = {};
      Object.assign(Bu2, { type: ph, align: dt, pregap: 0.25, postgap: 0.25 });
      Cu2 = Array;
      Du2 = Ju2[0];
      Cu2 = new Cu2(Du2.length);
      Du2 = Cu2.fill(Bu2);
      Bu2 = {};
      Object.assign(Bu2, { type: Ir, mode: tg, body: Ju2, arraystretch: 1, addJot: true });
      Cu2 = [];
      Cu2.push(null);
      Object.assign(Bu2, { rowGaps: Cu2, cols: Du2, colSeparationType: Qt });
      Cu2 = Array;
      Bu2.hLinesBeforeRow = new Cu2(Ju2.length + 1).fill([]);
      return Bu2;
    case 18:
      if (Cu2 < Du2.length) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 19:
      if (!wb(Du2[Cu2])) {
        Au2 = 21;
      } else {
        Au2 = 22;
      }
      continue;
    case 20:
      if (0 === Iu2 % 2) {
        Au2 = 45;
      } else {
        Au2 = 46;
      }
      continue;
    case 21:
      Eu2.body.push(Du2[Cu2]);
      Au2 = 23;
      continue;
    case 22:
      Fu2.push(Eu2);
      Cu2 = Cu2 + 1;
      Gu2 = Ma(Du2[Cu2]).text;
      Ku2 = new Array(2);
      Eu2 = {};
      Object.assign(Eu2, { type: Xf, mode: tg, body: [] });
      Ku2[0] = Eu2;
      Eu2 = {};
      Object.assign(Eu2, { type: Xf, mode: tg, body: [] });
      Ku2[1] = Eu2;
      Eu2 = "=|.".indexOf(Gu2);
      if (Eu2 > 0 - 1) {
        Au2 = 24;
      } else {
        Au2 = 25;
      }
      continue;
    case 23:
      Cu2 = Cu2 + 1;
      Au2 = 18;
      continue;
    case 24:
      Au2 = 26;
      continue;
    case 25:
      Eu2 = "<>AV".indexOf(Gu2);
      Lu2 = 0;
      if (Eu2 > Lu2 - 1) {
        Au2 = 27;
      } else {
        Au2 = 28;
      }
      continue;
    case 26:
      Ku2 = cd(Gu2, Ku2, Bu2);
      Eu2 = {};
      Eu2.type = Sh;
      Gu2 = [];
      Gu2.push(Ku2);
      Object.assign(Eu2, { body: Gu2, mode: tg, style: Tg });
      Fu2.push(Eu2);
      Eu2 = vb();
      Au2 = 23;
      continue;
    case 27:
      Lu2 = 0;
      Au2 = 30;
      continue;
    case 28:
      throw new c('Expected one of "<>AV=|." after @', Du2[Cu2]);
    case 29:
      Au2 = 26;
      continue;
    case 30:
      if (Lu2 < 2) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 31:
      Eu2 = Cu2 + 1;
      Au2 = 33;
      continue;
    case 32:
      Au2 = 29;
      continue;
    case 33:
      if (Eu2 < Du2.length) {
        Au2 = 34;
      } else {
        Eu2 = true;
        Au2 = 35;
      }
      continue;
    case 34:
      if (!!bd(Du2[Eu2], Gu2)) {
        Au2 = 36;
      } else {
        Au2 = 37;
      }
      continue;
    case 35:
      if (!!Eu2) {
        Au2 = 42;
      } else {
        Au2 = 43;
      }
      continue;
    case 36:
      Cu2 = Eu2;
      Eu2 = false;
      Au2 = 35;
      continue;
    case 37:
      Au2 = 38;
      continue;
    case 38:
      if (!!wb(Du2[Eu2])) {
        Au2 = 39;
      } else {
        Au2 = 40;
      }
      continue;
    case 39:
      Bu2 = c;
      throw new Bu2(vs + Gu2 + al, Du2[Eu2]);
    case 40:
      Au2 = 41;
      continue;
    case 41:
      Mu2 = Ku2[Lu2];
      Mu2.body.push(Du2[Eu2]);
      Eu2 = Eu2 + 1;
      Au2 = 33;
      continue;
    case 42:
      Bu2 = c;
      throw new Bu2(vs + Gu2 + al, Du2[Cu2]);
    case 43:
      Au2 = 44;
      continue;
    case 44:
      Lu2 = Lu2 + 1;
      Au2 = 30;
      continue;
    case 45:
      Fu2.push(Eu2);
      Au2 = 47;
      continue;
    case 46:
      Fu2.shift();
      Au2 = 47;
      continue;
    case 47:
      Fu2 = [];
      Ju2.push(Fu2);
      Iu2 = Iu2 + 1;
      Au2 = 15;
      continue;
  }
}
function ye(Bu2, Cu2, Du2, Eu2, Fu2) {
  let Gu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (Bu2 === ct) {
        Au2 = 2;
      } else {
        Au2 = 1;
      }
      continue;
    case 1:
      Gu2 = Bu2 === bq;
      Au2 = 3;
      continue;
    case 2:
      Gu2 = true;
      Au2 = 3;
      continue;
    case 3:
      if (Gu2) {
        Au2 = 5;
      } else {
        Au2 = 4;
      }
      continue;
    case 4:
      Gu2 = Bu2 === Br;
      Au2 = 6;
      continue;
    case 5:
      Gu2 = true;
      Au2 = 6;
      continue;
    case 6:
      if (Gu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Bu2 = im;
      Au2 = 9;
      continue;
    case 8:
      if (Bu2 === no) {
        Au2 = 11;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      if (!!i.contains(Cb, Bu2)) {
        Au2 = 20;
      } else {
        Au2 = 19;
      }
      continue;
    case 10:
      Gu2 = Bu2 === aq;
      Au2 = 12;
      continue;
    case 11:
      Gu2 = true;
      Au2 = 12;
      continue;
    case 12:
      if (Gu2) {
        Au2 = 14;
      } else {
        Au2 = 13;
      }
      continue;
    case 13:
      Gu2 = Bu2 === Cr;
      Au2 = 15;
      continue;
    case 14:
      Gu2 = true;
      Au2 = 15;
      continue;
    case 15:
      if (Gu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 16:
      Bu2 = km;
      Au2 = 18;
      continue;
    case 17:
      Au2 = 18;
      continue;
    case 18:
      Au2 = 9;
      continue;
    case 19:
      Gu2 = !!i.contains(Db, Bu2);
      Au2 = 21;
      continue;
    case 20:
      Gu2 = true;
      Au2 = 21;
      continue;
    case 21:
      if (Gu2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 22:
      Gu2 = [];
      Gu2.push(Bu2);
      Gu2.push(Cu2);
      Gu2.push(false);
      Gu2.push(Du2);
      Gu2.push(Eu2);
      Gu2.push(Fu2);
      return Ab.apply(void 0, Gu2);
    case 23:
      if (!!i.contains(jd, Bu2)) {
        Au2 = 24;
      } else {
        Au2 = 25;
      }
      continue;
    case 24:
      Gu2 = [];
      Gu2.push(Bu2);
      Gu2.push(ba[Cu2]);
      Gu2.push(false);
      Gu2.push(Du2);
      Gu2.push(Eu2);
      Gu2.push(Fu2);
      return Bb.apply(void 0, Gu2);
    case 25:
      Cu2 = c;
      throw new Cu2("Illegal delimiter: '" + Bu2 + Cj);
  }
}
function ze(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.type;
      if (Cu2 === Vj) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return vk;
    case 2:
      Cu2 = Bu2.type;
      if (Cu2 === ro) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      return gt + Bu2.size + Tt;
    case 4:
      Cu2 = Bu2.type;
      if (Cu2 === Jh) {
        Au2 = 5;
      } else {
        Au2 = 6;
      }
      continue;
    case 5:
      return _f;
    case 6:
      throw t("Add support for delim type '" + Bu2.type + "' here.");
  }
}
function Ae(Bu2, Cu2, Du2, Eu2, Fu2, Gu2) {
  let Hu2, Iu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (Bu2 === ct) {
        Au2 = 2;
      } else {
        Au2 = 1;
      }
      continue;
    case 1:
      Hu2 = Bu2 === bq;
      Au2 = 3;
      continue;
    case 2:
      Hu2 = true;
      Au2 = 3;
      continue;
    case 3:
      if (Hu2) {
        Au2 = 5;
      } else {
        Au2 = 4;
      }
      continue;
    case 4:
      Hu2 = Bu2 === Br;
      Au2 = 6;
      continue;
    case 5:
      Hu2 = true;
      Au2 = 6;
      continue;
    case 6:
      if (Hu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Bu2 = im;
      Au2 = 9;
      continue;
    case 8:
      if (Bu2 === no) {
        Au2 = 11;
      } else {
        Au2 = 10;
      }
      continue;
    case 9:
      if (!!i.contains(Db, Bu2)) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 10:
      Hu2 = Bu2 === aq;
      Au2 = 12;
      continue;
    case 11:
      Hu2 = true;
      Au2 = 12;
      continue;
    case 12:
      if (Hu2) {
        Au2 = 14;
      } else {
        Au2 = 13;
      }
      continue;
    case 13:
      Hu2 = Bu2 === Cr;
      Au2 = 15;
      continue;
    case 14:
      Hu2 = true;
      Au2 = 15;
      continue;
    case 15:
      if (Hu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 16:
      Bu2 = km;
      Au2 = 18;
      continue;
    case 17:
      Au2 = 18;
      continue;
    case 18:
      Au2 = 9;
      continue;
    case 19:
      Hu2 = kd;
      Au2 = 21;
      continue;
    case 20:
      if (!!i.contains(Cb, Bu2)) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 21:
      Hu2 = Fb(Bu2, Cu2, Hu2, Eu2);
      Iu2 = Hu2.type;
      if (Iu2 === Vj) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 22:
      Hu2 = Eb;
      Au2 = 24;
      continue;
    case 23:
      Hu2 = ld;
      Au2 = 24;
      continue;
    case 24:
      Au2 = 21;
      continue;
    case 25:
      Cu2 = [];
      Cu2.push(Bu2);
      Cu2.push(Hu2.style);
      Cu2.push(Du2);
      Cu2.push(Eu2);
      Cu2.push(Fu2);
      Cu2.push(Gu2);
      return fd.apply(void 0, Cu2);
    case 26:
      Iu2 = Hu2.type;
      if (Iu2 === ro) {
        Au2 = 27;
      } else {
        Au2 = 28;
      }
      continue;
    case 27:
      Cu2 = [];
      Cu2.push(Bu2);
      Cu2.push(Hu2.size);
      Cu2.push(Du2);
      Cu2.push(Eu2);
      Cu2.push(Fu2);
      Cu2.push(Gu2);
      return Ab.apply(void 0, Cu2);
    case 28:
      Hu2 = [];
      Hu2.push(Bu2);
      Hu2.push(Cu2);
      Hu2.push(Du2);
      Hu2.push(Eu2);
      Hu2.push(Fu2);
      Hu2.push(Gu2);
      return Bb.apply(void 0, Hu2);
  }
}
function Be(Bu2, Cu2) {
  let Du2, Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = oa(Bu2);
      if (!!Du2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Eu2 = !!i.contains(nd, Du2.text);
      Au2 = 3;
      continue;
    case 2:
      Eu2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Eu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      return Du2;
    case 5:
      if (!!Du2) {
        Au2 = 6;
      } else {
        Au2 = 7;
      }
      continue;
    case 6:
      Eu2 = c;
      Du2 = "Invalid delimiter '" + Du2.text + "' after '";
      throw new Eu2(Du2 + Cu2.funcName + "" + Cj, Bu2);
    case 7:
      Cu2 = c;
      throw new Cu2("Invalid delimiter type '" + Bu2.type + Cj, Bu2);
  }
}
function Ce(Bu2, Cu2) {
  let Du2, Fu2, Hu2, Iu2, Eu2, Gu2, Ku2, Ju2, Lu2, Mu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = a;
      Du2 = Du2.wrapFragment(h2.buildGroup(Bu2.body, Cu2), Cu2);
      Fu2 = Bu2.label.slice(1);
      Hu2 = Cu2.sizeMultiplier;
      Iu2 = i.isCharacterBox(Bu2.body);
      if ("sout" === Fu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Eu2 = [];
      Eu2.push(oi);
      Eu2.push("sout");
      Eu2 = a.makeSpan(Eu2);
      Eu2.height = +Cu2.fontMetrics().defaultRuleThickness / +Hu2;
      Gu2 = 0;
      Gu2 = +(Gu2 - 0.5);
      Gu2 = Gu2 * +Cu2.fontMetrics().xHeight;
      Au2 = 3;
      continue;
    case 2:
      if ("phase" === Fu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 3:
      if (!!Bu2.backgroundColor) {
        Au2 = 43;
      } else {
        Au2 = 44;
      }
      continue;
    case 4:
      Eu2 = {};
      Object.assign(Eu2, { number: 0.6, unit: "pt" });
      Gu2 = r(Eu2, Cu2);
      Eu2 = {};
      Object.assign(Eu2, { number: 0.35, unit: rr });
      Ku2 = r(Eu2, Cu2);
      Eu2 = Cu2.havingBaseSizing();
      Hu2 = +Hu2;
      Eu2 = Hu2 / +Eu2.sizeMultiplier;
      Hu2 = Du2.height;
      Hu2 = Hu2 + Du2.depth + Gu2 + Ku2;
      Ju2 = Du2.style;
      Lu2 = d;
      Mu2 = +Hu2;
      Ju2.paddingLeft = Lu2(Mu2 / 2 + Gu2);
      Ju2 = Math;
      Ju2 = Ju2.floor(+(+yu * +Hu2) * +Eu2);
      Lu2 = [];
      Lu2.push(new K("phase", vc(Ju2)));
      Eu2 = {};
      Eu2.width = Dr;
      Mu2 = d;
      Object.assign(Eu2, { height: Mu2(+Ju2 / +yu), viewBox: Rr + Ju2, preserveAspectRatio: tq });
      Lu2 = new I(Lu2, Eu2);
      Eu2 = [];
      Eu2.push(ao);
      Ju2 = [];
      Ju2.push(Lu2);
      Eu2 = a.makeSvgSpan(Eu2, Ju2, Cu2);
      Ju2 = Eu2.style;
      Ju2.height = d(Hu2);
      Gu2 = Du2.depth + Gu2 + Ku2;
      Au2 = 6;
      continue;
    case 5:
      Eu2 = new RegExp(Dq, lh);
      if (!!Eu2.test(Fu2)) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 6:
      Au2 = 3;
      continue;
    case 7:
      if (!Iu2) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 8:
      if (Fu2 === it) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 9:
      Eu2 = new RegExp("box", lh);
      if (!!Eu2.test(Fu2)) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 10:
      Du2.classes.push("cancel-pad");
      Au2 = 12;
      continue;
    case 11:
      Au2 = 12;
      continue;
    case 12:
      Au2 = 9;
      continue;
    case 13:
      Du2.classes.push("anglpad");
      Au2 = 15;
      continue;
    case 14:
      Du2.classes.push("boxpad");
      Au2 = 15;
      continue;
    case 15:
      Au2 = 9;
      continue;
    case 16:
      Eu2 = Math;
      Gu2 = Eu2.max(Cu2.fontMetrics().fboxrule, Cu2.minRuleThickness);
      if (Fu2 === hu) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 17:
      if (Fu2 === it) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 18:
      Eu2 = M.encloseSpan(Du2, Fu2, Eu2, Hu2, Cu2);
      Ju2 = new RegExp("fbox|boxed|fcolorbox", lh);
      if (!!Ju2.test(Fu2)) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 19:
      Eu2 = 0;
      Au2 = 21;
      continue;
    case 20:
      Eu2 = Gu2;
      Au2 = 21;
      continue;
    case 21:
      Eu2 = Cu2.fontMetrics().fboxsep + Eu2;
      Hu2 = Eu2;
      Au2 = 18;
      continue;
    case 22:
      Eu2 = Math;
      Gu2 = Eu2.max(Cu2.fontMetrics().defaultRuleThickness, Cu2.minRuleThickness);
      Eu2 = 4 * +Gu2;
      Hu2 = Math;
      Ju2 = 0.25;
      Hu2 = Hu2.max(0, Ju2 - +Du2.depth);
      Au2 = 24;
      continue;
    case 23:
      if (!!Iu2) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 24:
      Au2 = 18;
      continue;
    case 25:
      Eu2 = 0.2;
      Au2 = 27;
      continue;
    case 26:
      Eu2 = 0;
      Au2 = 27;
      continue;
    case 27:
      Hu2 = Eu2;
      Gu2 = 0;
      Au2 = 24;
      continue;
    case 28:
      Ju2 = Eu2.style;
      Ju2.borderStyle = "solid";
      Ju2 = Eu2.style;
      Ju2.borderWidth = d(Gu2);
      Au2 = 30;
      continue;
    case 29:
      if (Fu2 === it) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 30:
      Gu2 = Du2.depth + Hu2;
      if (!!Bu2.backgroundColor) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 31:
      Ju2 = 0.049 !== Gu2;
      Au2 = 33;
      continue;
    case 32:
      Ju2 = false;
      Au2 = 33;
      continue;
    case 33:
      if (Ju2) {
        Au2 = 34;
      } else {
        Au2 = 35;
      }
      continue;
    case 34:
      Ju2 = Eu2.style;
      Ju2.borderTopWidth = d(Gu2);
      Ju2 = Eu2.style;
      Ju2.borderRightWidth = d(Gu2);
      Au2 = 36;
      continue;
    case 35:
      Au2 = 36;
      continue;
    case 36:
      Au2 = 30;
      continue;
    case 37:
      Hu2 = Eu2.style;
      Hu2.backgroundColor = Bu2.backgroundColor;
      if (!!Bu2.borderColor) {
        Au2 = 40;
      } else {
        Au2 = 41;
      }
      continue;
    case 38:
      Au2 = 39;
      continue;
    case 39:
      Au2 = 6;
      continue;
    case 40:
      Hu2 = Eu2.style;
      Hu2.borderColor = Bu2.borderColor;
      Au2 = 42;
      continue;
    case 41:
      Au2 = 42;
      continue;
    case 42:
      Au2 = 39;
      continue;
    case 43:
      Hu2 = {};
      Hu2.positionType = kg;
      Ju2 = [];
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Eu2, shift: Gu2 });
      Ju2.push(Bu2);
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Du2, shift: 0 });
      Ju2.push(Bu2);
      Hu2.children = Ju2;
      Bu2 = a.makeVList(Hu2, Cu2);
      Au2 = 45;
      continue;
    case 44:
      Bu2 = new RegExp("cancel|phase", lh);
      if (!!Bu2.test(Fu2)) {
        Au2 = 46;
      } else {
        Au2 = 47;
      }
      continue;
    case 45:
      Eu2 = new RegExp(Dq, lh);
      if (!!Eu2.test(Fu2)) {
        Au2 = 49;
      } else {
        Au2 = 50;
      }
      continue;
    case 46:
      Hu2 = [];
      Hu2.push(ti);
      Au2 = 48;
      continue;
    case 47:
      Hu2 = [];
      Au2 = 48;
      continue;
    case 48:
      Ju2 = {};
      Ju2.positionType = kg;
      Ku2 = [];
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Du2, shift: 0 });
      Ku2.push(Bu2);
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Eu2, shift: Gu2, wrapperClasses: Hu2 });
      Ku2.push(Bu2);
      Ju2.children = Ku2;
      Bu2 = a.makeVList(Ju2, Cu2);
      Au2 = 45;
      continue;
    case 49:
      Object.assign(Bu2, { height: Du2.height, depth: Du2.depth });
      Au2 = 51;
      continue;
    case 50:
      Au2 = 51;
      continue;
    case 51:
      Du2 = new RegExp(Dq, lh);
      if (!!Du2.test(Fu2)) {
        Au2 = 52;
      } else {
        Au2 = 53;
      }
      continue;
    case 52:
      Du2 = !Iu2;
      Au2 = 54;
      continue;
    case 53:
      Du2 = false;
      Au2 = 54;
      continue;
    case 54:
      if (Du2) {
        Au2 = 55;
      } else {
        Au2 = 56;
      }
      continue;
    case 55:
      Du2 = [];
      Du2.push(wg);
      Du2.push("cancel-lap");
      Eu2 = [];
      Eu2.push(Bu2);
      return a.makeSpan(Du2, Eu2, Cu2);
    case 56:
      Du2 = [];
      Du2.push(wg);
      Eu2 = [];
      Eu2.push(Bu2);
      return a.makeSpan(Du2, Eu2, Cu2);
  }
}
function De(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if ("d" === Bu2.slice(0, 1)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Tg;
    case 2:
      return yf;
  }
}
function Ee(Cu2, Du2) {
  let Eu2, Ru2, Ou2, Su2, Mu2, Nu2, Fu2, Uu2, Vu2, Pu2, Tu2, Iu2, Hu2, Ju2, Ku2, Gu2, Lu2, Qu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Eu2 = Cu2.body;
      Ru2 = Eu2.length;
      Ou2 = Cu2.hLinesBeforeRow;
      Su2 = new Array(Ru2);
      Qu2 = [];
      Eu2 = Math;
      Mu2 = Eu2.max(Du2.fontMetrics().arrayRuleWidth, Du2.minRuleThickness);
      Eu2 = 1;
      Eu2 = Eu2 / +Du2.fontMetrics().ptPerEm;
      Nu2 = 5 * +Eu2;
      if (!!Cu2.colSeparationType) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Fu2 = Cu2.colSeparationType;
      Fu2 = Fu2 === Vj;
      Au2 = 3;
      continue;
    case 2:
      Fu2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Fu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Fu2 = Du2.havingStyle(g.SCRIPT).sizeMultiplier;
      Gu2 = 0.2778;
      Fu2 = +Fu2;
      Nu2 = Gu2 * +(Fu2 / +Du2.sizeMultiplier);
      Au2 = 6;
      continue;
    case 5:
      Au2 = 6;
      continue;
    case 6:
      Fu2 = Cu2.colSeparationType;
      if (Fu2 === Qt) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Fu2 = {};
      Object.assign(Fu2, { number: 3, unit: rr });
      Fu2 = r(Fu2, Du2);
      Au2 = 9;
      continue;
    case 8:
      Fu2 = 12 * +Eu2;
      Au2 = 9;
      continue;
    case 9:
      Uu2 = 3 * +Eu2;
      Eu2 = +Cu2.arraystretch * +Fu2;
      Vu2 = 0.7 * +Eu2;
      Pu2 = 0.3 * +Eu2;
      var Bu2 = 0;
      Tu2 = (Cu3) => {
        var Du3 = 0, Eu3;
        while (Du3 < Cu3.length) {
          Du3 > 0 && (Bu2 = Bu2 + 0.25);
          Eu3 = {};
          Object.assign(Eu3, { pos: Bu2, isDashed: Cu3[Du3] });
          Qu2.push(Eu3);
          Du3 = Du3 + 1;
        }
      };
      Tu2(Ou2[0]);
      Fu2 = 0;
      Hu2 = 0;
      Au2 = 10;
      continue;
    case 10:
      Eu2 = Cu2.body;
      if (Fu2 < Eu2.length) {
        Au2 = 11;
      } else {
        Au2 = 12;
      }
      continue;
    case 11:
      Iu2 = Cu2.body[Fu2];
      if (Hu2 < Iu2.length) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 12:
      Eu2 = +Bu2;
      Eu2 = Eu2 / 2;
      Lu2 = Eu2 + Du2.fontMetrics().axisHeight;
      Ku2 = Cu2.cols;
      if (!Ku2) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 13:
      Hu2 = Iu2.length;
      Au2 = 15;
      continue;
    case 14:
      Au2 = 15;
      continue;
    case 15:
      Ju2 = new Array(Iu2.length);
      Lu2 = 0;
      Gu2 = Vu2;
      Eu2 = Pu2;
      Au2 = 16;
      continue;
    case 16:
      if (Lu2 < Iu2.length) {
        Au2 = 17;
      } else {
        Au2 = 18;
      }
      continue;
    case 17:
      Ku2 = h2.buildGroup(Iu2[Lu2], Du2);
      if (Eu2 < Ku2.depth) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 18:
      Iu2 = Cu2.rowGaps[Fu2];
      if (!!Iu2) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 19:
      Eu2 = Ku2.depth;
      Au2 = 21;
      continue;
    case 20:
      Au2 = 21;
      continue;
    case 21:
      if (Gu2 < Ku2.height) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 22:
      Gu2 = Ku2.height;
      Au2 = 24;
      continue;
    case 23:
      Au2 = 24;
      continue;
    case 24:
      Ju2[Lu2] = Ku2;
      Lu2 = Lu2 + 1;
      Au2 = 16;
      continue;
    case 25:
      Iu2 = r(Iu2, Du2);
      if (Iu2 > 0) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 26:
      Iu2 = 0;
      Au2 = 27;
      continue;
    case 27:
      if (!!Cu2.addJot) {
        Au2 = 34;
      } else {
        Au2 = 35;
      }
      continue;
    case 28:
      Iu2 = Iu2 + Pu2;
      if (Eu2 < Iu2) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 29:
      Au2 = 30;
      continue;
    case 30:
      Au2 = 27;
      continue;
    case 31:
      Eu2 = Iu2;
      Au2 = 33;
      continue;
    case 32:
      Au2 = 33;
      continue;
    case 33:
      Iu2 = 0;
      Au2 = 30;
      continue;
    case 34:
      Eu2 = Eu2 + Uu2;
      Au2 = 36;
      continue;
    case 35:
      Au2 = 36;
      continue;
    case 36:
      Object.assign(Ju2, { height: Gu2, depth: Eu2 });
      Bu2 = Bu2 + Gu2;
      Ju2.pos = Bu2;
      Gu2 = Bu2;
      Bu2 = Gu2 + (Eu2 + Iu2);
      Su2[Fu2] = Ju2;
      Tu2(Ou2[Fu2 + 1]);
      Fu2 = Fu2 + 1;
      Au2 = 10;
      continue;
    case 37:
      Ku2 = [];
      Au2 = 39;
      continue;
    case 38:
      Au2 = 39;
      continue;
    case 39:
      Ju2 = [];
      Tu2 = [];
      if (!!Cu2.tags) {
        Au2 = 40;
      } else {
        Au2 = 41;
      }
      continue;
    case 40:
      Eu2 = !!Cu2.tags.some((Au3) => Au3);
      Au2 = 42;
      continue;
    case 41:
      Eu2 = false;
      Au2 = 42;
      continue;
    case 42:
      if (Eu2) {
        Au2 = 43;
      } else {
        Au2 = 44;
      }
      continue;
    case 43:
      Fu2 = 0;
      Au2 = 46;
      continue;
    case 44:
      Au2 = 45;
      continue;
    case 45:
      Gu2 = 0;
      Fu2 = 0;
      Au2 = 55;
      continue;
    case 46:
      if (Fu2 < Ru2) {
        Au2 = 47;
      } else {
        Au2 = 48;
      }
      continue;
    case 47:
      Gu2 = Su2[Fu2];
      Iu2 = +Gu2.pos - +Lu2;
      Eu2 = Cu2.tags[Fu2];
      if (true === Eu2) {
        Au2 = 49;
      } else {
        Au2 = 50;
      }
      continue;
    case 48:
      Au2 = 45;
      continue;
    case 49:
      Eu2 = [];
      Eu2.push("eqn-num");
      Eu2 = a.makeSpan(Eu2, [], Du2);
      Au2 = 51;
      continue;
    case 50:
      if (false === Eu2) {
        Au2 = 52;
      } else {
        Au2 = 53;
      }
      continue;
    case 51:
      Object.assign(Eu2, { depth: Gu2.depth, height: Gu2.height });
      Gu2 = {};
      Object.assign(Gu2, { type: Yf, elem: Eu2, shift: Iu2 });
      Tu2.push(Gu2);
      Fu2 = Fu2 + 1;
      Au2 = 46;
      continue;
    case 52:
      Eu2 = a.makeSpan([], [], Du2);
      Au2 = 54;
      continue;
    case 53:
      Eu2 = a.makeSpan([], h2.buildExpression(Eu2, Du2, true), Du2);
      Au2 = 54;
      continue;
    case 54:
      Au2 = 51;
      continue;
    case 55:
      if (Gu2 < Hu2) {
        Au2 = 59;
      } else {
        Au2 = 58;
      }
      continue;
    case 56:
      Eu2 = Ku2[Fu2];
      if (!Eu2) {
        Au2 = 61;
      } else {
        Au2 = 62;
      }
      continue;
    case 57:
      Cu2 = [];
      Cu2.push(En);
      Cu2 = a.makeSpan(Cu2, Ju2);
      Eu2 = Qu2.length;
      if (Eu2 > 0) {
        Au2 = 115;
      } else {
        Au2 = 116;
      }
      continue;
    case 58:
      Eu2 = Fu2 < Ku2.length;
      Au2 = 60;
      continue;
    case 59:
      Eu2 = true;
      Au2 = 60;
      continue;
    case 60:
      if (Eu2) {
        Au2 = 56;
      } else {
        Au2 = 57;
      }
      continue;
    case 61:
      Eu2 = {};
      Au2 = 63;
      continue;
    case 62:
      Au2 = 63;
      continue;
    case 63:
      Ou2 = true;
      Au2 = 64;
      continue;
    case 64:
      Iu2 = Eu2.type;
      if (Iu2 === Jg) {
        Au2 = 65;
      } else {
        Au2 = 66;
      }
      continue;
    case 65:
      if (!Ou2) {
        Au2 = 67;
      } else {
        Au2 = 68;
      }
      continue;
    case 66:
      if (Gu2 >= Hu2) {
        Au2 = 85;
      } else {
        Au2 = 86;
      }
      continue;
    case 67:
      Iu2 = [];
      Iu2.push(fn);
      Iu2 = a.makeSpan(Iu2, []);
      Ou2 = Iu2.style;
      Pu2 = d;
      Ou2.width = Pu2(Du2.fontMetrics().doubleRuleSep);
      Ju2.push(Iu2);
      Au2 = 69;
      continue;
    case 68:
      Au2 = 69;
      continue;
    case 69:
      Iu2 = Eu2.separator;
      if (Iu2 === tm) {
        Au2 = 71;
      } else {
        Au2 = 70;
      }
      continue;
    case 70:
      Iu2 = Eu2.separator;
      Iu2 = Iu2 === op;
      Au2 = 72;
      continue;
    case 71:
      Iu2 = true;
      Au2 = 72;
      continue;
    case 72:
      if (Iu2) {
        Au2 = 73;
      } else {
        Au2 = 74;
      }
      continue;
    case 73:
      Eu2 = Eu2.separator;
      if (Eu2 === tm) {
        Au2 = 76;
      } else {
        Au2 = 77;
      }
      continue;
    case 74:
      Cu2 = c;
      throw new Cu2("Invalid separator type: " + Eu2.separator);
    case 75:
      Fu2 = Fu2 + 1;
      Eu2 = Ku2[Fu2];
      if (!Eu2) {
        Au2 = 82;
      } else {
        Au2 = 83;
      }
      continue;
    case 76:
      Ou2 = "solid";
      Au2 = 78;
      continue;
    case 77:
      Ou2 = "dashed";
      Au2 = 78;
      continue;
    case 78:
      Eu2 = [];
      Eu2.push("vertical-separator");
      Eu2 = a.makeSpan(Eu2, [], Du2);
      Iu2 = Eu2.style;
      Iu2.height = d(Bu2);
      Iu2 = Eu2.style;
      Iu2.borderRightWidth = d(Mu2);
      Iu2 = Eu2.style;
      Iu2.borderRightStyle = Ou2;
      Iu2 = Eu2.style;
      Ou2 = d;
      Pu2 = +(0 - +Mu2);
      Iu2.margin = "0 " + Ou2(Pu2 / 2);
      Iu2 = +Bu2 - +Lu2;
      if (!!Iu2) {
        Au2 = 79;
      } else {
        Au2 = 80;
      }
      continue;
    case 79:
      Ou2 = Eu2.style;
      Pu2 = d;
      Ou2.verticalAlign = Pu2(0 - +Iu2);
      Au2 = 81;
      continue;
    case 80:
      Au2 = 81;
      continue;
    case 81:
      Ju2.push(Eu2);
      Au2 = 75;
      continue;
    case 82:
      Eu2 = {};
      Au2 = 84;
      continue;
    case 83:
      Au2 = 84;
      continue;
    case 84:
      Ou2 = false;
      Au2 = 64;
      continue;
    case 85:
      Gu2 = Gu2 + 1;
      Fu2 = Fu2 + 1;
      Au2 = 55;
      continue;
    case 86:
      Au2 = 87;
      continue;
    case 87:
      if (Gu2 > 0) {
        Au2 = 89;
      } else {
        Au2 = 88;
      }
      continue;
    case 88:
      Iu2 = !!Cu2.hskipBeforeAndAfter;
      Au2 = 90;
      continue;
    case 89:
      Iu2 = true;
      Au2 = 90;
      continue;
    case 90:
      if (Iu2) {
        Au2 = 91;
      } else {
        Au2 = 92;
      }
      continue;
    case 91:
      Iu2 = i.deflt(Eu2.pregap, Nu2);
      if (0 !== Iu2) {
        Au2 = 94;
      } else {
        Au2 = 95;
      }
      continue;
    case 92:
      Au2 = 93;
      continue;
    case 93:
      Uu2 = [];
      Iu2 = 0;
      Au2 = 97;
      continue;
    case 94:
      Ou2 = [];
      Ou2.push(fn);
      Ou2 = a.makeSpan(Ou2, []);
      Pu2 = Ou2.style;
      Pu2.width = d(Iu2);
      Ju2.push(Ou2);
      Au2 = 96;
      continue;
    case 95:
      Au2 = 96;
      continue;
    case 96:
      Au2 = 93;
      continue;
    case 97:
      if (Iu2 < Ru2) {
        Au2 = 98;
      } else {
        Au2 = 99;
      }
      continue;
    case 98:
      Ou2 = Su2[Iu2];
      Pu2 = Ou2[Gu2];
      if (!Pu2) {
        Au2 = 100;
      } else {
        Au2 = 101;
      }
      continue;
    case 99:
      Iu2 = {};
      Object.assign(Iu2, { positionType: kg, children: Uu2 });
      Pu2 = a.makeVList(Iu2, Du2);
      Ou2 = [];
      Iu2 = Eu2.align;
      if (!Iu2) {
        Au2 = 103;
      } else {
        Au2 = 104;
      }
      continue;
    case 100:
      Iu2 = Iu2 + 1;
      Au2 = 97;
      continue;
    case 101:
      Au2 = 102;
      continue;
    case 102:
      Vu2 = +Ou2.pos - +Lu2;
      Object.assign(Pu2, { depth: Ou2.depth, height: Ou2.height });
      Ou2 = {};
      Object.assign(Ou2, { type: Yf, elem: Pu2, shift: Vu2 });
      Uu2.push(Ou2);
      Iu2 = Iu2 + 1;
      Au2 = 97;
      continue;
    case 103:
      Iu2 = dt;
      Au2 = 105;
      continue;
    case 104:
      Au2 = 105;
      continue;
    case 105:
      Ou2.push("col-align-" + Iu2);
      Iu2 = [];
      Iu2.push(Pu2);
      Ju2.push(a.makeSpan(Ou2, Iu2));
      Ou2 = +Hu2;
      if (Gu2 < Ou2 - 1) {
        Au2 = 107;
      } else {
        Au2 = 106;
      }
      continue;
    case 106:
      Iu2 = !!Cu2.hskipBeforeAndAfter;
      Au2 = 108;
      continue;
    case 107:
      Iu2 = true;
      Au2 = 108;
      continue;
    case 108:
      if (Iu2) {
        Au2 = 109;
      } else {
        Au2 = 110;
      }
      continue;
    case 109:
      Eu2 = i.deflt(Eu2.postgap, Nu2);
      if (0 !== Eu2) {
        Au2 = 112;
      } else {
        Au2 = 113;
      }
      continue;
    case 110:
      Au2 = 111;
      continue;
    case 111:
      Gu2 = Gu2 + 1;
      Fu2 = Fu2 + 1;
      Au2 = 55;
      continue;
    case 112:
      Iu2 = [];
      Iu2.push(fn);
      Iu2 = a.makeSpan(Iu2, []);
      Ou2 = Iu2.style;
      Ou2.width = d(Eu2);
      Ju2.push(Iu2);
      Au2 = 114;
      continue;
    case 113:
      Au2 = 114;
      continue;
    case 114:
      Au2 = 111;
      continue;
    case 115:
      Gu2 = a.makeLineSpan("hline", Du2, Mu2);
      Hu2 = a.makeLineSpan("hdashline", Du2, Mu2);
      Eu2 = [];
      Fu2 = {};
      Object.assign(Fu2, { type: Yf, elem: Cu2, shift: 0 });
      Eu2.push(Fu2);
      Au2 = 118;
      continue;
    case 116:
      Au2 = 117;
      continue;
    case 117:
      Eu2 = Tu2.length;
      if (0 === Eu2) {
        Au2 = 124;
      } else {
        Au2 = 125;
      }
      continue;
    case 118:
      Cu2 = Qu2.length;
      if (Cu2 > 0) {
        Au2 = 119;
      } else {
        Au2 = 120;
      }
      continue;
    case 119:
      Cu2 = Qu2.pop();
      Fu2 = +Cu2.pos - +Lu2;
      if (!!Cu2.isDashed) {
        Au2 = 121;
      } else {
        Au2 = 122;
      }
      continue;
    case 120:
      Cu2 = {};
      Object.assign(Cu2, { positionType: kg, children: Eu2 });
      Cu2 = a.makeVList(Cu2, Du2);
      Au2 = 117;
      continue;
    case 121:
      Cu2 = {};
      Object.assign(Cu2, { type: Yf, elem: Hu2, shift: Fu2 });
      Eu2.push(Cu2);
      Au2 = 123;
      continue;
    case 122:
      Cu2 = {};
      Object.assign(Cu2, { type: Yf, elem: Gu2, shift: Fu2 });
      Eu2.push(Cu2);
      Au2 = 123;
      continue;
    case 123:
      Au2 = 118;
      continue;
    case 124:
      Eu2 = [];
      Eu2.push(wg);
      Fu2 = [];
      Fu2.push(Cu2);
      return a.makeSpan(Eu2, Fu2, Du2);
    case 125:
      Eu2 = {};
      Object.assign(Eu2, { positionType: kg, children: Tu2 });
      Gu2 = a.makeVList(Eu2, Du2);
      Eu2 = [];
      Eu2.push(Zl);
      Fu2 = [];
      Fu2.push(Gu2);
      Eu2 = a.makeSpan(Eu2, Fu2, Du2);
      Du2 = [];
      Du2.push(Cu2);
      Du2.push(Eu2);
      return a.makeFragment(Du2);
  }
}
function Fe(Bu2) {
  let Cu2, Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = new RegExp("^[-+]? *(\\d+(\\.\\d*)?|\\.\\d+)$", lh);
      if (!!Cu2.test(Bu2)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = {};
      Object.assign(Cu2, { number: +Bu2, unit: "bp" });
      return Cu2;
    case 2:
      Cu2 = new RegExp(Bj, lh);
      Cu2 = Cu2.exec(Bu2);
      if (!Cu2) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      Cu2 = c;
      throw new Cu2(Lp + Bu2 + "' in \\includegraphics");
    case 4:
      Au2 = 5;
      continue;
    case 5:
      Bu2 = {};
      Du2 = Cu2[1];
      Object.assign(Bu2, { number: +(Du2 + Cu2[2]), unit: Cu2[3] });
      if (!gb(Bu2)) {
        Au2 = 6;
      } else {
        Au2 = 7;
      }
      continue;
    case 6:
      Cu2 = c;
      throw new Cu2(wl + Bu2.unit + mn);
    case 7:
      Au2 = 8;
      continue;
    case 8:
      return Bu2;
  }
}
function Ge(Bu2, Cu2) {
  let Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Cu2.style;
      Cu2 = Cu2.size;
      if (Cu2 === g.DISPLAY.size) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2.display;
    case 2:
      Du2 = g.TEXT;
      if (Cu2 === Du2.size) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      return Bu2.text;
    case 4:
      Du2 = g.SCRIPT;
      if (Cu2 === Du2.size) {
        Au2 = 5;
      } else {
        Au2 = 6;
      }
      continue;
    case 5:
      return Bu2.script;
    case 6:
      Du2 = g.SCRIPTSCRIPT;
      if (Cu2 === Du2.size) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      return Bu2.scriptscript;
    case 8:
      return Bu2.text;
  }
}
function He(Bu2, Cu2) {
  let Du2, Hu2, Iu2, Lu2, Eu2, Gu2, Mu2, Nu2, Fu2, Ou2, Ju2, Ku2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Hu2 = void 0;
      Iu2 = void 0;
      Du2 = Bu2.type;
      if (Du2 === _j) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Hu2 = Bu2.sup;
      Iu2 = Bu2.sub;
      Du2 = j(Bu2.base, Dj);
      Ou2 = true;
      Au2 = 3;
      continue;
    case 2:
      Du2 = j(Bu2, Dj);
      Ou2 = false;
      Au2 = 3;
      continue;
    case 3:
      Lu2 = Cu2.style;
      Bu2 = Lu2.size;
      if (Bu2 === g.DISPLAY.size) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Bu2 = !!Du2.symbol;
      Au2 = 6;
      continue;
    case 5:
      Bu2 = false;
      Au2 = 6;
      continue;
    case 6:
      if (Bu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Bu2 = !i.contains(Tb, Du2.name);
      Au2 = 9;
      continue;
    case 8:
      Bu2 = false;
      Au2 = 9;
      continue;
    case 9:
      if (Bu2) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 10:
      Fu2 = true;
      Au2 = 12;
      continue;
    case 11:
      Fu2 = false;
      Au2 = 12;
      continue;
    case 12:
      if (!!Du2.symbol) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 13:
      if (!!Fu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 14:
      if (!!Du2.body) {
        Au2 = 40;
      } else {
        Au2 = 41;
      }
      continue;
    case 15:
      if (m(Bu2, v)) {
        Au2 = 53;
      } else {
        Au2 = 52;
      }
      continue;
    case 16:
      Gu2 = "Size2-Regular";
      Au2 = 18;
      continue;
    case 17:
      Gu2 = ak;
      Au2 = 18;
      continue;
    case 18:
      Bu2 = Du2.name;
      if (Bu2 === pl) {
        Au2 = 20;
      } else {
        Au2 = 19;
      }
      continue;
    case 19:
      Bu2 = Du2.name;
      Bu2 = Bu2 === Jk;
      Au2 = 21;
      continue;
    case 20:
      Bu2 = true;
      Au2 = 21;
      continue;
    case 21:
      if (Bu2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 22:
      Eu2 = Du2.name.slice(1);
      if ("oiint" === Eu2) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 23:
      Eu2 = lh;
      Au2 = 24;
      continue;
    case 24:
      Bu2 = [];
      Bu2.push(ol);
      Bu2.push("op-symbol");
      if (!!Fu2) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 25:
      Bu2 = Aq;
      Au2 = 27;
      continue;
    case 26:
      Bu2 = xp;
      Au2 = 27;
      continue;
    case 27:
      Du2.name = Bu2;
      Au2 = 24;
      continue;
    case 28:
      Ju2 = "large-op";
      Au2 = 30;
      continue;
    case 29:
      Ju2 = "small-op";
      Au2 = 30;
      continue;
    case 30:
      Bu2.push(Ju2);
      Bu2 = a.makeSymbol(Du2.name, Gu2, tg, Cu2, Bu2);
      Gu2 = Eu2.length;
      if (Gu2 > 0) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 31:
      Mu2 = Bu2.italic;
      if (!!Fu2) {
        Au2 = 34;
      } else {
        Au2 = 35;
      }
      continue;
    case 32:
      Au2 = 33;
      continue;
    case 33:
      Au2 = 15;
      continue;
    case 34:
      Ju2 = "2";
      Au2 = 36;
      continue;
    case 35:
      Ju2 = mr;
      Au2 = 36;
      continue;
    case 36:
      Gu2 = a;
      Nu2 = Gu2.staticSvg(Eu2 + gt + Ju2, Cu2);
      Ju2 = {};
      Ju2.positionType = kg;
      Ku2 = [];
      Gu2 = {};
      Object.assign(Gu2, { type: Yf, elem: Bu2, shift: 0 });
      Ku2.push(Gu2);
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Nu2 });
      if (!!Fu2) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 37:
      Fu2 = 0.08;
      Au2 = 39;
      continue;
    case 38:
      Fu2 = 0;
      Au2 = 39;
      continue;
    case 39:
      Bu2.shift = Fu2;
      Ku2.push(Bu2);
      Ju2.children = Ku2;
      Bu2 = a.makeVList(Ju2, Cu2);
      Du2.name = Lm + Eu2;
      Bu2.classes.unshift(ol);
      Bu2.italic = Mu2;
      Au2 = 33;
      continue;
    case 40:
      Bu2 = h2.buildExpression(Du2.body, Cu2, true);
      Eu2 = Bu2.length;
      if (1 === Eu2) {
        Au2 = 43;
      } else {
        Au2 = 44;
      }
      continue;
    case 41:
      Eu2 = [];
      Bu2 = 1;
      Au2 = 49;
      continue;
    case 42:
      Au2 = 15;
      continue;
    case 43:
      Eu2 = m(Bu2[0], v);
      Au2 = 45;
      continue;
    case 44:
      Eu2 = false;
      Au2 = 45;
      continue;
    case 45:
      if (Eu2) {
        Au2 = 46;
      } else {
        Au2 = 47;
      }
      continue;
    case 46:
      Bu2 = Bu2[0];
      Bu2.classes[0] = ol;
      Au2 = 48;
      continue;
    case 47:
      Eu2 = [];
      Eu2.push(ol);
      Bu2 = a.makeSpan(Eu2, Bu2, Cu2);
      Au2 = 48;
      continue;
    case 48:
      Au2 = 42;
      continue;
    case 49:
      Fu2 = Du2.name;
      if (Bu2 < Fu2.length) {
        Au2 = 50;
      } else {
        Au2 = 51;
      }
      continue;
    case 50:
      Fu2 = a;
      Eu2.push(Fu2.mathsym(Du2.name[Bu2], Du2.mode, Cu2));
      Bu2 = Bu2 + 1;
      Au2 = 49;
      continue;
    case 51:
      Bu2 = [];
      Bu2.push(ol);
      Bu2 = a.makeSpan(Bu2, Eu2, Cu2);
      Au2 = 42;
      continue;
    case 52:
      Eu2 = Du2.name;
      Eu2 = Eu2 === pl;
      Au2 = 54;
      continue;
    case 53:
      Eu2 = true;
      Au2 = 54;
      continue;
    case 54:
      if (Eu2) {
        Au2 = 56;
      } else {
        Au2 = 55;
      }
      continue;
    case 55:
      Eu2 = Du2.name;
      Eu2 = Eu2 === Jk;
      Au2 = 57;
      continue;
    case 56:
      Eu2 = true;
      Au2 = 57;
      continue;
    case 57:
      if (Eu2) {
        Au2 = 58;
      } else {
        Au2 = 59;
      }
      continue;
    case 58:
      Eu2 = !Du2.suppressBaseShift;
      Au2 = 60;
      continue;
    case 59:
      Eu2 = false;
      Au2 = 60;
      continue;
    case 60:
      if (Eu2) {
        Au2 = 61;
      } else {
        Au2 = 62;
      }
      continue;
    case 61:
      Du2 = +Bu2.height;
      Du2 = +(Du2 - +Bu2.depth);
      Du2 = +(Du2 / 2);
      Eu2 = Du2 - +Cu2.fontMetrics().axisHeight;
      Fu2 = Bu2.italic;
      Au2 = 63;
      continue;
    case 62:
      Eu2 = 0;
      Fu2 = 0;
      Au2 = 63;
      continue;
    case 63:
      if (!!Ou2) {
        Au2 = 64;
      } else {
        Au2 = 65;
      }
      continue;
    case 64:
      Du2 = [];
      Du2.push(Bu2);
      Du2.push(Hu2);
      Du2.push(Iu2);
      Du2.push(Cu2);
      Du2.push(Lu2);
      Du2.push(Fu2);
      Du2.push(Eu2);
      return Sb.apply(void 0, Du2);
    case 65:
      if (!!Eu2) {
        Au2 = 66;
      } else {
        Au2 = 67;
      }
      continue;
    case 66:
      Cu2 = Bu2.style;
      Cu2.position = "relative";
      Cu2 = Bu2.style;
      Cu2.top = d(Eu2);
      Au2 = 68;
      continue;
    case 67:
      Au2 = 68;
      continue;
    case 68:
      return Bu2;
  }
}
function Ie(Bu2, Cu2) {
  let Du2, Eu2, Fu2, Gu2, Hu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Eu2 = void 0;
      Fu2 = void 0;
      Du2 = Bu2.type;
      if (Du2 === _j) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Eu2 = Bu2.sup;
      Fu2 = Bu2.sub;
      Bu2 = j(Bu2.base, Qg);
      Hu2 = true;
      Au2 = 3;
      continue;
    case 2:
      Bu2 = j(Bu2, Qg);
      Hu2 = false;
      Au2 = 3;
      continue;
    case 3:
      Du2 = Bu2.body;
      Du2 = Du2.length;
      if (Du2 > 0) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Bu2 = Bu2.body.map(Je);
      Du2 = h2.buildExpression(Bu2, Cu2.withFont(Gq), true);
      Bu2 = 0;
      Au2 = 7;
      continue;
    case 5:
      Bu2 = [];
      Bu2.push(ol);
      Du2 = a.makeSpan(Bu2, [], Cu2);
      Au2 = 6;
      continue;
    case 6:
      if (!!Hu2) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 7:
      if (Bu2 < Du2.length) {
        Au2 = 8;
      } else {
        Au2 = 9;
      }
      continue;
    case 8:
      Gu2 = Du2[Bu2];
      if (m(Gu2, v)) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 9:
      Bu2 = [];
      Bu2.push(ol);
      Du2 = a.makeSpan(Bu2, Du2, Cu2);
      Au2 = 6;
      continue;
    case 10:
      Gu2.text = Gu2.text.replace(new RegExp("\\u2212", lh), vq).replace(new RegExp("\\u2217", lh), lr);
      Au2 = 12;
      continue;
    case 11:
      Au2 = 12;
      continue;
    case 12:
      Bu2 = Bu2 + 1;
      Au2 = 7;
      continue;
    case 13:
      Bu2 = [];
      Bu2.push(Du2);
      Bu2.push(Eu2);
      Bu2.push(Fu2);
      Bu2.push(Cu2);
      Bu2.push(Cu2.style);
      Bu2.push(0);
      Bu2.push(0);
      return Sb.apply(void 0, Bu2);
    case 14:
      return Du2;
  }
}
function Je(Bu2) {
  let Du2, Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = Bu2.text;
      if (typeof Du2 === mh) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = {};
      Object.assign(Cu2, { type: bg, mode: Bu2.mode, text: Du2 });
      return Cu2;
    case 2:
      return Bu2;
  }
}
function Ke(Bu2, Cu2) {
  let Du2, Fu2, Eu2, Hu2, Gu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = f.buildExpression(Bu2.body, Cu2.withFont(Gq));
      Cu2 = true;
      Gu2 = 0;
      Au2 = 1;
      continue;
    case 1:
      if (Gu2 < Du2.length) {
        Au2 = 2;
      } else {
        Au2 = 3;
      }
      continue;
    case 2:
      Fu2 = Du2[Gu2];
      if (m(Fu2, b.SpaceNode)) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 3:
      if (!!Cu2) {
        Au2 = 34;
      } else {
        Au2 = 35;
      }
      continue;
    case 4:
      Au2 = 6;
      continue;
    case 5:
      if (m(Fu2, b.MathNode)) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 6:
      Gu2 = Gu2 + 1;
      Au2 = 1;
      continue;
    case 7:
      Eu2 = Fu2.type;
      if (Eu2 === Dl) {
        Au2 = 11;
      } else {
        Au2 = 10;
      }
      continue;
    case 8:
      Cu2 = false;
      Au2 = 9;
      continue;
    case 9:
      Au2 = 6;
      continue;
    case 10:
      Hu2 = Eu2 === hm;
      Au2 = 12;
      continue;
    case 11:
      Hu2 = true;
      Au2 = 12;
      continue;
    case 12:
      if (Hu2) {
        Au2 = 14;
      } else {
        Au2 = 13;
      }
      continue;
    case 13:
      Hu2 = "ms" === Eu2;
      Au2 = 15;
      continue;
    case 14:
      Hu2 = true;
      Au2 = 15;
      continue;
    case 15:
      if (Hu2) {
        Au2 = 17;
      } else {
        Au2 = 16;
      }
      continue;
    case 16:
      Hu2 = Eu2 === Mh;
      Au2 = 18;
      continue;
    case 17:
      Hu2 = true;
      Au2 = 18;
      continue;
    case 18:
      if (Hu2) {
        Au2 = 20;
      } else {
        Au2 = 19;
      }
      continue;
    case 19:
      Hu2 = Eu2 === Gk;
      Au2 = 21;
      continue;
    case 20:
      Hu2 = true;
      Au2 = 21;
      continue;
    case 21:
      if (Hu2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 22:
      Au2 = 24;
      continue;
    case 23:
      if (Eu2 === ki) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 24:
      Au2 = 9;
      continue;
    case 25:
      Eu2 = Fu2.children[0];
      Fu2 = Fu2.children;
      Fu2 = Fu2.length;
      if (1 === Fu2) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 26:
      Cu2 = false;
      Au2 = 27;
      continue;
    case 27:
      Au2 = 24;
      continue;
    case 28:
      Fu2 = m(Eu2, b.TextNode);
      Au2 = 30;
      continue;
    case 29:
      Fu2 = false;
      Au2 = 30;
      continue;
    case 30:
      if (Fu2) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 31:
      Eu2.text = Eu2.text.replace(new RegExp("\\u2212", lh), vq).replace(new RegExp("\\u2217", lh), lr);
      Au2 = 33;
      continue;
    case 32:
      Cu2 = false;
      Au2 = 33;
      continue;
    case 33:
      Au2 = 27;
      continue;
    case 34:
      Cu2 = Du2.map((Au3) => Au3.toText()).join(lh);
      Du2 = [];
      Du2.push(new b.TextNode(Cu2));
      Au2 = 36;
      continue;
    case 35:
      Au2 = 36;
      continue;
    case 36:
      Cu2 = new b.MathNode(Dl, Du2);
      Cu2.setAttribute(vi, Xk);
      Du2 = [];
      Du2.push(f.makeText("\u2061", yf));
      Du2 = new b.MathNode(ki, Du2);
      if (!!Bu2.parentIsSupSub) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 37:
      Bu2 = [];
      Bu2.push(Cu2);
      Bu2.push(Du2);
      return new b.MathNode(Fj, Bu2);
    case 38:
      Bu2 = [];
      Bu2.push(Cu2);
      Bu2.push(Du2);
      return b.newDocumentFragment(Bu2);
  }
}
function Le(Bu2, Cu2, Du2) {
  let Eu2, Fu2, Gu2, Hu2, Iu2, Ju2, Ku2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = h2.buildGroup(Cu2.body, Du2.havingCrampedStyle());
      Eu2 = Bu2.height;
      if (0 === Eu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2.height = Du2.fontMetrics().xHeight;
      Au2 = 3;
      continue;
    case 2:
      Au2 = 3;
      continue;
    case 3:
      Bu2 = a.wrapFragment(Bu2, Du2);
      Fu2 = Du2.fontMetrics().defaultRuleThickness;
      Eu2 = Du2.style;
      Eu2 = Eu2.id;
      if (Eu2 < g.TEXT.id) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Eu2 = Du2.fontMetrics().xHeight;
      Au2 = 6;
      continue;
    case 5:
      Eu2 = Fu2;
      Au2 = 6;
      continue;
    case 6:
      Eu2 = +Eu2;
      Eu2 = Fu2 + Eu2 / 4;
      Gu2 = Bu2.height;
      Fu2 = y.sqrtImage(Gu2 + Bu2.depth + Eu2 + Fu2, Du2);
      Gu2 = Fu2.span;
      Hu2 = Fu2.ruleWidth;
      Iu2 = Fu2.advanceWidth;
      Fu2 = +Gu2.height - +Hu2;
      Ju2 = Bu2.height;
      if (Fu2 > Ju2 + Bu2.depth + Eu2) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      Eu2 = +(Eu2 + Fu2);
      Eu2 = +(Eu2 - +Bu2.height);
      Eu2 = +(Eu2 - +Bu2.depth);
      Eu2 = Eu2 / 2;
      Au2 = 9;
      continue;
    case 8:
      Au2 = 9;
      continue;
    case 9:
      Fu2 = +Gu2.height;
      Ku2 = +(+(Fu2 - +Bu2.height) - +Eu2) - +Hu2;
      Eu2 = Bu2.style;
      Eu2.paddingLeft = d(Iu2);
      Iu2 = {};
      Iu2.positionType = Ug;
      Eu2 = [];
      Fu2 = {};
      Object.assign(Fu2, { type: Yf, elem: Bu2 });
      Ju2 = [];
      Ju2.push(ti);
      Fu2.wrapperClasses = Ju2;
      Eu2.push(Fu2);
      Fu2 = {};
      Fu2.type = kh;
      Ju2 = 0;
      Fu2.size = Ju2 - +(Bu2.height + Ku2);
      Eu2.push(Fu2);
      Bu2 = {};
      Object.assign(Bu2, { type: Yf, elem: Gu2 });
      Eu2.push(Bu2);
      Bu2 = {};
      Object.assign(Bu2, { type: kh, size: Hu2 });
      Eu2.push(Bu2);
      Iu2.children = Eu2;
      Bu2 = a.makeVList(Iu2, Du2);
      if (!Cu2.index) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 10:
      Cu2 = [];
      Cu2.push(wg);
      Cu2.push(Xn);
      Eu2 = [];
      Eu2.push(Bu2);
      return a.makeSpan(Cu2, Eu2, Du2);
    case 11:
      Eu2 = Du2.havingStyle(g.SCRIPTSCRIPT);
      Gu2 = h2.buildGroup(Cu2.index, Eu2, Du2);
      Cu2 = 0.6;
      Eu2 = +Bu2.height;
      Eu2 = Cu2 * +(Eu2 - +Bu2.depth);
      Cu2 = {};
      Object.assign(Cu2, { positionType: mg, positionData: 0 - +Eu2 });
      Fu2 = [];
      Eu2 = {};
      Object.assign(Eu2, { type: Yf, elem: Gu2 });
      Fu2.push(Eu2);
      Cu2.children = Fu2;
      Fu2 = a.makeVList(Cu2, Du2);
      Cu2 = [];
      Cu2.push(mt);
      Eu2 = [];
      Eu2.push(Fu2);
      Fu2 = a.makeSpan(Cu2, Eu2);
      Cu2 = [];
      Cu2.push(wg);
      Cu2.push(Xn);
      Eu2 = [];
      Eu2.push(Fu2);
      Eu2.push(Bu2);
      return a.makeSpan(Cu2, Eu2, Du2);
  }
}
function Me(Bu2, Cu2) {
  let Du2, Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = Bu2.base;
      if (!Du2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return null;
    case 2:
      Eu2 = Du2.type;
      if (Eu2 === Dj) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      Bu2 = Du2.limits;
      if (!!Bu2) {
        Au2 = 5;
      } else {
        Au2 = 6;
      }
      continue;
    case 4:
      Eu2 = Du2.type;
      if (Eu2 === Qg) {
        Au2 = 14;
      } else {
        Au2 = 15;
      }
      continue;
    case 5:
      Bu2 = Cu2.style;
      Bu2 = Bu2.size;
      Bu2 = Bu2 === g.DISPLAY.size;
      if (!Bu2) {
        Au2 = 8;
      } else {
        Au2 = 9;
      }
      continue;
    case 6:
      Au2 = 7;
      continue;
    case 7:
      if (!!Bu2) {
        Au2 = 11;
      } else {
        Au2 = 12;
      }
      continue;
    case 8:
      Bu2 = Du2.alwaysHandleSupSub;
      Au2 = 10;
      continue;
    case 9:
      Au2 = 10;
      continue;
    case 10:
      Au2 = 7;
      continue;
    case 11:
      Bu2 = sd.htmlBuilder;
      Au2 = 13;
      continue;
    case 12:
      Bu2 = null;
      Au2 = 13;
      continue;
    case 13:
      return Bu2;
    case 14:
      Bu2 = Du2.alwaysHandleSupSub;
      if (!!Bu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 15:
      Cu2 = Du2.type;
      if (Cu2 === li) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 16:
      Bu2 = Cu2.style;
      Bu2 = Bu2.size;
      Bu2 = Bu2 === g.DISPLAY.size;
      if (!Bu2) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 17:
      Au2 = 18;
      continue;
    case 18:
      if (!!Bu2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 19:
      Bu2 = Du2.limits;
      Au2 = 21;
      continue;
    case 20:
      Au2 = 21;
      continue;
    case 21:
      Au2 = 18;
      continue;
    case 22:
      Bu2 = td.htmlBuilder;
      Au2 = 24;
      continue;
    case 23:
      Bu2 = null;
      Au2 = 24;
      continue;
    case 24:
      return Bu2;
    case 25:
      if (!!i.isCharacterBox(Du2.base)) {
        Au2 = 27;
      } else {
        Au2 = 28;
      }
      continue;
    case 26:
      Cu2 = Du2.type;
      if (Cu2 === Ti) {
        Au2 = 30;
      } else {
        Au2 = 31;
      }
      continue;
    case 27:
      Bu2 = _c.htmlBuilder;
      Au2 = 29;
      continue;
    case 28:
      Bu2 = null;
      Au2 = 29;
      continue;
    case 29:
      return Bu2;
    case 30:
      Bu2 = !Bu2.sub;
      if (Bu2 === Du2.isOver) {
        Au2 = 32;
      } else {
        Au2 = 33;
      }
      continue;
    case 31:
      return null;
    case 32:
      Bu2 = pd.htmlBuilder;
      Au2 = 34;
      continue;
    case 33:
      Bu2 = null;
      Au2 = 34;
      continue;
    case 34:
      return Bu2;
  }
}
function Ne(Bu2, Cu2, Du2) {
  let Eu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = Za;
      if (l(Bu2, Cu2.text)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = Za;
      Bu2 = Bu2[Cu2.text];
      Bu2 = Bu2.className;
      if (!Bu2) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 2:
      Bu2 = Ya;
      if (l(Bu2, Cu2.text)) {
        Au2 = 8;
      } else {
        Au2 = 9;
      }
      continue;
    case 3:
      Bu2 = lh;
      Au2 = 5;
      continue;
    case 4:
      Au2 = 5;
      continue;
    case 5:
      Eu2 = Cu2.mode;
      if (Eu2 === yf) {
        Au2 = 6;
      } else {
        Au2 = 7;
      }
      continue;
    case 6:
      Cu2 = a.makeOrd(Cu2, Du2, bg);
      Du2 = Cu2.classes;
      Du2.push(Bu2);
      return Cu2;
    case 7:
      Eu2 = [];
      Eu2.push(Mh);
      Eu2.push(Bu2);
      Bu2 = [];
      Bu2.push(a.mathsym(Cu2.text, Cu2.mode, Du2));
      return a.makeSpan(Eu2, Bu2, Du2);
    case 8:
      Bu2 = [];
      Bu2.push(Mh);
      Eu2 = Ya;
      Bu2.push(Eu2[Cu2.text]);
      return a.makeSpan(Bu2, [], Du2);
    case 9:
      Bu2 = c;
      throw new Bu2(Gm + Cu2.text + pj);
  }
}
function Oe(Bu2, Cu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = Za;
      if (l(Bu2, Cu2.text)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = [];
      Bu2.push(new b.TextNode("\xA0"));
      Bu2 = new b.MathNode(Gk, Bu2);
      Au2 = 3;
      continue;
    case 2:
      Bu2 = Ya;
      if (l(Bu2, Cu2.text)) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 3:
      return Bu2;
    case 4:
      return new b.MathNode(Mh);
    case 5:
      Bu2 = c;
      throw new Bu2(Gm + Cu2.text + pj);
  }
}
function Pe(Bu2, Cu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (l(Bu2.current, Cu2)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2.current[Cu2];
    case 2:
      return Bu2.builtins[Cu2];
  }
}
function Qe(Bu2) {
  let Cu2, Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.consumeArgs(3);
      Bu2.consumeSpaces();
      Du2 = Bu2.future();
      Bu2 = Cu2[0];
      Bu2 = Bu2.length;
      if (1 === Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = Cu2[0][0];
      Bu2 = Bu2.text;
      Bu2 = Bu2 === Du2.text;
      Au2 = 3;
      continue;
    case 2:
      Bu2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Bu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      Bu2 = {};
      Object.assign(Bu2, { tokens: Cu2[1], numArgs: 0 });
      return Bu2;
    case 5:
      Bu2 = {};
      Object.assign(Bu2, { tokens: Cu2[2], numArgs: 0 });
      return Bu2;
  }
}
function Re(Bu2) {
  let Cu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Cu2 = Bu2.consumeArgs(2);
      Bu2 = Bu2.mode;
      if (Bu2 === yf) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = {};
      Object.assign(Bu2, { tokens: Cu2[0], numArgs: 0 });
      return Bu2;
    case 2:
      Bu2 = {};
      Object.assign(Bu2, { tokens: Cu2[1], numArgs: 0 });
      return Bu2;
  }
}
function Se(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = Bu2.future().text;
      if (Bu2 in ab) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return rn;
    case 2:
      return zp;
  }
}
function Te(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = Bu2.future().text;
      if (Bu2 in ab) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Bu2 = Bu2 !== at;
      Au2 = 3;
      continue;
    case 2:
      Bu2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Bu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      return rn;
    case 5:
      return zp;
  }
}
function Ue(Bu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = Bu2.future().text;
      if (Bu2 in ab) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return "\\@cdots\\,";
    case 2:
      return Ut;
  }
}
function Ve(Au2, Bu2) {
  var Eu2 = Bu2.consumeArg().tokens;
  var Iu2 = Bu2.consumeArg().tokens;
  var Fu2 = Bu2.consumeArg().tokens;
  var Gu2 = Bu2.consumeArg().tokens;
  var Cu2 = Bu2.macros;
  var Ju2 = Cu2.get(tm);
  var Ku2 = Bu2.macros.get(qp);
  Cu2 = Bu2.macros;
  Cu2.beginGroup();
  Cu2 = (Hu3) => (Gu3) => {
    !Au2 || (Gu3.macros.set(tm, Ju2), !Fu2.length || Gu3.macros.set(qp, Ku2));
    var $u2;
    if (!Hu3 && !!Fu2.length) {
      $u2 = Gu3.future().text;
      if ($u2 === tm) {
        Gu3.popToken();
        var _u2 = true, bv2;
      } else {
        _u2 = Hu3;
      }
    } else {
      _u2 = Hu3;
    }
    $u2 = {};
    bv2 = _u2 ? Fu2 : Iu2;
    Object.assign($u2, { tokens: bv2, numArgs: 0 });
    return $u2;
  };
  Bu2.macros.set(tm, Cu2(false));
  !Fu2.length || Bu2.macros.set(qp, Cu2(true));
  var Hu2 = Bu2.consumeArg().tokens;
  Cu2 = [];
  var Lu2 = Gu2.length | 0;
  var Du2 = 0;
  for (; Du2 < Lu2; ) {
    Cu2.push(Gu2[Du2]);
    Du2 = Du2 + 1;
  }
  Gu2 = Hu2.length | 0;
  Du2 = 0;
  for (; Du2 < Gu2; ) {
    Cu2.push(Hu2[Du2]);
    Du2 = Du2 + 1;
  }
  Gu2 = Eu2.length | 0;
  Du2 = 0;
  for (; Du2 < Gu2; ) {
    Cu2.push(Eu2[Du2]);
    Du2 = Du2 + 1;
  }
  Cu2 = Bu2.expandTokens(Cu2);
  Bu2 = Bu2.macros;
  Bu2.endGroup();
  Bu2 = {};
  Object.assign(Bu2, { tokens: Cu2.reverse(), numArgs: 0 });
  return Bu2;
}
function We(Bu2, Cu2) {
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Bu2 = Bu2.expandMacro(Cu2);
      if (!!Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2.map((Au3) => Au3.text).join(lh);
    case 2:
      return Bu2;
  }
}
function Xe(Bu2, Cu2) {
  let Du2, Gu2, Eu2, Fu2, Hu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Du2 = 0;
      Du2 = Du2 - 1;
      Eu2 = void 0;
      Fu2 = 0;
      Au2 = 1;
      continue;
    case 1:
      if (Fu2 < Cu2.length) {
        Au2 = 2;
      } else {
        Au2 = 3;
      }
      continue;
    case 2:
      Gu2 = Cu2[Fu2];
      Gu2 = Gu2.type;
      if (Gu2 === Fk) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 3:
      Fu2 = 0;
      if (Du2 !== Fu2 - 1) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 4:
      Eu2 = 0;
      if (Du2 !== Eu2 - 1) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 5:
      Au2 = 6;
      continue;
    case 6:
      Fu2 = Fu2 + 1;
      Au2 = 1;
      continue;
    case 7:
      Bu2 = c;
      Cu2 = Cu2[Fu2];
      throw new Bu2("only one infix operator per group", Cu2.token);
    case 8:
      Au2 = 9;
      continue;
    case 9:
      Du2 = Cu2[Fu2];
      Eu2 = Du2.replaceWith;
      Du2 = Fu2;
      Au2 = 6;
      continue;
    case 10:
      Fu2 = !!Eu2;
      Au2 = 12;
      continue;
    case 11:
      Fu2 = false;
      Au2 = 12;
      continue;
    case 12:
      if (Fu2) {
        Au2 = 13;
      } else {
        Au2 = 14;
      }
      continue;
    case 13:
      Gu2 = Cu2.slice(0, Du2);
      Hu2 = Cu2.slice(Du2 + 1);
      if (1 === Gu2.length) {
        Au2 = 15;
      } else {
        Au2 = 16;
      }
      continue;
    case 14:
      return Cu2;
    case 15:
      Fu2 = Gu2[0];
      Fu2 = Fu2.type;
      Fu2 = Fu2 === Xf;
      Au2 = 17;
      continue;
    case 16:
      Fu2 = false;
      Au2 = 17;
      continue;
    case 17:
      if (Fu2) {
        Au2 = 18;
      } else {
        Au2 = 19;
      }
      continue;
    case 18:
      Fu2 = Gu2[0];
      Au2 = 20;
      continue;
    case 19:
      Fu2 = {};
      Object.assign(Fu2, { type: Xf, mode: Bu2.mode, body: Gu2 });
      Au2 = 20;
      continue;
    case 20:
      Gu2 = Hu2.length;
      if (1 === Gu2) {
        Au2 = 21;
      } else {
        Au2 = 22;
      }
      continue;
    case 21:
      Gu2 = Hu2[0];
      Gu2 = Gu2.type;
      Gu2 = Gu2 === Xf;
      Au2 = 23;
      continue;
    case 22:
      Gu2 = false;
      Au2 = 23;
      continue;
    case 23:
      if (Gu2) {
        Au2 = 24;
      } else {
        Au2 = 25;
      }
      continue;
    case 24:
      Gu2 = Hu2[0];
      Au2 = 26;
      continue;
    case 25:
      Gu2 = {};
      Object.assign(Gu2, { type: Xf, mode: Bu2.mode, body: Hu2 });
      Au2 = 26;
      continue;
    case 26:
      if (Eu2 === cm) {
        Au2 = 27;
      } else {
        Au2 = 28;
      }
      continue;
    case 27:
      Hu2 = [];
      Hu2.push(Fu2);
      Hu2.push(Cu2[Du2]);
      Hu2.push(Gu2);
      Bu2 = Bu2.callFunction(Eu2, Hu2, []);
      Au2 = 29;
      continue;
    case 28:
      Cu2 = [];
      Cu2.push(Fu2);
      Cu2.push(Gu2);
      Bu2 = Bu2.callFunction(Eu2, Cu2, []);
      Au2 = 29;
      continue;
    case 29:
      Cu2 = [];
      Cu2.push(Bu2);
      return Cu2;
  }
}
function Ye(Bu2, Cu2) {
  let Eu2, Fu2, Gu2, Du2, Hu2, Iu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Eu2 = Bu2.parseGroup(gj, Cu2);
      Cu2 = void 0;
      if (!(Eu2 == null)) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = Eu2.type;
      Au2 = 3;
      continue;
    case 2:
      Au2 = 3;
      continue;
    case 3:
      if (Cu2 === Vh) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      return Eu2;
    case 5:
      Au2 = 6;
      continue;
    case 6:
      Cu2 = Bu2.mode;
      if (Cu2 === yf) {
        Au2 = 7;
      } else {
        Au2 = 8;
      }
      continue;
    case 7:
      return Eu2;
    case 8:
      Au2 = 9;
      continue;
    case 9:
      Cu2 = void 0;
      Du2 = void 0;
      Au2 = 10;
      continue;
    case 10:
      if (true) {
        Au2 = 11;
      } else {
        Au2 = 12;
      }
      continue;
    case 11:
      Bu2.consumeSpaces();
      Fu2 = Bu2.fetch();
      Gu2 = Fu2.text;
      if (Gu2 === jm) {
        Au2 = 14;
      } else {
        Au2 = 13;
      }
      continue;
    case 12:
      if (!!Cu2) {
        Au2 = 74;
      } else {
        Au2 = 73;
      }
      continue;
    case 13:
      Gu2 = Fu2.text;
      Gu2 = Gu2 === Hs;
      Au2 = 15;
      continue;
    case 14:
      Gu2 = true;
      Au2 = 15;
      continue;
    case 15:
      if (Gu2) {
        Au2 = 16;
      } else {
        Au2 = 17;
      }
      continue;
    case 16:
      if (!!Eu2) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 17:
      Gu2 = Fu2.text;
      if ("^" === Gu2) {
        Au2 = 34;
      } else {
        Au2 = 35;
      }
      continue;
    case 18:
      Au2 = 10;
      continue;
    case 19:
      Gu2 = Eu2.type;
      Gu2 = Gu2 === Dj;
      Au2 = 21;
      continue;
    case 20:
      Gu2 = false;
      Au2 = 21;
      continue;
    case 21:
      if (Gu2) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 22:
      Fu2 = Fu2.text;
      Object.assign(Eu2, { limits: Fu2 === jm, alwaysHandleSupSub: true });
      Au2 = 24;
      continue;
    case 23:
      if (!!Eu2) {
        Au2 = 25;
      } else {
        Au2 = 26;
      }
      continue;
    case 24:
      Bu2.consume();
      Au2 = 18;
      continue;
    case 25:
      Gu2 = Eu2.type;
      Gu2 = Gu2 === Qg;
      Au2 = 27;
      continue;
    case 26:
      Gu2 = false;
      Au2 = 27;
      continue;
    case 27:
      if (Gu2) {
        Au2 = 28;
      } else {
        Au2 = 29;
      }
      continue;
    case 28:
      if (!!Eu2.alwaysHandleSupSub) {
        Au2 = 31;
      } else {
        Au2 = 32;
      }
      continue;
    case 29:
      throw new c("Limit controls must follow a math operator", Fu2);
    case 30:
      Au2 = 24;
      continue;
    case 31:
      Fu2 = Fu2.text;
      Eu2.limits = Fu2 === jm;
      Au2 = 33;
      continue;
    case 32:
      Au2 = 33;
      continue;
    case 33:
      Au2 = 30;
      continue;
    case 34:
      if (!!Cu2) {
        Au2 = 37;
      } else {
        Au2 = 38;
      }
      continue;
    case 35:
      Gu2 = Fu2.text;
      if ("_" === Gu2) {
        Au2 = 40;
      } else {
        Au2 = 41;
      }
      continue;
    case 36:
      Au2 = 18;
      continue;
    case 37:
      throw new c(ho, Fu2);
    case 38:
      Au2 = 39;
      continue;
    case 39:
      Cu2 = Bu2.handleSupSubscript(os);
      Au2 = 36;
      continue;
    case 40:
      if (!!Du2) {
        Au2 = 43;
      } else {
        Au2 = 44;
      }
      continue;
    case 41:
      Gu2 = Fu2.text;
      if (Gu2 === Cj) {
        Au2 = 46;
      } else {
        Au2 = 47;
      }
      continue;
    case 42:
      Au2 = 36;
      continue;
    case 43:
      throw new c("Double subscript", Fu2);
    case 44:
      Au2 = 45;
      continue;
    case 45:
      Du2 = Bu2.handleSupSubscript("subscript");
      Au2 = 42;
      continue;
    case 46:
      if (!!Cu2) {
        Au2 = 49;
      } else {
        Au2 = 50;
      }
      continue;
    case 47:
      Gu2 = va;
      if (!!Gu2[Fu2.text]) {
        Au2 = 58;
      } else {
        Au2 = 59;
      }
      continue;
    case 48:
      Au2 = 42;
      continue;
    case 49:
      throw new c(ho, Fu2);
    case 50:
      Au2 = 51;
      continue;
    case 51:
      Cu2 = {};
      Object.assign(Cu2, { type: bg, mode: Bu2.mode, text: Ap });
      Fu2 = [];
      Fu2.push(Cu2);
      Bu2.consume();
      Au2 = 52;
      continue;
    case 52:
      Gu2 = Bu2.fetch().text;
      if (Gu2 === Cj) {
        Au2 = 53;
      } else {
        Au2 = 54;
      }
      continue;
    case 53:
      Fu2.push(Cu2);
      Bu2.consume();
      Au2 = 52;
      continue;
    case 54:
      Cu2 = Bu2.fetch().text;
      if ("^" === Cu2) {
        Au2 = 55;
      } else {
        Au2 = 56;
      }
      continue;
    case 55:
      Fu2.push(Bu2.handleSupSubscript(os));
      Au2 = 57;
      continue;
    case 56:
      Au2 = 57;
      continue;
    case 57:
      Cu2 = {};
      Object.assign(Cu2, { type: Xf, mode: Bu2.mode, body: Fu2 });
      Au2 = 48;
      continue;
    case 58:
      Hu2 = dc.test(Fu2.text);
      Gu2 = [];
      Iu2 = D;
      Gu2.push(new Iu2(va[Fu2.text]));
      Bu2.consume();
      Au2 = 61;
      continue;
    case 59:
      Au2 = 12;
      continue;
    case 60:
      Au2 = 48;
      continue;
    case 61:
      if (true) {
        Au2 = 62;
      } else {
        Au2 = 63;
      }
      continue;
    case 62:
      Fu2 = Bu2.fetch().text;
      if (!va[Fu2]) {
        Au2 = 64;
      } else {
        Au2 = 65;
      }
      continue;
    case 63:
      Fu2 = Bu2.subparse(Gu2);
      if (!!Hu2) {
        Au2 = 70;
      } else {
        Au2 = 71;
      }
      continue;
    case 64:
      Au2 = 63;
      continue;
    case 65:
      Au2 = 66;
      continue;
    case 66:
      if (dc.test(Fu2) !== Hu2) {
        Au2 = 67;
      } else {
        Au2 = 68;
      }
      continue;
    case 67:
      Au2 = 63;
      continue;
    case 68:
      Au2 = 69;
      continue;
    case 69:
      Gu2.unshift(new D(va[Fu2]));
      Bu2.consume();
      Au2 = 61;
      continue;
    case 70:
      Du2 = {};
      Object.assign(Du2, { type: Xf, mode: tg, body: Fu2 });
      Au2 = 72;
      continue;
    case 71:
      Cu2 = {};
      Object.assign(Cu2, { type: Xf, mode: tg, body: Fu2 });
      Au2 = 72;
      continue;
    case 72:
      Au2 = 60;
      continue;
    case 73:
      Fu2 = !!Du2;
      Au2 = 75;
      continue;
    case 74:
      Fu2 = true;
      Au2 = 75;
      continue;
    case 75:
      if (Fu2) {
        Au2 = 76;
      } else {
        Au2 = 77;
      }
      continue;
    case 76:
      Fu2 = {};
      Object.assign(Fu2, { type: _j, mode: Bu2.mode, base: Eu2, sup: Cu2, sub: Du2 });
      return Fu2;
    case 77:
      return Eu2;
  }
}
function Ze(Bu2, Cu2) {
  let Eu2, Fu2, Gu2, Hu2, Iu2, Du2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      Eu2 = Cu2[0];
      Fu2 = Cu2[1];
      Gu2 = Cu2[2];
      Hu2 = Cu2[3];
      Iu2 = Cu2[4];
      Du2 = {};
      Object.assign(Du2, { funcName: Eu2, parser: Bu2, token: Hu2, breakOnTokenText: Iu2 });
      Bu2 = R[Eu2];
      if (!!Bu2) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      Cu2 = !!Bu2.handler;
      Au2 = 3;
      continue;
    case 2:
      Cu2 = false;
      Au2 = 3;
      continue;
    case 3:
      if (Cu2) {
        Au2 = 4;
      } else {
        Au2 = 5;
      }
      continue;
    case 4:
      return Bu2.handler(Du2, Fu2, Gu2);
    case 5:
      throw new c("No function handler for " + Eu2);
  }
}
function _e(Bu2, Cu2, Du2, Eu2) {
  let Fu2;
  let Au2 = 0;
  for (; ; ) switch (Au2) {
    case 0:
      if (Du2 === Lg) {
        Au2 = 1;
      } else {
        Au2 = 2;
      }
      continue;
    case 1:
      return Bu2.parseColorGroup(Eu2);
    case 2:
      if (Du2 === Of) {
        Au2 = 3;
      } else {
        Au2 = 4;
      }
      continue;
    case 3:
      return Bu2.parseSizeGroup(Eu2);
    case 4:
      if (Du2 === Ck) {
        Au2 = 5;
      } else {
        Au2 = 6;
      }
      continue;
    case 5:
      return Bu2.parseUrlGroup(Eu2);
    case 6:
      if (Du2 === tg) {
        Au2 = 8;
      } else {
        Au2 = 7;
      }
      continue;
    case 7:
      Fu2 = Du2 === yf;
      Au2 = 9;
      continue;
    case 8:
      Fu2 = true;
      Au2 = 9;
      continue;
    case 9:
      if (Fu2) {
        Au2 = 10;
      } else {
        Au2 = 11;
      }
      continue;
    case 10:
      return Bu2.parseArgumentGroup(Eu2, Du2);
    case 11:
      if (Du2 === kt) {
        Au2 = 12;
      } else {
        Au2 = 13;
      }
      continue;
    case 12:
      Cu2 = Bu2.parseArgumentGroup(Eu2, yf);
      if (!(Cu2 == null)) {
        Au2 = 14;
      } else {
        Au2 = 15;
      }
      continue;
    case 13:
      if (Du2 === Rn) {
        Au2 = 17;
      } else {
        Au2 = 18;
      }
      continue;
    case 14:
      Bu2 = {};
      Object.assign(Bu2, { type: Sh, mode: Cu2.mode });
      Du2 = [];
      Du2.push(Cu2);
      Object.assign(Bu2, { body: Du2, style: yf });
      Au2 = 16;
      continue;
    case 15:
      Bu2 = null;
      Au2 = 16;
      continue;
    case 16:
      return Bu2;
    case 17:
      Cu2 = Bu2.parseStringGroup(Rn, Eu2);
      if (!(Cu2 == null)) {
        Au2 = 19;
      } else {
        Au2 = 20;
      }
      continue;
    case 18:
      if (Du2 === jj) {
        Au2 = 22;
      } else {
        Au2 = 23;
      }
      continue;
    case 19:
      Bu2 = {};
      Object.assign(Bu2, { type: Rn, mode: yf, string: Cu2.text });
      Au2 = 21;
      continue;
    case 20:
      Bu2 = null;
      Au2 = 21;
      continue;
    case 21:
      return Bu2;
    case 22:
      if (!!Eu2) {
        Au2 = 24;
      } else {
        Au2 = 25;
      }
      continue;
    case 23:
      if (Du2 === pu) {
        Au2 = 31;
      } else {
        Au2 = 30;
      }
      continue;
    case 24:
      throw new c("A primitive argument cannot be optional");
    case 25:
      Au2 = 26;
      continue;
    case 26:
      Du2 = Bu2.parseGroup(Cu2);
      if (Du2 == null) {
        Au2 = 27;
      } else {
        Au2 = 28;
      }
      continue;
    case 27:
      throw new c("Expected group as " + Cu2, Bu2.fetch());
    case 28:
      Au2 = 29;
      continue;
    case 29:
      return Du2;
    case 30:
      Fu2 = null === Du2;
      Au2 = 32;
      continue;
    case 31:
      Fu2 = true;
      Au2 = 32;
      continue;
    case 32:
      if (Fu2) {
        Au2 = 34;
      } else {
        Au2 = 33;
      }
      continue;
    case 33:
      Fu2 = Du2 === void 0;
      Au2 = 35;
      continue;
    case 34:
      Fu2 = true;
      Au2 = 35;
      continue;
    case 35:
      if (Fu2) {
        Au2 = 36;
      } else {
        Au2 = 37;
      }
      continue;
    case 36:
      return Bu2.parseArgumentGroup(Eu2);
    case 37:
      throw new c("Unknown group type as " + Cu2, Bu2.fetch());
  }
}
var A = void 0;
A = (0, function(Cu2, Du2, Bu2) {
  this.lexer = Cu2;
  this.start = Du2;
  this.end = Bu2;
  return this;
});
A.range = Td;
var D = void 0;
D = (0, function(Cu2, Bu2) {
  this.text = Cu2;
  this.loc = Bu2;
  return this;
});
var Au = D.prototype;
Au.range = function(Bu2, Cu2) {
  return new D(Cu2, A.range(this, Bu2));
};
var c = void 0;
c = (0, function() {
  var Fu2 = arguments[0];
  var Bu2 = arguments[1];
  var Eu2 = "KaTeX parse error: " + Fu2;
  var Au2 = void 0;
  var Cu2 = void 0;
  !Bu2 || (Bu2 = Bu2.loc);
  if (Bu2) {
    var Du2 = Bu2.start;
    Du2 = Du2 <= Bu2.end;
  } else {
    Du2 = false;
  }
  if (Du2) {
    Au2 = Bu2.lexer;
    Du2 = Au2.input;
    Au2 = Bu2.start;
    Cu2 = Bu2.end;
    Bu2 = Au2 === Du2.length ? Eu2 + " at end of input: " : Eu2 + (" at position " + (Au2 + 1) + ": ");
    var Gu2 = Du2.slice(Au2, Cu2).replace(new RegExp("[^]", nr), "$&\u0332");
    Au2 > 15 ? (Eu2 = +Au2, Eu2 = "\u2026" + Du2.slice(Eu2 - 15, Au2)) : Eu2 = Du2.slice(0, Au2);
    var Hu2 = Cu2 + 15;
    Du2 = Hu2 < Du2.length ? Du2.slice(Cu2, Cu2 + 15) + "\u2026" : Du2.slice(Cu2);
    Eu2 = Bu2 + (Eu2 + Gu2 + Du2);
  }
  Du2 = t(Eu2 + "");
  Du2.name = "ParseError";
  Du2["__proto__"] = c.prototype;
  Du2.position = Au2;
  !(Au2 == null) && !(Cu2 == null) && (Du2.length = +Cu2 - +Au2);
  Du2.rawMessage = Fu2;
  return Du2;
});
Au = c.prototype;
Au["__proto__"] = Error.prototype;
var ec = void 0;
var fc = void 0;
var gc = void 0;
var Z = void 0;
var hc = void 0;
ec = new RegExp("([A-Z])", nr);
Au = {};
Object.assign(Au, { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" });
fc = Au;
gc = new RegExp(`[&><"']`, nr);
Z = Ud;
hc = (Au2) => {
  if (!Au2) throw t("Expected non-null, but got " + Au2);
  return Au2;
};
Au = {};
Object.assign(Au, { contains: (Au2, Bu2) => {
  Au2 = Au2.indexOf(Bu2);
  Bu2 = 0;
  return Au2 !== Bu2 - 1;
}, deflt: (Au2, Bu2) => {
  Au2 === void 0 && (Au2 = Bu2);
  return Au2;
}, escape: (Au2) => Au2.replace(gc, (Au3) => fc[Au3]), hyphenate: (Au2) => Au2.replace(ec, "-$1").toLowerCase(), getBaseElem: Z, isCharacterBox: (Au2) => {
  var Bu2 = Z(Au2);
  Au2 = Bu2.type;
  Au2 = Au2 === lk;
  Au2 || (Au2 = Bu2.type, Au2 = Au2 === bg);
  Au2 || (Au2 = Bu2.type, Au2 = Au2 === gj);
  return Au2;
}, protocolFromUrl: (Au2) => {
  var Bu2 = new RegExp("^[\\x00-\\x20]*([^\\\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)", "i");
  Au2 = Bu2.exec(Au2);
  if (!Au2) return "_relative";
  Bu2 = Au2[2];
  if (Bu2 !== op) return null;
  if (!new RegExp("^[a-zA-Z][a-zA-Z0-9+\\-.]*$", lh).test(Au2[1])) return null;
  Au2 = Au2[1];
  return Au2.toLowerCase();
} });
var i = void 0;
i = Au;
var ya = void 0;
var ic = void 0;
var ca = void 0;
Au = {};
var Bu = {};
var Cu = "boolean";
Object.assign(Bu, { type: Cu, description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.", cli: "-d, --display-mode" });
Au.displayMode = Bu;
Bu = {};
var Eu = {};
var Du = [];
Du.push("htmlAndMathml");
Du.push(El);
Du.push(Cn);
Eu.enum = Du;
Object.assign(Bu, { type: Eu, description: "Determines the markup language of the output.", cli: "-F, --format <type>" });
Au.output = Bu;
Bu = {};
Object.assign(Bu, { type: Cu, description: "Render display math in leqno style (left-justified tags)." });
Au.leqno = Bu;
Bu = {};
Object.assign(Bu, { type: Cu, description: "Render display math flush left." });
Au.fleqn = Bu;
Du = {};
Du.type = Cu;
Bu = true;
Object.assign(Du, { default: Bu, cli: "-t, --no-throw-on-error", cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error." });
Au.throwOnError = Du;
Du = {};
Object.assign(Du, { type: mh, default: "#cc0000", cli: "-c, --error-color <color>", cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.", cliProcessor: (Au2) => uq + Au2 });
Au.errorColor = Du;
Du = {};
Object.assign(Du, { type: am, cli: "-m, --macro <def>", cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).", cliDefault: [], cliProcessor: (Au2, Bu2) => {
  Bu2.push(Au2);
  return Bu2;
} });
Au.macros = Du;
Du = {};
Object.assign(Du, { type: Ag, description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.", processor: (Au2) => Math.max(0, Au2), cli: "--min-rule-thickness <size>", cliProcessor: parseFloat });
Au.minRuleThickness = Du;
Du = {};
Object.assign(Du, { type: Cu, description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.", cli: "-b, --color-is-text-color" });
Au.colorIsTextColor = Du;
Du = {};
Eu = [];
var Gu = {};
var Fu = [];
Fu.push(iq);
Fu.push(An);
Fu.push(Qm);
Gu.enum = Fu;
Eu.push(Gu);
Eu.push(Cu);
Eu.push(Zi);
Object.assign(Du, { type: Eu, description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.", cli: "-S, --strict", cliDefault: false });
Au.strict = Du;
Du = {};
Eu = [];
Eu.push(Cu);
Eu.push(Zi);
Object.assign(Du, { type: Eu, description: "Trust the input, enabling all HTML features such as \\url.", cli: "-T, --trust" });
Au.trust = Du;
Du = {};
Object.assign(Du, { type: Ag, default: Infinity, description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large", processor: (Au2) => Math.max(0, Au2), cli: "-s, --max-size <n>", cliProcessor: parseInt });
Au.maxSize = Du;
Du = {};
Object.assign(Du, { type: Ag, default: yu, description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.", processor: (Au2) => Math.max(0, Au2), cli: "-e, --max-expand <n>", cliProcessor: (Au2) => {
  Au2 = "Infinity" === Au2 ? Infinity : parseInt(Au2);
  return Au2;
} });
Au.maxExpand = Du;
Du = {};
Object.assign(Du, { type: Cu, cli: false });
Au.globalGroup = Du;
ya = Au;
ic = (Au2) => {
  if (Au2.default) return Au2.default;
  Au2 = Au2.type;
  Array.isArray(Au2) && (Au2 = Au2[0]);
  if (typeof Au2 !== mh) return Au2.enum[0];
  if ("boolean" === Au2) {
    return false;
  } else {
    if (Au2 === mh) {
      return lh;
    } else {
      if (Au2 === Ag) {
        return 0;
      } else {
        if (Au2 === am) return {};
      }
    }
  }
};
ca = (0, function() {
  var Cu2 = arguments[0];
  Cu2 = Cu2 || {};
  var Fu2 = u(ya);
  var Hu2 = Fu2.length | 0;
  var Eu2 = 0, Bu2, Du2, Gu2;
  while (Eu2 < Hu2) {
    Bu2 = Fu2[Eu2];
    l(ya, Bu2) && (Du2 = ya[Bu2], Gu2 = Cu2[Bu2], Du2 = Gu2 !== void 0 ? Du2.processor ? Du2.processor(Cu2[Bu2]) : Cu2[Bu2] : ic(Du2), this[Bu2] = Du2);
    Eu2 = Eu2 + 1;
  }
  return this;
});
Au = ca.prototype;
Au.reportNonstrict = function(Bu2, Cu2, Du2) {
  var Au2 = this.strict;
  typeof Au2 === Zi && (Au2 = Au2(Bu2, Cu2, Du2));
  if (!Au2 || Au2 === An) {
    return;
  } else {
    if (true === Au2 || Au2 === Qm) {
      Au2 = c;
      throw new Au2("LaTeX-incompatible input and strict mode is set to 'error': " + (Cu2 + pr + Bu2 + "" + Km), Du2);
    } else {
      Au2 === iq ? !(typeof globalThis.console !== tk) || wa(yi + (Cu2 + pr + Bu2 + "" + Km)) : !(typeof globalThis.console !== tk) || wa(fj + (sq + Au2 + "': " + Cu2 + pr + Bu2 + Km));
    }
  }
};
Au = ca.prototype;
Au.useStrictBehavior = function(Bu2, Cu2, Du2) {
  var tv = this.strict;
  if (typeof tv === Zi) try {
    tv = tv(Bu2, Cu2, Du2);
  } catch {
    tv = Qm;
  }
  if (!tv || tv === An) {
    return false;
  } else {
    if (true === tv || tv === Qm) {
      return true;
    } else {
      if (tv === iq) {
        !(typeof globalThis.console !== tk) || wa(yi + (Cu2 + pr + Bu2 + "" + Km));
        return false;
      } else {
        !(typeof globalThis.console !== tk) || wa(fj + (sq + tv + "': " + Cu2 + pr + Bu2 + Km));
        return false;
      }
    }
  }
};
Au = ca.prototype;
Au.isTrusted = function(Bu2) {
  var Cu2;
  if (Bu2.url && !Bu2.protocol) {
    Cu2 = i.protocolFromUrl(Bu2.url);
    if (Cu2 == null) return false;
    Bu2.protocol = Cu2;
  }
  var Au2 = typeof this.trust === Zi ? this.trust(Bu2) : this.trust;
  return !!Au2;
};
var g = void 0;
var H = void 0;
var jc = void 0;
var kc = void 0;
var lc = void 0;
var mc = void 0;
var nc = void 0;
var oc = void 0;
g = (0, function(Cu2, Du2, Bu2) {
  this.id = Cu2;
  this.size = Du2;
  this.cramped = Bu2;
  return this;
});
Au = g.prototype;
Au.sup = function() {
  let Bu2 = H, Cu2 = jc;
  return Bu2[Cu2[this.id]];
};
Au = g.prototype;
Au.sub = function() {
  let Bu2 = H, Cu2 = kc;
  return Bu2[Cu2[this.id]];
};
Au = g.prototype;
Au.fracNum = function() {
  let Bu2 = H, Cu2 = lc;
  return Bu2[Cu2[this.id]];
};
Au = g.prototype;
Au.fracDen = function() {
  let Bu2 = H, Cu2 = mc;
  return Bu2[Cu2[this.id]];
};
Au = g.prototype;
Au.cramp = function() {
  let Bu2 = H, Cu2 = nc;
  return Bu2[Cu2[this.id]];
};
Au = g.prototype;
Au.text = function() {
  let Bu2 = H, Cu2 = oc;
  return Bu2[Cu2[this.id]];
};
Au = g.prototype;
Au.isTight = function() {
  let Au2 = this.size;
  return Au2 >= 2;
};
Au = [];
Au.push(new g(0, 0, false));
Au.push(new g(1, 0, Bu));
Au.push(new g(2, 1, false));
Au.push(new g(3, 1, Bu));
Au.push(new g(4, 2, false));
Au.push(new g(5, 2, Bu));
Au.push(new g(6, 3, false));
Au.push(new g(7, 3, Bu));
H = Au;
Au = [];
Au.push(4);
Au.push(5);
Au.push(4);
Au.push(5);
Au.push(6);
Au.push(7);
Au.push(6);
Au.push(7);
jc = Au;
Au = [];
Au.push(5);
Au.push(5);
Au.push(5);
Au.push(5);
Au.push(7);
Au.push(7);
Au.push(7);
Au.push(7);
kc = Au;
Au = [];
Au.push(2);
Au.push(3);
Au.push(4);
Au.push(5);
Au.push(6);
Au.push(7);
Au.push(6);
Au.push(7);
lc = Au;
Au = [];
Au.push(3);
Au.push(3);
Au.push(5);
Au.push(5);
Au.push(7);
Au.push(7);
Au.push(7);
Au.push(7);
mc = Au;
Au = [];
Au.push(1);
Au.push(1);
Au.push(3);
Au.push(3);
Au.push(5);
Au.push(5);
Au.push(7);
Au.push(7);
nc = Au;
Au = [];
Au.push(0);
Au.push(1);
Au.push(2);
Au.push(3);
Au.push(2);
Au.push(3);
Au.push(2);
Au.push(3);
oc = Au;
Au = {};
Object.assign(Au, { DISPLAY: H[0], TEXT: H[2], SCRIPT: H[4], SCRIPTSCRIPT: H[6] });
g = Au;
var za = void 0;
var pc = void 0;
var da = void 0;
var bb = void 0;
Au = [];
Cu = {};
Cu.name = "latin";
Du = [];
Eu = [];
Eu.push(256);
Eu.push(591);
Du.push(Eu);
Eu = [];
Eu.push(768);
Eu.push(879);
Du.push(Eu);
Cu.blocks = Du;
Au.push(Cu);
Cu = {};
Cu.name = "cyrillic";
Eu = [];
Du = [];
Du.push(1024);
Du.push(1279);
Eu.push(Du);
Cu.blocks = Eu;
Au.push(Cu);
Cu = {};
Cu.name = "armenian";
Eu = [];
Du = [];
Du.push(1328);
Du.push(1423);
Eu.push(Du);
Cu.blocks = Eu;
Au.push(Cu);
Cu = {};
Cu.name = "brahmic";
Eu = [];
Du = [];
Du.push(2304);
Du.push(4255);
Eu.push(Du);
Cu.blocks = Eu;
Au.push(Cu);
Cu = {};
Cu.name = "georgian";
Eu = [];
Du = [];
Du.push(4256);
Du.push(4351);
Eu.push(Du);
Cu.blocks = Eu;
Au.push(Cu);
Du = {};
Du.name = "cjk";
Cu = [];
Eu = [];
Eu.push(12288);
Eu.push(12543);
Cu.push(Eu);
Eu = [];
Eu.push(19968);
Eu.push(40879);
Cu.push(Eu);
Eu = [];
Eu.push(65280);
Eu.push(65376);
Cu.push(Eu);
Du.blocks = Cu;
Au.push(Du);
Cu = {};
Cu.name = "hangul";
Eu = [];
Du = [];
Du.push(44032);
Du.push(55215);
Eu.push(Du);
Cu.blocks = Eu;
Au.push(Cu);
za = Au;
pc = (Au2) => {
  var Cu2 = 0, Du2, Eu2, Bu2;
  while (Cu2 < za.length) {
    Du2 = za[Cu2];
    Bu2 = 0;
    for (; ; ) {
      Eu2 = Du2.blocks;
      if (Bu2 >= Eu2.length) {
        break;
      }
      Eu2 = Du2.blocks[Bu2];
      if (Au2 >= Eu2[0] && Au2 <= Eu2[1]) return Du2.name;
      Bu2 = Bu2 + 1;
    }
    Cu2 = Cu2 + 1;
  }
  return null;
};
da = [];
za.forEach((Au2) => Au2.blocks.forEach((Au3) => {
  X(da, Au3);
}));
bb = (Au2) => {
  var Bu2 = 0, Cu2;
  while (Bu2 < da.length) {
    Au2 >= da[Bu2] ? (Cu2 = da, Cu2 = Au2 <= Cu2[Bu2 + 1]) : Cu2 = false;
    if (Cu2) return true;
    Bu2 = Bu2 + 2;
  }
  return false;
};
var T = void 0;
var qc = void 0;
var rc = void 0;
var sc = void 0;
var tc = void 0;
var uc = void 0;
var vc = void 0;
var wc = void 0;
var xc = void 0;
var yc = void 0;
var cb = void 0;
var zc = void 0;
T = 80;
qc = (Au2, Bu2) => {
  let Cu2 = "M95," + (622 + Au2 + Bu2) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl", Du2 = +Au2;
  Cu2 = Cu2 + Du2 / 2.075 + "" + or + Au2 + "\nc5.3,-9.3,12,-14,20,-14\nH400000v";
  Cu2 = Cu2 + (40 + Au2) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM";
  Bu2 = Cu2 + (834 + Au2) + "" + Wi + Bu2 + om;
  return Bu2 + (40 + Au2) + "" + Nl;
};
rc = (Au2, Bu2) => {
  let Cu2 = "M263," + (601 + Au2 + Bu2) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl", Du2 = +Au2;
  Cu2 = Cu2 + Du2 / 2.084 + "" + or + Au2 + "\nc4.7,-7.3,11,-11,19,-11\nH40000v";
  Cu2 = Cu2 + (40 + Au2) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM";
  Bu2 = Cu2 + (1001 + Au2) + "" + Wi + Bu2 + om;
  return Bu2 + (40 + Au2) + "" + Nl;
};
sc = (Au2, Bu2) => {
  let Cu2 = "M983 " + (10 + Au2 + Bu2) + "\nl", Du2 = +Au2;
  Cu2 = Cu2 + Du2 / 3.13 + "" + or + Au2 + "\nc4,-6.7,10,-10,18,-10 H400000v";
  Cu2 = Cu2 + (40 + Au2) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM";
  Bu2 = Cu2 + (1001 + Au2) + "" + Wi + Bu2 + om;
  return Bu2 + (40 + Au2) + "" + Nl;
};
tc = (Au2, Bu2) => {
  let Cu2 = "M424," + (2398 + Au2 + Bu2) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl", Du2 = +Au2;
  Cu2 = Cu2 + Du2 / 4.223 + "" + or + Au2 + "c4,-6.7,10,-10,18,-10 H400000\nv";
  Cu2 = Cu2 + (40 + Au2) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M";
  Bu2 = Cu2 + (1001 + Au2) + "" + Wi + Bu2 + "\nh400000v";
  return Bu2 + (40 + Au2) + "" + Nl;
};
uc = (Au2, Bu2) => {
  let Cu2 = "M473," + (2713 + Au2 + Bu2) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l", Du2 = +Au2;
  Cu2 = Cu2 + Du2 / 5.298 + "" + or + Au2 + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v";
  Cu2 = Cu2 + (40 + Au2) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM";
  Bu2 = Cu2 + (1001 + Au2) + "" + Wi + Bu2 + om;
  return Bu2 + (40 + Au2) + "H1017.7z";
};
vc = (Au2) => {
  let Bu2 = +Au2;
  Bu2 = Bu2 / 2;
  Bu2 = "M400000 " + Au2 + " H0 L" + Bu2 + " 0 l65 45 L145 ";
  Au2 = +Au2;
  return Bu2 + Au2 - 80 + " H400000z";
};
wc = (Au2, Bu2, Cu2) => {
  Cu2 = +Cu2;
  Cu2 = +(+(Cu2 - 54) - +Bu2) - +Au2;
  let Du2 = "M702 " + (Au2 + Bu2) + "H400000";
  Bu2 = Du2 + (40 + Au2) + "\nH742v" + Cu2 + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + Bu2 + "H400000v";
  return Bu2 + (40 + Au2) + "H742z";
};
xc = (Au2, Bu2, Cu2) => {
  Bu2 = +yu * +Bu2;
  Au2 = Au2 === tu ? qc(Bu2, T) : "sqrtSize1" === Au2 ? rc(Bu2, T) : "sqrtSize2" === Au2 ? sc(Bu2, T) : "sqrtSize3" === Au2 ? tc(Bu2, T) : "sqrtSize4" === Au2 ? uc(Bu2, T) : Au2 === uu ? wc(Bu2, T, Cu2) : lh;
  return Au2;
};
yc = Vd;
Au = {};
Object.assign(Au, { doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z", doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z", leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z", leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z", leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z", leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z", leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z", leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z", leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z", leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z", leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z", lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z", leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z", leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z", leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z", longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z", midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z", midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z", oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z", oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z", oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z", oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z", rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z", rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z", rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z", rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z", rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z", rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z", rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z", rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z", rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z", righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z", rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z", rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z", twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z", twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z", tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z", tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z", tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z", tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z", vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z", widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z", widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z", widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z", widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z", widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z", widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z", widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z", widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z", baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z", rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z", baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z", rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z", shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z", shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z" });
cb = Au;
zc = Wd;
var J = void 0;
J = (0, function(Bu2) {
  this.children = Bu2;
  this.classes = [];
  this.height = 0;
  this.depth = 0;
  this.maxFontSize = 0;
  this.style = {};
  return this;
});
Au = J.prototype;
Au.hasClass = function(Bu2) {
  return i.contains(this.classes, Bu2);
};
Au = J.prototype;
Au.toNode = function() {
  var Cu2 = C().createDocumentFragment();
  var Bu2 = 0, Du2;
  for (; ; ) {
    Du2 = this.children;
    if (Bu2 >= Du2.length) {
      break;
    }
    Du2 = this.children[Bu2];
    Cu2.appendChild(Du2.toNode());
    Bu2 = Bu2 + 1;
  }
  return Cu2;
};
Au = J.prototype;
Au.toMarkup = function() {
  var Cu2 = lh, Bu2 = 0, Du2;
  for (; ; ) {
    Du2 = this.children;
    if (Bu2 >= Du2.length) {
      break;
    }
    Du2 = this.children[Bu2];
    Cu2 = Cu2 + Du2.toMarkup();
    Bu2 = Bu2 + 1;
  }
  return Cu2;
};
Au = J.prototype;
Au.toText = function() {
  let Au2 = this.children;
  return Au2.map((Au3) => Au3.toText()).join(lh);
};
var N = getFontMetricsData();
var Ac = getUnicodeSymbols();
var ea = void 0;
var db = void 0;
var Aa = void 0;
var Ba = void 0;
var Bc = void 0;
Au = {};
Du = [];
Cu = 0.25;
Du.push(Cu);
Du.push(Cu);
Du.push(Cu);
Au.slant = Du;
Du = [];
Du.push(0);
Du.push(0);
Du.push(0);
Au.space = Du;
Du = [];
Du.push(0);
Du.push(0);
Du.push(0);
Au.stretch = Du;
Du = [];
Du.push(0);
Du.push(0);
Du.push(0);
Au.shrink = Du;
Eu = [];
Du = 0.431;
Eu.push(Du);
Eu.push(Du);
Eu.push(Du);
Au.xHeight = Eu;
Eu = [];
Eu.push(1);
Eu.push(1.171);
Eu.push(1.472);
Au.quad = Eu;
Eu = [];
Eu.push(0);
Eu.push(0);
Eu.push(0);
Au.extraSpace = Eu;
Eu = [];
Eu.push(0.677);
Eu.push(0.732);
Eu.push(0.925);
Au.num1 = Eu;
Eu = [];
Eu.push(0.394);
Eu.push(0.384);
Eu.push(0.387);
Au.num2 = Eu;
Eu = [];
Eu.push(0.444);
Eu.push(0.471);
Eu.push(0.504);
Au.num3 = Eu;
Eu = [];
Eu.push(0.686);
Eu.push(0.752);
Eu.push(1.025);
Au.denom1 = Eu;
Eu = [];
Eu.push(0.345);
Eu.push(0.344);
Eu.push(0.532);
Au.denom2 = Eu;
Eu = [];
Eu.push(0.413);
Eu.push(0.503);
Eu.push(0.504);
Au.sup1 = Eu;
Eu = [];
Eu.push(0.363);
Eu.push(Du);
Eu.push(0.404);
Au.sup2 = Eu;
Du = [];
Du.push(0.289);
Du.push(0.286);
Du.push(0.294);
Au.sup3 = Du;
Du = [];
Du.push(0.15);
Du.push(0.143);
Du.push(0.2);
Au.sub1 = Du;
Du = [];
Du.push(0.247);
Du.push(0.286);
Du.push(0.4);
Au.sub2 = Du;
Du = [];
Du.push(0.386);
Du.push(0.353);
Du.push(0.494);
Au.supDrop = Du;
Du = [];
Du.push(0.05);
Du.push(0.071);
Du.push(0.1);
Au.subDrop = Du;
Du = [];
Du.push(2.39);
Du.push(1.7);
Du.push(1.98);
Au.delim1 = Du;
Du = [];
Du.push(1.01);
Du.push(1.157);
Du.push(1.42);
Au.delim2 = Du;
Du = [];
Du.push(Cu);
Du.push(Cu);
Du.push(Cu);
Au.axisHeight = Du;
Du = [];
Cu = 0.04;
Du.push(Cu);
Du.push(0.049);
Du.push(0.049);
Au.defaultRuleThickness = Du;
Du = [];
Du.push(0.111);
Du.push(0.111);
Du.push(0.111);
Au.bigOpSpacing1 = Du;
Du = [];
Du.push(0.166);
Du.push(0.166);
Du.push(0.166);
Au.bigOpSpacing2 = Du;
Du = [];
Du.push(0.2);
Du.push(0.2);
Du.push(0.2);
Au.bigOpSpacing3 = Du;
Du = [];
Du.push(0.6);
Du.push(0.611);
Du.push(0.611);
Au.bigOpSpacing4 = Du;
Du = [];
Du.push(0.1);
Du.push(0.143);
Du.push(0.143);
Au.bigOpSpacing5 = Du;
Du = [];
Du.push(Cu);
Du.push(Cu);
Du.push(Cu);
Au.sqrtRuleThickness = Du;
Du = [];
Du.push(10);
Du.push(10);
Du.push(10);
Au.ptPerEm = Du;
Du = [];
Du.push(0.2);
Du.push(0.2);
Du.push(0.2);
Au.doubleRuleSep = Du;
Du = [];
Du.push(Cu);
Du.push(Cu);
Du.push(Cu);
Au.arrayRuleWidth = Du;
Du = [];
Du.push(0.3);
Du.push(0.3);
Du.push(0.3);
Au.fboxsep = Du;
Du = [];
Du.push(Cu);
Du.push(Cu);
Du.push(Cu);
Au.fboxrule = Du;
ea = Au;
Au = {};
Object.assign(Au, { "\xC5": "A", "\xD0": "D", "\xDE": "o", "\xE5": "a" });
var Ju = "\xF0";
Object.assign(Au, { "\xF0": "d", "\xFE": "o", "\u0410": "A", "\u0411": "B", "\u0412": "B", "\u0413": "F", "\u0414": "A", "\u0415": "E", "\u0416": "K", "\u0417": "3", "\u0418": "N", "\u0419": "N", "\u041A": "K", "\u041B": "N", "\u041C": "M", "\u041D": "H", "\u041E": "O", "\u041F": "N", "\u0420": "P", "\u0421": "C", "\u0422": "T", "\u0423": "y", "\u0424": "O", "\u0425": "X", "\u0426": "U", "\u0427": "h", "\u0428": "W", "\u0429": "W", "\u042A": "B", "\u042B": "X", "\u042C": "B", "\u042D": "3", "\u042E": "X", "\u042F": "R", "\u0430": "a", "\u0431": "b", "\u0432": "a", "\u0433": "r", "\u0434": "y", "\u0435": "e", "\u0436": et, "\u0437": "e" });
Cu = "n";
Object.assign(Au, { "\u0438": Cu, "\u0439": Cu, "\u043A": Cu, "\u043B": Cu, "\u043C": et, "\u043D": Cu, "\u043E": "o", "\u043F": Cu, "\u0440": "p", "\u0441": dt, "\u0442": "o", "\u0443": "y", "\u0444": "b", "\u0445": "x", "\u0446": Cu, "\u0447": Cu, "\u0448": "w", "\u0449": "w", "\u044A": "a", "\u044B": et, "\u044C": "a", "\u044D": "e", "\u044E": et, "\u044F": "r" });
db = Au;
Aa = (Au2, Bu2, Cu2) => {
  if (!N[Bu2]) throw t("Font metrics not found for font: " + Bu2 + Bk);
  var Eu2 = Au2.charCodeAt(0);
  var Du2 = N[Bu2][Eu2];
  if (!Du2) {
    var Fu2 = Au2[0];
    Fu2 = Fu2 in db;
  } else {
    Fu2 = false;
  }
  Fu2 && (Du2 = db, Au2 = Du2[Au2[0]], Eu2 = Au2.charCodeAt(0), Du2 = N[Bu2][Eu2]);
  !Du2 && Cu2 === yf && (!bb(Eu2) || (Du2 = N[Bu2][77]));
  if (Du2) {
    Au2 = {};
    Object.assign(Au2, { depth: Du2[0], height: Du2[1], italic: Du2[2], skew: Du2[3], width: Du2[4] });
    return Au2;
  }
};
Ba = {};
Bc = (Au2) => {
  Au2 = Au2 >= 5 ? 0 : Au2 >= 3 ? 1 : 2;
  if (!Ba[Au2]) {
    var Du2 = {};
    var Bu2 = +ea.quad[Au2];
    Du2.cssEmPerMu = Bu2 / 18;
    Ba[Au2] = Du2;
    var Eu2 = u(ea);
    var Fu2 = Eu2.length | 0;
    var Cu2 = 0;
    while (Cu2 < Fu2) {
      Bu2 = Eu2[Cu2];
      l(ea, Bu2) && (Du2[Bu2] = ea[Bu2][Au2]);
      Cu2 = Cu2 + 1;
    }
  }
  return Ba[Au2];
};
var Cc = void 0;
var eb = void 0;
var fb = void 0;
var p = void 0;
Au = [];
Cu = [];
Cu.push(1);
Cu.push(1);
Cu.push(1);
Au.push(Cu);
Cu = [];
Cu.push(2);
Cu.push(1);
Cu.push(1);
Au.push(Cu);
Cu = [];
Cu.push(3);
Cu.push(1);
Cu.push(1);
Au.push(Cu);
Cu = [];
Cu.push(4);
Cu.push(2);
Cu.push(1);
Au.push(Cu);
Cu = [];
Cu.push(5);
Cu.push(2);
Cu.push(1);
Au.push(Cu);
Cu = [];
Cu.push(6);
Cu.push(3);
Cu.push(1);
Au.push(Cu);
Cu = [];
Cu.push(7);
Cu.push(4);
Cu.push(2);
Au.push(Cu);
Cu = [];
Cu.push(8);
Cu.push(6);
Cu.push(3);
Au.push(Cu);
Cu = [];
Cu.push(9);
Cu.push(7);
Cu.push(6);
Au.push(Cu);
Cu = [];
Cu.push(10);
Cu.push(8);
Cu.push(7);
Au.push(Cu);
Cu = [];
Cu.push(11);
Cu.push(10);
Cu.push(9);
Au.push(Cu);
Cc = Au;
Au = [];
Au.push(0.5);
Au.push(0.6);
Au.push(0.7);
Au.push(0.8);
Au.push(0.9);
Au.push(1);
Au.push(1.2);
Au.push(1.44);
Au.push(1.728);
Au.push(2.074);
Au.push(2.488);
eb = Au;
fb = (Au2, Bu2) => {
  var Cu2 = Bu2.size;
  Cu2 < 2 || (Cu2 = Cc, Au2 = +Au2, Au2 = Cu2[Au2 - 1], Au2 = Au2[+Bu2.size - 1]);
  return Au2;
};
p = (0, function(Bu2) {
  this.style = Bu2.style;
  this.color = Bu2.color;
  var Cu2 = Bu2.size;
  Cu2 = Cu2 || p.BASESIZE;
  this.size = Cu2;
  Cu2 = Bu2.textSize;
  Cu2 = Cu2 || this.size;
  this.textSize = Cu2;
  this.phantom = !!Bu2.phantom;
  Cu2 = Bu2.font;
  Cu2 = Cu2 || lh;
  this.font = Cu2;
  Cu2 = Bu2.fontFamily;
  Cu2 = Cu2 || lh;
  this.fontFamily = Cu2;
  Cu2 = Bu2.fontWeight;
  Cu2 = Cu2 || lh;
  this.fontWeight = Cu2;
  Cu2 = Bu2.fontShape;
  Cu2 = Cu2 || lh;
  this.fontShape = Cu2;
  Cu2 = eb;
  var Du2 = +this.size;
  this.sizeMultiplier = Cu2[Du2 - 1];
  this.maxSize = Bu2.maxSize;
  this.minRuleThickness = Bu2.minRuleThickness;
  this._fontMetrics = void 0;
  return this;
});
Au = p.prototype;
Au.extend = function(Bu2) {
  var Cu2 = {};
  Object.assign(Cu2, { style: this.style, size: this.size, textSize: this.textSize, color: this.color, phantom: this.phantom, font: this.font, fontFamily: this.fontFamily, fontWeight: this.fontWeight, fontShape: this.fontShape, maxSize: this.maxSize, minRuleThickness: this.minRuleThickness });
  var Eu2 = u(Bu2);
  var Fu2 = Eu2.length | 0;
  var Du2 = 0, Au2;
  while (Du2 < Fu2) {
    Au2 = Eu2[Du2];
    l(Bu2, Au2) && (Cu2[Au2] = Bu2[Au2]);
    Du2 = Du2 + 1;
  }
  return new p(Cu2);
};
Au = p.prototype;
Au.havingStyle = W(Xd);
Au = p.prototype;
Au.havingCrampedStyle = function() {
  let Bu2 = this.style;
  return this.havingStyle(Bu2.cramp());
};
Au = p.prototype;
Au.havingSize = W(Yd);
Au = p.prototype;
Au.havingBaseStyle = W(Zd);
Au = p.prototype;
Au.havingBaseSizing = function() {
  var Bu2 = this.style;
  Bu2 = Bu2.id;
  var Cu2, Du2;
  Cu2 = 4 === Bu2 || 5 === Bu2 ? 3 : 6 === Bu2 || 7 === Bu2 ? 1 : 6;
  Bu2 = {};
  Du2 = this.style;
  Object.assign(Bu2, { style: Du2.text(), size: Cu2 });
  return this.extend(Bu2);
};
Au = p.prototype;
Au.withColor = function(Bu2) {
  let Cu2 = {};
  Cu2.color = Bu2;
  return this.extend(Cu2);
};
Au = p.prototype;
Au.withPhantom = function() {
  let Bu2 = {};
  Bu2.phantom = true;
  return this.extend(Bu2);
};
Au = p.prototype;
Au.withFont = function(Bu2) {
  let Cu2 = {};
  Cu2.font = Bu2;
  return this.extend(Cu2);
};
Au = p.prototype;
Au.withTextFontFamily = function(Bu2) {
  let Cu2 = {};
  Object.assign(Cu2, { fontFamily: Bu2, font: lh });
  return this.extend(Cu2);
};
Au = p.prototype;
Au.withTextFontWeight = function(Bu2) {
  let Cu2 = {};
  Object.assign(Cu2, { fontWeight: Bu2, font: lh });
  return this.extend(Cu2);
};
Au = p.prototype;
Au.withTextFontShape = function(Bu2) {
  let Cu2 = {};
  Object.assign(Cu2, { fontShape: Bu2, font: lh });
  return this.extend(Cu2);
};
Au = p.prototype;
Au.sizingClasses = W(_d);
Au = p.prototype;
Au.baseSizingClasses = V($d);
Au = p.prototype;
Au.fontMetrics = function() {
  this._fontMetrics || (this._fontMetrics = Bc(this.size));
  return this._fontMetrics;
};
Au = p.prototype;
Au.getColor = V(ae);
p.BASESIZE = 6;
var Ca = void 0;
var Dc = void 0;
var gb = void 0;
var r = void 0;
var d = void 0;
Au = {};
Au.pt = 1;
Cu = 7227;
Au.mm = Cu / 2540;
Cu = 7227;
Object.assign(Au, { cm: Cu / 254, in: 72.27 });
Cu = 803;
Object.assign(Au, { bp: Cu / 800, pc: 12 });
Cu = 1238;
Object.assign(Au, { dd: Cu / 1157, cc: 14856 / 1157 });
Cu = 685;
Au.nd = Cu / 642;
Cu = 1370;
Au.nc = Cu / 107;
Cu = 1;
Object.assign(Au, { sp: Cu / 65536, px: 803 / 800 });
Ca = Au;
Au = {};
Object.assign(Au, { ex: Bu, em: Bu, mu: Bu });
Dc = Au;
gb = (Au2) => {
  typeof Au2 !== mh && (Au2 = Au2.unit);
  var Bu2 = Au2 in Ca;
  Bu2 = Bu2 || Au2 in Dc;
  Bu2 = Bu2 || Au2 === rr;
  return Bu2;
};
r = (Au2, Bu2) => {
  var Cu2 = Au2.unit;
  if (Cu2 in Ca) {
    Cu2 = Ca;
    Cu2 = +Cu2[Au2.unit];
    Cu2 = +(Cu2 / +Bu2.fontMetrics().ptPerEm);
    Cu2 = Cu2 / +Bu2.sizeMultiplier;
  } else {
    Cu2 = Au2.unit;
    if (Cu2 === St) {
      Cu2 = Bu2.fontMetrics().cssEmPerMu;
    } else {
      Cu2 = Bu2.style;
      if (Cu2.isTight()) {
        Cu2 = Bu2.style;
        var Du2 = Bu2.havingStyle(Cu2.text());
      } else {
        Du2 = Bu2;
      }
      Cu2 = Au2.unit;
      if (Cu2 === rr) {
        Cu2 = Du2.fontMetrics().xHeight;
      } else {
        Cu2 = Au2.unit;
        if (Cu2 === qr) {
          Cu2 = Du2.fontMetrics().quad;
        } else {
          Bu2 = c;
          throw new Bu2(wl + Au2.unit + Cj);
        }
      }
      Du2 !== Bu2 && (Cu2 = +Cu2, Du2 = +Du2.sizeMultiplier, Cu2 = Cu2 * +(Du2 / +Bu2.sizeMultiplier));
    }
  }
  Du2 = Math;
  return Du2.min(+Au2.number * +Cu2, Bu2.maxSize);
};
d = (Au2) => +Au2.toFixed(4) + qr;
var O = void 0;
var hb = void 0;
var ib = void 0;
var Ec = void 0;
var jb = void 0;
var P = void 0;
var U = void 0;
var fa = void 0;
var Fc = void 0;
var v = void 0;
var I = void 0;
var K = void 0;
var ga = void 0;
var kb = void 0;
var Gc = void 0;
O = (Au2) => Au2.filter((Au3) => Au3).join(Wi);
hb = (0, function(Bu2, Cu2, Du2) {
  Bu2 = Bu2 || [];
  this.classes = Bu2;
  this.attributes = {};
  this.height = 0;
  this.depth = 0;
  this.maxFontSize = 0;
  Du2 = Du2 || {};
  this.style = Du2;
  if (Cu2) {
    Bu2 = Cu2.style;
    !Bu2.isTight() || this.classes.push(Hq);
    Bu2 = Cu2.getColor();
    if (Bu2) {
      var Au2 = this.style;
      Au2.color = Bu2;
    }
  }
});
ib = (0, function(Bu2) {
  Bu2 = C().createElement(Bu2);
  Bu2.className = O(this.classes);
  var Eu2 = u(this.style);
  var Gu2 = Eu2.length | 0;
  var Du2 = 0, Cu2, Fu2;
  var bv2 = void 0;
  while (Du2 < Gu2) {
    Cu2 = Eu2[Du2];
    l(this.style, Cu2) && (Fu2 = Bu2.style, Fu2[Cu2] = this.style[Cu2]);
    Du2 = Du2 + 1;
  }
  Eu2 = u(this.attributes);
  Fu2 = Eu2.length | 0;
  Du2 = 0;
  while (Du2 < Fu2) {
    Cu2 = Eu2[Du2];
    l(this.attributes, Cu2) && Bu2.setAttribute(Cu2, this.attributes[Cu2]);
    Du2 = Du2 + 1;
  }
  Cu2 = 0;
  for (; ; ) {
    Du2 = this.children;
    if (Cu2 >= Du2.length) {
      break;
    }
    Du2 = this.children[Cu2];
    Bu2.appendChild(Du2.toNode());
    Cu2 = Cu2 + 1;
  }
  return Bu2;
});
Ec = new RegExp(`[\\s"'>/=\\x00-\\x1f]`, lh);
jb = (0, function(Bu2) {
  var Cu2 = ct + Bu2;
  var Du2 = this.classes;
  !Du2.length || (Du2 = i, Cu2 = Cu2 + (pt + Du2.escape(O(this.classes)) + pj));
  var Gu2 = u(this.style);
  var Iu2 = Gu2.length | 0;
  var Du2 = lh, Fu2 = 0, Eu2, Hu2, Au2;
  while (Fu2 < Iu2) {
    Eu2 = Gu2[Fu2];
    l(this.style, Eu2) && (Hu2 = i.hyphenate(Eu2) + op, Du2 = Du2 + (Hu2 + this.style[Eu2] + ";"));
    Fu2 = Fu2 + 1;
  }
  !Du2 || (Cu2 = Cu2 + (Yn + i.escape(Du2) + pj));
  Fu2 = u(this.attributes);
  Iu2 = Fu2.length | 0;
  Eu2 = 0;
  while (Eu2 < Iu2) {
    Du2 = Fu2[Eu2];
    if (l(this.attributes, Du2)) {
      if (Ec.test(Du2)) {
        Au2 = c;
        throw new Au2("Invalid attribute name '" + Du2 + Cj);
      }
      Gu2 = Wi + Du2 + sr;
      Hu2 = i;
      Cu2 = Cu2 + (Gu2 + Hu2.escape(this.attributes[Du2]) + "" + pj);
    }
    Eu2 = Eu2 + 1;
  }
  Cu2 = Cu2 + no;
  Du2 = 0;
  for (; ; ) {
    Eu2 = this.children;
    if (Du2 >= Eu2.length) {
      break;
    }
    Eu2 = this.children[Du2];
    Cu2 = Cu2 + Eu2.toMarkup();
    Du2 = Du2 + 1;
  }
  return Cu2 + ("</" + Bu2 + no);
});
P = (0, function() {
  var Du2 = arguments[0];
  var Cu2 = arguments[1];
  var Eu2 = arguments[2];
  var Bu2 = arguments[3];
  hb.call(this, Du2, Eu2, Bu2);
  Cu2 = Cu2 || [];
  this.children = Cu2;
  return this;
});
Au = P.prototype;
Au.setAttribute = function(Bu2, Cu2) {
  this.attributes[Bu2] = Cu2;
};
Au = P.prototype;
Au.hasClass = function(Bu2) {
  return i.contains(this.classes, Bu2);
};
Au = P.prototype;
Au.toNode = function() {
  return ib.call(this, Qi);
};
Au = P.prototype;
Au.toMarkup = function() {
  return jb.call(this, Qi);
};
U = (0, function() {
  var Du2 = arguments[0];
  var Eu2 = arguments[1];
  var Cu2 = arguments[2];
  var Bu2 = arguments[3];
  hb.call(this, Eu2, Bu2);
  Cu2 = Cu2 || [];
  this.children = Cu2;
  this.setAttribute(Dm, Du2);
  return this;
});
Au = U.prototype;
Au.setAttribute = function(Bu2, Cu2) {
  this.attributes[Bu2] = Cu2;
};
Au = U.prototype;
Au.hasClass = function(Bu2) {
  return i.contains(this.classes, Bu2);
};
Au = U.prototype;
Au.toNode = function() {
  return ib.call(this, "a");
};
Au = U.prototype;
Au.toMarkup = function() {
  return jb.call(this, "a");
};
fa = (0, function(Cu2, Du2, Eu2) {
  this.alt = Du2;
  this.src = Cu2;
  let Bu2 = [];
  Bu2.push(wg);
  this.classes = Bu2;
  this.style = Eu2;
  return this;
});
Au = fa.prototype;
Au.hasClass = function(Bu2) {
  return i.contains(this.classes, Bu2);
};
Au = fa.prototype;
Au.toNode = function() {
  var Bu2 = C().createElement("img");
  Object.assign(Bu2, { src: this.src, alt: this.alt, className: wg });
  var Eu2 = u(this.style);
  var Gu2 = Eu2.length | 0;
  var Du2 = 0, Cu2, Fu2;
  while (Du2 < Gu2) {
    Cu2 = Eu2[Du2];
    l(this.style, Cu2) && (Fu2 = Bu2.style, Fu2[Cu2] = this.style[Cu2]);
    Du2 = Du2 + 1;
  }
  return Bu2;
};
Au = fa.prototype;
Au.toMarkup = function() {
  var Bu2 = '<img src="' + i.escape(this.src);
  Bu2 = Bu2 + pj;
  var Cu2 = Bu2 + (' alt="' + i.escape(this.alt) + pj);
  var Fu2 = u(this.style);
  var Hu2 = Fu2.length | 0;
  var Bu2 = lh, Eu2 = 0, Du2, Gu2;
  while (Eu2 < Hu2) {
    Du2 = Fu2[Eu2];
    l(this.style, Du2) && (Gu2 = i.hyphenate(Du2) + op, Bu2 = Bu2 + (Gu2 + this.style[Du2] + ";"));
    Eu2 = Eu2 + 1;
  }
  !Bu2 || (Cu2 = Cu2 + (Yn + i.escape(Bu2) + pj));
  return Cu2 + "'/>";
};
Au = {};
Object.assign(Au, { "\xEE": "\u0131\u0302", "\xEF": "\u0131\u0308", "\xED": "\u0131\u0301", "\xEC": "\u0131\u0300" });
Fc = Au;
v = (0, function() {
  var Iu2 = arguments[0];
  var Cu2 = arguments[1];
  var Du2 = arguments[2];
  var Eu2 = arguments[3];
  var Fu2 = arguments[4];
  var Gu2 = arguments[5];
  var Hu2 = arguments[6];
  var Bu2 = arguments[7];
  this.text = Iu2;
  Cu2 = Cu2 || 0;
  this.height = Cu2;
  Du2 = Du2 || 0;
  this.depth = Du2;
  Eu2 = Eu2 || 0;
  this.italic = Eu2;
  Fu2 = Fu2 || 0;
  this.skew = Fu2;
  Gu2 = Gu2 || 0;
  this.width = Gu2;
  Hu2 = Hu2 || [];
  this.classes = Hu2;
  Bu2 = Bu2 || {};
  this.style = Bu2;
  this.maxFontSize = 0;
  Bu2 = pc;
  Cu2 = this.text;
  Bu2 = Bu2(Cu2.charCodeAt(0));
  !Bu2 || this.classes.push(Bu2 + "_fallback");
  !new RegExp("[\xEE\xEF\xED\xEC]", lh).test(this.text) || (this.text = Fc[this.text]);
  return this;
});
Au = v.prototype;
Au.hasClass = function(Bu2) {
  return i.contains(this.classes, Bu2);
};
Au = v.prototype;
Au.toNode = V(be);
Au = v.prototype;
Au.toMarkup = V(ce);
I = (0, function() {
  var Cu2 = arguments[0];
  var Bu2 = arguments[1];
  Cu2 = Cu2 || [];
  this.children = Cu2;
  Bu2 = Bu2 || {};
  this.attributes = Bu2;
  return this;
});
Au = I.prototype;
Au.toNode = function() {
  var Cu2 = C().createElementNS(aj, "svg");
  var Eu2 = u(this.attributes);
  var Gu2 = Eu2.length | 0;
  var Du2 = 0, Bu2, Fu2;
  while (Du2 < Gu2) {
    Bu2 = Eu2[Du2];
    Fu2 = Object.prototype;
    !Fu2.hasOwnProperty.call(this.attributes, Bu2) || Cu2.setAttribute(Bu2, this.attributes[Bu2]);
    Du2 = Du2 + 1;
  }
  Bu2 = 0;
  for (; ; ) {
    Du2 = this.children;
    if (Bu2 >= Du2.length) {
      break;
    }
    Du2 = this.children[Bu2];
    Cu2.appendChild(Du2.toNode());
    Bu2 = Bu2 + 1;
  }
  return Cu2;
};
Au = I.prototype;
Au.toMarkup = function() {
  var Eu2 = u(this.attributes);
  var Hu2 = Eu2.length | 0;
  var Bu2 = '<svg xmlns="http://www.w3.org/2000/svg"', Du2 = 0, Cu2, Fu2, Gu2;
  while (Du2 < Hu2) {
    Cu2 = Eu2[Du2];
    Fu2 = Object.prototype;
    !Fu2.hasOwnProperty.call(this.attributes, Cu2) || (Fu2 = Wi + Cu2 + sr, Gu2 = i, Bu2 = Bu2 + (Fu2 + Gu2.escape(this.attributes[Cu2]) + "" + pj));
    Du2 = Du2 + 1;
  }
  Bu2 = Bu2 + no;
  Cu2 = 0;
  for (; ; ) {
    Du2 = this.children;
    if (Cu2 >= Du2.length) {
      break;
    }
    Du2 = this.children[Cu2];
    Bu2 = Bu2 + Du2.toMarkup();
    Cu2 = Cu2 + 1;
  }
  return Bu2 + "</svg>";
};
K = (0, function(Cu2, Bu2) {
  this.pathName = Cu2;
  this.alternate = Bu2;
  return this;
});
Au = K.prototype;
Au.toNode = function() {
  var Bu2 = C().createElementNS(aj, "path");
  if (this.alternate) {
    Bu2.setAttribute("d", this.alternate);
  } else {
    var Cu2 = cb;
    Bu2.setAttribute("d", Cu2[this.pathName]);
  }
  return Bu2;
};
Au = K.prototype;
Au.toMarkup = V(de);
ga = (0, function() {
  var Bu2 = arguments[0];
  Bu2 = Bu2 || {};
  this.attributes = Bu2;
  return this;
});
Au = ga.prototype;
Au.toNode = function() {
  var Du2 = C().createElementNS(aj, "line");
  var Eu2 = u(this.attributes);
  var Gu2 = Eu2.length | 0;
  var Cu2 = 0, Bu2, Fu2;
  while (Cu2 < Gu2) {
    Bu2 = Eu2[Cu2];
    Fu2 = Object.prototype;
    !Fu2.hasOwnProperty.call(this.attributes, Bu2) || Du2.setAttribute(Bu2, this.attributes[Bu2]);
    Cu2 = Cu2 + 1;
  }
  return Du2;
};
Au = ga.prototype;
Au.toMarkup = function() {
  var Eu2 = u(this.attributes);
  var Hu2 = Eu2.length | 0;
  var Bu2 = "<line", Du2 = 0, Cu2, Fu2, Gu2;
  while (Du2 < Hu2) {
    Cu2 = Eu2[Du2];
    Fu2 = Object.prototype;
    !Fu2.hasOwnProperty.call(this.attributes, Cu2) || (Fu2 = Wi + Cu2 + sr, Gu2 = i, Bu2 = Bu2 + (Fu2 + Gu2.escape(this.attributes[Cu2]) + "" + pj));
    Du2 = Du2 + 1;
  }
  return Bu2 + "/>";
};
kb = ee;
Gc = fe;
var Hc = void 0;
var Ic = void 0;
var o = void 0;
var lb = void 0;
var Da = void 0;
Au = {};
Object.assign(Au, { bin: 1, close: 1, inner: 1, open: 1 });
var Ku = "punct";
Object.assign(Au, { punct: 1, rel: 1 });
Hc = Au;
Au = {};
Du = "accent-token";
Object.assign(Au, { "accent-token": 1, mathord: 1 });
Eu = "op-token";
Au["op-token"] = 1;
Fu = "spacing";
Object.assign(Au, { spacing: 1, textord: 1 });
Ic = Au;
Au = {};
Object.assign(Au, { math: {}, text: {} });
o = Au;
Au = (Au2, Bu2, Cu2, Du2, Eu2, Fu2) => {
  var Gu2 = {};
  Gu2.font = Bu2;
  Gu2.group = Cu2;
  Gu2.replace = Du2;
  var Hu2 = o;
  var Iu2 = Hu2[Au2];
  Iu2[Eu2] = Gu2;
  Fu2 && Du2 && (Bu2 = o[Au2], Bu2[Du2] = o[Au2][Eu2]);
};
Cu = "ams";
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u2261");
Gu.push("\\equiv");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u227A");
Gu.push("\\prec");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u227B");
Gu.push("\\succ");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u223C");
Gu.push("\\sim");
Gu.push(Bu);
Au.apply(void 0, Gu);
Au(tg, eq, wr, "\u22A5", "\\perp");
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u2AAF");
Gu.push("\\preceq");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u2AB0");
Gu.push("\\succeq");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u2243");
Gu.push("\\simeq");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
var Iu = "\u2223";
Gu.push(Iu);
Gu.push("\\mid");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u226A");
Gu.push("\\ll");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u226B");
Gu.push("\\gg");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = [];
Gu.push(tg);
Gu.push(eq);
Gu.push(wr);
Gu.push("\u224D");
Gu.push("\\asymp");
Gu.push(Bu);
Au.apply(void 0, Gu);
Gu = "\u2225";
Au(tg, eq, wr, Gu, "\\parallel");
var Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u22C8");
Hu.push("\\bowtie");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2323");
Hu.push("\\smile");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2291");
Hu.push("\\sqsubseteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2292");
Hu.push("\\sqsupseteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2250");
Hu.push("\\doteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2322");
Hu.push("\\frown");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u220B");
Hu.push("\\ni");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u221D");
Hu.push("\\propto");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u22A2");
Hu.push("\\vdash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u22A3");
Hu.push("\\dashv");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\u220B", "\\owns");
Au(tg, eq, Ku, Bk, "\\ldotp");
Au(tg, eq, Ku, "\u22C5", "\\cdotp");
Au(tg, eq, bg, uq, "\\#");
Au(yf, eq, bg, uq, "\\#");
Au(tg, eq, bg, "&", "\\&");
Au(yf, eq, bg, "&", "\\&");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2135");
Hu.push("\\aleph");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2200");
Hu.push("\\forall");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u210F");
Hu.push("\\hbar");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2203");
Hu.push(bu);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2207");
Hu.push("\\nabla");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u266D");
Hu.push("\\flat");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2113");
Hu.push("\\ell");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u266E");
Hu.push("\\natural");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2663");
Hu.push(Cs);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2118");
Hu.push("\\wp");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u266F");
Hu.push("\\sharp");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2662");
Hu.push(Nq);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u211C");
Hu.push("\\Re");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2661");
Hu.push(Zr);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2111");
Hu.push("\\Im");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2660");
Hu.push($r);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\xA7");
Hu.push("\\S");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(yf, eq, bg, "\xA7", "\\S");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\xB6");
Hu.push("\\P");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(yf, eq, bg, "\xB6", "\\P");
var Lu = "\u2020";
Au(tg, eq, bg, Lu, "\\dag");
Au(yf, eq, bg, Lu, "\\dag");
Au(yf, eq, bg, Lu, "\\textdagger");
var Mu = "\u2021";
Au(tg, eq, bg, Mu, "\\ddag");
Au(yf, eq, bg, Mu, "\\ddag");
Au(yf, eq, bg, Mu, "\\textdaggerdbl");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(Jr);
Hu.push("\u23B1");
Hu.push(wm);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(hq);
Hu.push("\u23B0");
Hu.push(vm);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(Jr);
Hu.push("\u27EF");
Hu.push(Go);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(hq);
Hu.push("\u27EE");
Hu.push(Bo);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2213");
Hu.push("\\mp");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2296");
Hu.push("\\ominus");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u228E");
Hu.push("\\uplus");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2293");
Hu.push("\\sqcap");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, tr, "\u2217", "\\ast");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2294");
Hu.push("\\sqcup");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u25EF");
Hu.push("\\bigcirc");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2219");
Hu.push(Zt);
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, tr, Mu, st);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2240");
Hu.push("\\wr");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, tr, "\u2A3F", "\\amalg");
Au(tg, eq, tr, "&", "\\And");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u27F5");
Hu.push(Pp);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21D0");
Hu.push(Vr);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u27F8");
Hu.push(Np);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u27F6");
Hu.push(ep);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21D2");
Hu.push(ar);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u27F9");
Hu.push($o);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2194");
Hu.push(dp);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u27F7");
Hu.push(Kn);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21D4");
Hu.push(_o);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u27FA");
Hu.push(Jn);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21A6");
Hu.push(du);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u27FC");
Hu.push(er);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2197");
Hu.push("\\nearrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21A9");
Hu.push("\\hookleftarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21AA");
Hu.push(cp);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2198");
Hu.push("\\searrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21BC");
Hu.push("\\leftharpoonup");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21C0");
Hu.push("\\rightharpoonup");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2199");
Hu.push("\\swarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21BD");
Hu.push("\\leftharpoondown");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21C1");
Hu.push("\\rightharpoondown");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2196");
Hu.push("\\nwarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u21CC");
Hu.push("\\rightleftharpoons");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u226E");
Hu.push("\\nless");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE010", "\\@nleqslant");
Au(tg, Cu, wr, "\uE011", "\\@nleqq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A87");
Hu.push("\\lneq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2268");
Hu.push("\\lneqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE00C", "\\@lvertneqq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22E6");
Hu.push("\\lnsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A89");
Hu.push("\\lnapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2280");
Hu.push("\\nprec");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22E0");
Hu.push("\\npreceq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22E8");
Hu.push("\\precnsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2AB9");
Hu.push("\\precnapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2241");
Hu.push("\\nsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE006", "\\@nshortmid");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2224");
Hu.push("\\nmid");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22AC");
Hu.push("\\nvdash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22AD");
Hu.push("\\nvDash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u22EA", "\\ntriangleleft");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22EC");
Hu.push("\\ntrianglelefteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u228A");
Hu.push("\\subsetneq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE01A", "\\@varsubsetneq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2ACB");
Hu.push("\\subsetneqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE017", "\\@varsubsetneqq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u226F");
Hu.push("\\ngtr");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE00F", "\\@ngeqslant");
Au(tg, Cu, wr, "\uE00E", "\\@ngeqq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A88");
Hu.push("\\gneq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2269");
Hu.push("\\gneqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE00D", "\\@gvertneqq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22E7");
Hu.push("\\gnsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A8A");
Hu.push("\\gnapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2281");
Hu.push("\\nsucc");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22E1");
Hu.push("\\nsucceq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22E9");
Hu.push("\\succnsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2ABA");
Hu.push("\\succnapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2246");
Hu.push("\\ncong");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE007", "\\@nshortparallel");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2226");
Hu.push("\\nparallel");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22AF");
Hu.push("\\nVDash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u22EB", "\\ntriangleright");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22ED");
Hu.push("\\ntrianglerighteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE018", "\\@nsupseteqq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u228B");
Hu.push("\\supsetneq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE01B", "\\@varsupsetneq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2ACC");
Hu.push("\\supsetneqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE019", "\\@varsupsetneqq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22AE");
Hu.push("\\nVdash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2AB5");
Hu.push("\\precneqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2AB6");
Hu.push("\\succneqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\uE016", "\\@nsubseteqq");
Au(tg, Cu, tr, "\u22B4", "\\unlhd");
Au(tg, Cu, tr, "\u22B5", "\\unrhd");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u219A");
Hu.push("\\nleftarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u219B");
Hu.push("\\nrightarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21CD");
Hu.push("\\nLeftarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21CF");
Hu.push("\\nRightarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21AE");
Hu.push("\\nleftrightarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21CE");
Hu.push("\\nLeftrightarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u25B3", "\\vartriangle");
Au(tg, Cu, bg, "\u210F", "\\hslash");
Au(tg, Cu, bg, "\u25BD", "\\triangledown");
Au(tg, Cu, bg, "\u25CA", "\\lozenge");
Au(tg, Cu, bg, "\u24C8", "\\circledS");
Hu = "\\circledR";
Au(tg, Cu, bg, "\xAE", Hu);
Au(yf, Cu, bg, "\xAE", Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2221");
Hu.push("\\measuredangle");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, bg, "\u2204", "\\nexists");
Au(tg, Cu, bg, "\u2127", "\\mho");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2132");
Hu.push("\\Finv");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2141");
Hu.push("\\Game");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, bg, "\u2035", "\\backprime");
Au(tg, Cu, bg, "\u25B2", "\\blacktriangle");
Au(tg, Cu, bg, "\u25BC", "\\blacktriangledown");
Au(tg, Cu, bg, "\u25A0", "\\blacksquare");
Au(tg, Cu, bg, "\u29EB", "\\blacklozenge");
Au(tg, Cu, bg, "\u2605", "\\bigstar");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2222");
Hu.push("\\sphericalangle");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2201");
Hu.push("\\complement");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push(Ju);
Hu.push("\\eth");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(yf, eq, bg, Ju, Ju);
Au(tg, Cu, bg, "\u2571", "\\diagup");
Au(tg, Cu, bg, "\u2572", "\\diagdown");
Au(tg, Cu, bg, "\u25A1", "\\square");
Au(tg, Cu, bg, "\u25A1", "\\Box");
Au(tg, Cu, bg, "\u25CA", "\\Diamond");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\xA5");
Hu.push("\\yen");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(yf);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\xA5");
Hu.push("\\yen");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2713");
Ju = "\\checkmark";
Hu.push(Ju);
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(yf, Cu, bg, "\u2713", Ju);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2136");
Hu.push("\\beth");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2138");
Hu.push("\\daleth");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u2137");
Hu.push("\\gimel");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(bg);
Hu.push("\u03DD");
Hu.push("\\digamma");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, bg, "\u03F0", "\\varkappa");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(hq);
Hu.push("\u250C");
Hu.push("\\@ulcorner");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(Jr);
Hu.push("\u2510");
Hu.push("\\@urcorner");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(hq);
Hu.push("\u2514");
Hu.push("\\@llcorner");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(Jr);
Hu.push("\u2518");
Hu.push("\\@lrcorner");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2266");
Hu.push("\\leqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A7D");
Hu.push("\\leqslant");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A95");
Hu.push("\\eqslantless");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2272");
Hu.push("\\lesssim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A85");
Hu.push("\\lessapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u224A");
Hu.push("\\approxeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, tr, "\u22D6", "\\lessdot");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22D8");
Hu.push("\\lll");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2276");
Hu.push("\\lessgtr");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22DA");
Hu.push("\\lesseqgtr");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A8B");
Hu.push("\\lesseqqgtr");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u2251", "\\doteqdot");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2253");
Hu.push("\\risingdotseq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2252");
Hu.push("\\fallingdotseq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u223D");
Hu.push("\\backsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22CD");
Hu.push("\\backsimeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2AC5");
Hu.push("\\subseteqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22D0");
Hu.push("\\Subset");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u228F");
Hu.push("\\sqsubset");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u227C");
Hu.push("\\preccurlyeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22DE");
Hu.push("\\curlyeqprec");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u227E");
Hu.push("\\precsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2AB7");
Hu.push("\\precapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u22B2", "\\vartriangleleft");
Au(tg, Cu, wr, "\u22B4", "\\trianglelefteq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22A8");
Hu.push("\\vDash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22AA");
Hu.push("\\Vvdash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u2323", "\\smallsmile");
Au(tg, Cu, wr, "\u2322", "\\smallfrown");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u224F");
Hu.push("\\bumpeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u224E");
Hu.push("\\Bumpeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2267");
Hu.push("\\geqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A7E");
Hu.push("\\geqslant");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A96");
Hu.push("\\eqslantgtr");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2273");
Hu.push("\\gtrsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A86");
Hu.push("\\gtrapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, tr, "\u22D7", "\\gtrdot");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22D9");
Hu.push("\\ggg");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2277");
Hu.push("\\gtrless");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22DB");
Hu.push("\\gtreqless");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2A8C");
Hu.push("\\gtreqqless");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2256");
Hu.push("\\eqcirc");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2257");
Hu.push("\\circeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u225C");
Hu.push("\\triangleq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u223C", "\\thicksim");
Au(tg, Cu, wr, "\u2248", "\\thickapprox");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2AC6");
Hu.push("\\supseteqq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22D1");
Hu.push("\\Supset");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2290");
Hu.push("\\sqsupset");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u227D");
Hu.push("\\succcurlyeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22DF");
Hu.push("\\curlyeqsucc");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u227F");
Hu.push("\\succsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2AB8");
Hu.push("\\succapprox");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u22B3", "\\vartriangleright");
Au(tg, Cu, wr, "\u22B5", "\\trianglerighteq");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22A9");
Hu.push("\\Vdash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, Iu, "\\shortmid");
Au(tg, Cu, wr, Gu, "\\shortparallel");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u226C");
Hu.push("\\between");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22D4");
Hu.push("\\pitchfork");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u221D", "\\varpropto");
Au(tg, Cu, wr, "\u25C0", "\\blacktriangleleft");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2234");
Hu.push("\\therefore");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u220D", "\\backepsilon");
Au(tg, Cu, wr, "\u25B6", "\\blacktriangleright");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2235");
Hu.push("\\because");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u22D8", "\\llless");
Au(tg, Cu, wr, "\u22D9", "\\gggtr");
Au(tg, Cu, tr, "\u22B2", "\\lhd");
Au(tg, Cu, tr, "\u22B3", "\\rhd");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2242");
Hu.push("\\eqsim");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\u22C8", "\\Join");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2251");
Hu.push("\\Doteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u2214");
Hu.push("\\dotplus");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, tr, "\u2216", "\\smallsetminus");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22D2");
Hu.push("\\Cap");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22D3");
Hu.push("\\Cup");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u2A5E");
Hu.push("\\doublebarwedge");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u229F");
Hu.push("\\boxminus");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u229E");
Hu.push("\\boxplus");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22C7");
Hu.push("\\divideontimes");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22C9");
Hu.push("\\ltimes");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22CA");
Hu.push("\\rtimes");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22CB");
Hu.push("\\leftthreetimes");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22CC");
Hu.push("\\rightthreetimes");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22CF");
Hu.push("\\curlywedge");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22CE");
Hu.push("\\curlyvee");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u229D");
Hu.push("\\circleddash");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u229B");
Hu.push("\\circledast");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, tr, "\u22C5", "\\centerdot");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22BA");
Hu.push("\\intercal");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, tr, "\u22D2", "\\doublecap");
Au(tg, Cu, tr, "\u22D3", "\\doublecup");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(tr);
Hu.push("\u22A0");
Hu.push("\\boxtimes");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21E2");
Hu.push("\\dashrightarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21E0");
Hu.push("\\dashleftarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21C7");
Hu.push("\\leftleftarrows");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21C6");
Hu.push("\\leftrightarrows");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21DA");
Hu.push("\\Lleftarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u219E");
Hu.push("\\twoheadleftarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21A2");
Hu.push("\\leftarrowtail");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21AB");
Hu.push("\\looparrowleft");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21CB");
Hu.push("\\leftrightharpoons");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21B6");
Hu.push("\\curvearrowleft");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21BA");
Hu.push("\\circlearrowleft");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21B0");
Hu.push("\\Lsh");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21C8");
Hu.push("\\upuparrows");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21BF");
Hu.push("\\upharpoonleft");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21C3");
Hu.push("\\downharpoonleft");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u22B6");
Hu.push("\\origof");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u22B7");
Hu.push("\\imageof");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u22B8");
Hu.push("\\multimap");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21AD");
Hu.push("\\leftrightsquigarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21C9");
Hu.push("\\rightrightarrows");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21C4");
Hu.push("\\rightleftarrows");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21A0");
Hu.push("\\twoheadrightarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21A3");
Hu.push("\\rightarrowtail");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21AC");
Hu.push("\\looparrowright");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21B7");
Hu.push("\\curvearrowright");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21BB");
Hu.push("\\circlearrowright");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21B1");
Hu.push("\\Rsh");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21CA");
Hu.push("\\downdownarrows");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21BE");
Hu.push("\\upharpoonright");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21C2");
Hu.push("\\downharpoonright");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21DD");
Hu.push("\\rightsquigarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u21DD", "\\leadsto");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u21DB");
Hu.push("\\Rrightarrow");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, Cu, wr, "\u21BE", "\\restriction");
Au(tg, eq, bg, "\u2018", "`");
Au(tg, eq, bg, "$", "\\$");
Au(yf, eq, bg, "$", "\\$");
Au(yf, eq, bg, "$", "\\textdollar");
Au(tg, eq, bg, "%", "\\%");
Au(yf, eq, bg, "%", "\\%");
Au(tg, eq, bg, "_", "\\_");
Au(yf, eq, bg, "_", "\\_");
Au(yf, eq, bg, "_", "\\textunderscore");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u2220");
Hu.push("\\angle");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u221E");
Hu.push("\\infty");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, bg, "\u2032", Ap);
Au(tg, eq, bg, "\u25B3", "\\triangle");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u0393");
Hu.push("\\Gamma");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u0394");
Hu.push("\\Delta");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u0398");
Hu.push("\\Theta");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u039B");
Hu.push("\\Lambda");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u039E");
Hu.push("\\Xi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u03A0");
Hu.push("\\Pi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u03A3");
Hu.push("\\Sigma");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u03A5");
Hu.push("\\Upsilon");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u03A6");
Hu.push("\\Phi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u03A8");
Hu.push("\\Psi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\u03A9");
Hu.push("\\Omega");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, bg, "A", "\u0391");
Au(tg, eq, bg, "B", "\u0392");
Au(tg, eq, bg, "E", "\u0395");
Au(tg, eq, bg, "Z", "\u0396");
Au(tg, eq, bg, "H", "\u0397");
Au(tg, eq, bg, "I", "\u0399");
Au(tg, eq, bg, "K", "\u039A");
Au(tg, eq, bg, "M", "\u039C");
Au(tg, eq, bg, "N", "\u039D");
Au(tg, eq, bg, "O", "\u039F");
Au(tg, eq, bg, "P", "\u03A1");
Au(tg, eq, bg, "T", "\u03A4");
Au(tg, eq, bg, "X", "\u03A7");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(bg);
Hu.push("\xAC");
Hu.push("\\neg");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, bg, "\xAC", "\\lnot");
Au(tg, eq, bg, "\u22A4", "\\top");
Au(tg, eq, bg, "\u22A5", "\\bot");
Au(tg, eq, bg, "\u2205", Es);
Au(tg, Cu, bg, "\u2205", "\\varnothing");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B1");
Hu.push("\\alpha");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B2");
Hu.push("\\beta");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B3");
Hu.push("\\gamma");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B4");
Hu.push("\\delta");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03F5");
Hu.push("\\epsilon");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B6");
Hu.push("\\zeta");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B7");
Hu.push("\\eta");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B8");
Hu.push("\\theta");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B9");
Hu.push("\\iota");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03BA");
Hu.push("\\kappa");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03BB");
Hu.push("\\lambda");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03BC");
Hu.push("\\mu");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03BD");
Hu.push("\\nu");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03BE");
Hu.push("\\xi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03BF");
Hu.push("\\omicron");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C0");
Hu.push("\\pi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C1");
Hu.push("\\rho");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C3");
Hu.push("\\sigma");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C4");
Hu.push("\\tau");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C5");
Hu.push("\\upsilon");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03D5");
Hu.push("\\phi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C7");
Hu.push("\\chi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C8");
Hu.push("\\psi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C9");
Hu.push("\\omega");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03B5");
Hu.push("\\varepsilon");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03D1");
Hu.push(Ls);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03D6");
Hu.push("\\varpi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03F1");
Hu.push("\\varrho");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C2");
Hu.push("\\varsigma");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(lk);
Hu.push("\u03C6");
Hu.push("\\varphi");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2217");
Hu.push(lr);
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, tr, "+", "+");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2212");
Hu.push(vq);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u22C5");
Hu.push("\\cdot");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2218");
Hu.push("\\circ");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\xF7");
Hu.push("\\div");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\xB1");
Hu.push("\\pm");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\xD7");
Hu.push("\\times");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2229");
Hu.push("\\cap");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u222A");
Hu.push("\\cup");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2216");
Hu.push("\\setminus");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, tr, "\u2227", "\\land");
Au(tg, eq, tr, "\u2228", "\\lor");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2227");
Hu.push("\\wedge");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(tr);
Hu.push("\u2228");
Hu.push("\\vee");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, bg, "\u221A", Bq);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(hq);
Hu.push(Br);
Hu.push(im);
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, hq, Iu, "\\lvert");
Au(tg, eq, hq, Gu, "\\lVert");
Au(tg, eq, Jr, "?", "?");
Au(tg, eq, Jr, "!", "!");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(Jr);
Hu.push(Cr);
Hu.push(km);
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, Jr, Iu, "\\rvert");
Au(tg, eq, Jr, Gu, "\\rVert");
Au(tg, eq, wr, "=", "=");
Au(tg, eq, wr, op, op);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2248");
Hu.push("\\approx");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2245");
Hu.push("\\cong");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\u2265", "\\ge");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2265");
Hu.push("\\geq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\u2190", "\\gets");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push(no);
Hu.push(aq);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2208");
Hu.push("\\in");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\uE020", "\\@not");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2282");
Hu.push(eu);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2283");
Hu.push("\\supset");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2286");
Hu.push(Js);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2287");
Hu.push(Ks);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2288");
Hu.push("\\nsubseteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2289");
Hu.push("\\nsupseteq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\u22A8", "\\models");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2190");
Hu.push(_r);
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\u2264", "\\le");
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2264");
Hu.push("\\leq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push(ct);
Hu.push(bq);
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(eq);
Hu.push(wr);
Hu.push("\u2192");
Hu.push(fr);
Hu.push(Bu);
Au.apply(void 0, Hu);
Au(tg, eq, wr, "\u2192", "\\to");
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2271");
Hu.push("\\ngeq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = [];
Hu.push(tg);
Hu.push(Cu);
Hu.push(wr);
Hu.push("\u2270");
Hu.push("\\nleq");
Hu.push(Bu);
Au.apply(void 0, Hu);
Hu = "\xA0";
Au(tg, eq, Fu, Hu, "\\ ");
Au(tg, eq, Fu, Hu, "\\space");
Au(tg, eq, Fu, Hu, lq);
Au(yf, eq, Fu, Hu, "\\ ");
Au(yf, eq, Fu, Hu, Wi);
Au(yf, eq, Fu, Hu, "\\space");
Au(yf, eq, Fu, Hu, lq);
Hu = null;
Au(tg, eq, Fu, Hu, tt);
Au(tg, eq, Fu, Hu, cr);
Au(tg, eq, Ku, at, at);
Au(tg, eq, Ku, ";", ";");
Fu = [];
Fu.push(tg);
Fu.push(Cu);
Fu.push(tr);
Fu.push("\u22BC");
Fu.push("\\barwedge");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(Cu);
Fu.push(tr);
Fu.push("\u22BB");
Fu.push("\\veebar");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(tr);
Fu.push("\u2299");
Fu.push("\\odot");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(tr);
Fu.push("\u2295");
Fu.push("\\oplus");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(tr);
Fu.push("\u2297");
Fu.push("\\otimes");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(bg);
Fu.push("\u2202");
Fu.push("\\partial");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(tr);
Fu.push("\u2298");
Fu.push("\\oslash");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(Cu);
Fu.push(tr);
Fu.push("\u229A");
Fu.push("\\circledcirc");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(Cu);
Fu.push(tr);
Fu.push("\u22A1");
Fu.push("\\boxdot");
Fu.push(Bu);
Au.apply(void 0, Fu);
Au(tg, eq, tr, "\u25B3", "\\bigtriangleup");
Au(tg, eq, tr, "\u25BD", "\\bigtriangledown");
Au(tg, eq, tr, Lu, "\\dagger");
Au(tg, eq, tr, "\u22C4", "\\diamond");
Au(tg, eq, tr, "\u22C6", "\\star");
Au(tg, eq, tr, "\u25C3", "\\triangleleft");
Au(tg, eq, tr, "\u25B9", "\\triangleright");
Au(tg, eq, hq, pn, On);
Au(yf, eq, bg, pn, On);
Au(yf, eq, bg, pn, "\\textbraceleft");
Au(tg, eq, Jr, oo, Pn);
Au(yf, eq, bg, oo, Pn);
Au(yf, eq, bg, oo, "\\textbraceright");
Au(tg, eq, hq, pn, yo);
Au(tg, eq, Jr, oo, Do);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(hq);
Fu.push(pp);
Fu.push(zo);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(yf);
Fu.push(eq);
Fu.push(bg);
Fu.push(pp);
Fu.push(zo);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(Jr);
Fu.push(Km);
Fu.push(Eo);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(yf);
Fu.push(eq);
Fu.push(bg);
Fu.push(Km);
Fu.push(Eo);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(hq);
Fu.push("(");
Fu.push(Co);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(Jr);
Fu.push(kr);
Fu.push(Ho);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(yf);
Fu.push(eq);
Fu.push(bg);
Fu.push(ct);
Fu.push("\\textless");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(yf);
Fu.push(eq);
Fu.push(bg);
Fu.push(no);
Fu.push("\\textgreater");
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(hq);
Fu.push("\u230A");
Fu.push(Ao);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(Jr);
Fu.push("\u230B");
Fu.push(Fo);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(hq);
Fu.push("\u2308");
Fu.push(yp);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(Jr);
Fu.push("\u2309");
Fu.push(Bp);
Fu.push(Bu);
Au.apply(void 0, Fu);
Au(tg, eq, bg, Lm, Xr);
Au(tg, eq, bg, Iu, tm);
Au(tg, eq, bg, Iu, Cq);
Fu = [];
Fu.push(yf);
Fu.push(eq);
Fu.push(bg);
Fu.push(tm);
Fu.push("\\textbar");
Fu.push(Bu);
Au.apply(void 0, Fu);
Au(tg, eq, bg, Gu, qp);
Au(tg, eq, bg, Gu, $l);
Au(yf, eq, bg, Gu, "\\textbardbl");
Au(yf, eq, bg, ft, cl);
Au(yf, eq, bg, Lm, "\\textbackslash");
Au(yf, eq, bg, "^", "\\textasciicircum");
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(wr);
Fu.push("\u2191");
Fu.push(ok3);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(wr);
Fu.push("\u21D1");
Fu.push(Ll);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(wr);
Fu.push("\u2193");
Fu.push(vj);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(wr);
Fu.push("\u21D3");
Fu.push(Mk);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(wr);
Fu.push("\u2195");
Fu.push(fm);
Fu.push(Bu);
Au.apply(void 0, Fu);
Fu = [];
Fu.push(tg);
Fu.push(eq);
Fu.push(wr);
Fu.push("\u21D5");
Fu.push(bm);
Fu.push(Bu);
Au.apply(void 0, Fu);
Au(tg, eq, Eu, "\u2210", au);
Au(tg, eq, Eu, "\u22C1", Yt);
Au(tg, eq, Eu, "\u22C0", Bs);
Au(tg, eq, Eu, "\u2A04", As);
Au(tg, eq, Eu, "\u22C2", Wt);
Au(tg, eq, Eu, "\u22C3", Xt);
Au(tg, eq, Eu, "\u222B", "\\int");
Au(tg, eq, Eu, "\u222B", "\\intop");
Au(tg, eq, Eu, "\u222C", Aq);
Au(tg, eq, Eu, "\u222D", xp);
Au(tg, eq, Eu, "\u220F", "\\prod");
Au(tg, eq, Eu, "\u2211", "\\sum");
Au(tg, eq, Eu, "\u2A02", Yr);
Au(tg, eq, Eu, "\u2A01", ys);
Au(tg, eq, Eu, "\u2A00", rt);
Au(tg, eq, Eu, "\u222E", "\\oint");
Au(tg, eq, Eu, "\u222F", pl);
Au(tg, eq, Eu, "\u2230", Jk);
Au(tg, eq, Eu, "\u2A06", zs);
Au(tg, eq, Eu, "\u222B", Is);
Fu = "\u2026";
Au(yf, eq, Rm, Fu, "\\textellipsis");
Au(tg, eq, Rm, Fu, "\\mathellipsis");
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(Rm);
Eu.push(Fu);
Eu.push(zp);
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(tg);
Eu.push(eq);
Eu.push(Rm);
Eu.push(Fu);
Eu.push(zp);
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(tg);
Eu.push(eq);
Eu.push(Rm);
Eu.push("\u22EF");
Eu.push(Ut);
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(tg);
Eu.push(eq);
Eu.push(Rm);
Eu.push("\u22F1");
Eu.push("\\ddots");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = "\\varvdots";
Au(tg, eq, bg, "\u22EE", Eu);
Au(yf, eq, bg, "\u22EE", Eu);
Au(tg, eq, Du, "\u02CA", "\\acute");
Au(tg, eq, Du, "\u02CB", "\\grave");
Au(tg, eq, Du, "\xA8", "\\ddot");
Au(tg, eq, Du, ft, "\\tilde");
Au(tg, eq, Du, "\u02C9", "\\bar");
Au(tg, eq, Du, "\u02D8", "\\breve");
Au(tg, eq, Du, "\u02C7", "\\check");
Au(tg, eq, Du, "^", "\\hat");
Au(tg, eq, Du, "\u20D7", Gr);
Au(tg, eq, Du, "\u02D9", "\\dot");
Au(tg, eq, Du, "\u02DA", Gs);
Au(tg, eq, lk, "\uE131", "\\@imath");
Au(tg, eq, lk, "\uE237", "\\@jmath");
Au(tg, eq, bg, "\u0131", "\u0131");
Au(tg, eq, bg, "\u0237", "\u0237");
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\u0131");
Eu.push("\\i");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\u0237");
Eu.push("\\j");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\xDF");
Eu.push("\\ss");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\xE6");
Eu.push("\\ae");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\u0153");
Eu.push("\\oe");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\xF8");
Eu.push("\\o");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\xC6");
Eu.push("\\AE");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\u0152");
Eu.push("\\OE");
Eu.push(Bu);
Au.apply(void 0, Eu);
Eu = [];
Eu.push(yf);
Eu.push(eq);
Eu.push(bg);
Eu.push("\xD8");
Eu.push("\\O");
Eu.push(Bu);
Au.apply(void 0, Eu);
Au(yf, eq, Du, "\u02CA", "\\'");
Au(yf, eq, Du, "\u02CB", "\\`");
Au(yf, eq, Du, "\u02C6", "\\^");
Au(yf, eq, Du, "\u02DC", "\\~");
Au(yf, eq, Du, "\u02C9", "\\=");
Au(yf, eq, Du, "\u02D8", "\\u");
Au(yf, eq, Du, "\u02D9", "\\.");
Au(yf, eq, Du, "\xB8", "\\c");
Au(yf, eq, Du, "\u02DA", "\\r");
Au(yf, eq, Du, "\u02C7", "\\v");
Au(yf, eq, Du, "\xA8", '\\"');
Au(yf, eq, Du, "\u02DD", "\\H");
Au(yf, eq, Du, "\u25EF", bk);
Du = {};
Object.assign(Du, { "--": Bu, "---": Bu, "``": Bu, "''": Bu });
lb = Du;
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push("\u2013");
Du.push("--");
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, "\u2013", "\\textendash");
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push("\u2014");
Du.push("---");
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, "\u2014", "\\textemdash");
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push("\u2018");
Du.push("`");
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, "\u2018", "\\textquoteleft");
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push("\u2019");
Du.push(Cj);
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, "\u2019", "\\textquoteright");
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push("\u201C");
Du.push("``");
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, "\u201C", "\\textquotedblleft");
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push("\u201D");
Du.push("''");
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, "\u201D", "\\textquotedblright");
Du = [];
Du.push(tg);
Du.push(eq);
Du.push(bg);
Du.push("\xB0");
Eu = "\\degree";
Du.push(Eu);
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, "\xB0", Eu);
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push("\xB0");
Du.push("\\textdegree");
Du.push(Bu);
Au.apply(void 0, Du);
Eu = "\xA3";
Fu = "\\pounds";
Au(tg, eq, bg, Eu, Fu);
Du = [];
Du.push(tg);
Du.push(eq);
Du.push(bg);
Du.push(Eu);
Du.push("\\mathsterling");
Du.push(Bu);
Au.apply(void 0, Du);
Au(yf, eq, bg, Eu, Fu);
Du = [];
Du.push(yf);
Du.push(eq);
Du.push(bg);
Du.push(Eu);
Du.push("\\textsterling");
Du.push(Bu);
Au.apply(void 0, Du);
Bu = "\\maltese";
Au(tg, Cu, bg, "\u2720", Bu);
Au(yf, Cu, bg, "\u2720", Bu);
Du = '0123456789/@."';
Bu = 0;
for (; Bu < Du.length; ) {
  Eu = Du.charAt(Bu);
  Au(tg, eq, bg, Eu, Eu);
  Bu = Bu + 1;
}
Du = '0123456789!@*()-=+";:?/.,';
Bu = 0;
for (; Bu < Du.length; ) {
  Eu = Du.charAt(Bu);
  Au(yf, eq, bg, Eu, Eu);
  Bu = Bu + 1;
}
Eu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
Du = 0;
for (; Du < Eu.length; ) {
  Bu = Eu.charAt(Du);
  Au(tg, eq, lk, Bu, Bu);
  Au(yf, eq, bg, Bu, Bu);
  Du = Du + 1;
}
Au(tg, Cu, bg, "C", "\u2102");
Au(yf, Cu, bg, "C", "\u2102");
Au(tg, Cu, bg, "H", "\u210D");
Au(yf, Cu, bg, "H", "\u210D");
Au(tg, Cu, bg, "N", "\u2115");
Au(yf, Cu, bg, "N", "\u2115");
Au(tg, Cu, bg, "P", "\u2119");
Au(yf, Cu, bg, "P", "\u2119");
Au(tg, Cu, bg, "Q", "\u211A");
Au(yf, Cu, bg, "Q", "\u211A");
Au(tg, Cu, bg, "R", "\u211D");
Au(yf, Cu, bg, "R", "\u211D");
Au(tg, Cu, bg, "Z", "\u2124");
Au(yf, Cu, bg, "Z", "\u2124");
Au(tg, eq, lk, "h", "\u210E");
Au(yf, eq, lk, "h", "\u210E");
Cu = 0;
for (; Cu < Eu.length; ) {
  Bu = Eu.charAt(Cu);
  Du = xu;
  Fu = String.fromCharCode(Du, 56320 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Fu = String.fromCharCode(Du, 56372 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Fu = String.fromCharCode(Du, 56424 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Fu = String.fromCharCode(Du, 56580 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Fu = String.fromCharCode(Du, 56684 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Fu = String.fromCharCode(Du, 56736 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Fu = String.fromCharCode(Du, 56788 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Fu = String.fromCharCode(Du, 56840 + Cu);
  Au(tg, eq, lk, Bu, Fu);
  Au(yf, eq, bg, Bu, Fu);
  Du = String.fromCharCode(Du, 56944 + Cu);
  Au(tg, eq, lk, Bu, Du);
  Au(yf, eq, bg, Bu, Du);
  Cu < 26 && (Du = String.fromCharCode(xu, 56632 + Cu), Au(tg, eq, lk, Bu, Du), Au(yf, eq, bg, Bu, Du), Du = String.fromCharCode(xu, 56476 + Cu), Au(tg, eq, lk, Bu, Du), Au(yf, eq, bg, Bu, Du));
  Cu = Cu + 1;
}
Bu = String.fromCharCode(xu, 56668);
Au(tg, eq, lk, "k", Bu);
Au(yf, eq, bg, "k", Bu);
Cu = 0;
for (; Cu < 10; ) {
  Bu = Cu.toString();
  Du = xu;
  Eu = String.fromCharCode(Du, 57294 + Cu);
  Au(tg, eq, lk, Bu, Eu);
  Au(yf, eq, bg, Bu, Eu);
  Eu = String.fromCharCode(Du, 57314 + Cu);
  Au(tg, eq, lk, Bu, Eu);
  Au(yf, eq, bg, Bu, Eu);
  Eu = String.fromCharCode(Du, 57324 + Cu);
  Au(tg, eq, lk, Bu, Eu);
  Au(yf, eq, bg, Bu, Eu);
  Du = String.fromCharCode(Du, 57334 + Cu);
  Au(tg, eq, lk, Bu, Du);
  Au(yf, eq, bg, Bu, Du);
  Cu = Cu + 1;
}
Da = "\xD0\xDE\xFE";
Cu = 0;
for (; Cu < Da.length; ) {
  Bu = Da.charAt(Cu);
  Au(tg, eq, lk, Bu, Bu);
  Au(yf, eq, bg, Bu, Bu);
  Cu = Cu + 1;
}
var ha = void 0;
var mb = void 0;
var Jc = void 0;
Au = [];
Bu = [];
Bu.push(Bn);
Bu.push($k);
Bu.push(Kl);
Au.push(Bu);
Bu = [];
Bu.push(Bn);
Bu.push($k);
Bu.push(Kl);
Au.push(Bu);
Bu = [];
Bu.push(un);
Bu.push(nj);
Bu.push(Tr);
Au.push(Bu);
Bu = [];
Bu.push(un);
Bu.push(nj);
Bu.push(Tr);
Au.push(Bu);
Bu = [];
Bu.push(Ri);
Bu.push(Ri);
Cu = "Main-BoldItalic";
Bu.push(Cu);
Au.push(Bu);
Bu = [];
Bu.push(Ri);
Bu.push(Ri);
Bu.push(Cu);
Au.push(Bu);
Bu = [];
Bu.push("mathscr");
Bu.push("textscr");
Ku = "Script-Regular";
Bu.push(Ku);
Au.push(Bu);
Bu = [];
Bu.push(lh);
Bu.push(lh);
Bu.push(lh);
Au.push(Bu);
Bu = [];
Bu.push(lh);
Bu.push(lh);
Bu.push(lh);
Au.push(Bu);
Bu = [];
Bu.push(lh);
Bu.push(lh);
Bu.push(lh);
Au.push(Bu);
Cu = [];
Cu.push(lu);
Du = "textfrak";
Cu.push(Du);
Bu = "Fraktur-Regular";
Cu.push(Bu);
Au.push(Cu);
Cu = [];
Cu.push(lu);
Cu.push(Du);
Cu.push(Bu);
Au.push(Cu);
Cu = [];
Cu.push("mathbb");
Cu.push("textbb");
Cu.push(Sr);
Au.push(Cu);
Cu = [];
Cu.push("mathbb");
Cu.push("textbb");
Cu.push(Sr);
Au.push(Cu);
Cu = [];
Du = "mathboldfrak";
Cu.push(Du);
Eu = "textboldfrak";
Cu.push(Eu);
Cu.push(Bu);
Au.push(Cu);
Cu = [];
Cu.push(Du);
Cu.push(Eu);
Cu.push(Bu);
Au.push(Cu);
Du = [];
Eu = "mathsf";
Du.push(Eu);
Du.push(Kq);
Cu = "SansSerif-Regular";
Du.push(Cu);
Au.push(Du);
Du = [];
Du.push(Eu);
Du.push(Kq);
Du.push(Cu);
Au.push(Du);
Du = [];
Fu = "mathboldsf";
Du.push(Fu);
Gu = "textboldsf";
Du.push(Gu);
Hu = "SansSerif-Bold";
Du.push(Hu);
Au.push(Du);
Du = [];
Du.push(Fu);
Du.push(Gu);
Du.push(Hu);
Au.push(Du);
Du = [];
Ju = "mathitsf";
Du.push(Ju);
Lu = "textitsf";
Du.push(Lu);
Iu = "SansSerif-Italic";
Du.push(Iu);
Au.push(Du);
Du = [];
Du.push(Ju);
Du.push(Lu);
Du.push(Iu);
Au.push(Du);
Du = [];
Du.push(lh);
Du.push(lh);
Du.push(lh);
Au.push(Du);
Du = [];
Du.push(lh);
Du.push(lh);
Du.push(lh);
Au.push(Du);
Du = [];
Ju = "mathtt";
Du.push(Ju);
Du.push(Gn);
Du.push(io);
Au.push(Du);
Du = [];
Du.push(Ju);
Du.push(Gn);
Du.push(io);
Au.push(Du);
ha = Au;
Au = [];
Du = [];
Du.push(Bn);
Du.push($k);
Du.push(Kl);
Au.push(Du);
Du = [];
Du.push(lh);
Du.push(lh);
Du.push(lh);
Au.push(Du);
Du = [];
Du.push(Eu);
Du.push(Kq);
Du.push(Cu);
Au.push(Du);
Du = [];
Du.push(Fu);
Du.push(Gu);
Du.push(Hu);
Au.push(Du);
Du = [];
Du.push(Ju);
Du.push(Gn);
Du.push(io);
Au.push(Du);
mb = Au;
Jc = ge;
var ia = void 0;
var F = void 0;
var Kc = void 0;
var Lc = void 0;
var Ea = void 0;
var w = void 0;
var nb = void 0;
var ob = void 0;
var Mc = void 0;
var ja = void 0;
var pb = void 0;
var qb = void 0;
ia = (Au2, Bu2, Cu2) => {
  if (o[Cu2][Au2]) {
    var Du2 = o[Cu2][Au2];
    Du2 = !!Du2.replace;
  } else {
    Du2 = false;
  }
  Du2 && (Au2 = o[Cu2][Au2], Au2 = Au2.replace);
  Du2 = {};
  Object.assign(Du2, { value: Au2, metrics: Aa(Au2, Bu2, Cu2) });
  return Du2;
};
F = (Au2, Bu2, Cu2, Du2, Eu2) => {
  Au2 = ia(Au2, Bu2, Cu2);
  var Fu2 = Au2.metrics;
  var Gu2 = Au2.value;
  if (Fu2) {
    var Hu2 = Fu2.italic;
    var gv = void 0;
    (Cu2 === yf || Du2 && Du2.font === Fq) && (Hu2 = 0);
    Au2 = [];
    Au2.push(Gu2);
    Au2.push(Fu2.height);
    Au2.push(Fu2.depth);
    Au2.push(Hu2);
    Au2.push(Fu2.skew);
    Au2.push(Fu2.width);
    Au2.push(Eu2);
    Au2 = Reflect.construct(v, Au2);
  } else {
    gv = void 0;
    !(typeof globalThis.console !== tk) || wa("No character metrics " + ("for '" + Gu2 + "' in style '" + Bu2 + "' and mode '" + Cu2 + Cj));
    Au2 = [];
    Au2.push(Gu2);
    Au2.push(0);
    Au2.push(0);
    Au2.push(0);
    Au2.push(0);
    Au2.push(0);
    Au2.push(Eu2);
    Au2 = Reflect.construct(v, Au2);
  }
  !Du2 || (Au2.maxFontSize = Du2.sizeMultiplier, Bu2 = Du2.style, !Bu2.isTight() || Au2.classes.push(Hq), Bu2 = Du2.getColor(), !Bu2 || (Cu2 = Au2.style, Cu2.color = Bu2));
  return Au2;
};
Kc = ie;
Lc = (Au2, Bu2) => {
  var Cu2 = O(Au2.classes);
  Cu2 !== O(Bu2.classes) ? Cu2 = true : (Cu2 = Au2.skew, Cu2 = Cu2 !== Bu2.skew);
  Cu2 ? Cu2 = true : (Cu2 = Au2.maxFontSize, Cu2 = Cu2 !== Bu2.maxFontSize);
  if (Cu2) return false;
  Cu2 = Au2.classes;
  Cu2 = Cu2.length;
  if (1 === Cu2) {
    Cu2 = Au2.classes[0];
    if (Cu2 === Em || Cu2 === wg) return false;
  }
  var Eu2 = u(Au2.style);
  var Gu2 = Eu2.length | 0;
  var Du2 = 0, Fu2;
  while (Du2 < Gu2) {
    Cu2 = Eu2[Du2];
    l(Au2.style, Cu2) ? (Fu2 = Au2.style[Cu2], Cu2 = Fu2 !== Bu2.style[Cu2]) : Cu2 = false;
    if (Cu2) return false;
    Du2 = Du2 + 1;
  }
  Eu2 = u(Bu2.style);
  Gu2 = Eu2.length | 0;
  Du2 = 0;
  while (Du2 < Gu2) {
    Cu2 = Eu2[Du2];
    l(Bu2.style, Cu2) ? (Fu2 = Au2.style[Cu2], Cu2 = Fu2 !== Bu2.style[Cu2]) : Cu2 = false;
    if (Cu2) return false;
    Du2 = Du2 + 1;
  }
  return true;
};
Ea = (Au2) => {
  var Cu2 = 0, Du2 = 0, Eu2 = 0, Fu2 = 0, Bu2;
  for (; ; ) {
    Bu2 = Au2.children;
    if (Fu2 >= Bu2.length) {
      break;
    }
    Bu2 = Au2.children[Fu2];
    Bu2.height > Cu2 && (Cu2 = Bu2.height);
    Bu2.depth > Du2 && (Du2 = Bu2.depth);
    Bu2.maxFontSize > Eu2 && (Eu2 = Bu2.maxFontSize);
    Fu2 = Fu2 + 1;
  }
  Object.assign(Au2, { height: Cu2, depth: Du2, maxFontSize: Eu2 });
};
w = (Au2, Bu2, Cu2, Du2) => {
  Au2 = new P(Au2, Bu2, Cu2, Du2);
  Ea(Au2);
  return Au2;
};
nb = (Au2, Bu2, Cu2, Du2) => new P(Au2, Bu2, Cu2, Du2);
ob = (Au2) => {
  Au2 = new J(Au2);
  Ea(Au2);
  return Au2;
};
Mc = (Au2) => {
  var Bu2 = Au2.positionType;
  if (Bu2 === kg) {
    Au2 = Au2.children;
    var Cu2 = [];
    Cu2.push(Au2[0]);
    Bu2 = 0;
    var Du2 = Au2[0];
    Du2 = +(Bu2 - +Du2.shift);
    Bu2 = Au2[0];
    Bu2 = Bu2.elem;
    var Fu2 = Du2 - +Bu2.depth;
    Du2 = Fu2;
    Bu2 = 1;
    while (Bu2 < Au2.length) {
      var Eu2 = 0;
      var Gu2 = Au2[Bu2];
      Gu2 = +(+(Eu2 - +Gu2.shift) - +Du2);
      Eu2 = Au2[Bu2];
      Eu2 = Eu2.elem;
      Eu2 = Gu2 - +Eu2.depth;
      var Hu2 = +Eu2;
      Gu2 = +Bu2;
      Gu2 = Au2[Gu2 - 1].elem;
      Gu2 = Gu2.height;
      Gu2 = Hu2 - +(Gu2 + Au2[+Bu2 - 1].elem.depth);
      Du2 = Du2 + Eu2;
      Eu2 = {};
      Object.assign(Eu2, { type: kh, size: Gu2 });
      Cu2.push(Eu2);
      Cu2.push(Au2[Bu2]);
      Bu2 = Bu2 + 1;
    }
    Au2 = {};
    Object.assign(Au2, { children: Cu2, depth: Fu2 });
    return Au2;
  }
  Bu2 = Au2.positionType;
  if (Bu2 === _l) {
    Bu2 = Au2.positionData;
    Du2 = 0;
    for (; ; ) {
      Cu2 = Au2.children;
      if (Du2 >= Cu2.length) {
        break;
      }
      Cu2 = Au2.children[Du2];
      Eu2 = Cu2.type;
      Eu2 === kh ? Cu2.size : (Eu2 = Cu2.elem, Eu2 = Eu2.height, Fu2 = Cu2.elem, Eu2 + Fu2.depth);
      Eu2 = Cu2.type;
      Eu2 === kh ? Cu2 = Cu2.size : (Eu2 = Cu2.elem, Eu2 = Eu2.height, Cu2 = Cu2.elem, Cu2 = Eu2 + Cu2.depth);
      Bu2 = +Bu2 - +Cu2;
      Du2 = Du2 + 1;
    }
  } else {
    Bu2 = Au2.positionType;
    if (Bu2 === lj) {
      Bu2 = 0;
      Bu2 = Bu2 - +Au2.positionData;
    } else {
      Bu2 = Au2.children[0];
      Cu2 = Bu2.type;
      if (Cu2 !== Yf) throw t('First child must have type "elem".');
      Cu2 = Au2.positionType;
      if (Cu2 === mg) {
        Cu2 = 0;
        Bu2 = Bu2.elem;
        Bu2 = +(Cu2 - +Bu2.depth);
        Bu2 = Bu2 - +Au2.positionData;
      } else {
        Cu2 = Au2.positionType;
        if (Cu2 === Ug) {
          Cu2 = 0;
          Bu2 = Bu2.elem;
          Bu2 = Cu2 - +Bu2.depth;
        } else {
          throw t("Invalid positionType " + Au2.positionType + Bk);
        }
      }
    }
  }
  Cu2 = {};
  Object.assign(Cu2, { children: Au2.children, depth: Bu2 });
  return Cu2;
};
ja = (Au2, Bu2, Cu2) => {
  var Du2 = {};
  Object.assign(Du2, { amsrm: "AMS", textrm: "Main", textsf: "SansSerif", texttt: ws });
  Du2 = Du2[Au2];
  var Eu2;
  Du2 === void 0 || Du2 == null || (Au2 = Du2);
  Du2 = Bu2 === nj;
  Cu2 = Cu2 === nj;
  Bu2 = Bu2 === $k ? Cu2 ? "BoldItalic" : "Bold" : Du2 ? "Italic" : "Regular";
  return Au2 + vq + Bu2 + "";
};
Au = {};
Du = {};
Object.assign(Du, { variant: dq, fontName: Kl });
Au.mathbf = Du;
Du = {};
Object.assign(Du, { variant: Xk, fontName: vk });
Au.mathrm = Du;
Du = {};
Du.variant = Rg;
Fu = "Main-Italic";
Du.fontName = Fu;
Au.textit = Du;
Du = {};
Object.assign(Du, { variant: Rg, fontName: Fu });
Au.mathit = Du;
Du = {};
Object.assign(Du, { variant: Rg, fontName: Tr });
Au.mathnormal = Du;
Du = {};
Object.assign(Du, { variant: Tk, fontName: Iu });
Au.mathsfit = Du;
Du = {};
Object.assign(Du, { variant: Uq, fontName: Sr });
Au.mathbb = Du;
Du = {};
Object.assign(Du, { variant: Gi, fontName: "Caligraphic-Regular" });
Au.mathcal = Du;
Du = {};
Object.assign(Du, { variant: "fraktur", fontName: Bu });
Au.mathfrak = Du;
Bu = {};
Object.assign(Bu, { variant: Gi, fontName: Ku });
Au.mathscr = Bu;
Bu = {};
Object.assign(Bu, { variant: wn, fontName: Cu });
Au.mathsf = Bu;
Bu = {};
Object.assign(Bu, { variant: Ql, fontName: io });
Au.mathtt = Bu;
pb = Au;
Au = {};
Bu = [];
Bu.push("vec");
Bu.push(0.471);
Bu.push(0.714);
Au.vec = Bu;
Bu = [];
Bu.push(Vs);
Bu.push(0.957);
Bu.push(0.499);
Au.oiintSize1 = Bu;
Bu = [];
Bu.push(Ws);
Bu.push(1.472);
Bu.push(0.659);
Au.oiintSize2 = Bu;
Bu = [];
Bu.push(js);
Bu.push(1.304);
Bu.push(0.499);
Au.oiiintSize1 = Bu;
Bu = [];
Bu.push(ks);
Bu.push(1.98);
Bu.push(0.659);
Au.oiiintSize2 = Bu;
qb = Au;
Au = {};
Object.assign(Au, { fontMap: pb, makeSymbol: F, mathsym: he, makeSpan: w, makeSvgSpan: nb, makeLineSpan: (Au2, Bu2, Cu2) => {
  var Du2 = [];
  Du2.push(Au2);
  Au2 = w(Du2, [], Bu2);
  Cu2 = Cu2 || Bu2.fontMetrics().defaultRuleThickness;
  Au2.height = Math.max(Cu2, Bu2.minRuleThickness);
  Bu2 = Au2.style;
  Bu2.borderBottomWidth = d(Au2.height);
  Au2.maxFontSize = 1;
  return Au2;
}, makeAnchor: (Au2, Bu2, Cu2, Du2) => {
  Au2 = new U(Au2, Bu2, Cu2, Du2);
  Ea(Au2);
  return Au2;
}, makeFragment: ob, wrapFragment: (Au2, Bu2) => {
  if (m(Au2, J)) {
    var Cu2 = [];
    Cu2.push(Au2);
    return w([], Cu2, Bu2);
  }
  return Au2;
}, makeVList: (Au2, Bu2) => {
  Au2 = Mc(Au2);
  var Du2 = Au2.children;
  Bu2 = Au2.depth;
  var Au2 = 0, Cu2 = 0, Eu2, Fu2, Ku2, Lu2, Iu2, Ju2, Gu2, Hu2, Mu2, Nu2;
  var Sv = void 0;
  while (Cu2 < Du2.length) {
    Eu2 = Du2[Cu2];
    Fu2 = Eu2.type;
    Fu2 === Yf && (Eu2 = Eu2.elem, Au2 = Math.max(Au2, Eu2.maxFontSize, Eu2.height));
    Cu2 = Cu2 + 1;
  }
  Ku2 = Au2 + 2;
  Au2 = [];
  Au2.push("pstrut");
  Lu2 = w(Au2, []);
  Au2 = Lu2.style;
  Au2.height = d(Ku2);
  Mu2 = [];
  Gu2 = Bu2;
  Cu2 = Bu2;
  Hu2 = 0;
  var Uv = void 0;
  var Vv = void 0;
  while (Hu2 < Du2.length) {
    Au2 = Du2[Hu2];
    Eu2 = Au2.type;
    Eu2 === kh ? Cu2 = Cu2 + Au2.size : (Eu2 = Au2.elem, Fu2 = Au2.wrapperClasses, Fu2 = Fu2 || [], Iu2 = Au2.wrapperStyle, Iu2 = Iu2 || {}, Ju2 = [], Ju2.push(Lu2), Ju2.push(Eu2), Fu2 = w(Fu2, Ju2, void 0, Iu2), Iu2 = Fu2.style, Ju2 = d, Nu2 = +(+(0 - +Ku2) - +Cu2), Iu2.top = Ju2(Nu2 - +Eu2.depth), !Au2.marginLeft || (Iu2 = Fu2.style, Iu2.marginLeft = Au2.marginLeft), !Au2.marginRight || (Iu2 = Fu2.style, Iu2.marginRight = Au2.marginRight), Mu2.push(Fu2), Au2 = Eu2.height, Cu2 = Cu2 + (Au2 + Eu2.depth));
    Bu2 = Math.min(Bu2, Cu2);
    Gu2 = Math.max(Gu2, Cu2);
    Hu2 = Hu2 + 1;
  }
  Au2 = [];
  Au2.push("vlist");
  Cu2 = w(Au2, Mu2);
  Au2 = Cu2.style;
  Au2.height = d(Gu2);
  Bu2 < 0 ? (Eu2 = w([], []), Au2 = [], Au2.push("vlist"), Du2 = [], Du2.push(Eu2), Eu2 = w(Au2, Du2), Au2 = Eu2.style, Du2 = d, Au2.height = Du2(0 - +Bu2), Au2 = [], Au2.push("vlist-s"), Du2 = [], Du2.push(new v("\u200B")), Hu2 = w(Au2, Du2), Au2 = [], Fu2 = [], Fu2.push("vlist-r"), Du2 = [], Du2.push(Cu2), Du2.push(Hu2), Au2.push(w(Fu2, Du2)), Cu2 = [], Cu2.push("vlist-r"), Du2 = [], Du2.push(Eu2), Au2.push(w(Cu2, Du2))) : (Au2 = [], Du2 = [], Du2.push("vlist-r"), Eu2 = [], Eu2.push(Cu2), Au2.push(w(Du2, Eu2)));
  Cu2 = [];
  Cu2.push("vlist-t");
  Cu2 = w(Cu2, Au2);
  Au2 = Au2.length;
  2 === Au2 && Cu2.classes.push("vlist-t2");
  Object.assign(Cu2, { height: Gu2, depth: 0 - +Bu2 });
  return Cu2;
}, makeOrd: je, makeGlue: (Au2, Bu2) => {
  let Cu2 = [];
  Cu2.push(Mh);
  Cu2 = w(Cu2, [], Bu2);
  Au2 = r(Au2, Bu2);
  Bu2 = Cu2.style;
  Bu2.marginRight = d(Au2);
  return Cu2;
}, staticSvg: (Au2, Bu2) => {
  Au2 = qb[Au2];
  let Eu2 = Au2[0], Cu2 = Au2[1], Du2 = Au2[2];
  Au2 = new K(Eu2);
  Eu2 = [];
  Eu2.push(Au2);
  Au2 = {};
  Object.assign(Au2, { width: d(Cu2), height: d(Du2), style: "width:" + d(Cu2) });
  let Fu2 = Tn + +yu * +Cu2 + Wi;
  Object.assign(Au2, { viewBox: Fu2 + +yu * +Du2, preserveAspectRatio: Lk });
  Fu2 = new I(Eu2, Au2);
  Au2 = [];
  Au2.push("overlay");
  Eu2 = [];
  Eu2.push(Fu2);
  Au2 = nb(Au2, Eu2, Bu2);
  Au2.height = Du2;
  Bu2 = Au2.style;
  Bu2.height = d(Du2);
  Bu2 = Au2.style;
  Bu2.width = d(Cu2);
  return Au2;
}, svgData: qb, tryCombineChars: (Au2) => {
  var Cu2 = 0, Bu2, Du2, Eu2;
  for (; ; ) {
    Bu2 = Au2.length;
    if (Cu2 >= Bu2 - 1) {
      break;
    }
    Bu2 = Au2[Cu2];
    Du2 = Au2[Cu2 + 1];
    m(Bu2, v) && m(Du2, v) && Lc(Bu2, Du2) && (Eu2 = Bu2.text, Object.assign(Bu2, { text: Eu2 + Du2.text, height: Math.max(Bu2.height, Du2.height), depth: Math.max(Bu2.depth, Du2.depth), italic: Du2.italic }), Au2.splice(Cu2 + 1, 1), Cu2 = Cu2 + -1);
    Cu2 = Cu2 + 1;
  }
  return Au2;
} });
var a = void 0;
a = Au;
var Nc = void 0;
var Oc = void 0;
Au = {};
Object.assign(Au, { number: 3, unit: St });
Cu = {};
Object.assign(Cu, { number: 4, unit: St });
Bu = {};
Object.assign(Bu, { number: 5, unit: St });
Du = {};
Eu = {};
Object.assign(Eu, { mop: Au, mbin: Cu, mrel: Bu, minner: Au });
Du.mord = Eu;
Eu = {};
Object.assign(Eu, { mord: Au, mop: Au, mrel: Bu, minner: Au });
Du.mop = Eu;
Eu = {};
Object.assign(Eu, { mord: Cu, mop: Cu, mopen: Cu, minner: Cu });
Du.mbin = Eu;
Eu = {};
Object.assign(Eu, { mord: Bu, mop: Bu, mopen: Bu, minner: Bu });
Object.assign(Du, { mrel: Eu, mopen: {} });
Eu = {};
Object.assign(Eu, { mop: Au, mbin: Cu, mrel: Bu, minner: Au });
Du.mclose = Eu;
Eu = {};
Object.assign(Eu, { mord: Au, mop: Au, mrel: Bu, mopen: Au, mclose: Au });
Fu = "mpunct";
Object.assign(Eu, { mpunct: Au, minner: Au });
Du.mpunct = Eu;
Eu = {};
Object.assign(Eu, { mord: Au, mop: Au, mbin: Cu, mrel: Bu, mopen: Au, mpunct: Au, minner: Au });
Du.minner = Eu;
Nc = Du;
Bu = {};
Cu = {};
Cu.mop = Au;
Bu.mord = Cu;
Cu = {};
Object.assign(Cu, { mord: Au, mop: Au });
Object.assign(Bu, { mop: Cu, mbin: {}, mrel: {}, mopen: {} });
Cu = {};
Cu.mop = Au;
Object.assign(Bu, { mclose: Cu, mpunct: {} });
Cu = {};
Cu.mop = Au;
Bu.minner = Cu;
Oc = Bu;
var rb = void 0;
var _ = void 0;
var $2 = void 0;
var e = void 0;
var ka = void 0;
var s2 = void 0;
rb = {};
_ = {};
$2 = {};
e = (Au2) => {
  var Cu2 = Au2.type;
  var Eu2 = Au2.names;
  var Bu2 = Au2.props;
  var Hu2 = Au2.handler;
  var Fu2 = Au2.htmlBuilder;
  var Gu2 = Au2.mathmlBuilder;
  Au2 = {};
  Object.assign(Au2, { type: Cu2, numArgs: Bu2.numArgs, argTypes: Bu2.argTypes, allowedInArgument: !!Bu2.allowedInArgument, allowedInText: !!Bu2.allowedInText });
  var Du2 = Bu2.allowedInMath;
  Du2 = Du2 === void 0 || Bu2.allowedInMath;
  Au2.allowedInMath = Du2;
  Du2 = Bu2.numOptionalArgs;
  Du2 = Du2 || 0;
  Object.assign(Au2, { numOptionalArgs: Du2, infix: !!Bu2.infix, primitive: !!Bu2.primitive, handler: Hu2 });
  Bu2 = 0;
  while (Bu2 < Eu2.length) {
    rb[Eu2[Bu2]] = Au2;
    Bu2 = Bu2 + 1;
  }
  !Cu2 || (!Fu2 || (_[Cu2] = Fu2), !Gu2 || ($2[Cu2] = Gu2));
};
Gu = (Au2) => {
  let Bu2 = Au2.type, Cu2 = Au2.htmlBuilder, Du2 = Au2.mathmlBuilder;
  Au2 = {};
  Object.assign(Au2, { type: Bu2, names: [] });
  Bu2 = {};
  Bu2.numArgs = 0;
  Object.assign(Au2, { props: Bu2, handler: function() {
    throw t("Should never be called.");
  }, htmlBuilder: Cu2, mathmlBuilder: Du2 });
  e(Au2);
};
ka = (Au2) => {
  var Bu2 = Au2.type;
  Bu2 === Xf ? (Bu2 = Au2.body, Bu2 = Bu2.length, Bu2 = 1 === Bu2) : Bu2 = false;
  Bu2 && (Au2 = Au2.body[0]);
  return Au2;
};
s2 = (Au2) => {
  var Bu2 = Au2.type;
  Bu2 === Xf ? Bu2 = Au2.body : (Bu2 = [], Bu2.push(Au2));
  return Bu2;
};
var L = void 0;
var Pc = void 0;
var Qc = void 0;
var Rc = void 0;
var Sc = void 0;
var Fa = void 0;
var Ga = void 0;
var sb = void 0;
var Ha = void 0;
var Ia = void 0;
var tb = void 0;
var la = void 0;
var ma = void 0;
L = a.makeSpan;
Au = [];
Au.push(Mo);
Au.push(Em);
Au.push(Uj);
Au.push(fq);
Au.push(ol);
Au.push(Fu);
Pc = Au;
Au = [];
Au.push(Kt);
Au.push(fq);
Au.push(mj);
Au.push(Fu);
Qc = Au;
Au = {};
Object.assign(Au, { display: g.DISPLAY, text: g.TEXT, script: g.SCRIPT, scriptscript: g.SCRIPTSCRIPT });
Rc = Au;
Au = {};
Object.assign(Au, { mord: wg, mop: ol, mbin: Em, mrel: fq, mopen: Uj, mclose: mj, mpunct: Fu, minner: Dn });
Sc = Au;
Fa = (Bu2, Cu2, Du2, Eu2) => {
  if (Eu2 === void 0) {
    Eu2 = [];
    var Fu2 = null;
    Eu2.push(Fu2);
    Eu2.push(Fu2);
  }
  Fu2 = [];
  var Gu2 = 0, Hu2;
  while (Gu2 < Bu2.length) {
    Hu2 = tb(Bu2[Gu2], Cu2);
    m(Hu2, J) ? X(Fu2, Hu2.children) : Fu2.push(Hu2);
    Gu2 = Gu2 + 1;
  }
  a.tryCombineChars(Fu2);
  if (!Du2) return Fu2;
  var Au2 = Cu2;
  Gu2 = Bu2.length;
  1 === Gu2 && (Bu2 = Bu2[0], Gu2 = Bu2.type, Gu2 === _k ? Au2 = Cu2.havingSize(Bu2.size) : (Gu2 = Bu2.type, Gu2 === Sh && (Gu2 = Rc, Au2 = Cu2.havingStyle(Gu2[Bu2.style]))));
  Gu2 = [];
  Bu2 = Eu2[0];
  Bu2 = Bu2 || Mo;
  Gu2.push(Bu2);
  Gu2 = L(Gu2, [], Cu2);
  Hu2 = [];
  Bu2 = Eu2[1];
  Bu2 = Bu2 || Kt;
  Hu2.push(Bu2);
  Bu2 = L(Hu2, [], Cu2);
  Cu2 = Du2 === mt;
  Du2 = {};
  Du2.node = Gu2;
  Ga(Fu2, (Au3, Bu3) => {
    var Cu3 = Bu3.classes;
    Cu3 = Cu3[0];
    var Du3 = Au3.classes[0];
    var Eu3;
    Cu3 === Em && !!i.contains(Qc, Du3) ? Bu3.classes[0] = wg : Du3 === Em && !!i.contains(Pc, Cu3) && (Au3.classes[0] = wg);
  }, Du2, Bu2, Cu2);
  Du2 = {};
  Du2.node = Gu2;
  Ga(Fu2, (Bu3, Cu3) => {
    Cu3 = Ia(Cu3);
    var Du3 = Ia(Bu3);
    var Eu3;
    Bu3 = Cu3 && !!Du3 ? Bu3.hasClass(Hq) ? Oc[Cu3][Du3] : Nc[Cu3][Du3] : null;
    if (Bu3) return a.makeGlue(Bu3, Au2);
  }, Du2, Bu2, Cu2);
  return Fu2;
};
Ga = (Bu2, Cu2, Du2, Eu2, Fu2) => {
  !Eu2 || Bu2.push(Eu2);
  var Au2 = 0;
  for (; ; ) {
    var Gu2 = Au2;
    if (Gu2 >= Bu2.length) {
      break;
    }
    Gu2 = Bu2[Au2];
    var Hu2 = sb(Gu2);
    if (Hu2) {
      Ga(Hu2.children, Cu2, Du2, null, Fu2);
      Au2 = Au2 + 1;
      continue;
    }
    var Iu2 = !Gu2.hasClass(Mh);
    if (Iu2) {
      Hu2 = Cu2(Gu2, Du2.node);
      if (Hu2) {
        var pv = void 0;
        Du2.insertAfter ? Du2.insertAfter(Hu2) : (Bu2.unshift(Hu2), Au2 = Au2 + 1);
      }
    }
    Iu2 ? Du2.node = Gu2 : Fu2 && !!Gu2.hasClass(ul) && (Gu2 = [], Gu2.push(Mo), Du2.node = L(Gu2));
    Du2.insertAfter = /* @__PURE__ */ ((Cu3) => (Du3) => {
      Bu2.splice(Cu3 + 1, 0, Du3);
      Au2 = Au2 + 1;
    })(Au2);
    Au2 = Au2 + 1;
  }
  !Eu2 || Bu2.pop();
};
sb = (Au2) => {
  var Bu2;
  if (m(Au2, J) || m(Au2, U) || m(Au2, P) && !!Au2.hasClass(yt)) return Au2;
  return null;
};
Ha = (Au2, Bu2) => {
  var Cu2 = sb(Au2);
  if (Cu2) {
    var Qu2 = void 0;
    Cu2 = Cu2.children;
    if (Cu2.length) {
      if (Bu2 === Yi) {
        Au2 = Ha;
        Bu2 = Cu2.length;
        return Au2(Cu2[Bu2 - 1], Yi);
      } else {
        if (Bu2 === hj) return Ha(Cu2[0], hj);
      }
    }
  }
  return Au2;
};
Ia = (Au2, Bu2) => {
  if (!Au2) return null;
  !Bu2 || (Au2 = Ha(Au2, Bu2));
  Bu2 = Sc;
  Au2 = Bu2[Au2.classes[0]];
  Au2 = Au2 || null;
  return Au2;
};
tb = ke;
la = (Au2, Bu2) => {
  var Cu2 = [];
  Cu2.push(gg);
  Au2 = L(Cu2, Au2, Bu2);
  Bu2 = [];
  Bu2.push("strut");
  Bu2 = L(Bu2);
  Cu2 = Bu2.style;
  var Du2 = d;
  var Eu2 = Au2.height;
  Cu2.height = Du2(Eu2 + Au2.depth);
  !Au2.depth || (Cu2 = Bu2.style, Du2 = d, Eu2 = 0, Cu2.verticalAlign = Du2(Eu2 - +Au2.depth));
  Cu2 = Au2.children;
  Cu2.unshift(Bu2);
  return Au2;
};
ma = (Au2, Bu2) => {
  var Fu2 = null;
  var Cu2 = Au2.length;
  1 === Cu2 ? (Cu2 = Au2[0], Cu2 = Cu2.type, Cu2 = Cu2 === Zl) : Cu2 = false;
  Cu2 && (Cu2 = Au2[0], Fu2 = Cu2.tag, Au2 = Au2[0], Au2 = Au2.body);
  Cu2 = Fa(Au2, Bu2, mt);
  var Gu2 = void 0;
  Au2 = Cu2.length;
  2 === Au2 && !!Cu2[1].hasClass(Zl) && (Gu2 = Cu2.pop());
  var Eu2 = [];
  var Du2 = [], Au2 = 0, Hu2, Iu2;
  while (Au2 < Cu2.length) {
    Du2.push(Cu2[Au2]);
    if (Cu2[Au2].hasClass(Em) || !!Cu2[Au2].hasClass(fq) || Cu2[Au2].hasClass(Ms)) {
      Hu2 = false;
      for (; ; ) {
        Iu2 = Cu2.length;
        if (!(Au2 < Iu2 - 1 && !!Cu2[Au2 + 1].hasClass(Mh) && !Cu2[Au2 + 1].hasClass(ul))) {
          break;
        }
        Au2 = Au2 + 1;
        Du2.push(Cu2[Au2]);
        !Cu2[Au2].hasClass("nobreak") || (Hu2 = true);
      }
      Hu2 || (Eu2.push(la(Du2, Bu2)), Du2 = []);
    } else {
      !Cu2[Au2].hasClass(ul) || (Du2.pop(), Hu2 = Du2.length, Hu2 > 0 && (Eu2.push(la(Du2, Bu2)), Du2 = []), Eu2.push(Cu2[Au2]));
    }
    Au2 = Au2 + 1;
  }
  Au2 = Du2.length;
  Au2 > 0 && Eu2.push(la(Du2, Bu2));
  Au2 = void 0;
  Fu2 ? (Au2 = la(Fa(Fu2, Bu2, true)), Bu2 = [], Bu2.push(Zl), Au2.classes = Bu2, Eu2.push(Au2)) : !Gu2 || Eu2.push(Gu2);
  Bu2 = [];
  Bu2.push("katex-html");
  Bu2 = L(Bu2, Eu2);
  Bu2.setAttribute("aria-hidden", Dh);
  if (Au2) {
    var Yv = void 0;
    Au2 = Au2.children[0];
    Cu2 = Au2.style;
    Du2 = d;
    Eu2 = Bu2.height;
    Cu2.height = Du2(Eu2 + Bu2.depth);
    !Bu2.depth || (Au2 = Au2.style, Cu2 = d, Du2 = 0, Au2.verticalAlign = Cu2(Du2 - +Bu2.depth));
  }
  return Bu2;
};
var h2 = {};
h2.buildExpression = Fa;
h2.getTypeOfDomTree = Ia;
h2.makeNullDelimiter = (Au2, Bu2) => {
  let Cu2 = [];
  Cu2.push("nulldelimiter");
  return L(Bu2.concat(Cu2.concat(Au2.baseSizingClasses())));
};
h2.buildGroup = tb;
h2.default = ma;
h2.buildHTML = ma;
var x = void 0;
var B = void 0;
Cu = (Au2) => new J(Au2);
x = (0, function() {
  var Du2 = arguments[0];
  var Cu2 = arguments[1];
  var Bu2 = arguments[2];
  this.type = Du2;
  this.attributes = {};
  Cu2 = Cu2 || [];
  this.children = Cu2;
  Bu2 = Bu2 || [];
  this.classes = Bu2;
  return this;
});
Au = x.prototype;
Au.setAttribute = function(Bu2, Cu2) {
  this.attributes[Bu2] = Cu2;
};
Au = x.prototype;
Au.getAttribute = function(Bu2) {
  return this.attributes[Bu2];
};
Au = x.prototype;
Au.toNode = function() {
  var Cu2 = C().createElementNS(_h, this.type);
  var Eu2 = u(this.attributes);
  var Gu2 = Eu2.length | 0;
  var Du2 = 0, Bu2, Fu2;
  while (Du2 < Gu2) {
    Bu2 = Eu2[Du2];
    Fu2 = Object.prototype;
    !Fu2.hasOwnProperty.call(this.attributes, Bu2) || Cu2.setAttribute(Bu2, this.attributes[Bu2]);
    Du2 = Du2 + 1;
  }
  Bu2 = this.classes;
  Bu2 = Bu2.length;
  Bu2 > 0 && (Cu2.className = O(this.classes));
  Bu2 = 0;
  for (; ; ) {
    Du2 = this.children;
    if (Bu2 >= Du2.length) {
      break;
    }
    m(this.children[Bu2], B) ? (Du2 = this.children, Du2 = m(Du2[Bu2 + 1], B)) : Du2 = false;
    if (Du2) {
      Bu2 = Bu2 + 1;
      Du2 = this.children[Bu2];
      Du2 = Du2.toText();
      Du2 = Du2 + this.children[Bu2].toText();
      for (; ; ) {
        Eu2 = this.children;
        if (!m(Eu2[Bu2 + 1], B)) {
          break;
        }
        Bu2 = Bu2 + (1 + 1);
        Eu2 = this.children[Bu2];
        Du2 = Du2 + Eu2.toText();
      }
      Du2 = new B(Du2);
      Cu2.appendChild(Du2.toNode());
    } else {
      Du2 = this.children[Bu2];
      Cu2.appendChild(Du2.toNode());
    }
    Bu2 = Bu2 + 1;
  }
  return Cu2;
};
Au = x.prototype;
Au.toMarkup = function() {
  var Bu2 = ct + this.type;
  var Eu2 = u(this.attributes);
  var Gu2 = Eu2.length | 0;
  var Du2 = 0, Cu2, Fu2;
  while (Du2 < Gu2) {
    Cu2 = Eu2[Du2];
    Fu2 = Object.prototype;
    !Fu2.hasOwnProperty.call(this.attributes, Cu2) || (Bu2 = Bu2 + (Wi + Cu2 + sr), Fu2 = i, Bu2 = Bu2 + Fu2.escape(this.attributes[Cu2]) + pj);
    Du2 = Du2 + 1;
  }
  Cu2 = this.classes;
  Cu2 = Cu2.length;
  Cu2 > 0 && (Cu2 = i, Bu2 = Bu2 + (' class ="' + Cu2.escape(O(this.classes)) + pj));
  Bu2 = Bu2 + no;
  Cu2 = 0;
  for (; ; ) {
    Du2 = this.children;
    if (Cu2 >= Du2.length) {
      break;
    }
    Du2 = this.children[Cu2];
    Bu2 = Bu2 + Du2.toMarkup();
    Cu2 = Cu2 + 1;
  }
  return Bu2 + ("</" + this.type + no);
};
Au = x.prototype;
Au.toText = function() {
  return this.children.map((Au2) => Au2.toText()).join(lh);
};
B = (0, function(Bu2) {
  this.text = Bu2;
  return this;
});
Au = B.prototype;
Au.toNode = function() {
  return C().createTextNode(this.text);
};
Au = B.prototype;
Au.toMarkup = function() {
  return i.escape(this.toText());
};
Au = B.prototype;
Au.toText = function() {
  return this.text;
};
Bu = (0, function() {
  var Bu2 = arguments[0];
  this.width = Bu2;
  var Cu2;
  Bu2 >= 0.05555 && Bu2 <= 0.05556 ? this.character = "\u200A" : Bu2 >= 0.1666 && Bu2 <= 0.1667 ? this.character = "\u2009" : Bu2 >= 0.2222 && Bu2 <= 0.2223 ? this.character = "\u2005" : Bu2 >= 0.2777 && Bu2 <= 0.2778 ? this.character = "\u2005\u200A" : (Cu2 = 0, Bu2 >= Cu2 - 0.05556 ? (Cu2 = 0, Cu2 = Bu2 <= Cu2 - 0.05555) : Cu2 = false, Cu2 ? this.character = "\u200A\u2063" : (Cu2 = 0, Bu2 >= Cu2 - 0.1667 ? (Cu2 = 0, Cu2 = Bu2 <= Cu2 - 0.1666) : Cu2 = false, Cu2 ? this.character = "\u2009\u2063" : (Cu2 = 0, Bu2 >= Cu2 - 0.2223 ? (Cu2 = 0, Cu2 = Bu2 <= Cu2 - 0.2222) : Cu2 = false, Cu2 ? this.character = "\u205F\u2063" : (Cu2 = 0, Bu2 >= Cu2 - 0.2778 ? (Cu2 = 0, Bu2 = Bu2 <= Cu2 - 0.2777) : Bu2 = false, Bu2 ? this.character = "\u2005\u2063" : this.character = null))));
  return this;
});
Au = Bu.prototype;
Au.toNode = V(le);
Au = Bu.prototype;
Au.toMarkup = V(me);
Au = Bu.prototype;
Au.toText = V(ne);
Au = {};
Object.assign(Au, { MathNode: x, TextNode: B, SpaceNode: Bu, newDocumentFragment: Cu });
var b = void 0;
b = Au;
var G = {};
G.newDocumentFragment = Cu;
G.MathNode = x;
G.TextNode = B;
G.default = b;
G.mathMLTree = b;
var ub = void 0;
var Ja = void 0;
var Ka = void 0;
var La = void 0;
var na = void 0;
ub = oe;
Ja = qe;
Ka = (Au2, Bu2, Cu2) => {
  var Du2 = Au2.length;
  if (1 === Du2) {
    Du2 = La(Au2[0], Bu2);
    Cu2 && m(Du2, x) && Du2.type === ki && (Du2.setAttribute(Xh, Mn), Du2.setAttribute(Zk, Mn));
    Au2 = [];
    Au2.push(Du2);
    return Au2;
  }
  var Fu2 = [];
  var Du2 = void 0, Eu2 = 0, Gu2, Hu2, Iu2, Ju2;
  while (Eu2 < Au2.length) {
    Cu2 = La(Au2[Eu2], Bu2);
    if (m(Cu2, x) && m(Du2, x)) {
      Cu2.type === Gk && Du2.type === Gk ? (Gu2 = Cu2.getAttribute(vi), Gu2 = Gu2 === Du2.getAttribute(vi)) : Gu2 = false;
      if (Gu2) {
        X(Du2.children, Cu2.children);
        Eu2 = Eu2 + 1;
        continue;
      } else {
        if (Cu2.type === hm && Du2.type === hm) {
          X(Du2.children, Cu2.children);
          Eu2 = Eu2 + 1;
          continue;
        } else {
          if (Ja(Cu2) && Du2.type === hm) {
            X(Du2.children, Cu2.children);
            Eu2 = Eu2 + 1;
            continue;
          } else {
            Gu2 = Cu2.type;
            if (Gu2 === hm && !!Ja(Du2)) {
              Gu2 = [];
              Hu2 = Du2.children;
              Iu2 = Hu2.length | 0;
              Du2 = 0;
              while (Du2 < Iu2) {
                Gu2.push(Hu2[Du2]);
                Du2 = Du2 + 1;
              }
              Hu2 = Cu2.children;
              Iu2 = Hu2.length | 0;
              Du2 = 0;
              while (Du2 < Iu2) {
                Gu2.push(Hu2[Du2]);
                Du2 = Du2 + 1;
              }
              Cu2.children = Gu2;
              Fu2.pop();
            } else {
              ("msup" === Cu2.type || "msub" === Cu2.type) && Cu2.children.length >= 1 ? (Gu2 = Du2.type, Gu2 = Gu2 === hm || !!Ja(Du2)) : Gu2 = false;
              if (Gu2) {
                Gu2 = Cu2.children[0];
                m(Gu2, x) ? (Hu2 = Gu2.type, Hu2 = Hu2 === hm) : Hu2 = false;
                if (Hu2) {
                  Hu2 = [];
                  Iu2 = Du2.children;
                  Ju2 = Iu2.length | 0;
                  Du2 = 0;
                  while (Du2 < Ju2) {
                    Hu2.push(Iu2[Du2]);
                    Du2 = Du2 + 1;
                  }
                  Iu2 = Gu2.children;
                  Ju2 = Iu2.length | 0;
                  Du2 = 0;
                  while (Du2 < Ju2) {
                    Hu2.push(Iu2[Du2]);
                    Du2 = Du2 + 1;
                  }
                  Gu2.children = Hu2;
                  Fu2.pop();
                }
              } else {
                Gu2 = Du2.type;
                Gu2 === Dl ? (Gu2 = Du2.children, Gu2 = Gu2.length, Gu2 = 1 === Gu2) : Gu2 = false;
                Gu2 && (Du2 = Du2.children[0], m(Du2, B) ? (Du2 = Du2.text, Du2 = "\u0338" === Du2) : Du2 = false, Du2 && (Cu2.type === ki || Cu2.type === Dl || Cu2.type === hm) && (Du2 = Cu2.children[0], m(Du2, B) ? (Gu2 = Du2.text, Gu2 = Gu2.length, Gu2 = Gu2 > 0) : Gu2 = false, Gu2 && (Gu2 = Du2.text.slice(0, 1) + "\u0338", Du2.text = Gu2 + Du2.text.slice(1), Fu2.pop())));
              }
            }
          }
        }
      }
    }
    Fu2.push(Cu2);
    Eu2 = Eu2 + 1;
    Du2 = Cu2;
  }
  return Fu2;
};
La = re;
na = (Au2, Bu2, Cu2, Du2, Eu2) => {
  Au2 = Ka(Au2, Cu2);
  var Fu2 = [];
  Fu2.push(Fj);
  Fu2.push(En);
  Cu2 = Au2.length;
  if (1 === Cu2 && m(Au2[0], x)) {
    Cu2 = i;
    var Gu2 = Au2[0];
    Cu2 = !!Cu2.contains(Fu2, Gu2.type);
  } else {
    Cu2 = false;
  }
  Au2 = Cu2 ? Au2[0] : new b.MathNode(Fj, Au2);
  Cu2 = [];
  Cu2.push(new b.TextNode(Bu2));
  Cu2 = new b.MathNode("annotation", Cu2);
  Cu2.setAttribute("encoding", "application/x-tex");
  Bu2 = [];
  Bu2.push(Au2);
  Bu2.push(Cu2);
  Bu2 = new b.MathNode("semantics", Bu2);
  Au2 = [];
  Au2.push(Bu2);
  Au2 = new b.MathNode(tg, Au2);
  Au2.setAttribute("xmlns", _h);
  !Du2 || Au2.setAttribute(Tg, "block");
  Cu2 = Eu2 ? Or : "katex-mathml";
  Bu2 = [];
  Bu2.push(Cu2);
  Cu2 = [];
  Cu2.push(Au2);
  return a.makeSpan(Bu2, Cu2);
};
var f = {};
f.makeText = (Au2, Bu2, Cu2) => {
  if (o[Bu2][Au2]) {
    var Du2 = o[Bu2][Au2];
    Du2 = !!Du2.replace;
  } else {
    Du2 = false;
  }
  Du2 && Au2.charCodeAt(0) !== xu ? (Du2 = l(lb, Au2) && Cu2 && (Cu2.fontFamily && "tt" === Cu2.fontFamily.slice(4, 6) || Cu2.font && "tt" === Cu2.font.slice(4, 6)), Du2 = !Du2) : Du2 = false;
  Du2 && (Au2 = o[Bu2][Au2], Au2 = Au2.replace);
  return new b.TextNode(Au2);
};
f.makeRow = ub;
f.getVariant = pe;
f.buildExpression = Ka;
f.buildExpressionRow = (Au2, Bu2, Cu2) => ub(Ka(Au2, Bu2, Cu2));
f.buildGroup = La;
f.default = na;
f.buildMathML = na;
var Tc = void 0;
var Uc = void 0;
var Vc = void 0;
Tc = (Au2) => {
  var Bu2 = {};
  var Cu2 = Au2.displayMode ? g.DISPLAY : g.TEXT;
  Object.assign(Bu2, { style: Cu2, maxSize: Au2.maxSize, minRuleThickness: Au2.minRuleThickness });
  return new p(Bu2);
};
Uc = (Au2, Bu2) => {
  if (Bu2.displayMode) {
    var Cu2 = [];
    Cu2.push("katex-display");
    !Bu2.leqno || Cu2.push(rj);
    !Bu2.fleqn || Cu2.push(Lr);
    Bu2 = [];
    Bu2.push(Au2);
    Au2 = a.makeSpan(Cu2, Bu2);
  }
  return Au2;
};
Vc = (Au2, Bu2, Cu2) => {
  var Du2 = Tc(Cu2);
  var Eu2 = Cu2.output;
  if (Eu2 === Cn) {
    return na(Au2, Bu2, Du2, Cu2.displayMode, true);
  } else {
    var Tu2 = void 0;
    Eu2 = Cu2.output;
    Eu2 === El ? (Du2 = ma(Au2, Du2), Au2 = [], Au2.push(Or), Bu2 = [], Bu2.push(Du2), Au2 = a.makeSpan(Au2, Bu2)) : (Eu2 = na(Au2, Bu2, Du2, Cu2.displayMode, false), Du2 = ma(Au2, Du2), Bu2 = [], Bu2.push(Or), Au2 = [], Au2.push(Eu2), Au2.push(Du2), Au2 = a.makeSpan(Bu2, Au2));
  }
  return Uc(Au2, Cu2);
};
var Wc = void 0;
var Xc = void 0;
var Yc = void 0;
Au = {};
Object.assign(Au, { widehat: "^", widecheck: "\u02C7", widetilde: ft, utilde: ft });
Bu = "\u2190";
Object.assign(Au, { overleftarrow: Bu, underleftarrow: Bu, xleftarrow: Bu });
Cu = "\u2192";
Object.assign(Au, { overrightarrow: Cu, underrightarrow: Cu, xrightarrow: Cu, underbrace: "\u23DF", overbrace: "\u23DE", overgroup: "\u23E0", undergroup: "\u23E1", overleftrightarrow: "\u2194", underleftrightarrow: "\u2194", xleftrightarrow: "\u2194", Overrightarrow: "\u21D2", xRightarrow: "\u21D2", overleftharpoon: "\u21BC", xleftharpoonup: "\u21BC", overrightharpoon: "\u21C0", xrightharpoonup: "\u21C0", xLeftarrow: "\u21D0", xLeftrightarrow: "\u21D4", xhookleftarrow: "\u21A9", xhookrightarrow: "\u21AA", xmapsto: "\u21A6", xrightharpoondown: "\u21C1", xleftharpoondown: "\u21BD", xrightleftharpoons: "\u21CC", xleftrightharpoons: "\u21CB", xtwoheadleftarrow: "\u219E", xtwoheadrightarrow: "\u21A0" });
Iu = "=";
Object.assign(Au, { xlongequal: Iu, xtofrom: "\u21C4", xrightleftarrows: "\u21C4", xrightequilibrium: "\u21CC", xleftequilibrium: "\u21CB" });
Eu = "\\cdrightarrow";
Au["\\cdrightarrow"] = Cu;
Fu = "\\cdleftarrow";
Au["\\cdleftarrow"] = Bu;
Hu = "\\cdlongequal";
Au["\\cdlongequal"] = Iu;
Wc = Au;
Au = {};
Du = [];
Bu = [];
Bu.push(Xs);
Du.push(Bu);
Cu = 0.888;
Du.push(Cu);
Bu = 522;
Du.push(Bu);
Du.push(So);
Au.overrightarrow = Du;
Du = [];
Ju = [];
Ju.push(At);
Du.push(Ju);
Du.push(Cu);
Du.push(Bu);
Du.push(Lk);
Au.overleftarrow = Du;
Du = [];
Ju = [];
Ju.push(Xs);
Du.push(Ju);
Du.push(Cu);
Du.push(Bu);
Du.push(So);
Au.underrightarrow = Du;
Du = [];
Ju = [];
Ju.push(At);
Du.push(Ju);
Du.push(Cu);
Du.push(Bu);
Du.push(Lk);
Au.underleftarrow = Du;
Du = [];
Ju = [];
Ju.push(Xs);
Du.push(Ju);
Du.push(1.469);
Du.push(Bu);
Du.push(So);
Au.xrightarrow = Du;
Du = [];
Ju = [];
Ju.push(Xs);
Du.push(Ju);
Du.push(3);
Du.push(Bu);
Du.push(So);
Au["\\cdrightarrow"] = Du;
Du = [];
Eu = [];
Eu.push(At);
Du.push(Eu);
Du.push(1.469);
Du.push(Bu);
Du.push(Lk);
Au.xleftarrow = Du;
Du = [];
Eu = [];
Eu.push(At);
Du.push(Eu);
Du.push(3);
Du.push(Bu);
Du.push(Lk);
Au["\\cdleftarrow"] = Du;
Du = [];
Eu = [];
Eu.push(gp);
Du.push(Eu);
Du.push(Cu);
Du.push(560);
Du.push(So);
Au.Overrightarrow = Du;
Du = [];
Eu = [];
Eu.push(gp);
Du.push(Eu);
Du.push(1.526);
Du.push(560);
Du.push(So);
Au.xRightarrow = Du;
Du = [];
Eu = [];
Eu.push(Qp);
Du.push(Eu);
Du.push(1.526);
Du.push(560);
Du.push(Lk);
Au.xLeftarrow = Du;
Du = [];
Eu = [];
Eu.push(is);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Du.push(Lk);
Au.overleftharpoon = Du;
Du = [];
Eu = [];
Eu.push(is);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Du.push(Lk);
Au.xleftharpoonup = Du;
Du = [];
Eu = [];
Eu.push(Tp);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Du.push(Lk);
Au.xleftharpoondown = Du;
Du = [];
Eu = [];
Eu.push(hr);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Du.push(So);
Au.overrightharpoon = Du;
Du = [];
Eu = [];
Eu.push(hr);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Du.push(So);
Au.xrightharpoonup = Du;
Du = [];
Eu = [];
Eu.push(kp);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Du.push(So);
Au.xrightharpoondown = Du;
Du = [];
Eu = [];
Eu.push(Dt);
Du.push(Eu);
Du.push(Cu);
Du.push(334);
Du.push(Lk);
Au.xlongequal = Du;
Du = [];
Eu = [];
Eu.push(Dt);
Du.push(Eu);
Du.push(3);
Du.push(334);
Du.push(Lk);
Au["\\cdlongequal"] = Du;
Du = [];
Eu = [];
Eu.push(np);
Du.push(Eu);
Du.push(Cu);
Du.push(334);
Du.push(Lk);
Au.xtwoheadleftarrow = Du;
Du = [];
Eu = [];
Eu.push(Yo);
Du.push(Eu);
Du.push(Cu);
Du.push(334);
Du.push(So);
Au.xtwoheadrightarrow = Du;
Du = [];
Eu = [];
Eu.push(At);
Eu.push(Xs);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Au.overleftrightarrow = Du;
Du = [];
Eu = [];
Eu.push(Bt);
Eu.push(ou);
Eu.push(Ys);
Du.push(Eu);
Du.push(1.6);
Du.push(548);
Au.overbrace = Du;
Du = [];
Eu = [];
Eu.push(pq);
Eu.push(Yq);
Eu.push(Zp);
Du.push(Eu);
Du.push(1.6);
Du.push(548);
Au.underbrace = Du;
Du = [];
Eu = [];
Eu.push(At);
Eu.push(Xs);
Du.push(Eu);
Du.push(Cu);
Du.push(Bu);
Au.underleftrightarrow = Du;
Eu = [];
Du = [];
Du.push(At);
Du.push(Xs);
Eu.push(Du);
Du = 1.75;
Eu.push(Du);
Eu.push(Bu);
Au.xleftrightarrow = Eu;
Eu = [];
Fu = [];
Fu.push(Qp);
Fu.push(gp);
Eu.push(Fu);
Eu.push(Du);
Eu.push(560);
Au.xLeftrightarrow = Eu;
Eu = [];
Fu = [];
Fu.push(go);
Fu.push(lp);
Eu.push(Fu);
Eu.push(Du);
Eu.push(716);
Au.xrightleftharpoons = Eu;
Eu = [];
Fu = [];
Fu.push(Up);
Fu.push(Ln);
Eu.push(Fu);
Eu.push(Du);
Eu.push(716);
Au.xleftrightharpoons = Eu;
Eu = [];
Fu = [];
Fu.push(At);
Fu.push(Jt);
Eu.push(Fu);
Eu.push(1.08);
Eu.push(Bu);
Au.xhookleftarrow = Eu;
Eu = [];
Fu = [];
Fu.push(ku);
Fu.push(Xs);
Eu.push(Fu);
Eu.push(1.08);
Eu.push(Bu);
Au.xhookrightarrow = Eu;
Eu = [];
Fu = [];
Fu.push(Vp);
Fu.push(mp);
Eu.push(Fu);
Eu.push(Cu);
Eu.push(Bu);
Au.overlinesegment = Eu;
Eu = [];
Fu = [];
Fu.push(Vp);
Fu.push(mp);
Eu.push(Fu);
Eu.push(Cu);
Eu.push(Bu);
Au.underlinesegment = Eu;
Eu = [];
Fu = [];
Fu.push(Ct);
Fu.push(Zs);
Eu.push(Fu);
Eu.push(Cu);
Eu.push(342);
Au.overgroup = Eu;
Eu = [];
Fu = [];
Fu.push(qq);
Fu.push(_p);
Eu.push(Fu);
Eu.push(Cu);
Eu.push(342);
Au.undergroup = Eu;
Cu = [];
Eu = [];
Eu.push(Ss);
Eu.push(Xs);
Cu.push(Eu);
Cu.push(1.5);
Cu.push(Bu);
Au.xmapsto = Cu;
Bu = [];
Cu = [];
Cu.push(Rs);
Cu.push(ns);
Bu.push(Cu);
Bu.push(Du);
Bu.push(528);
Au.xtofrom = Bu;
Bu = [];
Cu = [];
Cu.push(To);
Cu.push(ko);
Bu.push(Cu);
Bu.push(Du);
Bu.push(901);
Au.xrightleftarrows = Bu;
Bu = [];
Cu = [];
Cu.push(Im);
Cu.push(Bm);
Bu.push(Cu);
Bu.push(Du);
Bu.push(716);
Au.xrightequilibrium = Bu;
Bu = [];
Cu = [];
Cu.push(Jm);
Cu.push(Cm);
Bu.push(Cu);
Bu.push(Du);
Bu.push(716);
Au.xleftequilibrium = Bu;
Xc = Au;
Yc = se;
Au = {};
Object.assign(Au, { encloseSpan: (Au2, Bu2, Cu2, Du2, Eu2) => {
  var Fu2 = Au2.height;
  Cu2 = Fu2 + Au2.depth + Cu2 + Du2;
  Au2 = new RegExp("fbox|color|angl", lh);
  Au2.test(Bu2) ? (Au2 = [], Au2.push(oi), Au2.push(Bu2), Au2 = a.makeSpan(Au2, [], Eu2), "fbox" === Bu2 && (Bu2 = Eu2.color, !Bu2 || (Bu2 = Eu2.getColor()), !Bu2 || (Du2 = Au2.style, Du2.borderColor = Bu2))) : (Du2 = [], Au2 = new RegExp("^[bx]cancel$", lh), !Au2.test(Bu2) || (Au2 = {}, Object.assign(Au2, { x1: bt, y1: bt, x2: Un, y2: Un, "stroke-width": "0.046em" }), Du2.push(new ga(Au2))), Au2 = new RegExp("^x?cancel$", lh), !Au2.test(Bu2) || (Au2 = {}, Object.assign(Au2, { x1: bt, y1: Un, x2: Un, y2: bt, "stroke-width": "0.046em" }), Du2.push(new ga(Au2))), Au2 = {}, Object.assign(Au2, { width: Un, height: d(Cu2) }), Bu2 = new I(Du2, Au2), Au2 = [], Au2.push(Bu2), Au2 = a.makeSvgSpan([], Au2, Eu2));
  Au2.height = Cu2;
  Bu2 = Au2.style;
  Bu2.height = d(Cu2);
  return Au2;
}, mathMLnode: (Au2) => {
  let Bu2 = [], Cu2 = b.TextNode, Du2 = Wc;
  Bu2.push(new Cu2(Du2[Au2.replace(new RegExp("^\\\\", lh), lh)]));
  Au2 = new b.MathNode(ki, Bu2);
  Au2.setAttribute(oi, Dh);
  return Au2;
}, svgSpan: (Au2, Bu2) => {
  var Du2 = (() => te(Au2, Bu2))();
  var Cu2 = Du2.span;
  var Eu2 = Du2.minWidth;
  Du2 = Du2.height;
  Cu2.height = Du2;
  var Fu2 = Cu2.style;
  Fu2.height = d(Du2);
  Eu2 > 0 && (Du2 = Cu2.style, Du2.minWidth = d(Eu2));
  return Cu2;
} });
var M = void 0;
M = Au;
var j = void 0;
var Ma = void 0;
var oa = void 0;
j = (Au2, Bu2) => {
  if (!Au2 || Au2.type !== Bu2) {
    Au2 = Au2 ? Zq + Au2.type : Au2 + "";
    throw t("Expected node of type " + Bu2 + ss + Au2);
  }
  return Au2;
};
Ma = (Au2) => {
  var Bu2 = oa(Au2);
  if (!Bu2) {
    var Ju2 = void 0;
    Au2 = Au2 ? Zq + Au2.type : Au2 + "";
    throw t("Expected node of symbol group type, but got " + Au2);
  }
  return Bu2;
};
oa = (Au2) => {
  if (Au2) {
    var Bu2 = Au2.type;
    Bu2 === gj ? Bu2 = true : (Bu2 = Ic, Bu2 = l(Bu2, Au2.type));
  } else {
    Bu2 = false;
  }
  if (Bu2) return Au2;
  return null;
};
var Zc = void 0;
Du = ue;
Eu = (Au2, Bu2) => {
  if (Au2.isStretchy) {
    var Cu2 = M.mathMLnode(Au2.label);
  } else {
    Cu2 = [];
    Cu2.push(f.makeText(Au2.label, Au2.mode));
    Cu2 = new b.MathNode(ki, Cu2);
  }
  var Du2 = [];
  Du2.push(f.buildGroup(Au2.base, Bu2));
  Du2.push(Cu2);
  Au2 = new b.MathNode(Xi, Du2);
  Au2.setAttribute(li, Dh);
  return Au2;
};
Au = [];
Ju = "\\acute";
Au.push(Ju);
Ku = "\\grave";
Au.push(Ku);
Lu = "\\ddot";
Au.push(Lu);
Mu = "\\tilde";
Au.push(Mu);
var Nu = "\\bar";
Au.push(Nu);
var Ou = "\\breve";
Au.push(Ou);
var Pu = "\\check";
Au.push(Pu);
var Qu = "\\hat";
Au.push(Qu);
Au.push(Gr);
var Ru = "\\dot";
Au.push(Ru);
Au.push(Gs);
Bu = RegExp;
Zc = new Bu(Au.map((Au2) => Lm + Au2).join(tm));
Bu = {};
Bu.type = li;
Au = [];
Au.push(Ju);
Au.push(Ku);
Au.push(Lu);
Au.push(Mu);
Au.push(Nu);
Au.push(Ou);
Au.push(Pu);
Au.push(Qu);
Au.push(Gr);
Au.push(Ru);
Au.push(Gs);
Au.push(bs);
Au.push(ut);
Au.push(cs);
Au.push("\\overrightarrow");
Au.push("\\overleftarrow");
Au.push("\\Overrightarrow");
Au.push("\\overleftrightarrow");
Au.push("\\overgroup");
Au.push("\\overlinesegment");
Au.push("\\overleftharpoon");
Au.push("\\overrightharpoon");
Bu.names = Au;
Au = {};
Au.numArgs = 1;
Object.assign(Bu, { props: Au, handler: (Au2, Bu2) => {
  var Eu2 = ka(Bu2[0]);
  var Du2 = !Zc.test(Au2.funcName);
  Bu2 = !Du2;
  Bu2 || (Bu2 = Au2.funcName, Bu2 = Bu2 === ut);
  Bu2 || (Bu2 = Au2.funcName, Bu2 = Bu2 === cs);
  Bu2 || (Bu2 = Au2.funcName, Bu2 = Bu2 === bs);
  var Cu2 = {};
  Object.assign(Cu2, { type: li, mode: Au2.parser.mode, label: Au2.funcName, isStretchy: Du2, isShifty: Bu2, base: Eu2 });
  return Cu2;
}, htmlBuilder: Du, mathmlBuilder: Eu });
e(Bu);
Cu = {};
Cu.type = li;
Au = [];
Au.push("\\'");
Au.push("\\`");
Au.push("\\^");
Au.push("\\~");
Au.push("\\=");
Au.push("\\u");
Au.push("\\.");
Au.push('\\"');
Au.push("\\c");
Au.push("\\r");
Au.push("\\H");
Au.push("\\v");
Au.push(bk);
Cu.names = Au;
Au = {};
Au.numArgs = 1;
Bu = true;
Object.assign(Au, { allowedInText: Bu, allowedInMath: Bu });
Fu = [];
Fu.push(jj);
Au.argTypes = Fu;
Object.assign(Cu, { props: Au, handler: (Au2, Bu2) => {
  var Du2 = Bu2[0];
  Bu2 = Au2.parser;
  var Cu2 = Bu2.mode;
  Cu2 === tg && (Bu2 = Au2.parser, Bu2 = Bu2.settings, Bu2.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + Au2.funcName + " works only in text mode"), Cu2 = yf);
  Bu2 = {};
  Object.assign(Bu2, { type: li, mode: Cu2, label: Au2.funcName, isStretchy: false, isShifty: true, base: Du2 });
  return Bu2;
}, htmlBuilder: Du, mathmlBuilder: Eu });
e(Cu);
var _c = {};
_c.htmlBuilder = Du;
Au = {};
Au.type = ds;
Cu = [];
Cu.push("\\underleftarrow");
Cu.push("\\underrightarrow");
Cu.push("\\underleftrightarrow");
Cu.push("\\undergroup");
Cu.push("\\underlinesegment");
Cu.push(gu);
Au.names = Cu;
Cu = {};
Cu.numArgs = 1;
Object.assign(Au, { props: Cu, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser, Du2 = Au2.funcName;
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: ds, mode: Cu2.mode, label: Du2, base: Bu2 });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  var Eu2 = h2.buildGroup(Au2.base, Bu2);
  var Fu2 = M.svgSpan(Au2, Bu2);
  Au2 = Au2.label;
  var Gu2 = Au2 === gu ? 0.12 : 0, Du2, Cu2;
  Au2 = {};
  Object.assign(Au2, { positionType: _l, positionData: Eu2.height });
  Cu2 = [];
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Fu2 });
  Fu2 = [];
  Fu2.push(ti);
  Du2.wrapperClasses = Fu2;
  Cu2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: kh, size: Gu2 });
  Cu2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Eu2 });
  Cu2.push(Du2);
  Au2.children = Cu2;
  Du2 = a.makeVList(Au2, Bu2);
  Au2 = [];
  Au2.push(wg);
  Au2.push(en);
  Cu2 = [];
  Cu2.push(Du2);
  return a.makeSpan(Au2, Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  let Du2 = M.mathMLnode(Au2.label), Cu2 = [];
  Cu2.push(f.buildGroup(Au2.base, Bu2));
  Cu2.push(Du2);
  Au2 = new b.MathNode(Fi, Cu2);
  Au2.setAttribute(en, Dh);
  return Au2;
} });
e(Au);
var pa = void 0;
pa = (Au2) => {
  if (Au2) {
    var Bu2 = [];
    Bu2.push(Au2);
  } else {
    Bu2 = [];
  }
  Au2 = new b.MathNode(Eh, Bu2);
  Au2.setAttribute(Zf, "+0.6em");
  Au2.setAttribute(Xh, "0.3em");
  return Au2;
};
Cu = {};
Cu.type = "xArrow";
Au = [];
var _u = "\\xleftarrow";
Au.push(_u);
var $u = "\\xrightarrow";
Au.push($u);
Au.push("\\xLeftarrow");
Au.push("\\xRightarrow");
Au.push("\\xleftrightarrow");
Au.push("\\xLeftrightarrow");
Au.push("\\xhookleftarrow");
Au.push("\\xhookrightarrow");
Au.push("\\xmapsto");
Au.push("\\xrightharpoondown");
Au.push("\\xrightharpoonup");
Au.push("\\xleftharpoondown");
Au.push("\\xleftharpoonup");
Au.push("\\xrightleftharpoons");
Au.push("\\xleftrightharpoons");
Au.push("\\xlongequal");
Au.push("\\xtwoheadrightarrow");
Au.push("\\xtwoheadleftarrow");
Au.push("\\xtofrom");
Au.push("\\xrightleftarrows");
Au.push("\\xrightequilibrium");
Au.push(jo);
Au.push(ap);
Au.push(Op);
Au.push(xl);
Cu.names = Au;
Au = {};
Object.assign(Au, { numArgs: 1, numOptionalArgs: 1 });
Object.assign(Cu, { props: Au, handler: function(Bu2, Cu2, Du2) {
  let Eu2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Au2 = {};
  Object.assign(Au2, { type: "xArrow", mode: Eu2.mode, label: Bu2, body: Cu2[0], below: Du2[0] });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  var Eu2 = Cu2.style;
  var Au2 = Cu2.havingStyle(Eu2.sup());
  var Du2 = a;
  Du2 = Du2.wrapFragment(h2.buildGroup(Bu2.body, Au2, Cu2), Cu2);
  var Fu2 = "\\x" === Bu2.label.slice(0, 2) ? "x" : "cd", Iu2, Gu2, Ju2, Hu2;
  Du2.classes.push(Fu2 + ts);
  Au2 = void 0;
  !Bu2.below || (Au2 = Cu2.havingStyle(Eu2.sub()), Eu2 = a, Au2 = Eu2.wrapFragment(h2.buildGroup(Bu2.below, Au2, Cu2), Cu2), Au2.classes.push(Fu2 + ts));
  var $u2 = M;
  Eu2 = $u2.svgSpan(Bu2, Cu2);
  Fu2 = 0;
  var av2 = Cu2.fontMetrics();
  var bv2 = av2.axisHeight;
  var Cv = +bv2;
  Fu2 = Fu2 - Cv;
  Hu2 = 0.5;
  var cv2 = Eu2.height;
  var Dv = +cv2;
  Iu2 = Fu2 + Hu2 * Dv;
  Fu2 = 0;
  var ev2 = Cu2.fontMetrics();
  var fv2 = ev2.axisHeight;
  var Ev = +fv2;
  Fu2 = +(Fu2 - Ev);
  Hu2 = 0.5;
  var hv = Eu2.height;
  var Fv = +hv;
  var Gv = +(Hu2 * Fv);
  Fu2 = +(Fu2 - Gv);
  var Hv = 0.111;
  Fu2 = Fu2 - Hv;
  (Du2.depth > 0.25 || Bu2.label === jo) && (Bu2 = +Fu2, Fu2 = Bu2 - +Du2.depth);
  Au2 ? (Bu2 = 0, Bu2 = Bu2 - +Cu2.fontMetrics().axisHeight, Bu2 = Bu2 + Au2.height, Gu2 = 0.5, Ju2 = Bu2 + Gu2 * +Eu2.height + 0.111, Hu2 = {}, Hu2.positionType = kg, Bu2 = [], Gu2 = {}, Object.assign(Gu2, { type: Yf, elem: Du2, shift: Fu2 }), Bu2.push(Gu2), Du2 = {}, Object.assign(Du2, { type: Yf, elem: Eu2, shift: Iu2 }), Bu2.push(Du2), Du2 = {}, Object.assign(Du2, { type: Yf, elem: Au2, shift: Ju2 }), Bu2.push(Du2), Hu2.children = Bu2, Au2 = a.makeVList(Hu2, Cu2)) : (Bu2 = {}, Bu2.positionType = kg, Gu2 = [], Au2 = {}, Object.assign(Au2, { type: Yf, elem: Du2, shift: Fu2 }), Gu2.push(Au2), Au2 = {}, Object.assign(Au2, { type: Yf, elem: Eu2, shift: Iu2 }), Gu2.push(Au2), Bu2.children = Gu2, Au2 = a.makeVList(Bu2, Cu2));
  Bu2 = Au2.children;
  Bu2 = Bu2[0].children[0].children[1];
  Bu2.classes.push(ti);
  Bu2 = [];
  Bu2.push(fq);
  Bu2.push("x-arrow");
  Du2 = [];
  Du2.push(Au2);
  return a.makeSpan(Bu2, Du2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  var Au2 = M.mathMLnode(Bu2.label);
  var Du2 = "x" === Bu2.label.charAt(0) ? "1.75em" : "3.0em", Eu2;
  Au2.setAttribute("minsize", Du2);
  Bu2.body ? (Du2 = pa, Du2 = Du2(f.buildGroup(Bu2.body, Cu2)), Bu2.below ? (Eu2 = pa, Cu2 = Eu2(f.buildGroup(Bu2.below, Cu2)), Bu2 = [], Bu2.push(Au2), Bu2.push(Cu2), Bu2.push(Du2), Au2 = new b.MathNode(vn, Bu2)) : (Bu2 = [], Bu2.push(Au2), Bu2.push(Du2), Au2 = new b.MathNode(Xi, Bu2))) : Bu2.below ? (Du2 = pa, Cu2 = Du2(f.buildGroup(Bu2.below, Cu2)), Bu2 = [], Bu2.push(Au2), Bu2.push(Cu2), Au2 = new b.MathNode(Fi, Bu2)) : (Cu2 = pa(), Bu2 = [], Bu2.push(Au2), Bu2.push(Cu2), Au2 = new b.MathNode(Xi, Bu2));
  return Au2;
} });
e(Cu);
var $c = void 0;
var qa = void 0;
$c = a.makeSpan;
Du = (Au2, Bu2) => {
  let Du2 = h2.buildExpression(Au2.body, Bu2, true), Cu2 = [];
  Cu2.push(Au2.mclass);
  return $c(Cu2, Du2, Bu2);
};
Eu = (Au2, Bu2) => {
  Bu2 = f.buildExpression(Au2.body, Bu2);
  var Cu2 = Au2.mclass;
  Cu2 === Dn ? Bu2 = new b.MathNode(Eh, Bu2) : (Cu2 = Au2.mclass, Cu2 === wg ? Au2.isCharacterBox ? (Bu2 = Bu2[0], Bu2.type = Dl) : Bu2 = new b.MathNode(Dl, Bu2) : (Au2.isCharacterBox ? (Bu2 = Bu2[0], Bu2.type = ki) : Bu2 = new b.MathNode(ki, Bu2), Cu2 = Au2.mclass, Cu2 === Em ? (Au2 = Bu2.attributes, Au2.lspace = "0.22em", Au2 = Bu2.attributes, Au2.rspace = "0.22em") : (Cu2 = Au2.mclass, "mpunct" === Cu2 ? (Au2 = Bu2.attributes, Au2.lspace = Mn, Au2 = Bu2.attributes, Au2.rspace = "0.17em") : Au2.mclass === Uj || Au2.mclass === mj ? (Au2 = Bu2.attributes, Au2.lspace = Mn, Au2 = Bu2.attributes, Au2.rspace = Mn) : (Au2 = Au2.mclass, Au2 === Dn && (Au2 = Bu2.attributes, Au2.lspace = "0.0556em", Au2 = Bu2.attributes, Au2.width = "+0.1111em")))));
  return Bu2;
};
Cu = {};
Cu.type = Dg;
Au = [];
Au.push("\\mathord");
var av = "\\mathbin";
Au.push(av);
var bv = "\\mathrel";
Au.push(bv);
Au.push("\\mathopen");
Au.push("\\mathclose");
Au.push("\\mathpunct");
Au.push("\\mathinner");
Cu.names = Au;
Au = {};
Object.assign(Au, { numArgs: 1, primitive: Bu });
Object.assign(Cu, { props: Au, handler: function(Bu2, Cu2) {
  let Du2 = Bu2.parser, Eu2 = Bu2.funcName;
  Bu2 = Cu2[0];
  let Au2 = {};
  Object.assign(Au2, { type: Dg, mode: Du2.mode, mclass: et + Eu2.slice(5), body: s2(Bu2), isCharacterBox: i.isCharacterBox(Bu2) });
  return Au2;
}, htmlBuilder: Du, mathmlBuilder: Eu });
e(Cu);
qa = ve;
Au = {};
Au.type = Dg;
Cu = [];
Cu.push("\\@binrel");
Au.names = Cu;
Cu = {};
Cu.numArgs = 2;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: Dg, mode: Bu2.mode, mclass: qa(Cu2[0]), body: s2(Cu2[1]), isCharacterBox: i.isCharacterBox(Cu2[1]) });
  return Au2;
} });
e(Au);
Au = {};
Au.type = Dg;
Cu = [];
Cu.push(sn);
Cu.push("\\overset");
Cu.push(tn);
Au.names = Cu;
Cu = {};
Cu.numArgs = 2;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  var Fu2 = Bu2.parser;
  var Du2 = Bu2.funcName;
  Bu2 = Cu2[1];
  Cu2 = Cu2[0];
  var Eu2 = Du2 !== sn ? qa(Bu2) : fq;
  var Au2 = {};
  Object.assign(Au2, { type: Dj, mode: Bu2.mode, limits: true, alwaysHandleSupSub: true, parentIsSupSub: false, symbol: false, suppressBaseShift: Du2 !== sn, body: s2(Bu2) });
  Bu2 = {};
  Object.assign(Bu2, { type: _j, mode: Cu2.mode, base: Au2 });
  Au2 = Du2 === tn ? null : Cu2;
  Bu2.sup = Au2;
  Du2 === tn || (Cu2 = null);
  Bu2.sub = Cu2;
  Au2 = {};
  Object.assign(Au2, { type: Dg, mode: Fu2.mode, mclass: Eu2 });
  Cu2 = [];
  Cu2.push(Bu2);
  Object.assign(Au2, { body: Cu2, isCharacterBox: i.isCharacterBox(Bu2) });
  return Au2;
}, htmlBuilder: Du, mathmlBuilder: Eu });
e(Au);
Au = {};
Au.type = "pmb";
Cu = [];
Cu.push("\\pmb");
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 1, allowedInText: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: "pmb", mode: Bu2.mode, mclass: qa(Cu2[0]), body: s2(Cu2[0]) });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  let Du2 = h2.buildExpression(Bu2.body, Cu2, true), Au2 = [];
  Au2.push(Bu2.mclass);
  Au2 = a.makeSpan(Au2, Du2, Cu2);
  Bu2 = Au2.style;
  Bu2.textShadow = "0.02em 0.01em 0.04px";
  return Au2;
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = f.buildExpression(Bu2.body, Cu2);
  Au2 = new b.MathNode(Zj, Au2);
  Au2.setAttribute(Af, "text-shadow: 0.02em 0.01em 0.04px");
  return Au2;
} });
e(Au);
var ad = void 0;
var vb = void 0;
var wb = void 0;
var bd = void 0;
var cd = void 0;
var dd = void 0;
Au = {};
Object.assign(Au, { ">": ap, "<": Op, "=": xl, A: ok3, V: vj, "|": $l, ".": "no arrow" });
ad = Au;
vb = () => {
  let Au2 = {};
  Object.assign(Au2, { type: Sh, body: [], mode: tg, style: Tg });
  return Au2;
};
wb = (Au2) => {
  var Bu2 = Au2.type;
  Bu2 = Bu2 === bg;
  !Bu2 || (Au2 = Au2.text, Bu2 = "@" === Au2);
  return Bu2;
};
bd = (Au2, Bu2) => {
  var Cu2 = Au2.type;
  Cu2 = Cu2 === lk;
  Cu2 || (Cu2 = Au2.type, Cu2 = Cu2 === gj);
  !Cu2 || (Cu2 = Au2.text === Bu2);
  return Cu2;
};
cd = we;
dd = xe;
Au = {};
Au.type = "cdlabel";
Cu = [];
Cu.push(xs);
Cu.push(Wr);
Au.names = Cu;
Cu = {};
Cu.numArgs = 1;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  let Du2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Au2 = {};
  Object.assign(Au2, { type: "cdlabel", mode: Du2.mode, side: Bu2.slice(4), label: Cu2[0] });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  let Au2 = Cu2.style;
  Au2 = Cu2.havingStyle(Au2.sup());
  let Du2 = a;
  Au2 = Du2.wrapFragment(h2.buildGroup(Bu2.label, Au2, Cu2), Cu2);
  Cu2 = Au2.classes;
  Cu2.push("cd-label-" + Bu2.side);
  Bu2 = Au2.style;
  Cu2 = d;
  Du2 = 0.8;
  Bu2.bottom = Cu2(Du2 - +Au2.depth);
  Object.assign(Au2, { height: 0, depth: 0 });
  return Au2;
}, mathmlBuilder: function(Bu2, Cu2) {
  var Au2 = [];
  Au2.push(f.buildGroup(Bu2.label, Cu2));
  Cu2 = new b.MathNode(Fj, Au2);
  Au2 = [];
  Au2.push(Cu2);
  Au2 = new b.MathNode(Eh, Au2);
  Au2.setAttribute(Zf, bt);
  Bu2 = Bu2.side;
  Bu2 === hj && Au2.setAttribute(Xh, "-1width");
  Au2.setAttribute(Zm, "0.7em");
  Bu2 = [];
  Bu2.push(Au2);
  Au2 = new b.MathNode(Zj, Bu2);
  Au2.setAttribute(xm, Gl);
  Au2.setAttribute(Ok, mr);
  return Au2;
} });
e(Au);
Au = {};
Au.type = Tq;
Cu = [];
Cu.push(br);
Au.names = Cu;
Cu = {};
Cu.numArgs = 1;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: Tq, mode: Bu2.mode, fragment: Cu2[0] });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  let Au2 = a;
  Au2 = Au2.wrapFragment(h2.buildGroup(Bu2.fragment, Cu2), Cu2);
  Au2.classes.push("cd-vert-arrow");
  return Au2;
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = [];
  Au2.push(f.buildGroup(Bu2.fragment, Cu2));
  return new b.MathNode(Fj, Au2);
} });
e(Au);
Au = {};
Au.type = bg;
Cu = [];
Cu.push("\\@char");
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 1, allowedInText: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  var Du2 = Bu2.parser;
  Cu2 = j(Cu2[0], Xf).body;
  var Bu2 = lh, Au2 = 0;
  var bv2 = void 0;
  while (Au2 < Cu2.length) {
    Bu2 = Bu2 + j(Cu2[Au2], bg).text;
    Au2 = Au2 + 1;
  }
  Au2 = parseInt(Bu2);
  if (Number.isNaN(Au2)) {
    throw new c("\\@char has non-numeric argument " + Bu2);
  } else {
    var lv = void 0;
    if (Au2 < 0 || Au2 >= 1114111) {
      throw new c("\\@char with invalid code point " + Bu2);
    } else {
      Au2 <= 65535 ? Bu2 = String.fromCharCode(Au2) : (Au2 = +Au2, Au2 = Au2 - 65536, Bu2 = String, Cu2 = +Au2, Cu2 = (Cu2 >> 10) + 55296, Au2 = +Au2, Bu2 = Bu2.fromCharCode(Cu2, (Au2 & 1023) + 56320));
    }
  }
  Au2 = {};
  Object.assign(Au2, { type: bg, mode: Du2.mode, text: Bu2 });
  return Au2;
} });
e(Au);
Eu = (Au2, Bu2) => {
  let Cu2 = h2, Du2 = Au2.body;
  return a.makeFragment(Cu2.buildExpression(Du2, Bu2.withColor(Au2.color), false));
};
Fu = (Au2, Bu2) => {
  let Cu2 = f, Du2 = Au2.body;
  Bu2 = Cu2.buildExpression(Du2, Bu2.withColor(Au2.color));
  Bu2 = new b.MathNode(Zj, Bu2);
  Bu2.setAttribute(Ft, Au2.color);
  return Bu2;
};
Au = {};
Au.type = Lg;
Cu = [];
Cu.push(as);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 2, allowedInText: Bu });
Du = [];
Du.push(Lg);
Du.push(pu);
Cu.argTypes = Du;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Du2 = j(Cu2[0], yj).color;
  Cu2 = Cu2[1];
  let Au2 = {};
  Object.assign(Au2, { type: Lg, mode: Bu2.mode, color: Du2, body: s2(Cu2) });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Au);
Au = {};
Au.type = Lg;
Cu = [];
Cu.push(up);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 1, allowedInText: Bu });
Du = [];
Du.push(Lg);
Cu.argTypes = Du;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  let Du2 = Bu2.parser, Au2 = Bu2.breakOnTokenText;
  Bu2 = j(Cu2[0], yj).color;
  Cu2 = Du2.gullet;
  Cu2.macros.set(yl, Bu2);
  Cu2 = Du2.parseExpression(true, Au2);
  Au2 = {};
  Object.assign(Au2, { type: Lg, mode: Du2.mode, color: Bu2, body: Cu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Au);
Au = {};
Au.type = "cr";
Cu = [];
Cu.push(Vn);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 0, numOptionalArgs: 0, allowedInText: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2, Du2) {
  Bu2 = Bu2.parser;
  var Au2 = Bu2.gullet;
  Au2 = Au2.future().text;
  Au2 = Au2 === pp ? Bu2.parseSizeGroup(true) : null;
  Cu2 = Bu2.settings;
  Du2 = !Cu2.displayMode;
  Du2 = Du2 || !Bu2.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
  Cu2 = {};
  Object.assign(Cu2, { type: "cr", mode: Bu2.mode, newLine: Du2 });
  !Au2 || (Au2 = j(Au2, Of).value);
  Cu2.size = Au2;
  return Cu2;
}, htmlBuilder: function(Bu2, Cu2) {
  var Au2 = [];
  Au2.push(Mh);
  Au2 = a.makeSpan(Au2, [], Cu2);
  if (Bu2.newLine) {
    Au2.classes.push(ul);
    if (Bu2.size) {
      var Du2 = Au2.style;
      var Eu2 = d;
      Du2.marginTop = Eu2(r(Bu2.size, Cu2));
    }
  }
  return Au2;
}, mathmlBuilder: function(Bu2, Cu2) {
  var Au2 = new b.MathNode(Mh);
  if (Bu2.newLine) {
    Au2.setAttribute("linebreak", ul);
    if (Bu2.size) {
      var Du2 = d;
      Au2.setAttribute(Df, Du2(r(Bu2.size, Cu2)));
    }
  }
  return Au2;
} });
e(Au);
var Na = void 0;
var xb = void 0;
var ed = void 0;
var yb = void 0;
Au = {};
Object.assign(Au, { "\\global": cu, "\\long": kq, "\\\\globallong": kq });
Du = "\\gdef";
Object.assign(Au, { "\\def": Du, "\\gdef": Du });
Eu = "\\xdef";
Object.assign(Au, { "\\edef": Eu, "\\xdef": Eu, "\\let": Mq });
Fu = "\\futurelet";
Au["\\futurelet"] = bp;
Na = Au;
xb = (Au2) => {
  var Bu2 = Au2.text;
  var Cu2 = new RegExp(on, lh);
  if (Cu2.test(Bu2)) throw new c(gm, Au2);
  return Bu2;
};
ed = (Au2) => {
  var Bu2 = Au2.gullet;
  Bu2 = Bu2.popToken();
  var Cu2 = Bu2.text;
  "=" === Cu2 && (Bu2 = Au2.gullet, Bu2 = Bu2.popToken(), Cu2 = Bu2.text, Cu2 === Wi && (Au2 = Au2.gullet, Bu2 = Au2.popToken()));
  return Bu2;
};
yb = (Au2, Bu2, Cu2, Du2) => {
  var Eu2 = Au2.gullet;
  Eu2 = Eu2.macros.get(Cu2.text);
  if (Eu2 == null) {
    Cu2.noexpand = true;
    Eu2 = {};
    var Fu2 = [];
    Fu2.push(Cu2);
    Object.assign(Eu2, { tokens: Fu2, numArgs: 0, unexpandable: !Au2.gullet.isExpandable(Cu2.text) });
  }
  Au2 = Au2.gullet;
  Au2 = Au2.macros;
  Au2.set(Bu2, Eu2, Du2);
};
Au = {};
Au.type = Vh;
Cu = [];
Cu.push(cu);
Cu.push("\\long");
Cu.push(kq);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 0, allowedInText: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2) {
  var Cu2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  Cu2.consumeSpaces();
  var Au2 = Cu2.fetch();
  var Du2 = Na;
  if (Du2[Au2.text]) {
    (Bu2 === cu || Bu2 === kq) && (Au2.text = Na[Au2.text]);
    return j(Cu2.parseFunction(), Vh);
  }
  throw new c("Invalid token after macro prefix", Au2);
} });
e(Au);
Au = {};
Au.type = Vh;
Cu = [];
Cu.push("\\def");
Cu.push(Du);
Cu.push("\\edef");
Cu.push(Eu);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 0, allowedInText: Bu, primitive: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2) {
  var Au2 = Bu2.parser;
  var Eu2 = Bu2.funcName;
  Bu2 = Au2.gullet;
  Bu2 = Bu2.popToken();
  var Gu2 = Bu2.text;
  var Cu2 = new RegExp(on, lh);
  if (Cu2.test(Gu2)) throw new c(gm, Bu2);
  var Fu2 = void 0;
  var Du2 = [];
  Du2.push([]);
  Bu2 = 0;
  for (; ; ) {
    Cu2 = Au2.gullet;
    Cu2 = Cu2.future().text;
    if (!(Cu2 !== pn)) {
      break;
    }
    Cu2 = Au2.gullet;
    Cu2 = Cu2.popToken();
    var Hu2 = Cu2.text;
    if (Hu2 === uq) {
      Cu2 = Au2.gullet;
      Cu2 = Cu2.future().text;
      if (Cu2 === pn) {
        Cu2 = Au2.gullet;
        Fu2 = Cu2.future();
        Du2[Bu2].push(pn);
        break;
      }
      Cu2 = Au2.gullet;
      Cu2 = Cu2.popToken();
      if (!new RegExp("^[1-9]$", lh).test(Cu2.text)) {
        Au2 = c;
        throw new Au2('Invalid argument number "' + Cu2.text + pj);
      }
      Hu2 = Cu2.text;
      Hu2 = parseInt(Hu2);
      if (Hu2 !== Bu2 + 1) {
        Au2 = c;
        throw new Au2('Argument number "' + Cu2.text + '" out of order');
      }
      Bu2 = Bu2 + 1;
      Du2.push([]);
    } else {
      Hu2 = Cu2.text;
      if (Hu2 === fk) {
        throw new c("Expected a macro definition");
      } else {
        Du2[Bu2].push(Cu2.text);
      }
    }
  }
  Cu2 = Au2.gullet;
  Cu2 = Cu2.consumeArg().tokens;
  !Fu2 || Cu2.unshift(Fu2);
  ("\\edef" === Eu2 || "\\xdef" === Eu2) && (Fu2 = Au2.gullet, Cu2 = Fu2.expandTokens(Cu2), Cu2.reverse());
  Fu2 = {};
  Object.assign(Fu2, { tokens: Cu2, numArgs: Bu2, delimiters: Du2 });
  Bu2 = Au2.gullet;
  Bu2 = Bu2.macros;
  Bu2.set(Gu2, Fu2, Eu2 === Na[Eu2]);
  Bu2 = {};
  Object.assign(Bu2, { type: Vh, mode: Au2.mode });
  return Bu2;
} });
e(Au);
Au = {};
Au.type = Vh;
Cu = [];
Cu.push("\\let");
Cu.push(Mq);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 0, allowedInText: Bu, primitive: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2) {
  let Au2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Cu2 = xb, Du2 = Au2.gullet;
  Cu2 = Cu2(Du2.popToken());
  Du2 = Au2.gullet;
  Du2.consumeSpaces();
  yb(Au2, Cu2, ed(Au2), Bu2 === Mq);
  Bu2 = {};
  Object.assign(Bu2, { type: Vh, mode: Au2.mode });
  return Bu2;
} });
e(Au);
Au = {};
Au.type = Vh;
Cu = [];
Cu.push(Fu);
Cu.push(bp);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 0, allowedInText: Bu, primitive: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2) {
  let Au2 = Bu2.parser, Cu2 = Bu2.funcName;
  Bu2 = xb;
  let Du2 = Au2.gullet;
  Du2 = Bu2(Du2.popToken());
  let Eu2 = Au2.gullet.popToken();
  Bu2 = Au2.gullet.popToken();
  yb(Au2, Du2, Bu2, Cu2 === bp);
  Cu2 = Au2.gullet;
  Cu2.pushToken(Bu2);
  Au2.gullet.pushToken(Eu2);
  Bu2 = {};
  Object.assign(Bu2, { type: Vh, mode: Au2.mode });
  return Bu2;
} });
e(Au);
var aa = void 0;
var Oa = void 0;
var zb = void 0;
var fd = void 0;
var gd = void 0;
var Ab = void 0;
var Pa = void 0;
var Qa = void 0;
var Ra = void 0;
var ra = void 0;
var hd = void 0;
var id = void 0;
var Bb = void 0;
var Sa = void 0;
var Ta = void 0;
var Ua = void 0;
var Cb = void 0;
var jd = void 0;
var Db = void 0;
var ba = void 0;
var kd = void 0;
var ld = void 0;
var Eb = void 0;
var md = void 0;
var Fb = void 0;
var Gb = void 0;
aa = (Au2, Bu2, Cu2) => {
  var Du2 = o.math[Au2];
  !Du2 || (Du2 = o.math[Au2], Du2 = Du2.replace);
  Du2 = Du2 || Au2;
  Cu2 = Aa(Du2, Bu2, Cu2);
  if (!Cu2) throw t("Unsupported symbol " + Au2 + " and font size " + Bu2 + Bk);
  return Cu2;
};
Oa = (Au2, Bu2, Cu2, Du2) => {
  Bu2 = Cu2.havingBaseStyle(Bu2);
  let Eu2 = [];
  Eu2.push(Au2);
  Au2 = a;
  Au2 = Au2.makeSpan(Du2.concat(Bu2.sizingClasses(Cu2)), Eu2, Cu2);
  Du2 = +Bu2.sizeMultiplier;
  Cu2 = Du2 / +Cu2.sizeMultiplier;
  Object.assign(Au2, { height: +Au2.height * +Cu2, depth: +Au2.depth * +Cu2, maxFontSize: Bu2.sizeMultiplier });
  return Au2;
};
zb = (Au2, Bu2, Cu2) => {
  Cu2 = Bu2.havingBaseStyle(Cu2);
  let Du2 = 1, Eu2 = +Bu2.sizeMultiplier;
  Cu2 = +(Du2 - +(Eu2 / +Cu2.sizeMultiplier));
  Bu2 = Cu2 * +Bu2.fontMetrics().axisHeight;
  Au2.classes.push("delimcenter");
  Cu2 = Au2.style;
  Cu2.top = d(Bu2);
  Object.assign(Au2, { height: +Au2.height - +Bu2, depth: Au2.depth + Bu2 });
};
fd = (Au2, Bu2, Cu2, Du2, Eu2, Fu2) => {
  Au2 = Oa(a.makeSymbol(Au2, vk, Eu2, Du2), Bu2, Du2, Fu2);
  !Cu2 || zb(Au2, Du2, Bu2);
  return Au2;
};
gd = (Au2, Bu2, Cu2, Du2) => {
  let Eu2 = a;
  return Eu2.makeSymbol(Au2, gt + Bu2 + Tt, Cu2, Du2);
};
Ab = (Au2, Bu2, Cu2, Du2, Eu2, Fu2) => {
  Eu2 = gd(Au2, Bu2, Eu2, Du2);
  Au2 = [];
  Au2.push(Nk);
  Au2.push(Of + Bu2);
  Bu2 = [];
  Bu2.push(Eu2);
  Au2 = Oa(a.makeSpan(Au2, Bu2, Du2), g.TEXT, Du2, Fu2);
  !Cu2 || zb(Au2, Du2, g.TEXT);
  return Au2;
};
Pa = (Au2, Bu2, Cu2) => {
  var Eu2 = Bu2 === ak ? "delim-size1" : "delim-size4", Du2, Fu2;
  Du2 = [];
  Du2.push("delimsizinginner");
  Du2.push(Eu2);
  Eu2 = [];
  Fu2 = [];
  Fu2.push(a.makeSymbol(Au2, Bu2, Cu2));
  Eu2.push(a.makeSpan([], Fu2));
  Bu2 = a.makeSpan(Du2, Eu2);
  Au2 = {};
  Object.assign(Au2, { type: Yf, elem: Bu2 });
  return Au2;
};
Qa = (Au2, Bu2, Cu2) => {
  var Du2 = N["Size4-Regular"];
  Du2[Au2.charCodeAt(0)] ? (Du2 = N["Size4-Regular"], Du2 = Du2[Au2.charCodeAt(0)][4]) : (Du2 = N["Size1-Regular"], Du2 = Du2[Au2.charCodeAt(0)][4]);
  var Eu2 = K;
  var Fu2 = yc;
  var Gu2 = Math;
  Au2 = new Eu2(Rm, Fu2(Au2, Gu2.round(+yu * +Bu2)));
  Eu2 = [];
  Eu2.push(Au2);
  Au2 = {};
  Object.assign(Au2, { width: d(Du2), height: d(Bu2), style: "width:" + d(Du2) });
  Fu2 = Tn + +yu * +Du2 + Wi;
  Gu2 = Math;
  Object.assign(Au2, { viewBox: Fu2 + Gu2.round(+yu * +Bu2), preserveAspectRatio: Lk });
  Eu2 = new I(Eu2, Au2);
  Au2 = [];
  Au2.push(Eu2);
  Au2 = a.makeSvgSpan([], Au2, Cu2);
  Au2.height = Bu2;
  Cu2 = Au2.style;
  Cu2.height = d(Bu2);
  Bu2 = Au2.style;
  Bu2.width = d(Du2);
  Bu2 = {};
  Object.assign(Bu2, { type: Yf, elem: Au2 });
  return Bu2;
};
Ra = 8e-3;
Au = {};
Au.type = kh;
Cu = +(0 - 1);
Au.size = Cu * +Ra;
ra = Au;
Au = [];
Au.push(tm);
Cu = "\\lvert";
Au.push(Cu);
Du = "\\rvert";
Au.push(Du);
Au.push(Cq);
hd = Au;
Au = [];
Au.push(qp);
Eu = "\\lVert";
Au.push(Eu);
Fu = "\\rVert";
Au.push(Fu);
Au.push($l);
id = Au;
Bb = (Au2, Bu2, Cu2, Du2, Eu2, Fu2) => {
  var Gu2 = null;
  if (Au2 === ok3) {
    var Iu2 = Ar, Pu2 = Ar, Ku2 = lh, Lu2 = 0, Hu2 = ak, Ju2, Mu2, Nu2, Ou2, Qu2, Su2, Tu2, Ru2;
  } else {
    Au2 === Ll ? (Iu2 = xr, Pu2 = xr, Ku2 = lh, Lu2 = 0, Hu2 = ak) : (Au2 === vj ? (Ju2 = Ar, Iu2 = Ar, Ku2 = lh, Lu2 = 0, Hu2 = ak) : Au2 === Mk ? (Ju2 = xr, Iu2 = xr, Ku2 = lh, Lu2 = 0, Hu2 = ak) : (Au2 === fm ? (Au2 = ok3, Iu2 = Ar, Ju2 = vj, Ku2 = lh, Lu2 = 0, Hu2 = ak) : Au2 === bm ? (Au2 = Ll, Iu2 = xr, Ju2 = Mk, Ku2 = lh, Lu2 = 0, Hu2 = ak) : i.contains(hd, Au2) ? (Iu2 = "\u2223", Ju2 = Au2, Ku2 = "vert", Lu2 = 333, Hu2 = ak) : i.contains(id, Au2) ? (Iu2 = "\u2225", Ju2 = Au2, Ku2 = Ps, Lu2 = 556, Hu2 = ak) : Au2 === pp || Au2 === zo ? (Au2 = "\u23A1", Iu2 = yr, Ju2 = "\u23A3", Ku2 = "lbrack", Lu2 = 667, Hu2 = _f) : Au2 === Km || Au2 === Eo ? (Au2 = "\u23A4", Iu2 = zr, Ju2 = "\u23A6", Ku2 = "rbrack", Lu2 = 667, Hu2 = _f) : Au2 === Ao || "\u230A" === Au2 ? (Au2 = yr, Iu2 = yr, Ju2 = "\u23A3", Ku2 = "lfloor", Lu2 = 667, Hu2 = _f) : Au2 === yp || "\u2308" === Au2 ? (Au2 = "\u23A1", Iu2 = yr, Ju2 = yr, Ku2 = "lceil", Lu2 = 667, Hu2 = _f) : Au2 === Fo || "\u230B" === Au2 ? (Au2 = zr, Iu2 = zr, Ju2 = "\u23A6", Ku2 = "rfloor", Lu2 = 667, Hu2 = _f) : Au2 === Bp || "\u2309" === Au2 ? (Au2 = "\u23A4", Iu2 = zr, Ju2 = zr, Ku2 = "rceil", Lu2 = 667, Hu2 = _f) : "(" === Au2 || Au2 === Co ? (Au2 = "\u239B", Iu2 = "\u239C", Ju2 = "\u239D", Ku2 = "lparen", Lu2 = 875, Hu2 = _f) : Au2 === kr || Au2 === Ho ? (Au2 = "\u239E", Iu2 = "\u239F", Ju2 = "\u23A0", Ku2 = "rparen", Lu2 = 875, Hu2 = _f) : (Au2 === On || Au2 === yo ? (Au2 = "\u23A7", Gu2 = "\u23A8", Iu2 = Om, Ju2 = "\u23A9", Hu2 = _f) : Au2 === Pn || Au2 === Do ? (Au2 = "\u23AB", Gu2 = "\u23AC", Iu2 = Om, Ju2 = "\u23AD", Hu2 = _f) : Au2 === Bo || "\u27EE" === Au2 ? (Au2 = "\u23A7", Iu2 = Om, Ju2 = "\u23A9", Hu2 = _f) : Au2 === Go || "\u27EF" === Au2 ? (Au2 = "\u23AB", Iu2 = Om, Ju2 = "\u23AD", Hu2 = _f) : Au2 === vm || "\u23B0" === Au2 ? (Au2 = "\u23A7", Iu2 = Om, Ju2 = "\u23AD", Hu2 = _f) : Au2 === wm || "\u23B1" === Au2 ? (Au2 = "\u23AB", Iu2 = Om, Ju2 = "\u23A9", Hu2 = _f) : (Iu2 = Au2, Ju2 = Au2, Hu2 = ak), Ku2 = lh, Lu2 = 0), Mu2 = Ju2, Ju2 = Au2, Au2 = Mu2), Pu2 = Au2, Au2 = Ju2);
  }
  Ju2 = aa(Au2, Hu2, Eu2);
  Mu2 = Ju2.height;
  Mu2 = Mu2 + Ju2.depth;
  Ju2 = aa(Iu2, Hu2, Eu2);
  Nu2 = Ju2.height;
  Ju2 = Nu2 + Ju2.depth;
  Nu2 = aa(Pu2, Hu2, Eu2);
  Ou2 = Nu2.height;
  Nu2 = Ou2 + Nu2.depth;
  null !== Gu2 ? (Ou2 = aa(Gu2, Hu2, Eu2), Qu2 = Ou2.height, Ou2 = Qu2 + Ou2.depth, Ru2 = 2) : (Ou2 = 0, Ru2 = 1);
  Qu2 = Mu2 + Nu2 + Ou2;
  Su2 = Math;
  Tu2 = Math;
  Bu2 = +(+Bu2 - +Qu2);
  Ju2 = Qu2 + +(+Su2.max(0, Tu2.ceil(Bu2 / +(+Ru2 * +Ju2))) * +Ru2) * +Ju2;
  Bu2 = Du2.fontMetrics().axisHeight;
  !Cu2 || (Bu2 = +Bu2, Bu2 = Bu2 * +Du2.sizeMultiplier);
  Cu2 = +Ju2;
  Qu2 = +(Cu2 / 2) - +Bu2;
  Bu2 = [];
  Cu2 = Ku2.length;
  Cu2 > 0 ? (Au2 = +(+Ju2 - +Mu2) - +Nu2, Cu2 = Math, Eu2 = +Ju2, Cu2 = Cu2.round(Eu2 * +yu), Eu2 = zc, Gu2 = Math, Au2 = new K(Ku2, Eu2(Ku2, Gu2.round(+Au2 * +yu))), Eu2 = (+Lu2 / +yu).toFixed(3) + qr, Gu2 = (+Cu2 / +yu).toFixed(3) + qr, Hu2 = [], Hu2.push(Au2), Au2 = {}, Object.assign(Au2, { width: Eu2, height: Gu2, viewBox: Tn + Lu2 + Wi + Cu2 + "" }), Hu2 = new I(Hu2, Au2), Au2 = [], Au2.push(Hu2), Au2 = a.makeSvgSpan([], Au2, Du2), Au2.height = +Cu2 / +yu, Au2.style.width = Eu2, Au2.style.height = Gu2, Cu2 = {}, Object.assign(Cu2, { type: Yf, elem: Au2 }), Bu2.push(Cu2)) : (Bu2.push(Pa(Pu2, Hu2, Eu2)), Bu2.push(ra), null === Gu2 ? (Cu2 = +(+Ju2 - +Mu2) - +Nu2, Gu2 = 2, Bu2.push(Qa(Iu2, Cu2 + Gu2 * +Ra, Du2))) : (Cu2 = +(+(+(+Ju2 - +Mu2) - +Nu2) - +Ou2), Cu2 = Cu2 / 2, Ju2 = 2, Cu2 = Cu2 + Ju2 * +Ra, Bu2.push(Qa(Iu2, Cu2, Du2)), Bu2.push(ra), Bu2.push(Pa(Gu2, Hu2, Eu2)), Bu2.push(ra), Bu2.push(Qa(Iu2, Cu2, Du2))), Bu2.push(ra), Bu2.push(Pa(Au2, Hu2, Eu2)));
  Cu2 = Du2.havingBaseStyle(g.TEXT);
  Au2 = {};
  Object.assign(Au2, { positionType: lj, positionData: Qu2, children: Bu2 });
  Eu2 = a.makeVList(Au2, Cu2);
  Au2 = [];
  Au2.push(Nk);
  Au2.push("mult");
  Bu2 = [];
  Bu2.push(Eu2);
  return Oa(a.makeSpan(Au2, Bu2, Cu2), g.TEXT, Du2, Fu2);
};
Sa = 80;
Ta = 0.08;
Ua = (Au2, Bu2, Cu2, Du2, Eu2) => {
  Au2 = new K(Au2, xc(Au2, Du2, Cu2));
  Du2 = [];
  Du2.push(Au2);
  Au2 = {};
  Object.assign(Au2, { width: Dr, height: d(Bu2), viewBox: Rr + Cu2, preserveAspectRatio: tq });
  Cu2 = new I(Du2, Au2);
  Au2 = [];
  Au2.push(ao);
  Bu2 = [];
  Bu2.push(Cu2);
  return a.makeSvgSpan(Au2, Bu2, Eu2);
};
Au = [];
Au.push("(");
Au.push(Co);
Au.push(kr);
Au.push(Ho);
Au.push(pp);
Au.push(zo);
Au.push(Km);
Au.push(Eo);
Au.push(On);
Au.push(yo);
Au.push(Pn);
Au.push(Do);
Au.push(Ao);
Au.push(Fo);
Au.push("\u230A");
Au.push("\u230B");
Au.push(yp);
Au.push(Bp);
Au.push("\u2308");
Au.push("\u2309");
Au.push(Bq);
Cb = Au;
Au = [];
Au.push(ok3);
Au.push(vj);
Au.push(fm);
Au.push(Ll);
Au.push(Mk);
Au.push(bm);
Au.push(tm);
Au.push(qp);
Au.push(Cq);
Au.push($l);
Au.push(Cu);
Au.push(Du);
Au.push(Eu);
Au.push(Fu);
Au.push(Bo);
Au.push(Go);
Au.push("\u27EE");
Au.push("\u27EF");
Au.push(vm);
Au.push(wm);
Au.push("\u23B0");
Au.push("\u23B1");
jd = Au;
Au = [];
Au.push(ct);
Au.push(no);
Au.push(im);
Au.push(km);
Au.push("/");
Au.push(Xr);
Au.push(bq);
Au.push(aq);
Db = Au;
Au = [];
Au.push(0);
Au.push(1.2);
Au.push(1.8);
Au.push(2.4);
Au.push(3);
ba = Au;
Au = [];
Hu = {};
Object.assign(Hu, { type: Vj, style: g.SCRIPTSCRIPT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: Vj, style: g.SCRIPT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: Vj, style: g.TEXT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 1 });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 2 });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 3 });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 4 });
Au.push(Hu);
kd = Au;
Au = [];
Hu = {};
Object.assign(Hu, { type: Vj, style: g.SCRIPTSCRIPT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: Vj, style: g.SCRIPT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: Vj, style: g.TEXT });
Au.push(Hu);
Hu = {};
Hu.type = Jh;
Au.push(Hu);
ld = Au;
Au = [];
Hu = {};
Object.assign(Hu, { type: Vj, style: g.SCRIPTSCRIPT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: Vj, style: g.SCRIPT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: Vj, style: g.TEXT });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 1 });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 2 });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 3 });
Au.push(Hu);
Hu = {};
Object.assign(Hu, { type: ro, size: 4 });
Au.push(Hu);
Hu = {};
Hu.type = Jh;
Au.push(Hu);
Eb = Au;
md = ze;
Fb = (Au2, Bu2, Cu2, Du2) => {
  var Eu2 = Math;
  var Gu2 = 3;
  var Fu2 = Du2.style;
  Eu2 = Eu2.min(2, Gu2 - +Fu2.size);
  while (Eu2 < Cu2.length) {
    Fu2 = Cu2[Eu2];
    Fu2 = Fu2.type;
    if (Fu2 === Jh) break;
    Fu2 = aa;
    Fu2 = Fu2(Au2, md(Cu2[Eu2]), tg);
    Gu2 = Fu2.height;
    Fu2 = Gu2 + Fu2.depth;
    Gu2 = Cu2[Eu2];
    Gu2 = Gu2.type;
    Gu2 === Vj && (Gu2 = Cu2[Eu2], Gu2 = Du2.havingBaseStyle(Gu2.style), Fu2 = +Fu2, Fu2 = Fu2 * +Gu2.sizeMultiplier);
    if (Fu2 > Bu2) return Cu2[Eu2];
    Eu2 = Eu2 + 1;
  }
  Au2 = Cu2.length;
  return Cu2[Au2 - 1];
};
Gb = Ae;
Au = {};
Object.assign(Au, { sqrtImage: (Au2, Bu2) => {
  var Cu2 = Bu2.havingBaseSizing();
  var Du2 = Fb;
  var Eu2 = +Au2;
  var Fu2 = Du2(Bq, Eu2 * +Cu2.sizeMultiplier, Eb, Cu2);
  Du2 = Cu2.sizeMultiplier;
  Cu2 = Math;
  Eu2 = +Bu2.minRuleThickness;
  Cu2 = Cu2.max(0, Eu2 - +Bu2.fontMetrics().sqrtRuleThickness);
  Eu2 = Fu2.type;
  if (Eu2 === Vj) {
    var Dv = void 0;
    Fu2 = yu + +yu * +Cu2 + Sa;
    Au2 < 1 ? Du2 = 1 : Au2 < 1.4 && (Du2 = 0.7);
    Eu2 = +(1 + Cu2 + Ta) / +Du2;
    var Gu2 = +(1 + Cu2) / +Du2;
    Au2 = Ua(tu, Eu2, Fu2, Cu2, Bu2);
    Fu2 = Au2.style;
    Fu2.minWidth = "0.853em";
    Fu2 = 0.833 / +Du2;
  } else {
    Dv = void 0;
    Eu2 = Fu2.type;
    if (Eu2 === ro) {
      Eu2 = +(yu + Sa);
      Au2 = ba;
      Au2 = Eu2 * +Au2[Fu2.size];
      Gu2 = +(ba[Fu2.size] + Cu2) / +Du2;
      Eu2 = +(ba[Fu2.size] + Cu2 + Ta) / +Du2;
      var Hu2 = Ua;
      Au2 = Hu2("sqrtSize" + Fu2.size, Eu2, Au2, Cu2, Bu2);
      Fu2 = Au2.style;
      Fu2.minWidth = "1.02em";
      Fu2 = 1 / +Du2;
    } else {
      Eu2 = Au2 + Cu2 + Ta;
      Gu2 = Au2 + Cu2;
      Fu2 = Math;
      Au2 = Ua(uu, Eu2, Fu2.floor(+yu * +Au2 + Cu2) + Sa, Cu2, Bu2);
      Fu2 = Au2.style;
      Fu2.minWidth = "0.742em";
      Fu2 = 1.056;
    }
  }
  Au2.height = Gu2;
  Gu2 = Au2.style;
  Gu2.height = d(Eu2);
  Eu2 = {};
  Object.assign(Eu2, { span: Au2, advanceWidth: Fu2, ruleWidth: +(Bu2.fontMetrics().sqrtRuleThickness + Cu2) * +Du2 });
  return Eu2;
}, sizedDelim: ye, sizeToMaxHeight: ba, customSizedDelim: Gb, leftRightDelim: (Au2, Bu2, Cu2, Du2, Eu2, Fu2) => {
  let Gu2 = +Du2.fontMetrics().axisHeight;
  Gu2 = Gu2 * +Du2.sizeMultiplier;
  let Hu2 = 5;
  Hu2 = Hu2 / +Du2.fontMetrics().ptPerEm;
  let Iu2 = Math;
  Bu2 = Iu2.max(+Bu2 - +Gu2, Cu2 + Gu2);
  Cu2 = Math;
  Gu2 = +Bu2;
  Gu2 = +(Gu2 / 500) * 901;
  Cu2 = Cu2.max(Gu2, +(2 * +Bu2) - +Hu2);
  Bu2 = [];
  Bu2.push(Au2);
  Bu2.push(Cu2);
  Bu2.push(true);
  Bu2.push(Du2);
  Bu2.push(Eu2);
  Bu2.push(Fu2);
  return Gb.apply(void 0, Bu2);
} });
var y = void 0;
y = Au;
var Hb = void 0;
var nd = void 0;
var sa = void 0;
var Ib = void 0;
Au = {};
Hu = {};
Object.assign(Hu, { mclass: Uj, size: 1 });
Au["\\bigl"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: Uj, size: 2 });
Au["\\Bigl"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: Uj, size: 3 });
Au["\\biggl"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: Uj, size: 4 });
Au["\\Biggl"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: mj, size: 1 });
var Su = "\\bigr";
Au["\\bigr"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: mj, size: 2 });
var Tu = "\\Bigr";
Au["\\Bigr"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: mj, size: 3 });
var Uu = "\\biggr";
Au["\\biggr"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: mj, size: 4 });
var Vu = "\\Biggr";
Au["\\Biggr"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: fq, size: 1 });
Au["\\bigm"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: fq, size: 2 });
Au["\\Bigm"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: fq, size: 3 });
Au["\\biggm"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: fq, size: 4 });
Au["\\Biggm"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: wg, size: 1 });
Au["\\big"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: wg, size: 2 });
Au["\\Big"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: wg, size: 3 });
Au["\\bigg"] = Hu;
Hu = {};
Object.assign(Hu, { mclass: wg, size: 4 });
Au["\\Bigg"] = Hu;
Hb = Au;
Au = [];
Au.push("(");
Au.push(Co);
Au.push(kr);
Au.push(Ho);
Au.push(pp);
Au.push(zo);
Au.push(Km);
Au.push(Eo);
Au.push(On);
Au.push(yo);
Au.push(Pn);
Au.push(Do);
Au.push(Ao);
Au.push(Fo);
Au.push("\u230A");
Au.push("\u230B");
Au.push(yp);
Au.push(Bp);
Au.push("\u2308");
Au.push("\u2309");
Au.push(ct);
Au.push(no);
Au.push(im);
Au.push(Br);
Au.push(km);
Au.push(Cr);
Au.push(bq);
Au.push(aq);
Au.push(Cu);
Au.push(Du);
Au.push(Eu);
Au.push(Fu);
Au.push(Bo);
Au.push(Go);
Au.push("\u27EE");
Au.push("\u27EF");
Au.push(vm);
Au.push(wm);
Au.push("\u23B0");
Au.push("\u23B1");
Au.push("/");
Au.push(Xr);
Au.push(tm);
Au.push(Cq);
Au.push(qp);
Au.push($l);
Au.push(ok3);
Au.push(Ll);
Au.push(vj);
Au.push(Mk);
Au.push(fm);
Au.push(bm);
Au.push(Bk);
nd = Au;
sa = Be;
Cu = {};
Cu.type = Nk;
Au = [];
Au.push("\\bigl");
Au.push("\\Bigl");
Au.push("\\biggl");
Au.push("\\Biggl");
Au.push(Su);
Au.push(Tu);
Au.push(Uu);
Au.push(Vu);
Au.push("\\bigm");
Au.push("\\Bigm");
Au.push("\\biggm");
Au.push("\\Biggm");
Au.push("\\big");
Au.push(Er);
Au.push("\\bigg");
Au.push("\\Bigg");
Cu.names = Au;
Au = {};
Au.numArgs = 1;
Du = [];
Du.push(jj);
Au.argTypes = Du;
Object.assign(Cu, { props: Au, handler: (Au2, Bu2) => {
  let Cu2 = sa(Bu2[0], Au2);
  Bu2 = {};
  Object.assign(Bu2, { type: Nk, mode: Au2.parser.mode });
  let Du2 = Hb;
  Object.assign(Bu2, { size: Du2[Au2.funcName].size, mclass: Hb[Au2.funcName].mclass, delim: Cu2.text });
  return Bu2;
}, htmlBuilder: (Au2, Bu2) => {
  var Cu2 = Au2.delim;
  if (Cu2 === Bk) {
    Bu2 = [];
    Bu2.push(Au2.mclass);
    return a.makeSpan(Bu2);
  }
  Cu2 = [];
  Cu2.push(Au2.mclass);
  return y.sizedDelim(Au2.delim, Au2.size, Bu2, Au2.mode, Cu2);
}, mathmlBuilder: (Au2) => {
  var Bu2 = [];
  var Cu2 = Au2.delim;
  Cu2 !== Bk && Bu2.push(f.makeText(Au2.delim, Au2.mode));
  var Ju2 = b;
  var Ku2 = Ju2.MathNode;
  Bu2 = new Ku2(ki, Bu2);
  Au2.mclass === Uj || Au2.mclass === mj ? Bu2.setAttribute(Ek, Dh) : Bu2.setAttribute(Ek, Gl);
  Bu2.setAttribute(oi, Dh);
  Cu2 = d;
  var Du2 = y.sizeToMaxHeight;
  Au2 = Cu2(Du2[Au2.size]);
  Bu2.setAttribute("minsize", Au2);
  Bu2.setAttribute("maxsize", Au2);
  return Bu2;
} });
e(Cu);
Ib = (Au2) => {
  if (!Au2.body) throw t("Bug: The leftright ParseNode wasn't fully parsed.");
};
Au = {};
Au.type = zl;
Cu = [];
var Wu = "\\right";
Cu.push(Wu);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 1, primitive: Bu });
Object.assign(Au, { props: Cu, handler: (Au2, Bu2) => {
  var Cu2 = Au2.parser;
  Cu2 = Cu2.gullet;
  var Du2 = Cu2.macros.get(yl);
  if (Du2 && typeof Du2 !== mh) throw new c("\\current@color set to non-string in \\right");
  Cu2 = {};
  Object.assign(Cu2, { type: zl, mode: Au2.parser.mode, delim: sa(Bu2[0], Au2).text, color: Du2 });
  return Cu2;
} });
e(Au);
Au = {};
Au.type = Pl;
Cu = [];
Cu.push("\\left");
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 1, primitive: Bu });
Object.assign(Au, { props: Cu, handler: (Au2, Bu2) => {
  let Du2 = sa(Bu2[0], Au2);
  Au2 = Au2.parser;
  Bu2 = Au2.leftrightDepth;
  Au2.leftrightDepth = Bu2 + 1;
  let Eu2 = Au2.parseExpression(false);
  Bu2 = Au2.leftrightDepth;
  Au2.leftrightDepth = Bu2 + -1;
  Au2.expect("\\right", false);
  let Cu2 = j(Au2.parseFunction(), zl);
  Bu2 = {};
  Object.assign(Bu2, { type: Pl, mode: Au2.mode, body: Eu2, left: Du2.text, right: Cu2.delim, rightColor: Cu2.color });
  return Bu2;
}, htmlBuilder: (Au2, Bu2) => {
  Ib(Au2);
  var Cu2 = [];
  Cu2.push(Uj);
  Cu2.push(mj);
  Cu2 = h2.buildExpression(Au2.body, Bu2, true, Cu2);
  var Eu2 = 0, Fu2 = 0, Hu2 = false, Du2 = 0, Gu2, Iu2;
  var vv = void 0;
  while (Du2 < Cu2.length) {
    Gu2 = Cu2[Du2];
    Gu2.isMiddle ? Hu2 = true : (Gu2 = Math, Iu2 = Cu2[Du2], Eu2 = Gu2.max(Iu2.height, Eu2), Gu2 = Math, Iu2 = Cu2[Du2], Fu2 = Gu2.max(Iu2.depth, Fu2));
    Du2 = Du2 + 1;
  }
  Du2 = +Eu2;
  Gu2 = Du2 * +Bu2.sizeMultiplier;
  Du2 = +Fu2;
  Fu2 = Du2 * +Bu2.sizeMultiplier;
  Du2 = Au2.left;
  Du2 === Bk ? (Du2 = [], Du2.push(Uj), Du2 = h2.makeNullDelimiter(Bu2, Du2)) : (Eu2 = [], Eu2.push(Uj), Du2 = [], Du2.push(Au2.left), Du2.push(Gu2), Du2.push(Fu2), Du2.push(Bu2), Du2.push(Au2.mode), Du2.push(Eu2), Du2 = y.leftRightDelim.apply(y, Du2));
  Cu2.unshift(Du2);
  if (Hu2) {
    Eu2 = 1;
    while (Eu2 < Cu2.length) {
      Du2 = Cu2[Eu2];
      Hu2 = Du2.isMiddle;
      !Hu2 || (Du2 = [], Du2.push(Hu2.delim), Du2.push(Gu2), Du2.push(Fu2), Du2.push(Hu2.options), Du2.push(Au2.mode), Du2.push([]), Cu2[Eu2] = y.leftRightDelim.apply(y, Du2));
      Eu2 = Eu2 + 1;
    }
  }
  Du2 = Au2.right;
  Du2 === Bk ? (Au2 = [], Au2.push(mj), Au2 = h2.makeNullDelimiter(Bu2, Au2)) : (Eu2 = Au2.rightColor ? Bu2.withColor(Au2.rightColor) : Bu2, Hu2 = [], Hu2.push(mj), Du2 = [], Du2.push(Au2.right), Du2.push(Gu2), Du2.push(Fu2), Du2.push(Eu2), Du2.push(Au2.mode), Du2.push(Hu2), Au2 = y.leftRightDelim.apply(y, Du2));
  Cu2.push(Au2);
  Au2 = [];
  Au2.push(Dn);
  return a.makeSpan(Au2, Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  Ib(Au2);
  Bu2 = f.buildExpression(Au2.body, Bu2);
  var Cu2 = Au2.left;
  Cu2 !== Bk && (Cu2 = [], Cu2.push(f.makeText(Au2.left, Au2.mode)), Cu2 = new b.MathNode(ki, Cu2), Cu2.setAttribute(Ek, Dh), Bu2.unshift(Cu2));
  Cu2 = Au2.right;
  Cu2 !== Bk && (Cu2 = [], Cu2.push(f.makeText(Au2.right, Au2.mode)), Cu2 = new b.MathNode(ki, Cu2), Cu2.setAttribute(Ek, Dh), !Au2.rightColor || Cu2.setAttribute(Ft, Au2.rightColor), Bu2.push(Cu2));
  return f.makeRow(Bu2);
} });
e(Au);
Au = {};
Au.type = "middle";
Cu = [];
Cu.push("\\middle");
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 1, primitive: Bu });
Object.assign(Au, { props: Cu, handler: (Au2, Bu2) => {
  var Cu2 = sa(Bu2[0], Au2);
  Bu2 = Au2.parser;
  if (!Bu2.leftrightDepth) throw new c("\\middle without preceding \\left", Cu2);
  Bu2 = {};
  Object.assign(Bu2, { type: "middle", mode: Au2.parser.mode, delim: Cu2.text });
  return Bu2;
}, htmlBuilder: (Au2, Bu2) => {
  var Cu2 = Au2.delim;
  if (Cu2 === Bk) {
    Cu2 = h2.makeNullDelimiter(Bu2, []);
  } else {
    Cu2 = y.sizedDelim(Au2.delim, 1, Bu2, Au2.mode, []);
    var Du2 = {};
    Object.assign(Du2, { delim: Au2.delim, options: Bu2 });
    Cu2.isMiddle = Du2;
  }
  return Cu2;
}, mathmlBuilder: (Au2, Bu2) => {
  Au2 = Au2.delim === Cq || Au2.delim === tm ? f.makeText(tm, yf) : f.makeText(Au2.delim, Au2.mode);
  Bu2 = [];
  Bu2.push(Au2);
  Au2 = new b.MathNode(ki, Bu2);
  Au2.setAttribute(Ek, Dh);
  Au2.setAttribute(Xh, "0.05em");
  Au2.setAttribute(Zk, "0.05em");
  return Au2;
} });
e(Au);
Eu = Ce;
Fu = (Au2, Bu2) => {
  var Cu2 = Au2.label.indexOf(hu);
  var Du2 = 0;
  Du2 = Cu2 > Du2 - 1 ? Eh : nu;
  Cu2 = [];
  Cu2.push(f.buildGroup(Au2.body, Bu2));
  Cu2 = new b.MathNode(Du2, Cu2);
  Du2 = Au2.label;
  Du2 === _t ? Cu2.setAttribute(ni, "updiagonalstrike") : Du2 === qt ? Cu2.setAttribute(ni, "downdiagonalstrike") : "\\phase" === Du2 ? Cu2.setAttribute(ni, "phasorangle") : "\\sout" === Du2 ? Cu2.setAttribute(ni, "horizontalstrike") : Du2 === xq ? Cu2.setAttribute(ni, "box") : Du2 === wq ? Cu2.setAttribute(ni, "actuarial") : Du2 === an || Du2 === Ds ? (Du2 = +Bu2.fontMetrics().fboxsep, Du2 = Du2 * +Bu2.fontMetrics().ptPerEm, Cu2.setAttribute(Zf, "+" + 2 * +Du2 + "pt"), Cu2.setAttribute(Df, "+" + 2 * +Du2 + "pt"), Du2 = Du2 + "pt", Cu2.setAttribute(Xh, Du2), Cu2.setAttribute(Zm, Du2), Du2 = Au2.label, Du2 === an && (Du2 = Math, Bu2 = "border: " + Du2.max(Bu2.fontMetrics().fboxrule, Bu2.minRuleThickness) + "em solid ", Cu2.setAttribute(Af, Bu2 + Au2.borderColor + ""))) : Du2 === vt && Cu2.setAttribute(ni, "updiagonalstrike downdiagonalstrike");
  !Au2.backgroundColor || Cu2.setAttribute(rq, Au2.backgroundColor);
  return Cu2;
};
Au = {};
Au.type = kk;
Cu = [];
Cu.push(Ds);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 2, allowedInText: Bu });
Du = [];
Du.push(Lg);
Du.push(yf);
Cu.argTypes = Du;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2, Du2) {
  Du2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Eu2 = j(Cu2[0], yj).color;
  Cu2 = Cu2[1];
  let Au2 = {};
  Object.assign(Au2, { type: kk, mode: Du2.mode, label: Bu2, backgroundColor: Eu2, body: Cu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Au);
Au = {};
Au.type = kk;
Cu = [];
Cu.push(an);
Au.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 3, allowedInText: Bu });
Du = [];
Du.push(Lg);
Du.push(Lg);
Du.push(yf);
Cu.argTypes = Du;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2, Du2) {
  Du2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Eu2 = j(Cu2[0], yj).color, Fu2 = j(Cu2[1], yj).color;
  Cu2 = Cu2[2];
  let Au2 = {};
  Object.assign(Au2, { type: kk, mode: Du2.mode, label: Bu2, backgroundColor: Fu2, borderColor: Eu2, body: Cu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Au);
Au = {};
Au.type = kk;
Cu = [];
Cu.push(xq);
Au.names = Cu;
Cu = {};
Cu.numArgs = 1;
Du = [];
Du.push(kt);
Object.assign(Cu, { argTypes: Du, allowedInText: Bu });
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: kk, mode: Bu2.mode, label: xq, body: Cu2[0] });
  return Au2;
} });
e(Au);
Au = {};
Au.type = kk;
Cu = [];
Cu.push(_t);
Cu.push(qt);
Cu.push(vt);
Cu.push("\\sout");
Cu.push("\\phase");
Au.names = Cu;
Cu = {};
Cu.numArgs = 1;
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  let Du2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  Cu2 = Cu2[0];
  let Au2 = {};
  Object.assign(Au2, { type: kk, mode: Du2.mode, label: Bu2, body: Cu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Au);
Au = {};
Au.type = kk;
Cu = [];
Cu.push(wq);
Au.names = Cu;
Cu = {};
Cu.numArgs = 1;
Du = [];
Du.push(kt);
Object.assign(Cu, { argTypes: Du, allowedInText: false });
Object.assign(Au, { props: Cu, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: kk, mode: Bu2.mode, label: wq, body: Cu2[0] });
  return Au2;
} });
e(Au);
var Jb = void 0;
Jb = {};
Du = (Au2) => {
  var Cu2 = Au2.type;
  var Du2 = Au2.names;
  var Bu2 = Au2.props;
  var Gu2 = Au2.handler;
  var Eu2 = Au2.htmlBuilder;
  var Fu2 = Au2.mathmlBuilder;
  Au2 = {};
  Au2.type = Cu2;
  Bu2 = Bu2.numArgs;
  Bu2 = Bu2 || 0;
  Object.assign(Au2, { numArgs: Bu2, allowedInText: false, numOptionalArgs: 0, handler: Gu2 });
  Bu2 = 0;
  while (Bu2 < Du2.length) {
    Jb[Du2[Bu2]] = Au2;
    Bu2 = Bu2 + 1;
  }
  !Eu2 || (_[Cu2] = Eu2);
  !Fu2 || ($2[Cu2] = Fu2);
};
var Kb = void 0;
Kb = {};
Au = (Au2, Bu2) => {
  Kb[Au2] = Bu2;
};
var Lb = void 0;
var ta = void 0;
var Va = void 0;
var Q = void 0;
var Wa = void 0;
var od = void 0;
Lb = (Au2) => {
  var Du2 = [];
  Au2.consumeSpaces();
  var Bu2 = Au2.fetch().text;
  Bu2 === Cp && (Au2.consume(), Au2.consumeSpaces(), Bu2 = Au2.fetch().text);
  while ("\\hline" === Bu2 || Bu2 === bn) {
    Au2.consume();
    Du2.push(Bu2 === bn);
    Au2.consumeSpaces();
    Bu2 = Au2.fetch().text;
  }
  return Du2;
};
ta = (Au2) => {
  var Bu2 = Au2.parser;
  Bu2 = Bu2.settings;
  if (!Bu2.displayMode) {
    Bu2 = c;
    throw new Bu2(pn + Au2.envName + "} can be used only in display mode.");
  }
};
Va = (Au2) => {
  var Bu2 = Au2.indexOf("ed");
  var Cu2 = 0;
  if (Bu2 === Cu2 - 1) {
    Au2 = Au2.indexOf(lr);
    Bu2 = 0;
    return Au2 === Bu2 - 1;
  }
};
Q = (Au2, Bu2, Cu2) => {
  var Ru2 = Bu2.hskipBeforeAndAfter;
  var Su2 = Bu2.addJot;
  var Tu2 = Bu2.cols;
  var Eu2 = Bu2.arraystretch;
  var Ku2 = Bu2.colSeparationType;
  var Iu2 = Bu2.autoTag;
  var Ju2 = Bu2.singleRow;
  var Uu2 = Bu2.emptySingleRow;
  var Lu2 = Bu2.maxNumCols;
  var Vu2 = Bu2.leqno;
  Bu2 = Au2.gullet;
  Bu2.beginGroup();
  Ju2 || (Bu2 = Au2.gullet, Bu2.macros.set("\\cr", $m));
  if (!Eu2) {
    Bu2 = Au2.gullet.expandMacroAsText("\\arraystretch");
    if (Bu2 == null) {
      Eu2 = 1;
    } else {
      Eu2 = parseFloat(Bu2);
      var Du2, Mu2, Nu2, Hu2, Ou2, Fu2, Pu2, Gu2, Qu2;
      if (!Eu2 || Eu2 < 0) throw new c("Invalid \\arraystretch: " + Bu2);
    }
  }
  Bu2 = Au2.gullet;
  Bu2.beginGroup();
  Bu2 = [];
  Fu2 = [];
  Fu2.push(Bu2);
  Pu2 = [];
  Gu2 = [];
  Ou2 = !(Iu2 == null) ? [] : void 0;
  Mu2 = () => {
    if (Iu2) {
      var Gu3 = Au2.gullet;
      Gu3.macros.set(Vt, mr, true);
    }
  };
  Nu2 = () => {
    if (Ou2) {
      var Du3 = Au2.gullet;
      if (Du3.macros.get(Ik)) {
        var Zu2 = [];
        Zu2.push(new D(Ik));
        Ou2.push(Au2.subparse(Zu2));
        var Xu2 = Au2.gullet;
        Xu2.macros.set(Ik, void 0, true);
      } else {
        Zu2 = !!Iu2;
        !Zu2 || (Xu2 = Au2.gullet, Zu2 = Xu2.macros.get(Vt) === mr);
        Ou2.push(Zu2);
      }
    }
  };
  Mu2();
  Gu2.push(Lb(Au2));
  var Vv = void 0;
  var Wv = void 0;
  while (true) {
    Du2 = Ju2 ? Pm : Vn;
    Hu2 = Au2.parseExpression(false, Du2);
    Du2 = Au2.gullet;
    Du2.endGroup();
    Du2 = Au2.gullet;
    Du2.beginGroup();
    Du2 = {};
    Object.assign(Du2, { type: Xf, mode: Au2.mode, body: Hu2 });
    !Cu2 || (Hu2 = {}, Object.assign(Hu2, { type: Sh, mode: Au2.mode, style: Cu2 }), Qu2 = [], Qu2.push(Du2), Hu2.body = Qu2, Du2 = Hu2);
    Bu2.push(Du2);
    Hu2 = Au2.fetch().text;
    if ("&" === Hu2) {
      if (Lu2 && Bu2.length === Lu2) {
        if (Ju2 || Ku2) {
          throw new c("Too many tab characters: &", Au2.nextToken);
        } else {
          Au2.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
        }
      }
      Au2.consume();
    } else {
      if (Hu2 === Pm) {
        Nu2();
        var Xv = void 0;
        1 === Bu2.length && Du2.type === Sh && 0 === Du2.body[0].body.length && (Fu2.length > 1 || !Uu2) && Fu2.pop();
        Bu2 = Gu2.length;
        Cu2 = Fu2.length;
        Bu2 < Cu2 + 1 && Gu2.push([]);
        break;
      } else {
        if (Hu2 === Vn) {
          Au2.consume();
          Bu2 = void 0;
          Du2 = Au2.gullet;
          Du2 = Du2.future().text;
          Du2 !== Wi && (Bu2 = Au2.parseSizeGroup(true));
          Bu2 = Bu2 ? Bu2.value : null;
          Pu2.push(Bu2);
          Nu2();
          Gu2.push(Lb(Au2));
          Bu2 = [];
          Fu2.push(Bu2);
          Mu2();
        } else {
          throw new c("Expected & or \\\\ or \\cr or \\end", Au2.nextToken);
        }
      }
    }
  }
  Bu2 = Au2.gullet;
  Bu2.endGroup();
  Au2.gullet.endGroup();
  Bu2 = {};
  Object.assign(Bu2, { type: Ir, mode: Au2.mode, addJot: Su2, arraystretch: Eu2, body: Fu2, cols: Tu2, rowGaps: Pu2, hskipBeforeAndAfter: Ru2, hLinesBeforeRow: Gu2, colSeparationType: Ku2, tags: Ou2, leqno: Vu2 });
  return Bu2;
};
Wa = De;
Eu = Ee;
Cu = {};
Object.assign(Cu, { c: "center ", l: "left ", r: "right " });
od = Cu;
Fu = (Au2, Bu2) => {
  var Iu2 = [];
  var Cu2 = [];
  Cu2.push("mtr-glue");
  var Du2 = b.MathNode;
  var Fu2 = new Du2(vr, [], Cu2);
  Cu2 = [];
  Cu2.push("mml-eqn-num");
  var Gu2 = new b.MathNode(vr, [], Cu2);
  Du2 = 0;
  for (; ; ) {
    Cu2 = Au2.body;
    if (Du2 >= Cu2.length) {
      break;
    }
    var Hu2 = Au2.body[Du2];
    Cu2 = [];
    var Eu2 = 0, Ju2, Ku2;
    for (; Eu2 < Hu2.length; ) {
      Ju2 = [];
      Ju2.push(f.buildGroup(Hu2[Eu2], Bu2));
      Cu2.push(new b.MathNode(vr, Ju2));
      Eu2 = Eu2 + 1;
    }
    Au2.tags && !!Au2.tags[Du2] && (Cu2.unshift(Fu2), Cu2.push(Fu2), Au2.leqno ? Cu2.unshift(Gu2) : Cu2.push(Gu2));
    Iu2.push(new b.MathNode("mtr", Cu2));
    Du2 = Du2 + 1;
  }
  Bu2 = new b.MathNode(En, Iu2);
  Cu2 = Au2.arraystretch;
  0.5 === Cu2 ? Cu2 = 0.1 : (Cu2 = Au2.addJot ? 0.09 : 0, Du2 = +(0.16 + Au2.arraystretch), Cu2 = Du2 - 1 + Cu2);
  Bu2.setAttribute("rowspacing", d(Cu2));
  Au2.cols ? (Cu2 = Au2.cols, Cu2 = Cu2.length, Cu2 = Cu2 > 0) : Cu2 = false;
  if (Cu2) {
    Du2 = Au2.cols;
    Iu2 = Du2.length;
    Cu2 = Du2[0];
    Cu2 = Cu2.type;
    Cu2 === Jg ? (Gu2 = lh + "top ", Eu2 = 1) : (Gu2 = lh, Eu2 = 0);
    Cu2 = Du2.length;
    Cu2 = Du2[Cu2 - 1];
    Cu2 = Cu2.type;
    Cu2 === Jg && (Gu2 = Gu2 + "bottom ", Cu2 = Iu2, Iu2 = Cu2 - 1);
    Hu2 = lh;
    Cu2 = lh;
    Fu2 = false;
    while (Eu2 < Iu2) {
      Ju2 = Du2[Eu2];
      Ju2 = Ju2.type;
      if (Ju2 === ph) {
        Ju2 = od;
        Ku2 = Du2[Eu2];
        Hu2 = Hu2 + Ju2[Ku2.align];
        !Fu2 || (Cu2 = Cu2 + "none ");
        Fu2 = true;
      } else {
        Ju2 = Du2[Eu2];
        Ju2 = Ju2.type;
        if (Ju2 === Jg) {
          if (Fu2) {
            Fu2 = Du2[Eu2];
            Fu2 = Fu2.separator;
            if (Fu2 === tm) {
            }
            Fu2 = Du2[Eu2];
            Fu2 = Fu2.separator;
            Fu2 = Fu2 === tm ? "solid " : "dashed ";
            Cu2 = Cu2 + Fu2;
            Fu2 = false;
          }
        }
      }
      Eu2 = Eu2 + 1;
    }
    Bu2.setAttribute("columnalign", Hu2.trim());
    Du2 = new RegExp("[sd]", lh);
    !Du2.test(Cu2) || Bu2.setAttribute("columnlines", Cu2.trim());
  } else {
    Gu2 = lh;
  }
  Cu2 = Au2.colSeparationType;
  if (Cu2 === ph) {
    Du2 = Au2.cols;
    Du2 = Du2 || [];
    Eu2 = lh;
    Cu2 = 1;
    while (Cu2 < Du2.length) {
      if (Cu2 % 2) {
      }
      Fu2 = Cu2 % 2 ? "0em " : "1em ";
      Eu2 = Eu2 + Fu2;
      Cu2 = Cu2 + 1;
    }
    Bu2.setAttribute(Mi, Eu2.trim());
  } else {
    Au2.colSeparationType === Sm || Au2.colSeparationType === zn ? Bu2.setAttribute(Mi, Mn) : (Cu2 = Au2.colSeparationType, Cu2 === Vj ? Bu2.setAttribute(Mi, "0.2778em") : (Cu2 = Au2.colSeparationType, Cu2 === Qt ? Bu2.setAttribute(Mi, "0.5em") : Bu2.setAttribute(Mi, "1em")));
  }
  Cu2 = Au2.hLinesBeforeRow;
  Du2 = Cu2[0];
  if (Du2.length > 0) {
  }
  Du2 = Cu2[0];
  Du2 = Du2.length > 0 ? "left " : lh;
  Du2 = Gu2 + Du2;
  Eu2 = Cu2.length;
  Eu2 = Cu2[Eu2 - 1].length;
  if (Eu2 > 0) {
  }
  Eu2 = Cu2.length;
  Eu2 = Cu2[Eu2 - 1].length;
  Eu2 = Eu2 > 0 ? "right " : lh;
  Fu2 = Du2 + Eu2;
  Eu2 = lh;
  Du2 = 1;
  for (; ; ) {
    Gu2 = Cu2.length;
    if (Du2 >= Gu2 - 1) {
      break;
    }
    Gu2 = Cu2[Du2];
    Gu2 = Gu2.length;
    if (!(0 === Gu2)) {
      if (Cu2[Du2][0]) {
      }
    }
    Gu2 = Cu2[Du2];
    Gu2 = Gu2.length;
    Gu2 = 0 === Gu2 ? "none " : Cu2[Du2][0] ? "dashed " : "solid ";
    Eu2 = Eu2 + Gu2;
    Du2 = Du2 + 1;
  }
  Cu2 = new RegExp("[sd]", lh);
  !Cu2.test(Eu2) || Bu2.setAttribute("rowlines", Eu2.trim());
  Fu2 !== lh && (Cu2 = [], Cu2.push(Bu2), Bu2 = new b.MathNode(nu, Cu2), Bu2.setAttribute(ni, Fu2.trim()));
  Au2.arraystretch ? (Au2 = Au2.arraystretch, Au2 = Au2 < 1) : Au2 = false;
  Au2 && (Au2 = [], Au2.push(Bu2), Bu2 = new b.MathNode(Zj, Au2), Bu2.setAttribute(Ok, mr));
  return Bu2;
};
var Xu = (Cu2, Du2) => {
  var Eu2 = Cu2.envName.indexOf("ed");
  var Fu2 = 0;
  Eu2 === Fu2 - 1 && ta(Cu2);
  var Iu2 = [];
  Eu2 = Cu2.envName.indexOf("at");
  Fu2 = 0;
  var Hu2 = Eu2 > Fu2 - 1 ? Sm : ph, Gu2, Ju2;
  Eu2 = Cu2.envName;
  Fu2 = Eu2 === Hk;
  Eu2 = {};
  Object.assign(Eu2, { cols: Iu2, addJot: true });
  Gu2 = Fu2 ? void 0 : Va(Cu2.envName);
  Object.assign(Eu2, { autoTag: Gu2, emptySingleRow: true, colSeparationType: Hu2 });
  Fu2 = Fu2 ? 2 : void 0;
  Eu2.maxNumCols = Fu2;
  Fu2 = Cu2.parser;
  Eu2.leqno = Fu2.settings.leqno;
  Fu2 = Q(Cu2.parser, Eu2, Tg);
  var Bu2;
  var Au2 = 0;
  Eu2 = {};
  Object.assign(Eu2, { type: Xf, mode: Cu2.mode, body: [] });
  Du2[0] ? (Cu2 = Du2[0], Cu2 = Cu2.type, Cu2 = Cu2 === Xf) : Cu2 = false;
  if (Cu2) {
    Gu2 = lh;
    Cu2 = 0;
    for (; ; ) {
      Hu2 = Du2[0];
      Hu2 = Hu2.body;
      if (Cu2 >= Hu2.length) {
        break;
      }
      Hu2 = j;
      Ju2 = Du2[0];
      Gu2 = Gu2 + Hu2(Ju2.body[Cu2], bg).text;
      Cu2 = Cu2 + 1;
    }
    Bu2 = +Gu2;
    Cu2 = +Bu2;
    Au2 = Cu2 * 2;
  }
  Gu2 = !Au2;
  Cu2 = Fu2.body;
  Cu2.forEach((mv) => {
    var Fu3 = 1, qv, ov, pv, nv;
    while (Fu3 < mv.length) {
      qv = j;
      qv = qv(j(mv[Fu3], Sh).body[0], Xf).body;
      qv.unshift(Eu2);
      Fu3 = Fu3 + 2;
    }
    if (!Gu2) {
      ov = mv.length;
      ov = ov / 2;
      if (Bu2 < ov) {
        pv = c;
        throw new pv("Too many math in a row: expected " + Bu2 + ss + ov, mv[0]);
      }
    } else {
      nv = Au2;
      nv < mv.length && (Au2 = mv.length);
    }
  });
  Cu2 = 0;
  while (Cu2 < Au2) {
    1 === Cu2 % 2 ? (Ju2 = "l", Hu2 = 0) : (Hu2 = Cu2 > 0 && Gu2 ? 1 : 0, Ju2 = "r");
    Du2 = {};
    Object.assign(Du2, { type: ph, align: Ju2, pregap: Hu2, postgap: 0 });
    Iu2[Cu2] = Du2;
    Cu2 = Cu2 + 1;
  }
  Cu2 = Gu2 ? ph : Sm;
  Fu2.colSeparationType = Cu2;
  return Fu2;
};
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push(Ir);
Hu.push("darray");
Cu.names = Hu;
Hu = {};
Hu.numArgs = 1;
Object.assign(Cu, { props: Hu, handler: function(Bu2, Cu2) {
  if (oa(Cu2[0])) {
    var Au2 = [];
    Au2.push(Cu2[0]);
  } else {
    Au2 = j(Cu2[0], Xf).body;
  }
  Cu2 = Au2.map((Au3) => {
    var Bu3 = Ma(Au3).text;
    var Cu3 = "lcr".indexOf(Bu3);
    var Du3 = 0;
    if (Cu3 !== Du3 - 1) {
      Au3 = {};
      Object.assign(Au3, { type: ph, align: Bu3 });
      return Au3;
    } else {
      var Nu2 = void 0;
      if (Bu3 === tm) {
        Au3 = {};
        Object.assign(Au3, { type: Jg, separator: tm });
        return Au3;
      } else {
        if (Bu3 === op) {
          Au3 = {};
          Object.assign(Au3, { type: Jg, separator: op });
          return Au3;
        }
      }
    }
    throw new c(sm + Bu3, Au3);
  });
  Au2 = {};
  Object.assign(Au2, { cols: Cu2, hskipBeforeAndAfter: true, maxNumCols: Cu2.length });
  Cu2 = Q;
  var Du2 = Bu2.parser;
  return Cu2(Du2, Au2, Wa(Bu2.envName));
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Hu = {};
Hu.type = Ir;
Cu = [];
Cu.push("matrix");
Cu.push("pmatrix");
Cu.push("bmatrix");
Cu.push("Bmatrix");
Cu.push("vmatrix");
Cu.push("Vmatrix");
Cu.push("matrix*");
Cu.push("pmatrix*");
Cu.push("bmatrix*");
Cu.push("Bmatrix*");
Cu.push("vmatrix*");
Cu.push("Vmatrix*");
Hu.names = Cu;
Cu = {};
Cu.numArgs = 0;
Object.assign(Hu, { props: Cu, handler: function(Bu2) {
  var Au2 = {};
  Au2.matrix = null;
  var Cu2 = [];
  Cu2.push("(");
  Cu2.push(kr);
  Au2.pmatrix = Cu2;
  Cu2 = [];
  Cu2.push(pp);
  Cu2.push(Km);
  Au2.bmatrix = Cu2;
  Cu2 = [];
  Cu2.push(On);
  Cu2.push(Pn);
  Au2.Bmatrix = Cu2;
  Cu2 = [];
  Cu2.push(tm);
  Cu2.push(tm);
  Au2.vmatrix = Cu2;
  Cu2 = [];
  Cu2.push($l);
  Cu2.push($l);
  Au2.Vmatrix = Cu2;
  var Eu2 = Au2[Bu2.envName.replace(lr, lh)];
  var Du2 = {};
  Du2.hskipBeforeAndAfter = false;
  Cu2 = [];
  Au2 = {};
  Object.assign(Au2, { type: ph, align: dt });
  Cu2.push(Au2);
  Du2.cols = Cu2;
  Au2 = Bu2.envName;
  Cu2 = Bu2.envName;
  Cu2 = Cu2.length;
  if (Au2.charAt(Cu2 - 1) === lr) {
    Au2 = Bu2.parser;
    Au2.consumeSpaces();
    Cu2 = Au2.fetch().text;
    if (Cu2 === pp) {
      Au2.consume();
      Au2.consumeSpaces();
      Cu2 = Au2.fetch().text;
      var Fu2 = "lcr".indexOf(Cu2);
      var Gu2 = 0;
      if (Fu2 === Gu2 - 1) throw new c("Expected l or c or r", Au2.nextToken);
      Au2.consume();
      Au2.consumeSpaces();
      Au2.expect(Km);
      Au2.consume();
      Fu2 = [];
      Au2 = {};
      Object.assign(Au2, { type: ph, align: Cu2 });
      Fu2.push(Au2);
      Du2.cols = Fu2;
    } else {
      Cu2 = dt;
    }
  } else {
    Cu2 = dt;
  }
  Au2 = Q;
  Fu2 = Bu2.parser;
  Du2 = Au2(Fu2, Du2, Wa(Bu2.envName));
  Fu2 = Id(Du2.body.map((Au3) => Au3.length));
  Au2 = {};
  Object.assign(Au2, { type: ph, align: Cu2 });
  Cu2 = new Array(Fu2);
  Du2.cols = Cu2.fill(Au2);
  !Eu2 || (Au2 = {}, Object.assign(Au2, { type: Pl, mode: Bu2.mode }), Bu2 = [], Bu2.push(Du2), Object.assign(Au2, { body: Bu2, left: Eu2[0], right: Eu2[1], rightColor: void 0 }), Du2 = Au2);
  return Du2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Hu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push("smallmatrix");
Cu.names = Hu;
Hu = {};
Hu.numArgs = 0;
Object.assign(Cu, { props: Hu, handler: function(Bu2) {
  let Au2 = {};
  Au2.arraystretch = 0.5;
  Au2 = Q(Bu2.parser, Au2, Gi);
  Au2.colSeparationType = Vj;
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push("subarray");
Cu.names = Hu;
Hu = {};
Hu.numArgs = 1;
Object.assign(Cu, { props: Hu, handler: function(Bu2, Cu2) {
  if (oa(Cu2[0])) {
    var Au2 = [];
    Au2.push(Cu2[0]);
  } else {
    Au2 = j(Cu2[0], Xf).body;
  }
  Cu2 = Au2.map((Au3) => {
    var Bu3 = Ma(Au3).text;
    var Cu3 = "lc".indexOf(Bu3);
    var Du2 = 0;
    if (Cu3 !== Du2 - 1) {
      Au3 = {};
      Object.assign(Au3, { type: ph, align: Bu3 });
      return Au3;
    }
    throw new c(sm + Bu3, Au3);
  });
  Au2 = Cu2.length;
  if (Au2 > 1) throw new c(Ak);
  Au2 = {};
  Object.assign(Au2, { cols: Cu2, hskipBeforeAndAfter: false, arraystretch: 0.5 });
  Au2 = Q(Bu2.parser, Au2, Gi);
  Bu2 = Au2.body;
  Bu2 = Bu2.length;
  Bu2 > 0 ? (Bu2 = Au2.body[0], Bu2 = Bu2.length, Bu2 = Bu2 > 1) : Bu2 = false;
  if (Bu2) throw new c(Ak);
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push("cases");
Hu.push("dcases");
Hu.push("rcases");
Hu.push("drcases");
Cu.names = Hu;
Hu = {};
Hu.numArgs = 0;
Object.assign(Cu, { props: Hu, handler: function(Bu2) {
  var Cu2 = {};
  Cu2.arraystretch = 1.2;
  var Du2 = [];
  var Au2 = {};
  Object.assign(Au2, { type: ph, align: "l", pregap: 0, postgap: 1 });
  Du2.push(Au2);
  Au2 = {};
  Object.assign(Au2, { type: ph, align: "l", pregap: 0, postgap: 0 });
  Du2.push(Au2);
  Cu2.cols = Du2;
  Au2 = Q;
  Du2 = Bu2.parser;
  Du2 = Au2(Du2, Cu2, Wa(Bu2.envName));
  Au2 = {};
  Object.assign(Au2, { type: Pl, mode: Bu2.mode });
  Cu2 = [];
  Cu2.push(Du2);
  Au2.body = Cu2;
  Cu2 = Bu2.envName.indexOf("r");
  Cu2 = Cu2 > 0 - 1 ? Bk : On;
  Au2.left = Cu2;
  Bu2 = Bu2.envName.indexOf("r");
  Cu2 = 0;
  Bu2 = Bu2 > Cu2 - 1 ? Pn : Bk;
  Object.assign(Au2, { right: Bu2, rightColor: void 0 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push(ph);
Hu.push("align*");
Hu.push("aligned");
Hu.push(Hk);
Cu.names = Hu;
Hu = {};
Hu.numArgs = 0;
Object.assign(Cu, { props: Hu, handler: Xu, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push("gathered");
Hu.push(zn);
Hu.push("gather*");
Cu.names = Hu;
Hu = {};
Hu.numArgs = 0;
Object.assign(Cu, { props: Hu, handler: function(Bu2) {
  var Au2 = [];
  Au2.push(zn);
  Au2.push("gather*");
  !i.contains(Au2, Bu2.envName) || ta(Bu2);
  Au2 = {};
  var Du2 = [];
  var Cu2 = {};
  Object.assign(Cu2, { type: ph, align: dt });
  Du2.push(Cu2);
  Object.assign(Au2, { cols: Du2, addJot: true, colSeparationType: zn, autoTag: Va(Bu2.envName), emptySingleRow: true });
  Cu2 = Bu2.parser;
  Au2.leqno = Cu2.settings.leqno;
  return Q(Bu2.parser, Au2, Tg);
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push(Sm);
Hu.push("alignat*");
Hu.push("alignedat");
Cu.names = Hu;
Hu = {};
Hu.numArgs = 1;
Object.assign(Cu, { props: Hu, handler: Xu, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push("equation");
Hu.push("equation*");
Cu.names = Hu;
Hu = {};
Hu.numArgs = 0;
Object.assign(Cu, { props: Hu, handler: function(Bu2) {
  ta(Bu2);
  let Au2 = {};
  Object.assign(Au2, { autoTag: Va(Bu2.envName), emptySingleRow: true, singleRow: true, maxNumCols: 1 });
  let Cu2 = Bu2.parser;
  Au2.leqno = Cu2.settings.leqno;
  return Q(Bu2.parser, Au2, Tg);
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = {};
Cu.type = Ir;
Hu = [];
Hu.push(Qt);
Cu.names = Hu;
Hu = {};
Hu.numArgs = 0;
Object.assign(Cu, { props: Hu, handler: function(Bu2) {
  ta(Bu2);
  return dd(Bu2.parser);
}, htmlBuilder: Eu, mathmlBuilder: Fu });
Du(Cu);
Cu = "\\nonumber";
Au(Cu, "\\gdef\\@eqnsw{0}");
Au("\\notag", Cu);
Cu = {};
Cu.type = yf;
Du = [];
Du.push("\\hline");
Du.push(bn);
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu, allowedInMath: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  let Au2 = c;
  throw new Au2(Bu2.funcName + " valid only within array environment");
} });
e(Cu);
var Mb = void 0;
Mb = Jb;
Cu = {};
Cu.type = hn;
Du = [];
Du.push("\\begin");
Du.push(Pm);
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Eu = [];
Eu.push(yf);
Du.argTypes = Eu;
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  var Du2 = Bu2.parser;
  var Eu2 = Bu2.funcName;
  Bu2 = Cu2[0];
  var Au2 = Bu2.type;
  if (Au2 !== Xf) throw new c("Invalid environment name", Bu2);
  Au2 = lh;
  Cu2 = 0;
  for (; ; ) {
    var Fu2 = Bu2.body;
    if (Cu2 >= Fu2.length) {
      break;
    }
    Fu2 = j;
    Au2 = Au2 + Fu2(Bu2.body[Cu2], bg).text;
    Cu2 = Cu2 + 1;
  }
  if ("\\begin" === Eu2) {
    if (!l(Mb, Au2)) throw new c("No such environment: " + Au2, Bu2);
    Cu2 = Mb[Au2];
    Bu2 = Du2.parseArguments("\\begin{" + Au2 + oo, Cu2);
    Eu2 = Bu2.args;
    Fu2 = Bu2.optArgs;
    Bu2 = {};
    Object.assign(Bu2, { mode: Du2.mode, envName: Au2, parser: Du2 });
    Cu2 = Cu2.handler(Bu2, Eu2, Fu2);
    Du2.expect(Pm, false);
    Eu2 = Du2.nextToken;
    Bu2 = j(Du2.parseFunction(), hn);
    if (Bu2.name !== Au2) {
      Cu2 = c;
      Au2 = "Mismatch: \\begin{" + Au2 + "} matched by \\end{";
      throw new Cu2(Au2 + Bu2.name + "" + oo, Eu2);
    }
    return Cu2;
  }
  Cu2 = {};
  Object.assign(Cu2, { type: hn, mode: Du2.mode, name: Au2, nameGroup: Bu2 });
  return Cu2;
} });
e(Cu);
var Nb = void 0;
Eu = (Au2, Bu2) => {
  let Cu2 = Au2.font;
  Bu2 = Bu2.withFont(Cu2);
  return h2.buildGroup(Au2.body, Bu2);
};
Fu = (Au2, Bu2) => {
  let Cu2 = Au2.font;
  Bu2 = Bu2.withFont(Cu2);
  return f.buildGroup(Au2.body, Bu2);
};
Cu = {};
Hu = "\\mathbb";
Cu["\\Bbb"] = Hu;
Xu = "\\mathbf";
Cu["\\bold"] = Xu;
var Yu = "\\mathfrak";
Cu["\\frak"] = Yu;
var Zu = "\\boldsymbol";
Cu["\\bm"] = Zu;
Nb = Cu;
Du = {};
Du.type = Gg;
Cu = [];
Cu.push("\\mathrm");
Cu.push("\\mathit");
Cu.push(Xu);
Cu.push("\\mathnormal");
Cu.push("\\mathsfit");
Cu.push(Hu);
Cu.push("\\mathcal");
Cu.push(Yu);
Cu.push("\\mathscr");
Cu.push("\\mathsf");
Cu.push("\\mathtt");
Cu.push("\\Bbb");
Cu.push("\\bold");
Cu.push("\\frak");
Du.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 1, allowedInArgument: Bu });
Object.assign(Du, { props: Cu, handler: (Au2, Bu2) => {
  var Cu2 = Au2.parser;
  Au2 = Au2.funcName;
  var Du2 = ka(Bu2[0]);
  Au2 in Nb && (Au2 = Nb[Au2]);
  Bu2 = {};
  Object.assign(Bu2, { type: Gg, mode: Cu2.mode, font: Au2.slice(1), body: Du2 });
  return Bu2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Du);
Cu = {};
Cu.type = Dg;
Du = [];
Du.push(Zu);
Du.push("\\bm");
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Du2 = Au2.parser, Cu2 = Bu2[0], Fu2 = i.isCharacterBox(Cu2);
  Au2 = {};
  Object.assign(Au2, { type: Dg, mode: Du2.mode, mclass: qa(Cu2) });
  let Eu2 = [];
  Bu2 = {};
  Object.assign(Bu2, { type: Gg, mode: Du2.mode, font: Ri, body: Cu2 });
  Eu2.push(Bu2);
  Object.assign(Au2, { body: Eu2, isCharacterBox: Fu2 });
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = Gg;
Du = [];
Du.push("\\rm");
Du.push("\\sf");
Du.push("\\tt");
Du.push("\\bf");
Du.push("\\it");
Du.push("\\cal");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Bu2 = Au2.funcName;
  Au2 = Au2.breakOnTokenText;
  let Du2 = Cu2.mode, Eu2 = Cu2.parseExpression(true, Au2);
  Bu2 = tg + Bu2.slice(1);
  Au2 = {};
  Object.assign(Au2, { type: Gg, mode: Du2, font: Bu2 });
  Bu2 = {};
  Object.assign(Bu2, { type: Xf, mode: Cu2.mode, body: Eu2 });
  Au2.body = Bu2;
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Cu);
var Ob = void 0;
var Pb = void 0;
var Qb = void 0;
Ob = (Au2, Bu2) => {
  if (Au2 === Tg) {
    Au2 = Bu2.id;
    Bu2 = Au2 >= g.SCRIPT.id ? Bu2.text() : g.DISPLAY;
  } else {
    if (Au2 === yf) {
      var Cu2 = Bu2.size;
      Cu2 = Cu2 === g.DISPLAY.size;
    } else {
      Cu2 = false;
    }
    Cu2 ? Bu2 = g.TEXT : Au2 === Gi ? Bu2 = g.SCRIPT : Au2 === ej && (Bu2 = g.SCRIPTSCRIPT);
  }
  return Bu2;
};
Fu = (Au2, Bu2) => {
  var Gu2 = Ob(Au2.size, Bu2.style);
  var Cu2 = Gu2.fracNum();
  var Eu2 = Gu2.fracDen();
  Cu2 = Bu2.havingStyle(Cu2);
  var Fu2 = h2.buildGroup(Au2.numer, Cu2, Bu2);
  if (Au2.continued) {
    var ix = void 0;
    Cu2 = 8.5;
    Cu2 = Cu2 / +Bu2.fontMetrics().ptPerEm;
    var Du2 = 3.5;
    Du2 = Du2 / +Bu2.fontMetrics().ptPerEm;
    Fu2.height < Cu2 || (Cu2 = Fu2.height);
    Fu2.height = Cu2;
    Fu2.depth < Du2 || (Du2 = Fu2.depth);
    Fu2.depth = Du2;
  }
  Cu2 = Bu2.havingStyle(Eu2);
  var Ju2 = h2.buildGroup(Au2.denom, Cu2, Bu2);
  if (Au2.hasBarLine) {
    var Iu2 = Au2.barSize ? a.makeLineSpan(zt, Bu2, r(Au2.barSize, Bu2)) : a.makeLineSpan(zt, Bu2);
    var Hu2 = Iu2.height;
    Cu2 = Iu2.height;
  } else {
    Cu2 = Bu2.fontMetrics().defaultRuleThickness;
    Iu2 = null;
    Hu2 = 0;
  }
  Du2 = Gu2.size;
  Du2 === g.DISPLAY.size ? Du2 = true : (Du2 = Au2.size, Du2 = Du2 === Tg);
  Du2 ? (Du2 = Bu2.fontMetrics().num1, Cu2 = Hu2 > 0 ? 3 * +Cu2 : 7 * +Cu2, Eu2 = Bu2.fontMetrics().denom1) : (Hu2 > 0 ? Du2 = Bu2.fontMetrics().num2 : (Du2 = Bu2.fontMetrics().num3, Cu2 = 3 * +Cu2), Eu2 = Bu2.fontMetrics().denom2);
  if (!Iu2) {
    Hu2 = +Du2;
    Hu2 = +(Hu2 - +Fu2.depth);
    Hu2 = Hu2 - +(+Ju2.height - +Eu2);
    Hu2 < Cu2 && (Iu2 = 0.5, Du2 = Du2 + Iu2 * +(+Cu2 - +Hu2), Iu2 = 0.5, Eu2 = Eu2 + Iu2 * +(+Cu2 - +Hu2));
    Hu2 = {};
    Hu2.positionType = kg;
    Iu2 = [];
    Cu2 = {};
    Object.assign(Cu2, { type: Yf, elem: Ju2, shift: Eu2 });
    Iu2.push(Cu2);
    Cu2 = {};
    Object.assign(Cu2, { type: Yf, elem: Fu2, shift: 0 - +Du2 });
    Iu2.push(Cu2);
    Hu2.children = Iu2;
    Cu2 = a.makeVList(Hu2, Bu2);
  } else {
    var Ku2 = Bu2.fontMetrics().axisHeight;
    var Lu2 = +Du2;
    Lu2 = +(Lu2 - +Fu2.depth);
    if (Lu2 - +(Ku2 + 0.5 * +Hu2) < Cu2) {
      Lu2 = +Cu2;
      var Mu2 = +Du2;
      Mu2 = +(Mu2 - +Fu2.depth);
      Du2 = Du2 + (Lu2 - +(Mu2 - +(Ku2 + 0.5 * +Hu2)));
    }
    Lu2 = +Ku2;
    Lu2 = +(Lu2 - +(0.5 * +Hu2));
    Lu2 - +(+Ju2.height - +Eu2) < Cu2 && (Cu2 = +Cu2, Lu2 = +Ku2, Lu2 = +(Lu2 - +(0.5 * +Hu2)), Eu2 = Eu2 + (Cu2 - +(Lu2 - +(+Ju2.height - +Eu2))));
    Cu2 = 0;
    Ku2 = +Ku2;
    Lu2 = Cu2 - +(Ku2 - +(0.5 * +Hu2));
    Ku2 = {};
    Ku2.positionType = kg;
    Cu2 = [];
    Hu2 = {};
    Object.assign(Hu2, { type: Yf, elem: Ju2, shift: Eu2 });
    Cu2.push(Hu2);
    Eu2 = {};
    Object.assign(Eu2, { type: Yf, elem: Iu2, shift: Lu2 });
    Cu2.push(Eu2);
    Eu2 = {};
    Object.assign(Eu2, { type: Yf, elem: Fu2, shift: 0 - +Du2 });
    Cu2.push(Eu2);
    Ku2.children = Cu2;
    Cu2 = a.makeVList(Ku2, Bu2);
  }
  Fu2 = Bu2.havingStyle(Gu2);
  Du2 = +Cu2.height;
  Eu2 = +Fu2.sizeMultiplier;
  Cu2.height = Du2 * +(Eu2 / +Bu2.sizeMultiplier);
  Du2 = +Cu2.depth;
  Eu2 = +Fu2.sizeMultiplier;
  Cu2.depth = Du2 * +(Eu2 / +Bu2.sizeMultiplier);
  Du2 = Gu2.size;
  Du2 === g.DISPLAY.size ? Eu2 = Bu2.fontMetrics().delim1 : (Du2 = Gu2.size, Eu2 = Du2 === g.SCRIPTSCRIPT.size ? Bu2.havingStyle(g.SCRIPT).fontMetrics().delim2 : Bu2.fontMetrics().delim2);
  Au2.leftDelim == null ? (Du2 = [], Du2.push(Uj), Hu2 = h2.makeNullDelimiter(Bu2, Du2)) : (Hu2 = [], Hu2.push(Uj), Du2 = [], Du2.push(Au2.leftDelim), Du2.push(Eu2), Du2.push(true), Du2.push(Bu2.havingStyle(Gu2)), Du2.push(Au2.mode), Du2.push(Hu2), Hu2 = y.customSizedDelim.apply(y, Du2));
  Au2.continued ? Au2 = a.makeSpan([]) : Au2.rightDelim == null ? (Au2 = [], Au2.push(mj), Au2 = h2.makeNullDelimiter(Bu2, Au2)) : (Iu2 = [], Iu2.push(mj), Du2 = [], Du2.push(Au2.rightDelim), Du2.push(Eu2), Du2.push(true), Du2.push(Bu2.havingStyle(Gu2)), Du2.push(Au2.mode), Du2.push(Iu2), Au2 = y.customSizedDelim.apply(y, Du2));
  Eu2 = [];
  Eu2.push(wg);
  Du2 = [];
  Du2.push(Hu2);
  Gu2 = [];
  Gu2.push("mfrac");
  Hu2 = [];
  Hu2.push(Cu2);
  Du2.push(a.makeSpan(Gu2, Hu2));
  Du2.push(Au2);
  Au2 = a;
  return Au2.makeSpan(Eu2.concat(Fu2.sizingClasses(Bu2)), Du2, Bu2);
};
Hu = (Au2, Bu2) => {
  var Cu2 = [];
  Cu2.push(f.buildGroup(Au2.numer, Bu2));
  Cu2.push(f.buildGroup(Au2.denom, Bu2));
  Cu2 = new b.MathNode("mfrac", Cu2);
  !Au2.hasBarLine ? Cu2.setAttribute(Xq, Nn) : !Au2.barSize || Cu2.setAttribute(Xq, d(r(Au2.barSize, Bu2)));
  var Du2 = Ob(Au2.size, Bu2.style);
  var Eu2 = Du2.size;
  if (Eu2 !== Bu2.style.size) {
    var Cv = void 0;
    Bu2 = [];
    Bu2.push(Cu2);
    Cu2 = new b.MathNode(Zj, Bu2);
    Bu2 = Du2.size;
    Bu2 = Bu2 === g.DISPLAY.size ? Dh : Gl;
    Cu2.setAttribute(xm, Bu2);
    Cu2.setAttribute(Ok, bt);
  }
  if (!(Au2.leftDelim == null) || !(Au2.rightDelim == null)) {
    Bu2 = [];
    Au2.leftDelim == null || (Du2 = [], Eu2 = b.TextNode, Du2.push(new Eu2(Au2.leftDelim.replace(Lm, lh))), Du2 = new b.MathNode(ki, Du2), Du2.setAttribute(Ek, Dh), Bu2.push(Du2));
    Bu2.push(Cu2);
    Au2.rightDelim == null || (Cu2 = [], Du2 = b.TextNode, Cu2.push(new Du2(Au2.rightDelim.replace(Lm, lh))), Au2 = new b.MathNode(ki, Cu2), Au2.setAttribute(Ek, Dh), Bu2.push(Au2));
    return f.makeRow(Bu2);
  }
  return Cu2;
};
Du = {};
Du.type = ql;
Cu = [];
Cu.push(vp);
Cu.push(yq);
Cu.push(Dp);
Cu.push(wo);
Cu.push(tp);
Cu.push(Io);
Cu.push(um);
Cu.push(dm);
Cu.push(em);
Du.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 2, allowedInArgument: Bu });
Object.assign(Du, { props: Cu, handler: (Au2, Bu2) => {
  var Fu2 = Au2.parser;
  Au2 = Au2.funcName;
  var Gu2 = Bu2[0];
  var Hu2 = Bu2[1];
  var Cu2 = null;
  if (Au2 === vp || Au2 === yq || Au2 === Dp) {
    var Bu2 = true, Du2 = Cu2, Eu2;
  } else {
    if (Au2 === um) {
      Bu2 = false;
      Du2 = Cu2;
    } else {
      if (Au2 === wo || Au2 === tp || Au2 === Io) {
        Bu2 = false;
        Cu2 = "(";
        Du2 = kr;
      } else {
        if (Au2 === dm) {
          Bu2 = false;
          Cu2 = On;
          Du2 = Pn;
        } else {
          if (!(Au2 === em)) throw t("Unrecognized genfrac command");
          Bu2 = false;
          Cu2 = pp;
          Du2 = Km;
        }
      }
    }
  }
  Eu2 = Au2 === vp || Au2 === wo ? Tg : Au2 === Dp || Au2 === Io ? yf : jt;
  Au2 = {};
  Object.assign(Au2, { type: ql, mode: Fu2.mode, continued: false, numer: Gu2, denom: Hu2, hasBarLine: Bu2, leftDelim: Cu2, rightDelim: Du2, size: Eu2, barSize: null });
  return Au2;
}, htmlBuilder: Fu, mathmlBuilder: Hu });
e(Du);
Cu = {};
Cu.type = ql;
Du = [];
Du.push("\\cfrac");
Cu.names = Du;
Du = {};
Du.numArgs = 2;
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Au2.funcName;
  let Du2 = Bu2[0];
  Bu2 = Bu2[1];
  Au2 = {};
  Object.assign(Au2, { type: ql, mode: Cu2.mode, continued: true, numer: Du2, denom: Bu2, hasBarLine: true });
  Bu2 = null;
  Object.assign(Au2, { leftDelim: Bu2, rightDelim: Bu2, size: Tg, barSize: Bu2 });
  return Au2;
} });
e(Cu);
Du = {};
Du.type = Fk;
Cu = [];
Cu.push("\\over");
Cu.push($t);
Cu.push("\\atop");
Cu.push("\\brace");
Cu.push("\\brack");
Du.names = Cu;
Cu = {};
Object.assign(Cu, { numArgs: 0, infix: Bu });
Object.assign(Du, { props: Cu, handler: function(Bu2) {
  var Cu2 = Bu2.parser;
  var Au2 = Bu2.funcName;
  var Du2 = Bu2.token;
  if ("\\over" === Au2) {
    Bu2 = yq;
  } else {
    if (Au2 === $t) {
      Bu2 = tp;
    } else {
      if ("\\atop" === Au2) {
        Bu2 = um;
      } else {
        if ("\\brace" === Au2) {
          Bu2 = dm;
        } else {
          if (!("\\brack" === Au2)) throw t("Unrecognized infix genfrac command");
          Bu2 = em;
        }
      }
    }
  }
  Au2 = {};
  Object.assign(Au2, { type: Fk, mode: Cu2.mode, replaceWith: Bu2, token: Du2 });
  return Au2;
} });
e(Du);
Cu = [];
Cu.push(Tg);
Cu.push(yf);
Cu.push(Gi);
Cu.push(ej);
Pb = Cu;
Qb = (Au2) => {
  var Bu2 = null;
  var Cu2 = Au2.length;
  Cu2 > 0 && (Au2 === Bk && (Au2 = null), Bu2 = Au2);
  return Bu2;
};
Cu = {};
Cu.type = ql;
Du = [];
Du.push("\\genfrac");
Cu.names = Du;
Eu = {};
Object.assign(Eu, { numArgs: 6, allowedInArgument: Bu });
Du = [];
Du.push(tg);
Du.push(tg);
Du.push(Of);
Du.push(yf);
Du.push(tg);
Du.push(tg);
Eu.argTypes = Du;
Object.assign(Cu, { props: Eu, handler: function(Bu2, Cu2) {
  var Gu2 = Bu2.parser;
  var Hu2 = Cu2[4];
  var Iu2 = Cu2[5];
  var Au2 = ka(Cu2[0]);
  Bu2 = Au2.type;
  Bu2 === gj ? (Bu2 = Au2.family, Bu2 = Bu2 === hq) : Bu2 = false;
  var Du2 = Bu2 ? Qb(Au2.text) : null;
  Au2 = ka(Cu2[1]);
  Bu2 = Au2.type;
  Bu2 === gj ? (Bu2 = Au2.family, Bu2 = Bu2 === Jr) : Bu2 = false;
  var Eu2 = Bu2 ? Qb(Au2.text) : null;
  Au2 = j(Cu2[2], Of);
  Bu2 = null;
  if (Au2.isBlank) {
    var Fu2 = true, Ju2;
  } else {
    Bu2 = Au2.value;
    Au2 = Bu2.number;
    Fu2 = Au2 > 0;
  }
  Au2 = Cu2[3];
  Cu2 = Au2.type;
  Cu2 === Xf ? (Cu2 = Au2.body, Cu2 = Cu2.length, Cu2 > 0 ? (Cu2 = j, Ju2 = Pb, Cu2 = Ju2[+Cu2(Au2.body[0], bg).text]) : Cu2 = jt) : (Cu2 = Pb, Cu2 = Cu2[+j(Au2, bg).text]);
  Au2 = {};
  Object.assign(Au2, { type: ql, mode: Gu2.mode, numer: Hu2, denom: Iu2, continued: false, hasBarLine: Fu2, barSize: Bu2, leftDelim: Du2, rightDelim: Eu2, size: Cu2 });
  return Au2;
}, htmlBuilder: Fu, mathmlBuilder: Hu });
e(Cu);
Cu = {};
Cu.type = Fk;
Du = [];
Du.push("\\above");
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Eu = [];
Eu.push(Of);
Object.assign(Du, { argTypes: Eu, infix: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  let Du2 = Bu2.parser;
  Bu2.funcName;
  Bu2 = Bu2.token;
  let Au2 = {};
  Object.assign(Au2, { type: Fk, mode: Du2.mode, replaceWith: cm, size: j(Cu2[0], Of).value, token: Bu2 });
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = ql;
Du = [];
Du.push(cm);
Cu.names = Du;
Eu = {};
Eu.numArgs = 3;
Du = [];
Du.push(tg);
Du.push(Of);
Du.push(tg);
Eu.argTypes = Du;
Object.assign(Cu, { props: Eu, handler: (Au2, Bu2) => {
  let Du2 = Au2.parser;
  Au2.funcName;
  let Eu2 = Bu2[0];
  Au2 = hc;
  let Cu2 = Au2(j(Bu2[1], Fk).size);
  Bu2 = Bu2[2];
  let Fu2 = Cu2.number > 0;
  Au2 = {};
  Object.assign(Au2, { type: ql, mode: Du2.mode, numer: Eu2, denom: Bu2, continued: false, hasBarLine: Fu2, barSize: Cu2 });
  Bu2 = null;
  Object.assign(Au2, { leftDelim: Bu2, rightDelim: Bu2, size: jt });
  return Au2;
}, htmlBuilder: Fu, mathmlBuilder: Hu });
e(Cu);
Eu = (Au2, Bu2) => {
  var Du2 = Bu2.style;
  var Cu2 = void 0;
  var Eu2 = Au2.type;
  Eu2 === _j ? (Au2.sup ? (Cu2 = h2, Eu2 = Au2.sup, Cu2 = Cu2.buildGroup(Eu2, Bu2.havingStyle(Du2.sup()), Bu2)) : (Cu2 = h2, Eu2 = Au2.sub, Cu2 = Cu2.buildGroup(Eu2, Bu2.havingStyle(Du2.sub()), Bu2)), Du2 = j(Au2.base, Ti)) : Du2 = j(Au2, Ti);
  Au2 = h2;
  Eu2 = Du2.base;
  var Fu2 = Au2.buildGroup(Eu2, Bu2.havingBaseStyle(g.DISPLAY));
  var Gu2 = M.svgSpan(Du2, Bu2);
  if (Du2.isOver) {
    Eu2 = {};
    Eu2.positionType = Ug;
    Au2 = [];
    var Hu2 = {};
    Object.assign(Hu2, { type: Yf, elem: Fu2 });
    Au2.push(Hu2);
    Fu2 = {};
    Object.assign(Fu2, { type: kh, size: 0.1 });
    Au2.push(Fu2);
    Fu2 = {};
    Object.assign(Fu2, { type: Yf, elem: Gu2 });
    Au2.push(Fu2);
    Eu2.children = Au2;
    Au2 = a.makeVList(Eu2, Bu2);
    Eu2 = Au2.children;
    Eu2 = Eu2[0].children[0].children[1];
    Eu2.classes.push(ti);
  } else {
    Au2 = {};
    Au2.positionType = lj;
    Eu2 = Fu2.depth;
    Eu2 = Eu2 + 0.1;
    Au2.positionData = Eu2 + Gu2.height;
    Eu2 = [];
    Hu2 = {};
    Object.assign(Hu2, { type: Yf, elem: Gu2 });
    Eu2.push(Hu2);
    Gu2 = {};
    Object.assign(Gu2, { type: kh, size: 0.1 });
    Eu2.push(Gu2);
    Gu2 = {};
    Object.assign(Gu2, { type: Yf, elem: Fu2 });
    Eu2.push(Gu2);
    Au2.children = Eu2;
    Au2 = a.makeVList(Au2, Bu2);
    Eu2 = Au2.children;
    Eu2 = Eu2[0].children[0].children[0];
    Eu2.classes.push(ti);
  }
  !Cu2 || (Eu2 = [], Eu2.push(wg), Fu2 = Du2.isOver ? Xi : Fi, Eu2.push(Fu2), Fu2 = [], Fu2.push(Au2), Fu2 = a.makeSpan(Eu2, Fu2, Bu2), Du2.isOver ? (Eu2 = {}, Eu2.positionType = Ug, Au2 = [], Gu2 = {}, Object.assign(Gu2, { type: Yf, elem: Fu2 }), Au2.push(Gu2), Fu2 = {}, Object.assign(Fu2, { type: kh, size: 0.2 }), Au2.push(Fu2), Fu2 = {}, Object.assign(Fu2, { type: Yf, elem: Cu2 }), Au2.push(Fu2), Eu2.children = Au2, Au2 = a.makeVList(Eu2, Bu2)) : (Au2 = {}, Au2.positionType = lj, Eu2 = Fu2.depth, Eu2 = Eu2 + 0.2, Eu2 = Eu2 + Cu2.height, Au2.positionData = Eu2 + Cu2.depth, Eu2 = [], Gu2 = {}, Object.assign(Gu2, { type: Yf, elem: Cu2 }), Eu2.push(Gu2), Cu2 = {}, Object.assign(Cu2, { type: kh, size: 0.2 }), Eu2.push(Cu2), Cu2 = {}, Object.assign(Cu2, { type: Yf, elem: Fu2 }), Eu2.push(Cu2), Au2.children = Eu2, Au2 = a.makeVList(Au2, Bu2)));
  Cu2 = [];
  Cu2.push(wg);
  Du2 = Du2.isOver ? Xi : Fi;
  Cu2.push(Du2);
  Du2 = [];
  Du2.push(Au2);
  return a.makeSpan(Cu2, Du2, Bu2);
};
Cu = {};
Cu.type = Ti;
Du = [];
Du.push("\\overbrace");
Du.push("\\underbrace");
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  let Du2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Au2 = {};
  Object.assign(Au2, { type: Ti, mode: Du2.mode, label: Bu2 });
  Du2 = new RegExp("^\\\\over", lh);
  Object.assign(Au2, { isOver: Du2.test(Bu2), base: Cu2[0] });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: (Au2, Bu2) => {
  var Du2 = M.mathMLnode(Au2.label);
  var Eu2 = Au2.isOver ? Xi : Fi, Cu2;
  Cu2 = [];
  Cu2.push(f.buildGroup(Au2.base, Bu2));
  Cu2.push(Du2);
  return new b.MathNode(Eu2, Cu2);
} });
e(Cu);
var pd = {};
pd.htmlBuilder = Eu;
Cu = {};
Cu.type = Dm;
Du = [];
Du.push(zq);
Cu.names = Du;
Du = {};
Du.numArgs = 2;
Eu = [];
Eu.push(Ck);
Eu.push(pu);
Object.assign(Du, { argTypes: Eu, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  var Cu2 = Au2.parser;
  var Du2 = Bu2[1];
  Bu2 = j(Bu2[0], Ck).url;
  Au2 = {};
  Object.assign(Au2, { command: zq, url: Bu2 });
  var Eu2 = Cu2.settings;
  if (!Eu2.isTrusted(Au2)) return Cu2.formatUnsupportedCmd(zq);
  Au2 = {};
  Object.assign(Au2, { type: Dm, mode: Cu2.mode, href: Bu2, body: s2(Du2) });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  let Cu2 = h2.buildExpression(Au2.body, Bu2, false);
  return a.makeAnchor(Au2.href, [], Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  Bu2 = f.buildExpressionRow(Au2.body, Bu2);
  if (!m(Bu2, x)) {
    var Cu2 = [];
    Cu2.push(Bu2);
    Bu2 = new x(Fj, Cu2);
  }
  Bu2.setAttribute(Dm, Au2.href);
  return Bu2;
} });
e(Cu);
Cu = {};
Cu.type = Dm;
Du = [];
Du.push(Fr);
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Eu = [];
Eu.push(Ck);
Object.assign(Du, { argTypes: Eu, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  var Cu2 = Au2.parser;
  var Du2 = j(Bu2[0], Ck).url;
  Au2 = {};
  Object.assign(Au2, { command: Fr, url: Du2 });
  Bu2 = Cu2.settings;
  if (!Bu2.isTrusted(Au2)) return Cu2.formatUnsupportedCmd(Fr);
  var Fu2 = [];
  Au2 = 0;
  while (Au2 < Du2.length) {
    var Eu2 = Du2[Au2];
    Eu2 === ft && (Eu2 = cl);
    Bu2 = {};
    Object.assign(Bu2, { type: bg, mode: yf, text: Eu2 });
    Fu2.push(Bu2);
    Au2 = Au2 + 1;
  }
  Au2 = {};
  Object.assign(Au2, { type: yf, mode: Cu2.mode, font: fu, body: Fu2 });
  Bu2 = {};
  Object.assign(Bu2, { type: Dm, mode: Cu2.mode, href: Du2, body: s2(Au2) });
  return Bu2;
} });
e(Cu);
Cu = {};
Cu.type = kt;
Du = [];
Du.push("\\hbox");
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Eu = [];
Eu.push(yf);
Object.assign(Du, { argTypes: Eu, allowedInText: Bu, primitive: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: kt, mode: Bu2.mode, body: s2(Cu2[0]) });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  return a.makeFragment(h2.buildExpression(Bu2.body, Cu2, false));
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = b.MathNode;
  return new Au2(Fj, f.buildExpression(Bu2.body, Cu2));
} });
e(Cu);
Cu = {};
Cu.type = El;
Du = [];
Du.push(cn);
Du.push(xo);
Du.push(dn);
Du.push(qn);
Cu.names = Du;
Du = {};
Du.numArgs = 2;
Eu = [];
Eu.push(Rn);
Eu.push(pu);
Object.assign(Du, { argTypes: Eu, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  var Du2 = Au2.parser;
  var Eu2 = Au2.funcName;
  Au2.token;
  var Cu2 = j(Bu2[0], Rn).string;
  var Gu2 = Bu2[1];
  Au2 = Du2.settings;
  !Au2.strict || Du2.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
  Bu2 = {};
  if (Eu2 === cn) {
    Bu2.class = Cu2;
    Au2 = {};
    Object.assign(Au2, { command: cn, class: Cu2 });
  } else {
    if (Eu2 === xo) {
      Bu2.id = Cu2;
      Au2 = {};
      Object.assign(Au2, { command: xo, id: Cu2 });
    } else {
      if (Eu2 === dn) {
        Bu2.style = Cu2;
        Au2 = {};
        Object.assign(Au2, { command: dn, style: Cu2 });
      } else {
        if (Eu2 === qn) {
          var Fu2 = Cu2.split(at);
          Au2 = 0;
          while (Au2 < Fu2.length) {
            Cu2 = Fu2[Au2].split("=");
            var Hu2 = Cu2.length;
            if (2 !== Hu2) throw new c("Error parsing key-value for \\htmlData");
            Hu2 = Cu2[0];
            Hu2 = "data-" + Hu2.trim();
            Bu2[Hu2] = Cu2[1].trim();
            Au2 = Au2 + 1;
          }
          Au2 = {};
          Object.assign(Au2, { command: qn, attributes: Bu2 });
        } else {
          throw t("Unrecognized html command");
        }
      }
    }
  }
  Cu2 = Du2.settings;
  if (!Cu2.isTrusted(Au2)) return Du2.formatUnsupportedCmd(Eu2);
  Au2 = {};
  Object.assign(Au2, { type: El, mode: Du2.mode, attributes: Bu2, body: s2(Gu2) });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  var Du2 = h2.buildExpression(Au2.body, Bu2, false);
  var Cu2 = [];
  Cu2.push(yt);
  var Eu2 = Au2.attributes;
  !Eu2.class || (Eu2 = Au2.attributes, Eu2 = Eu2.class, X(Cu2, Eu2.trim().split(new RegExp("\\s+", lh))));
  Du2 = a.makeSpan(Cu2, Du2, Bu2);
  Eu2 = u(Au2.attributes);
  var Gu2 = Eu2.length | 0;
  Cu2 = 0;
  while (Cu2 < Gu2) {
    Bu2 = Eu2[Cu2];
    var Fu2;
    Bu2 !== po && l(Au2.attributes, Bu2) && Du2.setAttribute(Bu2, Au2.attributes[Bu2]);
    Cu2 = Cu2 + 1;
  }
  return Du2;
}, mathmlBuilder: (Au2, Bu2) => f.buildExpressionRow(Au2.body, Bu2) });
e(Cu);
Cu = {};
Cu.type = Qs;
Du = [];
Du.push("\\html@mathml");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 2, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Au2 = {};
  Object.assign(Au2, { type: Qs, mode: Cu2.mode, html: s2(Bu2[0]), mathml: s2(Bu2[1]) });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => a.makeFragment(h2.buildExpression(Au2.html, Bu2, false)), mathmlBuilder: (Au2, Bu2) => f.buildExpressionRow(Au2.mathml, Bu2) });
e(Cu);
var Xa = void 0;
Xa = Fe;
Cu = {};
Cu.type = Sp;
Du = [];
Du.push(Rk);
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, numOptionalArgs: 1 });
Eu = [];
Eu.push(Rn);
Eu.push(Ck);
Object.assign(Du, { argTypes: Eu, allowedInText: false });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2, Cu2) => {
  var Ju2 = Au2.parser;
  var Eu2 = {};
  Object.assign(Eu2, { number: 0, unit: qr });
  Au2 = {};
  Object.assign(Au2, { number: 0.9, unit: qr });
  var Du2 = {};
  Object.assign(Du2, { number: 0, unit: qr });
  if (Cu2[0]) {
    var Ku2 = j(Cu2[0], Rn).string.split(at);
    var Cu2 = lh, Iu2 = 0, Gu2, Fu2, Hu2;
    var rv = void 0;
    while (Iu2 < Ku2.length) {
      Gu2 = Ku2[Iu2].split("=");
      Fu2 = Gu2.length;
      if (2 === Fu2) {
        Fu2 = Gu2[1];
        Fu2 = Fu2.trim();
        Hu2 = Gu2[0].trim();
        if (!(Hu2 === Mm)) {
          if (Hu2 === Zf) {
            Eu2 = Xa(Fu2);
          } else {
            if (Hu2 === Df) {
              Au2 = Xa(Fu2);
            } else {
              if (Hu2 === wi) {
                Du2 = Xa(Fu2);
              } else {
                Au2 = c;
                throw new Au2("Invalid key: '" + Gu2[0] + mn);
              }
            }
          }
          Fu2 = Cu2;
        }
      } else {
        Fu2 = Cu2;
      }
      Iu2 = Iu2 + 1;
      Cu2 = Fu2;
    }
  } else {
    Cu2 = lh;
  }
  Fu2 = j(Bu2[0], Ck).url;
  Cu2 === lh && (Bu2 = Fu2.replace(new RegExp("^.*[\\\\/]", lh), lh), Cu2 = Bu2.substring(0, Bu2.lastIndexOf(Bk)));
  Bu2 = {};
  Object.assign(Bu2, { command: Rk, url: Fu2 });
  Gu2 = Ju2.settings;
  if (!Gu2.isTrusted(Bu2)) return Ju2.formatUnsupportedCmd(Rk);
  Bu2 = {};
  Object.assign(Bu2, { type: Sp, mode: Ju2.mode, alt: Cu2, width: Eu2, height: Au2, totalheight: Du2, src: Fu2 });
  return Bu2;
}, htmlBuilder: (Au2, Bu2) => {
  var Du2 = r(Au2.height, Bu2);
  var Cu2 = Au2.totalheight;
  Cu2 = Cu2.number > 0 ? +r(Au2.totalheight, Bu2) - +Du2 : 0;
  var Eu2 = Au2.width;
  Eu2 = Eu2.number > 0 ? r(Au2.width, Bu2) : 0;
  Bu2 = {};
  Bu2.height = d(Du2 + Cu2);
  Eu2 > 0 && (Bu2.width = d(Eu2));
  Cu2 > 0 && (Eu2 = d, Bu2.verticalAlign = Eu2(0 - +Cu2));
  Au2 = new fa(Au2.src, Au2.alt, Bu2);
  Object.assign(Au2, { height: Du2, depth: Cu2 });
  return Au2;
}, mathmlBuilder: (Au2, Bu2) => {
  var Cu2 = new b.MathNode("mglyph", []);
  Cu2.setAttribute(Mm, Au2.alt);
  var Eu2 = r(Au2.height, Bu2);
  var Du2 = Au2.totalheight;
  if (Du2.number > 0) {
    Du2 = +r(Au2.totalheight, Bu2) - +Eu2;
    var Fu2 = d;
    Cu2.setAttribute("valign", Fu2(0 - +Du2));
  } else {
    Du2 = 0;
  }
  Cu2.setAttribute(Df, d(Eu2 + Du2));
  Du2 = Au2.width;
  Du2 = Du2.number;
  Du2 > 0 && Cu2.setAttribute(Zf, d(r(Au2.width, Bu2)));
  Cu2.setAttribute(Sn, Au2.src);
  return Cu2;
} });
e(Cu);
Cu = {};
Cu.type = kh;
Du = [];
Du.push("\\kern");
Du.push("\\mkern");
Du.push("\\hskip");
Du.push("\\mskip");
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Eu = [];
Eu.push(Of);
Object.assign(Du, { argTypes: Eu, primitive: Bu, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  var Au2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  Cu2 = j(Cu2[0], Of);
  var Du2 = Au2.settings;
  if (Du2.strict) {
    var _u2 = void 0;
    Du2 = Bu2[1];
    var Eu2 = Du2 === et;
    Du2 = Cu2.value;
    Du2 = Du2.unit;
    Du2 = Du2 === St;
    if (Eu2) {
      if (!Du2) {
        Du2 = Au2.settings;
        Eu2 = vo + Bu2 + " supports only mu units, ";
        var Fu2 = Cu2.value;
        Du2.reportNonstrict(Al, Eu2 + ("not " + Fu2.unit + " units"));
      }
      Du2 = Au2.mode;
      Du2 !== tg && (Du2 = Au2.settings, Du2.reportNonstrict(Al, vo + Bu2 + " works only in math mode"));
    } else {
      !Du2 || (Du2 = Au2.settings, Du2.reportNonstrict(Al, vo + Bu2 + " doesn't support mu units"));
    }
  }
  Bu2 = {};
  Object.assign(Bu2, { type: kh, mode: Au2.mode, dimension: Cu2.value });
  return Bu2;
}, htmlBuilder: function(Bu2, Cu2) {
  return a.makeGlue(Bu2.dimension, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = r(Bu2.dimension, Cu2);
  return new b.SpaceNode(Au2);
} });
e(Cu);
Cu = {};
Cu.type = "lap";
Du = [];
Du.push("\\mathllap");
Du.push("\\mathrlap");
Du.push("\\mathclap");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser, Du2 = Au2.funcName;
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: "lap", mode: Cu2.mode, alignment: Du2.slice(5), body: Bu2 });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  var Cu2 = Au2.alignment;
  if ("clap" === Cu2) {
    Cu2 = [];
    Cu2.push(h2.buildGroup(Au2.body, Bu2));
    var Eu2 = a.makeSpan([], Cu2);
    Cu2 = [];
    Cu2.push(Rm);
    var Du2 = [];
    Du2.push(Eu2);
    Cu2 = a.makeSpan(Cu2, Du2, Bu2);
  } else {
    Cu2 = [];
    Cu2.push(Rm);
    Du2 = [];
    Du2.push(h2.buildGroup(Au2.body, Bu2));
    Cu2 = a.makeSpan(Cu2, Du2);
  }
  Du2 = [];
  Du2.push("fix");
  Eu2 = a.makeSpan(Du2, []);
  Du2 = [];
  Du2.push(Au2.alignment);
  Au2 = [];
  Au2.push(Cu2);
  Au2.push(Eu2);
  Au2 = a.makeSpan(Du2, Au2, Bu2);
  Cu2 = [];
  Cu2.push("strut");
  Cu2 = a.makeSpan(Cu2);
  Du2 = Cu2.style;
  Eu2 = d;
  var Fu2 = Au2.height;
  Du2.height = Eu2(Fu2 + Au2.depth);
  !Au2.depth || (Du2 = Cu2.style, Eu2 = d, Fu2 = 0, Du2.verticalAlign = Eu2(Fu2 - +Au2.depth));
  Du2 = Au2.children;
  Du2.unshift(Cu2);
  Cu2 = [];
  Cu2.push("thinbox");
  Du2 = [];
  Du2.push(Au2);
  Du2 = a.makeSpan(Cu2, Du2, Bu2);
  Au2 = [];
  Au2.push(wg);
  Au2.push("vbox");
  Cu2 = [];
  Cu2.push(Du2);
  return a.makeSpan(Au2, Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  var Cu2 = [];
  Cu2.push(f.buildGroup(Au2.body, Bu2));
  Bu2 = new b.MathNode(Eh, Cu2);
  Cu2 = Au2.alignment;
  "rlap" !== Cu2 && (Au2 = Au2.alignment, Au2 = "llap" === Au2 ? "-1" : "-0.5", Bu2.setAttribute(Xh, Au2 + Zf));
  Bu2.setAttribute(Zf, Nn);
  return Bu2;
} });
e(Cu);
Cu = {};
Cu.type = Sh;
Du = [];
Du.push("\\(");
Du.push("$");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu, allowedInMath: false });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  Cu2 = Bu2.funcName;
  var Au2 = Bu2.parser;
  var Du2 = Au2.mode;
  Au2.switchMode(tg);
  Bu2 = "\\(" === Cu2 ? "\\)" : "$";
  Cu2 = Au2.parseExpression(false, Bu2);
  Au2.expect(Bu2);
  Au2.switchMode(Du2);
  Bu2 = {};
  Object.assign(Bu2, { type: Sh, mode: Au2.mode, style: yf, body: Cu2 });
  return Bu2;
} });
e(Cu);
Cu = {};
Cu.type = yf;
Du = [];
Du.push("\\)");
Du.push("\\]");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu, allowedInMath: false });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  let Au2 = c;
  throw new Au2("Mismatched " + Bu2.funcName);
} });
e(Cu);
var Rb = void 0;
Rb = Ge;
Cu = {};
Cu.type = Us;
Du = [];
Du.push("\\mathchoice");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 4, primitive: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Au2 = {};
  Object.assign(Au2, { type: Us, mode: Cu2.mode, display: s2(Bu2[0]), text: s2(Bu2[1]), script: s2(Bu2[2]), scriptscript: s2(Bu2[3]) });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => a.makeFragment(h2.buildExpression(Rb(Au2, Bu2), Bu2, false)), mathmlBuilder: (Au2, Bu2) => f.buildExpressionRow(Rb(Au2, Bu2), Bu2) });
e(Cu);
var Sb = void 0;
Sb = (Au2, Bu2, Cu2, Du2, Eu2, Fu2, Gu2) => {
  var Hu2 = [];
  Hu2.push(Au2);
  var Iu2 = a.makeSpan([], Hu2);
  var Ju2 = Cu2 ? i.isCharacterBox(Cu2) : Cu2;
  Au2 = void 0;
  Hu2 = void 0;
  if (Bu2) {
    Hu2 = h2;
    Bu2 = Hu2.buildGroup(Bu2, Du2.havingStyle(Eu2.sup()), Du2);
    Hu2 = {};
    Hu2.elem = Bu2;
    var Ku2 = Math;
    var Lu2 = Du2.fontMetrics().bigOpSpacing1;
    var Mu2 = +Du2.fontMetrics().bigOpSpacing3;
    Hu2.kern = Ku2.max(Lu2, Mu2 - +Bu2.depth);
  }
  !Cu2 || (Au2 = h2, Bu2 = Au2.buildGroup(Cu2, Du2.havingStyle(Eu2.sub()), Du2), Au2 = {}, Au2.elem = Bu2, Cu2 = Math, Eu2 = Du2.fontMetrics().bigOpSpacing2, Ku2 = +Du2.fontMetrics().bigOpSpacing4, Au2.kern = Cu2.max(Eu2, Ku2 - +Bu2.height));
  if (Hu2 && Au2) {
    Bu2 = Du2.fontMetrics().bigOpSpacing5;
    Cu2 = Au2.elem;
    Bu2 = Bu2 + Cu2.height;
    Cu2 = Au2.elem;
    Bu2 = Bu2 + Cu2.depth;
    Bu2 = Bu2 + Au2.kern;
    Bu2 = Bu2 + Iu2.depth + Gu2;
    Cu2 = {};
    Object.assign(Cu2, { positionType: lj, positionData: Bu2 });
    Bu2 = [];
    Eu2 = {};
    Object.assign(Eu2, { type: kh, size: Du2.fontMetrics().bigOpSpacing5 });
    Bu2.push(Eu2);
    Eu2 = {};
    Object.assign(Eu2, { type: Yf, elem: Au2.elem });
    Gu2 = d;
    Eu2.marginLeft = Gu2(0 - +Fu2);
    Bu2.push(Eu2);
    Eu2 = {};
    Object.assign(Eu2, { type: kh, size: Au2.kern });
    Bu2.push(Eu2);
    Eu2 = {};
    Object.assign(Eu2, { type: Yf, elem: Iu2 });
    Bu2.push(Eu2);
    Eu2 = {};
    Object.assign(Eu2, { type: kh, size: Hu2.kern });
    Bu2.push(Eu2);
    Eu2 = {};
    Object.assign(Eu2, { type: Yf, elem: Hu2.elem, marginLeft: d(Fu2) });
    Bu2.push(Eu2);
    Eu2 = {};
    Object.assign(Eu2, { type: kh, size: Du2.fontMetrics().bigOpSpacing5 });
    Bu2.push(Eu2);
    Cu2.children = Bu2;
    Bu2 = a.makeVList(Cu2, Du2);
  } else {
    if (Au2) {
      Bu2 = +Iu2.height - +Gu2;
      Cu2 = {};
      Object.assign(Cu2, { positionType: _l, positionData: Bu2 });
      Bu2 = [];
      Eu2 = {};
      Object.assign(Eu2, { type: kh, size: Du2.fontMetrics().bigOpSpacing5 });
      Bu2.push(Eu2);
      Eu2 = {};
      Object.assign(Eu2, { type: Yf, elem: Au2.elem });
      Gu2 = d;
      Eu2.marginLeft = Gu2(0 - +Fu2);
      Bu2.push(Eu2);
      Eu2 = {};
      Object.assign(Eu2, { type: kh, size: Au2.kern });
      Bu2.push(Eu2);
      Eu2 = {};
      Object.assign(Eu2, { type: Yf, elem: Iu2 });
      Bu2.push(Eu2);
      Cu2.children = Bu2;
      Bu2 = a.makeVList(Cu2, Du2);
    } else {
      if (Hu2) {
        Bu2 = Iu2.depth + Gu2;
        Cu2 = {};
        Object.assign(Cu2, { positionType: lj, positionData: Bu2 });
        Bu2 = [];
        Eu2 = {};
        Object.assign(Eu2, { type: Yf, elem: Iu2 });
        Bu2.push(Eu2);
        Eu2 = {};
        Object.assign(Eu2, { type: kh, size: Hu2.kern });
        Bu2.push(Eu2);
        Eu2 = {};
        Object.assign(Eu2, { type: Yf, elem: Hu2.elem, marginLeft: d(Fu2) });
        Bu2.push(Eu2);
        Eu2 = {};
        Object.assign(Eu2, { type: kh, size: Du2.fontMetrics().bigOpSpacing5 });
        Bu2.push(Eu2);
        Cu2.children = Bu2;
        Bu2 = a.makeVList(Cu2, Du2);
      } else {
        return Iu2;
      }
    }
  }
  Hu2 = [];
  Hu2.push(Bu2);
  Au2 && 0 !== Fu2 && !Ju2 && (Au2 = [], Au2.push(Mh), Au2 = a.makeSpan(Au2, [], Du2), Bu2 = Au2.style, Bu2.marginRight = d(Fu2), Hu2.unshift(Au2));
  Au2 = [];
  Au2.push(ol);
  Au2.push("op-limits");
  return a.makeSpan(Au2, Hu2, Du2);
};
var Tb = void 0;
var qd = void 0;
var rd = void 0;
Cu = [];
Cu.push(Is);
Tb = Cu;
Eu = He;
Fu = (Au2, Bu2) => {
  if (Au2.symbol) {
    Bu2 = [];
    Bu2.push(f.makeText(Au2.name, Au2.mode));
    Bu2 = new G.MathNode(ki, Bu2);
    !i.contains(Tb, Au2.name) || Bu2.setAttribute("largeop", Gl);
  } else {
    if (Au2.body) {
      var Cu2 = G.MathNode;
      Bu2 = new Cu2(ki, f.buildExpression(Au2.body, Bu2));
    } else {
      Bu2 = [];
      Cu2 = G.TextNode;
      Bu2.push(new Cu2(Au2.name.slice(1)));
      Bu2 = new G.MathNode(Dl, Bu2);
      Cu2 = [];
      Cu2.push(f.makeText("\u2061", yf));
      Cu2 = new G.MathNode(ki, Cu2);
      Au2.parentIsSupSub ? (Au2 = [], Au2.push(Bu2), Au2.push(Cu2), Bu2 = new G.MathNode(Fj, Au2)) : (Au2 = [], Au2.push(Bu2), Au2.push(Cu2), Bu2 = G.newDocumentFragment(Au2));
    }
  }
  return Bu2;
};
Cu = {};
Hu = "\\prod";
Object.assign(Cu, { "\u220F": Hu, "\u2210": au });
Xu = "\\sum";
Object.assign(Cu, { "\u2211": Xu, "\u22C0": Bs, "\u22C1": Yt, "\u22C2": Wt, "\u22C3": Xt, "\u2A00": rt, "\u2A01": ys, "\u2A02": Yr, "\u2A04": As, "\u2A06": zs });
qd = Cu;
Du = {};
Du.type = Dj;
Cu = [];
Cu.push(au);
Cu.push(Yt);
Cu.push(Bs);
Cu.push(As);
Cu.push(Wt);
Cu.push(Xt);
Cu.push("\\intop");
Cu.push(Hu);
Cu.push(Xu);
Cu.push(Yr);
Cu.push(ys);
Cu.push(rt);
Cu.push(zs);
Cu.push(Is);
Cu.push("\u220F");
Cu.push("\u2210");
Cu.push("\u2211");
Cu.push("\u22C0");
Cu.push("\u22C1");
Cu.push("\u22C2");
Cu.push("\u22C3");
Cu.push("\u2A00");
Cu.push("\u2A01");
Cu.push("\u2A02");
Cu.push("\u2A04");
Cu.push("\u2A06");
Du.names = Cu;
Cu = {};
Cu.numArgs = 0;
Object.assign(Du, { props: Cu, handler: (Au2, Bu2) => {
  var Cu2 = Au2.parser;
  Bu2 = Au2.funcName;
  Au2 = Bu2.length;
  1 === Au2 && (Bu2 = qd[Bu2]);
  Au2 = {};
  Object.assign(Au2, { type: Dj, mode: Cu2.mode, limits: true, parentIsSupSub: false, symbol: true, name: Bu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Du);
Cu = {};
Cu.type = Dj;
Du = [];
Du.push("\\mathop");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, primitive: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: Dj, mode: Cu2.mode, limits: false, parentIsSupSub: false, symbol: false, body: s2(Bu2) });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Cu);
Cu = {};
Yu = "\\int";
Object.assign(Cu, { "\u222B": Yu, "\u222C": Aq, "\u222D": xp });
Zu = "\\oint";
Object.assign(Cu, { "\u222E": Zu, "\u222F": pl, "\u2230": Jk });
rd = Cu;
Du = {};
Du.type = Dj;
Cu = [];
Cu.push("\\arcsin");
Cu.push("\\arccos");
Cu.push("\\arctan");
Cu.push("\\arctg");
Cu.push("\\arcctg");
Cu.push("\\arg");
Cu.push("\\ch");
Cu.push("\\cos");
Cu.push("\\cosec");
Cu.push("\\cosh");
Cu.push("\\cot");
Cu.push("\\cotg");
Cu.push("\\coth");
Cu.push("\\csc");
Cu.push("\\ctg");
Cu.push("\\cth");
Cu.push("\\deg");
Cu.push("\\dim");
Cu.push("\\exp");
Cu.push("\\hom");
Cu.push("\\ker");
Cu.push("\\lg");
Cu.push("\\ln");
Cu.push("\\log");
Cu.push("\\sec");
Cu.push("\\sin");
Cu.push("\\sinh");
Cu.push("\\sh");
Cu.push("\\tan");
Cu.push("\\tanh");
Cu.push("\\tg");
Cu.push("\\th");
Du.names = Cu;
Cu = {};
Cu.numArgs = 0;
Object.assign(Du, { props: Cu, handler: function(Bu2) {
  let Cu2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Au2 = {};
  Object.assign(Au2, { type: Dj, mode: Cu2.mode, limits: false, parentIsSupSub: false, symbol: false, name: Bu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Du);
Du = {};
Du.type = Dj;
Cu = [];
Cu.push("\\det");
Cu.push("\\gcd");
Cu.push("\\inf");
Cu.push("\\lim");
Cu.push("\\max");
Cu.push("\\min");
Cu.push("\\Pr");
Cu.push("\\sup");
Du.names = Cu;
Cu = {};
Cu.numArgs = 0;
Object.assign(Du, { props: Cu, handler: function(Bu2) {
  let Cu2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  let Au2 = {};
  Object.assign(Au2, { type: Dj, mode: Cu2.mode, limits: true, parentIsSupSub: false, symbol: false, name: Bu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Du);
Du = {};
Du.type = Dj;
Cu = [];
Cu.push(Yu);
Cu.push(Aq);
Cu.push(xp);
Cu.push(Zu);
Cu.push(pl);
Cu.push(Jk);
Cu.push("\u222B");
Cu.push("\u222C");
Cu.push("\u222D");
Cu.push("\u222E");
Cu.push("\u222F");
Cu.push("\u2230");
Du.names = Cu;
Cu = {};
Cu.numArgs = 0;
Object.assign(Du, { props: Cu, handler: function(Bu2) {
  var Cu2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  var Au2 = Bu2.length;
  1 === Au2 && (Bu2 = rd[Bu2]);
  Au2 = {};
  Object.assign(Au2, { type: Dj, mode: Cu2.mode, limits: false, parentIsSupSub: false, symbol: true, name: Bu2 });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Fu });
e(Du);
var sd = {};
sd.htmlBuilder = Eu;
Eu = Ie;
Cu = {};
Cu.type = Qg;
Du = [];
Du.push("\\operatorname@");
Du.push(Hm);
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser, Du2 = Au2.funcName;
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: Qg, mode: Cu2.mode, body: s2(Bu2), alwaysHandleSupSub: Du2 === Hm, limits: false, parentIsSupSub: false });
  return Au2;
}, htmlBuilder: Eu, mathmlBuilder: Ke });
e(Cu);
Au("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
var td = {};
td.htmlBuilder = Eu;
Cu = {};
Object.assign(Cu, { type: Xf, htmlBuilder: function(Bu2, Cu2) {
  if (Bu2.semisimple) {
    var Au2 = a;
    return Au2.makeFragment(h2.buildExpression(Bu2.body, Cu2, false));
  }
  Au2 = [];
  Au2.push(wg);
  var Du2 = a;
  return Du2.makeSpan(Au2, h2.buildExpression(Bu2.body, Cu2, true), Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  return f.buildExpressionRow(Bu2.body, Cu2, true);
} });
Gu(Cu);
Cu = {};
Cu.type = Po;
Du = [];
Du.push("\\overline");
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  Cu2 = Cu2[0];
  let Au2 = {};
  Object.assign(Au2, { type: Po, mode: Bu2.mode, body: Cu2 });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  let Fu2 = h2.buildGroup(Bu2.body, Cu2.havingCrampedStyle()), Gu2 = a.makeLineSpan("overline-line", Cu2), Eu2 = Cu2.fontMetrics().defaultRuleThickness;
  Bu2 = {};
  Bu2.positionType = Ug;
  let Au2 = [], Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Fu2 });
  Au2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: kh, size: 3 * +Eu2 });
  Au2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Gu2 });
  Au2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: kh, size: Eu2 });
  Au2.push(Du2);
  Bu2.children = Au2;
  Du2 = a.makeVList(Bu2, Cu2);
  Au2 = [];
  Au2.push(wg);
  Au2.push(Po);
  Bu2 = [];
  Bu2.push(Du2);
  return a.makeSpan(Au2, Bu2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = [];
  Au2.push(new b.TextNode("\u203E"));
  let Du2 = new b.MathNode(ki, Au2);
  Du2.setAttribute(oi, Dh);
  Au2 = [];
  Au2.push(f.buildGroup(Bu2.body, Cu2));
  Au2.push(Du2);
  Au2 = new b.MathNode(Xi, Au2);
  Au2.setAttribute(li, Dh);
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = mk;
Du = [];
Du.push("\\phantom");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: mk, mode: Cu2.mode, body: s2(Bu2) });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => a.makeFragment(h2.buildExpression(Au2.body, Bu2.withPhantom(), false)), mathmlBuilder: (Au2, Bu2) => {
  Au2 = f.buildExpression(Au2.body, Bu2);
  return new b.MathNode(Oo, Au2);
} });
e(Cu);
Cu = {};
Cu.type = iu;
Du = [];
Du.push("\\hphantom");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: iu, mode: Cu2.mode, body: Bu2 });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  var Cu2 = [];
  Cu2.push(h2.buildGroup(Au2.body, Bu2.withPhantom()));
  Au2 = a.makeSpan([], Cu2);
  Object.assign(Au2, { height: 0, depth: 0 });
  if (Au2.children) {
    Cu2 = 0;
    for (; ; ) {
      var Du2 = Au2.children;
      if (Cu2 >= Du2.length) {
        break;
      }
      Du2 = Au2.children[Cu2];
      Du2.height = 0;
      Du2 = Au2.children[Cu2];
      Du2.depth = 0;
      Cu2 = Cu2 + 1;
    }
  }
  Cu2 = {};
  Cu2.positionType = Ug;
  var Eu2 = [];
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Au2 });
  Eu2.push(Du2);
  Cu2.children = Eu2;
  Du2 = a.makeVList(Cu2, Bu2);
  Au2 = [];
  Au2.push(wg);
  Cu2 = [];
  Cu2.push(Du2);
  return a.makeSpan(Au2, Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  let Cu2 = f;
  Au2 = Cu2.buildExpression(s2(Au2.body), Bu2);
  Bu2 = new b.MathNode(Oo, Au2);
  Au2 = [];
  Au2.push(Bu2);
  Au2 = new b.MathNode(Eh, Au2);
  Au2.setAttribute(Df, Nn);
  Au2.setAttribute(Lf, Nn);
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = wu;
Du = [];
Du.push("\\vphantom");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.parser;
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: wu, mode: Cu2.mode, body: Bu2 });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  let Cu2 = [];
  Cu2.push(Rm);
  let Du2 = [];
  Du2.push(h2.buildGroup(Au2.body, Bu2.withPhantom()));
  Du2 = a.makeSpan(Cu2, Du2);
  Au2 = [];
  Au2.push("fix");
  let Eu2 = a.makeSpan(Au2, []);
  Au2 = [];
  Au2.push(wg);
  Au2.push("rlap");
  Cu2 = [];
  Cu2.push(Du2);
  Cu2.push(Eu2);
  return a.makeSpan(Au2, Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  let Cu2 = f;
  Au2 = Cu2.buildExpression(s2(Au2.body), Bu2);
  Bu2 = new b.MathNode(Oo, Au2);
  Au2 = [];
  Au2.push(Bu2);
  Au2 = new b.MathNode(Eh, Au2);
  Au2.setAttribute(Zf, Nn);
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = su;
Du = [];
Du.push("\\raisebox");
Cu.names = Du;
Du = {};
Du.numArgs = 2;
Eu = [];
Eu.push(Of);
Eu.push(kt);
Object.assign(Du, { argTypes: Eu, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Du2 = j(Cu2[0], Of).value;
  Cu2 = Cu2[1];
  let Au2 = {};
  Object.assign(Au2, { type: su, mode: Bu2.mode, dy: Du2, body: Cu2 });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  let Eu2 = h2.buildGroup(Bu2.body, Cu2);
  Bu2 = r(Bu2.dy, Cu2);
  let Au2 = {};
  Object.assign(Au2, { positionType: mg, positionData: 0 - +Bu2 });
  let Du2 = [];
  Bu2 = {};
  Object.assign(Bu2, { type: Yf, elem: Eu2 });
  Du2.push(Bu2);
  Au2.children = Du2;
  return a.makeVList(Au2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = [];
  Au2.push(f.buildGroup(Bu2.body, Cu2));
  Au2 = new b.MathNode(Eh, Au2);
  Cu2 = Bu2.dy;
  Cu2 = Cu2.number;
  Bu2 = Bu2.dy;
  Au2.setAttribute(Zm, Cu2 + Bu2.unit);
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = Vh;
Du = [];
Du.push(Cp);
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu, allowedInArgument: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: Vh, mode: Bu2.mode });
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = nt;
Du = [];
Du.push("\\rule");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 2, numOptionalArgs: 1, allowedInText: Bu, allowedInMath: Bu });
Eu = [];
Eu.push(Of);
Eu.push(Of);
Eu.push(Of);
Du.argTypes = Eu;
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2, Du2) {
  var Eu2 = Bu2.parser;
  Bu2 = Du2[0];
  Du2 = j(Cu2[0], Of);
  Cu2 = j(Cu2[1], Of);
  var Au2 = {};
  Object.assign(Au2, { type: nt, mode: Eu2.mode });
  !Bu2 || (Bu2 = j(Bu2, Of).value);
  Object.assign(Au2, { shift: Bu2, width: Du2.value, height: Cu2.value });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  var Au2 = [];
  Au2.push(wg);
  Au2.push(nt);
  Au2 = a.makeSpan(Au2, [], Cu2);
  var Eu2 = r(Bu2.width, Cu2);
  var Du2 = r(Bu2.height, Cu2);
  Bu2 = Bu2.shift ? r(Bu2.shift, Cu2) : 0;
  var Fu2 = Au2.style;
  Fu2.borderRightWidth = d(Eu2);
  Fu2 = Au2.style;
  Fu2.borderTopWidth = d(Du2);
  Fu2 = Au2.style;
  Fu2.bottom = d(Bu2);
  Object.assign(Au2, { width: Eu2, height: Du2 + Bu2, depth: 0 - +Bu2 });
  Bu2 = +Du2;
  Bu2 = +(Bu2 * 1.125);
  Au2.maxFontSize = Bu2 * +Cu2.sizeMultiplier;
  return Au2;
}, mathmlBuilder: function(Bu2, Cu2) {
  var Du2 = r(Bu2.width, Cu2);
  var Eu2 = r(Bu2.height, Cu2);
  var Au2 = Bu2.shift ? r(Bu2.shift, Cu2) : 0;
  Bu2 = Cu2.color;
  !Bu2 || (Bu2 = Cu2.getColor());
  Bu2 = Bu2 || "black";
  Cu2 = new b.MathNode(Mh);
  Cu2.setAttribute(rq, Bu2);
  Cu2.setAttribute(Zf, d(Du2));
  Cu2.setAttribute(Df, d(Eu2));
  Bu2 = [];
  Bu2.push(Cu2);
  Bu2 = new b.MathNode(Eh, Bu2);
  Au2 >= 0 ? Bu2.setAttribute(Df, d(Au2)) : (Bu2.setAttribute(Df, d(Au2)), Cu2 = d, Bu2.setAttribute(Lf, Cu2(0 - +Au2)));
  Bu2.setAttribute(Zm, d(Au2));
  return Bu2;
} });
e(Cu);
var Ub = void 0;
var Vb = void 0;
Ub = (Au2, Bu2, Cu2) => {
  var Du2 = h2.buildExpression(Au2, Bu2, false);
  Au2 = +Bu2.sizeMultiplier;
  var Fu2 = Au2 / +Cu2.sizeMultiplier;
  Au2 = 0;
  while (Au2 < Du2.length) {
    var Eu2 = Du2[Au2];
    Eu2 = Eu2.classes.indexOf(_k);
    if (Eu2 < 0) {
      Eu2 = Array.prototype;
      Eu2 = Eu2.push;
      var Gu2 = Du2[Au2];
      Eu2.apply(Gu2.classes, Bu2.sizingClasses(Cu2));
    } else {
      Gu2 = Du2[Au2];
      Gu2 = Gu2.classes;
      Gu2 = Gu2[Eu2 + 1];
      Gu2 === ll + Bu2.size && (Gu2 = Du2[Au2], Gu2 = Gu2.classes, Eu2 = Eu2 + 1, Gu2[Eu2] = ll + Cu2.size);
    }
    Eu2 = Du2[Au2];
    Eu2 = Eu2.height;
    Gu2 = Du2[Au2];
    Gu2.height = +Eu2 * +Fu2;
    Eu2 = Du2[Au2];
    Eu2 = Eu2.depth;
    Gu2 = Du2[Au2];
    Gu2.depth = +Eu2 * +Fu2;
    Au2 = Au2 + 1;
  }
  return a.makeFragment(Du2);
};
Cu = [];
Cu.push("\\tiny");
Cu.push("\\sixptsize");
Cu.push("\\scriptsize");
Cu.push("\\footnotesize");
Cu.push("\\small");
Cu.push("\\normalsize");
Cu.push("\\large");
Cu.push("\\Large");
Cu.push("\\LARGE");
Cu.push("\\huge");
Cu.push("\\Huge");
Vb = Cu;
Cu = {};
Object.assign(Cu, { type: _k, names: Vb });
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2) => {
  let Cu2 = Au2.breakOnTokenText, Du2 = Au2.funcName;
  Bu2 = Au2.parser;
  Cu2 = Bu2.parseExpression(false, Cu2);
  Au2 = {};
  Object.assign(Au2, { type: _k, mode: Bu2.mode, size: Vb.indexOf(Du2) + 1, body: Cu2 });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  let Cu2 = Bu2.havingSize(Au2.size);
  return Ub(Au2.body, Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  Bu2 = Bu2.havingSize(Au2.size);
  Au2 = f.buildExpression(Au2.body, Bu2);
  Au2 = new b.MathNode(Zj, Au2);
  Au2.setAttribute("mathsize", d(Bu2.sizeMultiplier));
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = "smash";
Du = [];
Du.push("\\smash");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, numOptionalArgs: 1, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: (Au2, Bu2, Cu2) => {
  var Gu2 = Au2.parser;
  Au2 = Cu2[0];
  !Au2 || (Au2 = j(Cu2[0], Xf));
  if (Au2) {
    var Cu2 = false, Du2 = false, Eu2 = 0, Fu2;
    for (; ; ) {
      Fu2 = Au2.body;
      if (Eu2 >= Fu2.length) {
        break;
      }
      Fu2 = Au2.body[Eu2];
      Fu2 = Fu2.text;
      if ("t" === Fu2) {
        Cu2 = true;
      } else {
        if (!("b" === Fu2)) {
          Cu2 = false;
          Du2 = false;
          break;
        }
        Du2 = true;
      }
      Eu2 = Eu2 + 1;
    }
  } else {
    Cu2 = true;
    Du2 = true;
  }
  Bu2 = Bu2[0];
  Au2 = {};
  Object.assign(Au2, { type: "smash", mode: Gu2.mode, body: Bu2, smashHeight: Cu2, smashDepth: Du2 });
  return Au2;
}, htmlBuilder: (Au2, Bu2) => {
  var Cu2 = [];
  Cu2.push(h2.buildGroup(Au2.body, Bu2));
  Cu2 = a.makeSpan([], Cu2);
  var Du2;
  if (!Au2.smashHeight && !Au2.smashDepth) return Cu2;
  if (Au2.smashHeight) {
    Cu2.height = 0;
    if (Cu2.children) {
      Du2 = 0;
      for (; ; ) {
        var Eu2 = Cu2.children;
        if (Du2 >= Eu2.length) {
          break;
        }
        Eu2 = Cu2.children[Du2];
        Eu2.height = 0;
        Du2 = Du2 + 1;
      }
    }
  }
  if (Au2.smashDepth) {
    Cu2.depth = 0;
    if (Cu2.children) {
      Au2 = 0;
      for (; ; ) {
        Du2 = Cu2.children;
        if (Au2 >= Du2.length) {
          break;
        }
        Du2 = Cu2.children[Au2];
        Du2.depth = 0;
        Au2 = Au2 + 1;
      }
    }
  }
  Au2 = {};
  Au2.positionType = Ug;
  Eu2 = [];
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Cu2 });
  Eu2.push(Du2);
  Au2.children = Eu2;
  Du2 = a.makeVList(Au2, Bu2);
  Au2 = [];
  Au2.push(wg);
  Cu2 = [];
  Cu2.push(Du2);
  return a.makeSpan(Au2, Cu2, Bu2);
}, mathmlBuilder: (Au2, Bu2) => {
  var Cu2 = [];
  Cu2.push(f.buildGroup(Au2.body, Bu2));
  Bu2 = new b.MathNode(Eh, Cu2);
  !Au2.smashHeight || Bu2.setAttribute(Df, Nn);
  !Au2.smashDepth || Bu2.setAttribute(Lf, Nn);
  return Bu2;
} });
e(Cu);
Cu = {};
Cu.type = Xn;
Du = [];
Du.push("\\sqrt");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, numOptionalArgs: 1 });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2, Du2) {
  Bu2 = Bu2.parser;
  Du2 = Du2[0];
  Cu2 = Cu2[0];
  let Au2 = {};
  Object.assign(Au2, { type: Xn, mode: Bu2.mode, body: Cu2, index: Du2 });
  return Au2;
}, htmlBuilder: Bd(Le), mathmlBuilder: function(Bu2, Cu2) {
  var Du2 = Bu2.body;
  Bu2 = Bu2.index;
  if (Bu2) {
    var Au2 = [];
    Au2.push(f.buildGroup(Du2, Cu2));
    Au2.push(f.buildGroup(Bu2, Cu2));
    Au2 = new b.MathNode("mroot", Au2);
  } else {
    Au2 = [];
    Au2.push(f.buildGroup(Du2, Cu2));
    Au2 = new b.MathNode("msqrt", Au2);
  }
  return Au2;
} });
e(Cu);
var Wb = void 0;
Cu = {};
Object.assign(Cu, { display: g.DISPLAY, text: g.TEXT, script: g.SCRIPT, scriptscript: g.SCRIPTSCRIPT });
Wb = Cu;
Cu = {};
Cu.type = Sh;
Du = [];
Du.push("\\displaystyle");
Du.push("\\textstyle");
Du.push("\\scriptstyle");
Du.push("\\scriptscriptstyle");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu, primitive: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  Cu2 = Bu2.breakOnTokenText;
  let Au2 = Bu2.funcName;
  Bu2 = Bu2.parser;
  Cu2 = Bu2.parseExpression(true, Cu2);
  let Du2 = Au2.length;
  Du2 = Au2.slice(1, Du2 - 5);
  Au2 = {};
  Object.assign(Au2, { type: Sh, mode: Bu2.mode, style: Du2, body: Cu2 });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  let Au2 = Wb;
  Au2 = Au2[Bu2.style];
  Au2 = Cu2.havingStyle(Au2).withFont(lh);
  return Ub(Bu2.body, Au2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = Wb;
  Au2 = Au2[Bu2.style];
  Au2 = Cu2.havingStyle(Au2);
  Au2 = f.buildExpression(Bu2.body, Au2);
  Cu2 = new b.MathNode(Zj, Au2);
  Au2 = {};
  let Du2 = [];
  Du2.push(bt);
  Du2.push(Dh);
  Au2.display = Du2;
  Du2 = [];
  Du2.push(bt);
  Du2.push(Gl);
  Au2.text = Du2;
  Du2 = [];
  Du2.push(mr);
  Du2.push(Gl);
  Au2.script = Du2;
  Du2 = [];
  Du2.push("2");
  Du2.push(Gl);
  Au2.scriptscript = Du2;
  Au2 = Au2[Bu2.style];
  Cu2.setAttribute(Ok, Au2[0]);
  Cu2.setAttribute(xm, Au2[1]);
  return Cu2;
} });
e(Cu);
var ud = void 0;
ud = Me;
Cu = {};
Object.assign(Cu, { type: _j, htmlBuilder: function(Bu2, Cu2) {
  var Au2 = ud(Bu2, Cu2);
  if (Au2) return Au2(Bu2, Cu2);
  Au2 = Bu2.base;
  var Iu2 = Bu2.sup;
  var Ku2 = Bu2.sub;
  var Gu2 = h2.buildGroup(Au2, Cu2);
  var Eu2 = void 0;
  var Fu2 = void 0;
  var Du2 = Cu2.fontMetrics();
  !Au2 || (Au2 = i.isCharacterBox(Au2));
  if (Iu2) {
    Eu2 = Cu2.style;
    var Hu2 = Cu2.havingStyle(Eu2.sup());
    Eu2 = h2.buildGroup(Iu2, Hu2, Cu2);
    if (!Au2) {
      Iu2 = +Gu2.height;
      var Ju2 = +Hu2.fontMetrics().supDrop;
      Hu2 = +(Ju2 * +Hu2.sizeMultiplier);
      Ju2 = Iu2 - +(Hu2 / +Cu2.sizeMultiplier);
    } else {
      Ju2 = 0;
    }
  } else {
    Ju2 = 0;
  }
  Ku2 ? (Fu2 = Cu2.style, Hu2 = Cu2.havingStyle(Fu2.sub()), Fu2 = h2.buildGroup(Ku2, Hu2, Cu2), !Au2 ? (Au2 = Gu2.depth, Iu2 = +Hu2.fontMetrics().subDrop, Hu2 = +(Iu2 * +Hu2.sizeMultiplier), Ku2 = Au2 + Hu2 / +Cu2.sizeMultiplier) : Ku2 = 0) : Ku2 = 0;
  Au2 = Cu2.style;
  Au2 === g.DISPLAY ? Hu2 = Du2.sup1 : (Au2 = Cu2.style, Hu2 = Au2.cramped ? Du2.sup3 : Du2.sup2);
  Au2 = Cu2.sizeMultiplier;
  Iu2 = d;
  var Lu2 = 0.5;
  Lu2 = Iu2(+(Lu2 / +Du2.ptPerEm) / +Au2);
  Iu2 = null;
  if (Fu2) {
    var Dw = void 0;
    Au2 = Bu2.base;
    !Au2 || (Au2 = Bu2.base, Au2 = Au2.type, Au2 = Au2 === Dj);
    !Au2 || (Au2 = Bu2.base, Au2 = Au2.name);
    !Au2 || (Au2 = Bu2.base, Au2 = Au2.name, Au2 = Au2 === pl, Au2 || (Au2 = Bu2.base, Au2 = Au2.name, Au2 = Au2 === Jk));
    (m(Gu2, v) || Au2) && (Au2 = d, Bu2 = 0, Iu2 = Au2(Bu2 - +Gu2.italic));
  }
  if (Eu2 && Fu2) {
    Au2 = Math;
    Bu2 = Eu2.depth;
    var Mu2 = 0.25;
    Au2 = Au2.max(Ju2, Hu2, Bu2 + Mu2 * +Du2.xHeight);
    Bu2 = Math.max(Ku2, Du2.sub2);
    Hu2 = Du2.defaultRuleThickness;
    Hu2 = 4 * +Hu2;
    Ju2 = +Au2;
    Ju2 = +(Ju2 - +Eu2.depth);
    Ju2 - +(+Fu2.height - +Bu2) < Hu2 && (Bu2 = +Hu2, Hu2 = +Au2, Bu2 = Bu2 - +(Hu2 - +Eu2.depth), Bu2 = Bu2 + Fu2.height, Hu2 = 0.8, Du2 = +(Hu2 * +Du2.xHeight), Hu2 = +Au2, Du2 = Du2 - +(Hu2 - +Eu2.depth), Du2 > 0 && (Au2 = Au2 + Du2, Bu2 = +Bu2 - +Du2));
    Hu2 = [];
    Du2 = {};
    Object.assign(Du2, { type: Yf, elem: Fu2, shift: Bu2, marginRight: Lu2, marginLeft: Iu2 });
    Hu2.push(Du2);
    Bu2 = {};
    Object.assign(Bu2, { type: Yf, elem: Eu2, shift: 0 - +Au2, marginRight: Lu2 });
    Hu2.push(Bu2);
    Au2 = {};
    Object.assign(Au2, { positionType: kg, children: Hu2 });
    Au2 = a.makeVList(Au2, Cu2);
  } else {
    if (Fu2) {
      Au2 = Math;
      Bu2 = Du2.sub1;
      Eu2 = +Fu2.height;
      Hu2 = 0.8;
      Du2 = Au2.max(Ku2, Bu2, Eu2 - +(Hu2 * +Du2.xHeight));
      Bu2 = [];
      Au2 = {};
      Object.assign(Au2, { type: Yf, elem: Fu2, marginLeft: Iu2, marginRight: Lu2 });
      Bu2.push(Au2);
      Au2 = {};
      Object.assign(Au2, { positionType: mg, positionData: Du2, children: Bu2 });
      Au2 = a.makeVList(Au2, Cu2);
    } else {
      if (Eu2) {
        Au2 = Math;
        Bu2 = Eu2.depth;
        Fu2 = 0.25;
        Bu2 = Au2.max(Ju2, Hu2, Bu2 + Fu2 * +Du2.xHeight);
        Au2 = {};
        Object.assign(Au2, { positionType: mg, positionData: 0 - +Bu2 });
        Du2 = [];
        Bu2 = {};
        Object.assign(Bu2, { type: Yf, elem: Eu2, marginRight: Lu2 });
        Du2.push(Bu2);
        Au2.children = Du2;
        Au2 = a.makeVList(Au2, Cu2);
      } else {
        throw t("supsub must have either sup or sub.");
      }
    }
  }
  Bu2 = h2.getTypeOfDomTree(Gu2, Yi);
  Bu2 = Bu2 || wg;
  Du2 = [];
  Du2.push(Bu2);
  Bu2 = [];
  Bu2.push(Gu2);
  Eu2 = [];
  Eu2.push("msupsub");
  Fu2 = [];
  Fu2.push(Au2);
  Bu2.push(a.makeSpan(Eu2, Fu2));
  return a.makeSpan(Du2, Bu2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  var Du2 = void 0;
  if (Bu2.base) {
    var Au2 = Bu2.base;
    Au2 = Au2.type;
    Au2 = Au2 === Ti;
  } else {
    Au2 = false;
  }
  if (Au2) {
    Au2 = !!Bu2.sup;
    var Eu2 = Bu2.base;
    if (Au2 === Eu2.isOver) {
      Au2 = Bu2.base;
      Du2 = Au2.isOver;
      var Fu2 = true;
    } else {
      Fu2 = false;
    }
  } else {
    Fu2 = false;
  }
  Bu2.base ? (Au2 = Bu2.base, Au2 = Au2.type, Au2 === Dj ? Au2 = true : (Au2 = Bu2.base, Au2 = Au2.type, Au2 = Au2 === Qg)) : Au2 = false;
  Au2 && (Au2 = Bu2.base, Au2.parentIsSupSub = true);
  Eu2 = [];
  Eu2.push(f.buildGroup(Bu2.base, Cu2));
  !Bu2.sub || Eu2.push(f.buildGroup(Bu2.sub, Cu2));
  !Bu2.sup || Eu2.push(f.buildGroup(Bu2.sup, Cu2));
  Fu2 ? Au2 = Du2 ? Xi : Fi : !Bu2.sub ? (Au2 = Bu2.base, Au2 ? (Bu2 = Au2.type, Bu2 = Bu2 === Dj) : Bu2 = false, Bu2 && Au2.limits ? (Bu2 = Cu2.style, Bu2 = Bu2 === g.DISPLAY || !!Au2.alwaysHandleSupSub) : Bu2 = false, Bu2 ? Au2 = Xi : (Au2 && Au2.type === Qg && Au2.alwaysHandleSupSub ? Au2.limits ? Bu2 = true : (Au2 = Cu2.style, Bu2 = Au2 === g.DISPLAY) : Bu2 = false, Au2 = Bu2 ? Xi : "msup")) : !Bu2.sup ? (Au2 = Bu2.base, Au2 ? (Bu2 = Au2.type, Bu2 = Bu2 === Dj) : Bu2 = false, Bu2 && Au2.limits ? (Bu2 = Cu2.style, Bu2 = Bu2 === g.DISPLAY || !!Au2.alwaysHandleSupSub) : Bu2 = false, Bu2 ? Au2 = Fi : (Au2 && Au2.type === Qg && Au2.alwaysHandleSupSub ? Au2.limits ? Bu2 = true : (Au2 = Cu2.style, Bu2 = Au2 === g.DISPLAY) : Bu2 = false, Au2 = Bu2 ? Fi : "msub")) : (Au2 = Bu2.base, Au2 ? (Bu2 = Au2.type, Bu2 = Bu2 === Dj) : Bu2 = false, Bu2 && Au2.limits ? (Bu2 = Cu2.style, Bu2 = Bu2 === g.DISPLAY) : Bu2 = false, Bu2 ? Au2 = vn : (Au2 && Au2.type === Qg && Au2.alwaysHandleSupSub ? (Bu2 = Cu2.style, Bu2 = Bu2 === g.DISPLAY || !!Au2.limits) : Bu2 = false, Au2 = Bu2 ? vn : "msubsup"));
  return new b.MathNode(Au2, Eu2);
} });
Gu(Cu);
Cu = {};
Object.assign(Cu, { type: gj, htmlBuilder: function(Bu2, Cu2) {
  let Au2 = [];
  Au2.push(et + Bu2.family);
  return a.mathsym(Bu2.text, Bu2.mode, Cu2, Au2);
}, mathmlBuilder: function(Bu2, Cu2) {
  var Au2 = [];
  Au2.push(f.makeText(Bu2.text, Bu2.mode));
  Au2 = new b.MathNode(ki, Au2);
  var Du2 = Bu2.family;
  Du2 === tr ? (Bu2 = f.getVariant(Bu2, Cu2), Bu2 === gn && Au2.setAttribute(vi, Bu2)) : (Cu2 = Bu2.family, "punct" === Cu2 ? Au2.setAttribute(Jg, Dh) : (Bu2.family === hq || Bu2.family === Jr) && Au2.setAttribute(oi, Gl));
  return Au2;
} });
Gu(Cu);
var Xb = void 0;
Cu = {};
Object.assign(Cu, { mi: Rg, mn: Xk, mtext: Xk });
Xb = Cu;
Cu = {};
Object.assign(Cu, { type: lk, htmlBuilder: function(Bu2, Cu2) {
  return a.makeOrd(Bu2, Cu2, lk);
}, mathmlBuilder: function(Bu2, Cu2) {
  var Au2 = [];
  Au2.push(f.makeText(Bu2.text, Bu2.mode, Cu2));
  var Du2 = new b.MathNode(Dl, Au2);
  Au2 = f.getVariant(Bu2, Cu2);
  Au2 = Au2 || Rg;
  Bu2 = Xb;
  Au2 !== Bu2[Du2.type] && Du2.setAttribute(vi, Au2);
  return Du2;
} });
Gu(Cu);
Cu = {};
Object.assign(Cu, { type: bg, htmlBuilder: function(Bu2, Cu2) {
  return a.makeOrd(Bu2, Cu2, bg);
}, mathmlBuilder: function(Bu2, Cu2) {
  var Au2 = f.makeText(Bu2.text, Bu2.mode, Cu2);
  Cu2 = f.getVariant(Bu2, Cu2);
  Cu2 = Cu2 || Xk;
  var Du2 = Bu2.mode;
  Du2 === yf ? (Bu2 = [], Bu2.push(Au2), Au2 = new b.MathNode(Gk, Bu2)) : new RegExp("[0-9]", lh).test(Bu2.text) ? (Bu2 = [], Bu2.push(Au2), Au2 = new b.MathNode(hm, Bu2)) : (Bu2 = Bu2.text, Bu2 === Ap ? (Bu2 = [], Bu2.push(Au2), Au2 = new b.MathNode(ki, Bu2)) : (Bu2 = [], Bu2.push(Au2), Au2 = new b.MathNode(Dl, Bu2)));
  Bu2 = Xb;
  Cu2 !== Bu2[Au2.type] && Au2.setAttribute(vi, Cu2);
  return Au2;
} });
Gu(Cu);
var Ya = void 0;
var Za = void 0;
Cu = {};
Du = "nobreak";
Object.assign(Cu, { "\\nobreak": Du, "\\allowbreak": Ms });
Ya = Cu;
Cu = {};
Object.assign(Cu, { " ": {}, "\\ ": {} });
Eu = {};
Eu.className = Du;
Object.assign(Cu, { "~": Eu, "\\space": {} });
Eu = {};
Eu.className = Du;
Cu["\\nobreakspace"] = Eu;
Za = Cu;
Cu = {};
Object.assign(Cu, { type: "spacing", htmlBuilder: Bd(Ne), mathmlBuilder: Bd(Oe) });
Gu(Cu);
var Yb = void 0;
Yb = () => {
  let Au2 = new b.MathNode(vr, []);
  Au2.setAttribute(Zf, "50%");
  return Au2;
};
Cu = {};
Object.assign(Cu, { type: Zl, mathmlBuilder: function(Bu2, Cu2) {
  let Du2 = [], Au2 = [];
  Au2.push(Yb());
  let Eu2 = [];
  Eu2.push(f.buildExpressionRow(Bu2.body, Cu2));
  let Fu2 = b.MathNode;
  Au2.push(new Fu2(vr, Eu2));
  Au2.push(Yb());
  Eu2 = [];
  Eu2.push(f.buildExpressionRow(Bu2.tag, Cu2));
  Au2.push(new b.MathNode(vr, Eu2));
  Du2.push(new b.MathNode("mtr", Au2));
  Au2 = new b.MathNode(En, Du2);
  Au2.setAttribute(Zf, Un);
  return Au2;
} });
Gu(Cu);
var Zb = void 0;
var _b = void 0;
var vd = void 0;
var $b = void 0;
Cu = {};
Cu["\\text"] = void 0;
Eu = "\\textrm";
Cu["\\textrm"] = Jq;
Fu = "\\textsf";
Object.assign(Cu, { "\\textsf": Kq, "\\texttt": Gn });
Gu = "\\textnormal";
Cu["\\textnormal"] = Jq;
Zb = Cu;
Cu = {};
var cv = "\\textbf";
Cu["\\textbf"] = $k;
var dv = "\\textmd";
Cu["\\textmd"] = "textmd";
_b = Cu;
Cu = {};
var ev = "\\textit";
Cu["\\textit"] = nj;
var fv = "\\textup";
Cu["\\textup"] = "textup";
vd = Cu;
$b = (Au2, Bu2) => {
  Au2 = Au2.font;
  if (!Au2) {
    return Bu2;
  } else {
    if (Zb[Au2]) {
      return Bu2.withTextFontFamily(Zb[Au2]);
    } else {
      if (_b[Au2]) {
        return Bu2.withTextFontWeight(_b[Au2]);
      } else {
        if ("\\emph" === Au2) {
          Au2 = Bu2.fontShape;
          Au2 = Au2 === nj ? Bu2.withTextFontShape("textup") : Bu2.withTextFontShape(nj);
          return Au2;
        }
      }
    }
  }
  return Bu2.withTextFontShape(vd[Au2]);
};
Du = {};
Du.type = yf;
Cu = [];
Cu.push("\\text");
Cu.push(Eu);
Cu.push(Fu);
Cu.push(fu);
Cu.push(Gu);
Cu.push(cv);
Cu.push(dv);
Cu.push(ev);
Cu.push(fv);
Cu.push("\\emph");
Du.names = Cu;
Cu = {};
Cu.numArgs = 1;
Eu = [];
Eu.push(yf);
Object.assign(Cu, { argTypes: Eu, allowedInArgument: Bu, allowedInText: Bu });
Object.assign(Du, { props: Cu, handler: function(Bu2, Cu2) {
  let Du2 = Bu2.parser;
  Bu2 = Bu2.funcName;
  Cu2 = Cu2[0];
  let Au2 = {};
  Object.assign(Au2, { type: yf, mode: Du2.mode, body: s2(Cu2), font: Bu2 });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  Cu2 = $b(Bu2, Cu2);
  Bu2 = h2.buildExpression(Bu2.body, Cu2, true);
  let Au2 = [];
  Au2.push(wg);
  Au2.push(yf);
  return a.makeSpan(Au2, Bu2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = $b(Bu2, Cu2);
  return f.buildExpressionRow(Bu2.body, Au2);
} });
e(Du);
Cu = {};
Cu.type = fo;
Du = [];
Du.push("\\underline");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 1, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: fo, mode: Bu2.mode, body: Cu2[0] });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  let Eu2 = h2.buildGroup(Bu2.body, Cu2), Gu2 = a.makeLineSpan("underline-line", Cu2), Fu2 = Cu2.fontMetrics().defaultRuleThickness;
  Bu2 = {};
  Object.assign(Bu2, { positionType: _l, positionData: Eu2.height });
  let Au2 = [], Du2 = {};
  Object.assign(Du2, { type: kh, size: Fu2 });
  Au2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Gu2 });
  Au2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: kh, size: 3 * +Fu2 });
  Au2.push(Du2);
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Eu2 });
  Au2.push(Du2);
  Bu2.children = Au2;
  Du2 = a.makeVList(Bu2, Cu2);
  Au2 = [];
  Au2.push(wg);
  Au2.push(fo);
  Bu2 = [];
  Bu2.push(Du2);
  return a.makeSpan(Au2, Bu2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = [];
  Au2.push(new b.TextNode("\u203E"));
  let Du2 = new b.MathNode(ki, Au2);
  Du2.setAttribute(oi, Dh);
  Au2 = [];
  Au2.push(f.buildGroup(Bu2.body, Cu2));
  Au2.push(Du2);
  Au2 = new b.MathNode(Fi, Au2);
  Au2.setAttribute(en, Dh);
  return Au2;
} });
e(Cu);
Cu = {};
Cu.type = Kp;
Du = [];
Du.push("\\vcenter");
Cu.names = Du;
Du = {};
Du.numArgs = 1;
Eu = [];
Eu.push(pu);
Object.assign(Du, { argTypes: Eu, allowedInText: false });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2) {
  Bu2 = Bu2.parser;
  let Au2 = {};
  Object.assign(Au2, { type: Kp, mode: Bu2.mode, body: Cu2[0] });
  return Au2;
}, htmlBuilder: function(Bu2, Cu2) {
  Bu2 = h2.buildGroup(Bu2.body, Cu2);
  let Au2 = Cu2.fontMetrics().axisHeight, Du2 = 0.5, Eu2 = +(+Bu2.height - +Au2);
  Du2 = Du2 * +(Eu2 - +(Bu2.depth + Au2));
  Au2 = {};
  Object.assign(Au2, { positionType: mg, positionData: Du2 });
  Eu2 = [];
  Du2 = {};
  Object.assign(Du2, { type: Yf, elem: Bu2 });
  Eu2.push(Du2);
  Au2.children = Eu2;
  return a.makeVList(Au2, Cu2);
}, mathmlBuilder: function(Bu2, Cu2) {
  let Au2 = [];
  Au2.push(f.buildGroup(Bu2.body, Cu2));
  Bu2 = [];
  Bu2.push(Kp);
  return new b.MathNode(Eh, Au2, Bu2);
} });
e(Cu);
var ac = void 0;
Cu = {};
Cu.type = "verb";
Du = [];
Du.push("\\verb");
Cu.names = Du;
Du = {};
Object.assign(Du, { numArgs: 0, allowedInText: Bu });
Object.assign(Cu, { props: Du, handler: function(Bu2, Cu2, Du2) {
  throw new c("\\verb ended by end of line instead of matching delimiter");
}, htmlBuilder: function(Bu2, Cu2) {
  var Gu2 = ac(Bu2);
  var Hu2 = [];
  var Au2 = Cu2.style;
  var Du2 = Cu2.havingStyle(Au2.text());
  Au2 = 0;
  var Vu2 = void 0;
  while (Au2 < Gu2.length) {
    var Eu2 = Gu2[Au2];
    Eu2 === ft && (Eu2 = cl);
    var Fu2 = [];
    Fu2.push(wg);
    Fu2.push(Gn);
    Hu2.push(a.makeSymbol(Eu2, io, Bu2.mode, Du2, Fu2));
    Au2 = Au2 + 1;
  }
  Au2 = [];
  Au2.push(wg);
  Au2.push(yf);
  Bu2 = a;
  return Bu2.makeSpan(Au2.concat(Du2.sizingClasses(Cu2)), a.tryCombineChars(Hu2), Du2);
}, mathmlBuilder: function(Bu2, Cu2) {
  Bu2 = new b.TextNode(ac(Bu2));
  let Au2 = [];
  Au2.push(Bu2);
  Au2 = new b.MathNode(Gk, Au2);
  Au2.setAttribute(vi, Ql);
  return Au2;
} });
e(Cu);
ac = (Au2) => {
  var Bu2 = Au2.star ? "\u2423" : "\xA0";
  return Au2.body.replace(new RegExp(Wi, nr), Bu2);
};
var R = void 0;
R = rb;
var wd = void 0;
var xd = void 0;
var ua = void 0;
wd = new RegExp("[\u0300-\u036F]+$");
Cu = "[\u0300-\u036F]*";
xd = "([ \r\n	]+)|\\\\(\n|[ \r	]+\n?)[ \r	]*|([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + Cu + "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + Cu + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5|(\\\\[a-zA-Z@]+)[ \r\n	]*|\\\\[^\uD800-\uDFFF])";
ua = (0, function() {
  let Cu2 = arguments[0], Bu2 = arguments[1];
  this.input = Cu2;
  this.settings = Bu2;
  this.tokenRegex = new RegExp(xd, nr);
  Bu2 = {};
  Object.assign(Bu2, { "%": 14, "~": 13 });
  this.catcodes = Bu2;
  return this;
});
Cu = ua.prototype;
Cu.setCatcode = function(Bu2, Cu2) {
  this.catcodes[Bu2] = Cu2;
};
Cu = ua.prototype;
Cu.lex = function() {
  var Cu2 = this.input;
  var Bu2 = this.tokenRegex;
  Bu2 = Bu2.lastIndex;
  if (Bu2 === Cu2.length) return new D(fk, new A(this, Bu2, Bu2));
  var Du2 = this.tokenRegex;
  Du2 = Du2.exec(Cu2);
  var Eu2, Fu2;
  if (null === Du2 || Du2.index !== Bu2) {
    Du2 = c;
    Eu2 = "Unexpected character: '" + Cu2[Bu2] + Cj;
    Fu2 = D;
    Cu2 = Cu2[Bu2];
    throw new Du2(Eu2, new Fu2(Cu2, new A(this, Bu2, Bu2 + 1)));
  }
  Du2 = Od(Du2);
  Eu2 = this.catcodes[Du2];
  if (14 === Eu2) {
    Bu2 = this.tokenRegex;
    Bu2 = Cu2.indexOf(Rt, Bu2.lastIndex);
    Du2 = 0;
    Bu2 === Du2 - 1 ? (Bu2 = this.tokenRegex, Bu2.lastIndex = Cu2.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : (Cu2 = this.tokenRegex, Cu2.lastIndex = Bu2 + 1);
    return this.lex();
  }
  Cu2 = D;
  Eu2 = A;
  Fu2 = this.tokenRegex;
  return new Cu2(Du2, new Eu2(this, Bu2, Fu2.lastIndex));
};
var S = void 0;
S = (0, function() {
  var Cu2 = arguments[0];
  Cu2 === void 0 && (Cu2 = {});
  var Bu2 = arguments[1];
  Bu2 === void 0 && (Bu2 = {});
  this.current = Bu2;
  this.builtins = Cu2;
  this.undefStack = [];
  return this;
});
Cu = S.prototype;
Cu.beginGroup = function() {
  let Au2 = this.undefStack;
  Au2.push({});
};
Cu = S.prototype;
Cu.endGroup = function() {
  var Bu2 = this.undefStack;
  Bu2 = Bu2.length;
  if (0 === Bu2) throw new c("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
  Bu2 = this.undefStack;
  var Cu2 = Bu2.pop();
  var Eu2 = u(Cu2);
  var Fu2 = Eu2.length | 0;
  var Du2 = 0;
  while (Du2 < Fu2) {
    Bu2 = Eu2[Du2];
    l(Cu2, Bu2) && (Cu2[Bu2] == null ? delete this.current[Bu2] : this.current[Bu2] = Cu2[Bu2]);
    Du2 = Du2 + 1;
  }
};
Cu = S.prototype;
Cu.endGroups = function() {
  for (; ; ) {
    var Bu2 = this.undefStack;
    Bu2 = Bu2.length;
    if (Bu2 <= 0) {
      break;
    }
    this.endGroup();
  }
};
Cu = S.prototype;
Cu.has = function(Bu2) {
  var Cu2 = l(this.current, Bu2);
  Cu2 = Cu2 || l(this.builtins, Bu2);
  return Cu2;
};
Cu = S.prototype;
Cu.get = W(Pe);
Cu = S.prototype;
Cu.set = function(Bu2, Cu2, Du2) {
  Du2 === void 0 && (Du2 = false);
  if (Du2) {
    Du2 = 0;
    for (; ; ) {
      var Eu2 = this.undefStack;
      if (Du2 >= Eu2.length) {
        break;
      }
      delete this.undefStack[Du2][Bu2];
      Du2 = Du2 + 1;
    }
    Du2 = this.undefStack;
    Du2 = Du2.length;
    Du2 > 0 && (Du2 = this.undefStack, Eu2 = this.undefStack, Eu2 = Eu2.length, Du2[Eu2 - 1][Bu2] = Cu2);
  } else {
    Du2 = this.undefStack;
    Eu2 = this.undefStack;
    Eu2 = Eu2.length;
    Du2 = Du2[Eu2 - 1];
    Du2 && !l(Du2, Bu2) && (Du2[Bu2] = this.current[Bu2]);
  }
  Cu2 == null ? delete this.current[Bu2] : this.current[Bu2] = Cu2;
};
var yd = void 0;
var _a2 = void 0;
var $a = void 0;
var bc = void 0;
var ab = void 0;
yd = Kb;
Au("\\noexpand", (Au2) => {
  var Bu2 = Au2.popToken();
  !Au2.isExpandable(Bu2.text) || Object.assign(Bu2, { noexpand: true, treatAsRelax: true });
  Au2 = {};
  var Cu2 = [];
  Cu2.push(Bu2);
  Object.assign(Au2, { tokens: Cu2, numArgs: 0 });
  return Au2;
});
Au("\\expandafter", (Au2) => {
  let Cu2 = Au2.popToken();
  Au2.expandOnce(true);
  Au2 = {};
  let Bu2 = [];
  Bu2.push(Cu2);
  Object.assign(Au2, { tokens: Bu2, numArgs: 0 });
  return Au2;
});
Au("\\@firstoftwo", (Au2) => {
  let Bu2 = {};
  Object.assign(Bu2, { tokens: Au2.consumeArgs(2)[0], numArgs: 0 });
  return Bu2;
});
Au("\\@secondoftwo", (Au2) => {
  let Bu2 = {};
  Object.assign(Bu2, { tokens: Au2.consumeArgs(2)[1], numArgs: 0 });
  return Bu2;
});
Au("\\@ifnextchar", Qe);
Au("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
Au("\\TextOrMath", Re);
Cu = {};
Object.assign(Cu, { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 });
_a2 = Cu;
Au("\\char", (Au2) => {
  var Bu2 = Au2.popToken();
  var Du2 = void 0;
  var Cu2 = Bu2.text;
  if (Cu2 === Cj) {
    Bu2 = Au2.popToken();
    Du2 = 8;
    Cu2 = lh;
  } else {
    Cu2 = Bu2.text;
    if (Cu2 === pj) {
      Bu2 = Au2.popToken();
      Du2 = 16;
      Cu2 = lh;
    } else {
      Cu2 = Bu2.text;
      if ("`" === Cu2) {
        Bu2 = Au2.popToken();
        Cu2 = Bu2.text[0];
        if (Cu2 === Lm) {
          Cu2 = Bu2.text.charCodeAt(1);
        } else {
          Cu2 = Bu2.text;
          if (Cu2 === fk) {
            throw new c("\\char` missing argument");
          } else {
            Cu2 = Bu2.text.charCodeAt(0);
          }
        }
      } else {
        Du2 = 10;
        Cu2 = lh;
      }
    }
  }
  if (Du2) {
    Cu2 = _a2;
    Cu2 = Cu2[Bu2.text];
    var Eu2;
    if (Cu2 == null || Cu2 >= Du2) {
      Au2 = c;
      Cu2 = "Invalid base-" + Du2 + " digit ";
      throw new Au2(Cu2 + Bu2.text + "");
    }
    Bu2 = _a2;
    Bu2 = Bu2[Au2.future().text];
    while (!(Bu2 == null) && Bu2 < Du2) {
      Cu2 = +Cu2 * +Du2 + Bu2;
      Au2.popToken();
      Bu2 = _a2;
      Bu2 = Bu2[Au2.future().text];
    }
  }
  return "\\@char{" + Cu2 + oo;
});
$a = (Au2, Bu2, Cu2, Du2) => {
  var Eu2 = Au2.consumeArg().tokens;
  var Fu2 = Eu2.length;
  if (1 !== Fu2) throw new c("\\newcommand's first argument must be a macro name");
  Eu2 = Eu2[0];
  Eu2 = Eu2.text;
  Fu2 = Au2.isDefined(Eu2);
  if (Fu2 && !Bu2) {
    Au2 = c;
    Bu2 = "\\newcommand{" + Eu2 + "} attempting to redefine ";
    throw new Au2(Bu2 + (Eu2 + "; use \\renewcommand"));
  }
  if (!Fu2 && !Cu2) {
    Au2 = c;
    throw new Au2("\\renewcommand{" + Eu2 + "} when command " + Eu2 + Wi + "does not yet exist; use \\newcommand");
  }
  Bu2 = Au2.consumeArg().tokens;
  Cu2 = Bu2.length;
  1 === Cu2 ? (Cu2 = Bu2[0], Cu2 = Cu2.text, Cu2 = Cu2 === pp) : Cu2 = false;
  if (Cu2) {
    Bu2 = Au2.expandNextToken();
    Cu2 = lh;
    while (Bu2.text !== Km && Bu2.text !== fk) {
      Cu2 = Cu2 + Bu2.text;
      Bu2 = Au2.expandNextToken();
    }
    if (!Cu2.match(new RegExp("^\\s*[0-9]+\\s*$", lh))) throw new c("Invalid number of arguments: " + Cu2);
    var Gu2 = parseInt(Cu2);
    Bu2 = Au2.consumeArg().tokens;
  } else {
    Gu2 = 0;
  }
  Cu2 = !!Fu2 && !!Du2;
  Cu2 || (Cu2 = {}, Object.assign(Cu2, { tokens: Bu2, numArgs: Gu2 }), Au2 = Au2.macros, Au2.set(Eu2, Cu2));
  return lh;
};
Au("\\newcommand", (Au2) => $a(Au2, false, true, false));
Au("\\renewcommand", (Au2) => $a(Au2, true, false, false));
Au("\\providecommand", (Au2) => $a(Au2, true, true, true));
Au("\\message", (Au2) => {
  Au2 = Au2.consumeArgs(1)[0];
  var Cu2 = Au2.reverse().map((Au3) => Au3.text).join(lh);
  Au2 = globalThis.console;
  var Bu2;
  !(Au2 === void 0) && !(Au2 == null) && Au2.log(Cu2);
  return lh;
});
Au("\\errmessage", (Au2) => {
  Au2 = Au2.consumeArgs(1)[0];
  var Cu2 = Au2.reverse().map((Au3) => Au3.text).join(lh);
  Au2 = globalThis.console;
  var Bu2;
  !(Au2 === void 0) && !(Au2 == null) && Au2.error(Cu2);
  return lh;
});
Au("\\show", (Au2) => {
  var Du2 = Au2.popToken();
  var Bu2 = Du2.text;
  var Cu2 = globalThis.console;
  var Eu2;
  if (!(Cu2 === void 0) && !(Cu2 == null)) {
    Au2 = Au2.macros;
    Au2 = Au2.get(Bu2);
    Eu2 = R[Bu2];
    var Fu2 = o.math[Bu2];
    Cu2.log(Du2, Au2, Eu2, Fu2, o.text[Bu2]);
  }
  return lh;
});
Au("\\bgroup", pn);
Au("\\egroup", oo);
Au(ft, lq);
Au("\\lq", "`");
Au("\\rq", Cj);
Au("\\aa", "\\r a");
Au("\\AA", "\\r A");
Au("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xA9}");
Eu = "\\copyright";
Au(Eu, "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
Cu = "\\textregistered";
Au(Cu, "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");
Au("\u212C", "\\mathscr{B}");
Au("\u2130", "\\mathscr{E}");
Au("\u2131", "\\mathscr{F}");
Au("\u210B", "\\mathscr{H}");
Au("\u2110", "\\mathscr{I}");
Au("\u2112", "\\mathscr{L}");
Au("\u2133", "\\mathscr{M}");
Au("\u211B", "\\mathscr{R}");
Au("\u212D", "\\mathfrak{C}");
Au("\u210C", "\\mathfrak{H}");
Au("\u2128", "\\mathfrak{Z}");
Au("\\Bbbk", "\\Bbb{k}");
Au("\xB7", "\\cdotp");
Au("\\llap", "\\mathllap{\\textrm{#1}}");
Au("\\rlap", "\\mathrlap{\\textrm{#1}}");
Au("\\clap", "\\mathclap{\\textrm{#1}}");
Au("\\mathstrut", "\\vphantom{(}");
Au("\\underbar", "\\underline{\\text{#1}}");
Au("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
Du = "\\neq";
Au(Du, "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");
Au("\\ne", Du);
Au("\u2260", Du);
Au("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");
Au("\u2209", "\\notin");
Du = "\\html@mathml{";
Au("\u2258", Du + "\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");
Au("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
Au("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
Au("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");
Au("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");
Au("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");
Au("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");
Au("\u27C2", "\\perp");
Au("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
Au("\u220C", "\\notni");
Fu = "\\ulcorner";
Au("\u231C", Fu);
Gu = "\\urcorner";
Au("\u231D", Gu);
cv = "\\llcorner";
Au("\u231E", cv);
dv = "\\lrcorner";
Au("\u231F", dv);
Au("\xA9", Eu);
Au("\xAE", Cu);
Au("\uFE0F", Cu);
Au(Fu, '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
Au(Gu, '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
Au(cv, '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
Au(dv, '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
Au("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
Au("\u22EE", "\\vdots");
Au("\\varGamma", "\\mathit{\\Gamma}");
Au("\\varDelta", "\\mathit{\\Delta}");
Au("\\varTheta", "\\mathit{\\Theta}");
Au("\\varLambda", "\\mathit{\\Lambda}");
Au("\\varXi", "\\mathit{\\Xi}");
Au("\\varPi", "\\mathit{\\Pi}");
Au("\\varSigma", "\\mathit{\\Sigma}");
Au("\\varUpsilon", "\\mathit{\\Upsilon}");
Au("\\varPhi", "\\mathit{\\Phi}");
Au("\\varPsi", "\\mathit{\\Psi}");
Au("\\varOmega", "\\mathit{\\Omega}");
Au("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
Au("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
Au("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
Au("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
Au("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
Au("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
Au("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
Au("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
Cu = {};
Object.assign(Cu, { ",": "\\dotsc", "\\not": wp, "+": wp, "=": wp, "<": wp, ">": wp, "-": wp, "*": wp, ":": wp, "\\DOTSB": wp, "\\coprod": wp, "\\bigvee": wp, "\\bigwedge": wp, "\\biguplus": wp, "\\bigcap": wp, "\\bigcup": wp, "\\prod": wp, "\\sum": wp, "\\bigotimes": wp, "\\bigoplus": wp, "\\bigodot": wp, "\\bigsqcup": wp, "\\And": wp, "\\longrightarrow": wp, "\\Longrightarrow": wp, "\\longleftarrow": wp, "\\Longleftarrow": wp, "\\longleftrightarrow": wp, "\\Longleftrightarrow": wp, "\\mapsto": wp, "\\longmapsto": wp, "\\hookrightarrow": wp, "\\doteq": wp, "\\mathbin": wp, "\\mathrel": wp, "\\relbar": wp, "\\Relbar": wp, "\\xrightarrow": wp, "\\xleftarrow": wp });
Eu = "\\dotsi";
Object.assign(Cu, { "\\DOTSI": Eu, "\\int": Eu, "\\oint": Eu, "\\iint": Eu, "\\iiint": Eu, "\\iiiint": Eu, "\\idotsint": Eu, "\\DOTSX": "\\dotsx" });
bc = Cu;
Au("\\dots", (Au2) => {
  Au2 = Au2.expandAfterFuture().text;
  if (Au2 in bc) {
    Au2 = bc[Au2];
  } else {
    if ("\\not" === Au2.slice(0, 4)) {
      Au2 = wp;
    } else {
      if (Au2 in o.math) {
        var Bu2 = [];
        Bu2.push(tr);
        Bu2.push(wr);
        var Cu2 = i;
        Au2 = o.math[Au2];
        Au2 = Cu2.contains(Bu2, Au2.group) ? wp : "\\dotso";
      } else {
        Au2 = "\\dotso";
      }
    }
  }
  return Au2;
});
Cu = {};
Object.assign(Cu, { ")": Bu, "]": Bu, "\\rbrack": Bu, "\\}": Bu, "\\rbrace": Bu, "\\rangle": Bu, "\\rceil": Bu, "\\rfloor": Bu, "\\rgroup": Bu, "\\rmoustache": Bu, "\\right": Bu, "\\bigr": Bu, "\\biggr": Bu, "\\Bigr": Bu, "\\Biggr": Bu, $: Bu, ";": Bu, ".": Bu, ",": Bu });
ab = Cu;
Au("\\dotso", Se);
Au("\\dotsc", Te);
Cu = "\\cdots";
Au(Cu, Ue);
Au(wp, Cu);
Au("\\dotsm", Cu);
Au(Eu, "\\!\\cdots");
Au("\\dotsx", rn);
Au("\\DOTSI", Cp);
Au("\\DOTSB", Cp);
Au("\\DOTSX", Cp);
Au("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
Au("\\,", "\\tmspace+{3mu}{.1667em}");
Au("\\thinspace", "\\,");
Au("\\>", "\\mskip{4mu}");
Au("\\:", "\\tmspace+{4mu}{.2222em}");
Au("\\medspace", "\\:");
Au("\\;", "\\tmspace+{5mu}{.2777em}");
Au("\\thickspace", "\\;");
Au("\\!", "\\tmspace-{3mu}{.1667em}");
Au("\\negthinspace", "\\!");
Au("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
Au("\\negthickspace", "\\tmspace-{5mu}{.277em}");
Au("\\enspace", "\\kern.5em ");
Au("\\enskip", "\\hskip.5em\\relax");
Au("\\quad", "\\hskip1em\\relax");
Au("\\qquad", "\\hskip2em\\relax");
Au("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
Au("\\tag@paren", "\\tag@literal{({#1})}");
Au("\\tag@literal", (Au2) => {
  if (Au2.macros.get(Ik)) throw new c("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
Cu = "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}";
Au("\\bmod", Cu + "\\mathbin{\\rm mod}" + Cu);
Au("\\pod", cr + "\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
Au("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
Au("\\mod", cr + "\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
Au("\\newline", $m);
Cu = "\\textrm{\\html@mathml{";
Au("\\TeX", Cu + "T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
Eu = d;
Fu = N["Main-Regular"];
Fu = +Fu["T".charCodeAt(0)][1];
Gu = 0.7;
Eu = Eu(Fu - +(Gu * +N["Main-Regular"]["A".charCodeAt(0)][1]));
Gu = "L\\kern-.36em\\raisebox{" + Eu;
Fu = "}{\\scriptstyle A}";
Au("\\LaTeX", Cu + (Gu + Fu) + "\\kern-.15em\\TeX}{LaTeX}}");
Au("\\KaTeX", Cu + ("K\\kern-.17em\\raisebox{" + Eu + Fu) + "\\kern-.15em\\TeX}{KaTeX}}");
Au("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
Au("\\@hspace", "\\hskip #1\\relax");
Au("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
Au("\\ordinarycolon", op);
Su = "\\vcentcolon";
Au(Su, "\\mathrel{\\mathop\\ordinarycolon}");
Cu = "\\dblcolon";
Au(Cu, Du + '\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
Eu = "\\coloneqq";
Au(Eu, Du + '\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
Fu = "\\Coloneqq";
Au(Fu, Du + '\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
Tu = "\\coloneq";
Au(Tu, Du + '\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
Uu = "\\Coloneq";
Au(Uu, Du + '\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
Gu = "\\eqqcolon";
Au(Gu, Du + '\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
Vu = "\\Eqqcolon";
Au(Vu, Du + '\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
Hu = "\\eqcolon";
Au(Hu, Du + '\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
Xu = "\\Eqcolon";
Au(Xu, Du + '\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
Au("\\colonapprox", Du + '\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
Yu = "\\Colonapprox";
Au(Yu, Du + '\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
Au("\\colonsim", Du + '\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
Zu = "\\Colonsim";
Au(Zu, Du + '\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
Au("\u2237", Cu);
Au("\u2239", Hu);
Au("\u2254", Eu);
Au("\u2255", Gu);
Au("\u2A74", Fu);
Au("\\ratio", Su);
Au("\\coloncolon", Cu);
Au("\\colonequals", Eu);
Au("\\coloncolonequals", Fu);
Au("\\equalscolon", Gu);
Au("\\equalscoloncolon", Vu);
Au("\\colonminus", Tu);
Au("\\coloncolonminus", Uu);
Au("\\minuscolon", Hu);
Au("\\minuscoloncolon", Xu);
Au("\\coloncolonapprox", Yu);
Au("\\coloncolonsim", Zu);
Au("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
Au("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
Au("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
Au("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
Au("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
Au("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
Au("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
Au("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
Au("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
Au("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
Au("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
Au("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
Au("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
Au("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
Au("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
Au("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
Au("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
Au("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
Au("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
Au("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}");
Au("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}");
Au("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
Au("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
Au("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228A}");
Au("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2ACB}");
Au("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228B}");
Au("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2ACC}");
Au("\\imath", "\\html@mathml{\\@imath}{\u0131}");
Au("\\jmath", "\\html@mathml{\\@jmath}{\u0237}");
Cu = "\\llbracket";
Au(Cu, Du + "\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");
Eu = "\\rrbracket";
Au(Eu, Du + "\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");
Au("\u27E6", Cu);
Au("\u27E7", Eu);
Cu = "\\lBrace";
Au(Cu, Du + "\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");
Eu = "\\rBrace";
Au(Eu, Du + "\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");
Au("\u2983", Cu);
Au("\u2984", Eu);
Cu = "\\minuso";
Au(Cu, "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}");
Au("\u29B5", Cu);
Au("\\darr", vj);
Au("\\dArr", Mk);
Au("\\Darr", Mk);
Au("\\lang", im);
Au("\\rang", km);
Au("\\uarr", ok3);
Au("\\uArr", Ll);
Au("\\Uarr", Ll);
Du = "\\mathbb{N}";
Au("\\N", Du);
Cu = "\\mathbb{R}";
Au("\\R", Cu);
Au("\\Z", "\\mathbb{Z}");
Au("\\alef", "\\aleph");
Au("\\alefsym", "\\aleph");
Au("\\Alpha", "\\mathrm{A}");
Au("\\Beta", "\\mathrm{B}");
Au("\\bull", Zt);
Au("\\Chi", "\\mathrm{X}");
Au("\\clubs", Cs);
Eu = "\\mathbb{C}";
Au("\\cnums", Eu);
Au("\\Complex", Eu);
Au("\\Dagger", st);
Au("\\diamonds", Nq);
Au("\\empty", Es);
Au("\\Epsilon", "\\mathrm{E}");
Au("\\Eta", "\\mathrm{H}");
Au("\\exist", bu);
Au("\\harr", dp);
Au("\\hArr", _o);
Au("\\Harr", _o);
Au("\\hearts", Zr);
Au("\\image", "\\Im");
Au("\\infin", "\\infty");
Au("\\Iota", "\\mathrm{I}");
Au("\\isin", "\\in");
Au("\\Kappa", "\\mathrm{K}");
Au("\\larr", _r);
Au("\\lArr", Vr);
Au("\\Larr", Vr);
Au("\\lrarr", dp);
Au("\\lrArr", _o);
Au("\\Lrarr", _o);
Au("\\Mu", "\\mathrm{M}");
Au("\\natnums", Du);
Au("\\Nu", "\\mathrm{N}");
Au("\\Omicron", "\\mathrm{O}");
Au("\\plusmn", "\\pm");
Au("\\rarr", fr);
Au("\\rArr", ar);
Au("\\Rarr", ar);
Au("\\real", "\\Re");
Au("\\reals", Cu);
Au("\\Reals", Cu);
Au("\\Rho", "\\mathrm{P}");
Au("\\sdot", "\\cdot");
Au("\\sect", "\\S");
Au("\\spades", $r);
Au("\\sub", eu);
Au("\\sube", Js);
Au("\\supe", Ks);
Au("\\Tau", "\\mathrm{T}");
Au("\\thetasym", Ls);
Au("\\weierp", "\\wp");
Au("\\Zeta", "\\mathrm{Z}");
Au("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
Au("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
Au("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
Au("\\bra", "\\mathinner{\\langle{#1}|}");
Au("\\ket", "\\mathinner{|{#1}\\rangle}");
Au("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
Au("\\Bra", "\\left\\langle#1\\right|");
Au("\\Ket", "\\left|#1\\right\\rangle");
Cu = (Au2) => (Cu2) => Ve(Au2, Cu2);
Au("\\bra@ket", Cu(false));
Au("\\bra@set", Cu(Bu));
Au("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
Au("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
Au("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
Au("\\angln", "{\\angl n}");
Au("\\blue", "\\textcolor{##6495ed}{#1}");
Au("\\orange", "\\textcolor{##ffa500}{#1}");
Au("\\pink", "\\textcolor{##ff00af}{#1}");
Au("\\red", "\\textcolor{##df0030}{#1}");
Au("\\green", "\\textcolor{##28ae7b}{#1}");
Au("\\gray", "\\textcolor{gray}{#1}");
Au("\\purple", "\\textcolor{##9d38bd}{#1}");
Au("\\blueA", "\\textcolor{##ccfaff}{#1}");
Au("\\blueB", "\\textcolor{##80f6ff}{#1}");
Au("\\blueC", "\\textcolor{##63d9ea}{#1}");
Au("\\blueD", "\\textcolor{##11accd}{#1}");
Au("\\blueE", "\\textcolor{##0c7f99}{#1}");
Au("\\tealA", "\\textcolor{##94fff5}{#1}");
Au("\\tealB", "\\textcolor{##26edd5}{#1}");
Au("\\tealC", "\\textcolor{##01d1c1}{#1}");
Au("\\tealD", "\\textcolor{##01a995}{#1}");
Au("\\tealE", "\\textcolor{##208170}{#1}");
Au("\\greenA", "\\textcolor{##b6ffb0}{#1}");
Au("\\greenB", "\\textcolor{##8af281}{#1}");
Au("\\greenC", "\\textcolor{##74cf70}{#1}");
Au("\\greenD", "\\textcolor{##1fab54}{#1}");
Au("\\greenE", "\\textcolor{##0d923f}{#1}");
Au("\\goldA", "\\textcolor{##ffd0a9}{#1}");
Au("\\goldB", "\\textcolor{##ffbb71}{#1}");
Au("\\goldC", "\\textcolor{##ff9c39}{#1}");
Au("\\goldD", "\\textcolor{##e07d10}{#1}");
Au("\\goldE", "\\textcolor{##a75a05}{#1}");
Au("\\redA", "\\textcolor{##fca9a9}{#1}");
Au("\\redB", "\\textcolor{##ff8482}{#1}");
Au("\\redC", "\\textcolor{##f9685d}{#1}");
Au("\\redD", "\\textcolor{##e84d39}{#1}");
Au("\\redE", "\\textcolor{##bc2612}{#1}");
Au("\\maroonA", "\\textcolor{##ffbde0}{#1}");
Au("\\maroonB", "\\textcolor{##ff92c6}{#1}");
Au("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
Au("\\maroonD", "\\textcolor{##ca337c}{#1}");
Au("\\maroonE", "\\textcolor{##9e034e}{#1}");
Au("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
Au("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
Au("\\purpleC", "\\textcolor{##aa87ff}{#1}");
Au("\\purpleD", "\\textcolor{##7854ab}{#1}");
Au("\\purpleE", "\\textcolor{##543b78}{#1}");
Au("\\mintA", "\\textcolor{##f5f9e8}{#1}");
Au("\\mintB", "\\textcolor{##edf2df}{#1}");
Au("\\mintC", "\\textcolor{##e0e5cc}{#1}");
Au("\\grayA", "\\textcolor{##f6f7f7}{#1}");
Au("\\grayB", "\\textcolor{##f0f1f2}{#1}");
Au("\\grayC", "\\textcolor{##e3e5e6}{#1}");
Au("\\grayD", "\\textcolor{##d6d8da}{#1}");
Au("\\grayE", "\\textcolor{##babec2}{#1}");
Au("\\grayF", "\\textcolor{##888d93}{#1}");
Au("\\grayG", "\\textcolor{##626569}{#1}");
Au("\\grayH", "\\textcolor{##3b3e40}{#1}");
Au("\\grayI", "\\textcolor{##21242c}{#1}");
Au("\\kaBlue", "\\textcolor{##314453}{#1}");
Au("\\kaGreen", "\\textcolor{##71B307}{#1}");
var cc = void 0;
var q = void 0;
Au = {};
Object.assign(Au, { "^": Bu, g: Bu, "\\limits": Bu, "\\nolimits": Bu });
cc = Au;
q = (0, function(Du2, Cu2, Bu2) {
  this.settings = Cu2;
  this.expansionCount = 0;
  this.feed(Du2);
  this.macros = new S(yd, Cu2.macros);
  this.mode = Bu2;
  this.stack = [];
  return this;
});
Au = q.prototype;
Au.feed = function(Bu2) {
  this.lexer = new ua(Bu2, this.settings);
};
Au = q.prototype;
Au.switchMode = function(Bu2) {
  this.mode = Bu2;
};
Au = q.prototype;
Au.beginGroup = function() {
  let Au2 = this.macros;
  Au2.beginGroup();
};
Au = q.prototype;
Au.endGroup = function() {
  let Au2 = this.macros;
  Au2.endGroup();
};
Au = q.prototype;
Au.endGroups = function() {
  let Au2 = this.macros;
  Au2.endGroups();
};
Au = q.prototype;
Au.future = function() {
  var Bu2 = this.stack;
  Bu2 = Bu2.length;
  0 === Bu2 && (Bu2 = this.lexer, this.pushToken(Bu2.lex()));
  Bu2 = this.stack;
  var Au2 = this.stack;
  Au2 = Au2.length;
  return Bu2[Au2 - 1];
};
Au = q.prototype;
Au.popToken = function() {
  this.future();
  let Au2 = this.stack;
  return Au2.pop();
};
Au = q.prototype;
Au.pushToken = function(Bu2) {
  let Au2 = this.stack;
  Au2.push(Bu2);
};
Au = q.prototype;
Au.pushTokens = function(Bu2) {
  X(this.stack, Bu2);
};
Au = q.prototype;
Au.scanArgument = function(Bu2) {
  if (Bu2) {
    this.consumeSpaces();
    Bu2 = this.future().text;
    if (Bu2 !== pp) return null;
    var Cu2 = this.popToken();
    Bu2 = [];
    Bu2.push(Km);
    Bu2 = this.consumeArg(Bu2);
    var Du2 = Bu2.tokens;
    Bu2 = Bu2.end;
  } else {
    Bu2 = this.consumeArg();
    Du2 = Bu2.tokens;
    Cu2 = Bu2.start;
    Bu2 = Bu2.end;
  }
  this.pushToken(new D(fk, Bu2.loc));
  this.pushTokens(Du2);
  return Cu2.range(Bu2, lh);
};
Au = q.prototype;
Au.consumeSpaces = function() {
  while (true) {
    var Bu2 = this.future().text;
    if (Bu2 === Wi) {
      Bu2 = this.stack;
      Bu2.pop();
    } else {
      break;
    }
  }
};
Au = q.prototype;
Au.consumeArg = function(Bu2) {
  var Fu2 = [];
  if (Bu2) {
    var Cu2 = Bu2.length;
    var Gu2 = Cu2 > 0;
  } else {
    Gu2 = Bu2;
  }
  Gu2 || this.consumeSpaces();
  var Iu2 = this.future();
  var Cu2 = void 0, Du2 = 0, Eu2 = 0, Hu2, Au2;
  while (true) {
    Cu2 = this.popToken();
    Fu2.push(Cu2);
    Hu2 = Cu2.text;
    if (Hu2 === pn) {
      Du2 = Du2 + 1;
    } else {
      Hu2 = Cu2.text;
      if (Hu2 === oo) {
        Du2 = Du2 + -1;
        if (Du2 === 0 - 1) throw new c("Extra }", Cu2);
      } else {
        Hu2 = Cu2.text;
        if (Hu2 === fk) {
          Au2 = Bu2 && Gu2 ? Bu2[Eu2] : oo;
          Bu2 = c;
          throw new Bu2("Unexpected end of input in a macro argument, expected '" + Au2 + Cj, Cu2);
        }
      }
    }
    if (Bu2 && Gu2) {
      0 === Du2 || 1 === Du2 && Bu2[Eu2] === pn ? (Hu2 = Cu2.text, Hu2 = Hu2 === Bu2[Eu2]) : Hu2 = false;
      if (Hu2) {
        Eu2 = Eu2 + 1;
        if (Eu2 === Bu2.length) {
          Fu2.splice(0 - +Eu2, Eu2);
          break;
        }
      } else {
        Eu2 = 0;
      }
    }
    Hu2 = 0 !== Du2 || !!Gu2;
    if (!Hu2) break;
  }
  Au2 = Iu2.text;
  Au2 === pn ? (Au2 = Fu2.length, Au2 = Fu2[Au2 - 1], Au2 = Au2.text, Au2 = Au2 === oo) : Au2 = false;
  Au2 && (Fu2.pop(), Fu2.shift());
  Fu2.reverse();
  Au2 = {};
  Object.assign(Au2, { tokens: Fu2, start: Iu2, end: Cu2 });
  return Au2;
};
Au = q.prototype;
Au.consumeArgs = function(Bu2, Cu2) {
  if (Cu2) {
    var Du2 = Cu2.length;
    if (Du2 !== Bu2 + 1) throw new c("The length of delimiters doesn't match the number of args!");
    var Eu2 = Cu2[0];
    Du2 = 0;
    while (Du2 < Eu2.length) {
      var Fu2 = this.popToken();
      var Gu2 = Eu2[Du2];
      if (Gu2 !== Fu2.text) throw new c("Use of the macro doesn't match its definition", Fu2);
      Du2 = Du2 + 1;
    }
  }
  Fu2 = [];
  Du2 = 0;
  while (Du2 < Bu2) {
    Eu2 = Cu2 ? Cu2[Du2 + 1] : Cu2;
    Fu2.push(this.consumeArg(Eu2).tokens);
    Du2 = Du2 + 1;
  }
  return Fu2;
};
Au = q.prototype;
Au.countExpansion = function(Bu2) {
  this.expansionCount = this.expansionCount + Bu2;
  Bu2 = this.expansionCount;
  var Au2 = this.settings;
  if (Bu2 > Au2.maxExpand) throw new c("Too many expansions: infinite loop or need to increase maxExpand setting");
};
Au = q.prototype;
Au.expandOnce = function(Bu2) {
  var Eu2 = this.popToken();
  var Cu2 = Eu2.text;
  var Du2 = !Eu2.noexpand ? this._getExpansion(Cu2) : null;
  var Fu2;
  if (Du2 == null || Bu2 && !!Du2.unexpandable) {
    if (Bu2 && Du2 == null && Cu2[0] === Lm && !this.isDefined(Cu2)) throw new c(Yl + Cu2);
    this.pushToken(Eu2);
    return false;
  }
  this.countExpansion(1);
  Cu2 = Du2.tokens;
  Eu2 = this.consumeArgs(Du2.numArgs, Du2.delimiters);
  if (Du2.numArgs) {
    Cu2 = Cu2.slice();
    Bu2 = Cu2.length;
    Bu2 = Bu2 - 1;
    while (Bu2 >= 0) {
      Du2 = Cu2[Bu2];
      Fu2 = Du2.text;
      if (Fu2 === uq) {
        if (0 === Bu2) throw new c("Incomplete placeholder at end of macro body", Du2);
        Bu2 = Bu2 + -1;
        Du2 = Cu2[Bu2];
        Fu2 = Du2.text;
        if (Fu2 === uq) {
          Cu2.splice(Bu2 + 1, 1);
        } else {
          if (new RegExp("^[1-9]$", lh).test(Du2.text)) {
            Du2 = +Du2.text;
            Hd(Cu2, Bu2, Eu2[Du2 - 1]);
          } else {
            throw new c("Not a valid argument number", Du2);
          }
        }
      }
      Bu2 = Bu2 + -1;
    }
  }
  this.pushTokens(Cu2);
  return Cu2.length;
};
Au = q.prototype;
Au.expandAfterFuture = function() {
  this.expandOnce();
  return this.future();
};
Au = q.prototype;
Au.expandNextToken = function() {
  while (true) {
    if (false === this.expandOnce()) {
      var Au2 = this.stack;
      Au2 = Au2.pop();
      !Au2.treatAsRelax || (Au2.text = Cp);
      return Au2;
    }
  }
};
Au = q.prototype;
Au.expandMacro = function(Bu2) {
  var Cu2 = this.macros;
  if (Cu2.has(Bu2)) {
    Cu2 = [];
    Cu2.push(new D(Bu2));
    var Au2 = this.expandTokens(Cu2);
  } else {
    Au2 = void 0;
  }
  return Au2;
};
Au = q.prototype;
Au.expandTokens = function(Bu2) {
  var Cu2 = [];
  var Du2 = this.stack;
  Du2 = Du2.length;
  this.pushTokens(Bu2);
  for (; ; ) {
    Bu2 = this.stack;
    if (Bu2.length <= Du2) {
      break;
    }
    false === this.expandOnce(true) && (Bu2 = this.stack, Bu2 = Bu2.pop(), !Bu2.treatAsRelax || Object.assign(Bu2, { noexpand: false, treatAsRelax: false }), Cu2.push(Bu2));
  }
  this.countExpansion(Cu2.length);
  return Cu2;
};
Au = q.prototype;
Au.expandMacroAsText = W(We);
Au = q.prototype;
Au._getExpansion = function(Bu2) {
  var Cu2 = this.macros;
  Cu2 = Cu2.get(Bu2);
  if (Cu2 == null) return Cu2;
  var Du2 = Bu2.length;
  if (1 === Du2) {
    Du2 = this.lexer;
    Bu2 = Du2.catcodes[Bu2];
    if (!(Bu2 == null) && 13 !== Bu2) return;
  }
  typeof Cu2 === Zi && (Cu2 = Cu2(this));
  if (typeof Cu2 === mh) {
    Bu2 = Cu2.indexOf(uq);
    Du2 = 0;
    if (Bu2 !== Du2 - 1) {
      Du2 = Cu2.replace(new RegExp("##", nr), lh);
      Bu2 = 0;
      for (; ; ) {
        var Eu2 = Du2.indexOf(uq + (Bu2 + 1));
        if (!(Eu2 !== 0 - 1)) {
          break;
        }
        Bu2 = Bu2 + 1;
      }
    } else {
      Bu2 = 0;
    }
    Du2 = new ua(Cu2, this.settings);
    Cu2 = [];
    var Au2 = Du2.lex();
    for (; ; ) {
      Eu2 = Au2.text;
      if (!(Eu2 !== fk)) {
        break;
      }
      Cu2.push(Au2);
      Au2 = Du2.lex();
    }
    Cu2.reverse();
    Au2 = {};
    Object.assign(Au2, { tokens: Cu2, numArgs: Bu2 });
    return Au2;
  }
  return Cu2;
};
Au = q.prototype;
Au.isDefined = function(Bu2) {
  var Au2 = this.macros;
  Au2 = Au2.has(Bu2);
  Au2 = Au2 || l(R, Bu2);
  Au2 = Au2 || l(o.math, Bu2);
  Au2 = Au2 || l(o.text, Bu2);
  Au2 = Au2 || l(cc, Bu2);
  return Au2;
};
Au = q.prototype;
Au.isExpandable = function(Bu2) {
  var Au2 = this.macros;
  var Cu2 = Au2.get(Bu2);
  !(Cu2 == null) ? (Au2 = typeof Cu2 === mh, Au2 = Au2 || typeof Cu2 === Zi, Au2 = Au2 || !Cu2.unexpandable) : (Au2 = l(R, Bu2), !Au2 || (Au2 = R[Bu2], Au2 = !Au2.primitive));
  return Au2;
};
var dc = void 0;
var va = void 0;
dc = new RegExp("^[\u208A\u208B\u208C\u208D\u208E\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089\u2090\u2091\u2095\u1D62\u2C7C\u2096\u2097\u2098\u2099\u2092\u209A\u1D63\u209B\u209C\u1D64\u1D65\u2093\u1D66\u1D67\u1D68\u1D69\u1D6A]", lh);
Au = {};
Object.assign(Au, { "\u208A": "+", "\u208B": vq, "\u208C": Iu, "\u208D": "(", "\u208E": kr, "\u2080": bt, "\u2081": mr, "\u2082": "2", "\u2083": "3", "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7", "\u2088": "8", "\u2089": "9", "\u2090": "a", "\u2091": "e", "\u2095": "h", "\u1D62": "i", "\u2C7C": "j", "\u2096": "k", "\u2097": "l", "\u2098": et, "\u2099": "n", "\u2092": "o", "\u209A": "p", "\u1D63": "r", "\u209B": "s", "\u209C": "t", "\u1D64": "u", "\u1D65": "v", "\u2093": "x", "\u1D66": "\u03B2", "\u1D67": "\u03B3", "\u1D68": "\u03C1", "\u1D69": "\u03D5", "\u1D6A": "\u03C7", "\u207A": "+", "\u207B": vq, "\u207C": Iu, "\u207D": "(", "\u207E": kr, "\u2070": bt, "\xB9": mr, "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u1D2C": "A", "\u1D2E": "B", "\u1D30": "D", "\u1D31": "E", "\u1D33": "G", "\u1D34": "H", "\u1D35": "I", "\u1D36": "J", "\u1D37": "K", "\u1D38": "L", "\u1D39": "M", "\u1D3A": "N", "\u1D3C": "O", "\u1D3E": "P", "\u1D3F": "R", "\u1D40": "T", "\u1D41": "U", "\u2C7D": "V", "\u1D42": "W", "\u1D43": "a", "\u1D47": "b", "\u1D9C": dt, "\u1D48": "d", "\u1D49": "e", "\u1DA0": "f", "\u1D4D": nr, "\u02B0": "h", "\u2071": "i", "\u02B2": "j", "\u1D4F": "k", "\u02E1": "l", "\u1D50": et, "\u207F": "n", "\u1D52": "o", "\u1D56": "p", "\u02B3": "r", "\u02E2": "s", "\u1D57": "t", "\u1D58": "u", "\u1D5B": "v", "\u02B7": "w", "\u02E3": "x", "\u02B8": "y", "\u1DBB": "z", "\u1D5D": "\u03B2", "\u1D5E": "\u03B3", "\u1D5F": "\u03B4", "\u1D60": "\u03D5", "\u1D61": "\u03C7", "\u1DBF": "\u03B8" });
va = Object.freeze(Au);
var k = {};
Au = "\u0301";
k["\u0301"] = {};
k["\u0301"].text = "\\'";
k["\u0301"].math = Ju;
Au = "\u0300";
k["\u0300"] = {};
k["\u0300"].text = "\\`";
k["\u0300"].math = Ku;
Au = "\u0308";
k["\u0308"] = {};
k["\u0308"].text = '\\"';
k["\u0308"].math = Lu;
Au = "\u0303";
k["\u0303"] = {};
k["\u0303"].text = "\\~";
k["\u0303"].math = Mu;
Au = "\u0304";
k["\u0304"] = {};
k["\u0304"].text = "\\=";
k["\u0304"].math = Nu;
Au = "\u0306";
k["\u0306"] = {};
k["\u0306"].text = "\\u";
k["\u0306"].math = Ou;
Au = "\u030C";
k["\u030C"] = {};
k["\u030C"].text = "\\v";
k["\u030C"].math = Pu;
Au = "\u0302";
k["\u0302"] = {};
k["\u0302"].text = "\\^";
k["\u0302"].math = Qu;
Au = "\u0307";
k["\u0307"] = {};
k["\u0307"].text = "\\.";
k["\u0307"].math = Ru;
Au = "\u030A";
k["\u030A"] = {};
k["\u030A"].text = "\\r";
k["\u030A"].math = Gs;
k["\u030B"] = {};
k["\u030B"].text = "\\H";
k["\u0327"] = {};
k["\u0327"].text = "\\c";
var n = void 0;
n = (0, function(Cu2, Bu2) {
  this.mode = tg;
  this.gullet = new q(Cu2, Bu2, this.mode);
  this.settings = Bu2;
  this.leftrightDepth = 0;
  return this;
});
Au = n.prototype;
Au.expect = function(Bu2, Cu2) {
  Cu2 === void 0 && (Cu2 = true);
  if (this.fetch().text !== Bu2) {
    Cu2 = c;
    Bu2 = "Expected '" + Bu2 + "', got '";
    throw new Cu2(Bu2 + this.fetch().text + "" + Cj, this.fetch());
  }
  !Cu2 || this.consume();
};
Au = n.prototype;
Au.consume = function() {
  this.nextToken = null;
};
Au = n.prototype;
Au.fetch = function() {
  if (this.nextToken == null) {
    var Bu2 = this.gullet;
    this.nextToken = Bu2.expandNextToken();
  }
  return this.nextToken;
};
Au = n.prototype;
Au.switchMode = function(Bu2) {
  this.mode = Bu2;
  let Au2 = this.gullet;
  Au2.switchMode(Bu2);
};
Au = n.prototype;
Au.parse = function() {
  var Bu2 = this.gullet;
  var Cu2 = this.settings;
  Cu2.globalGroup || Bu2.beginGroup();
  Cu2 = this.settings;
  !Cu2.colorIsTextColor || Bu2.macros.set(up, as);
  try {
    var Vu2 = this.parseExpression(false);
    this.expect(fk);
    var Au2 = this.settings;
    Au2.globalGroup || Bu2.endGroup();
    Bu2.endGroups();
    return Vu2;
  } catch (Au3) {
    Bu2.endGroups();
    throw Au3;
  }
};
Au = n.prototype;
Au.subparse = function(Bu2) {
  let Cu2 = this.nextToken;
  this.consume();
  this.gullet.pushToken(new D(oo));
  let Du2 = this.gullet;
  Du2.pushTokens(Bu2);
  Bu2 = this.parseExpression(false);
  this.expect(oo);
  this.nextToken = Cu2;
  return Bu2;
};
Au = n.prototype;
Au.parseExpression = function(Bu2, Cu2) {
  var Eu2 = [];
  while (true) {
    var Du2 = this.mode;
    Du2 === tg && this.consumeSpaces();
    Du2 = this.fetch();
    var Fu2 = n.endOfExpression.indexOf(Du2.text);
    var Gu2 = 0;
    if (Fu2 !== Gu2 - 1) break;
    if (Cu2 && Du2.text === Cu2) break;
    Bu2 ? (Fu2 = R, Fu2 = !!Fu2[Du2.text]) : Fu2 = false;
    Fu2 ? (Fu2 = R, Du2 = Fu2[Du2.text], Du2 = !!Du2.infix) : Du2 = false;
    if (Du2) break;
    Du2 = this.parseAtom(Cu2);
    if (!Du2) {
      break;
    } else {
      Fu2 = Du2.type;
      if (Fu2 === Vh) continue;
    }
    Eu2.push(Du2);
  }
  Bu2 = this.mode;
  Bu2 === yf && this.formLigatures(Eu2);
  return this.handleInfixNodes(Eu2);
};
Au = n.prototype;
Au.handleInfixNodes = W(Xe);
Au = n.prototype;
Au.handleSupSubscript = function(Bu2) {
  var Eu2 = this.fetch();
  var Fu2 = Eu2.text;
  this.consume();
  this.consumeSpaces();
  var Cu2 = void 0, Du2, Au2;
  while (true) {
    Cu2 = this.parseGroup(Bu2);
    Du2 = void 0;
    Cu2 == null || (Du2 = Cu2.type);
    if (!(Du2 === Vh)) break;
  }
  if (!Cu2) {
    Au2 = c;
    throw new Au2("Expected group after '" + Fu2 + Cj, Eu2);
  }
  return Cu2;
};
Au = n.prototype;
Au.formatUnsupportedCmd = function(Bu2) {
  var Eu2 = [];
  var Cu2 = 0, Au2, Du2;
  while (Cu2 < Bu2.length) {
    Du2 = {};
    Object.assign(Du2, { type: bg, mode: yf, text: Bu2[Cu2] });
    Eu2.push(Du2);
    Cu2 = Cu2 + 1;
  }
  Cu2 = {};
  Object.assign(Cu2, { type: yf, mode: this.mode, body: Eu2 });
  Bu2 = {};
  Object.assign(Bu2, { type: Lg, mode: this.mode });
  Au2 = this.settings;
  Bu2.color = Au2.errorColor;
  Au2 = [];
  Au2.push(Cu2);
  Bu2.body = Au2;
  return Bu2;
};
Au = n.prototype;
Au.parseAtom = W(Ye);
Au = n.prototype;
Au.parseFunction = function(Bu2, Cu2) {
  var Eu2 = this.fetch();
  var Du2 = Eu2.text;
  var Fu2 = R[Du2];
  if (!Fu2) return null;
  this.consume();
  if (Cu2 && Cu2 !== gj && !Fu2.allowedInArgument) {
    var Au2 = Cu2 ? " as " + Cu2 : lh;
    Bu2 = c;
    throw new Bu2("Got function '" + Du2 + "' with no arguments" + Au2, Eu2);
  } else {
    Cu2 = this.mode;
    if (Cu2 === yf && !Fu2.allowedInText) {
      Au2 = c;
      throw new Au2(In + Du2 + "' in text mode", Eu2);
    } else {
      if (this.mode === tg && false === Fu2.allowedInMath) {
        Au2 = c;
        throw new Au2(In + Du2 + "' in math mode", Eu2);
      }
    }
  }
  Cu2 = this.parseArguments(Du2, Fu2);
  return this.callFunction(Du2, Cu2.args, Cu2.optArgs, Eu2, Bu2);
};
Au = n.prototype;
Au.callFunction = af(Ze);
Au = n.prototype;
Au.parseArguments = function(Bu2, Cu2) {
  var Du2 = Cu2.numArgs;
  var Hu2 = Du2 + Cu2.numOptionalArgs;
  if (0 === Hu2) {
    var Au2 = {};
    Object.assign(Au2, { args: [], optArgs: [] });
    return Au2;
  }
  var Ju2 = [];
  var Gu2 = [];
  var Eu2 = 0, Iu2, Fu2;
  while (Eu2 < Hu2) {
    Du2 = Cu2.argTypes;
    !Du2 || (Du2 = Cu2.argTypes[Eu2]);
    var Pu2 = Cu2.numOptionalArgs;
    Iu2 = Eu2 < Pu2;
    (Cu2.primitive && Du2 == null || Cu2.type === Xn && 1 === Eu2 && Gu2[0] == null) && (Du2 = jj);
    Du2 = this.parseGroupOfType("argument to '" + Bu2 + Cj, Du2, Iu2);
    if (Iu2) {
      Gu2.push(Du2);
    } else {
      if (!(Du2 == null)) {
        Ju2.push(Du2);
      } else {
        throw new c("Null argument, please report this as a bug");
      }
    }
    Eu2 = Eu2 + 1;
  }
  Au2 = {};
  Object.assign(Au2, { args: Ju2, optArgs: Gu2 });
  return Au2;
};
Au = n.prototype;
Au.parseGroupOfType = $e(_e);
Au = n.prototype;
Au.consumeSpaces = function() {
  for (; ; ) {
    var Bu2 = this.fetch().text;
    if (!(Bu2 === Wi)) {
      break;
    }
    this.consume();
  }
};
Au = n.prototype;
Au.parseStringGroup = function(Bu2, Cu2) {
  Bu2 = this.gullet;
  Cu2 = Bu2.scanArgument(Cu2);
  if (Cu2 == null) return null;
  Bu2 = this.fetch();
  var Du2 = lh, Eu2;
  for (; ; ) {
    Eu2 = Bu2.text;
    if (!(Eu2 !== fk)) {
      break;
    }
    Du2 = Du2 + Bu2.text;
    this.consume();
    Bu2 = this.fetch();
  }
  this.consume();
  Cu2.text = Du2;
  return Cu2;
};
Au = n.prototype;
Au.parseRegexGroup = function(Bu2, Cu2) {
  var Fu2 = this.fetch();
  var Du2 = this.fetch();
  var Hu2 = Fu2, Eu2 = lh, Gu2, Au2;
  for (; ; ) {
    Gu2 = Du2.text;
    Gu2 = Gu2 !== fk && !!Bu2.test(Eu2 + Du2.text);
    if (!Gu2) {
      break;
    }
    Eu2 = Eu2 + Du2.text;
    this.consume();
    Gu2 = this.fetch();
    Hu2 = Du2;
    Du2 = Gu2;
  }
  if (Eu2 === lh) {
    Au2 = c;
    Bu2 = "Invalid " + Cu2 + ": '";
    throw new Au2(Bu2 + Fu2.text + Cj, Fu2);
  }
  return Fu2.range(Hu2, Eu2);
};
Au = n.prototype;
Au.parseColorGroup = function(Bu2) {
  Bu2 = this.parseStringGroup(Lg, Bu2);
  if (Bu2 == null) return null;
  var Cu2 = new RegExp("^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$", "i").exec(Bu2.text);
  if (!Cu2) {
    var Au2 = c;
    throw new Au2("Invalid color: '" + Bu2.text + Cj, Bu2);
  }
  Bu2 = Cu2[0];
  Cu2 = new RegExp("^[0-9a-f]{6}$", "i");
  !Cu2.test(Bu2) || (Bu2 = uq + Bu2);
  Cu2 = {};
  Object.assign(Cu2, { type: yj, mode: this.mode, color: Bu2 });
  return Cu2;
};
Au = n.prototype;
Au.parseSizeGroup = function(Bu2) {
  var Cu2 = this.gullet;
  Cu2.consumeSpaces();
  !Bu2 ? (Cu2 = this.gullet, Cu2 = Cu2.future().text, Cu2 = Cu2 !== pn) : Cu2 = false;
  Cu2 = Cu2 ? this.parseRegexGroup(new RegExp("^[-+]? *(?:$|\\d+|\\d+\\.\\d*|\\.\\d*) *[a-z]{0,2} *$", lh), Of) : this.parseStringGroup(Of, Bu2);
  if (!Cu2) return null;
  !Bu2 ? (Bu2 = Cu2.text, Bu2 = Bu2.length, Bu2 = 0 === Bu2) : Bu2 = false;
  if (Bu2) {
    Cu2.text = "0pt";
    var Fu2 = true, Du2, Au2, Eu2;
  } else {
    Fu2 = false;
  }
  Du2 = new RegExp(Bj, lh).exec(Cu2.text);
  if (!Du2) {
    Au2 = c;
    throw new Au2(Lp + Cu2.text + Cj, Cu2);
  }
  Bu2 = {};
  Eu2 = Du2[1];
  Object.assign(Bu2, { number: +(Eu2 + Du2[2]), unit: Du2[3] });
  if (!gb(Bu2)) {
    Au2 = c;
    throw new Au2(wl + Bu2.unit + Cj, Cu2);
  }
  Cu2 = {};
  Object.assign(Cu2, { type: Of, mode: this.mode, value: Bu2, isBlank: Fu2 });
  return Cu2;
};
Au = n.prototype;
Au.parseUrlGroup = function(Bu2) {
  var Cu2 = this.gullet;
  Cu2 = Cu2.lexer;
  Cu2.setCatcode("%", 13);
  this.gullet.lexer.setCatcode(ft, 12);
  Bu2 = this.parseStringGroup(Ck, Bu2);
  this.gullet.lexer.setCatcode("%", 14);
  this.gullet.lexer.setCatcode(ft, 13);
  if (Bu2 == null) return null;
  Cu2 = Bu2.text.replace(new RegExp("\\\\([#$%&~_^{}])", nr), "$1");
  Bu2 = {};
  Object.assign(Bu2, { type: Ck, mode: this.mode, url: Cu2 });
  return Bu2;
};
Au = n.prototype;
Au.parseArgumentGroup = function(Bu2, Cu2) {
  var Du2 = this.gullet;
  Du2 = Du2.scanArgument(Bu2);
  if (Du2 == null) return null;
  var Eu2 = this.mode;
  !Cu2 || this.switchMode(Cu2);
  Bu2 = this.gullet;
  Bu2.beginGroup();
  var Fu2 = this.parseExpression(false, fk);
  this.expect(fk);
  Bu2 = this.gullet;
  Bu2.endGroup();
  Bu2 = {};
  Object.assign(Bu2, { type: Xf, mode: this.mode, loc: Du2.loc, body: Fu2 });
  !Cu2 || this.switchMode(Eu2);
  return Bu2;
};
Au = n.prototype;
Au.parseGroup = function(Bu2, Cu2) {
  var Eu2 = this.fetch();
  var Du2 = Eu2.text;
  var Fu2, Au2;
  if (Du2 === pn || Du2 === dr) {
    this.consume();
    Bu2 = Du2 === pn ? oo : Fs;
    Cu2 = this.gullet;
    Cu2.beginGroup();
    Cu2 = this.parseExpression(false, Bu2);
    Fu2 = this.fetch();
    this.expect(Bu2);
    Bu2 = this.gullet;
    Bu2.endGroup();
    Bu2 = {};
    Object.assign(Bu2, { type: Xf, mode: this.mode, loc: A.range(Eu2, Fu2), body: Cu2 });
    Au2 = Du2 === dr;
    Au2 = Au2 || void 0;
    Bu2.semisimple = Au2;
  } else {
    Bu2 = this.parseFunction(Cu2, Bu2);
    Bu2 = Bu2 || this.parseSymbol();
    if (Bu2 == null && Du2[0] === Lm && !l(cc, Du2)) {
      Bu2 = this.settings;
      if (Bu2.throwOnError) throw new c(Yl + Du2, Eu2);
      Bu2 = this.formatUnsupportedCmd(Du2);
      this.consume();
    }
  }
  return Bu2;
};
Au = n.prototype;
Au.formLigatures = function(Bu2) {
  var Au2 = Bu2.length;
  var Cu2 = Au2 - 1;
  Au2 = 0;
  while (Au2 < Cu2) {
    var Fu2 = Bu2[Au2];
    var Du2 = Fu2.text;
    if (Du2 === vq) {
      var Eu2 = Bu2[Au2 + 1];
      Eu2 = Eu2.text;
      Eu2 = Eu2 === vq;
    } else {
      Eu2 = false;
    }
    if (Eu2) {
      Au2 + 1 < Cu2 ? (Eu2 = Bu2[Au2 + 2], Eu2 = Eu2.text, Eu2 = Eu2 === vq) : Eu2 = false;
      if (Eu2) {
        Eu2 = {};
        Object.assign(Eu2, { type: bg, mode: yf });
        var Gu2 = A;
        Object.assign(Eu2, { loc: Gu2.range(Fu2, Bu2[Au2 + 2]), text: "---" });
        Bu2.splice(Au2, 3, Eu2);
        Cu2 = +Cu2 - 2;
      } else {
        Eu2 = {};
        Object.assign(Eu2, { type: bg, mode: yf });
        Gu2 = A;
        Object.assign(Eu2, { loc: Gu2.range(Fu2, Bu2[Au2 + 1]), text: "--" });
        Bu2.splice(Au2, 2, Eu2);
        Cu2 = +Cu2 - 1;
      }
    }
    (Du2 === Cj || "`" === Du2) && Bu2[Au2 + 1].text === Du2 && (Eu2 = {}, Object.assign(Eu2, { type: bg, mode: yf }), Gu2 = A, Object.assign(Eu2, { loc: Gu2.range(Fu2, Bu2[Au2 + 1]), text: Du2 + Du2 }), Bu2.splice(Au2, 2, Eu2), Cu2 = +Cu2 - 1);
    Au2 = Au2 + 1;
  }
};
Au = n.prototype;
Au.parseSymbol = function() {
  var Du2 = this.fetch();
  var Bu2 = Du2.text;
  var Cu2 = new RegExp("^\\\\verb[^a-zA-Z]", lh);
  if (Cu2.test(Bu2)) {
    this.consume();
    var Au2 = Bu2.slice(5);
    Bu2 = Au2.charAt(0) === lr;
    !Bu2 || (Au2 = Au2.slice(1));
    Cu2 = Au2.length;
    Cu2 < 2 ? Cu2 = true : (Cu2 = Au2.charAt(0), Du2 = 0, Cu2 = Cu2 !== Au2.slice(Du2 - 1));
    if (Cu2) throw new c("\\verb assertion failed --\n                    please report what input caused this bug");
    Cu2 = Au2.slice(1, 0 - 1);
    Au2 = {};
    Object.assign(Au2, { type: "verb", mode: yf, body: Cu2, star: Bu2 });
    return Au2;
  }
  Cu2 = Ac;
  l(Cu2, Bu2[0]) ? (Cu2 = o, Cu2 = Cu2[this.mode], Cu2 = !Cu2[Bu2[0]]) : Cu2 = false;
  Cu2 && (this.settings.strict && this.mode === tg && (Cu2 = this.settings, Cu2.reportNonstrict(Sj, 'Accented Unicode text character "' + Bu2[0] + Ur + Et, Du2)), Cu2 = Ac, Cu2 = Cu2[Bu2[0]], Bu2 = Cu2 + Bu2.slice(1));
  var Eu2 = wd.exec(Bu2);
  !Eu2 || (Bu2 = Bu2.substring(0, Eu2.index), "i" === Bu2 ? Bu2 = "\u0131" : "j" === Bu2 && (Bu2 = "\u0237"));
  Cu2 = o;
  if (Cu2[this.mode][Bu2]) {
    this.settings.strict && this.mode === tg && Da.indexOf(Bu2) >= 0 && (Cu2 = this.settings, Cu2.reportNonstrict(Sj, 'Latin-1/Unicode text character "' + Bu2[0] + Ur + Et, Du2));
    Cu2 = o;
    Cu2 = Cu2[this.mode][Bu2];
    var Fu2 = Cu2.group;
    var Gu2 = A.range(Du2);
    l(Hc, Fu2) ? (Cu2 = {}, Object.assign(Cu2, { type: gj, mode: this.mode, family: Fu2, loc: Gu2, text: Bu2 })) : (Cu2 = {}, Object.assign(Cu2, { type: Fu2, mode: this.mode, loc: Gu2, text: Bu2 }));
  } else {
    if (Bu2.charCodeAt(0) >= 128) {
      Cu2 = this.settings;
      if (Cu2.strict) {
        if (!bb(Bu2.charCodeAt(0))) {
          Cu2 = this.settings;
          Fu2 = 'Unrecognized Unicode character "' + Bu2[0] + pj;
          Cu2.reportNonstrict("unknownSymbol", Fu2 + (" (" + Bu2.charCodeAt(0) + kr), Du2);
        } else {
          var zw = void 0;
          Cu2 = this.mode;
          Cu2 === tg && (Cu2 = this.settings, Cu2.reportNonstrict(Sj, 'Unicode text character "' + Bu2[0] + '" used in math mode', Du2));
        }
      }
      Cu2 = {};
      Object.assign(Cu2, { type: bg, mode: yf, loc: A.range(Du2), text: Bu2 });
    } else {
      return null;
    }
  }
  this.consume();
  if (Eu2) {
    Gu2 = 0;
    for (; ; ) {
      Bu2 = Eu2[0];
      if (Gu2 >= Bu2.length) {
        break;
      }
      Bu2 = Eu2[0][Gu2];
      if (!k[Bu2]) {
        Au2 = c;
        throw new Au2("Unknown accent ' " + Bu2 + Cj, Du2);
      }
      Fu2 = k[Bu2];
      Fu2 = Fu2[this.mode];
      Fu2 || (Fu2 = k[Bu2], Fu2 = Fu2.text);
      if (!Fu2) {
        Cu2 = c;
        Bu2 = "Accent " + Bu2 + " unsupported in ";
        throw new Cu2(Bu2 + this.mode + " mode", Du2);
      }
      Bu2 = {};
      Object.assign(Bu2, { type: li, mode: this.mode, loc: A.range(Du2), label: Fu2, isStretchy: false, isShifty: true, base: Cu2 });
      Gu2 = Gu2 + 1;
      Cu2 = Bu2;
    }
  }
  return Cu2;
};
Au = [];
Au.push(oo);
Au.push(Fs);
Au.push(Pm);
Au.push(Wu);
Au.push("&");
n.endOfExpression = Au;
var zd = void 0;
zd = (Au2, Bu2) => {
  var Cu2 = typeof Au2 === mh || m(Au2, String);
  if (!Cu2) throw new TypeError("KaTeX can only parse string typed expression");
  Au2 = new n(Au2, Bu2);
  Cu2 = Au2.gullet;
  Cu2 = Cu2.macros;
  Cu2 = Cu2.current;
  delete Cu2[Ik];
  Cu2 = Au2.parse();
  var Du2 = Au2.gullet.macros.current;
  delete Du2[yl];
  Du2 = Au2.gullet.macros.current;
  delete Du2[up];
  Du2 = Au2.gullet.macros;
  if (Du2.get(Ik)) {
    if (!Bu2.displayMode) throw new c("\\tag works only in display equations");
    Du2 = [];
    Bu2 = {};
    Object.assign(Bu2, { type: Zl, mode: yf, body: Cu2 });
    Cu2 = [];
    Cu2.push(new D(Ik));
    Bu2.tag = Au2.subparse(Cu2);
    Du2.push(Bu2);
    Cu2 = Du2;
  }
  return Cu2;
};
var Ad = [];
export {
  bf as default,
  bf as rehypeKatex
};
