document.addEventListener('DOMContentLoaded', () => {
    const seed = [
        { id: 'LOT-2026-98321', crop: 'Paddy', variety: 'Sona Masuri', weight: '5.0 Tonnes', bags: '100 Bags', grade: 'A Premium', location: 'Indore, MP', created: '22 Sep, 2026', released: false },
        { id: 'LOT-2026-98274', crop: 'Wheat', variety: 'Sharbati', weight: '2.5 Tonnes', bags: '50 Bags', grade: 'A Grade', location: 'Dewas, MP', created: '20 Sep, 2026', released: true },
        { id: 'LOT-2026-98196', crop: 'Chickpeas', variety: 'Kabuli', weight: '1.8 Tonnes', bags: '36 Bags', grade: 'A Grade', location: 'Indore, MP', created: '18 Sep, 2026', released: false }
    ];
    const get = () => JSON.parse(localStorage.getItem('farmerLots') || 'null') || seed;
    const set = lots => localStorage.setItem('farmerLots', JSON.stringify(lots));
    if (!document.querySelector('#bidDialog')) {
        const style = document.createElement('style');
        style.textContent = '.bid-dialog{width:min(430px,calc(100% - 32px));padding:0;border:0;border-radius:16px;color:#213127;box-shadow:0 24px 70px #173b2140}.bid-dialog::backdrop{background:#173b2159}.bid-dialog form{position:relative;padding:28px}.bid-dialog .eyebrow{margin:0 0 7px;color:#2f7d42;font:800 .72rem Poppins,sans-serif;letter-spacing:.1em;text-transform:uppercase}.bid-dialog h2{margin:0;color:#173b21;font:800 1.25rem Montserrat,sans-serif}.dialog-copy{margin:8px 0 22px;color:#647269;font:400 .8rem Poppins,sans-serif}.bid-dialog label{display:block;margin-bottom:7px;color:#425146;font:700 .76rem Poppins,sans-serif}.bid-dialog label span{font-weight:400;color:#647269}.price-input{display:flex;align-items:center;border:1px solid #cfe1d1;border-radius:9px;background:#f8fbf8}.price-input span{padding-left:13px;color:#2f7d42;font:700 1rem Poppins,sans-serif}.price-input input{width:100%;padding:12px 10px;border:0;outline:0;background:transparent;color:#213127;font:600 .9rem Poppins,sans-serif}.form-error{min-height:18px;margin:7px 0 4px;color:#b42318;font:600 .72rem Poppins,sans-serif}.dialog-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:10px}.dialog-actions button{border:0;border-radius:8px;padding:10px 13px;font:700 .74rem Poppins,sans-serif;cursor:pointer}.dialog-cancel{background:#edf3ed;color:#425146}.dialog-submit{background:#2f7d42;color:#fff}.dialog-close{position:absolute;top:14px;right:14px;border:0;background:transparent;color:#647269;font-size:1rem;cursor:pointer}.minimum-bid{display:flex;justify-content:space-between;gap:8px;margin:15px 0 16px;padding:10px 12px;border-radius:8px;background:#f0f7f0;color:#647269;font:600 .72rem Poppins,sans-serif}.minimum-bid strong{color:#2f7d42}.bid-dialog:not([open]){display:none}';
        document.head.append(style);
        document.body.insertAdjacentHTML('beforeend', '<dialog class="bid-dialog" id="bidDialog"><form method="dialog" id="bidForm"><button class="dialog-close" value="cancel" aria-label="Close"><i class="fa-solid fa-xmark"></i></button><p class="eyebrow">Release lot for bidding</p><h2 id="bidLotName">Set a minimum bid</h2><p class="dialog-copy">Choose the lowest price per tonne you will accept from verified buyers.</p><label for="minimumBid">Minimum bid price <span>(per tonne)</span></label><div class="price-input"><span>₹</span><input id="minimumBid" name="minimumBid" type="number" min="1" step="1" inputmode="decimal" placeholder="e.g. 24500" required></div><p class="form-error" id="bidError" role="alert"></p><div class="dialog-actions"><button class="dialog-cancel" value="cancel">Cancel</button><button class="dialog-submit" value="default"><i class="fa-solid fa-gavel"></i> Make it live for bidding</button></div></form></dialog>');
    }
    const grid = document.querySelector('#lotsGrid');
    const filter = document.querySelector('#lotFilter');
    const toast = document.querySelector('#lotToast');
    const dialog = document.querySelector('#bidDialog');
    const bidForm = document.querySelector('#bidForm');
    const minimumBid = document.querySelector('#minimumBid');
    const bidError = document.querySelector('#bidError');
    let selectedLotId = null;

    const render = () => {
        if (!grid) return;
        const all = get();
        const lots = all.filter(lot => filter.value === 'all' || (filter.value === 'live' ? lot.released : !lot.released));
        document.querySelector('#totalLots').textContent = all.length;
        document.querySelector('#liveLots').textContent = all.filter(lot => lot.released).length;
        document.querySelector('#readyLots').textContent = all.filter(lot => !lot.released).length;
        grid.innerHTML = lots.length ? lots.map(lot => `<article class="lot-card ${lot.released ? 'is-live' : ''}"><div class="lot-card-head"><div><div class="lot-id"><i class="fa-solid fa-fingerprint"></i> ${lot.id}</div><h3>${lot.crop}</h3><div class="variety">${lot.variety} · ${lot.grade}</div></div><span class="lot-badge ${lot.released ? 'live' : 'ready'}">${lot.released ? 'LIVE FOR BIDS' : 'READY TO RELEASE'}</span></div><div class="lot-meta"><div><span>Quantity</span><b><i class="fa-solid fa-weight-hanging"></i>${lot.weight}</b></div><div><span>Inventory</span><b><i class="fa-solid fa-sack-dollar"></i>${lot.bags}</b></div><div><span>Location</span><b><i class="fa-solid fa-location-dot"></i>${lot.location}</b></div><div><span>Quality</span><b><i class="fa-solid fa-award"></i>${lot.grade}</b></div></div>${lot.released ? `<div class="minimum-bid"><span>Minimum bid</span><strong>${lot.minimumBid ? `₹${Number(lot.minimumBid).toLocaleString('en-IN')} / tonne` : '₹30 / tonne'}</strong></div>` : ''}<div class="lot-card-footer"><small>Created ${lot.created}</small><button class="release-btn ${lot.released ? 'live-btn' : ''}" data-id="${lot.id}" ${lot.released ? 'disabled' : ''}><i class="fa-solid ${lot.released ? 'fa-circle-check' : 'fa-gavel'}"></i> ${lot.released ? 'Visible to buyers' : 'Release for bid'}</button></div></article>`).join('') : '<div class="empty-lots"><i class="fa-solid fa-seedling"></i><p>No lots in this view yet.</p></div>';
    };

    grid?.addEventListener('click', event => {
        const button = event.target.closest('.release-btn:not([disabled])');
        if (!button) return;
        const lot = get().find(item => item.id === button.dataset.id);
        if (!lot) return;
        selectedLotId = lot.id;
        document.querySelector('#bidLotName').textContent = `${lot.crop} · ${lot.id}`;
        minimumBid.value = lot.minimumBid || '';
        bidError.textContent = '';
        dialog.showModal();
        minimumBid.focus();
    });

    bidForm?.addEventListener('submit', event => {
        event.preventDefault();
        const value = Number(minimumBid.value);
        if (!Number.isFinite(value) || value <= 0) {
            bidError.textContent = 'Enter a minimum bid greater than zero.';
            minimumBid.focus();
            return;
        }
        set(get().map(lot => lot.id === selectedLotId ? { ...lot, released: true, minimumBid: value } : lot));
        dialog.close();
        render();
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3600);
    });

    filter?.addEventListener('change', render);
    render();
});
