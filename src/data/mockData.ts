import { UserSavingsProfile, TravelPackage, TransactionItem, HelpTopic } from '../types';

export const mockUsers: UserSavingsProfile[] = [
  {
    id: "usr-1",
    name: "Ahmad Fauzi, S.Kom",
    phone: "081234567890",
    email: "ahmad.fauzi@sururi.id",
    accountNumber: "7701 8892 4102",
    isKycVerified: true,
    nik: "3273011408920003",
    pin: "123456",
    saldoUtama: 18500000,
    targetTabungan: 30000000,
    targetDurasiBulan: 12,
    autodebetAktif: true,
    autodebetNominalPerBulan: 1500000,
    tanggalAutodebet: 25,
    rekeningSumber: "Tabungan Wadiah Bisnis - 7701 4421 9901",
    akad: "Wadiah Yad Dhamanah (Aman & Sesuai Fatwa DSN-MUI)",
    targetBulanSelesai: "November 2026",
  },
  {
    id: "usr-2",
    name: "Hj. Siti Khadijah, M.Pd",
    phone: "085298765432",
    email: "siti.khadijah@sururi.id",
    accountNumber: "7701 9920 1144",
    isKycVerified: true,
    nik: "3171055209880004",
    pin: "778899",
    saldoUtama: 24500000,
    targetTabungan: 28500000,
    targetDurasiBulan: 6,
    autodebetAktif: true,
    autodebetNominalPerBulan: 1000000,
    tanggalAutodebet: 20,
    rekeningSumber: "Tabungan Wadiah Payroll - 7701 3320 8812",
    akad: "Wadiah Yad Dhamanah (Aman & Sesuai Fatwa DSN-MUI)",
    targetBulanSelesai: "Desember 2026",
  },
  {
    id: "usr-3",
    name: "H. Muhammad Ridwan",
    phone: "082155443322",
    email: "m.ridwan@sururi.id",
    accountNumber: "7701 5566 7788",
    isKycVerified: true,
    nik: "3578012204850001",
    pin: "112233",
    saldoUtama: 37000000,
    targetTabungan: 36500000,
    targetDurasiBulan: 9,
    autodebetAktif: false,
    autodebetNominalPerBulan: 0,
    tanggalAutodebet: 25,
    rekeningSumber: "Tabungan Mudharabah - 7701 8899 0011",
    akad: "Wadiah Yad Dhamanah",
    targetBulanSelesai: "Siap Berangkat (Target Tercapai)",
  }
];

export const initialUser: UserSavingsProfile = mockUsers[0];

export const mockHelpTopics: HelpTopic[] = [
  {
    id: "help-1",
    category: "Akad Syariah",
    title: "Apakah tabungan umroh ini murni syariah bebas riba?",
    answer: "Ya, Bank Sururi beroperasi menggunakan Akad Wadiah Yad Dhamanah (titipan murni dengan jaminan keamanan) sesuai Fatwa Dewan Syariah Nasional MUI No. 02/DSN-MUI/IV/2000. Tidak ada potongan bunga atau biaya administrasi bulanan yang membebani nasabah."
  },
  {
    id: "help-2",
    category: "Autodebet",
    title: "Bagaimana cara kerja autodebet bulanan?",
    answer: "Sistem autodebet akan otomatis mendebet rekening sumber nasabah setiap bulan pada tanggal yang dipilih (misal tanggal 25) sebesar nominal yang dihitung dari sisa target biaya dibagi durasi bulan. Fitur ini dapat diaktifkan atau dinonaktifkan kapan saja tanpa denda."
  },
  {
    id: "help-3",
    category: "Ekosistem PPIU",
    title: "Apakah semua travel mitra terjamin resmi dan aman?",
    answer: "Seluruh biro travel di katalog Bank Sururi memiliki izin resmi PPIU (Penyelenggara Perjalanan Ibadah Umrah) yang terintegrasi langsung dengan database SISKOPATUH Kementerian Agama RI serta menerapkan prinsip '5 Pasti Umroh'."
  },
  {
    id: "help-4",
    category: "Open API SNAP BI",
    title: "Bagaimana mekanisme pelunasan otomatis via SNAP BI?",
    answer: "Pelunasan menggunakan Standar Nasional Open API Pembayaran (SNAP BI) Bank Indonesia. Dana Anda terlebih dahulu ditampung di Rekening Escrow Terproteksi, dan baru diteruskan ke biro travel setelah tiket PNR dan Visa Umroh SISKOPATUH terverifikasi sah."
  },
  {
    id: "help-5",
    category: "Top Up & Penarikan",
    title: "Apakah saldo tabungan umroh dapat ditarik sewaktu-waktu jika darurat?",
    answer: "Bisa. Sesuai prinsip akad Wadiah, dana titipan nasabah dapat ditarik kembali secara darurat kapan saja melalui kantor cabang Bank Sururi atau transfer ke rekening utama tanpa penalti riba."
  }
];


