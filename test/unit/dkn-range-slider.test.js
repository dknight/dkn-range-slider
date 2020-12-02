describe('DknRangeSelector', () => {
  let testContainer;
  let slider1, slider2, slider3;
  before(() => {
    testContainer = document.createElement('div');
    document.body.appendChild(testContainer);
  });
  
  beforeEach(() => {
    slider1 = document.createElement('dkn-range-slider');
    slider2 = document.createElement('dkn-range-slider');
    slider3 = document.createElement('dkn-range-slider');
    testContainer.appendChild(slider1);
  });
  
  afterEach(() => {
    testContainer.innerHTML = '';
  });
  
  describe('general unit-tests', () => {
    it('should be instance of DknRangeSlider', () => {
      expect(slider1).instanceOf(DknRangeSlider);
    });

    it('should have default attributes', () => {
      expect(slider1.name).to.be.null;
      expect(slider1.value).to.equal(50);
      expect(slider1.min).to.equal(0);
      expect(slider1.max).to.equal(0);
      expect(slider1.step).to.equal(1);
      expect(slider1.disabled).to.be.false;
      expect(slider1.labelValue).to.be.false;
      expect(slider1.labelPrefix).to.equal('');
      expect(slider1.labelSuffix).to.equal('');
      expect(slider1.labelLimitMin).to.equal('');
      expect(slider1.labelLimitMax).to.equal('');
      expect(slider1.labelAccess).to.equal('');
      expect(slider1.ticks).to.be.false;
      expect(slider1.ticksStep).to.equal(1);
    });
    
    it('it should be connected when attached to DOM', () => {
      expect(slider1.connected).to.be.true;
    });
    
    it('should connect and attach events only once', () => {
      expect(slider2.connected).to.be.false;
      testContainer.appendChild(slider2);
      expect(slider2.connected).to.be.true;
      document.body.appendChild(slider1);
      expect(slider2.connected).to.be.true;
    });
  });
  
  describe('attributes and properties', () => {
    it('should have default values as native input', () => {
      const nativeRangeInput = document.createElement('input');
      nativeRangeInput.setAttribute('type', 'range');
      expect(slider1.min).to.equal(Number(nativeRangeInput.min));
      expect(slider1.max).to.equal(Number(nativeRangeInput.max));
      expect(slider1.step).to.equal(1);
      expect(slider1.value).to.equal(Number(nativeRangeInput.value));
    });
    
    it('should render slider without attributes', () => {
      expect(testContainer.innerHTML)
          .to.equal('<dkn-range-slider><input type="hidden" value="50"></dkn-range-slider>');
    });

    it('should render range slider with name attribute', () => {
      const name = 'foo';
      slider1.setAttribute('name', name);
      expect(testContainer.innerHTML)
          .to.equal(`<dkn-range-slider name="foo"><input type="hidden" value="50" name="${name}"></dkn-range-slider>`);
    });
  
    it('should reflect "name" attribute to property', () => {
      const name = 'bar';
      slider1.setAttribute('name', name);
      expect(slider1.name).to.equal(name);
      slider1.name = "first-name";
      expect(slider1.getAttribute('name')).to.equal('first-name');
    });
    
    it('should render range slider with disabled attribute', () => {
      slider1.setAttribute('disabled', '');
      expect(testContainer.innerHTML)
          .to.equal('<dkn-range-slider disabled=""><input type="hidden" value="50" disabled=""></dkn-range-slider>');
      expect(slider1.control.disabled).to.be.true;
      expect(slider1.field.disabled).to.be.true;
    });
  
    it('should reflect "disabled" attribute to property', () => {
      slider1.setAttribute('disabled', '');
      expect(slider1.control.disabled).to.be.true;
      expect(slider1.field.disabled).to.be.true;
      expect(slider1.disabled).to.be.true;
      slider1.disabled = false;
      expect(slider1.hasAttribute('disabled')).to.be.false;
      expect(slider1.control.disabled).to.be.false;
      expect(slider1.field.disabled).to.be.false;
      slider1.disabled = true;
      expect(slider1.hasAttribute('disabled')).to.be.true;
      expect(slider1.control.disabled).to.be.true;
      expect(slider1.field.disabled).to.be.true;
    });
  
    it('should reflect "min, max, value, steps" and other attributes to properties', () => {
      slider1.setAttribute('min', '15');
      slider1.setAttribute('max', '45');
      slider1.setAttribute('step', '5');
      slider1.setAttribute('value', '25.43');
      expect(slider1.min).to.equal(15);
      expect(slider1.max).to.equal(45);
      expect(slider1.step).to.equal(5);
      expect(slider1.value).to.equal(25);
      
      slider1.min = 0;
      slider1.max = 100;
      slider1.step = 1;
      slider1.value = 50;
      expect(slider1.getAttribute('min')).to.equal('0');
      expect(slider1.getAttribute('max')).to.equal('100');
      expect(slider1.getAttribute('step')).to.equal('1');
      expect(slider1.getAttribute('value')).to.equal('50');

      slider1.labelLimitMin = 'Hello';
      slider1.labelLimitMax = 'World';
      expect(slider1.getAttribute('label-limit-min')).to.equal('Hello');
      expect(slider1.getAttribute('label-limit-max')).to.equal('World');

      slider1.labelAccess = 'This is for accessibility';
      expect(slider1.getAttribute('label-access')).to.equal('This is for accessibility');
    });

    
    it('should work with float numbers', () => {
      slider1.min = 0;
      slider1.max = 1;
      slider1.step = .01;
      slider1.value = .25;
      expect(slider1.getAttribute('min')).to.equal('0');
      expect(slider1.getAttribute('max')).to.equal('1');
      expect(slider1.getAttribute('step')).to.equal('0.01');
      expect(slider1.getAttribute('value')).to.equal('0.25');
  
      const delta = 0.01;
      slider1.setAttribute('min', '0.5');
      slider1.setAttribute('max', '1');
      slider1.setAttribute('step', '0.05');
      slider1.setAttribute('value', '0.75');
      expect(slider1.min).to.be.closeTo(0.5, delta);
      expect(slider1.max).to.be.closeTo(1, delta);
      expect(slider1.step).to.be.closeTo(0.05, delta);
      expect(slider1.value).to.be.closeTo(0.75, delta);
    });
    
    it('should set min and max value if value is out of bounds (native behavior)', () => {
      slider1.min = -100;
      slider1.max = 100;
      slider1.value = -200;
      expect(slider1.value).to.equal(-100);
      slider1.value = 300;
      expect(slider1.value).to.equal(100);
    });
    
    it('should do nothing if attributes is the same', () => {
      slider1.value = 1;
      expect(slider1.value).to.equal(1);
      slider1.value = 1;
      expect(slider1.value).to.equal(1);
    });
    
    it('should remove attribute', () => {
      slider1.min = 33;
      slider1.removeAttribute('min');
      expect(slider1.min).to.equal(0);
    });
    
    it('should create field for external form', () => {
      const FIELD_NAME = 'payment';
      slider2.name = FIELD_NAME;
      testContainer.appendChild(slider2);
      const field = slider2.children[0];
      expect(field.type).to.equal('hidden');
      expect(field.name).to.equal(FIELD_NAME);
    });
    
    it('should have default min and max values when have value label', () => {
      slider1.setAttribute('label-value', '');
      testContainer.appendChild(slider1);
      slider1.value = -100;
      expect(slider1.value).to.equal(0);
      slider1.value = 200;
      expect(slider1.value).to.equal(100);
    });
    
    it('should add/remove label value element based on attribute', () => {
      slider1.setAttribute('label-value', '');
      expect(slider1.labelValue).to.be.true
      expect(slider1.labelValueElem).not.to.be.null;
  
      slider1.removeAttribute('label-value');
      expect(slider1.labelValue).to.be.false;
      expect(slider1.labelValueElem).to.be.null;
    });
    
    it('should add "label-limit-max" attribute', () => {
      slider1.setAttribute('label-limit-max', 'High');
      expect(slider1.container.querySelector('.label-limit-max')).not.to.be.null;
    });
  
    it('should add "label-limit-min" attribute', () => {
      slider1.setAttribute('label-limit-min', 'Low');
      expect(slider1.container.querySelector('.label-limit-min')).not.to.be.null;
    });
  
    it('should add both "label-limit-min" and "label-limit-min" attributes and remove them later', () => {
      slider1.setAttribute('label-limit-min', 'Low');
      slider1.setAttribute('label-limit-max', 'High');
      expect(slider1.container.querySelector('.label-limit-min')).not.to.be.null;
      expect(slider1.container.querySelector('.label-limit-max')).not.to.be.null;

      slider1.removeAttribute('label-limit-min');
      expect(slider1.container.querySelector('.label-limit-min')).to.be.null;
      expect(slider1.container.querySelector('.label-limit-max')).not.to.be.null;
  
      slider1.removeAttribute('label-limit-max');
      expect(slider1.container.querySelector('.label-limit-min')).to.be.null;
      expect(slider1.container.querySelector('.label-limit-max')).to.be.null;
    });
  });
  
  describe('events', () => {
    let spy;
    beforeEach(() => {
      testContainer.innerHTML = '';
      slider3.setAttribute('label-value', '');
      slider3.setAttribute('label-access', 'For impaired people');
      testContainer.appendChild(slider3);
      spy = sinon.spy();
    });
    
    it('should dispatch event on value attribute change', () => {
      slider3.addEventListener('change', spy);
      slider3.value = 54;
      expect(spy.calledOnce).to.be.true;
      slider3.value = 84;
      expect(spy.calledTwice).to.be.true;
    });
    
    it('should attach handlers', () => {
      const tmpSlider = document.createElement('dkn-range-slider');
      const stub = sinon.stub(tmpSlider, 'attachHandlers').callsFake(spy);
      testContainer.appendChild(tmpSlider);
      expect(spy.calledOnce).to.be.true;
      stub.restore();
    });
  });
  
  describe('ticks', () => {
    it('should create the ticks', () => {
      expect(slider1.ticks).to.be.false;
      slider1.ticks = true;
      expect(slider1.ticks).to.be.true;
      expect(slider1.ticksElem).not.to.be.undefined;
    });
    
    it('should toggle ticks', () => {
      slider1.ticks = true;
      expect(slider1.ticks).to.be.true;
      expect(slider1.ticksElem).not.to.be.undefined;
      slider1.ticks = false;
      expect(slider1.ticks).to.be.false;
      expect(slider1.ticksElem).to.be.undefined;
    });
    
    it('should set ticks steps', () => {
      expect(slider1.ticksStep).to.equal(1);
      slider1.ticksStep = 10;
      expect(slider1.getAttribute('ticks-step')).to.equal('10');
    });
  });
});
