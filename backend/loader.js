const app = require('./config/express');
require('./config/connectionFactory')
require('./config/routes')(app)
