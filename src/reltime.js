const __config = {
    format: [
        'relative', 'datetime', 'duration', 'micro', 'clock'
    ],
    precision: [
        'second', 'minute', 'hour', 'day', 'week', 'year'
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

var __reltime_out = (
    guid
) => {

    let data = __register[ guid ],
        diff = Date.now() - data.datetime,
        mill = Math.abs( diff );

    switch( data.format ) {

        case 'relative':
        case 'duration':
        case 'micro':

            let parts = [];

            for( const [ key, val ] of Object.entries( {
                year:   31557600000,
                week:     604800000,
                day:       86400000,
                hour:       3600000,
                minute:       60000,
                second:        1000
            } ) ) {

                if( mill >= val ) {

                    mill -= Math.floor( res = mill / val ) * val;

                    parts.push( [ key, res ] );

                }

            }

            break;

        case 'datetime':

            let datetime = new Date();
            datetime.setTime( data.datetime );

            data.el.innerHTML = datetime.toLocaleDateString(
                data.locale,
                {
                    dateStyle: data.formatStyle
                }
            );

            break;

        case 'clock':

            let clock = [
                Math.floor( abs / 3600000 ).toString().padStart( 2, '0' ),
                Math.floor( abs % 3600000 / 60000 ).toString().padStart( 2, '0' ),
                Math.floor( abs % 60000 / 1000 ).toString().padStart( 2, '0' )
            ];

            if( data.precision != 'second' )
                clock.splice( -1 );

            data.el.innerHTML = clock.join( ':' );

            break;

        default:
            break;

    }

};

var __reltime_run = () => {

    document.querySelectorAll( 'reltime' ).forEach( ( el, _i ) => {

        __reltime_out(
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