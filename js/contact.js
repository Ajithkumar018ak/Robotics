

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-inquiry-form');
  const consoleOut = document.getElementById('contact-success-console');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const company = document.getElementById('contact-company').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const industry = document.getElementById('contact-industry').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please check email coordinates layout formatting.");
      return;
    }

    // Display high-tech terminal output logs
    if (consoleOut) {
      consoleOut.style.display = 'block';
      consoleOut.innerHTML = `
        [${new Date().toLocaleTimeString()}] INITIATING SECURE TRANSCEIVER SOCKET...<br>
        [${new Date().toLocaleTimeString()}] RESOLVING DNS: "connect.aethera.ai" (OK)<br>
        [${new Date().toLocaleTimeString()}] RESOLVING CLIENT ROUTING: "${name.toUpperCase()}"@${company.toUpperCase()}<br>
        [${new Date().toLocaleTimeString()}] ENCRYPTING PAYLOAD METRIC STREAM (RSA-4096)<br>
        [${new Date().toLocaleTimeString()}] INQUIRY COMPONENT SECTOR: "${industry.toUpperCase()}"<br>
        [${new Date().toLocaleTimeString()}] INJECTING MESSAGE STREAM CONTENT MATRIX...<br>
        [${new Date().toLocaleTimeString()}] ESTABLISHING SECURE GATEWAY TRANSMISSION LINK...<br>
        <span style="color: var(--accent-cyan); font-weight: bold;">[SUCCESS] MESSAGE DEPLOYED COMPLIANTLY. TRANSACTION LOG CODE: MSG-${Math.floor(Math.random()*8999)+1000}</span>
      `;
      consoleOut.scrollTop = consoleOut.scrollHeight;
    }

    // Reset form after delay
    setTimeout(() => {
      form.reset();
    }, 4500);
  });
}
