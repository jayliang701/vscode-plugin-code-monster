
const vscode = require('vscode');

exports.exec = async () => {
    let items = [
        { description:'The standard html template.', label:'html' },
        { description:'The html view using nunjucks tmeplate engine.', label:'view' }
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
        'web', 
        selectedTemplate.label, 
        ...args
    ];
}