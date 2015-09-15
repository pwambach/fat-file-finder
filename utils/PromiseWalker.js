var Q = require('q');
var walker = electronRequire('walker');

module.exports = function promiseWalk(path, callback, progressStep = 100) {
  let entries = [];
  let deferred = Q.defer();
  let callbackValid = typeof callback === 'function';

  walker(path)
    // .on('dir', (entry, stat) => {
    //   entries.push({
    //     path: entry,
    //     size: 0,
    //     dir: true
    //   });
    // })
    .on('file', (entry, stat) => {
      //if(stat.size > 1024*1024){
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
      //}
    })
    .on('error', (error, entry, stat) => deferred.reject(error, entry, stat))
    .on('end', () => deferred.resolve(entries));

  return deferred.promise;
};
