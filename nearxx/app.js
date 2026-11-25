const form = document.getElementById("mock-form");
const profileName = document.getElementById("profile-name");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.hidden = false;
  toast.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = profileName.value.trim();
  if (!name) {
    profileName.focus();
    showToast("Mockup: add a profile name to continue.");
    return;
  }
  showToast(`Mockup: continue with “${name}”.`);
});

document.getElementById("edit-details").addEventListener("click", () => {
  showToast("Mockup: edit name, age and details.");
});

document.getElementById("add-contact").addEventListener("click", () => {
  showToast("Mockup: add client contact options.");
});
