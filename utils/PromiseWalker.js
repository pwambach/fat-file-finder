var walker = electronRequire('walker');
var Q = electronRequire('q');

module.exports = function promiseWalk(path) {
  let entries = [];
  let deferred = Q.defer();

  walker(path)
    // .on('dir', (entry, stat) => {
    //   entries.push({
    //     path: entry,
    //     size: 0,
    //     dir: true
    //   });
    // })
    .on('file', (entry, stat) => {
      if(stat.size > 1024*1024){
        entries.push({
          path: entry,
          size: stat.size,
          dir: false
        });
      }
    })
    .on('error', (error, entry, stat) => deferred.reject(error, entry, stat))
    .on('end', () => deferred.resolve(entries));

  return deferred.promise;
};
