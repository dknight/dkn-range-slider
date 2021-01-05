# dkn-range-slider

Custom range-input based on web components API with zero dependencies (2.7kb gzipped).
Some themes already included out-of-box in the packaged, but the slider has rich CSS
styling API based on CSS custom-properties.

Check the [demo](https://dknight.github.io/dkn-range-slider/demo/).

## Installation

NPM
```shell
npm install dkn-range-slider
```

CDN
```html
<script src="https://unpkg.com/dkn-range-slider@latest/dist/dkn-range-slider.min.js" defer></script>
```

## Usage

When you include this script into your HTML page you can use web-components with custom tag.

```html
<dkn-range-slider></dkn-range-slider>
```

### API

#### Attributes and properties

Attribute       | Reflected property      | Type    | Default value  | Description
--------------- | ------------------------|---------| -------------- | -----------
name            | name          | string  | null    | Proxy attribute to input[type=range]. This name is passed to form data.
value           | value         | number  | 50      | Proxy attribute to input[type=range] value.
min             | min           | number  | 0       | Proxy attribute to input[type=range] minimum.
max             | max           | number  | 0       | Proxy attribute to input[type=range] maximum.
step            | step          | number  | 1       | Proxy attribute to input[type=range] step.
disabled        | disabled      | boolean | false   | Proxy attribute to input[type=range] disabled. If enabled the value of range selector won't passed to form-data.
label-value     | labelValue    | boolean | false   | Enables label related with thumb, usually above thumb.
label-prefix    | labelPrefix   | string  | ""      | Adds unit prefix for value's labels. Eg. $100, ¥100,
label-suffix    | labelSuffix   | string  | ""      | Adds unit suffix for value's labels. Eg. 100M, 10cm.
label-limit-min | labelLimitMin | string  | ""      | Labels for minimum label (usually on the left side).
label-limit-max | labelLimitMax | string  | ""      | Labels for minimum label (usually on the right side).
label-access    | labelAccess   | string  | ""      | Labels for minimum label (usually on the right side).
ticks           | ticks         | boolean | false   | Enables ticks.
ticks-step      | ticksStep     | number  | 1       | Override step attribute only for ticks.

## Styling

The styles are placed in CSS custom properties. If your requirements meets only default style you can do not include in your project any styles.
By default there is fallback in web-components itself which has 'default' theme. Another option you can choose any theme provided with this project.

```html
<link rel="stylesheet" href="minimal.css">
```

### Custom styling

Custom styling is done by CSS custom properties. You can copy the default.css from src/ directory and set your own styles.


## State of legacy Edge (<=79) and Internet Explorer

No support. Old IE11 and Edge don't support web-components and Shadow DOM natively.
If you have proper skills and knowledge you can try to use polyfills.


## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request.

### Testing

Run the unit tests.

```shell
npm test
```

## License

2020-2021 Dknight [MIT](https://opensource.org/licenses/MIT).
