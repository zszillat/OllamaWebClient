// 1. Define your settings array
const settings = [
    {
      id: "name",
      label: "Name",
      inputType: "text",
      currentValue: "Jason"
    },
    {
      id: "favorite",
      label: "Favorite Person",
      inputType: "select",
      currentValue: "Jason",
      options: ["Johnny", "Tammy", "Crocks", "Jason"]
    },
  ];
  
  // 2. Grab the container
  const container = document.getElementById("settingsList");
  
  // 3. Loop through and build each field
  settings.forEach(field => {

    const lbl = document.createElement("label");
    lbl.htmlFor = field.id;
    lbl.textContent = field.label;
    lbl.style.display = "block"; 
    lbl.style.marginTop = "0.5em";
  
    let inputElem;
    if (field.inputType === "select") {
      inputElem = document.createElement("select");
      field.options.forEach(optValue => {
        const opt = document.createElement("option");
        opt.value = optValue;
        opt.textContent = optValue;
        if (optValue === field.currentValue) {
          opt.selected = true;
        }
        inputElem.appendChild(opt);
      });
    } else {
      inputElem = document.createElement("input");
      inputElem.type = field.inputType;
      inputElem.value = field.currentValue;
    }
    inputElem.id = field.id;
    inputElem.name = field.id;
    inputElem.style.marginBottom = "0.5em";
  
    container.appendChild(lbl);
    container.appendChild(inputElem);
  });

  console.log('settings.js loaded')