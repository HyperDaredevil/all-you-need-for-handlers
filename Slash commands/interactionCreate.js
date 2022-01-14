const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    if(interaction.isCommand() || interaction.isContextMenu()) {
      const command = client.commands.get(interaction.commandName);
      if(!command) return interaction.reply({ embeds: [
        new MessageEmbed()
        .setColor("RED")
        .setDescription("⛔ An error occured while running this command.")
      ], ephemeral: true }) && client.commands.delete(interaction.commandName);

      command.execute(interaction, client)
    }
  },
};