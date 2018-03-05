'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        //prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say("Hello")
                .then(() => 'askName');
        }
    },


    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}`))
                .then(() => 'howToHelp');
        }
    },
    
    howToHelp: {
        prompt: (bot) => bot.say("How can I help you today? \n 1) General Question (NA) \n 2) Flu Vaccinations (CA) \n 3) Question for the nurse (RA) \n 4) Live Chat (LC)"),
        receive: (bot, message) => {
            const task = message.text;
            switch(task) {        
                case "NA":
                    return bot.setProp('task', task)
                        .then(() => bot.say(`Great! What's your Question?.`))
                        .then(() => 'finish');
                    break;
                case "CA":
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`Great! How can we help today?`))
                                    .then(() => 'finish');
                    break;
                case "RA":
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`Great! What's your Question?`))
                                    .then(() => 'finish');
                    break;
                case "LC":
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`Great! I'll go fetch a NPCA representative`))
                                    .then(() => 'finish');
                    break;
                default:
                    return bot.setProp('task', task)
                                    .then(() => bot.say(`An error occurred`))
                                    .then(() => 'finish');
                }            
        }
    },
   finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Hello again, ${name}!`))
                .then(() => 'howToHelp');
        }
    }
});