export const mockTravelPackages: TravelPackage[] = [
  {
    id: "pkg-1",
    title: "Paket Umroh Barakah 9 Hari Reguler",
    agencyName: "PT Arminareka Perdana Tour",
    ppiuLicense: "Kemenag RI No. U.412 Tahun 2021",
    badge: "PPIU Official Kemenag",
    category: "Reguler",
    durationDays: 9,
    makkahHotel: "Anjum Hotel Makkah",
    makkahHotelStars: 5,
    madinahHotel: "Rove Al Madinah Hotel",
    madinahHotelStars: 4,
    airline: "Saudia Airlines (SV 817)",
    flightType: "Direct Flight Soekarno-Hatta (CGK) -> Jeddah (JED)",
    departureDate: "15 November 2026",
    price: 28500000,
    quotaTotal: 45,
    quotaAvailable: 8,
    rating: 4.9,
    reviewCount: 342,
    features: [
      "Hotel Dekat Pelataran Masjidil Haram (<150m)",
      "Muthawwif Bersertifikat Kemenag & Asesor LSP",
      "Visa Umroh & Asuransi Perjalanan Muassasah",
      "Perlengkapan Koper Premium & Kain Ihram/Mukena",
      "Kereta Cepat Haramain Makkah - Madinah",
      "Makan 3x Sehari Fullboard Indonesian Buffet"
    ],
    bannerImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pkg-2",
    title: "Umroh Royal VIP 12 Hari Pelataran Haram",
    agencyName: "PT Tazkia Safar Madina (Tazkia Travel)",
    ppiuLicense: "Kemenag RI No. U.189 Tahun 2019",
    badge: "PPIU Official Kemenag",
    category: "VIP",
    durationDays: 12,
    makkahHotel: "Fairmont Makkah Clock Royal Tower",
    makkahHotelStars: 5,
    madinahHotel: "Dar Al Taqwa Front Row Haram",
    madinahHotelStars: 5,
    airline: "Garuda Indonesia (GA 980)",
    flightType: "Direct Flight CGK -> Madinah (MED)",
    departureDate: "05 Desember 2026",
    price: 36500000,
    quotaTotal: 30,
    quotaAvailable: 5,
    rating: 5.0,
    reviewCount: 198,
    features: [
      "View Langsung Ka'bah dari Kamar (Kaaba View Suite)",
      "Bimbingan Ibadah Eksklusif Bersama Ustadz Nasional",
      "Executive Lounge di Bandara Soekarno-Hatta & Jeddah",
      "City Tour Thaif (Cable Car & Makan Nasi Mandhi)",
      "Executive High-Speed Bullet Train Haramain Class",
      "Handling Bagasi Door-to-Door & Air Zamzam 5 Liter"
    ],
    bannerImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pkg-3",
    title: "Umroh Awal Musim Promo Milad Sururi",
    agencyName: "PT Noor Umrah Nusantara",
    ppiuLicense: "Kemenag RI No. U.562 Tahun 2020",
    badge: "PPIU Official Kemenag",
    category: "Promo",
    durationDays: 9,
    makkahHotel: "Le Meridien Towers Makkah",
    makkahHotelStars: 4,
    madinahHotel: "Grand Zowar Hotel Madinah",
    madinahHotelStars: 4,
    airline: "Oman Air (Transit Singkat Muscat)",
    flightType: "Transit Nyaman CGK -> MCT -> JED",
    departureDate: "20 Oktober 2026",
    price: 24900000,
    quotaTotal: 50,
    quotaAvailable: 12,
    rating: 4.8,
    reviewCount: 415,
    features: [
      "Harga Subsidi Khusus Nasabah Autodebet Bank Sururi",
      "Free Shuttle Bus 24 Jam Nonstop ke Masjidil Haram",
      "Ziarah Makkah & Madinah Lengkap (Jabal Rahmah, Badar)",
      "Audio Guide Wireless Hajj/Umrah Receiver",
      "Asuransi Kesehatan Lengkap Sesuai Regulasi KSA"
    ],
    bannerImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pkg-4",
    title: "I'tikaf Ramadhan Syahdu 15 Hari Lailatul Qadar",
    agencyName: "PT Al-Bilad Universal Wisata",
    ppiuLicense: "Kemenag RI No. U.071 Tahun 2018",
    badge: "PPIU Official Kemenag",
    category: "Ramadhan",
    durationDays: 15,
    makkahHotel: "Swissotel Al Maqam Makkah",
    makkahHotelStars: 5,
    madinahHotel: "Pullman Zamzam Madina",
    madinahHotelStars: 5,
    airline: "Saudia Airlines (SV 821)",
    flightType: "Direct Flight CGK -> JED",
    departureDate: "10 Maret 2027",
    price: 44000000,
    quotaTotal: 35,
    quotaAvailable: 3,
    rating: 4.95,
    reviewCount: 156,
    features: [
      "Meraih Keberkahan 10 Malam Terakhir & Lailatul Qadar",
      "Buka Puasa & Sahur Bersama Menu Nusantara & Arab",
      "Akses Eksklusif Pelataran Sholat Haramain",
      "Kajian Intensif Tadabbur Al-Quran Setiap Ashar"
    ],
    bannerImage: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80"
  }
];

