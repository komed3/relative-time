const __interval = 1000;

var __reltime_run = () => {

    document.querySelectorAll( 'reltime' ).forEach( ( el, _i ) => {

        let time_now = Date.now(),
            time_rel = Date.parse( el.getAttribute( 'time' ) || time_now ),
            time_diff = time_rel - time_now,
            time_abs = Math.abs( time_diff );

    } );

    setTimeout( __reltime_run, __interval );

};

window.onload = ( e ) => {

    __reltime_run();

};