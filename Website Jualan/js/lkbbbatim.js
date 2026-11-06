/* =================================
   DATA PASUKAN INTI
================================= */

const anggotaInti = [
  {
    nomor: 1,
    nama: "Gabriel Dennis Adam",
    posisi: "Danton",
    banjar: "",
    shaf: "",
    foto: "gabriel.jpeg",
  },
  {
    nomor: 2,
    nama: "Azfar Zahirul Haq",
    posisi: "Penjuru",
    banjar: "Banjar 1",
    shaf: "Shaf 1",
    foto: "azfar1.jpeg",
  },
  {
    nomor: 3,
    nama: "Kaila Nuroktavian",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 2",
    shaf: "Shaf 1",
    foto: "steve.jpeg",
  },
  {
    nomor: 4,
    nama: "Nasim Abdul Hamid",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 3",
    shaf: "Shaf 1",
    foto: "anggota4.jpg",
  },
  {
    nomor: 5,
    nama: "Silvi Indriani",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 4",
    shaf: "Shaf 1",
    foto: "anggota5.jpg",
  },
  {
    nomor: 6,
    nama: "Ratu Lindari",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 5",
    shaf: "Shaf 1",
    foto: "anggota6.jpg",
  },
  {
    nomor: 7,
    nama: "Steve Gerliano Bahar",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 1",
    shaf: "Shaf 2",
    foto: "anggota7.jpg",
  },
  {
    nomor: 8,
    nama: "Sukarsa Krisnayadi",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 2",
    shaf: "Shaf 2",
    foto: "KangArsya.jpeg",
  },
  {
    nomor: 9,
    nama: "Alya Nazla A",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 3",
    shaf: "Shaf 2",
    foto: "anggota9.jpg",
  },
  {
    nomor: 10,
    nama: "Chaellany Nur H",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 4",
    shaf: "Shaf 2",
    foto: "anggota10.jpg",
  },
  {
    nomor: 11,
    nama: "Almira",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 4",
    shaf: "Shaf 1",
    foto: "anggota11.jpg",
  },
  {
    nomor: 12,
    nama: "Nazwa Sari ",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 1",
    shaf: "Shaf 3",
    foto: "anggota12.jpg",
  },
  {
    nomor: 13,
    nama: "Windi Wulandari",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 2",
    shaf: "Shaf 3",
    foto: "anggota13.jpg",
  },
  {
    nomor: 14,
    nama: "Nurin Zahirah",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 3",
    shaf: "Shaf 3",
    foto: "anggota14.jpg",
  },
  {
    nomor: 15,
    nama: "Olivia Dwi Putri",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 4",
    shaf: "Shaf 3",
    foto: "anggota15.jpg",
  },
  {
    nomor: 16,
    nama: "Salsa Trisyananda",
    posisi: "Anggota Pasukan",
    banjar: "Banjar 5",
    shaf: "Shaf 3",
    foto: "anggota16.jpg",
  },
];

/* =================================
   DATA PASUKAN CADANGAN
================================= */

const anggotaCadangan = [
  {
    nomor: 1,
    nama: "Nama Cadangan 1",
    posisi: "Anggota Cadangan",
    banjar: "Cadangan",
    shaf: "-",
    foto: "anggota17.jpg",
  },
  {
    nomor: 2,
    nama: "Nama Cadangan 2",
    posisi: "Anggota Cadangan",
    banjar: "Cadangan",
    shaf: "-",
    foto: "anggota18.jpg",
  },
];

/* =================================
   DATA DOKUMENTASI
================================= */

const dokumentasi = [
  {
    judul: "Latihan PBB",
    hari: "Senin",
    tanggal: "2 November 2026",
    foto: "latihan1.jpg",
  },
  {
    judul: "Latihan Formasi",
    hari: "Rabu",
    tanggal: "4 November 2026",
    foto: "latihan2.jpg",
  },
  {
    judul: "Latihan Kekompakan",
    hari: "Jumat",
    tanggal: "6 November 2026",
    foto: "latihan3.jpg",
  },
];

/* =================================
   MENAMPILKAN ANGGOTA
================================= */

function tampilkanAnggota(data, tujuan) {
  const container = document.getElementById(tujuan);

  if (!container) return;

  container.innerHTML = data
    .map((anggota) => {
      const pemimpin = anggota.nomor === 1 && tujuan === "anggota-inti";

      return `
            <article class="member-card ${pemimpin ? "leader-card" : ""}">

                <img
                    class="member-photo"
                    src="../img/${anggota.foto}"
                    alt="Foto ${anggota.nama}"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
                >

                <div class="photo-fallback">
                    Foto belum tersedia
                </div>

                <span class="member-number">
                    ${String(anggota.nomor).padStart(2, "0")}
                </span>

                <h3>${anggota.nama}</h3>

                <p class="member-position">
                    ${anggota.posisi}
                </p>

                ${
                  pemimpin
                    ? ""
                    : `
                        <p class="member-location">
                            ${anggota.banjar}
                            ${
                              anggota.shaf && anggota.shaf !== "-"
                                ? " • " + anggota.shaf
                                : ""
                            }
                        </p>
                    `
                }

            </article>
        `;
    })
    .join("");
}

/* =================================
   MENAMPILKAN DOKUMENTASI
================================= */

function tampilkanDokumentasi() {
  const container = document.getElementById("dokumentasi-grid");

  if (!container) return;

  container.innerHTML = dokumentasi
    .map((foto) => {
      return `
            <article class="documentation-card">

                <img
                    src="../assets/dokumentasi/${foto.foto}"
                    alt="${foto.judul}"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
                >

                <div class="documentation-fallback">
                    Foto belum tersedia
                </div>

                <div class="documentation-info">

                    <h3>${foto.judul}</h3>

                    <p>Hari: ${foto.hari}</p>

                    <p>Tanggal: ${foto.tanggal}</p>

                </div>

            </article>
        `;
    })
    .join("");
}

/* =================================
   JALANKAN SEMUA FUNGSI
================================= */

tampilkanAnggota(anggotaInti, "anggota-inti");

tampilkanAnggota(anggotaCadangan, "anggota-cadangan");

tampilkanDokumentasi();
