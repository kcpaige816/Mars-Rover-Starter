const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  it('constructor sets position and default values for mode and generatorWatts', function() {
    let constructorTest = new Rover(98382);
    expect(constructorTest.position).toEqual(98382);
    expect(constructorTest.mode).toEqual('NORMAL');
    expect(constructorTest.generatorWatts).toEqual(110);
  });
  
  it('response returned by receiveMessage contains the name of the message', function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test Name', commands)
    let rover = new Rover(98382);
    let roverResponse = rover.receiveMessage(message).message;
    expect(roverResponse).toEqual(message.name);
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')]
    let message = new Message('Test Two', commands)
    let rover = new Rover(98382);
    let roverResponse = rover.receiveMessage(message).results.length;
    expect(roverResponse).toEqual(2);
  });

  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')]
    let message = new Message('Test Status', commands)
    let rover = new Rover(98382);
    let roverResponse = rover.receiveMessage(message).results[0];
    let expected = {
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 98382
      }
    }
    expect(roverResponse).toEqual(expected);
  });

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]
    let message = new Message('Test Mode', commands)
    let rover = new Rover(2000);
    let roverResponse = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
    expect(roverResponse.results[0].completed).toBe(true)
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 10)]
    let message = new Message('Test False', commands)
    let rover = new Rover(20);
    let roverResponse = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
    expect(roverResponse.results[0].completed).toBe(true)

  });

  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 30)];
    let message = new Message('Test Move', commands)
    let rover = new Rover(20);
    rover.receiveMessage(message)
    expect(rover.position).toEqual(30);
  });

});
