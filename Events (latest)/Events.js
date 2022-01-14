const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const { Events } = require("../Validation/EventNames.js");

const globPromise = promisify(glob);

const ascii = require("ascii-table");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Events
    const eventsTable = new ascii('Events');
    eventsTable.setHeading("Name", "Status");

    (await globPromise(`${process.cwd()}/Events/**/*.js`)).map(async (file) => {
      const event = require(file);

      if(!Events.includes(event.name) || !event.name) {
        const L = file.split('/');
        await eventsTable.addRow(`${event.name || 'INVALID'}`, `🔸 ERROR`)
        return;
      };

      if(event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      };

      await eventsTable.addRow(event.name, '🔹 SUCCESSFUL');
    });

    console.log(eventsTable.toString());
};