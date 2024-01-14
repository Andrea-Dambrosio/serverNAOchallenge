// next.config.js
// const withSass = require('@zeit/next-sass')
module.exports = {
    env: {
        LOCALHOST_IP: process.env.LOCALHOST_IP,
        DEBUG: 'socket.io:*'
    },


};
// module.exports = withSass({
//     /* config options here */
// })
