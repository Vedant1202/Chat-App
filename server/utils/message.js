
var moment = require('moment');

var generateMessage = function (from,  text) {
                        var date = new Date();
                        var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        return {
                          from,
                          text,
                          createdAt: moment().valueOf()
                        };
                      };

var generateLocationMessage = function (from, latitude, longitude) {
                                var date = new Date();
                                var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                                return {
                                  from,
                                  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
                                  createdAt: moment().valueOf()
                                };
                              };

module.exports = {generateMessage, generateLocationMessage};
