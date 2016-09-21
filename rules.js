var PlugAPI = require('plugapi');

new PlugAPI({
    email: 'andriux1233@gmail.com',
    password: 'test'
}, function(err, bot) {
    if (!err) {
        bot.connect('testuojam'); // The part after https://plug.dj

        bot.on('roomJoin', function(room) {
            console.log("Joined " + room);
        });
    } else {
        console.log('Error initializing plugAPI: ' + err);
    }
});
bot.on('chat', function(data) {
    if (data.type == 'emote')
        console.log(data.from + data.message);
    else
        console.log(data.from + "> " + data.message);
});
