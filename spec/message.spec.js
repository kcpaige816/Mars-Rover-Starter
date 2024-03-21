const Message = require('../message.js');
const Command = require('../command.js'); //do I need to call this into a test??

describe("Message class", function() {

    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name is required.'));
      });

    it("constructor sets name", function() {
        let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')]
        let messageNameTest = new Message('Test Message', commands);
        expect(messageNameTest.name).toEqual('Test Message');
      });

    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')]
        let messageCommandsTest = new Message ('Name', commands)
        expect(messageCommandsTest.commands).toEqual(commands);
    });

});
