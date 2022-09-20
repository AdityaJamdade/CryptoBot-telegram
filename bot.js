const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

// get bot token 
const TOKEN = process.env.TOKEN;
const apikey = process.env.CRYPTO_COMPARE_API_KEY;

// constructor for create an instance of bot
const bot = new Telegraf(TOKEN);

// now bot is a telegraf object and can access all the bot methods
bot.command('start', ctx => {
    const chat_id = ctx.chat.id;
    let startMessage = `Welcome, this bot is useful for getting the cryptocurrency information!`
    bot.telegram.sendMessage(chat_id,  startMessage, 
        {
            reply_markup:{
                inline_keyboard:[
                    [
                        {text:"Crypto Prices", callback_data:'price'}
                    ],
                    [
                        {text:"CoinMarketCap", url: 'https://coinmarketcap.com/'}
                    ]
                ]
            }
        })
})

bot.action('price', ctx => {
    const chat_id = ctx.chat.id;
    let priceMessage = `Get price Information! select any of the following cryptocurrencies.`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(chat_id, priceMessage, 
        {
            reply_markup:{
                inline_keyboard:[
                    [
                        {text:"BTC", callback_data:'price-BTC'},
                        {text:"ETH", callback_data:'price-ETH'}
                    ],
                    [
                        {text:"BCH", callback_data:'price-BCH'},
                        {text:"LTC", callback_data:'price-LTC'}
                    ],
                    [
                        {text:"Back to Menu", callback_data: 'start'}
                    ]
                ]
            } 
        })
})

bot.action('start', ctx => {
    const chat_id = ctx.chat.id;
    let startMessage = `Welcome, this bot is useful for getting the cryptocurrency information!`
    bot.telegram.sendMessage(chat_id,  startMessage, 
        {
            reply_markup:{
                inline_keyboard:[
                    [
                        {text:"Crypto Prices", callback_data:'price'}
                    ],
                    [
                        {text:"CoinMarketCap", url: 'https://coinmarketcap.com/'}
                    ]
                ]
            }
        })
})


// command for launching the bot
bot.launch();