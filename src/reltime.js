const __config = {
    format: [
        'relative', 'datetime', 'duration', 'clock'
    ],
    precision: [
        'second', 'minute', 'hour', 'day', 'month', 'year'
    ],
    tense: [
        'auto', 'past', 'future'
    ],
    formatStyle: [
        'full', 'long', 'medium', 'short'
    ]
};

const __interval = 1000;

var __reltime = null;

var __register = {};

var __reltime_parse_config = (
    conf, test
) => {

    return conf in __config ? (
        __config[ conf ].includes( test )
            ? test : __config[ conf ][0]
    ) : null;

};

var __reltime_register = (
    el
) => {

    let guid = self.crypto.randomUUID(),
        data = {
            el: el,
            locale: Intl.DateTimeFormat.supportedLocalesOf(
                el.getAttribute( 'locale' ) || 'en'
            )[0] || 'en',
            datetime: Date.parse(
                el.getAttribute( 'datetime' ) || ''
            ),
        };

    Object.keys( __config ).forEach( ( conf ) => {

        data[ conf ] = __reltime_parse_config(
            conf,
            el.getAttribute( conf ) || null
        );

    } );

    __register[ guid ] = data;

    el.setAttribute( 'guid', guid );

    return guid;

};

var __reltime_clock = (
    guid
) => {

    let data = __register[ guid ];

    if( data.format == 'datetime' ) {

        let datetime = new Date();
        datetime.setTime( data.datetime );

        data.el.innerHTML = datetime.toLocaleDateString(
            data.locale,
            {
                dateStyle: data.formatStyle
            }
        );

    } else {



    }

};

var __reltime_run = () => {

    document.querySelectorAll( 'reltime' ).forEach( ( el, _i ) => {

        __reltime_clock(
            el.hasAttribute( 'guid' )
                ? el.getAttribute( 'guid' )
                : __reltime_register( el )
        );

    } );

    __reltime = setTimeout(
        __reltime_run,
        __interval
    );

};

var __reltime_stop = () => {

    clearTimeout( __reltime );

};

window.onload = ( e ) => {

    __reltime_run();

};