const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Changed Bot Status');
});
app.listen(port, () => {
  console.log(`Listening to TheJellyFishGuy: http://localhost:${port}`);
  console.log(`Powered By TheJellyFishGuy`);
});


const statusMessages = ["𝒲𝘢𝘬𝘦 𝘶𝘱 ! 𝒲𝘦 𝘢𝘪𝘯’𝘵 𝘳𝘪𝘤𝘩 𝘺𝘦𝘵", "𝘐 𝘴𝘱𝘦𝘢𝘬 𝘧𝘭𝘶𝘦𝘯𝘵 𝘴𝘢𝘳𝘤𝘢𝘴𝘮", "𝒪𝘰𝘱𝘴", "𝒜𝘯𝘺𝘸𝘢𝘺𝘴, 𝘸𝘦 𝘬𝘦𝘦𝘱 𝘪𝘵 𝘨𝘢𝘯𝘨𝘴𝘵𝘢"];


let currentIndex = 0;
const channelId = '';

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: 'dnd',
  });

  
  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
   
    textChannel.send(`Bot status is: ${currentStatus}`);
  } else {

  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    Bot logged in as ${client.user.tag}`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();
