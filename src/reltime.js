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

const __reltime__words = {
    second: [ 'second', 'seconds', 'sec', 's' ],
    minute: [ 'minute', 'minutes', 'min', 'm' ],
    hour: [ 'hour', 'hours', 'hrs', 'h' ],
    day: [ 'day', 'days', 'day', 'd' ],
    week: [ 'week', 'weeks', 'wks', 'w' ],
    month: [ 'month', 'months', 'mth', 'm' ],
    year: [ 'year', 'years', 'yrs', 'y' ],
    now: 'just now',
    ago: ' ago',
    in: 'in ',
    on: 'on '
};

const __reltime__interval = 1000;

const __reltime__threshold = 15000;

var __reltime = null;

var __reltime__register = {};

var __reltime_parse_config = (
    conf, test
) => {

    return conf in __reltime__config ? (
        __reltime__config[ conf ].includes( test )
            ? test : __reltime__config[ conf ][0]
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

    Object.keys( __reltime__config ).forEach( ( conf ) => {

        data[ conf ] = __reltime_parse_config(
            conf,
            el.getAttribute( conf ) || null
        );

    } );

    __reltime__register[ guid ] = data;

    el.setAttribute( 'guid', guid );

    return guid;

};

var __reltime_get = (
    guid
) => {

    let data = __reltime__register[ guid ],
        diff = data.datetime - Date.now(),
        mill = Math.abs( diff );

    if( (
        data.tense == 'past' &&
        mill < 0
    ) || (
        data.tense == 'future' &&
        mill > 0
    ) ) {

        mill = 0;

    }

    switch( data.format ) {

        case 'relative':
        case 'elapsed':
        case 'micro':

            if( mill <= __reltime__threshold ) {

                data.el.innerHTML = __reltime__words['now'];

            } else {

                let parts = [];

                for( const [ key, val ] of Object.entries( {
                    year:   31557600000,
                    month:   2629800000,
                    week:     604800000,
                    day:       86400000,
                    hour:       3600000,
                    minute:       60000,
                    second:        1000
                } ) ) {

                    if( mill >= val ) {

                        mill -= ( res = Math.floor( mill / val ) ) * val;

                        parts.push( [ key, res ] );

                    } else {

                        parts.push( [ key, 0 ] );

                    }

                }

                parts.splice(
                    parts.length - (
                        rmv = __reltime__config.precision.indexOf(
                            data.precision
                        )
                    ),
                    rmv
                );

                parts = parts.filter( part => part[1] > 0 );

                if( parts.length == 0 ) {

                    data.el.innerHTML = __reltime__words['now'];

                } else {

                    parts.forEach( ( p, _i ) => {
                        parts[ _i ] = p[1] + (
                            data.format == 'relative'
                                ? ' ' + __reltime__words[ p[0] ][ +!( p[1] == 1 ) ]
                                : __reltime__words[ p[0] ][3]
                        );
                    } );

                    data.el.innerHTML = data.format == 'relative'
                        ? diff < 0
                            ? parts[0] + __reltime__words['ago']
                            : __reltime__words['in'] + parts[0]
                        : data.format == 'micro'
                            ? parts[0]
                            : parts.join( ' ' );

                }

            }

            break;

        case 'date':
        case 'datetime':

            let datetime = new Date();
            datetime.setTime( data.datetime );

            data.el.innerHTML = (
                data.format == 'date'
                    ? __reltime__words['on']
                    : ''
            ) + datetime.toLocaleDateString(
                data.locale,
                {
                    dateStyle:
                        data.format == 'date'
                            ? 'long'
                            : data.formatStyle,
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

    document.querySelectorAll( 'reltime' ).forEach( ( el ) => {

        __reltime_get(
            el.hasAttribute( 'guid' )
                ? el.getAttribute( 'guid' )
                : __reltime_register( el )
        );

    } );

    __reltime = setTimeout(
        __reltime_run,
        __reltime__interval
    );

};

var __reltime_stop = () => {

    clearTimeout( __reltime );

};

window.onload = () => {

    __reltime_run();

};