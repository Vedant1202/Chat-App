

var generateMessage = function (from,  text) {
                        var date = new Date();
                        var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        return {
                          from,
                          text,
                          createdAt: current_time
                        };
                      };

module.exports = {generateMessage};
