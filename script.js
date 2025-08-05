AOS.init();

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');

    const spans = menuBtn.querySelectorAll('span');
    if (menuBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}


function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeMobileMenu(); 
        }
    });
});

document.addEventListener('click', function(e) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

const presensiForm = document.querySelector('form[name="presensi-form"]');
if (presensiForm) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4ILz8bRbadkZbFJ4gNfZgujZJerntXq-HLR4TspW3vJKMLkiHppgBUyxpU5SLltVeDw/exec'; 

   presensiForm.addEventListener('submit', e => {
    e.preventDefault();

    const nama = presensiForm.elements['NamaLengkap'].value.trim();
    const alamat = presensiForm.elements['Alamat'].value.trim();
    const kegiatan = presensiForm.elements['NamaKegiatan'].value;
    const kehadiran = presensiForm.elements['StatusKehadiran'].value;

    const namaValid = /^[A-Za-z\s]{3,}$/.test(nama);
    if (!namaValid) {
        alert('Nama harus minimal 3 huruf dan hanya mengandung huruf dan spasi.');
        return;
    }

    if (alamat.length < 5) {
        alert('Alamat harus minimal 5 karakter.');
        return;
    }

    if (!kegiatan) {
        alert('Silahkan pilih kegiatan.');
        return;
    }

    if (!kehadiran) {
        alert('Silahkan pilih status kehadiran.');
        return;
    }

    const submitButton = presensiForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const loader = submitButton.querySelector('.loader');

    submitButton.disabled = true;
    btnText.textContent = 'Mengirim...';
    loader.classList.remove('hidden');

    fetch(scriptURL, { method: 'POST', body: new FormData(presensiForm) })
    .then(response => {
    alert('Terima kasih! Presensi Anda telah berhasil direkam.');
    btnText.textContent = 'Terkirim!';
    loader.classList.add('hidden');
    submitButton.disabled = false;
    presensiForm.reset();

    // Kembalikan teks tombol setelah 2 detik
    setTimeout(() => {
    btnText.textContent = 'Kirim Presensi';
    }, 2000);
})
.catch(error => {
    alert('Maaf, terjadi kesalahan. Silahkan coba lagi.');
    btnText.textContent = 'Kirim Ulang';
    loader.classList.add('hidden');
    submitButton.disabled = false;
});

});
}