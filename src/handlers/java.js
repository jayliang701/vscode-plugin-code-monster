
const vscode = require('vscode');

exports.exec = async () => {
    let items = [
        { description:'The simplest Java class file.', label:'class' },
        { description:'The simplest Java Entity file.', label:'entity' },
        { description:'The Java Repository file.', label:'repo' },
        { description:'The data service file for operating reposity.', label:'service' },
        { description:'The domain classes contains service/entry/repository.', label:'domain' },
        { description:'The service template of weroll framework.', label:'weroll-service' },
        { description:'The rest controller template of weroll framework.', label:'weroll-rest' },
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