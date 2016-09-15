import * as babylon from "babylon";
import traverse from "babel-traverse";
import fs from "fs";

let inputFile = process.argv[2],
    outputFile = process.argv[3];

const code = fs.readFileSync(inputFile, "utf-8");

const ast = babylon.parse(code);

let sourceString = "";

traverse(ast, {
    enter(path) {
        if (path.node.type === "VariableDeclarator") {
            sourceString += 'variable `' + path.node.id.name; 
            sourceString += '` is equal to ';
            sourceString += path.node.init.value + '.\n';
        }
    },

    exit(path) {
        
    }
});

fs.writeFileSync(outputFile, sourceString, "utf-8");
