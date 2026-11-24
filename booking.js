const bookingForm = document.querySelector('#booking-form');

if (bookingForm) {
    const serviceSelect = bookingForm.elements.service;
    const serviceByOffer = {
        wash: 'Washing and cleaning',
        walk: 'Dog walking',
        play: 'Playtime and entertainment'
    };
    const selectedOffer = new URLSearchParams(window.location.search).get('offer');

    if (selectedOffer && serviceByOffer[selectedOffer]) {
        serviceSelect.value = serviceByOffer[selectedOffer];
    }

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const values = [
            new Date().toISOString(),
            formData.get('owner_name'),
            formData.get('email'),
            formData.get('dog_name'),
            formData.get('service'),
            formData.get('preferred_date'),
            formData.get('notes')
        ];
        const escapeCsv = (value) => `"${String(value).replace(/"/g, '""')}"`;
        const csv = [
            ['submitted_at', 'owner_name', 'email', 'dog_name', 'service', 'preferred_date', 'notes'],
            values
        ].map((row) => row.map(escapeCsv).join(',')).join('\r\n');
        const downloadUrl = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `paw-care-booking-${new Date().toISOString().slice(0, 10)}.csv`;
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);

        document.querySelector('#form-status').textContent =
            'Your request CSV has been created and downloaded. This demo has not sent the request to Paw Care.';
    });
}
