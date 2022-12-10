const __config = {
    lang: [
        'en', 'de'
    ],
    format: [
        'relative', 'datetime', 'duration'
    ],
    precision: [
        'second', 'minute', 'hour', 'day', 'month', 'year'
    ],
    tense: [
        'auto', 'past', 'future'
    ],
    formatStyle: [
        'long', 'short', 'narrow', 'micro'
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