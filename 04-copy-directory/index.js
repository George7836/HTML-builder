const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

create(destination);

function create(pathToFile) {

    fs.stat(pathToFile, (error) => {
        if(error) {
            // console.error(error.message);
            fsPromises.mkdir(pathToFile).then(function () {
                console.log('Папка создана');
            }).catch(function() {
                console.log('не удалось создать папку');
            })
            copy();
        } else {
            fs.readdir(pathToFile, (err, data) => {
                if(err) console.error(err.message);
                data.forEach(file => {
                    fs.unlimk(`${__dirname}/files-copy/${file}`, (err) => {
                        if(err) throw err;
                    })
                })
            })
        }
    })
}

async function copy() {
    const source = path.join(__dirname, 'files');
    const dirContent = await fs.readdir(source);

    dirContent.forEach(async (item) => {
        let sourcePath = path.join(__dirname, 'files', item);
        let destinationPath = path.join(__dirname, 'files-copy', item);

        try{
            await copyFile(sourcePath, destinationPath);
        } catch(err) {
            console.log('Файл не может быть скопирован')
        }
    })
}