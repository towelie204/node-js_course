let Note = require('../models/Note');

function saveNoteAndRedirect(path) {
    return async (req, res) => {
        let note = req.note

            note.title = req.body.title,
            note.text = req.body.text
        try {
            note = await note.save();
            //console.log(note);
            res.redirect(`/`);
        } catch (e) {
            //console.log(note);
            res.render(`${path}`, { note: note });
        }
    }
}

module.exports = saveNoteAndRedirect;