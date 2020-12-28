const express = require('express');

const Note = require('../models/Note');
const saveNoteAndRedirect = require('../controllers/saveNote');
const { ensureAuthenticated } = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    const notes = await Note.find().sort('-date');
    res.render('notes', { notes: notes });
});

router.get('/newNote', ensureAuthenticated, (req, res) => {
    res.render('newNote', {
        note: new Note()
    });
});

router.post('/newNote', ensureAuthenticated, async (req, res, next) => {
    req.note = new Note()
    next()
}, saveNoteAndRedirect('newNote'));

router.delete('/:id', ensureAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes')
});

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('editNote', { note: note })
});

router.put('/edit/:id', ensureAuthenticated, async (req, res, next) => {
    req.note = await Note.findById(req.params.id)
    next()
}, saveNoteAndRedirect('/notes'));

router.get('/:link', async (req, res) => {
    let note = await Note.findOne({ link: req.params.link });
    if (note === null) res.redirect('/');
    res.render('/note', { article })
});

module.exports = router;