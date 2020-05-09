const vscode = require('vscode');
const py = require('./转拼音')

var 提示文本 = ["中文测试","文本","数据","中英结合abdc"];
const wordPattern = /(-?\d*\.\d\w*)|([^\`\~\!\@\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s？。，、；：？…—·ˉˇ¨“”～〃｜《》〔〕（），]+)/g;

function provideCompletionItems(document, position, token, context) {

    var 总行数 =  document.lineCount
    var 当前行 =  position.line;
    var 代码内容 = "";
    for (var i = 0; i < 总行数; i++){
        if(i!=当前行)
        代码内容 += document.lineAt(i).text+"\n";
    }

    提示文本=  去重(代码内容.match(wordPattern)) ;
        return 提示文本.map(文本 => {
                var 拼音=py.trans(文本)
                var item=new vscode.CompletionItem(                   
                    拼音  ,
                    vscode.CompletionItemKind.Text)
                 // 文本+'\t'+拼音 ,拼音+'\t'+文本
                item.detail=文本
                item.sortText=拼音
                item.filterText=拼音
                item.label=文本+'\t'+拼音
                item.insertText=文本
                return item;

        })

}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item 
 * @param {*} token 
 */
function resolveCompletionItem(item, token) {
    return null;
}

function 去重 (arr) {
    var ret=Array.from(new Set(arr))

    for (var i = 0; i < ret.length; i++) {
        　　if ((!py.包含中文(ret[i]))||ret[i].length>20) {
            ret.splice(i, 1);
        　　　　i--; 
        　　}
        }

    return ret;
  }

module.exports = function(context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: '*' }, {
        provideCompletionItems,
        resolveCompletionItem
    }));
};

