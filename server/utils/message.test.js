var expect            = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', function () {
  it('should generate correct message object', function () {
    var from    = 'Ivan';
        text    = 'I am rocketic!!';
        message = generateMessage(from, text);

    expect(typeof(message.createdAt)).toBe('string'); // createdAt should be a string
    expect(message).toBeTruthy(); // assert 'from' and 'text' should return correctly and match
    expect(message.from).toEqual('Ivan');
    expect(message.text).toEqual('I am rocketic!!');
  });
});


describe('generateLocationMessage', function () {
  it('should generate correct location object', function () {
    var fromUser    = 'Coutinho';
        latitude    = 19;
        longitude   = 72;
        url         = generateLocationMessage(fromUser, latitude, longitude);


     expect(typeof(message.createdAt)).toBe('string'); // createdAt should be a string
     expect(url).toBeTruthy();   // Asser url to be truthy and check if it returns proper values
     expect(url.from).toEqual('Coutinho');

     var actualUrl = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
     expect(url.url).toEqual(actualUrl);
  });
});
