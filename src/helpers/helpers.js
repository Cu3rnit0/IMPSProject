const helpers = require('handlerbars');
const moment = require('moment');

helpers.registerHelper('ifCond', function(v1, operator, v2, options){
    switch(operator){
        case'==' : 
            return(v1 == v2) ? options.fn(this) :options.inverse(this);
        case'===' : 
            return(v1 === v2) ? options.fn(this) :options.inverse(this);
        case'!=' : 
            return(v1 != v2) ? options.fn(this) :options.inverse(this);
        case'!==' : 
            return(v1 !== v2) ? options.fn(this) :options.inverse(this);
        case'<' : 
            return(v1 < v2) ? options.fn(this) :options.inverse(this);
        case'<=' : 
            return(v1 <= v2) ? options.fn(this) :options.inverse(this);
        case'>' : 
            return(v1 > v2) ? options.fn(this) :options.inverse(this);
        case'>=' : 
            return(v1 >= v2) ? options.fn(this) :options.inverse(this);
        default:
            return options.inverse(this);
    }
});

module.exports = helpers;