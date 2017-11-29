const express = require('express')
const auth = require('./auth')
// const cicloPagService = require('../api/cicloPagamento/cicloPagService')
// const pagSummaryService = require('../api/pagSummary/pagSummaryService')

module.exports = function(app){

    /*
     *Rotas abertas
     */
    const openApi = express.Router()
    app.use('/oapi', openApi)

    const Authservice = require('../api/user/authService')
    openApi.post('/login', Authservice.login)
    openApi.post('/signup', Authservice.signup)
    openApi.post('/validateToken',Authservice.validateToken)
    
    /*
     *  Rota protegidas por Token JWT
     */
    
    const protectedApi = express.Router()
    app.use('/api', protectedApi)

    protectedApi.use(auth)

    const cicloPagService = require('../api/cicloPagamento/cicloPagService')
    cicloPagService.register(protectedApi,'/cicloPag')

    const pagSummaryService = require('../api/pagSummary/pagSummaryService')
    protectedApi.route('/pagSummary').get(pagSummaryService.getSummary)


}