const applianceList = document.querySelector("#applianceList");
const applianceCSV = document.querySelector("#applianceCSV");
const totalWattage = document.querySelector("#totalWattage");
const modal = document.getElementById("theModal");
const premodal = document.getElementById("preModal");
const modals = document.getElementById("theModals");
const span = document.getElementById("close");

let wattageSum = 0;

function addAppliance() {
  const name = document.querySelector("#applianceName").value;
  const wattage = parseInt(document.querySelector("#applianceWattage").value);
  const mph = document.querySelector("#mph").value;
  const hpd = parseInt(document.querySelector("#hpd").value);
  const dpw = parseInt(document.querySelector("#dpw").value);
  const row = document.createElement("tr");
  row.innerHTML = `
            <td>${name}</td>
            <td>${wattage} W</td>
            <td>${mph}</td>
            <td>${hpd}</td>
            <td>${dpw}</td>
            <td><button type="button" onclick="addToTotalWattage(${wattage})">Add</button></td>
        `;
  applianceList.appendChild(row);
}

function addToTotalWattage(wattage) {
  wattageSum += wattage;
  totalWattage.textContent = `Total Wattage: ${wattageSum} W`;
}
function addTotalWattage() {
  wattageSum = 0;
  totalWattage.textContent = `Total Wattage: ${wattageSum} W`;
  const rows = document.querySelectorAll("#applianceList tr");
  for (let i = 0; i < rows.length; i++) {
    const wattage = parseInt(
      rows[i].querySelectorAll("td")[1].textContent.match(/\d+/)[0]
    );
    wattageSum += wattage;
  }
  totalWattage.textContent = `Total Wattage: ${wattageSum} W`;
}

let appliances = [];

function addAppliance() {
  const name = document.querySelector("#applianceName").value;
  const wattage = parseInt(document.querySelector("#applianceWattage").value);
  const mph = parseInt(document.querySelector("#mph").value);
  const hpd = parseInt(document.querySelector("#hpd").value);
  const dpw = parseInt(document.querySelector("#dpw").value);
  const row = document.createElement("tr");
  row.innerHTML = `
                <td>${name}</td>
                <td>${wattage} W</td>
                <td>${mph}</td>
                <td>${hpd}</td>
                <td>${dpw}</td>
                <td><button type="button" class="singrem" onclick="addToTotalWattage(${wattage})">Add</button></td>
            `;
  applianceList.appendChild(row);
  modal.style.display = "none";

  const appliance = { name, wattage, mph, hpd, dpw };
  appliances.push(appliance);
  saveAppliances();
  displayAppliances();
}

function addGadget(wattage, gadgetName) {
  modal.style.display = "block";
  document.querySelector("#applianceName").value = gadgetName;
  document.querySelector("#applianceWattage").value = wattage;
}

function removeAllAppliances() {
  appliances = [];
  saveAppliances();
  displayAppliances();
}

function removeAppliance(index) {
  appliances.splice(index, 1);
  saveAppliances();
  displayAppliances();
}

function saveAppliances() {
  localStorage.setItem("appliances", JSON.stringify(appliances));
}

function loadAppliances() {
  const storedAppliances = localStorage.getItem("appliances");
  if (storedAppliances) {
    appliances = JSON.parse(storedAppliances);
  }
}
function runModal() {
  modal.style.display = "block";
}
function runModals() {
  modals.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
  modals.style.display = "none";
}
function displayAppliances() {
  applianceList.innerHTML = "";
  for (let i = 0; i < appliances.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${appliances[i].name}</td>
                    <td>${appliances[i].wattage} W</td>
                    <td>${appliances[i].mph} </td>
                    <td>${appliances[i].hpd} </td>
                    <td>${appliances[i].dpw} </td>
                    <td><button type="button" onclick="removeAppliance(${i})">X</button></td>
                `;
    applianceList.appendChild(row);
  }
}
async function addGadgets(names, wattage) {
  modal.style.display = "block";

  document.querySelector("#applianceName").value = names;
  document.querySelector("#applianceWattage").value = wattage;
}
let appliancess = [];
function uploadCsv() {
  const fileInput = document.querySelector("#csvFile");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const csv = event.target.result;
    const lines = csv.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const fields = lines[i].split(",");
      const names = fields[0];
      const wattage = parseInt(fields[1]);
      const appliance = { names, wattage };
      appliancess.push(appliance);
    }
    saveAppliances();
    displayCSV();
  };
  reader.readAsText(file);
  modals.style.display = "none";
}

function displayCSV() {
  applianceCSV.innerHTML = "";
  for (let i = 0; i < appliancess.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${appliancess[i].names}</td>
                    <td>${appliancess[i].wattage} W</td>
                    <td><button type="button" onclick="addGadgets( '${appliancess[i].names}', ${appliancess[i].wattage})">+</button></td>
                `;
    applianceCSV.appendChild(row);
  }
}

loadAppliances();
displayAppliances();
