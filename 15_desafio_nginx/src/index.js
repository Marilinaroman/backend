'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);


var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Captura argumentos
var optionsFork = { alias: { m: 'mode' }, default: { mode: 'FORK' } };
var objArguments = (0, _minimist2.default)(process.argv.slice(2), optionsFork);
var MODO = objArguments.mode;
console.log('objArgu', MODO);

// configuro archivos json
var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));


// Logica de fork o cluster
if (MODO === 'CLUSTER' && _cluster2.default.isPrimary) {
    var numCPUS = _os2.default.cpus().length;

    for (var i = 0; i < numCPUS; i++) {
        _cluster2.default.fork();
    }
    _cluster2.default.on('exit', function (worker) {
        console.log('el subproceso ' + worker.process.pid + ' fallo');
        _cluster2.default.fork();
    });
} else {
    //configuro el puerto
    var PORT = process.env.PORT || 8080;

    app.listen(PORT, function () {
        return console.log('server ' + PORT);
    });
}

app.get('/api/info', function (req, res) {

    res.json({ Version_de_Node_JS: process.version,
        Nombre_de_la_plataforma: process.platform,
        Path_de_ejecución: process.execPath,
        Proceso_ID: process.pid,
        Memoria_en_uso: process.memoryUsage().rss,
        Directorio: process.cwd(),
        Numero_de_procesadores: process.pid
    });
});