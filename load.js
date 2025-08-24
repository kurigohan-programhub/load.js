const load = {
  _loadFile: (buttonId, processFn, options) => {
    return new Promise((resolve, reject) => {
      const button = document.getElementById(buttonId);
      if (!button) {
        return reject(new Error(`Button with ID '${buttonId}' not found.`));
      }
      
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';

      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
          reject(new Error("No file selected."));
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const result = processFn(e.target.result);
            if (options.display) {
              console.log(result);
            }
            resolve(result);
          } catch (error) {
            reject(new Error(`Error while processing file content: ${error.message}`));
          }
        };
        reader.onerror = (e) => {
          reject(e.target.error);
        };
        reader.readAsText(file);
        
        document.body.removeChild(input);
      });

      button.addEventListener('click', () => {
        document.body.appendChild(input);
        input.click();
      });
    });
  },

  json: (buttonId, options = { display: true }) => {
    return load._loadFile(
      buttonId,
      (text) => JSON.parse(text),
      options
    );
  },

  text: (buttonId, options = { display: true }) => {
    return load._loadFile(
      buttonId,
      (text) => text,
      options
    );
  },

  js: (buttonId, options = { display: true }) => {
    return load._loadFile(
      buttonId,
      (text) => {
        const script = document.createElement('script');
        script.textContent = text;
        document.body.appendChild(script);
        return text;
      },
      options
    );
  },
};