const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {

    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name is required.'));
      });

    it("constructor sets name", function() {
        let messageNameTest = new Message('Test Message', 'commands');
        expect(messageNameTest.name).toEqual('Test Message');
      });

    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let messageCommandsTest = new Message ('name', ['commands'])
        expect(messageCommandsTest.commands).toEqual(['commands']);
    });

});
