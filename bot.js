const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

// get bot token 
const TOKEN = process.env.TOKEN;
const apikey = process.env.CRYPTO_COMPARE_API_KEY;

// constructor for create an instance of bot
const bot = new Telegraf(TOKEN);

// now bot is a telegraf object and can access all the bot methods

const sendStartMessage = (ctx) => {
    const chat_id = ctx.chat.id;
    let startMessage = `Welcome, this bot is useful for getting the cryptocurrency information!`
    bot.telegram.sendMessage(chat_id, startMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Crypto Prices", callback_data: 'price' }
                    ],
                    [
                        { text: "CoinMarketCap", url: 'https://coinmarketcap.com/' }
                    ],
                    [
                        { text: "Bot Info", callback_data: 'info' }
                    ]
                ]
            }
        })
}

bot.command('start', ctx => {
    sendStartMessage(ctx);
})

bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
})

bot.action('price', ctx => {
    const chat_id = ctx.chat.id;
    let priceMessage = `Get price Information! select any of the following cryptocurrencies.`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(chat_id, priceMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "BTC", callback_data: 'price-BTC' },
                        { text: "ETH", callback_data: 'price-ETH' }
                    ],
                    [
                        { text: "BCH", callback_data: 'price-BCH' },
                        { text: "LTC", callback_data: 'price-LTC' }
                    ],
                    [
                        { text: "Back to Menu", callback_data: 'start' }
                    ]
                ]
            }
        })
})

let priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC']

bot.action(priceActionList, async (ctx) => {
    const chat_id = ctx.chat.id;
    let symbol = ctx.match[0].split('-')[1];
    console.log(symbol);

    try {
        let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD,INR&api_key=${apikey}`);
        let usdData = res.data.DISPLAY[symbol].USD;
        let inrData = res.data.DISPLAY[symbol].INR;
        console.log(usdData);

        let message =
            `
        Symbol: ${symbol}\n
        Price: ${usdData.PRICE}
        Open: ${usdData.OPENDAY}
        High: ${usdData.HIGHDAY}
        Low: ${usdData.LOWDAY}
        Supply: ${usdData.SUPPLY}
        Market Cap: ${usdData.MKTCAP}
        `;

        ctx.deleteMessage();
        bot.telegram.sendMessage(chat_id, message,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "Back to prices", callback_data: 'price' }
                        ]
                    ]
                }
            })
    } catch (error) {
        console.log(error);
        ctx.reply("Some error occurred!")
    }
})

bot.action('info', ctx => {
    ctx.answerCbQuery();
    const chat_id = ctx.chat.id;
    bot.telegram.sendMessage(chat_id, "Bot Info",
        {
            reply_markup: {
                keyboard: [
                    [
                        { text: "Credits" },
                        { text: "API" }
                    ],
                    [
                        { text: "Remove keyboard" }
                    ]
                ],
                resize_keyboard: true
            }
        })
})

bot.hears('credits', ctx => {
    ctx.reply(`Developed by Aditya Jamdade, PICT, Pune!`);
})

bot.hears('API', ctx => {
    ctx.reply(`This bot uses cryptocompare API`);
})

bot.hears('Remove keyboard', ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, "Removed keyboard!",
        {
            reply_markup: {
                remove_keyboard: true
            }
        })
})

// command for launching the bot
bot.launch();