const _ = require('lodash')
const cicloPag = require('./cicloPag')

cicloPag.methods(['get','post','put','delete'])
cicloPag.updateOptions({new: true, runValidators: true})

cicloPag.after('post', sendErrorsOrNext)
cicloPag.after('put', sendErrorsOrNext)

function sendErrorsOrNext(req,res,next){
    const bundle = res.locals.bundle

    if(bundle.errors){
        var errors = parserErrors(bundle.errors)
        res.status(500).json({errors})
    }else{
        next()
    }
}

function parserErrors(nodeRestFulErrors){
        const errors = []
        _.forIn(nodeRestFulErrors, function(error){
            console.log('veio por parametro \n\n\n',nodeRestFulErrors)
            console.log('declarado na funcao \n\n\n',nodeRestFulErrors)
            
            errors.push(error.message)
        })

        return errors
        
    }

cicloPag.route('count', function(req,res,next){
    cicloPag.count(function (error, result){
        if(error){
            res.status(500).json({errors:[error]})
        }else{
            res.json({result})
        }

    })
})


module.exports = cicloPag
