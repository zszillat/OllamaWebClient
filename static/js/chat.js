document.addEventListener('DOMContentLoaded', () => {

    // CUSTOM TEXT BOX
    const presetSelect     = document.getElementById('presetSelect');
    const selectedEl       = document.getElementById('selectedPreset');
    const optionsContainer = presetSelect.querySelector('.preset-options');
    let isOpen = false;
  
    // initial alphabetical sort
    sortOptions();
  
    // open/close on click
    selectedEl.addEventListener('click', toggleDropdown);
  
    // swap & re-sort on option click
    optionsContainer.addEventListener('click', e => {
      const opt = e.target;
      if (!opt.classList.contains('option')) return;
      // swap text
      [selectedEl.textContent, opt.textContent] = [opt.textContent, selectedEl.textContent];
      sortOptions();
      toggleDropdown();
    });
  
    function toggleDropdown() {
      if (!isOpen) {
        // measure total height of all options
        const total = Array.from(optionsContainer.children)
          .reduce((sum, el) => sum + el.offsetHeight, 0);
        optionsContainer.style.maxHeight = total + 'px';
      } else {
        optionsContainer.style.maxHeight = '0';
      }
      isOpen = !isOpen;
    }
  
    function sortOptions() {
      const opts = Array.from(optionsContainer.querySelectorAll('.option'));
      opts.sort((a, b) => a.textContent.localeCompare(b.textContent, undefined, { sensitivity: 'base' }));
      opts.forEach(o => optionsContainer.appendChild(o));
    }

    // CHATBAR
    // Auto-grow the textarea height to fit content
    const textarea = document.getElementById('chat-input');
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';               // reset height
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });
  