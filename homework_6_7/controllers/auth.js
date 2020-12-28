const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

module.exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/notes',
        failureRedirect: '/login',
        failureFlash: false
    })(req, res, next);
}

module.exports.register = (req, res) => {
    const { email, pass, pass2 } = req.body;
    let errors = [];

    if (!email || !pass || !pass2) {
        errors.push({ msg: 'Заполните все поля' });
    }
    if (pass !== pass2) {
        errors.push({ msg: 'Повторный ввод пароля не совпадает' });
    }
    if (pass.lenght < 3) {
        errors.push({ msg: 'Пароль должен быть не короче 6 символов' });
    }

    //console.log(errors);
    if (errors.length > 0) {
        res.render('register', {
            errors
        });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    res.status(409).json({ message: 'такой email занят' });
                } else {
                    //нужно создать пользователя
                    const newUser = new User({
                        email,
                        pass
                    });

                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.pass, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.pass = hash;

                            newUser.save()
                                .then(user => {
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            })
    }
}