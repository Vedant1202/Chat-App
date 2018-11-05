

var generateMessage = function (from,  text) {
                        var date = new Date();
                        var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        return {
                          from,
                          text,
                          createdAt: current_time
                        };
                      };

var generateLocationMessage = function (from, latitude, longitude) {
                                var date = new Date();
                                var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                                return {
                                  from,
                                  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
                                  createdAt: current_time
                                };
                              };

module.exports = {generateMessage, generateLocationMessage};
