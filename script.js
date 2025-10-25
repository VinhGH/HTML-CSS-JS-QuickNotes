// ============================
// LẤY CÁC PHẦN TỬ DOM
// ============================
const noteDialog = document.getElementById("noteDialog");
const noteForm = document.getElementById("noteForm");
const closeBtn = document.getElementById("close_btn");
const cancelBtn = document.querySelector(".cancel_btn");
const notesContainer = document.getElementById("notesContainer");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

// ============================
// MỞ / ĐÓNG DIALOG
// ============================
function openNoteDialog() {
  noteDialog.showModal();
}
function closeNoteDialog() {
  noteDialog.close();
}
closeBtn.addEventListener("click", closeNoteDialog);
cancelBtn.addEventListener("click", closeNoteDialog);

// ============================
// BIẾN LƯU DỮ LIỆU GHI CHÚ
// ============================
let dataNote = JSON.parse(localStorage.getItem("notes")) || [];

// ============================
// XỬ LÝ KHI NGƯỜI DÙNG SUBMIT FORM
// ============================
noteForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn reload trang

  // Lấy dữ liệu từ form
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Tạo object note mới
  const newNote = {
    id: Date.now(), 
    title,
    content,
  };

  // Thêm vào mảng và lưu vào localStorage
  dataNote.push(newNote);
  localStorage.setItem("notes", JSON.stringify(dataNote));

  // Reset form và đóng dialog
  noteForm.reset();
  closeNoteDialog();

  // Render lại danh sách
  renderDataNote();
});

// ============================
// HÀM HIỂN THỊ DANH SÁCH GHI CHÚ
// ============================
function renderDataNote() {
  notesContainer.innerHTML = ""; // Xoá nội dung cũ

  if (dataNote.length === 0) {
    // Nếu rỗng -> hiển thị trạng thái trống
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
      </div>
    `;
    return;
  }

  renderDataNote();

  // Nếu có dữ liệu -> duyệt và render từng ghi chú
  dataNote.forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("note-card");
    card.setAttribute("data-id", note.id);

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="note-actions">
       <button class="edit-btn" onclick="editNote(${note.id})">
      <i class="fa-solid fa-pen"></i>
    </button>
    <button class="delete-btn" onclick="deleteNote(${note.id})">
      <i class="fa-solid fa-xmark"></i>
    </button>
      </div>
    `;

    notesContainer.appendChild(card);
  });
}

// ============================
// CHỨC NĂNG XOÁ & SỬA GHI CHÚ
// ============================

// Xoá ghi chú
function deleteNote(id) {
  if (confirm("Bạn có chắc muốn xoá ghi chú này không?")) {
    dataNote = dataNote.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(dataNote));
    renderDataNote();
  }
}


// ============================
// THEME TOGGLE (Light / Dark)
// ============================
let darkmode = localStorage.getItem("darkmode");
const themeToggLight = document.getElementById("themeToggLight");
const themeToggDark = document.getElementById("themeToggDark");

function enableDarkmode() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("darkmode", "active");
  themeToggLight.style.display = "none";
  themeToggDark.style.display = "inline-block";
}

function disableDarkmode() {
  document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("darkmode", "inactive");
  themeToggDark.style.display = "none";
  themeToggLight.style.display = "inline-block";
}

if (darkmode === "active") enableDarkmode();
else disableDarkmode();

themeToggLight.addEventListener("click", enableDarkmode);
themeToggDark.addEventListener("click", disableDarkmode);
