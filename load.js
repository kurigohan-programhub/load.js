function processError(type, fileName) {
  let message = `An error occurred with: ${fileName}`;
  switch (type) {
    case 'fileType':
      message += '\nThis function does not support the file extension you provided.';
      break;
    case 'jsonParse':
      message += '\nJSON parsing failed. The file content is in an invalid format.';
      break;
    case 'fileRead':
      message += '\nAn error occurred while reading the file. The file may be corrupted or inaccessible.';
      break;
    case 'security':
      message += '\nSecurity error: This operation is blocked by browser security restrictions in a local environment.';
      break;
    default:
      message += '\nAn unknown error occurred.';
  }
  return message;
}

const load = {
  _createInputAndProcess(triggerId, options, resolve, reject, readAsMethod, processingFunc) {
    const triggerElement = document.getElementById(triggerId);
    if (!triggerElement) {
      return reject(new Error(`Element with ID "${triggerId}" was not found.`));
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = options.multiple || false;
    input.style.display = 'none';
    document.body.appendChild(input);

    const loadFile = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          processingFunc(file, reader.result, resolve, reject);
        } catch (e) {
          const errorMessage = processError('jsonParse', file.name);
          reject(new Error(errorMessage));
        }
      };
      reader.onerror = () => {
        const errorMessage = processError('fileRead', file.name);
        reject(new Error(errorMessage));
      };
      if (readAsMethod === 'readAsArrayBuffer') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    };

    input.addEventListener('change', event => {
      const files = event.target.files;
      if (files.length > 0) {
        if (options.multiple) {
          Promise.all(Array.from(files).map(file => new Promise(res => loadFile(file, res, reject)))).then(resolve).catch(reject);
        } else {
          loadFile(files[0]);
        }
      } else {
        reject(new Error('No file was selected.'));
      }
      document.body.removeChild(input);
    });

    triggerElement.addEventListener('click', () => input.click());
  },

  auto(triggerId, options = {}) {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = options.multiple || false;
      input.style.display = 'none';
      document.body.appendChild(input);

      const handleFile = (file) => {
        if (!file) {
          return reject(new Error('No file was selected.'));
        }
        const extension = file.name.split('.').pop().toLowerCase();
        
        console.log(`File: ${file.name}, Extension: .${extension}, Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

        switch (extension) {
          case 'json':
            this.json(triggerId, options).then(resolve).catch(reject);
            break;
          case 'txt':
          case 'md':
            this.text(triggerId, options).then(resolve).catch(reject);
            break;
          case 'html':
            this.html(triggerId, options).then(resolve).catch(reject);
            break;
          case 'js':
            this.js(triggerId, options).then(resolve).catch(reject);
            break;
          case 'py':
            this.py(triggerId, options).then(resolve).catch(reject);
            break;
          case 'png':
          case 'jpg':
          case 'jpeg':
          case 'gif':
          case 'svg':
          case 'mp3':
          case 'wav':
          case 'pdf':
            this.binary(triggerId, options).then(resolve).catch(reject);
            break;
          default:
            const errorMessage = processError('fileType', file.name);
            reject(new Error(errorMessage));
        }
      };

      input.addEventListener('change', event => {
        handleFile(event.target.files[0]);
        document.body.removeChild(input);
      });
      
      const triggerElement = document.getElementById(triggerId);
      if (triggerElement) {
        triggerElement.addEventListener('click', () => input.click());
      } else {
        reject(new Error(`Element with ID "${triggerId}" was not found.`));
      }
    });
  },

  json(triggerId, options = {}) {
    return new Promise((resolve, reject) => {
      const processingFunc = (file, content, res, rej) => {
        try {
          const result = JSON.parse(content);
          if (options.filter && Array.isArray(options.filter)) {
            const filteredResult = {};
            options.filter.forEach(key => {
              if (result[key]) {
                filteredResult[key] = result[key];
              }
            });
            res({ name: file.name, content: filteredResult, type: file.type, size: file.size });
          } else {
            res({ name: file.name, content: result, type: file.type, size: file.size });
          }
        } catch (e) {
          const errorMessage = processError('jsonParse', file.name);
          rej(new Error(errorMessage));
        }
      };
      this._createInputAndProcess(triggerId, options, resolve, reject, 'readAsText', processingFunc);
    });
  },

  text(triggerId, options = {}) {
    return new Promise((resolve, reject) => {
      const processingFunc = (file, content, res, rej) => {
        res({ name: file.name, content: content, type: file.type, size: file.size });
      };
      this._createInputAndProcess(triggerId, options, resolve, reject, 'readAsText', processingFunc);
    });
  },

  html(triggerId, parentId, options = {}) {
    return new Promise((resolve, reject) => {
      const parentIds = Array.isArray(parentId) ? parentId : [parentId];
      const processingFunc = (file, content, res, rej) => {
        parentIds.forEach(id => {
          const parentEl = document.getElementById(id);
          if (parentEl) {
            parentEl.innerHTML += content;
            console.log("HTML content has been added to the element.");
          }
        });
        res();
      };
      this._createInputAndProcess(triggerId, options, resolve, reject, 'readAsText', processingFunc);
    });
  },
  
  js(triggerId, options = {}) {
    return new Promise((resolve, reject) => {
      const processingFunc = (file, content, res, rej) => {
        const script = document.createElement('script');
        script.textContent = content;
        document.body.appendChild(script);
        res();
      };
      this._createInputAndProcess(triggerId, options, resolve, reject, 'readAsText', processingFunc);
    });
  },

  py(triggerId, options = {}) {
    return new Promise((resolve, reject) => {
      const processingFunc = (file, content, res, rej) => {
        const brythonScript = document.createElement('script');
        brythonScript.type = 'text/python';
        brythonScript.textContent = content;
        document.body.appendChild(brythonScript);
        brython();
        res();
      };
      this._createInputAndProcess(triggerId, options, resolve, reject, 'readAsText', processingFunc);
    });
  },

  binary(triggerId, options = {}) {
    return new Promise((resolve, reject) => {
      const processingFunc = (file, content, res, rej) => {
        res({ name: file.name, content: content, type: file.type, size: file.size });
      };
      this._createInputAndProcess(triggerId, options, resolve, reject, 'readAsArrayBuffer', processingFunc);
    });
  }
};