export const initialTransactions: TransactionItem[] = [
  {
    id: "TRX-20261001-01",
    title: "Autodebet Bulanan Umroh",
    type: "autodebet",
    date: "25 Sep 2026, 06:00 WIB",
    amount: 1500000,
    status: "Berhasil",
    referenceNo: "AD-SURURI-8921104",
    description: "Pendebetan otomatis dari Tabungan Wadiah Utama",
    category: "Kredit"
  },
  {
    id: "TRX-20260915-02",
    title: "Top Up Manual Mandiri",
    type: "topup",
    date: "15 Sep 2026, 14:22 WIB",
    amount: 3000000,
    status: "Berhasil",
    referenceNo: "TU-SURURI-7719203",
    description: "Setoran tunai / transfer via SNAP BI Virtual Account",
    category: "Kredit"
  },
  {
    id: "TRX-20260825-03",
    title: "Autodebet Bulanan Umroh",
    type: "autodebet",
    date: "25 Agu 2026, 06:00 WIB",
    amount: 1500000,
    status: "Berhasil",
    referenceNo: "AD-SURURI-6610992",
    description: "Pendebetan otomatis berkala",
    category: "Kredit"
  },
  {
    id: "TRX-20260801-04",
    title: "Bonus Wadiah Bulanan",
    type: "bonus",
    date: "01 Agu 2026, 00:01 WIB",
    amount: 34500,
    status: "Berhasil",
    referenceNo: "BW-SURURI-5521099",
    description: "Insentif sukarela bank syariah (tanpa riba)",
    category: "Kredit"
  }
];
