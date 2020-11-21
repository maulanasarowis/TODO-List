// Tanggal dan Waktu
window.onload = setInterval(clock, 1000);

function clock() {
  var d = new Date();

  var date = d.getDate();

  var month = d.getMonth();
  var montharr = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  month = montharr[month];

  var year = d.getFullYear();

  var day = d.getDay();
  var dayarr = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  day = dayarr[day];

  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();

  document.getElementById("date").innerHTML =
    day + ", " + date + " " + month + " " + year;
  document.getElementById("time").innerHTML = hour + ":" + min;
}
// tutup Tanggal dan Waktu

let todos = {};
const STORAGE_TODO = "STORAGE_TODO";

const todoBox = document.getElementById(`todo`);

// cek local storage
if (typeof Storage !== "undefined") {
  // alert("Ok, Support"); // Code for localStorage
  console.log("Ok, Support");
} else {
  // alert("Opss, No support"); // No web storage Support.
  console.log("Opss, No support");
}

// baca local storage pertama di load
if ((todoFormLocal = localStorage.getItem(STORAGE_TODO))) {
  todos = JSON.parse(todoFormLocal);

  for (let key in todos) {
    createList(key, todos[key]);
  }
}
function syncLocalStorage(activity, item, status = false) {
  switch (activity) {
    case "ADD":
    case "UPDATE":
      todos[item] = status;
      break;
    case "DELETE":
      delete todos[item];
      break;
    default:
      break;
  }
  // console.log(todos);
  localStorage.setItem(STORAGE_TODO, JSON.stringify(todos));
  return;
}

// Fitur TODO:
// 1. menambahkan
// 2. coret kalau sudah selesai
// 3. menghapus
async function add() {
  // 1. ambil nilai dari teksnya
  let teksBaru = document.getElementById(`teks-baru`);
  // 2. tambahkan list baru ke ul
  await createList(teksBaru.value);
  syncLocalStorage("ADD", teksBaru.value);
  //3. kosongkan fieldnya
  teksBaru.value = "";
}

function createList(text, status = false) {
  let isDone = status ? "done" : "";

  // let newTodo = `<div class='card'>
  //                   <div class='card-body'>
  //                     <span class='${isDone}' onclick='toggle(this)'>${text}<img class='rounded float-right kursor' src='icon/check.png'></span>
  //                     <img class='rounded float-right kursor' src='icon/delete.png' onclick='removeItem(this)'>
  //                   </div>
  //                 </div>`;

  let newTodo = `<ul class="list-group list-group-flush">
                    <li class="list-group-item list-group-item-secondary"><span class='${isDone}' onclick='toggle(this)'>${text}<img class='rounded float-right kursor' src='icon/check.png'></span>
                    <img class='rounded float-right kursor' src='icon/delete.png' onclick='removeItem(this)'></li>
                  </ul>`;

  //

  todoBox.insertAdjacentHTML("afterbegin", newTodo);
}

function toggle(el) {
  let status = el.classList.toggle("done");
  syncLocalStorage("UPDATE", el.innerText, status);
}

function removeItem(el) {
  el.parentElement.remove();
  syncLocalStorage("DELETE", el.previousElementSibling.innerText.trim());
}
