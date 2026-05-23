/**
 * Shared Utils for Toolifya
 */

// Formats bytes to standard KB/MB representation
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Download a single dataURL
export function downloadFile(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Set up Navbar responsive hamburger toggle and active states
export function initNavbar() {
  const scheduleInit = window.requestIdleCallback || (cb => setTimeout(cb, 50));
  scheduleInit(() => {
    const toggleBtn = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('block');
      });
    }

    const dropdownBtn = document.getElementById('tools-dropdown-btn');
    const dropdownMenu = document.getElementById('tools-dropdown');
    if (dropdownBtn && dropdownMenu) {
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        dropdownMenu.classList.add('hidden');
      });
    }
  });
}

// Setup common setup like mobile analytics or ads placeholder log
export function logSponsorship() {
  const scheduleLog = window.requestIdleCallback || (cb => setTimeout(cb, 100));
  scheduleLog(() => {
    console.log('Toolifya — Fast, Free, No Signup. Proudly Monetized with AdSense.');
  });
}
