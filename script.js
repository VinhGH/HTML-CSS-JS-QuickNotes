const noteDialog = document.getElementById("noteDialog");
const noteForm = document.getElementById("noteForm");

function openNoteDialog() {
  noteDialog.showModal(); // Hiện popup
}

function closeNoteDialog() {
  noteDialog.close(); // Ẩn popup
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Note saved successfully!");
  noteDialog.close();
});


// Lấy trạng thái dark mode từ localStorage
let darkmode = localStorage.getItem("darkmode");

// Lấy 2 nút đổi theme
const themeToggLight = document.getElementById("themeToggLight"); // 🌙
const themeToggDark = document.getElementById("themeToggDark");   // ☀️

// Hàm bật dark mode
function enableDarkmode() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("darkmode", "active");
  themeToggLight.style.display = "none";
  themeToggDark.style.display = "inline-block";
}

// Hàm tắt dark mode
function disableDarkmode() {
  document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("darkmode", "inactive");
  themeToggDark.style.display = "none";
  themeToggLight.style.display = "inline-block";
}

// Khi load trang, kiểm tra trạng thái
if (darkmode === "active") {
  enableDarkmode();
} else {
  disableDarkmode();
}

// Gắn sự kiện click cho 2 nút
themeToggLight.addEventListener("click", enableDarkmode);
themeToggDark.addEventListener("click", disableDarkmode);
