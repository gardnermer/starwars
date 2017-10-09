var assert = require('chai').assert;
var asserts = require('./asserts.js').asserts;
var Command = require('leadfoot/Command');
var Server = require('leadfoot/Server');
var capabilities = require('./capabilities.json');
var command, session, id, server;

describe('Star Wars Ticket check', function () {
  this.timeout(30000);

// Connect to the selenium-standalone running locally.
// Set up capabilities of browser from file and start session
  before(function () {
    server = new Server('http://localhost:4444/wd/hub');
    return server.createSession(capabilities.desiredCapabilities)
      .then(function (session) {
        id = session.sessionId;
        command = new Command(session);
      }).then(function () {
        console.log('Connected!');
        return command.maximizeWindow();
      });
  });
  it('Should load Login page', function () {
    return command.get('https://drafthouse.com/starwars/austin')
      .then(asserts.checkPage('https://drafthouse.com/starwars/austin', 'STAR WARS: THE LAST JEDI | Austin | Alamo Drafthouse Cinema', command));
  });
  it('Should see wait message', function () {
    return command.findByCssSelector('i.fa-exclamation-triangle')
        .end()
      .then(asserts.checkTextEquals('div.panel h5', "IT’S ALMOST TIME, YOUNG JEDI", command));
  });
  after(function () {
    return server.deleteSession(id);
  });
});