const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const pathToFile = path.join(__dirname, 'text.txt');
const newFile = fs.createWriteStream(pathToFile);

rl.on('close', () => {
    console.log('Thanks for using me! Bye!');
    rl.close();
})

function write() {
    rl.question('Could you, please, write something here? ', data => {
        console.log(data)
        if(data.toLocaleLowerCase() === 'exit') {
            rl.close();
            return;
        }
        
        newFile.write(data + '\n', error => {
            if(error) {
                console.error(error.message);
            } else {
                write();
            }
        })
    })
}

write()