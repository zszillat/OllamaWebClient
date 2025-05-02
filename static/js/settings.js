// Destructure settings and presets from a global APP_DATA object
const { settings, presets } = window.APP_DATA;

// Log the keys of the settings object for debugging
console.log(Object.keys(settings));

// Assign the presets to the default preset’s options array
settings.defaultPreset.options = presets;

// Grab the container element where we’ll render our settings controls
const container = document.getElementById("settingsList");

// client‐side script.js

/**
 * Send the updated settings object to your FastAPI endpoint.
 * @param {Object} s The full settings object.
 */
function updateSettings(s) {
  s.defaultPreset.options = []
  fetch('/save_settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(s)           // serialize the settings object
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Settings saved:', data);
    })
    .catch(err => {
      console.error('Failed to save settings:', err);
    });
}


// Iterate over each field name in the settings object
Object.keys(settings).forEach(field => {
  const fieldData = settings[field]; // shorthand reference

  // Create a <label> for this setting
  const lbl = document.createElement("label");
  lbl.htmlFor = fieldData.id;                   // link label to input by id
  lbl.textContent = fieldData.label;            // show human-friendly name
  lbl.style.display = "block";                  // stack labels/inputs vertically
  lbl.style.marginTop = "0.5em";                // add some spacing above

  let inputElem;

  // If this setting should be a dropdown menu...
  if (fieldData.inputType === "select") {
    inputElem = document.createElement("select");

    // Populate the <select> with options
    fieldData.options.forEach(optValue => {
      const opt = document.createElement("option");
      opt.value = optValue.id;                   // the option’s internal value
      opt.textContent = optValue.label;          // the text shown to users

      // Pre-select the option if it matches the current value
      if (optValue.id === fieldData.currentValue) {
        opt.selected = true;
      }
      inputElem.appendChild(opt);
    });

    // Update model & send whenever the selection changes
    inputElem.addEventListener('change', () => {
      fieldData.currentValue = inputElem.value;
      updateSettings(settings);
    });

  } else {
    // Otherwise, fall back to a standard <input> (text, number, etc.)
    inputElem = document.createElement("input");
    inputElem.type = fieldData.inputType;        // e.g. "text", "number"
    inputElem.value = fieldData.currentValue;    // initialize with current value

    // Update model & send on every keystroke/paste/etc.
    inputElem.addEventListener('input', () => {
      fieldData.currentValue = inputElem.value;
      updateSettings(settings);
    });
  }

  // Common attributes for both <input> and <select>
  inputElem.id = fieldData.id;                   // unique DOM id
  inputElem.name = fieldData.id;                 // form-submission name
  inputElem.style.marginBottom = "0.5em";        // spacing below each control

  // Append the label + input to the container in the DOM
  container.appendChild(lbl);
  container.appendChild(inputElem);
});

// Final log to confirm the script loaded successfully
console.log('settings.js loaded');
