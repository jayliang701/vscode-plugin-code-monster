const vscode = require('vscode');

const langs = {
    react: async () => {
        let items = [
            { description:'Standard React Component. add -scss/css/less to enable style file.', label:'comp' },
            { description:'Function style React Component. add -scss/css/less to enable style file.', label:'fcomp' }
        ];
        let selectedTemplate = await vscode.window.showQuickPick(items, { matchOnDetail: true, matchOnDescription: true });
        
        const result = await vscode.window.showInputBox({
            value: '',
            valueSelection: [0, 0],
            placeHolder: '',
        });
        const args = result.replace(/\s+/img, ' ').split(' ');
        
        return [
            'react', 
            selectedTemplate.label, 
            ...args
        ];
    }
};

let items = [
    { description: 'React/ReactNative code templates', label: 'react' }
];

const showView = async (context) => {
    let selectedLang = await vscode.window.showQuickPick(items, { matchOnDetail: true, matchOnDescription: true });
    let args = await langs[selectedLang.label](context);
    console.log(args);
}

module.exports = function (context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.chooseTemplate', async () => {
        // const result = await vscode.window.showInputBox({
        //     value: '',
        //     valueSelection: [0, 0],
        //     placeHolder: 'commands:\r\nreact comp MyComponent -scss',
        //     validateInput: text => {
        //         window.showInformationMessage(`Validating: ${text}`);
        //         return text === '123' ? 'Not 123!' : null;
        //     }
        // });
        // vscode.window.showInformationMessage(`Got: ${result}`);

        try {
            await showView(context);
        } catch (err) {
            console.error(err);
        }
    }));
};