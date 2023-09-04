const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/language', {}).then(() => {
    console.log('Connected Successfully');
}).catch((e) => { 
    console.log('connection error', e);
})
