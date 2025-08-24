# load.js

load.js is a lightweight and simple library for loading local files directly in the browser, without the need for a web server or Node.js.

## Features
- **Effortless File Loading**: Simply click a button to load local JSON, text, JavaScript, Python, or HTML files.
- **(Please import Brython when using Python.)**
- **Minimal API**: Provides a clean and easy-to-use API with methods like `load.json()`, `load.text()`, and `load.js()`.
- **Flexible Display**: Choose to display the loaded content in the console or keep it hidden for background tasks.
- **No Dependencies**: Works out of the box with pure JavaScript.

## How to Use
1. Add the `load.js` code to your `index.html` file.
2. Create a button in your HTML that will trigger the file selection.

### Example: Loading a JSON file
This example shows how to use `load.json()` to load a local `data.json` file.

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>load.js v1.1.0 全機能テスト (CDN)</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .test-section { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; }
        .drop-zone { border: 2px dashed #999; padding: 30px; text-align: center; cursor: pointer; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; white-space: pre-wrap; word-break: break-all; }
    </style>
</head>
<body>
    <h1>`load.js` v1.1.0 全機能テスト (CDN)</h1>
    <p>以下の各ボタンをクリックするか、対応するファイルをドラッグ＆ドロップしてください。</p>

    <div class="test-section">
        <h2>JSONテスト</h2>
        <p>単一・複数ファイル、フィルタリング、ログ、進捗表示をテストします。</p>
        <button id="test-json-single-button">単一JSONファイル</button>
        <button id="test-json-multiple-button">複数JSONファイル</button>
        <div id="json-dropzone" class="drop-zone">JSONファイルをここにドロップ</div>
        <pre id="json-output"></pre>
    </div>

    <div class="test-section">
        <h2>テキストテスト</h2>
        <p>単一・複数ファイル、ログ、進捗表示をテストします。</p>
        <button id="test-text-button">テキストファイル</button>
        <pre id="text-output"></pre>
    </div>

    <div class="test-section">
        <h2>HTMLテスト</h2>
        <p>`load.html()`でコンテンツを動的に追加します。</p>
        <button id="test-html-button">HTMLファイル</button>
        <div id="html-container">
            <p>この下に新しいコンテンツが追加されます。</p>
        </div>
    </div>

    <div class="test-section">
        <h2>JavaScriptテスト</h2>
        <p>JSファイルをロードして実行します。コンソールとアラートを確認してください。</p>
        <button id="test-js-button">JSファイル</button>
    </div>

    <div class="test-section">
        <h2>Pythonテスト (Brython使用)</h2>
        <p>Pythonファイルをロードして実行します。</p>
        <button id="test-py-button">Pythonファイル</button>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.9.0/brython.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.9.0/brython_stdlib.js"></script>

    <script src="https://cdn.jsdelivr.net/gh/kurigohan-programhub/load.js@v1.1.0/load.js"></script>

    <script>
        // JSONテスト
        load.json('test-json-single-button', { log: true, filter: ['name', 'age'] })
            .then(data => { document.getElementById('json-output').textContent = JSON.stringify(data.content, null, 2); })
            .catch(error => { console.error(error); });
        
        load.json('test-json-multiple-button', { multiple: true, log: true })
            .then(files => {
                const output = files.map(f => `--- ${f.name} ---\n${JSON.stringify(f.content, null, 2)}`).join('\n\n');
                document.getElementById('json-output').textContent = output;
            })
            .catch(error => { console.error(error); });

        load.json('json-dropzone', { multiple: true, log: true, displayProgress: true })
            .then(files => {
                const output = files.map(f => `--- ${f.name} ---\n${JSON.stringify(f.content, null, 2)}`).join('\n\n');
                document.getElementById('json-output').textContent = output;
            })
            .catch(error => { console.error(error); });

        // テキストテスト
        load.text('test-text-button', { log: true, multiple: true })
            .then(files => {
                const output = files.map(f => `--- ${f.name} ---\n${f.content}`).join('\n\n');
                document.getElementById('text-output').textContent = output;
            })
            .catch(error => { console.error(error); });
        
        // HTMLテスト
        load.html('test-html-button', 'html-container', { log: true })
            .catch(error => { console.error(error); });
        
        // JavaScriptテスト
        load.js('test-js-button', { log: true })
            .catch(error => { console.error(error); });
        
        // Pythonテスト
        load.py('test-py-button', { log: true })
            .catch(error => { console.error(error); });
    </script>
</body>
</html>
