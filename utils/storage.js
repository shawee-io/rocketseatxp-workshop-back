const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');

const upload = ({ stream, mimetype}) => {
    const uploadDir = './uploads';
    const extension = mimetype.split('/');
    const uploadPath = `${uploadDir}/${uuid()}.${extension[1]}`;
    return new Promise((resolve, reject) =>
      stream
        .pipe(fs.createWriteStream(uploadPath))
        .on('error', error => reject(error))
        .on('finish', () => resolve({ path: path.resolve(uploadPath) }))
    );
}

module.exports = { upload }