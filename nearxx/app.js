const form = document.getElementById("name-contact-form");
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
    showToast("Add a profile name to continue.");
    return;
  }
  showToast(`Saved “${name}”. Continue to step 2.`);
});

document.getElementById("edit-details").addEventListener("click", () => {
  showToast("Open name, age and details.");
});

document.getElementById("add-contact").addEventListener("click", () => {
  showToast("Add how clients contact you.");
});
