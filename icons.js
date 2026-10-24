// Inline SVG sprite shared by every page. Icons are referenced with <svg><use href="#i-name" /></svg>.
(function () {
    const stroke = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
    const icons = {
        arrow: `<path ${stroke} d="M5 12h14M13 6l6 6-6 6"/>`,
        check: `<path ${stroke} d="M4.5 12.5l5 5 10-11"/>`,
        close: `<path ${stroke} d="M6 6l12 12M18 6L6 18"/>`,
        plus: `<path ${stroke} d="M12 5v14M5 12h14"/>`,
        star: `<path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/>`,
        phone: `<path ${stroke} d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>`,
        mail: `<rect ${stroke} x="3" y="5" width="18" height="14" rx="2"/><path ${stroke} d="M3 7l9 6 9-6"/>`,
        pin: `<path ${stroke} d="M12 21s-7-6.1-7-11.5a7 7 0 0114 0C19 14.9 12 21 12 21z"/><circle ${stroke} cx="12" cy="9.5" r="2.5"/>`,
        home: `<path ${stroke} d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z"/>`,
        key: `<circle ${stroke} cx="8" cy="15" r="4"/><path ${stroke} d="M10.8 12.2L20 3M16 7l3 3M14 9l2 2"/>`,
        shield: `<path ${stroke} d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path ${stroke} d="M8.5 12l2.5 2.5 4.5-5"/>`,
        wrench: `<path ${stroke} d="M14.7 6.3a4 4 0 00-5.4 5.4L3.5 17.5a1.5 1.5 0 002.1 2.1l5.8-5.8a4 4 0 005.4-5.4l-2.6 2.6-2.1-.5-.5-2.1z"/>`,
        users: `<circle ${stroke} cx="9" cy="8" r="3.5"/><path ${stroke} d="M2.5 20a6.5 6.5 0 0113 0M16 4.6a3.5 3.5 0 010 6.8M18 14a6.5 6.5 0 013.5 6"/>`,
        ruler: `<path ${stroke} d="M3 17L17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>`,
        clock: `<circle ${stroke} cx="12" cy="12" r="9"/><path ${stroke} d="M12 7v5l3 2"/>`,
        palette: `<path ${stroke} d="M12 3a9 9 0 100 18c1.1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.7-1.5 1.7-1.5H17a4 4 0 004-4c0-4.7-4-8.5-9-8.5z"/><circle fill="currentColor" cx="7.5" cy="11" r="1.2"/><circle fill="currentColor" cx="10" cy="7" r="1.2"/><circle fill="currentColor" cx="15" cy="7.5" r="1.2"/>`,
        tag: `<path ${stroke} d="M3 12V4a1 1 0 011-1h8l9 9-9 9z"/><circle fill="currentColor" cx="7.5" cy="7.5" r="1.3"/>`,
        link: `<path ${stroke} d="M10 14a4.5 4.5 0 006.4 0l3-3a4.5 4.5 0 00-6.4-6.4l-1 1M14 10a4.5 4.5 0 00-6.4 0l-3 3a4.5 4.5 0 006.4 6.4l1-1"/>`,
        expand: `<path ${stroke} d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>`,
        upload: `<path ${stroke} d="M12 15V4M7.5 8.5L12 4l4.5 4.5M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3"/>`,
        grid: `<rect ${stroke} x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect ${stroke} x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect ${stroke} x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect ${stroke} x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>`,
        whatsapp: `<path fill="currentColor" d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.7-1.2 2.2 2.2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z"/>`,
        instagram: `<rect ${stroke} x="3" y="3" width="18" height="18" rx="5"/><circle ${stroke} cx="12" cy="12" r="4"/><circle fill="currentColor" cx="17.3" cy="6.7" r="1.1"/>`,
        facebook: `<path ${stroke} d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>`,
        tiktok: `<path ${stroke} d="M14 3v11.5a3.5 3.5 0 11-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.7"/>`,
        youtube: `<rect ${stroke} x="2.5" y="5.5" width="19" height="13" rx="4"/><path fill="currentColor" d="M10 9.2v5.6l4.8-2.8z"/>`
    };
    const symbols = Object.entries(icons)
        .map(([name, body]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${body}</symbol>`)
        .join('');
    const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${symbols}</svg>`;
    document.body.insertAdjacentHTML('afterbegin', sprite);
})();
