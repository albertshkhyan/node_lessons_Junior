//for decide enviroment of node js app, we will use special standart variable - NODE_ENV

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys.prod');
} else {
    module.exports = require('./keys.dev');
} 