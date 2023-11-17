const table = document.getElementById("table");
const submitButton = document.getElementById("submit");
const matkulInput = document.getElementById("matkul");
const keteranganInput = document.getElementById("keterangan");
const deadlineInput = document.getElementById("tenggat");
const pengumpulanInput = document.getElementById("pengumpulan");
const cancelButton = document.querySelector("#cancel");
const actionElement = document.querySelector("#action");
const createButton = document.querySelector("#tambah");
let editButton = document.querySelectorAll(".update");
let saveButton = document.querySelector("#save");

let dataTugas = [];

// READ DATA
const readData = JSON.parse(localStorage.getItem("dataTugas"));
if (readData !== null) {
  readData.map((data) => {
    dataTugas.push(data);
  });
}

const createData = async () => {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  dataTugas.map((data) => {
    const row = document.createElement("tr");
    row.className = "border-b border-black";
    const tableHeader = document.createElement("th");
    tableHeader.innerText = dataTugas.indexOf(data) + 1;
    tableHeader.className = "px-2";
    const matkulColumnData = document.createElement("td");
    matkulColumnData.innerText = data.matkul;
    const keteranganColumnData = document.createElement("td");
    keteranganColumnData.innerText = data.keterangan;
    const deadlineColumnData = document.createElement("td");
    deadlineColumnData.innerText = new Date(data.deadline).toDateString();
    const pengumpulanColumnData = document.createElement("td");
    pengumpulanColumnData.innerText = data.pengumpulan;
    const actionColumn = document.createElement("td");
    actionColumn.className = "flex justify-center gap-3 py-2";
    const deleteButtonColumn = document.createElement("button");
    const editButtonColumn = document.createElement("i");
    editButtonColumn.className =
      "my-auto fa-solid fa-pen-to-square fa-2xl cursor-pointer update";
    deleteButtonColumn.innerText = "X";
    deleteButtonColumn.className = "btn btn-error btn-sm delete";
    deleteButtonColumn.setAttribute("type", "button");

    table.appendChild(row);
    row.appendChild(tableHeader);
    row.appendChild(matkulColumnData);
    row.appendChild(keteranganColumnData);
    row.appendChild(deadlineColumnData);
    row.appendChild(pengumpulanColumnData);
    row.appendChild(actionColumn);
    actionColumn.appendChild(deleteButtonColumn);
    actionColumn.appendChild(editButtonColumn);
  });

  // DELETE DATA
  let deleteButton = document.querySelectorAll(".delete");
  deleteButton.forEach((value, index) => {
    value.addEventListener("click", (e) => {
      e.preventDefault();
      delete dataTugas[index];
      dataTugas = dataTugas.filter((item) => item !== undefined);
      createData();
      deleteButton = document.querySelectorAll(".delete");
      localStorage.setItem("dataTugas", JSON.stringify(dataTugas));
    });
  });

  // EDIT DATA
  editButton = document.querySelectorAll(".update");
  saveButton = document.querySelector("#save");

  editButton.forEach((value, index) => {
    value.addEventListener("click", (e) => {
      e.preventDefault();
      saveButton.classList.remove("hidden");
      submitButton.classList.add("hidden");
      actionElement.classList.remove("hidden");
      actionElement.classList.add("absolute");
      actionElement.classList.add("flex");
      matkulInput.value = dataTugas[index].matkul;
      keteranganInput.value = dataTugas[index].keterangan;
      deadlineInput.value = dataTugas[index].deadline;
      pengumpulanInput.value = dataTugas[index].pengumpulan;

      saveButton.addEventListener("click", () => {
        dataTugas[index].matkul = matkulInput.value;
        dataTugas[index].keterangan = keteranganInput.value;
        dataTugas[index].deadline = deadlineInput.value;
        dataTugas[index].pengumpulan = pengumpulanInput.value;
        localStorage.setItem("dataTugas", JSON.stringify(dataTugas));
        createData();
        actionElement.classList.remove("absolute");
        actionElement.classList.add("hidden");
        saveButton.classList.add("hidden");
        submitButton.classList.remove("hidden");
      });
    });
  });
};
createData();

// CREATE DATA
submitButton.addEventListener("click", (e) => {
  if (
    matkulInput.value != "" ||
    keteranganInput.value != "" ||
    deadlineInput.value != "" ||
    pengumpulanInput.value != ""
  ) {
    e.preventDefault();
    dataTugas.push({
      matkul: matkulInput.value,
      keterangan: keteranganInput.value,
      deadline: deadlineInput.value,
      pengumpulan: pengumpulanInput.value,
    });

    localStorage.setItem("dataTugas", JSON.stringify(dataTugas));

    matkulInput.value = "";
    keteranganInput.value = "";
    deadlineInput.value = "";
    pengumpulanInput.value = "";
    createData();
    actionElement.classList.remove("absolute");
    actionElement.classList.add("hidden");
  } else {
    alert("Mohon Masukkan Semua Data");
  }
});

// Cancel Button

cancelButton.addEventListener("click", () => {
  actionElement.classList.remove("absolute");
  actionElement.classList.remove("flex");
  actionElement.classList.add("hidden");
  matkulInput.value = "";
  keteranganInput.value = "";
  deadlineInput.value = "";
  pengumpulanInput.value = "";
  saveButton.classList.add("hidden");
  submitButton.classList.remove("hidden");
});

// Tambah Button
createButton.addEventListener("click", () => {
  matkulInput.value = "";
  keteranganInput.value = "";
  deadlineInput.value = "";
  pengumpulanInput.value = "";
  actionElement.classList.remove("hidden");
  actionElement.classList.add("absolute");
  actionElement.classList.add("flex");
});
