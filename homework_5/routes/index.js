const express = require('express');

const Note = require('../models/Note');
const saveNoteAndRedirect = require('../controllers/saveNote');

const router = express.Router();

router.get('/', async (req, res) => {
    const notes = await Note.find().sort('-date');
    res.render('notes', { notes: notes });
});

router.get('/newNote', (req, res) => {
    res.render('newNote', {
        note: new Note()
    });
});

router.post('/newNote', async (req, res, next) => {
    req.note = new Note()
    next()
}, saveNoteAndRedirect('newNote'));

router.delete('/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/')
});

router.get('/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('editNote', { note: note })
});

router.put('/edit/:id', async (req, res, next) => {
    req.note = await Note.findById(req.params.id)
    next()
}, saveNoteAndRedirect('/'));

// хотел сделать красивые переходы по ссылке, чтобы название писалось английскими буквами, а пробелы 
// заменялись слешем _ , но уже нет сил что-то. 

// router.get('/:link', async (req, res) => {
//     let note = await Note.findOne({ link: req.params.link });
//     if (note === null) res.redirect('/');
//     res.render('/note', { article })
// });

module.exports = router;