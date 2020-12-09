const fs = require('fs');

const logs = fs.readFile('log.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const result = data.toString().split('\n');

    const winsCount = result.filter(item => item === 'win').length;
    const lossesCount = result.filter(item => item === 'losse').length;

    const totalTryesCount = winsCount + lossesCount;

    let winsPercent = (winsCount / totalTryesCount * 100).toFixed(2);
	let lossesPercent = (lossesCount / totalTryesCount * 100).toFixed(2);

    let inARow = (game) => {
        let logsLenght = result.length - 1;
        let maxGameInARow = 0;

        for (i = 0; i < logsLenght; i++) {
            gameInARow = 0;
            if (result[i] === game) {
                while (result[i] === game) {
                    i++;
                    gameInARow++;
                }
            }
            if (gameInARow > maxGameInARow) {
                maxGameInARow = gameInARow;
            }
        }
        return maxGameInARow;
    }

    const winsInARow = inARow('win');
    const lossesInARow = inARow('losse');


    console.log(`Total games count: ${totalTryesCount}`);
    console.log(`Wins: ${winsCount}`);
    console.log(`Losses: ${lossesCount}`);
    console.log(`Wins to losses: ${winsPercent}% / ${lossesPercent}%`);
    console.log(`wins in a row: ${winsInARow}`);
    console.log(`losses in a row: ${lossesInARow}`);
});
