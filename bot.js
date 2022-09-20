const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

// get bot token 
const TOKEN = process.env.TOKEN;

// constructor for create an instance of bot
const bot = new Telegraf(TOKEN);

// now bot is a telegraf object and can access all the bot methods

bot.command(('test', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Main Menu',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Fruits', callback_data: 'fruits' }
                    ],
                    [
                        { text: 'Vegetables', callback_data: 'vegetables' }
                    ]
                ]
            }
        })
}))

bot.action('fruits', ctx => {
    const id = ctx.chat.id;
    ctx.deleteMessage();
    bot.telegram.sendMessage(id, `List of Fruits\n\n1.Apples\n2.Bananas`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Back to Menu', callback_data: 'menu' }
                    ]
                ]
            }
        })
})

bot.action('vegetables', ctx => {
    const id = ctx.chat.id;
    ctx.deleteMessage();
    bot.telegram.sendMessage(id, `List of Vegetables\n\n1.Potatoes\n2.Lady Fingers`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Back to Menu', callback_data: 'menu' }
                    ]
                ]
            }
        })
})

bot.action('menu', ctx => {
    const id = ctx.chat.id;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Main Menu',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Fruits', callback_data: 'fruits' }
                    ],
                    [
                        { text: 'Vegetables', callback_data: 'vegetables' }
                    ]
                ]
            }
        })

})


// command for launching the bot
bot.launch();