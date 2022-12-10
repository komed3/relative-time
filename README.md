# Relative time

Standalone lightweight JavaScript library for relative clocks and time output. No jQuery required.

Works with all browsers that [supports](https://caniuse.com/cryptography) Web Cryptography.

### Installation

Clone the repository to your directory or [download the latest version](https://github.com/komed3/relative-time/releases).

```shell
git clone https://github.com/komed3/relative-time
```

Embed ``reltime.js`` or minimized version of this JavaScript library into your HTML file.

```html
<script src="./PATH/TO/FILE/reltime.min.js"></script>
```

Or use [jsDelivr](https://www.jsdelivr.com) to embed ``reltime.min.js`` via free CDN:

```html
<script defer src="https://cdn.jsdelivr.net/gh/komed3/relative-time@master/src/reltime.min.js"></script>
```

### Usage

To show a relative time, embed the ``<reltime>`` element into your HTML page.

The element can have different attributes as shown in the table below:

| Attribute       | Possible values                                                          | Default        | Required |
|-----------------|--------------------------------------------------------------------------|----------------|----------|
| ``datetime``    | datetime string (ISO 8601)                                               | ``Date.now()`` | **yes**  |
| ``format``      | ``relative``, ``elapsed``, ``micro``, ``date``, ``datetime``, ``clock``  | ``relative``   | no       |
| ``precision``   | ``second``, ``minute``, ``hour``, ``day``, ``week``, ``month``, ``year`` | ``second``     | no       |
| ``tense``       | ``auto``, ``past``, ``future``                                           | ``auto``       | no       |
| ``formatStyle`` | ``full``, ``long``, ``medium``, ``short``                                | ``full``       | no       |
| ``threshold``   | valid ISO8601 Time Duration                                              | ``P30D``       | no       |
| ``locale``      | DateTimeFormat locales                                                   | ``en``         | no       |

### Config

You can play around with config constants to use this library however you like.

#### Supported attributes

```javascript
const __reltime__config = {
    format: [
        'relative', 'elapsed', 'micro', 'date', 'datetime', 'clock'
    ],
    precision: [
        'second', 'minute', 'hour', 'day', 'week', 'month', 'year'
    ],
    tense: [
        'auto', 'past', 'future'
    ],
    formatStyle: [
        'full', 'long', 'medium', 'short'
    ]
};
```
#### Time factors (ms)

```javascript
const __reltime__factors = {
    year:   31557600000,
    month:   2629800000,
    week:     604800000,
    day:       86400000,
    hour:       3600000,
    minute:       60000,
    second:        1000
};
```

#### Internationalization (i18n)

```javascript
const __reltime__words = {
    second: [ 'second', 'seconds', 'sec', 's' ],
    minute: [ 'minute', 'minutes', 'min', 'm' ],
    hour:   [ 'hour', 'hours', 'hrs', 'h' ],
    day:    [ 'day', 'days', 'day', 'd' ],
    week:   [ 'week', 'weeks', 'wks', 'w' ],
    month:  [ 'month', 'months', 'mth', 'm' ],
    year:   [ 'year', 'years', 'yrs', 'y' ],
    now:    'just now',
    ago:    ' ago',
    in:     'in ',
    on:     'on '
};
```

#### Update interval (ms)

```javascript
const __reltime__interval = 1000;
```

#### Threshold to show *just now* instead of time (ms)

```javascript
const __reltime__threshold = 10000;
```
