const { EmbedBuilder, InteractionType, ButtonBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const config = require(`../../config.json`)
module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        let client = interaction.client;
//Nickname Modal Submit
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'VerifyModal') {
            let CharacterNameValue = interaction.fields.getTextInputValue('CharacterNameTextInput')
            let SteamNameValue = interaction.fields.getTextInputValue('SteamNameTextInput')

            let NickNameString = `${CharacterNameValue} [${SteamNameValue}]`

      const VerifyEmbed = new EmbedBuilder()
      .setDescription(`Your server profile is now set to: \n${NickNameString} \n\n *You are now verified!*`) 
      .setTitle(`${client.user.username} | Quest Systems`)
      .setColor(config.color)
      .setFooter({text:`${client.user.username} by Quest Systems`})


              if (NickNameString.length > 32 ){
                interaction.reply({content: `The Name: ${NickNameString} exceeded the maximum length of 29 characters set by discord!`, ephemeral: true})
              } 
else{
    if (interaction.guild.ownerId == interaction.user.id) {
        interaction.reply({content: `Owner cannot use this function!`, ephemeral: true})
    }
    else{

    interaction.reply({embeds: [VerifyEmbed], ephemeral: true})
    let user = interaction.guild.members.cache.get(interaction.user.id);
    user.setNickname(NickNameString)}

     //Checks if roletoadd is empty
    if (!config.roletoadd == ``){
        let user = interaction.guild.members.cache.get(interaction.user.id);
    user.roles.add(config.roletoadd)}
        
    //Checks if roletoremove is empty
    if (!config.roletoremove == ``){
        let user = interaction.guild.members.cache.get(interaction.user.id);
    user.roles.remove(config.roletoremove)}
}
        }

    }
}