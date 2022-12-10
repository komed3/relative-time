const __config = {
    lang: [
        'en', 'de'
    ],
    format: [
        'datetime', 'relative', 'duration'
    ],
    precision: [
        'year', 'month', 'day', 'hour', 'minute', 'second'
    ],
    tense: [
        'auto', 'past', 'future'
    ],
    formatStyle: [
        'long', 'short', 'narrow', 'micro'
    ]
};

const __interval = 1000;

var __reltime_parse_config = (
    conf, test
) => {

    return __config[ conf ].includes( test )
        ? test : __config[ conf ][0];

};

var __reltime_run = () => {

    document.querySelectorAll( 'reltime' ).forEach( ( el, _i ) => {

        let _now = Date.now(),
            _rel = Date.parse( el.getAttribute( 'time' ) || time_now ),
            _diff = time_rel - time_now,
            _abs = Math.abs( time_diff ),
            _conf = {};

    } );

    setTimeout( __reltime_run, __interval );

};

window.onload = ( e ) => {

    __reltime_run();

};