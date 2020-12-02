/*
 * https://github.com/dknight/dkn-range-slider
 * @license MIT
 * @version 0.1.3
*/
/**
 * Custom range input based on web components API.
 * @author Dknight https://www.whoop.ee/
 * @class DknRangeSlider
 * @extends HTMLElement
 *
 * @property {string} [name=null] Proxy attribute to input[type=range]. This name
 * is passed to form data.
 * @property {number} [value=50] Proxy attribute to input[type=range] value.
 * @property {number} [min=0] Proxy attribute to input[type=range] minimum.
 * @property {number} [max=0] Proxy attribute to input[type=range] maximum.
 * @property {number} [step=1] Proxy attribute to input[type=range] step.
 * @property {boolean} [disabled=false] Proxy attribute to input[type=range]
 * disabled. If enabled the value of range selector won't passed to form-data.
 * @property {boolean} [labelValue=''] Enables label related with thumb, usually
 * above thumb.
 * @property {string} [labelPrefix=''] Adds unit prefix for value's labels.
 * Eg. $100, ¥100,
 * @property {string} [labelSuffix=''] Adds unit suffix for value's labels.
 * Eg. 100M, 10cm.
 * @property {string} [labelLimitMin=''] Labels for minimum label (usually on
 * the left side).
 * @property {string} [labelLimitMax=''] Labels for minimum label (usually on
 * the right side).
 * @property {string} [labelAccess=''] Accessibility label for range selector.
 * Screen reader should read this label when range selector has focus.
 * @property {boolean} [ticks=false] Enables ticks.
 * @property {number} [ticksStep=1] Override steps for ticks.
 */
