const { Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
};