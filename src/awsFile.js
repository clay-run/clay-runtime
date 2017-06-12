var path = require('path'),
    fs = require('fs');

module.exports = function(filePath) {
    var awsPath = path.resolve('/tmp/', filePath);

    this.unlink = function() {
        return new Promise(function(resolve, reject) {
            fs.unlink(awsPath, function(err) {
                if(err) {
                    return reject(err);
                }
                resolve();
            })
        })
    }

    this.read = function(encoding) {
        encoding = encoding || 'utf8';

        return new Promise(function(resolve, reject) {
            fs.readFile(awsPath, encoding, function(err, data) {
                if(err) {
                    return reject(err);
                }
                resolve(data);
            })
        })
    }

    this.write = function(data, encoding) {
        var encoding = encoding || 'utf8';

        return new Promise(function(resolve, reject) {
            fs.writeFile(awsPath, data, encoding, function(err) {
                if(err) {
                    return reject(err);
                }
                resolve();
            })
        })
    }
}