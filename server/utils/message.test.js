var expect            = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', function () {
  it('should generate correct message object', function () {
    var from    = 'Ivan';
        text    = 'I am rocketic!!';
        message = generateMessage(from, text);

    expect(typeof(message.createdAt)).toBe('string'); // createdAt should be a number
    expect(message).toBeTruthy(); // assert 'from' and 'text' should return correctly and match
    expect(message.from).toEqual('Ivan');
    expect(message.text).toEqual('I am rocketic!!');
  });
});
