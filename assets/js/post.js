const svg_copy = `<svg aria-hidden="true" fill="#6a737d" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16">
    <path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>
</svg>`;
const svg_tick = `<svg aria-hidden="true" fill="#00ab6b" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16">
    <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
</svg>`;

function toggle_toc(tocButton) {
    /** Hide/Show Table of Content when click the tocButton */
    document.getElementById("table-content").classList.toggle("hidden");

    if (tocButton.innerHTML.includes("Hiện")) {
        tocButton.innerHTML = "Ẩn mục lục <img src='/assets/icons/expand_less.svg'>";
    } else {
        tocButton.innerHTML = "Hiện mục lục <img src='/assets/icons/expand_more.svg'>";
    }
}

function cleanURL(url) {
    /** Remove all non-english characters in URL */
    let vi_url = decodeURI(url);
    vi_url     = vi_url.replace(/[^\x00-\x7F]/g, ""); // Regex ASCII characters
    return vi_url;
}

function copy_code(element) {
    // var selection = window.getSelection();
    // var range     = document.createRange();
    // range.selectNodeContents(element);

    // selection.removeAllRanges();
    // selection.addRange(range);

    // document.execCommand("copy");
    navigator.clipboard.writeText(element.innerText.trim());
    
    // selection.removeAllRanges();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function copied(el, button) {
    copy_code(el.querySelector("code"));
    button.innerHTML = svg_tick;
    await sleep(500);
    button.innerHTML = svg_copy;
}

function create_copy_button(el) {
    /**
     * Wrapper <div class="code-highlight"><pre></pre><div>
     * `el` is the element you want to wrap 
     */
    const parent      = el.parentNode;
    const wrapper     = document.createElement('div');
    wrapper.className = "code-highlight";
    
    // set the wrapper as child (instead of the el)
    parent.replaceChild(wrapper, el);

    // set el as child of wrapper
    wrapper.appendChild(el);

    // Add button to Wrapper
    const button     = document.createElement('button');
    button.innerHTML = svg_copy;
    button.className = "btn btn-default btn-sm copy-code-button";
    button.addEventListener("click", () => copied(el, button));

    wrapper.appendChild(button);
}

// Auto-script for copy code block
document.querySelectorAll("pre").forEach(create_copy_button);

// Auto-script to clean url
document.querySelectorAll(["h1", "h2", "h3", "h4", "h5", "h6"]).forEach(el => el.id = cleanURL(el.id));
const tocEl = document.querySelector("#toc");
if (tocEl) {
    tocEl.querySelectorAll("a").forEach(el => el.href = cleanURL(el.href));
}
