const mongoose = require('mongoose');
const cyrillicTranslit = require('cyrillic-to-translit-js');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        // unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// хотел сделать красивые переходы по ссылке, чтобы название писалось английскими буквами, а пробелы 
// заменялись слешем _ , но уже нет сил что-то. 
noteSchema.pre('validate', function(next) {
    if (this.title) {
        this.link = cyrillicTranslit().transform(this.title, "_").toLowerCase()
    }
    next()
})

module.exports = mongoose.model('Note', noteSchema);