window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/lodash.min.js"},

        // when using just Backbone, use this line
        // {url: "./bower_components/backbone/backbone.js"},
        // when using Parse, comment out the above line and uncomment the line below
        {url: "./bower_components/parse-js-sdk/lib/parse.js"},

        // when using React (and the plugin JSnoX), uncomment the following two lines
        // {url: "./bower_components/react/react.min.js"},
        // {url: "./node_modules/jsnox/index.js"},

        {url: "./bower_components/pace/pace.min.js"},
        {url: "./js/TemplateView.js"},
        {url: "./js/todo.js"}
    ).then(function(){
        document.querySelector("html").style.opacity = 1;
        Parse.initialize("57KkEoyo9i0avbjMO3shJ7eia0Fdf7W3gjxeJ4La", "0Nx7vBI1q0sb5ygxtGVVubJrTgVmGT4zihggDXtc");
        // start app?
        new Parse.TodoRouter();
    })

}