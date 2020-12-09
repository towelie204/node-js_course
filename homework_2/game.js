const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\'Heads and tails\' game started!');
console.log('you should type \'head\' (or \'орел\') and \'tail\' (or \'решка\')');
console.log('to leave game type \'end\'');
console.log('Head or tail?');

let coinTossing = () => {
    let rightAnswer;
    let droppedCoin = Math.ceil(Math.random() * 2);

    if (droppedCoin === 1) {
        rightAnswer = ['tail', 'решка']
    } else {
        rightAnswer = ['head', 'орел']
    }
    return rightAnswer;
}

rl.on('line', (userAnswer) => {
    let rightAnswer = coinTossing();

    correctAnswers = ['head', 'tail', 'end', 'орел', 'решка']

    if (!correctAnswers.includes(userAnswer)) {
        console.log(`Please, type only correct answers! ${correctAnswers}`);
        return
    } else if (userAnswer === 'end') {
        fs.appendFile('log.txt', 'user has finished the game\n', err => {
            if (err) throw err
        })
        console.log('game over');
        rl.close();
    } else if (rightAnswer.includes(userAnswer)) {
        fs.appendFile('log.txt', 'win\n', err => {
            if (err) throw err
        })
        console.log('YOU WIN! Let\'s try again? If no - type \'end\'.');
        console.log('If yes - guess, head or tail?');
        let rightAnswer = coinTossing();
        return rightAnswer;
    } else {
        fs.appendFile('log.txt', 'losse\n', err => {
            if (err) throw err
        })
        console.log('You lose :( Let\'s try again? If no - type \'end\'.');
        console.log('If yes - guess, head or tail?');
        let rightAnswer = coinTossing();
        return rightAnswer;
    }
})