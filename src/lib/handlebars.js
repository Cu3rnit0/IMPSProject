const helpers = require ('handlebars');
const moment = require('moment');
const { format } = require('mysql2');

// este helper permite compara 2 valores
helpers.registerHelper('eq', function(a,b, options){
    return a===b ? options.fn(this): options.inverse(this);
});

helpers.registerHelper('isEquals', function(a,b){
    return a==b;
});
//Helper permite darle formato
helpers.registerHelper('formatDate', function(date, format) {
    return moment(date).format(format);
  });
helpers.registerHelper('convertDate', function(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Se le suma 1 al mes, porque el getMonth() cuenta desde 0.
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  module.exports= helpers;