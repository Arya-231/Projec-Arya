import 'package:flutter/material.dart';

/// ============================================================================
/// APLIKASI BANK SURURI (FLUTTER SINGLE-FILE LENGKAP)
/// Bank Digital Syariah Khusus Tabungan Umroh & Ekosistem Travel Berizin Kemenag
/// Fitur:
///  1. Autentikasi: Pendaftaran Akun Baru, Login (Multi Akun Dummy), Lupa Password/PIN
///  2. Bantuan Layanan: CS 24/7, Live Chat Interaktif, Call Center, FAQ Akad Syariah
///  3. Goal-Based Savings & Visual Progress Tracker Tabungan Umroh
///  4. Autodebet Bulanan Syariah (Wadiah Yad Dhamanah)
///  5. Katalog Travel Mitra Berizin Resmi Kemenag RI (PPIU Official)
///  6. Integrasi Pelunasan Terpadu Open API SNAP BI & Penerbitan E-Voucher Digital
/// ============================================================================

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const BankSururiApp());
}

/// ============================================================================
/// 1. TEMA WARNA ISLAMI MODERN (EMERALD & GOLD)
/// ============================================================================

class BankSururiTheme {
  static const Color emeraldDark = Color(0xFF0A3D24);
  static const Color emeraldPrimary = Color(0xFF0F5132);
  static const Color emeraldLight = Color(0xFF198754);
  static const Color emeraldAccent = Color(0xFF20C997);
  static const Color goldAccent = Color(0xFFD4AF37);
  static const Color goldLight = Color(0xFFF3E5AB);
  static const Color bgSoft = Color(0xFFF8F9FA);
  static const Color surfaceWhite = Colors.white;
  static const Color textDark = Color(0xFF1E293B);
  static const Color textMuted = Color(0xFF64748B);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: emeraldPrimary,
        primary: emeraldPrimary,
        secondary: goldAccent,
        surface: surfaceWhite,
      ),
      scaffoldBackgroundColor: bgSoft,
      fontFamily: 'Roboto',
      appBarTheme: const AppBarTheme(
        backgroundColor: emeraldPrimary,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardThemeData(
        color: surfaceWhite,
        elevation: 2,
        shadowColor: Colors.black.withValues(alpha: 0.08),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: emeraldPrimary,
          foregroundColor: Colors.white,
          elevation: 2,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
        ),
      ),
    );
  }
}

/// ============================================================================
/// 2. MODEL DATA DUMMY
/// ============================================================================

class UserSavingsProfile {
  String id;
  String name;
  String phone;
  String email;
  String accountNumber;
  bool isKycVerified;
  String nik;
  String pin;
  double saldoUtama;
  double targetTabungan;
  int targetDurasiBulan;
  bool autodebetAktif;
  double autodebetNominalPerBulan;
  int tanggalAutodebet;
  String rekeningSumber;
  String targetBulanSelesai;

  UserSavingsProfile({
    required this.id,
    required this.name,
    required this.phone,
    required this.email,
    required this.accountNumber,
    required this.isKycVerified,
    required this.nik,
    required this.pin,
    required this.saldoUtama,
    required this.targetTabungan,
    required this.targetDurasiBulan,
    required this.autodebetAktif,
    required this.autodebetNominalPerBulan,
    required this.tanggalAutodebet,
    required this.rekeningSumber,
    required this.targetBulanSelesai,
  });

  double get progressRatio => (saldoUtama / targetTabungan).clamp(0.0, 1.0);
  int get progressPercent => (progressRatio * 100).toInt();
}

class TravelPackage {
  final String id;
  final String title;
  final String agencyName;
  final String ppiuLicense;
  final String category;
  final int durationDays;
  final String makkahHotel;
  final int makkahStars;
  final String madinahHotel;
  final int madinahStars;
  final String airline;
  final String flightType;
  final String departureDate;
  final double price;
  final int quotaTotal;
  final int quotaAvailable;
  final double rating;
  final List<String> features;

  TravelPackage({
    required this.id,
    required this.title,
    required this.agencyName,
    required this.ppiuLicense,
    required this.category,
    required this.durationDays,
    required this.makkahHotel,
    required this.makkahStars,
    required this.madinahHotel,
    required this.madinahStars,
    required this.airline,
    required this.flightType,
    required this.departureDate,
    required this.price,
    required this.quotaTotal,
    required this.quotaAvailable,
    required this.rating,
    required this.features,
  });
}

class TransactionRecord {
  final String id;
  final String title;
  final String type;
  final String date;
  final double amount;
  final String status;
  final String referenceNo;
  final String description;

  TransactionRecord({
    required this.id,
    required this.title,
    required this.type,
    required this.date,
    required this.amount,
    required this.status,
    required this.referenceNo,
    required this.description,
  });
}

class EVoucher {
  final String bookingCode;
  final String pnrCode;
  final String siskopatuhNo;
  final String jamaahName;
  final String packageTitle;
  final String agencyName;
  final String departureDate;
  final double totalPaid;
  final String snapReference;
  final String issuedDate;

  EVoucher({
    required this.bookingCode,
    required this.pnrCode,
    required this.siskopatuhNo,
    required this.jamaahName,
    required this.packageTitle,
    required this.agencyName,
    required this.departureDate,
    required this.totalPaid,
    required this.snapReference,
    required this.issuedDate,
  });
}

class HelpTopicItem {
  final String category;
  final String title;
  final String answer;

  const HelpTopicItem({
    required this.category,
    required this.title,
    required this.answer,
  });
}

class ChatMessageItem {
  final String sender; // 'user' | 'bot'
  final String text;
  final String time;

  ChatMessageItem({
    required this.sender,
    required this.text,
    required this.time,
  });
}

/// ============================================================================
/// 3. APP ROOT WIDGET
/// ============================================================================

class BankSururiApp extends StatelessWidget {
  const BankSururiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bank Sururi',
      debugShowCheckedModeBanner: false,
      theme: BankSururiTheme.lightTheme,
      home: const MainNavigationScreen(),
    );
  }
}

