import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, ShieldCheck, CreditCard, Building2, Smartphone } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';
import confetti from 'canvas-confetti';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number, method: string) => void;
  currentSaldo: number;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onClose,
  onTopUp,
  currentSaldo,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('SNAP-VA-BSI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const presetAmounts = [500000, 1000000, 2500000, 5000000, 10000000];

  const handleConfirm = () => {
    const finalAmount = customAmount ? parseInt(customAmount.replace(/\D/g, ''), 10) : selectedAmount;
    if (!finalAmount || isNaN(finalAmount) || finalAmount < 50000) {
      alert('Minimal setoran adalah Rp 50.000');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onTopUp(finalAmount, paymentMethod);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F5132', '#D4AF37', '#20C997', '#F3E5AB']
      });
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-900/10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Top Up Tabungan Umroh</h3>
              <p className="text-xs text-amber-200/80">Setoran Aman Terintegrasi SNAP BI</p>
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
        <div className="p-5 overflow-y-auto space-y-5 text-stone-800">
          {/* Info Saldo Saat Ini */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-800 font-medium">Saldo Tabungan Saat Ini</span>
              <p className="text-lg font-extrabold text-emerald-950 mt-0.5">{formatRupiah(currentSaldo)}</p>
            </div>
            <span className="text-[11px] font-semibold bg-emerald-200/80 text-emerald-900 px-2.5 py-1 rounded-full">
              Wadiah Yad Dhamanah
            </span>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-bold text-stone-600 block mb-2">Pilih Nominal Setoran Cepat</label>
            <div className="grid grid-cols-2 gap-2">
              {presetAmounts.map((amt) => {
                const isSelected = selectedAmount === amt && !customAmount;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-3 px-3 rounded-xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-900 text-white shadow-md'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <span>{formatRupiah(amt)}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nominal Kustom */}
          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">Atau Masukkan Nominal Lain (Rp)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-sm font-bold text-stone-400">Rp</span>
              <input
                type="text"
                placeholder="Contoh: 1.500.000"
                value={customAmount}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '');
                  if (raw) {
                    setCustomAmount(new Intl.NumberFormat('id-ID').format(parseInt(raw, 10)));
                  } else {
                    setCustomAmount('');
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-hidden focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
              />
            </div>
          </div>

          {/* Metode Pembayaran Syariah */}
          <div>
            <label className="text-xs font-bold text-stone-600 block mb-2">Metode Penyetoran Syariah</label>
            <div className="space-y-2">
              {[
                { id: 'SNAP-VA-BSI', name: 'Virtual Account Bank Syariah Indonesia (BSI)', sub: 'SNAP BI Instant Settlement', icon: Building2 },
                { id: 'SNAP-VA-BCA', name: 'Virtual Account BCA Syariah', sub: 'Otomatis Verifikasi 24/7', icon: Building2 },
                { id: 'SNAP-QRIS', name: 'QRIS Syariah Sururi', sub: 'Scan dari aplikasi mobile banking apa saja', icon: Smartphone },
                { id: 'DEBET-INTERNAL', name: 'Pindah Buku Rekening Giro/Tabungan Utama', sub: 'Bebas biaya administrasi', icon: CreditCard },
              ].map((m) => (
                <label
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === m.id
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="w-4 h-4 text-emerald-700 focus:ring-emerald-700 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1.5">
                      <m.icon className="w-3.5 h-3.5 text-emerald-800" />
                      <span className="text-xs font-bold">{m.name}</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">{m.sub}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
            <p className="text-[11px] text-amber-900 leading-relaxed">
              Setoran tabungan langsung memperbarui persentase progress target Umroh Anda secara real-time.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-stone-300 rounded-xl text-stone-700 font-semibold text-sm hover:bg-stone-100 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex-1 py-3 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Memproses...</span>
            ) : (
              <span>Konfirmasi Setoran</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
