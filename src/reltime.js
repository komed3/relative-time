const __interval = 1000;

var __reltime_run = () => {

    setTimeout( __reltime_run, __interval );

};

window.onload = ( e ) => {

    __reltime_run();

};