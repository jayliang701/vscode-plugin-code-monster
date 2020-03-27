
const vscode = require('vscode');

exports.exec = async () => {
    let items = [
        { description:'Standard React Component. add -scss/css/less to enable style file. add -mobx to use mobx state.', label:'comp' },
        { description:'Function style React Component. add -scss/css/less to enable style file. add -mobx to use mobx state.', label:'fcomp' }
    ];
    let selectedTemplate = await vscode.window.showQuickPick(items, { matchOnDetail: true, matchOnDescription: true });
    if (!selectedTemplate) return null;
    
    let name = 'MyComponent';
    const result = await vscode.window.showInputBox({
        value: name + ' -scss',
        valueSelection: [0, name.length],
        placeHolder: '',
    });
    if (!result) return null;
    const args = result.replace(/\s+/img, ' ').split(' ');
    
    return [
        'react', 
        selectedTemplate.label, 
        ...args
    ];
}