/// ============================================================================
/// 4. MAIN NAVIGATION SCREEN (SHELL UTAMA DENGAN AUTH STATE & 5 TAB)
/// ============================================================================

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  // Auth State
  bool isLoggedIn = true;
  String authMode = 'login'; // 'login', 'register', 'forgot_password'

  // Navigation Index
  int _currentIndex = 0;

  // Master Data State
  late List<UserSavingsProfile> allUsers;
  late UserSavingsProfile user;
  late List<TravelPackage> travelPackages;
  late List<TransactionRecord> transactions;
  late List<HelpTopicItem> helpTopics;
  EVoucher? latestVoucher;

  @override
  void initState() {
    super.initState();
    _initDataDummy();
  }

  void _initDataDummy() {
    allUsers = [
      UserSavingsProfile(
        id: "usr-1",
        name: "Ahmad Fauzi, S.Kom",
        phone: "081234567890",
        email: "ahmad.fauzi@sururi.id",
        accountNumber: "7701 8892 4102",
        isKycVerified: true,
        nik: "3273011408920003",
        pin: "123456",
        saldoUtama: 18500000.0,
        targetTabungan: 30000000.0,
        targetDurasiBulan: 12,
        autodebetAktif: true,
        autodebetNominalPerBulan: 1500000.0,
        tanggalAutodebet: 25,
        rekeningSumber: "Tabungan Wadiah Bisnis - 7701 4421 9901",
        targetBulanSelesai: "November 2026",
      ),
      UserSavingsProfile(
        id: "usr-2",
        name: "Hj. Siti Khadijah, M.Pd",
        phone: "085298765432",
        email: "siti.khadijah@sururi.id",
        accountNumber: "7701 9920 1144",
        isKycVerified: true,
        nik: "3171055209880004",
        pin: "778899",
        saldoUtama: 24500000.0,
        targetTabungan: 28500000.0,
        targetDurasiBulan: 6,
        autodebetAktif: true,
        autodebetNominalPerBulan: 1000000.0,
        tanggalAutodebet: 20,
        rekeningSumber: "Tabungan Wadiah Payroll - 7701 3320 8812",
        targetBulanSelesai: "Desember 2026",
      ),
      UserSavingsProfile(
        id: "usr-3",
        name: "H. Muhammad Ridwan",
        phone: "082155443322",
        email: "m.ridwan@sururi.id",
        accountNumber: "7701 5566 7788",
        isKycVerified: true,
        nik: "3578012204850001",
        pin: "112233",
        saldoUtama: 37000000.0,
        targetTabungan: 36500000.0,
        targetDurasiBulan: 9,
        autodebetAktif: false,
        autodebetNominalPerBulan: 0.0,
        tanggalAutodebet: 25,
        rekeningSumber: "Tabungan Mudharabah - 7701 8899 0011",
        targetBulanSelesai: "Siap Berangkat (Target Tercapai)",
      ),
    ];

    user = allUsers[0];

    travelPackages = [
      TravelPackage(
        id: "pkg-1",
        title: "Paket Umroh Barakah 9 Hari Reguler",
        agencyName: "PT Arminareka Perdana Tour",
        ppiuLicense: "Kemenag RI No. U.412/2021",
        category: "Reguler",
        durationDays: 9,
        makkahHotel: "Anjum Hotel Makkah",
        makkahStars: 5,
        madinahHotel: "Rove Al Madinah",
        madinahStars: 4,
        airline: "Saudia Airlines (SV 817 Direct)",
        flightType: "Direct Jakarta (CGK) -> Jeddah (JED)",
        departureDate: "15 November 2026",
        price: 28500000.0,
        quotaTotal: 45,
        quotaAvailable: 8,
        rating: 4.9,
        features: [
          "Hotel Dekat Pelataran Masjidil Haram (<150m)",
          "Muthawwif Berlisensi Kemenag RI",
          "Perlengkapan Koper Premium & Kain Ihram",
          "Kereta Cepat Haramain Bullet Train",
          "Makan 3x Fullboard Menu Nusantara",
        ],
      ),
      TravelPackage(
        id: "pkg-2",
        title: "Umroh Royal VIP 12 Hari Kaaba View",
        agencyName: "PT Tazkia Safar Madina (Tazkia Travel)",
        ppiuLicense: "Kemenag RI No. U.189/2019",
        category: "VIP",
        durationDays: 12,
        makkahHotel: "Fairmont Makkah Clock Tower",
        makkahStars: 5,
        madinahHotel: "Dar Al Taqwa Front Row",
        madinahStars: 5,
        airline: "Garuda Indonesia (GA 980)",
        flightType: "Direct CGK -> Madinah (MED)",
        departureDate: "05 Desember 2026",
        price: 36500000.0,
        quotaTotal: 30,
        quotaAvailable: 5,
        rating: 5.0,
        features: [
          "Kamar Menghadap Langsung ke Ka'bah",
          "Bimbingan Ibadah Ustadz Nasional",
          "Executive Lounge Bandara CGK & JED",
          "City Tour Thaif & Cable Car",
          "Handling Bagasi Door-to-Door & Air Zamzam",
        ],
      ),
      TravelPackage(
        id: "pkg-3",
        title: "Umroh Awal Musim Promo Milad Sururi",
        agencyName: "PT Noor Umrah Nusantara",
        ppiuLicense: "Kemenag RI No. U.562/2020",
        category: "Promo",
        durationDays: 9,
        makkahHotel: "Le Meridien Towers Makkah",
        makkahStars: 4,
        madinahHotel: "Grand Zowar Madinah",
        madinahStars: 4,
        airline: "Oman Air (Transit Singkat)",
        flightType: "Transit Nyaman CGK -> MCT -> JED",
        departureDate: "20 Oktober 2026",
        price: 24900000.0,
        quotaTotal: 50,
        quotaAvailable: 12,
        rating: 4.8,
        features: [
          "Diskon Subsidi Khusus Nasabah Bank Sururi",
          "Shuttle Bus 24 Jam ke Masjidil Haram",
          "Ziarah Makkah & Madinah Lengkap",
          "Audio Receiver Manasik Wireless",
        ],
      ),
      TravelPackage(
        id: "pkg-4",
        title: "I'tikaf Ramadhan 15 Hari Lailatul Qadar",
        agencyName: "PT Al-Bilad Universal Wisata",
        ppiuLicense: "Kemenag RI No. U.071/2018",
        category: "Promo",
        durationDays: 15,
        makkahHotel: "Swissotel Al Maqam Makkah",
        makkahStars: 5,
        madinahHotel: "Pullman Zamzam Madina",
        madinahStars: 5,
        airline: "Saudia Airlines (SV 821)",
        flightType: "Direct CGK -> JED",
        departureDate: "10 Maret 2027",
        price: 44000000.0,
        quotaTotal: 35,
        quotaAvailable: 3,
        rating: 4.95,
        features: [
          "10 Malam Terakhir Ramadhan di Ka'bah",
          "Sahur & Buka Puasa Prasmanan Lengkap",
          "Akses Terdekat Pintu Utama Masjidil Haram",
        ],
      ),
    ];

    transactions = [
      TransactionRecord(
        id: "TRX-01",
        title: "Autodebet Bulanan Umroh",
        type: "autodebet",
        date: "25 Sep 2026",
        amount: 1500000.0,
        status: "Berhasil",
        referenceNo: "AD-SURURI-8921104",
        description: "Pendebetan otomatis dari Tabungan Wadiah Utama",
      ),
      TransactionRecord(
        id: "TRX-02",
        title: "Top Up Manual Mandiri",
        type: "topup",
        date: "15 Sep 2026",
        amount: 3000000.0,
        status: "Berhasil",
        referenceNo: "TU-SURURI-7719203",
        description: "Setoran via SNAP BI Virtual Account",
      ),
      TransactionRecord(
        id: "TRX-03",
        title: "Autodebet Bulanan Umroh",
        type: "autodebet",
        date: "25 Agu 2026",
        amount: 1500000.0,
        status: "Berhasil",
        referenceNo: "AD-SURURI-6610992",
        description: "Pendebetan otomatis berkala",
      ),
    ];

    helpTopics = const [
      HelpTopicItem(
        category: "Akad Syariah",
        title: "Apakah tabungan umroh ini murni syariah bebas riba?",
        answer: "Ya, Bank Sururi beroperasi menggunakan Akad Wadiah Yad Dhamanah sesuai Fatwa DSN-MUI No. 02/DSN-MUI/IV/2000. Titipan aman tanpa biaya bulanan dan tanpa riba.",
      ),
      HelpTopicItem(
        category: "Autodebet",
        title: "Bagaimana cara kerja autodebet bulanan?",
        answer: "Sistem autodebet akan otomatis mendebet rekening sumber setiap bulan pada tanggal pilihan Anda sebesar target kekurangan dibagi jangka waktu menabung.",
      ),
      HelpTopicItem(
        category: "Ekosistem PPIU",
        title: "Apakah semua travel mitra berizin resmi Kemenag?",
        answer: "Seluruh biro travel memiliki izin resmi PPIU terintegrasi SISKOPATUH Kementerian Agama RI dengan garansi 5 Pasti Umroh.",
      ),
      HelpTopicItem(
        category: "SNAP BI",
        title: "Bagaimana mekanisme pelunasan Open API SNAP BI?",
        answer: "Pelunasan menggunakan Standar Nasional Open API Pembayaran (SNAP BI). Dana ditampung di Rekening Escrow hingga tiket & visa resmi terbit.",
      ),
    ];
  }

  String formatRupiah(double val) {
    return 'Rp ' +
        val.toInt().toString().replaceAllMapped(
              RegExp(r'(\\d{1,3})(?=(\\d{3})+(?!\\d))'),
              (Match m) => '\${m[1]}.',
            );
  }

  void handleLogin(UserSavingsProfile loggedUser) {
    setState(() {
      user = loggedUser;
      isLoggedIn = true;
      _currentIndex = 0;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: BankSururiTheme.emeraldPrimary,
        content: Text('Assalamu\\'alaikum, \${loggedUser.name}! Berhasil masuk.'),
      ),
    );
  }

  void handleRegister(UserSavingsProfile newUser) {
    setState(() {
      allUsers.insert(0, newUser);
      user = newUser;
      isLoggedIn = true;
      _currentIndex = 0;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: BankSururiTheme.emeraldPrimary,
        content: Text('Alhamdulillah! Rekening Umroh \${newUser.accountNumber} berhasil dibuka.'),
      ),
    );
  }

  void handleResetPin(String phone, String newPin) {
    setState(() {
      final idx = allUsers.indexWhere((u) => u.phone == phone || u.email == phone);
      if (idx != -1) {
        allUsers[idx].pin = newPin;
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: BankSururiTheme.emeraldPrimary,
        content: Text('PIN Syariah berhasil diperbarui. Silakan masuk kembali.'),
      ),
    );
  }

  void handleLogout() {
    setState(() {
      isLoggedIn = false;
      authMode = 'login';
    });
  }

  void handleTopUp(double amount) {
    setState(() {
      user.saldoUtama += amount;
      transactions.insert(
        0,
        TransactionRecord(
          id: 'TRX-\${DateTime.now().millisecondsSinceEpoch}',
          title: 'Top Up Mandiri Tabungan',
          type: 'topup',
          date: 'Hari ini',
          amount: amount,
          status: 'Berhasil',
          referenceNo: 'TU-SRR-\${DateTime.now().millisecond}',
          description: 'Setoran instan syariah via SNAP BI',
        ),
      );
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: BankSururiTheme.emeraldPrimary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: BankSururiTheme.goldAccent),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Alhamdulillah! Top up \${formatRupiah(amount)} berhasil ditambahkan.',
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void handleUpdateTarget(double target, int months, bool autodebet, int debitDay) {
    setState(() {
      user.targetTabungan = target;
      user.targetDurasiBulan = months;
      user.autodebetAktif = autodebet;
      user.tanggalAutodebet = debitDay;
      user.autodebetNominalPerBulan = (target - user.saldoUtama > 0)
          ? ((target - user.saldoUtama) / months).ceilToDouble()
          : 0;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: BankSururiTheme.emeraldDark,
        content: Text('Target Tabungan & Jadwal Autodebet berhasil diperbarui.'),
      ),
    );
  }

  void handleBookingSnapBi(TravelPackage package) {
    if (user.saldoUtama < package.price) {
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Text('Saldo Belum Mencukupi'),
          content: Text(
            'Saldo tabungan saat ini \${formatRupiah(user.saldoUtama)} belum mencukupi biaya paket \${formatRupiah(package.price)}. Silakan lakukan Top Up terlebih dahulu.',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Tutup'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(ctx);
                showTopUpDialog();
              },
              child: const Text('Top Up Sekarang'),
            ),
          ],
        ),
      );
      return;
    }

    setState(() {
      user.saldoUtama -= package.price;
      latestVoucher = EVoucher(
        bookingCode: 'SRR-UMR-\${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}',
        pnrCode: 'SV-789XQ',
        siskopatuhNo: 'SISKOPATUH-RI-\${DateTime.now().year}-99120',
        jamaahName: user.name,
        packageTitle: package.title,
        agencyName: package.agencyName,
        departureDate: package.departureDate,
        totalPaid: package.price,
        snapReference: 'SNAP-BI-DIRECT-\${DateTime.now().millisecondsSinceEpoch}',
        issuedDate: '16 Oktober 2026, 11:30 WIB',
      );

      transactions.insert(
        0,
        TransactionRecord(
          id: 'TRX-\${DateTime.now().millisecondsSinceEpoch}',
          title: 'Pelunasan Umroh: \${package.agencyName}',
          type: 'booking',
          date: 'Hari ini',
          amount: package.price,
          status: 'Berhasil',
          referenceNo: 'BK-SNAP-\${DateTime.now().millisecond}',
          description: 'Pelunasan otomatis via Open API SNAP BI',
        ),
      );
    });

    showVoucherDialog(latestVoucher!);
  }

  void showTopUpDialog() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => TopUpBottomSheet(
        onTopUpConfirmed: (amount) {
          Navigator.pop(ctx);
          handleTopUp(amount);
        },
        formatRupiah: formatRupiah,
      ),
    );
  }

  void showVoucherDialog(EVoucher voucher) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => EVoucherDialog(
        voucher: voucher,
        formatRupiah: formatRupiah,
      ),
    );
  }

  void showBookingConfirmDialog(TravelPackage pkg) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => BookingSnapBiSheet(
        pkg: pkg,
        userSaldo: user.saldoUtama,
        formatRupiah: formatRupiah,
        onConfirmBooking: () {
          Navigator.pop(ctx);
          handleBookingSnapBi(pkg);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!isLoggedIn) {
      return Scaffold(
        body: AuthScreenWidget(
          initialMode: authMode,
          allUsers: allUsers,
          onLoginSuccess: handleLogin,
          onRegisterSuccess: handleRegister,
          onResetPinSuccess: handleResetPin,
          onNeedHelp: () {
            setState(() {
              isLoggedIn = true;
              _currentIndex = 4; // Tab Bantuan
            });
          },
        ),
      );
    }

    final List<Widget> pages = [
      BerandaScreen(
        user: user,
        transactions: transactions,
        formatRupiah: formatRupiah,
        onTopUpPressed: showTopUpDialog,
        onPilihPaketPressed: () => setState(() => _currentIndex = 1),
        onUbahTargetPressed: () => setState(() => _currentIndex = 2),
        onOpenHelpPressed: () => setState(() => _currentIndex = 4),
        onLogoutPressed: handleLogout,
      ),
      KatalogTravelScreen(
        packages: travelPackages,
        userSaldo: user.saldoUtama,
        formatRupiah: formatRupiah,
        onBookingRequested: showBookingConfirmDialog,
      ),
      SimulasiAutodebetScreen(
        user: user,
        formatRupiah: formatRupiah,
        onSaveTarget: handleUpdateTarget,
      ),
      EkycDanSnapBiScreen(
        user: user,
        latestVoucher: latestVoucher,
        formatRupiah: formatRupiah,
        onVerifyKycSimulated: () {
          setState(() {
            user.isKycVerified = true;
          });
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              backgroundColor: BankSururiTheme.emeraldPrimary,
              content: Text('Simulasi e-KYC: NIK & Face Recognition Berhasil Terverifikasi Dukcapil!'),
            ),
          );
        },
      ),
      BantuanLayananScreen(
        helpTopics: helpTopics,
        onCallCenterTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Menghubungkan ke Call Center Sururi Care 1500-770 (Bebas Pulsa)...'),
            ),
          );
        },
      ),
    ];

    return Scaffold(
      body: pages[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: Colors.white,
        elevation: 8,
        indicatorColor: BankSururiTheme.goldLight.withValues(alpha: 0.5),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home, color: BankSururiTheme.emeraldPrimary),
            label: 'Beranda',
          ),
          NavigationDestination(
            icon: Icon(Icons.flight_takeoff_outlined),
            selectedIcon: Icon(Icons.flight_takeoff, color: BankSururiTheme.emeraldPrimary),
            label: 'Katalog PPIU',
          ),
          NavigationDestination(
            icon: Icon(Icons.calculate_outlined),
            selectedIcon: Icon(Icons.calculate, color: BankSururiTheme.emeraldPrimary),
            label: 'Simulasi',
          ),
          NavigationDestination(
            icon: Icon(Icons.verified_user_outlined),
            selectedIcon: Icon(Icons.verified_user, color: BankSururiTheme.emeraldPrimary),
            label: 'e-KYC & SNAP',
          ),
          NavigationDestination(
            icon: Icon(Icons.help_outline),
            selectedIcon: Icon(Icons.help, color: BankSururiTheme.emeraldPrimary),
            label: 'Bantuan',
          ),
        ],
      ),
    );
  }
}

