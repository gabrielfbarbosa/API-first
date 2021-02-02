const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/APIJaneiro2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    console.log(' - MONGODB STATUS :: ON')

    if (err){
        console.log('X - MONGODB STATUS :: OFF')
    }
})