const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

let items = [
    { description: 'React/ReactNative code templates', label: 'react' },
    { description: 'NodeJS project templates', label: 'node' },
    { description: 'Web project templates', label: 'web' }
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
            console.log(folderPath);
            let args = await showView(context);
            if (args) {
                args.push(`-output="${folderPath}"`);
                let cmd = buildCommand(args);
                cp.execSync(cmd);
            }
        } catch (err) {
            console.error(err);
        }
    }));
};