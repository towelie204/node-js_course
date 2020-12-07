const colors = require('colors/safe');

const showLog = (message) => console.log(message);

showLog(colors.green('green text'));

showLog(colors.underline.red('underLine red')); 

showLog(colors.inverse('inveresed color text')); 

showLog(colors.bgRed('red background')); 

showLog(colors.brightYellow.bold('bright yellow bold text')); 

showLog(colors.random('random colored text')); 