/// ============================================================================
/// 5. SCREEN AUTENTIKASI (LOGIN, PENDAFTARAN AKUN, & LUPA PASSWORD)
/// ============================================================================

class AuthScreenWidget extends StatefulWidget {
  final String initialMode;
  final List<UserSavingsProfile> allUsers;
  final Function(UserSavingsProfile) onLoginSuccess;
  final Function(UserSavingsProfile) onRegisterSuccess;
  final Function(String phone, String newPin) onResetPinSuccess;
  final VoidCallback onNeedHelp;

  const AuthScreenWidget({
    super.key,
    required this.initialMode,
    required this.allUsers,
    required this.onLoginSuccess,
    required this.onRegisterSuccess,
    required this.onResetPinSuccess,
    required this.onNeedHelp,
  });

  @override
  State<AuthScreenWidget> createState() => _AuthScreenWidgetState();
}

class _AuthScreenWidgetState extends State<AuthScreenWidget> {
  late String currentMode;

  // Login Controllers
  final TextEditingController loginPhoneCtrl = TextEditingController(text: "081234567890");
  final TextEditingController loginPinCtrl = TextEditingController(text: "123456");
  bool isLoginPinHidden = true;
  String loginError = '';

  // Register Controllers
  final TextEditingController regNameCtrl = TextEditingController();
  final TextEditingController regNikCtrl = TextEditingController();
  final TextEditingController regPhoneCtrl = TextEditingController();
  final TextEditingController regPinCtrl = TextEditingController();
  final TextEditingController regOtpCtrl = TextEditingController();
  double regTargetSavings = 30000000.0;
  bool isRegOtpSent = false;
  String regError = '';

  // Forgot Password Controllers
  final TextEditingController forgotPhoneCtrl = TextEditingController();
  final TextEditingController forgotOtpCtrl = TextEditingController();
  final TextEditingController forgotPinCtrl = TextEditingController();
  bool isForgotOtpSent = false;
  String forgotError = '';

  @override
  void initState() {
    super.initState();
    currentMode = widget.initialMode;
  }

  @override
  void dispose() {
    loginPhoneCtrl.dispose();
    loginPinCtrl.dispose();
    regNameCtrl.dispose();
    regNikCtrl.dispose();
    regPhoneCtrl.dispose();
    regPinCtrl.dispose();
    regOtpCtrl.dispose();
    forgotPhoneCtrl.dispose();
    forgotOtpCtrl.dispose();
    forgotPinCtrl.dispose();
    super.dispose();
  }

  void executeLogin() {
    final phone = loginPhoneCtrl.text.trim();
    final pin = loginPinCtrl.text.trim();

    final matched = widget.allUsers.firstWhere(
      (u) => (u.phone == phone || u.email == phone || u.nik == phone) && u.pin == pin,
      orElse: () => UserSavingsProfile(
        id: '',
        name: '',
        phone: '',
        email: '',
        accountNumber: '',
        isKycVerified: false,
        nik: '',
        pin: '',
        saldoUtama: 0,
        targetTabungan: 0,
        targetDurasiBulan: 0,
        autodebetAktif: false,
        autodebetNominalPerBulan: 0,
        tanggalAutodebet: 25,
        rekeningSumber: '',
        targetBulanSelesai: '',
      ),
    );

    if (matched.id.isNotEmpty) {
      widget.onLoginSuccess(matched);
    } else {
      setState(() {
        loginError = 'Nomor HP atau PIN salah! Gunakan tombol Akun Dummy di bawah.';
      });
    }
  }

