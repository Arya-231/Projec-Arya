import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Lock, Sparkles, Building2, Calendar, MapPin, Plane } from 'lucide-react';
import { TravelPackage } from '../types';
import { formatRupiah } from '../utils/formatters';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageItem: TravelPackage | null;
  userSaldo: number;
  userName: string;
  onConfirmBooking: (pkg: TravelPackage) => void;
  onOpenTopUp: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  packageItem,
  userSaldo,
  userName,
  onConfirmBooking,
  onOpenTopUp,
}) => {
  const [pin, setPin] = useState<string>('123456');
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);

  if (!isOpen || !packageItem) return null;

  const isSaldoCukup = userSaldo >= packageItem.price;
  const sisaSaldoSetelahBayar = userSaldo - packageItem.price;

  const handleExecuteBooking = () => {
    if (!isSaldoCukup) return;
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onConfirmBooking(packageItem);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white">Pelunasan Open API SNAP BI</h3>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-amber-400 text-emerald-950 rounded-sm">
                  RESMI
                </span>
              </div>
              <p className="text-xs text-amber-200/80">Standar Nasional Bank Indonesia & SISKOPATUH Kemenag</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-stone-800 text-xs">
          {/* Card Paket Ringkas */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                {packageItem.ppiuLicense}
              </span>
              <span className="text-[11px] font-bold text-stone-500">
                {packageItem.durationDays} Hari Perjalanan
              </span>
            </div>
            <h4 className="text-sm font-extrabold text-stone-900">{packageItem.title}</h4>
            <div className="flex items-center text-stone-600 space-x-2 text-[11px]">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{packageItem.agencyName}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200 text-[11px] text-stone-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Berangkat: {packageItem.departureDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Plane className="w-3.5 h-3.5 text-stone-400" />
                <span>{packageItem.airline.split('(')[0]}</span>
              </div>
            </div>
          </div>

          {/* Rincian Finansial & Saldo */}
          <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200/60 space-y-2.5">
            <h5 className="font-bold text-xs text-emerald-950 flex items-center justify-between">
              <span>Rincian Pembayaran Otomatis</span>
              <span className="text-[10px] text-emerald-700 font-medium">Auto-Debit Escrow</span>
            </h5>

            <div className="flex justify-between items-center text-stone-600">
              <span>Biaya Paket All-In Jamaah</span>
              <span className="font-bold text-stone-900">{formatRupiah(packageItem.price)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Biaya Transaksi SNAP BI</span>
              <span className="font-semibold text-emerald-700">Rp 0 (Subsidi Sururi)</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Biaya SISKOPATUH Kemenag RI</span>
              <span className="font-semibold text-emerald-700">Termasuk</span>
            </div>

            <div className="pt-2 border-t border-emerald-200 flex justify-between items-center">
              <span className="font-bold text-stone-900">Total Pelunasan</span>
              <span className="text-base font-black text-emerald-900">{formatRupiah(packageItem.price)}</span>
            </div>

            <div className="pt-2 border-t border-emerald-200/60 space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-stone-500">Saldo Tabungan Umroh Saat Ini:</span>
                <span className="font-bold text-stone-800">{formatRupiah(userSaldo)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-stone-500">Estimasi Saldo Setelah Pelunasan:</span>
                <span className={`font-bold ${isSaldoCukup ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {isSaldoCukup ? formatRupiah(sisaSaldoSetelahBayar) : 'Saldo Tidak Cukup'}
                </span>
              </div>
            </div>
          </div>

          {/* Alert Jika Saldo Kurang */}
          {!isSaldoCukup && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-start space-x-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-900 text-xs">Saldo Tabungan Belum Mencukupi</p>
                  <p className="text-[11px] text-rose-700 leading-relaxed mt-0.5">
                    Kekurangan dana: <span className="font-bold">{formatRupiah(packageItem.price - userSaldo)}</span>. Silakan lakukan Top Up instan sekarang via Virtual Account atau QRIS Syariah.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTopUp();
                }}
                className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Top Up Tabungan Sekarang</span>
              </button>
            </div>
          )}

          {/* Keamanan SNAP BI Section */}
          <div className="p-3 bg-stone-100/70 rounded-xl space-y-1.5 text-[10px] text-stone-600">
            <div className="flex items-center space-x-1.5 font-bold text-stone-800">
              <Lock className="w-3 h-3 text-emerald-800" />
              <span>Protokol SNAP BI & Jaminan Escrow Syariah</span>
            </div>
            <p>
              Dana Anda akan dikunci di Rekening Escrow Penampung Bank Sururi berizin BI & OJK. Dana baru dicairkan ke biro travel setelah tiket PNR dan Visa Umroh SISKOPATUH terbit secara sah.
            </p>
            <div className="text-[9px] font-mono text-stone-500 bg-stone-200/60 p-1.5 rounded">
              Payload Signature: SHA256withRSA/HMAC-SHA256 • Endpoint: /v1.0/debit/snap/umroh-settle
            </div>
          </div>

          {/* Persetujuan & Checkbox */}
          {isSaldoCukup && (
            <label className="flex items-start space-x-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="w-4 h-4 text-emerald-800 focus:ring-emerald-800 mt-0.5 rounded"
              />
              <span className="text-[11px] text-stone-600 leading-tight">
                Saya menyetujui pendebetan Tabungan Umroh senilai <span className="font-bold text-stone-900">{formatRupiah(packageItem.price)}</span> atas nama jamaah <span className="font-bold text-stone-900">{userName}</span> sesuai ketentuan syariah.
              </span>
            </label>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-stone-300 rounded-xl text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleExecuteBooking}
            disabled={!isSaldoCukup || !termsAgreed || isAuthorizing}
            className="flex-1 py-3 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAuthorizing ? (
              <span className="flex items-center space-x-1.5">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Memproses SNAP BI...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Bayar & Booking via SNAP BI</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
