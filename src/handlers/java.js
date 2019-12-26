
const vscode = require('vscode');

exports.exec = async () => {
    let items = [
        { description:'The service template of weroll framework.', label:'weroll-service' },
        { description:'The router template of weroll framework.', label:'weroll-router' }
    ];
    let selectedTemplate = await vscode.window.showQuickPick(items, { matchOnDetail: true, matchOnDescription: true });
    if (!selectedTemplate) return null;
    
    let name = 'Test';
    const result = await vscode.window.showInputBox({
        value: name,
        valueSelection: [0, name.length],
        placeHolder: '',
    });
    if (!result) return null;
    const args = result.replace(/\s+/img, ' ').split(' ');
    
    return [
        'java', 
        selectedTemplate.label, 
        ...args
    ];
}