var Promise = require('bluebird');
var walker = electronRequire('walker');

module.exports = function directoryWalk(path, callback, progressStep = 100) {
  let entries = [];
  
  let callbackValid = typeof callback === 'function';
  
  return new Promise((resolve, reject) => {
    walker(path)
      .on('file', (entry, stat) => {
        if(stat.size > 1024*1024){
          entries.push({
            path: entry,
            size: stat.size,
            dir: false
          });

          if(callbackValid){
            if(entries.length % progressStep === 0){
              callback(entries.length);
            }
          }
        }
      })
      .on('error', (error, entry, stat) => {
        reject(error, entry, stat);
      })
      .on('end', () => {
        resolve(entries);
      }
      );
  });
};
