const gulp      = require('gulp')
//const fs        = require('fs-extra')
const util      = require('gulp-util')
const sequence  = require('run-sequence')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

gulp.task('default',function(){
    if(util.env.production){
        sequence('deps','app')
    }else{
        sequence('deps','app','server')
    }
    
})