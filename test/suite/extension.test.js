const assert = require('assert');
const { before } = require('mocha');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const 补全实现 = require('../../补全实现') // TODO: 应直接引用模块
// 拷贝自"补全实现"
const 标识符模式 = /(-?\d*\.\d\w*)|([^\`\~\!\@\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s？。，、；：？…—·ˉˇ¨“”～〃｜《》〔〕（），]+)/g;

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('标识符识别', () => {
		assert.deepEqual("量 - 1".match(标识符模式), ["量", "-", "1"]);

		// 复现 https://github.com/program-in-chinese/vscode_Chinese_Input_Assistant/issues/8
		assert.deepEqual("量-1".match(标识符模式), ["量-1"], "现状有误");
		// TODO: 下面应通过
		assert.deepEqual("量-1".match(标识符模式), ["量", "-", "1"], "与-相连");
	});
});
