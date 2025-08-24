const load = {
  _loadFile: (triggerId, processFn, options) => {
    return new Promise((resolve, reject) => {
      const triggerElement = document.getElementById(triggerId);
      if (!triggerElement) {
        return reject(new Error(`Element with ID '${triggerId}' not found.`));
      }

      const defaultOptions = {
        log: false,
        filter: null,
        multiple: false,
        displayProgress: false,
      };
      const currentOptions = { ...defaultOptions, ...options };

      const handleFiles = (files) => {
        if (currentOptions.log) {
          console.log(`[load.js LOG] Starting to load ${files.length} file(s).`);
        }

        const promises = Array.from(files).map(file => {
          return new Promise((res, rej) => {
            const reader = new FileReader();

            reader.onloadstart = () => {
              if (currentOptions.log) {
                console.log(`[load.js LOG] Loading started for '${file.name}'.`);
              }
            };

            reader.onprogress = (e) => {
              if (currentOptions.displayProgress) {
                const progress = (e.loaded / e.total) * 100;
                console.log(`[load.js PROGRESS] ${file.name}: ${progress.toFixed(2)}%`);
              }
            };

            reader.onload = (e) => {
              try {
                const content = processFn(e.target.result, currentOptions.filter);
                const fileInfo = {
                  name: file.name,
                  extension: file.name.split('.').pop(),
                  content: content,
                };
                if (currentOptions.log) {
                  console.log(`[load.js LOG] File '${file.name}' loaded successfully.`);
                }
                res(fileInfo);
              } catch (error) {
                rej(new Error(`Failed to process '${file.name}': ${error.message}`));
              }
            };

            reader.onerror = (e) => {
              if (currentOptions.log) {
                console.error(`[load.js LOG] Error loading '${file.name}':`, e.target.error);
              }
              rej(e.target.error);
            };

            reader.readAsText(file);
          });
        });

        Promise.all(promises)
          .then(resolve)
          .catch(reject);
      };

      triggerElement.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        if (currentOptions.multiple) {
          input.setAttribute('multiple', '');
        }
        document.body.appendChild(input);
        input.click();
        input.addEventListener('change', (e) => {
          handleFiles(e.target.files);
          document.body.removeChild(input);
        });
      });
      
      triggerElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        triggerElement.style.border = '2px dashed #007BFF';
      });

      triggerElement.addEventListener('dragleave', (e) => {
        e.preventDefault();
        triggerElement.style.border = '';
      });

      triggerElement.addEventListener('drop', (e) => {
        e.preventDefault();
        triggerElement.style.border = '';
        if (e.dataTransfer.files) {
          handleFiles(e.dataTransfer.files);
        }
      });
    });
  },

  json: (triggerId, options = {}) => {
    return load._loadFile(
      triggerId,
      (text, filter) => {
        const jsonData = JSON.parse(text);
        if (!filter || !Array.isArray(filter) || filter.length === 0) {
          return jsonData;
        }
        const filteredData = {};
        for (const key of filter) {
          if (jsonData.hasOwnProperty(key)) {
            filteredData[key] = jsonData[key];
          }
        }
        return filteredData;
      },
      options
    );
  },

  text: (triggerId, options = {}) => {
    return load._loadFile(triggerId, (text) => text, options);
  },

  html: (triggerId, parentId, options = {}) => {
    return load._loadFile(
      triggerId,
      (text) => {
        const parentElement = document.getElementById(parentId);
        if (!parentElement) {
          throw new Error(`Parent element with ID '${parentId}' not found.`);
        }
        parentElement.innerHTML += text;
        return text;
      },
      options
    );
  },

  js: (triggerId, options = {}) => {
    return load._loadFile(
      triggerId,
      (text) => {
        const script = document.createElement('script');
        script.textContent = text;
        document.body.appendChild(script);
        return text;
      },
      options
    );
  },

  py: (triggerId, options = {}) => {
    return load._loadFile(
      triggerId,
      (text) => {
        const script = document.createElement('script');
        script.type = 'text/python';
        script.textContent = text;
        document.body.appendChild(script);
        brython();
        return text;
      },
      options
    );
  },
};
