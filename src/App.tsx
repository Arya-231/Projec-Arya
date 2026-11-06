import React, { useState } from 'react';
import {
  Home,
  Calculator,
  ShieldCheck,
  Code2,
  Copy,
  Check,
  Plane,
  HelpCircle,
} from 'lucide-react';
import { mockUsers, initialUser, mockTravelPackages, initialTransactions } from './data/mockData';
import { UserSavingsProfile, TravelPackage, TransactionItem, EVoucher } from './types';
import { BerandaScreen } from './components/BerandaScreen';
import { KatalogTravelScreen } from './components/KatalogTravelScreen';
import { SimulasiAutodebetScreen } from './components/SimulasiAutodebetScreen';
import { EkycDanSnapBiScreen } from './components/EkycDanSnapBiScreen';
import { BantuanLayananScreen } from './components/BantuanLayananScreen';
import { AuthScreens } from './components/AuthScreens';
import { TopUpModal } from './components/TopUpModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { EVoucherModal } from './components/EVoucherModal';
import { FlutterCodeViewerModal } from './components/FlutterCodeViewerModal';
import { FLUTTER_MAIN_DART_CODE } from './flutter_code';

export default function App() {
  // Master Auth & Users State
  const [allUsers, setAllUsers] = useState<UserSavingsProfile[]>(mockUsers);
  const [user, setUser] = useState<UserSavingsProfile>(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [packages] = useState<TravelPackage[]>(mockTravelPackages);
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [latestVoucher, setLatestVoucher] = useState<EVoucher | null>(null);

  // Navigation State: 'beranda' | 'katalog' | 'simulasi' | 'ekyc' | 'bantuan'
  const [currentTab, setCurrentTab] = useState<'beranda' | 'katalog' | 'simulasi' | 'ekyc' | 'bantuan'>('beranda');

  // Modals
  const [isTopUpOpen, setIsTopUpOpen] = useState<boolean>(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<TravelPackage | null>(null);
  const [isVoucherOpen, setIsVoucherOpen] = useState<boolean>(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [quickCopied, setQuickCopied] = useState<boolean>(false);


  // Handler: Top Up
  const handleTopUp = (amount: number, method: string) => {
    const newSaldo = user.saldoUtama + amount;
    setUser((prev) => ({
      ...prev,
      saldoUtama: newSaldo,
    }));

    const newTx: TransactionItem = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      title: 'Top Up Tabungan Umroh',
      type: 'topup',
      date: 'Hari ini, Baru saja',
      amount: amount,
      status: 'Berhasil',
      referenceNo: `TU-SRR-${Math.floor(100000 + Math.random() * 900000)}`,
      description: `Setoran via ${method}`,
      category: 'Kredit',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Handler: Update Target Simulasi
  const handleUpdateTarget = (newTarget: number, months: number, autodebetActive: boolean, debitDay: number) => {
    const diff = Math.max(0, newTarget - user.saldoUtama);
    const autodebetPerBulan = months > 0 ? Math.ceil(diff / months) : 0;

    // Estimasi bulan selesai
    const now = new Date();
    now.setMonth(now.getMonth() + months);
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const targetBulanSelesai = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    setUser((prev) => ({
      ...prev,
      targetTabungan: newTarget,
      targetDurasiBulan: months,
      autodebetAktif: autodebetActive,
      autodebetNominalPerBulan: autodebetPerBulan,
      tanggalAutodebet: debitDay,
      targetBulanSelesai: targetBulanSelesai,
    }));
  };

  // Handler: Konfirmasi Booking SNAP BI
  const handleExecuteBooking = (pkg: TravelPackage) => {
    if (user.saldoUtama < pkg.price) return;

    const newSaldo = user.saldoUtama - pkg.price;
    setUser((prev) => ({
      ...prev,
      saldoUtama: newSaldo,
    }));

    const bookingId = `SRR-UMR-${Date.now().toString().slice(-6)}`;
    const pnrCode = `SV-${Math.random().toString(36).substring(2, 6).toUpperCase()}Q`;
    const siskopatuh = `SISKOPATUH-RI-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const snapRef = `SNAP-BI-DIRECT-${Date.now().toString().slice(-8)}`;

    const voucher: EVoucher = {
      bookingId: bookingId,
      bookingCode: bookingId,
      pnrCode: pnrCode,
      siskopatuhNo: siskopatuh,
      jamaahName: user.name,
      packageTitle: pkg.title,
      agencyName: pkg.agencyName,
      departureDate: pkg.departureDate,
      durationDays: pkg.durationDays,
      flightDetail: pkg.flightType,
      hotelDetail: `${pkg.makkahHotel} & ${pkg.madinahHotel}`,
      totalPaid: pkg.price,
      paymentMethod: 'Open API SNAP BI Direct Debit',
      snapReference: snapRef,
      issuedAt: '16 Oktober 2026, 11:30 WIB',
      status: 'LUNAS',
    };

    setLatestVoucher(voucher);

    // Tambah Transaksi Mutasi
    const newTx: TransactionItem = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      title: `Pelunasan: ${pkg.agencyName}`,
      type: 'booking',
      date: 'Hari ini, Baru saja',
      amount: pkg.price,
      status: 'Berhasil',
      referenceNo: `BK-SNAP-${Math.floor(100000 + Math.random() * 900000)}`,
      description: `Pelunasan Umroh Terintegrasi SNAP BI`,
      category: 'Debit',
    };

    setTransactions((prev) => [newTx, ...prev]);
    setIsVoucherOpen(true);
  };

  // Handler: Simulasi e-KYC
  const handleSimulateKyc = () => {
    setUser((prev) => ({
      ...prev,
      isKycVerified: true,
    }));
  };

  // Quick Copy Flutter Code
  const handleQuickCopy = () => {
    navigator.clipboard.writeText(FLUTTER_MAIN_DART_CODE);
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 antialiased selection:bg-emerald-600 selection:text-white relative">

      {/* Main Content Area */}
      <main className="w-full flex-1 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-[420px] h-screen sm:h-[840px] sm:max-h-[94vh] flex flex-col justify-center">
          {/* Phone Shell / Mockup Container */}
          <div className="bg-stone-900 sm:rounded-[42px] p-0 sm:p-2.5 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] sm:border-4 sm:border-stone-800 flex-1 flex flex-col relative overflow-hidden">
            {/* Phone Screen Glass */}
            <div className="bg-[#F8F9FA] sm:rounded-[32px] overflow-hidden flex flex-col relative text-stone-900 h-full w-full">
              {/* Phone Status Bar (Mockup Android / iOS) */}
              <div className="bg-[#062c1a] text-white px-6 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold select-none z-30">
                <span className="font-mono">09:41</span>
                {/* Speaker/Camera notch dot */}
                <div className="w-16 h-3.5 bg-black/60 rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-950/80 border border-stone-700" />
                </div>
                <div className="flex items-center space-x-1.5 text-stone-300">
                  <span className="text-[10px]">5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Scrollable Phone Page Content */}
              <div className="flex-1 overflow-y-auto relative scrollbar-none">
                {!isLoggedIn ? (
                  <AuthScreens
                    allUsers={allUsers}
                    onLoginSuccess={(loggedUser) => {
                      setUser(loggedUser);
                      setIsLoggedIn(true);
                      setCurrentTab('beranda');
                    }}
                    onAddNewUser={(newUser) => {
                      setAllUsers((prev) => [newUser, ...prev]);
                    }}
                    onOpenHelp={() => {
                      setIsLoggedIn(true);
                      setCurrentTab('bantuan');
                    }}
                  />
                ) : (
                  <>
                    {currentTab === 'beranda' && (
                      <BerandaScreen
                        user={user}
                        transactions={transactions}
                        onOpenTopUp={() => setIsTopUpOpen(true)}
                        onNavigateToTab={(t) => setCurrentTab(t)}
                        onLogout={() => {
                          setIsLoggedIn(false);
                        }}
                      />
                    )}

                    {currentTab === 'katalog' && (
                      <KatalogTravelScreen
                        packages={packages}
                        userSaldo={user.saldoUtama}
                        onSelectPackageForBooking={(pkg) => setSelectedPackageForBooking(pkg)}
                      />
                    )}

                    {currentTab === 'simulasi' && (
                      <SimulasiAutodebetScreen
                        user={user}
                        onUpdateTarget={handleUpdateTarget}
                      />
                    )}

                    {currentTab === 'ekyc' && (
                      <EkycDanSnapBiScreen
                        user={user}
                        latestVoucher={latestVoucher}
                        onSimulateKyc={handleSimulateKyc}
                        onOpenLatestVoucher={() => setIsVoucherOpen(true)}
                        onNavigateToKatalog={() => setCurrentTab('katalog')}
                      />
                    )}

                    {currentTab === 'bantuan' && (
                      <BantuanLayananScreen
                        onBackToHome={() => setCurrentTab('beranda')}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Bottom Navigation Bar (Hanya tampil saat sudah login) */}
              {isLoggedIn && (
                <nav className="bg-white border-t border-stone-200/90 px-2 py-1.5 shrink-0 flex items-center justify-around z-30 shadow-lg">
                  {/* Tab 1: Beranda */}
                  <button
                    type="button"
                    onClick={() => setCurrentTab('beranda')}
                    className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                      currentTab === 'beranda'
                        ? 'text-[#0F5132] font-black scale-105'
                        : 'text-stone-400 hover:text-stone-700 font-semibold'
                    }`}
                  >
                    <div
                      className={`p-1 rounded-xl transition-colors ${
                        currentTab === 'beranda' ? 'bg-emerald-50 text-[#0F5132]' : ''
                      }`}
                    >
                      <Home className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] mt-0.5">Beranda</span>
                  </button>

                  {/* Tab 2: Katalog */}
                  <button
                    type="button"
                    onClick={() => setCurrentTab('katalog')}
                    className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                      currentTab === 'katalog'
                        ? 'text-[#0F5132] font-black scale-105'
                        : 'text-stone-400 hover:text-stone-700 font-semibold'
                    }`}
                  >
                    <div
                      className={`p-1 rounded-xl transition-colors ${
                        currentTab === 'katalog' ? 'bg-emerald-50 text-[#0F5132]' : ''
                      }`}
                    >
                      <Plane className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] mt-0.5">Katalog</span>
                  </button>

                  {/* Tab 3: Simulasi */}
                  <button
                    type="button"
                    onClick={() => setCurrentTab('simulasi')}
                    className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                      currentTab === 'simulasi'
                        ? 'text-[#0F5132] font-black scale-105'
                        : 'text-stone-400 hover:text-stone-700 font-semibold'
                    }`}
                  >
                    <div
                      className={`p-1 rounded-xl transition-colors ${
                        currentTab === 'simulasi' ? 'bg-emerald-50 text-[#0F5132]' : ''
                      }`}
                    >
                      <Calculator className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] mt-0.5">Simulasi</span>
                  </button>

                  {/* Tab 4: e-KYC & SNAP */}
                  <button
                    type="button"
                    onClick={() => setCurrentTab('ekyc')}
                    className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                      currentTab === 'ekyc'
                        ? 'text-[#0F5132] font-black scale-105'
                        : 'text-stone-400 hover:text-stone-700 font-semibold'
                    }`}
                  >
                    <div
                      className={`p-1 rounded-xl transition-colors ${
                        currentTab === 'ekyc' ? 'bg-emerald-50 text-[#0F5132]' : ''
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] mt-0.5">e-KYC</span>
                  </button>

                  {/* Tab 5: Bantuan Layanan */}
                  <button
                    type="button"
                    onClick={() => setCurrentTab('bantuan')}
                    className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                      currentTab === 'bantuan'
                        ? 'text-[#0F5132] font-black scale-105'
                        : 'text-stone-400 hover:text-stone-700 font-semibold'
                    }`}
                  >
                    <div
                      className={`p-1 rounded-xl transition-colors ${
                        currentTab === 'bantuan' ? 'bg-emerald-50 text-[#0F5132]' : ''
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] mt-0.5">Bantuan</span>
                  </button>
                </nav>
              )}

              {/* Phone Home Bar Indicator */}
              <div className="bg-white pb-1 pt-0.5 flex justify-center">
                <div className="w-28 h-1 bg-stone-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Discreet floating developer utility on desktop outside phone frame */}
      <div className="fixed bottom-3 right-3 z-40 hidden md:flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <button
          onClick={handleQuickCopy}
          className="px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-amber-300 text-[11px] font-semibold backdrop-blur-md transition-all flex items-center space-x-1.5 shadow-md"
          title="Salin source code Flutter main.dart"
        >
          {quickCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{quickCopied ? 'Tersalin' : 'Salin Flutter'}</span>
        </button>
        <button
          onClick={() => setIsCodeModalOpen(true)}
          className="p-1.5 rounded-full bg-[#D4AF37] hover:bg-[#e6c148] text-emerald-950 font-bold transition-all shadow-md active:scale-95"
          title="Buka Kode Flutter main.dart"
        >
          <Code2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modals & Dialogs */}
      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        onTopUp={handleTopUp}
        currentSaldo={user.saldoUtama}
      />

      <BookingConfirmationModal
        isOpen={!!selectedPackageForBooking}
        onClose={() => setSelectedPackageForBooking(null)}
        packageItem={selectedPackageForBooking}
        userSaldo={user.saldoUtama}
        userName={user.name}
        onConfirmBooking={handleExecuteBooking}
        onOpenTopUp={() => setIsTopUpOpen(true)}
      />

      <EVoucherModal
        voucher={latestVoucher}
        onClose={() => setIsVoucherOpen(false)}
      />

      <FlutterCodeViewerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
