const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const inputFileName = 'bigFile.txt';
const outputFileName = 'bigFile.txt.enc';

//Define the algorithm and password
const algorithim = 'aes-192-cbc';
const password = 'Il02834'

//Use the async crypto.scrypt() instead
const key = crypto.scryptSync(password, 'salt', 24);
//The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); //Initialization vector

const inputFilePath = path.join(__dirname, inputFileName);
const outputFilePath = path.join(__dirname, outputFileName);

const encryptFile = (inputPath, outputPath) => {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    const cipher = crypto.createCipheriv(algorithim, key, iv);

    readStream.pipe(cipher).pipe(writeStream)

    writeStream.on('finish', () => {
        console.log('Encryption completed');
    })
}

encryptFile(inputFilePath, outputFilePath);




// const fileName = 'bigFile.txt';
// const algorithim = 'aes-192-cbc';
// const password = 'Password used to generate key';
// // Use the async crypto.scrypt() instead
// const key = crypto.scryptSync(password, 'salt', 24);
// // The IV is usually passed along with the ciphertext.
// const iv = Buffer.alloc(16, 0); // Initialization vector
// // input file
// const inFile = fs.createReadStream(fileName);
// // output file
// const outFile = fs.createWriteStream(fileName + '.out');
// // encrypt content
// const encrypt = crypto.createCipheriv(algorithim, key, iv);
// // start pipe
// inFile.pipe(encrypt).pipe(outFile);


