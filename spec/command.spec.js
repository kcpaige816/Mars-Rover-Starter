const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  it("constructor sets command type", function() {
    let commandTypeTest = new Command('MODE_CHANGE', 'value');
    expect(commandTypeTest.commandType).toEqual('MODE_CHANGE');
  });

  it("constructor sets a value passed in as the 2nd argument", function() {
    let valueTest = new Command('commandType', 12000);
    expect(valueTest.value).toEqual(12000);
  });
  
});