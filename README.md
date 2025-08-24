# load.js

load.js is a lightweight and simple library for loading local files directly in the browser, without the need for a web server or Node.js.

## Features
- **Effortless File Loading**: Simply click a button to load local JSON, text, JavaScript, Python, or HTML files.
- **(Please import Brython when using Python.)
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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>load.js Example</title>
</head>
<body>
    <h1>load.js Demo</h1>
    <button id="load-json-button">Select JSON File</button>
    <pre id="output"></pre>

    <script src="load.js"></script>
    <script>
        load.json('load-json-button')
            .then(data => {
                document.getElementById('output').textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                document.getElementById('output').textContent = `Error: ${error.message}`;
            });
    </script>
</body>
</html>
