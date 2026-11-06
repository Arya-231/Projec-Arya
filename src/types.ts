export interface UserSavingsProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  accountNumber: string;
  isKycVerified: boolean;
  nik: string;
  pin: string;
  saldoUtama: number; // e.g. Rp 18.500.000
  targetTabungan: number; // e.g. Rp 30.000.000
  targetDurasiBulan: number; // e.g. 12 bulan
  autodebetAktif: boolean;
  autodebetNominalPerBulan: number;
  tanggalAutodebet: number; // e.g. tanggal 25 tiap bulan
  rekeningSumber: string;
  akad: string;
  targetBulanSelesai: string;
  avatar?: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  agencyName: string;
  ppiuLicense: string; // e.g., "Kemenag RI No. U.412/2021"
  badge: string; // "PPIU Official Kemenag"
  category: 'Reguler' | 'VIP' | 'Promo' | 'Ramadhan';
  durationDays: number;
  makkahHotel: string;
  makkahHotelStars: number;
  madinahHotel: string;
  madinahHotelStars: number;
  airline: string;
  flightType: string; // "Direct Jakarta - Jeddah"
  departureDate: string;
  price: number;
  quotaTotal: number;
  quotaAvailable: number;
  rating: number;
  reviewCount: number;
  features: string[];
  bannerImage: string;
}

export interface TransactionItem {
  id: string;
  title: string;
  type: 'topup' | 'autodebet' | 'booking' | 'bonus';
  date: string;
  amount: number;
  status: 'Berhasil' | 'Diproses';
  referenceNo: string;
  description: string;
  category: 'Kredit' | 'Debit';
}

export interface EVoucher {
  bookingId: string;
  bookingCode: string; // e.g. SRR-UMR-2026-8941
  pnrCode: string; // e.g. SV-789XQ
  siskopatuhNo: string; // SISKOPATUH Kemenag ID
  jamaahName: string;
  packageTitle: string;
  agencyName: string;
  departureDate: string;
  durationDays: number;
  flightDetail: string;
  hotelDetail: string;
  totalPaid: number;
  paymentMethod: string;
  snapReference: string;
  issuedAt: string;
  status: 'TERVERIFIKASI' | 'LUNAS';
}

export interface HelpTopic {
  id: string;
  title: string;
  category: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  time: string;
}

