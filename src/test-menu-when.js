const vscode = require('vscode');
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.chooseTemplate', async () => {
        // vscode.window.showInformationMessage(`你点我干啥，我长得很帅吗？`);
        const result = await window.showInputBox({
            value: 'abcdef',
            valueSelection: [2, 4],
            placeHolder: 'For example: fedcba. But not: 123',
            validateInput: text => {
                window.showInformationMessage(`Validating: ${text}`);
                return text === '123' ? 'Not 123!' : null;
            }
        });
        window.showInformationMessage(`Got: ${result}`);
    }));
};