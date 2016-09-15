"use strict";

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var inputFile = process.argv[2],
    outputFile = process.argv[3];

var code = _fs2.default.readFileSync(inputFile, "utf-8");

var ast = babylon.parse(code);

var sourceString = "";

(0, _babelTraverse2.default)(ast, {
    enter: function enter(path) {
        if (path.node.type === "VariableDeclarator") {
            sourceString += 'variable `' + path.node.id.name;
            sourceString += '` is equal to ';
            sourceString += path.node.init.value + '.\n';
        }
    },
    exit: function exit(path) {}
});

_fs2.default.writeFileSync(outputFile, sourceString, "utf-8");