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

#### ``datetime``

ISO 8601 compliant datetime string like ``2022-12-25 00:00:00``

#### ``format``

- ``relative`` Displays relative time span to/from specified time point e.g. ``2 minutes ago``
- ``elapsed`` Returns in descending order all time parts e.g. ``1y 2m 1d 4h``
- ``micro`` Returns the largest time part using very short unit e.g. ``4y``
- ``datetime`` Delivers date as local string e.g. ``Sat, Dec 10. 2022``
- ``date`` Same as ``datetime`` with prefix (default ``on``)
- ``clock`` Shows a coutdown or running clock with hours, minutes and seconds e.g. ``12:03:43``

#### ``precision``

Precision limits the output to the specified smallest part; e.g. ``precision=hour`` deletes minutes and seconds.

For values smaller than the specified precision, ``just now`` is printed. For ``format=clock`` the output is omitted for seconds at most.

#### ``tense``

Restricts the output of durations to either the future ``tense=future`` or the past ``tense=past``. Events outside of the possible range are output as ``just now``. By default, ``tense=auto`` allows both directions.

#### ``formatStyle``

The ``formatStyle`` attribute determines the length of the unit names. This value is passed directly to the ``Intl`` function.

For more information click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat).

#### ``threshold``

Use Threshold to display a relative time period beyond the specified value as a date.

Valid values specified in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) format.

#### ``locale``

One of supported locals for ``Intl.DateTimeFormat``

For more information click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/supportedLocalesOf).

### Examples

```html
<reltime datetime="2022-12-25 00:00:00"></reltime>
<reltime datetime="2022-12-25 00:00:00" format="elapsed" precision="day"></reltime>
<reltime datetime="2022-12-25 00:00:00" format="datetime" formatStyle="short"></reltime>
<reltime datetime="2022-12-25 00:00:00" threshold="P2Y"></reltime>
```

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