  void executeRegister() {
    if (regOtpCtrl.text.trim() != '7701' && regOtpCtrl.text.trim() != '1234') {
      setState(() {
        regError = 'Kode OTP salah! Gunakan kode dummy: 7701';
      });
      return;
    }

    final newAccountNo = '7701 8892 \${1000 + DateTime.now().millisecond}';
    final newUser = UserSavingsProfile(
      id: 'usr-\${DateTime.now().millisecondsSinceEpoch}',
      name: regNameCtrl.text.trim(),
      phone: regPhoneCtrl.text.trim(),
      email: '\${regNameCtrl.text.trim().toLowerCase().replaceAll(' ', '.')}@sururi.id',
      accountNumber: newAccountNo,
      isKycVerified: true,
      nik: regNikCtrl.text.trim(),
      pin: regPinCtrl.text.trim(),
      saldoUtama: 0,
      targetTabungan: regTargetSavings,
      targetDurasiBulan: 12,
      autodebetAktif: true,
      autodebetNominalPerBulan: (regTargetSavings / 12).ceilToDouble(),
      tanggalAutodebet: 25,
      rekeningSumber: 'Tabungan Wadiah Utama - \$newAccountNo',
      targetBulanSelesai: 'November 2027',
    );

    widget.onRegisterSuccess(newUser);
  }

