const path = require('path');
const { readdir, stat } = require('fs/promises')

const pathToFolder = path.join(__dirname, 'secret-folder');

const read = async () => {
    try {
        const content = await readdir(pathToFolder);
        content.forEach(async (item) => {
            const pathToFile = path.join(pathToFolder, item);
            const stats = await stat(pathToFile);

            if(stats.isFile()) {
                const extFile = path.extname(pathToFile);
                const nameFile = path.basename(pathToFile, extFile);
                const sizeFile = stats.size;
                const output = `${nameFile}   ${extFile.slice(1)}   ${sizeFile}b`;
                console.log(output);
            }
        })
    } catch {
        if(err) console.error(err.message);
    }
}

read()