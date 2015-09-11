var walker = electronRequire('walker');
var Q = electronRequire('q');

module.exports = function promiseWalk(path, mapFn = (file, stat) => {return {path: file, size: stat.size}}) {
  let files = [];
  let deferred = Q.defer();

  walker(path, mapFn)
    .on('file', (file, stat) => {
      files.push(mapFn(file, stat));
    })
    .on('error', (error, entry, stat) => deferred.reject(error, entry, stat))
    .on('end', () => deferred.resolve(files));

  return deferred.promise;
};