  void executeResetPin() {
    if (forgotOtpCtrl.text.trim() != '7701' && forgotOtpCtrl.text.trim() != '1234') {
      setState(() {
        forgotError = 'Kode OTP salah! Gunakan kode dummy: 7701';
      });
      return;
    }

    if (forgotPinCtrl.text.trim().length < 6) {
      setState(() {
        forgotError = 'PIN baru harus 6 digit angka!';
      });
      return;
    }

    widget.onResetPinSuccess(forgotPhoneCtrl.text.trim(), forgotPinCtrl.text.trim());
    setState(() {
      currentMode = 'login';
      loginPhoneCtrl.text = forgotPhoneCtrl.text.trim();
      loginPinCtrl.text = forgotPinCtrl.text.trim();
      isForgotOtpSent = false;
      forgotError = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          // Header Bank Sururi
          Container(
            width: double.infinity,
            padding: const EdgeInsets.only(top: 60, bottom: 30, left: 20, right: 20),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [BankSururiTheme.emeraldDark, BankSururiTheme.emeraldPrimary],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(32),
                bottomRight: Radius.circular(32),
              ),
            ),
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: BankSururiTheme.goldAccent.withValues(alpha: 0.2),
                    shape: BoxShape.circle,
                    border: Border.all(color: BankSururiTheme.goldAccent, width: 2),
                  ),
                  child: const Icon(Icons.mosque, color: BankSururiTheme.goldAccent, size: 36),
                ),
                const SizedBox(height: 12),
                const Text(
                  'BANK SURURI',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 22,
                    letterSpacing: 1.5,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Bank Digital Syariah Khusus Tabungan Umroh & PPIU',
                  style: TextStyle(color: BankSururiTheme.goldLight, fontSize: 12),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                if (currentMode == 'login') _buildLoginCard(),
                if (currentMode == 'register') _buildRegisterCard(),
                if (currentMode == 'forgot_password') _buildForgotPasswordCard(),

                const SizedBox(height: 20),
                TextButton.icon(
                  onPressed: widget.onNeedHelp,
                  icon: const Icon(Icons.support_agent, color: BankSururiTheme.emeraldPrimary),
                  label: const Text(
                    'Butuh Bantuan? Hubungi Sururi Care 24/7',
                    style: TextStyle(color: BankSururiTheme.emeraldPrimary, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoginCard() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Masuk ke Rekening Umroh',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 4),
            const Text(
              'Gunakan No. HP atau NIK dan PIN 6 Digit Anda',
              style: TextStyle(fontSize: 12, color: BankSururiTheme.textMuted),
            ),
            if (loginError.isNotEmpty) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: Colors.red.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(10)),
                child: Row(
                  children: [
                    const Icon(Icons.error_outline, color: Colors.red, size: 18),
                    const SizedBox(width: 8),
                    Expanded(child: Text(loginError, style: const TextStyle(color: Colors.red, fontSize: 11))),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 16),
            TextField(
              controller: loginPhoneCtrl,
              decoration: const InputDecoration(
                labelText: 'Nomor HP / Email / NIK',
                prefixIcon: Icon(Icons.person_outline),
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: loginPinCtrl,
              obscureText: isLoginPinHidden,
              keyboardType: TextInputType.number,
              maxLength: 6,
              decoration: InputDecoration(
                labelText: 'PIN Syariah (6 Digit)',
                prefixIcon: const Icon(Icons.lock_outline),
                border: const OutlineInputBorder(),
                counterText: '',
                suffixIcon: IconButton(
                  icon: Icon(isLoginPinHidden ? Icons.visibility : Icons.visibility_off),
                  onPressed: () => setState(() => isLoginPinHidden = !isLoginPinHidden),
                ),
              ),
            ),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () => setState(() => currentMode = 'forgot_password'),
                child: const Text('Lupa PIN?'),
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: executeLogin,
                child: const Text('Masuk Sekarang'),
              ),
            ),
            const SizedBox(height: 16),
            const Divider(),
            const Text(
              'Pilih Akun Dummy Cepat:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: BankSururiTheme.textMuted),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 6,
              children: widget.allUsers.map((u) {
                return ActionChip(
                  avatar: CircleAvatar(
                    backgroundColor: BankSururiTheme.emeraldPrimary,
                    child: Text(u.name.substring(0, 1), style: const TextStyle(color: Colors.white, fontSize: 10)),
                  ),
                  label: Text(u.name.split(',')[0], style: const TextStyle(fontSize: 11)),
                  onPressed: () {
                    setState(() {
                      loginPhoneCtrl.text = u.phone;
                      loginPinCtrl.text = u.pin;
                      loginError = '';
                    });
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 16),
            Center(
              child: TextButton(
                onPressed: () => setState(() => currentMode = 'register'),
                child: const Text('Belum punya rekening umroh? Daftar Baru'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRegisterCard() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Pendaftaran Akun Baru Syariah',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 4),
            const Text(
              'Buka Tabungan Umroh dengan Akad Wadiah Yad Dhamanah',
              style: TextStyle(fontSize: 12, color: BankSururiTheme.textMuted),
            ),
            if (regError.isNotEmpty) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: Colors.red.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(10)),
                child: Text(regError, style: const TextStyle(color: Colors.red, fontSize: 11)),
              ),
            ],
            const SizedBox(height: 16),
            if (!isRegOtpSent) ...[
              TextField(
                controller: regNameCtrl,
                decoration: const InputDecoration(labelText: 'Nama Lengkap Jamaah', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: regNikCtrl,
                keyboardType: TextInputType.number,
                maxLength: 16,
                decoration: const InputDecoration(labelText: 'NIK KTP (16 Digit)', border: OutlineInputBorder(), counterText: ''),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: regPhoneCtrl,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(labelText: 'Nomor WhatsApp', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: regPinCtrl,
                keyboardType: TextInputType.number,
                maxLength: 6,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'Buat PIN Syariah (6 Digit)', border: OutlineInputBorder(), counterText: ''),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (regNameCtrl.text.isEmpty || regPhoneCtrl.text.isEmpty || regPinCtrl.text.length < 6) {
                      setState(() => regError = 'Mohon lengkapi Nama, WhatsApp, dan PIN 6 Digit!');
                      return;
                    }
                    setState(() {
                      isRegOtpSent = true;
                      regError = '';
                    });
                  },
                  child: const Text('Lanjut Verifikasi OTP WhatsApp'),
                ),
              ),
            ] else ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: Colors.amber.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(12)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Simulasi OTP Terkirim ke WhatsApp:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                    const SizedBox(height: 4),
                    TextButton(
                      onPressed: () => regOtpCtrl.text = '7701',
                      child: const Text('Klik di sini: Gunakan Kode Dummy [ 7701 ]'),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),
              TextField(
                controller: regOtpCtrl,
                keyboardType: TextInputType.number,
                maxLength: 4,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 20, letterSpacing: 8, fontWeight: FontWeight.bold),
                decoration: const InputDecoration(labelText: 'Masukkan Kode OTP (4 Digit)', border: OutlineInputBorder(), counterText: ''),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => setState(() => isRegOtpSent = false),
                      child: const Text('Batal'),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: executeRegister,
                      child: const Text('Buka Rekening'),
                    ),
                  ),
                ],
              ),
            ],
            const SizedBox(height: 12),
            Center(
              child: TextButton(
                onPressed: () => setState(() => currentMode = 'login'),
                child: const Text('Sudah punya akun? Masuk di sini'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildForgotPasswordCard() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Reset PIN / Lupa Password',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 4),
            const Text(
              'Pemulihan akses rekening tabungan umroh Anda',
              style: TextStyle(fontSize: 12, color: BankSururiTheme.textMuted),
            ),
            if (forgotError.isNotEmpty) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: Colors.red.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(10)),
                child: Text(forgotError, style: const TextStyle(color: Colors.red, fontSize: 11)),
              ),
            ],
            const SizedBox(height: 16),
            if (!isForgotOtpSent) ...[
              TextField(
                controller: forgotPhoneCtrl,
                decoration: const InputDecoration(
                  labelText: 'Nomor HP Terdaftar',
                  hintText: 'Contoh: 081234567890',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (forgotPhoneCtrl.text.isEmpty) {
                      setState(() => forgotError = 'Masukkan nomor HP terdaftar!');
                      return;
                    }
                    setState(() {
                      isForgotOtpSent = true;
                      forgotError = '';
                    });
                  },
                  child: const Text('Kirim OTP Pemulihan'),
                ),
              ),
            ] else ...[
              TextButton(
                onPressed: () => forgotOtpCtrl.text = '7701',
                child: const Text('Klik di sini: Gunakan Kode Dummy [ 7701 ]'),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: forgotOtpCtrl,
                keyboardType: TextInputType.number,
                maxLength: 4,
                textAlign: TextAlign.center,
                decoration: const InputDecoration(labelText: 'Kode OTP', border: OutlineInputBorder(), counterText: ''),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: forgotPinCtrl,
                keyboardType: TextInputType.number,
                maxLength: 6,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'PIN Baru (6 Digit)', border: OutlineInputBorder(), counterText: ''),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: executeResetPin,
                  child: const Text('Simpan PIN Baru'),
                ),
              ),
            ],
            const SizedBox(height: 12),
            Center(
              child: TextButton(
                onPressed: () => setState(() => currentMode = 'login'),
                child: const Text('Kembali ke Halaman Masuk'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// ============================================================================
/// 6. HALAMAN BERANDA (DASHBOARD TABUNGAN UMROH)
/// ============================================================================

class BerandaScreen extends StatelessWidget {
  final UserSavingsProfile user;
  final List<TransactionRecord> transactions;
  final String Function(double) formatRupiah;
  final VoidCallback onTopUpPressed;
  final VoidCallback onPilihPaketPressed;
  final VoidCallback onUbahTargetPressed;
  final VoidCallback onOpenHelpPressed;
  final VoidCallback onLogoutPressed;

  const BerandaScreen({
    super.key,
    required this.user,
    required this.transactions,
    required this.formatRupiah,
    required this.onTopUpPressed,
    required this.onPilihPaketPressed,
    required this.onUbahTargetPressed,
    required this.onOpenHelpPressed,
    required this.onLogoutPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildIslamicHeader(context),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: [
                const SizedBox(height: 12),
                _buildGoalCard(context),
                const SizedBox(height: 16),
                _buildAutodebetCard(),
                const SizedBox(height: 20),
                _buildQuickActions(),
                const SizedBox(height: 24),
                _buildTransactionSection(),
                const SizedBox(height: 30),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIslamicHeader(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [BankSururiTheme.emeraldDark, BankSururiTheme.emeraldPrimary],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(28),
          bottomRight: Radius.circular(28),
        ),
      ),
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top + 16,
        left: 20,
        right: 20,
        bottom: 24,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: BankSururiTheme.goldAccent.withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                      border: Border.all(color: BankSururiTheme.goldAccent, width: 1.5),
                    ),
                    child: const Icon(Icons.mosque, color: BankSururiTheme.goldAccent, size: 24),
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'BANK SURURI',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w900,
                          fontSize: 18,
                          letterSpacing: 1.2,
                        ),
                      ),
                      Text(
                        'Digital Syariah Tabungan Umroh',
                        style: TextStyle(color: BankSururiTheme.goldLight, fontSize: 11),
                      ),
                    ],
                  ),
                ],
              ),
              Row(
                children: [
                  IconButton(
                    onPressed: onOpenHelpPressed,
                    icon: const Icon(Icons.help_outline, color: BankSururiTheme.goldAccent),
                    tooltip: 'Bantuan CS',
                  ),
                  IconButton(
                    onPressed: onLogoutPressed,
                    icon: const Icon(Icons.logout, color: Colors.white70),
                    tooltip: 'Keluar',
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Assalamu\\'alaikum Warahmatullah,',
                style: TextStyle(color: Colors.white70, fontSize: 13),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: BankSururiTheme.goldAccent.withValues(alpha: 0.5)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.verified, color: BankSururiTheme.goldAccent, size: 14),
                    SizedBox(width: 4),
                    Text('e-KYC Valid', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            user.name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'No. Rekening Umroh: \${user.accountNumber}',
            style: const TextStyle(color: Colors.white60, fontSize: 12, letterSpacing: 0.5),
          ),
        ],
      ),
    );
  }

  Widget _buildGoalCard(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            colors: [Colors.white, Color(0xFFF9FBF9)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: BankSururiTheme.emeraldPrimary.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.track_changes, color: BankSururiTheme.emeraldPrimary, size: 20),
                    ),
                    const SizedBox(width: 8),
                    const Text(
                      'Goal Tracker Tabungan Umroh',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: BankSururiTheme.textDark),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: BankSururiTheme.goldAccent.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '\${user.progressPercent}% Terkumpul',
                    style: const TextStyle(
                      color: Color(0xFF8B6B00),
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 18),
            const Text('Saldo Tabungan Saat Ini', style: TextStyle(color: BankSururiTheme.textMuted, fontSize: 12)),
            const SizedBox(height: 4),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  formatRupiah(user.saldoUtama),
                  style: const TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.w900,
                    color: BankSururiTheme.emeraldPrimary,
                  ),
                ),
                Text(
                  'Target: ' + formatRupiah(user.targetTabungan),
                  style: const TextStyle(
                    fontSize: 13,
                    color: BankSururiTheme.textMuted,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: LinearProgressIndicator(
                value: user.progressRatio,
                minHeight: 12,
                backgroundColor: const Color(0xFFE2E8F0),
                valueColor: const AlwaysStoppedAnimation<Color>(BankSururiTheme.emeraldPrimary),
              ),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Sisa Kekurangan: \${formatRupiah(user.targetTabungan - user.saldoUtama > 0 ? user.targetTabungan - user.saldoUtama : 0)}',
                  style: const TextStyle(fontSize: 12, color: BankSururiTheme.textMuted),
                ),
                Text(
                  'Estimasi: \${user.targetBulanSelesai}',
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: BankSururiTheme.emeraldPrimary),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAutodebetCard() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFEFF8F2),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: BankSururiTheme.emeraldAccent.withValues(alpha: 0.4)),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: const BoxDecoration(
              color: BankSururiTheme.emeraldPrimary,
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.autorenew, color: Colors.white, size: 22),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Autodebet Bulanan Syariah',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: BankSururiTheme.emeraldDark),
                    ),
                    Text(
                      user.autodebetAktif ? 'AKTIF' : 'NONAKTIF',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: user.autodebetAktif ? BankSururiTheme.emeraldPrimary : Colors.red,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  '\${formatRupiah(user.autodebetNominalPerBulan)} / bulan (Tiap tgl \${user.tanggalAutodebet})',
                  style: const TextStyle(fontSize: 12, color: BankSururiTheme.textDark, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 2),
                Text(
                  'Sumber: \${user.rekeningSumber}',
                  style: const TextStyle(fontSize: 11, color: BankSururiTheme.textMuted),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _buildActionItem(
          icon: Icons.add_circle,
          label: 'Top Up',
          color: BankSururiTheme.emeraldPrimary,
          onTap: onTopUpPressed,
        ),
        _buildActionItem(
          icon: Icons.tune,
          label: 'Ubah Target',
          color: BankSururiTheme.goldAccent,
          onTap: onUbahTargetPressed,
        ),
        _buildActionItem(
          icon: Icons.travel_explore,
          label: 'Pilih Travel',
          color: const Color(0xFF0284C7),
          onTap: onPilihPaketPressed,
        ),
        _buildActionItem(
          icon: Icons.support_agent,
          label: 'Bantuan CS',
          color: const Color(0xFF475569),
          onTap: onOpenHelpPressed,
        ),
      ],
    );
  }

  Widget _buildActionItem({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        width: 80,
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.12),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: BankSururiTheme.textDark),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTransactionSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text(
              'Riwayat Transaksi Terkini',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: BankSururiTheme.textDark),
            ),
            Text(
              'Lihat Semua',
              style: TextStyle(fontSize: 12, color: BankSururiTheme.emeraldPrimary, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(height: 12),
        ...transactions.map((tx) => Card(
              margin: const EdgeInsets.only(bottom: 10),
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: tx.type == 'booking'
                      ? Colors.red.withValues(alpha: 0.1)
                      : BankSururiTheme.emeraldPrimary.withValues(alpha: 0.1),
                  child: Icon(
                    tx.type == 'booking'
                        ? Icons.flight_takeoff
                        : tx.type == 'autodebet'
                            ? Icons.autorenew
                            : Icons.arrow_downward,
                    color: tx.type == 'booking' ? Colors.red : BankSururiTheme.emeraldPrimary,
                    size: 20,
                  ),
                ),
                title: Text(
                  tx.title,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                subtitle: Text(
                  '\${tx.date} • \${tx.description}',
                  style: const TextStyle(fontSize: 11, color: BankSururiTheme.textMuted),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                trailing: Text(
                  (tx.type == 'booking' ? '- ' : '+ ') + formatRupiah(tx.amount),
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                    color: tx.type == 'booking' ? Colors.red.shade700 : BankSururiTheme.emeraldPrimary,
                  ),
                ),
              ),
            )),
      ],
    );
  }
}

