
document.addEventListener('DOMContentLoaded', () => {
  initCareersForm();
});

function initCareersForm() {
  const dragArea = document.getElementById('resume-drag-area');
  const fileInput = document.getElementById('app-resume');
  const form = document.getElementById('careers-application-form');
  const consoleOut = document.getElementById('app-success-console');
  const uploadText = document.getElementById('upload-text');
  const uploadIcon = document.getElementById('upload-icon');
  
  if (!dragArea || !fileInput || !form) return;

  let selectedFile = null;

  // Toggle file window on click
  dragArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  });

  // Drag and drop states
  dragArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragArea.classList.add('dragover');
  });

  dragArea.addEventListener('dragleave', () => {
    dragArea.classList.remove('dragover');
  });

  dragArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  });

  function handleFileSelection(file) {
    if (file.type !== 'application/pdf') {
      alert("System only accepts PDF vector dossiers.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      alert("Dossier exceeds system max allowance (10MB).");
      return;
    }

    selectedFile = file;
    uploadText.textContent = `SELECTED DOSSIER: ${file.name.toUpperCase()} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    uploadIcon.setAttribute('data-lucide', 'file-check');
    
    // Refresh Lucide icon rendering
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Handle Form Submission with simulated logs output
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Dossier files must be mounted to transmit.");
      return;
    }

    const name = document.getElementById('app-name').value;
    const email = document.getElementById('app-email').value;
    const phone = document.getElementById('app-phone').value;
    const role = document.getElementById('app-role').value;
    const letter = document.getElementById('app-letter').value;

    consoleOut.style.display = 'block';
    consoleOut.innerHTML = `
      [${new Date().toLocaleTimeString()}] INITIATING APPLICATION DOSSIER TRANSMISSION...<br>
      [${new Date().toLocaleTimeString()}] ENCODING CANDIDATE STRUCT: "${name.toUpperCase()}"...<br>
      [${new Date().toLocaleTimeString()}] TARGET COMPONENT: ${role.toUpperCase()}<br>
      [${new Date().toLocaleTimeString()}] UPLOADING DOSSIER PDF FILE: ${selectedFile.name.toUpperCase()}<br>
      [${new Date().toLocaleTimeString()}] ESTABLISHING SECURE CONNECTION TERMINAL PROTOCOL...<br>
      [${new Date().toLocaleTimeString()}] SERVER RESPONSE: 202 ACCEPTED (DOSSIER MOUNTED).<br>
      <span style="color: var(--accent-cyan); font-weight: bold;">[SUCCESS] RECRUITMENT SYSTEMS REGISTERED APPLICATION SECURELY. SHIELD SYSTEM CODES: A-${Math.floor(Math.random()*899)+100}</span>
    `;

    consoleOut.scrollTop = consoleOut.scrollHeight;

    // Reset inputs after delay
    setTimeout(() => {
      form.reset();
      selectedFile = null;
      uploadText.textContent = "DRAG AND DROP PDF RESUME OR CLICK TO UPLOAD";
      uploadIcon.setAttribute('data-lucide', 'upload-cloud');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 4000);
  });
}
