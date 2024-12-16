let count = 0;
const fs = require('fs');

function Replace(readFile, writeFile, callback) {
    fs.readFile(readFile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }

        const words = data.split(/\s+/);
        words.forEach(word => {
            if (word === 'bacon' || word === 'Bacon' || word.includes('bacon') || word.includes('Bacon')) {
                count++;
            }
        });

        fs.writeFile(writeFile, data.replace(/bacon/gi, 'tasty'), (err) => {
            if (err) { 
                console.log(err);
                callback(err, null);
            } else {
                callback(null, count);
            }
        });
    });
}


Replace('bacon.txt', 'newBacon.txt', (err, count) => {
    if (err) {
        console.error('Error occurred:', err);
    } else {
        console.log(`Number of 'bacon' words replaced: ${count}`);
    }
});