/// ============================================================================
/// 7. HALAMAN KATALOG TRAVEL BERIZIN (EKOSISTEM TRAVEL PPIU KEMENAG)
/// ============================================================================

class KatalogTravelScreen extends StatefulWidget {
  final List<TravelPackage> packages;
  final double userSaldo;
  final String Function(double) formatRupiah;
  final Function(TravelPackage) onBookingRequested;

  const KatalogTravelScreen({
    super.key,
    required this.packages,
    required this.userSaldo,
    required this.formatRupiah,
    required this.onBookingRequested,
  });

  @override
  State<KatalogTravelScreen> createState() => _KatalogTravelScreenState();
}

class _KatalogTravelScreenState extends State<KatalogTravelScreen> {
  String selectedCategory = 'Semua';
  String searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final filtered = widget.packages.where((pkg) {
      final matchCat = selectedCategory == 'Semua' || pkg.category == selectedCategory;
      final matchQuery = pkg.title.toLowerCase().contains(searchQuery.toLowerCase()) ||
          pkg.agencyName.toLowerCase().contains(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Katalog Travel Berizin PPIU', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(60),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: TextField(
              onChanged: (val) => setState(() => searchQuery = val),
              decoration: InputDecoration(
                hintText: 'Cari biro travel resmi atau paket...',
                prefixIcon: const Icon(Icons.search, color: BankSururiTheme.emeraldPrimary),
                filled: true,
                fillColor: Colors.white,
                contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: ['Semua', 'Reguler', 'VIP', 'Promo'].map((cat) {
                final isSelected = selectedCategory == cat;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (val) => setState(() => selectedCategory = cat),
                    selectedColor: BankSururiTheme.emeraldPrimary,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : BankSururiTheme.textDark,
                      fontWeight: FontWeight.w600,
                    ),
                    checkmarkColor: Colors.white,
                  ),
                );
              }).toList(),
            ),
          ),
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: BankSururiTheme.goldLight.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: BankSururiTheme.goldAccent),
            ),
            child: Row(
              children: const [
                Icon(Icons.security, color: Color(0xFF8B6B00), size: 20),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    '100% PPIU Resmi Terdaftar di SISKOPATUH Kementerian Agama RI.',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF5A4400)),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: filtered.length,
              itemBuilder: (ctx, i) {
                final pkg = filtered[i];
                return _buildPackageCard(pkg);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPackageCard(TravelPackage pkg) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: BankSururiTheme.emeraldDark,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.verified, color: BankSururiTheme.goldAccent, size: 16),
                    const SizedBox(width: 6),
                    Text(
                      pkg.ppiuLicense,
                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: BankSururiTheme.goldAccent,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    pkg.category.toUpperCase(),
                    style: const TextStyle(color: BankSururiTheme.emeraldDark, fontSize: 10, fontWeight: FontWeight.w900),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  pkg.agencyName,
                  style: const TextStyle(color: BankSururiTheme.textMuted, fontSize: 12, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 4),
                Text(
                  pkg.title,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: BankSururiTheme.textDark),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    _buildTag(Icons.calendar_month, '\${pkg.durationDays} Hari'),
                    const SizedBox(width: 8),
                    _buildTag(Icons.flight, pkg.airline.split('(')[0].trim()),
                    const SizedBox(width: 8),
                    _buildTag(Icons.star, 'Makkah \${pkg.makkahStars}★'),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  'Keberangkatan: \${pkg.departureDate} (Sisa Kuota: \${pkg.quotaAvailable} seat)',
                  style: const TextStyle(fontSize: 12, color: BankSururiTheme.textMuted),
                ),
                const Divider(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Harga Paket All-In', style: TextStyle(fontSize: 11, color: BankSururiTheme.textMuted)),
                        Text(
                          widget.formatRupiah(pkg.price),
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                            color: BankSururiTheme.emeraldPrimary,
                          ),
                        ),
                      ],
                    ),
                    ElevatedButton.icon(
                      onPressed: () => widget.onBookingRequested(pkg),
                      icon: const Icon(Icons.check_circle_outline, size: 18),
                      label: const Text('Detail & Booking'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTag(IconData icon, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: BankSururiTheme.bgSoft,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.black12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: BankSururiTheme.emeraldPrimary),
          const SizedBox(width: 4),
          Text(text, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}

/// ============================================================================
/// 8. HALAMAN SIMULASI AUTODEBET & TARGET (GOAL-BASED SAVINGS)
/// ============================================================================

class SimulasiAutodebetScreen extends StatefulWidget {
  final UserSavingsProfile user;
  final String Function(double) formatRupiah;
  final Function(double target, int months, bool autodebet, int debitDay) onSaveTarget;

  const SimulasiAutodebetScreen({
    super.key,
    required this.user,
    required this.formatRupiah,
    required this.onSaveTarget,
  });

  @override
  State<SimulasiAutodebetScreen> createState() => _SimulasiAutodebetScreenState();
}

class _SimulasiAutodebetScreenState extends State<SimulasiAutodebetScreen> {
  late double targetAmount;
  late int durationMonths;
  late bool autodebetActive;
  late int debitDay;

  @override
  void initState() {
    super.initState();
    targetAmount = widget.user.targetTabungan;
    durationMonths = widget.user.targetDurasiBulan;
    autodebetActive = widget.user.autodebetAktif;
    debitDay = widget.user.tanggalAutodebet;
  }

  double get hitungPerBulan {
    final diff = targetAmount - widget.user.saldoUtama;
    if (diff <= 0) return 0;
    return (diff / durationMonths).ceilToDouble();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Simulasi & Autodebet Umroh', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              color: const Color(0xFFF1F8F5),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: const [
                    Icon(Icons.balance, color: BankSururiTheme.emeraldPrimary, size: 28),
                    SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Akad Wadiah Yad Dhamanah: Tabungan murni titipan aman, tanpa biaya bulanan tersembunyi, dan diawasi DSN-MUI.',
                        style: TextStyle(fontSize: 12, color: BankSururiTheme.emeraldDark, height: 1.4),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              '1. Tentukan Target Biaya Umroh',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 6),
            Text(
              widget.formatRupiah(targetAmount),
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: BankSururiTheme.emeraldPrimary),
            ),
            Slider(
              value: targetAmount,
              min: 20000000,
              max: 60000000,
              divisions: 40,
              activeColor: BankSururiTheme.emeraldPrimary,
              inactiveColor: Colors.black12,
              onChanged: (val) => setState(() => targetAmount = val),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('Rp 20 Juta', style: TextStyle(fontSize: 11, color: BankSururiTheme.textMuted)),
                Text('Rp 40 Juta', style: TextStyle(fontSize: 11, color: BankSururiTheme.textMuted)),
                Text('Rp 60 Juta', style: TextStyle(fontSize: 11, color: BankSururiTheme.textMuted)),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              '2. Durasi Menabung (Bulan)',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [6, 12, 18, 24].map((m) {
                final isSel = durationMonths == m;
                return ChoiceChip(
                  label: Text('\$m Bulan'),
                  selected: isSel,
                  onSelected: (val) => setState(() => durationMonths = m),
                  selectedColor: BankSururiTheme.emeraldPrimary,
                  labelStyle: TextStyle(color: isSel ? Colors.white : BankSururiTheme.textDark, fontWeight: FontWeight.w700),
                );
              }).toList(),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [BankSururiTheme.emeraldDark, BankSururiTheme.emeraldPrimary],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  const Text(
                    'Estimasi Setoran Autodebet Bulanan',
                    style: TextStyle(color: BankSururiTheme.goldLight, fontSize: 13, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.formatRupiah(hitungPerBulan),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 28,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Selama \$durationMonths bulan ke depan secara otomatis',
                    style: const TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Aktifkan Autodebet Otomatis', style: TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text('Potong otomatis dari rekening sumber setiap tanggal \$debitDay'),
              value: autodebetActive,
              activeColor: BankSururiTheme.emeraldPrimary,
              onChanged: (val) => setState(() => autodebetActive = val),
            ),
            if (autodebetActive) ...[
              const SizedBox(height: 10),
              const Text('Pilih Tanggal Pendebetan Bulanan:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [1, 5, 20, 25, 28].map((d) {
                  final isD = debitDay == d;
                  return ChoiceChip(
                    label: Text('Tgl \$d'),
                    selected: isD,
                    onSelected: (val) => setState(() => debitDay = d),
                    selectedColor: BankSururiTheme.emeraldPrimary,
                    labelStyle: TextStyle(color: isD ? Colors.white : BankSururiTheme.textDark, fontWeight: FontWeight.w600),
                  );
                }).toList(),
              ),
            ],
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  widget.onSaveTarget(targetAmount, durationMonths, autodebetActive, debitDay);
                },
                child: const Text('Simpan & Pasang Target Tabungan'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// ============================================================================
/// 9. HALAMAN SIMULASI e-KYC & PELUNASAN SNAP BI
/// ============================================================================

class EkycDanSnapBiScreen extends StatelessWidget {
  final UserSavingsProfile user;
  final EVoucher? latestVoucher;
  final String Function(double) formatRupiah;
  final VoidCallback onVerifyKycSimulated;

  const EkycDanSnapBiScreen({
    super.key,
    required this.user,
    required this.latestVoucher,
    required this.formatRupiah,
    required this.onVerifyKycSimulated,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('e-KYC & Integrasi SNAP BI', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildEkycStatusCard(context),
            const SizedBox(height: 24),
            const Text(
              'Standar Open API SNAP BI Terintegrasi',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 8),
            const Text(
              'Pelunasan paket travel langsung tersambung via Standar Nasional Open API Pembayaran (SNAP BI) Bank Indonesia, menjamin dana aman di Virtual Account Escrow hingga terverifikasi SISKOPATUH Kemenag.',
              style: TextStyle(fontSize: 12, color: BankSururiTheme.textMuted, height: 1.4),
            ),
            const SizedBox(height: 16),
            _buildSnapBiFeatureGrid(),
            const SizedBox(height: 24),
            if (latestVoucher != null) ...[
              const Text(
                'Bukti Booking & E-Voucher Terakhir',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: BankSururiTheme.textDark),
              ),
              const SizedBox(height: 12),
              _buildVoucherMiniCard(context, latestVoucher!),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildEkycStatusCard(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Status Verifikasi Identitas (e-KYC)',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: user.isKycVerified
                        ? Colors.green.withValues(alpha: 0.15)
                        : Colors.orange.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    user.isKycVerified ? 'TERVERIFIKASI' : 'PENDING',
                    style: TextStyle(
                      color: user.isKycVerified ? Colors.green.shade800 : Colors.orange.shade800,
                      fontWeight: FontWeight.w800,
                      fontSize: 11,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            _buildKycStepRow(Icons.credit_card, 'Simulasi Foto e-KTP', 'Tervalidasi Database Dukcapil RI', true),
            const SizedBox(height: 12),
            _buildKycStepRow(Icons.face, 'Biometric Liveness & Face Match', 'Tingkat akurasi 99.8% pencegahan fraud', true),
            const SizedBox(height: 12),
            _buildKycStepRow(Icons.app_registration, 'Penerbitan CIF Syariah Digital', 'Nomor CIF: 7701-0988-FAUZI', true),
            const SizedBox(height: 16),
            if (!user.isKycVerified)
              ElevatedButton.icon(
                onPressed: onVerifyKycSimulated,
                icon: const Icon(Icons.qr_code_scanner),
                label: const Text('Jalankan Simulasi e-KYC Sekarang'),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildKycStepRow(IconData icon, String title, String subtitle, bool isDone) {
    return Row(
      children: [
        Icon(isDone ? Icons.check_circle : Icons.circle_outlined, color: BankSururiTheme.emeraldPrimary, size: 22),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              Text(subtitle, style: const TextStyle(fontSize: 11, color: BankSururiTheme.textMuted)),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSnapBiFeatureGrid() {
    return Column(
      children: [
        _buildSnapFeatureTile(
          Icons.vpn_key,
          'Asymmetric Signature & Token (HMAC SHA-256)',
          'Sesuai spesifikasi teknis keamanan Bank Indonesia Open API SNAP.',
        ),
        const SizedBox(height: 10),
        _buildSnapFeatureTile(
          Icons.shield,
          'Rekening Escrow Penampung Terproteksi',
          'Dana pelunasan hanya ditransfer ke biro travel saat visa & tiket SISKOPATUH terbit.',
        ),
        const SizedBox(height: 10),
        _buildSnapFeatureTile(
          Icons.receipt_long,
          'Otomatisasi E-Voucher & PNR Maskapai',
          'Kode booking resmi langsung terkoneksi ke sistem reservasi Saudia/Garuda.',
        ),
      ],
    );
  }

  Widget _buildSnapFeatureTile(IconData icon, String title, String desc) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.black12),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: BankSururiTheme.emeraldPrimary.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: BankSururiTheme.emeraldPrimary, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: BankSururiTheme.textDark)),
                const SizedBox(height: 4),
                Text(desc, style: const TextStyle(fontSize: 11, color: BankSururiTheme.textMuted, height: 1.3)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVoucherMiniCard(BuildContext context, EVoucher v) {
    return Card(
      color: BankSururiTheme.emeraldDark,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('E-VOUCHER UMROH RESMI', style: TextStyle(color: BankSururiTheme.goldLight, fontWeight: FontWeight.bold, fontSize: 12)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(color: Colors.green, borderRadius: BorderRadius.circular(4)),
                  child: const Text('LUNAS SNAP BI', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(v.packageTitle, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
            const SizedBox(height: 4),
            Text(v.agencyName, style: const TextStyle(color: Colors.white70, fontSize: 12)),
            const Divider(color: Colors.white24, height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Booking ID: \${v.bookingCode}', style: const TextStyle(color: Colors.white70, fontSize: 11)),
                Text('PNR: \${v.pnrCode}', style: const TextStyle(color: BankSururiTheme.goldAccent, fontWeight: FontWeight.bold, fontSize: 12)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// ============================================================================
/// 10. HALAMAN BANTUAN LAYANAN (SURURI CARE 24/7 & LIVE CHAT CS)
/// ============================================================================

class BantuanLayananScreen extends StatefulWidget {
  final List<HelpTopicItem> helpTopics;
  final VoidCallback onCallCenterTap;

  const BantuanLayananScreen({
    super.key,
    required this.helpTopics,
    required this.onCallCenterTap,
  });

  @override
  State<BantuanLayananScreen> createState() => _BantuanLayananScreenState();
}

class _BantuanLayananScreenState extends State<BantuanLayananScreen> {
  final TextEditingController chatCtrl = TextEditingController();
  final List<ChatMessageItem> messages = [
    ChatMessageItem(
      sender: 'bot',
      text: 'Assalamu\\'alaikum Warahmatullah. Selamat datang di Sururi Care 24/7. Ada yang bisa kami bantu seputar tabungan umroh atau katalog PPIU berizin Kemenag?',
      time: 'Baru saja',
    ),
  ];

  void sendMessage() {
    final txt = chatCtrl.text.trim();
    if (txt.isEmpty) return;

    setState(() {
      messages.add(ChatMessageItem(sender: 'user', text: txt, time: 'Sekarang'));
      chatCtrl.clear();
    });

    Future.delayed(const Duration(milliseconds: 600), () {
      if (!mounted) return;
      String reply = 'Terima kasih atas pertanyaannya. Tim CS Syariah siap membantu ibadah umroh Anda agar transparan dan sesuai syariat.';
      final lower = txt.toLowerCase();
      if (lower.contains('autodebet') || lower.contains('potong')) {
        reply = 'Autodebet diproses tiap tanggal yang Anda tentukan di menu Simulasi tanpa biaya admin tambahan.';
      } else if (lower.contains('travel') || lower.contains('ppiu') || lower.contains('kemenag')) {
        reply = 'Semua biro travel di Bank Sururi memiliki nomor izin resmi PPIU Kemenag RI dan terintegrasi SISKOPATUH.';
      } else if (lower.contains('snap') || lower.contains('bayar')) {
        reply = 'Pelunasan aman menggunakan Open API SNAP BI dengan rekening escrow penampung yang diawasi regulator.';
      }

      setState(() {
        messages.add(ChatMessageItem(sender: 'bot', text: reply, time: 'Baru saja'));
      });
    });
  }

  @override
  void dispose() {
    chatCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sururi Care 24/7', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Banner Call Center
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [BankSururiTheme.emeraldDark, BankSururiTheme.emeraldPrimary],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  const Icon(Icons.headset_mic, color: BankSururiTheme.goldAccent, size: 36),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Call Center Bebas Pulsa 24 Jam', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                        SizedBox(height: 2),
                        Text('1500-770 • (021) 7701-8899', style: TextStyle(color: BankSururiTheme.goldLight, fontWeight: FontWeight.bold, fontSize: 13)),
                        Text('WhatsApp: +62 811-7701-9900', style: TextStyle(color: Colors.white70, fontSize: 11)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Live Chat Interaktif Mini
            const Text(
              'Live Chat CS Syariah',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 8),
            Container(
              height: 200,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.black12),
              ),
              child: ListView.builder(
                itemCount: messages.length,
                itemBuilder: (ctx, i) {
                  final m = messages[i];
                  final isUser = m.sender == 'user';
                  return Align(
                    alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      padding: const EdgeInsets.all(10),
                      constraints: const BoxConstraints(maxWidth: 240),
                      decoration: BoxDecoration(
                        color: isUser ? BankSururiTheme.emeraldPrimary : const Color(0xFFF1F5F9),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        m.text,
                        style: TextStyle(color: isUser ? Colors.white : Colors.black87, fontSize: 12),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: chatCtrl,
                    decoration: const InputDecoration(
                      hintText: 'Ketik pesan ke CS Syariah...',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton.filled(
                  onPressed: sendMessage,
                  icon: const Icon(Icons.send),
                  style: IconButton.styleFrom(backgroundColor: BankSururiTheme.emeraldPrimary),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // FAQ Populer
            const Text(
              'Pertanyaan Populer (FAQ)',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: BankSururiTheme.textDark),
            ),
            const SizedBox(height: 8),
            ...widget.helpTopics.map((topic) => Card(
                  margin: const EdgeInsets.only(bottom: 8),
                  child: ExpansionTile(
                    title: Text(topic.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    subtitle: Text(topic.category, style: const TextStyle(fontSize: 11, color: BankSururiTheme.emeraldPrimary)),
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(14),
                        child: Text(topic.answer, style: const TextStyle(fontSize: 12, color: BankSururiTheme.textMuted, height: 1.4)),
                      ),
                    ],
                  ),
                )),
          ],
        ),
      ),
    );
  }
}

/// ============================================================================
/// 11. MODAL: TOP UP BOTTOM SHEET
/// ============================================================================

class TopUpBottomSheet extends StatefulWidget {
  final Function(double) onTopUpConfirmed;
  final String Function(double) formatRupiah;

  const TopUpBottomSheet({
    super.key,
    required this.onTopUpConfirmed,
    required this.formatRupiah,
  });

  @override
  State<TopUpBottomSheet> createState() => _TopUpBottomSheetState();
}

class _TopUpBottomSheetState extends State<TopUpBottomSheet> {
  double selectedAmount = 1000000;
  final List<double> presetAmounts = [500000, 1000000, 2500000, 5000000];

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      padding: EdgeInsets.only(
        left: 20,
        right: 20,
        top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(color: Colors.black12, borderRadius: BorderRadius.circular(4)),
            ),
          ),
          const SizedBox(height: 16),
          const Text('Top Up Tabungan Umroh', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: BankSururiTheme.textDark)),
          const SizedBox(height: 6),
          const Text('Pilih nominal setoran untuk mempercepat pencapaian target ibadah.', style: TextStyle(fontSize: 12, color: BankSururiTheme.textMuted)),
          const SizedBox(height: 20),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: presetAmounts.map((amt) {
              final isSel = selectedAmount == amt;
              return ChoiceChip(
                label: Text(widget.formatRupiah(amt)),
                selected: isSel,
                onSelected: (val) => setState(() => selectedAmount = amt),
                selectedColor: BankSururiTheme.emeraldPrimary,
                labelStyle: TextStyle(
                  color: isSel ? Colors.white : BankSururiTheme.textDark,
                  fontWeight: FontWeight.w700,
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.black12),
            ),
            child: Row(
              children: const [
                Icon(Icons.account_balance, color: BankSururiTheme.emeraldPrimary, size: 20),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Setoran otomatis via SNAP BI Virtual Account (BSI, BCA Syariah, Mandiri, Muamalat).',
                    style: TextStyle(fontSize: 11, color: BankSururiTheme.textDark),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => widget.onTopUpConfirmed(selectedAmount),
              child: Text('Konfirmasi Setor \${widget.formatRupiah(selectedAmount)}'),
            ),
          ),
        ],
      ),
    );
  }
}

/// ============================================================================
/// 12. MODAL: KONFIRMASI PELUNASAN OPEN API SNAP BI
/// ============================================================================

class BookingSnapBiSheet extends StatelessWidget {
  final TravelPackage pkg;
  final double userSaldo;
  final String Function(double) formatRupiah;
  final VoidCallback onConfirmBooking;

  const BookingSnapBiSheet({
    super.key,
    required this.pkg,
    required this.userSaldo,
    required this.formatRupiah,
    required this.onConfirmBooking,
  });

  @override
  Widget build(BuildContext context) {
    final bool isCukup = userSaldo >= pkg.price;

    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(color: Colors.black12, borderRadius: BorderRadius.circular(4)),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: BankSururiTheme.emeraldPrimary.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.api, color: BankSururiTheme.emeraldPrimary, size: 24),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('Pelunasan Open API SNAP BI', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  Text('Standar Bank Indonesia & Terverifikasi SISKOPATUH', style: TextStyle(fontSize: 11, color: BankSururiTheme.textMuted)),
                ],
              ),
            ],
          ),
          const Divider(height: 24),
          Text(pkg.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
          const SizedBox(height: 4),
          Text('\${pkg.agencyName} (\${pkg.ppiuLicense})', style: const TextStyle(fontSize: 12, color: BankSururiTheme.textMuted)),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: [
                _buildRowItem('Biaya Paket All-In', formatRupiah(pkg.price)),
                const SizedBox(height: 8),
                _buildRowItem('Biaya Administrasi SNAP BI', 'Rp 0 (GRATIS)'),
                const Divider(height: 16),
                _buildRowItem(
                  'Saldo Tabungan Anda',
                  formatRupiah(userSaldo),
                  isBold: true,
                  color: isCukup ? BankSururiTheme.emeraldPrimary : Colors.red,
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          if (!isCukup)
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.red.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                children: const [
                  Icon(Icons.warning_amber, color: Colors.red, size: 20),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Saldo Anda belum mencukupi. Top up terlebih dahulu untuk menyelesaikan booking.',
                      style: TextStyle(fontSize: 11, color: Colors.red, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: isCukup ? onConfirmBooking : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: isCukup ? BankSururiTheme.emeraldPrimary : Colors.grey,
              ),
              child: const Text('Bayar & Booking via SNAP BI'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRowItem(String title, String value, {bool isBold = false, Color? color}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: TextStyle(fontSize: 12, color: BankSururiTheme.textMuted, fontWeight: isBold ? FontWeight.bold : FontWeight.normal)),
        Text(value, style: TextStyle(fontSize: 12, fontWeight: isBold ? FontWeight.bold : FontWeight.w600, color: color ?? BankSururiTheme.textDark)),
      ],
    );
  }
}

/// ============================================================================
/// 13. MODAL: DIGITAL E-VOUCHER SISKOPATUH
/// ============================================================================

class EVoucherDialog extends StatelessWidget {
  final EVoucher voucher;
  final String Function(double) formatRupiah;

  const EVoucherDialog({
    super.key,
    required this.voucher,
    required this.formatRupiah,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: const BoxDecoration(
                  color: BankSururiTheme.emeraldPrimary,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check, color: BankSururiTheme.goldAccent, size: 36),
              ),
              const SizedBox(height: 12),
              const Text('Alhamdulillah! Booking Berhasil', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: BankSururiTheme.emeraldDark)),
              const SizedBox(height: 4),
              const Text('E-Voucher Resmi Jamaah Umroh', style: TextStyle(fontSize: 12, color: BankSururiTheme.textMuted)),
              const Divider(height: 24),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFF8FAF9),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: BankSururiTheme.emeraldAccent.withValues(alpha: 0.4)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildVoucherRow('Kode Booking Bank', voucher.bookingCode),
                    _buildVoucherRow('PNR Airline', voucher.pnrCode, isGold: true),
                    _buildVoucherRow('Registrasi Kemenag', voucher.siskopatuhNo),
                    const Divider(height: 16),
                    _buildVoucherRow('Nama Jamaah', voucher.jamaahName),
                    _buildVoucherRow('Paket Umroh', voucher.packageTitle),
                    _buildVoucherRow('Biro PPIU', voucher.agencyName),
                    _buildVoucherRow('Keberangkatan', voucher.departureDate),
                    const Divider(height: 16),
                    _buildVoucherRow('Total Lunas SNAP BI', formatRupiah(voucher.totalPaid), isBold: true),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.black12),
                ),
                child: Column(
                  children: const [
                    Icon(Icons.qr_code_2, size: 90, color: BankSururiTheme.emeraldDark),
                    SizedBox(height: 4),
                    Text('Scan QR untuk Verifikasi di SISKOPATUH', style: TextStyle(fontSize: 10, color: BankSururiTheme.textMuted)),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Simpan & Selesai'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildVoucherRow(String label, String value, {bool isGold = false, bool isBold = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: BankSururiTheme.textMuted)),
          Text(
            value,
            style: TextStyle(
              fontSize: 12,
              fontWeight: isBold || isGold ? FontWeight.bold : FontWeight.w600,
              color: isGold ? const Color(0xFFB45309) : BankSururiTheme.textDark,
            ),
          ),
        ],
      ),
    );
  }
}
