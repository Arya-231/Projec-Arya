import React from 'react';
import {
  TrendingUp,
  PlusCircle,
  Sliders,
  Compass,
  History,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  Plane,
  ChevronRight,
  Info,
  BadgeCheck,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { UserSavingsProfile, TransactionItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface BerandaScreenProps {
  user: UserSavingsProfile;
  transactions: TransactionItem[];
  onOpenTopUp: () => void;
  onNavigateToTab: (tab: 'beranda' | 'katalog' | 'simulasi' | 'ekyc' | 'bantuan') => void;
  onLogout?: () => void;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  user,
  transactions,
  onOpenTopUp,
  onNavigateToTab,
  onLogout,
}) => {
  const progressRatio = Math.min(1, Math.max(0, user.saldoUtama / user.targetTabungan));
  const progressPercent = Math.round(progressRatio * 100);
  const sisaKekurangan = Math.max(0, user.targetTabungan - user.saldoUtama);

  return (
    <div className="pb-24 space-y-4">
      {/* Header Islami Zamrud & Emas */}
      <div className="relative bg-gradient-to-br from-[#062c1a] via-[#0a3d24] to-[#0f5132] text-white pt-6 pb-8 px-5 rounded-b-[32px] shadow-lg overflow-hidden">
        {/* Islamic Ornament Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Top Bar with Brand & KYC Badge */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-inner">
              <span className="font-arabic text-xl leading-none font-bold">ب</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-base tracking-wide text-white">BANK SURURI</span>
                <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 bg-[#D4AF37] text-[#0A3D24] rounded-sm">
                  SYARIAH
                </span>
              </div>
              <p className="text-[10px] text-amber-200/90 font-medium">Tabungan Umroh & PPIU Terintegrasi</p>
            </div>
          </div>

          {/* Action Header Buttons: Bantuan & Logout */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => onNavigateToTab('bantuan')}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors"
              title="Pusat Bantuan & CS 24/7"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-full bg-white/10 hover:bg-rose-500/30 text-rose-300 transition-colors"
                title="Keluar / Ganti Akun"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Greeting & Account Number & KYC */}
        <div className="relative z-10 mt-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-emerald-200/90 font-medium">Assalamu'alaikum Warahmatullah,</p>
            <button
              onClick={() => onNavigateToTab('ekyc')}
              className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/15 border border-[#D4AF37]/40 text-amber-200 text-[10px] font-semibold"
            >
              <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>e-KYC Terverifikasi</span>
            </button>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{user.name}</h2>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-200/70 font-mono">
            <span>Rekening Umroh:</span>
            <span className="tracking-wider text-amber-300 font-semibold">{user.accountNumber}</span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 -mt-5 relative z-20">
        {/* Card Goal Tracker Tabungan Umroh */}
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-stone-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Goal Tracker Tabungan Umroh</h3>
                <p className="text-[10px] text-stone-500">Ibadah Nyaman Bebas Riba (Akad Wadiah)</p>
              </div>
            </div>

            <div className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-black">
              {progressPercent}% Terkumpul
            </div>
          </div>

          {/* Progress Bar & Amount Display */}
          <div className="space-y-2 pt-1">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-stone-500 font-medium block">Saldo Terkumpul Saat Ini</span>
                <span className="text-2xl font-black text-emerald-900 tracking-tight">
                  {formatRupiah(user.saldoUtama)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-stone-400 block">Target Paket</span>
                <span className="text-xs font-bold text-stone-700">{formatRupiah(user.targetTabungan)}</span>
              </div>
            </div>

            {/* Custom Linear Progress Bar with Shimmer */}
            <div className="w-full h-3.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200/80">
              <div
                className="h-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-[#D4AF37] rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <span>
                Sisa Kurang: <strong className="text-stone-800 font-bold">{formatRupiah(sisaKekurangan)}</strong>
              </span>
              <span className="text-emerald-800 font-semibold flex items-center space-x-1">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                <span>Estimasi: {user.targetBulanSelesai}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Autodebet Schedule Card */}
        <div className="bg-gradient-to-br from-emerald-50 via-[#f4faf6] to-amber-50/50 rounded-2xl p-4 border border-emerald-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Clock className="w-4 h-4 text-amber-300" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-xs text-stone-900">Autodebet Syariah Bulanan</h4>
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                    user.autodebetAktif
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {user.autodebetAktif ? 'AKTIF' : 'NONAKTIF'}
                </span>
              </div>
              <p className="text-xs font-black text-emerald-950">
                {formatRupiah(user.autodebetNominalPerBulan)} <span className="text-[10px] font-normal text-stone-600">/ bulan (Tiap tgl {user.tanggalAutodebet})</span>
              </p>
              <p className="text-[10px] text-stone-500">
                Debet otomatis dari: {user.rekeningSumber}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('simulasi')}
            className="w-7 h-7 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-emerald-800 hover:bg-emerald-50 transition-colors shadow-xs"
            title="Ubah Pengaturan Autodebet"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions (Aksi Cepat) */}
        <div>
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5 px-1">
            Aksi Cepat Tabungan
          </h4>
          <div className="grid grid-cols-4 gap-2.5">
            {/* Top Up Manual */}
            <button
              onClick={onOpenTopUp}
              className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-1.5 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-stone-800">Top Up</span>
              <span className="text-[9px] text-stone-400">Tambah Saldo</span>
            </button>

            {/* Ubah Target */}
            <button
              onClick={() => onNavigateToTab('simulasi')}
              className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-xs hover:border-amber-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-stone-800">Ubah Target</span>
              <span className="text-[9px] text-stone-400">Simulasi Goal</span>
            </button>

            {/* Pilih Paket Travel */}
            <button
              onClick={() => onNavigateToTab('katalog')}
              className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-xs hover:border-sky-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-1.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Plane className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-stone-800">Katalog PPIU</span>
              <span className="text-[9px] text-stone-400">Travel Resmi</span>
            </button>

            {/* Mutasi Transaksi */}
            <button
              onClick={() => onNavigateToTab('ekyc')}
              className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center mb-1.5 group-hover:bg-emerald-900 group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-stone-800">e-KYC & SNAP</span>
              <span className="text-[9px] text-stone-400">Verifikasi</span>
            </button>
          </div>
        </div>

        {/* Riwayat Transaksi Syariah */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm flex items-center space-x-1.5">
              <History className="w-4 h-4 text-emerald-800" />
              <span>Riwayat Transaksi Syariah</span>
            </h4>
            <span className="text-[11px] font-bold text-emerald-800 cursor-pointer hover:underline">
              Semua Mutasi
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-3 first:pt-1 last:pb-0 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.type === 'booking'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : tx.type === 'autodebet'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {tx.type === 'booking' ? (
                      <Plane className="w-4 h-4" />
                    ) : tx.type === 'autodebet' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 text-emerald-700" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">{tx.title}</h5>
                    <p className="text-[10px] text-stone-400">{tx.date} • {tx.referenceNo}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-extrabold ${
                      tx.type === 'booking' ? 'text-rose-600' : 'text-emerald-800'
                    }`}
                  >
                    {tx.type === 'booking' ? '- ' : '+ '}
                    {formatRupiah(tx.amount)}
                  </span>
                  <span className="block text-[9px] text-stone-400 font-medium">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sharia Compliance Footer Banner */}
        <div className="bg-stone-100/90 rounded-2xl p-3.5 border border-stone-200 flex items-start space-x-2.5 text-stone-600 text-[11px]">
          <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Tabungan Umroh Bank Sururi menggunakan <strong>Akad Wadiah Yad Dhamanah</strong>. Dana aman dijamin LPS hingga 2 Miliar Rupiah dan diawasi oleh Dewan Pengawas Syariah (DPS) DSN-MUI.
          </p>
        </div>
      </div>
    </div>
  );
};
