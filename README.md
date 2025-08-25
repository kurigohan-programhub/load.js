# load.js

load.js is a lightweight and simple library for loading local files directly in the browser, without the need for a web server or Node.js. It's perfect for quick file previews, data processing, and client-side applications.

---

## Features

* **Effortless File Loading**: Load local files with a single button click.
* **Auto-Detection**: Automatically detects the file type (JSON, text, HTML, etc.) and processes it with the correct function.
* **Binary Support**: Easily load images, PDFs, and other binary files as `ArrayBuffer`.
* **No Dependencies**: Works out of the box with pure JavaScript.
* **Minimal API**: Provides a clean and easy-to-use API with core methods like `load.auto()`, `load.json()`, and `load.binary()`.

---

## How to Use

1.  Place the `load.js` file in your project directory.
2.  Include the script in your HTML file.
3.  Add a button with a unique ID to trigger the file selection.

### Example: Using `load.auto()`

This example shows the new `load.auto()` function, which can handle any file type.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>load.js Demo</title>
</head>
<body>
    <h1>load.js Demo</h1>
    <p>Click the button to load any file. The library will automatically detect its type.</p>
    <button id="load-file-button">Load File</button>
    <pre id="output"></pre>

    <script src="./load.js"></script>

    <script>
        document.getElementById('load-file-button').addEventListener('click', () => {
            load.auto('load-file-button')
                .then(file => {
                    document.getElementById('output').textContent = `Success!
File Name: ${file.name}
Size: ${(file.size / 1024).toFixed(2)} KB
Content: ${file.content ? JSON.stringify(file.content, null, 2) : 'Binary or text data.'}`;
                })
                .catch(error => {
                    document.getElementById('output').textContent = `Error: ${error.message}`;
                    console.error(error);
                });
        });
    </script>
</body>
</html>

```

---


## Full API Reference
For more specific control, you can use individual functions.
```html
// Load a JSON file
load.json('json-button-id').then(data => console.log(data));

// Load a text file
load.text('text-button-id').then(file => console.log(file.content));

// Load a binary file (e.g., an image) as an ArrayBuffer
load.binary('binary-button-id').then(file => console.log(file.content));

// Load an HTML file and append its content to a specific element
load.html('html-button-id', 'container-id');

// Load and execute a JavaScript file
load.js('js-button-id');

// Load and execute a Python file (requires Brython)
load.py('py-button-id');