class DknRangeSlider extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.connected = false;
  }
  
  /**
   * Actual attributes for input[type=range] control.
   * @type {Array<string>}
   * @private
   * @static
   */
  static CONTROL_ATTRS = ['value', 'min', 'max',
    'step', 'name', 'disabled']
  
  /**
   * Range selector id.
   * @type {string}
   * @private
   * @static
   */
  static RS_ID = 'rs';
  
  /**
   * Observable attributes of web-component.
   * @returns {Array<string>}
   */
  static get observedAttributes() {
    return DknRangeSlider
        .CONTROL_ATTRS
        .concat(['label-value', 'label-limit-min',
            'label-limit-max', 'ticks', 'ticks-step']);
  }
  
  /**
   * Value getter.
   * @returns {number}
   */
  get value() {
    return Number(this.control.value);
  }
  
  /**
   * Value setter.
   * @param {string | number} value
   */
  set value(value) {
    this.setAttribute('value', value);
    this.control.value = value;
    this.dispatchEvent(new Event('change'));
  }
  
  /**
   * Min getter.
   * @return {number}
   */
  get min() {
    return Number(this.getAttribute('min'));
  }
  
  /**
   * Min setter.
   * @param {string | number} value
   */
  set min(value) {
    this.setAttribute('min', value);
    this.control.min = value;
  }
  
  /**
   * Max getter.
   * @return {number}
   */
  get max() {
    return Number(this.control.max);
  }
  
  /**
   * Max setter.
   * @param {string | number} value
   */
  set max(value) {
    this.setAttribute('max', value);
    this.control.max = value;
  }
  
  /**
   * Step getter.
   * @return {number}
   */
  get step() {
    return Number(this.control.step) || 1;
  }
  
  /**
   * Step setter.
   * @param {string | number} value
   */
  set step(value) {
    this.setAttribute('step', value);
    this.control.step = value;
  }
  
  /**
   * Step getter.
   * @return {string}
   */
  get name() {
    return this.getAttribute('name');
  }
  
  /**
   * Step setter.
   * @param {string} value
   */
  set name(value) {
    this.setAttribute('name', value);
  }
  
  /**
   * Disabled getter.
   * @return {boolean}
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }
  
  /**
   * Disabled setter.
   * @param {boolean} value
   */
  set disabled(value) {
    value
        ? this.setAttribute('disabled', '')
        : this.removeAttribute('disabled');
  }
  
  /**
   * Ticks getter.
   * @return {boolean}
   */
  get ticks() {
    return this.hasAttribute('ticks');
  }
  
  /**
   * Disabled setter.
   * @param {boolean} value
   */
  set ticks(value) {
    value
        ? this.setAttribute('ticks', '')
        : this.removeAttribute('ticks');
  }
  
  /**
   * Ticks step getter.
   * @return {number}
   */
  get ticksStep() {
    let v = Number(this.getAttribute('ticks-step'));
    return (Number.isNaN(v) || v <= 0) ? this.step : v;
  }
  
  /**
   * Ticks step setter.
   * @param {string | number} value
   */
  set ticksStep(value) {
    this.setAttribute('ticks-step', value);
  }
  
  /**
   * Checks is has attribute 'label-value'.
   * @return {boolean}
   */
  get labelValue() {
    return this.hasAttribute('label-value');
  }
  
  /**
   * Gets label suffix. You can set space before the suffix just
   * setting the space before value. Like label-suffix=' EUR',
   * will become '150 EUR'.
   * @return {string|string}
   */
  get labelSuffix() {
    return this.getAttribute('label-suffix') || '';
  }
  
  /**
   * Gets label prefix. You can set space after the suffix just
   * setting the space before value. Like label-prefix='$ ',
   * will become '$ 150'.
   * @return {string | string}
   */
  get labelPrefix() {
    return this.getAttribute('label-prefix') || '';
  }
  
  /**
   * Label for accessibility getter.
   * @return {string}
   */
  get labelAccess() {
    return this.getAttribute('label-access') || '';
  }

  /**
   * Label for accessibility setter.
   * @param {string} value
   */
  set labelAccess(value) {
    return this.setAttribute('label-access', value);
  }

  /**
   * Label limit min getter.
   * @return {string}
   */
  get labelLimitMin() {
    return this.getAttribute('label-limit-min') || '';
  }

    /**
   * Label limit min setter.
   * @param {string} value
   */
  set labelLimitMin(value) {
    this.setAttribute('label-limit-min', value);
  }
  

    /**
   * Label limit max getter.
   * @return {string}
   */
  get labelLimitMax() {
    return this.getAttribute('label-limit-max') || '';
  }

  /**
   * Label limit max setter.
   * @param {string} value
   */
  set labelLimitMax(value) {
    this.setAttribute('label-limit-max', value);
  }
  
  /**
   * Creates the HTMLInputElement control (input).
   * @returns {HTMLInputElement}
   * @private
   */
  createCtrl() {
    const input = document.createElement('input');
    input.type = 'range';
    [...this.attributes].forEach((attr) => {
      if (DknRangeSlider.CONTROL_ATTRS
          .indexOf(attr.nodeName) !== -1) {
        input.setAttribute(attr.nodeName, attr.nodeValue);
      }
    });
    return input;
  }
  
  /**
   * Create tracking label which is above thumb.
   * @return {HTMLLabelElement}
   */
  createLabel() {
    if (this.labelValue) {
      const label = document.createElement('label');
      label.classList.add('label-value');
      label.innerText = this.getLabelText();
      this.container.insertAdjacentElement('afterbegin', label);
      this.labelElem = label;
      return label;
    }
  }
  
  /**
   * @private
   * @param {string | number} value
   */
  updateLabel(value) {
    const p = value / this.control.max * 100 + '%'; //fixme
    this.style.setProperty('--tx', p);
    if (this.labelValue) {
      this.labelElem.innerText = this.getLabelText();
      const cWidth = this.container.getBoundingClientRect().width;
      const thumbWidth = parseInt(getComputedStyle(this)
          .getPropertyValue('--thumb-w')) || 32;
      const p = (value - this.control.min)
          / (this.control.max - this.control.min);
      this.labelElem.style.left = `${p * cWidth - ((p - .5) * thumbWidth + (p - .5) * 4)}px`;
    }
  }
  
  /**
   * Creates tracking label value;
   * @return {string}
   * @private
   */
  getLabelText() {
    return this.labelPrefix + this.control.value + this.labelSuffix;
  }
  
  /**
   * Create hidden field to pass data to form.
   * @return {HTMLInputElement}
   * @private
   */
  createOut() {
    const input = document.createElement('input');
    input.type = 'hidden';
    ['value', 'name', 'disabled'].forEach((v) => {
      if (this[v]) {
        input[v] = this[v];
      }
    });
    return input;
  }
  
  /**
   * Creates labels for limits.
   * @param {('label-limit-min' | 'label-limit-max')} [klass] Name and
   * classname of the label.
   */
  toggleLimLabel(klass) {
    const el = this.container.querySelector(`.${klass}`);
    const val = this.getAttribute(klass);
    if (el && !val) {
      el.remove();
    } else if(val) {
      const label = document.createElement('label');
      label.classList.add(klass);
      label.innerText = val;
      this.container.appendChild(label);
    }
  }
  
  /**
   * Accessibility label for slider.
   * @private
   */
  createLabelAccess() {
    if (this.labelAccess) {
      const label = document.createElement('label');
      label.setAttribute('for', DknRangeSlider.RS_ID);
      label.innerText = this.labelAccess;
      this.container.appendChild(label);
    }
  }
  
  /**
   * Attaches all event handlers to component and it's children.
   * @private
   */
  attachHandlers() {
    this.control.addEventListener('change', (e) => {
      this.value = e.target.value;
      this.field.value = e.target.value ;
      this.updateLabel(e.target.value);
    });
    this.addEventListener('input', (e) => {
      this.updateLabel(e.target.value);
    });
  }
  
  /**
   * Create the ticks elements and build ticks.
   */
  createTicks() {
    if (!this.ticks) {
      return;
    }
    this.ticksElem = document.createElement('div');
    // this.ticksElem.setAttribute('aria-hidden', 'true');
    this.ticksElem.classList.add('ticks');
    for (let i = this.min; i <= this.max; i += this.ticksStep) {
      const tick = document.createElement('span');
      tick.innerText = String(i);
      this.ticksElem.appendChild(tick);
    }
    this.container.appendChild(this.ticksElem);
  }
  
  
  /**
   * Removes ticks.
   */
  removeTicks() {
    if (this.ticksElem) {
      this.container.removeChild(this.ticksElem);
      delete this.ticksElem;
    }
  }
  
  /**
   * Web-component's attributeChangedCallback life cycle hook.
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   * @callback
    */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.connected || oldValue === newValue) {
      return;
    }
    switch (name) {
      case 'name':
        this.field.name = newValue;
        break;
      case 'disabled':
        this.field.disabled = this.disabled;
        this.control.disabled = this.disabled;
        break;
      case 'label-value':
        if (newValue == null) {
          this.labelElem.remove();
          this.labelValueElem = null;
        } else {
          this.createLabel();
          this.updateLabel(this.value);
        }
        break;
      case 'label-limit-min':
      case 'label-limit-max':
        this.toggleLimLabel(name);
        break;
      case 'ticks':
        if (newValue == null) {
          this.removeTicks();
        } else {
          this.createTicks();
        }
        break;
      case 'ticks-step':
        this.removeTicks();
        this.createTicks();
        break;
      default:
        if (newValue == null) {
          this.control.removeAttribute(name);
        } else {
          this.control[name] = newValue;
        }
        break;
    }
  }
  
  /**
   * Web-component's connected life cycle hook.
   * @callback
  */
  connectedCallback() {
    if (this.connected) {
      return;
    }
    this.root = this.attachShadow({mode: 'open'});
    this.styleElem = document.createElement('style');
    this.styleElem.innerHTML = `:host{display:flex;justify-content:space-between;margin:var(--range-selector-margin,0);font:var(--range-selector-font,10px/1 Arial,Helvetica,sans-serif);color:var(--labels-c,#3c3744);height:var(--range-selector-height,auto)}:host([disabled]){opacity:.5;pointer-events:none}:host([hidden]){display:none}input[type=range]{-webkit-appearance:none;width:100%;padding:var(--container-padding,0)}input[type=range]:focus{outline:0}label[for=rs]{border:0;clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.container{position:relative;flex:1;display:flex;flex-wrap:wrap}.label-value{position:relative;z-index:1;top:var(--label-value-y,-1rem);white-space:nowrap;color:var(--label-value-c,inherit);font:var(--label-value-font,bold 1.8em/1 Arial,Helvetica,sans-serif);padding:var(--label-value-padding,0);clip-path:var(--label-value-clip-path,none);background:var(--label-value-bg,none);pointer-events:none;text-align:center;transform:translateX(-50%)}.label-limit-max,.label-limit-min{margin:var(--label-lims-y,.8rem) 0 0 0;font:var(--lim-labels-font,1.6em Arial,Helvetica,sans-serif)}.label-limit-max{margin-left:auto}.ticks{display:flex;justify-content:space-between;margin-top:var(--ticks-y,0);width:100%}.ticks>*{color:var(--tick-c,var(--labels-c));display:flex;flex-direction:column;align-items:center;flex:1 1 0}.ticks>::before{content:'';display:block;width:var(--tick-w,.1rem);height:var(--tick-h,.8rem);margin:var(--tick-margin,0 0 .3rem);background:var(--tick-bg,var(--labels-c))}input[type=range]::-webkit-slider-runnable-track{-webkit-appearance:none;width:100%;height:var(--track-h,1.6rem);cursor:var(--track-cursor,pointer);box-shadow:var(--track-box-shadow,none);background:var(--track-bg,linear-gradient(var(--track-pc,#3c91e6),var(--track-pc,#3c91e6)) 0 / var(--tx) 100% no-repeat var(--track-c,#e2e2e2));border-radius:var(--track-border-radius,1rem);border:var(--track-border,none)}input[type=range]::-moz-range-track{width:100%;height:var(--track-h,1.6rem);cursor:var(--track-cursor,pointer);box-shadow:var(--track-box-shadow,none);background:var(--track-bg,linear-gradient(var(--track-pc,#3c91e6),var(--track-pc,#3c91e6)) 0 / var(--tx) 100% no-repeat var(--track-c,#e2e2e2));border-radius:var(--track-border-radius,1rem);border:var(--track-border,none)}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;box-shadow:var(--thumb-box-shadow,0 0 4px #3c91e6);height:var(--thumb-h,32px);width:var(--thumb-w,32px);border:var(--thumb-border,3px solid #fff);border-radius:var(--thumb-border-radius,50%);background:var(--thumb-bg,#3c91e6);cursor:var(--thumb-cursor,pointer);margin-top:calc(.5 * (var(--track-h) - var(--thumb-h)));box-sizing:border-box;transition:var(--thumb-transition,all .15s ease-in)}input[type=range]::-moz-range-thumb{box-shadow:var(--thumb-box-shadow,0 0 4px #3c91e6);height:var(--thumb-h,32px);width:var(--thumb-w,32px);border:var(--thumb-border,3px solid #fff);border-radius:var(--thumb-border-radius,50%);background:var(--thumb-bg,#3c91e6);cursor:var(--thumb-cursor,pointer);box-sizing:border-box;transition:var(--thumb-transition,all .15s ease-in)}input[type=range]:focus::-webkit-slider-thumb{outline:var(--focus-outline,1px dotted);transform:var(--thumb-focus-transform,scale(1.2))}input[type=range]:focus::-moz-range-thumb{outline:var(--focus-outline,1px dotted);transform:var(--thumb-focus-transform,scale(1.2))}`;
    
    // create markup and content
    this.root.appendChild(this.styleElem);
    this.control = this.createCtrl();
    this.control.id = DknRangeSlider.RS_ID;
    this.field = this.createOut();
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.appendChild(this.control);
    this.createLabelAccess();
    this.root.appendChild(this.container);
  
    this.createTicks();
  
    this.appendChild(this.field);
    this.toggleLimLabel('label-limit-min');
    this.toggleLimLabel('label-limit-max');
  
    this.createLabel();
    // Trigger animation
    setTimeout(() => this.updateLabel(this.control.value));
    
    this.resizeHandler = () => {
      this.updateLabel(this.control.value);
    };
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('orientationchange', this.resizeHandler);
  
    this.attachHandlers();
  
    this.connected = true;
  }
  
  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('orientationchange', this.resizeHandler);
  }
}

/* istanbul ignore else */
if (!customElements.get('dkn-range-slider')) {
  customElements.define('dkn-range-slider', DknRangeSlider);
}
