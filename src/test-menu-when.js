const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const codemonster = require('codemonster');

let items = [
    { description: 'React/ReactNative code templates', label: 'react' },
    { description: 'NodeJS project templates', label: 'node' },
    { description: 'Web project templates', label: 'web' },
    { description: 'Java project templates', label: 'java' }
];

const showView = async (context) => {
    let selectedLang = await vscode.window.showQuickPick(items, { matchOnDetail: true, matchOnDescription: true });
    if (!selectedLang) return null;
    let handler = require('./handlers/' + selectedLang.label);
    let args = await handler.exec(context);
    return args;
}

const buildCommand = (args) => {
    return `${path.resolve(__dirname, '../node_modules/.bin/codem')} ${args.join(' ')}`;
}

const getFolderPath = (selectedFilePath) => {
    return new Promise((resolve, reject) => {
        fs.stat(selectedFilePath, (err, stats) => {
            if (err) return reject(err);

            if (stats.isDirectory()) {
                return resolve(selectedFilePath);
            }

            return resolve(path.dirname(selectedFilePath));
        });
    });
}

module.exports = function (context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.chooseTemplate', async (uri) => {
        try {
            let folderPath = await getFolderPath(uri.fsPath);
            let args = await showView(context);
            if (args) {

                let vars = {};
                for (let arg of args) {
                    if (arg.startsWith('-')) {
                        let key = arg.substr(1);
                        let val = true;
                        if (key.indexOf('=') > 0) {
                            val = key.substr(key.indexOf('=') + 1);
                            if (val.startsWith('\'') || val.startsWith('"')) {
                                val = val.substr(1, val.length - 2);
                            }
                        }
                        vars[key] = val;
                    }
                }

                await codemonster.runAsModule({
                    output: folderPath,
                    ...vars,
                }, [
                    ...args,
                ]);
            }
        } catch (err) {
            console.error(err);
            vscode.window.showErrorMessage(err.message);
        }
    }));
};