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

### Example: Loading a file

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>load.js v1.1.0 test (CDN)</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .test-section { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; }
        .drop-zone { border: 2px dashed #999; padding: 30px; text-align: center; cursor: pointer; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; white-space: pre-wrap; word-break: break-all; }
    </style>
</head>
<body>
    <h1>`load.js` v1.1.0 test (CDN)</h1>
    <p>Click on the buttons below or drop and drop the corresponding files.</p>

    <div class="test-section">
        <h2>JSON test</h2>
        <p>Tests single and multiple files, filtering, logging, and progress display.</p>
        <button id="test-json-single-button">single JSON file</button>
        <button id="test-json-multiple-button">multiple JSON file</button>
        <div id="json-dropzone" class="drop-zone">Drop your JSON file here</div>
        <pre id="json-output"></pre>
    </div>

    <div class="test-section">
        <h2>text test</h2>
        <p>Tests single and multiple files, filtering, logging, and progress display.</p>
        <button id="test-text-button">text file</button>
        <pre id="text-output"></pre>
    </div>

    <div class="test-section">
        <h2>HTMLtest</h2>
        <p>Add content dynamically with `load.html()`</p>
        <button id="test-html-button">HTMLファイル</button>
        <div id="html-container">
            <p>New content will be added below this.</p>
        </div>
    </div>

    <div class="test-section">
        <h2>JavaScript test</h2>
        <p>Load and run the JS file, check the console and the alerts.</p>
        <button id="test-js-button">JS file</button>
    </div>

    <div class="test-section">
        <h2>Python test (Used Brython)</h2>
        <p>Load and run a Python file.</p>
        <button id="test-py-button">Python file</button>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.9.0/brython.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.9.0/brython_stdlib.js"></script>

    <script src="https://cdn.jsdelivr.net/gh/kurigohan-programhub/load.js@v1.1.0/load.js"></script>

    <script>
        // JSONtest
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

        // text test
        load.text('test-text-button', { log: true, multiple: true })
            .then(files => {
                const output = files.map(f => `--- ${f.name} ---\n${f.content}`).join('\n\n');
                document.getElementById('text-output').textContent = output;
            })
            .catch(error => { console.error(error); });
        
        // HTML test
        load.html('test-html-button', 'html-container', { log: true })
            .catch(error => { console.error(error); });
        
        // JavaScript test
        load.js('test-js-button', { log: true })
            .catch(error => { console.error(error); });
        
        // Python test
        load.py('test-py-button', { log: true })
            .catch(error => { console.error(error); });
    </script>
</body>
</html>
