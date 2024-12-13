const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const inputFileName = 'bigFile.txt.enc';
const outputFileName = 'bigFile.txt.dec';
//Define the algorithm and password
const algorithim = 'aes-192-cbc';
const password = 'Il02834'

//Use the async crypto.scrypt() instead
const key = crypto.scryptSync(password, 'salt', 24);
//The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); //Initialization vector

const inputFilePath = path.join(__dirname, inputFileName);
const outputFilePath = path.join(__dirname, outputFileName);

const decryptFile = (inputPath, outputPath) => {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    const decipher = crypto.createDecipheriv(algorithim, key, iv);

    readStream.pipe(decipher).pipe(writeStream)

    writeStream.on('finish', () => {
        console.log('Decryption Completed')
    })
}

decryptFile(inputFilePath, outputFilePath)
