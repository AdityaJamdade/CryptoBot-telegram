const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

// get bot token 
const TOKEN = process.env.TOKEN;

// constructor for create an instance of bot
const bot = new Telegraf(TOKEN);

// now bot is a telegraf object and can access all the bot methods



// command for launching the bot
bot.launch();