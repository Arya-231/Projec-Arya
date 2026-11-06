import React, { useState } from 'react';
import {
  Calculator,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Save,
  BookOpen,
} from 'lucide-react';
import { UserSavingsProfile } from '../types';
import { formatRupiah } from '../utils/formatters';

interface SimulasiAutodebetScreenProps {
  user: UserSavingsProfile;
  onUpdateTarget: (newTarget: number, months: number, autodebetActive: boolean, debitDay: number) => void;
}

export const SimulasiAutodebetScreen: React.FC<SimulasiAutodebetScreenProps> = ({
  user,
  onUpdateTarget,
}) => {
  const [targetAmount, setTargetAmount] = useState<number>(user.targetTabungan);
  const [durationMonths, setDurationMonths] = useState<number>(user.targetDurasiBulan);
  const [autodebetActive, setAutodebetActive] = useState<boolean>(user.autodebetAktif);
  const [debitDay, setDebitDay] = useState<number>(user.tanggalAutodebet);
  const [showSavedFeedback, setShowSavedFeedback] = useState<boolean>(false);

  // Perhitungan otomatis setoran bulanan
  const diffKekurangan = Math.max(0, targetAmount - user.saldoUtama);
  const hitungAutodebetPerBulan = durationMonths > 0 ? Math.ceil(diffKekurangan / durationMonths) : 0;

  const targetBulanArray = [6, 12, 18, 24, 36];
  const debitDaysOptions = [1, 5, 20, 25, 28];

  const handleSave = () => {
    onUpdateTarget(targetAmount, durationMonths, autodebetActive, debitDay);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  return (
    <div className="pb-24 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white p-5 pt-7 rounded-b-3xl shadow-md">
        <div className="flex items-center space-x-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Simulasi Autodebet & Target</h2>
            <p className="text-xs text-amber-200/80">Kalkulator Rencana Ibadah Goal-Based Syariah</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Banner Notifikasi Berhasil Simpan */}
        {showSavedFeedback && (
          <div className="bg-emerald-800 text-white p-4 rounded-2xl shadow-lg border border-amber-400/50 flex items-center space-x-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle className="w-6 h-6 text-amber-300 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">Pengaturan Berhasil Disimpan!</p>
              <p className="text-emerald-100/80">Target tabungan dan jadwal autodebet bulanan telah aktif di dashboard.</p>
            </div>
          </div>
        )}

        {/* Card Form Interaktif */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-5">
          {/* Langkah 1: Target Biaya Umroh */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                1. Target Biaya Paket Umroh
              </label>
              <span className="text-base font-black text-emerald-900">
                {formatRupiah(targetAmount)}
              </span>
            </div>

            {/* Slider Input */}
            <input
              type="range"
              min="20000000"
              max="65000000"
              step="1000000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-800 cursor-pointer h-2 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
              <span>Rp 20 Juta (Promo)</span>
              <span>Rp 40 Juta (Reguler)</span>
              <span>Rp 65 Juta (VIP Clock Tower)</span>
            </div>

            {/* Quick Buttons */}
            <div className="flex space-x-2 pt-1">
              {[25000000, 30000000, 36500000, 45000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTargetAmount(preset)}
                  className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-colors ${
                    targetAmount === preset
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-black'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {preset / 1000000} Jt
                </button>
              ))}
            </div>
          </div>

          {/* Langkah 2: Durasi Menabung */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                2. Rencana Jangka Waktu Menabung
              </label>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {durationMonths} Bulan
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {targetBulanArray.map((m) => {
                const isSelected = durationMonths === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDurationMonths(m)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                      isSelected
                        ? 'border-emerald-800 bg-emerald-900 text-amber-300 shadow-sm'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {m} Bln
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kotak Ringkasan Hasil Kalkulasi */}
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 rounded-2xl p-4 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-200/90 font-medium">Estimasi Autodebet Bulanan:</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">
                Formula Tanpa Bunga (0%)
              </span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-amber-300 tracking-tight">
                {formatRupiah(hitungAutodebetPerBulan)}
              </span>
              <span className="text-xs text-emerald-100/80">/ bulan</span>
            </div>

            <div className="pt-2 border-t border-emerald-800/80 grid grid-cols-2 gap-2 text-[11px] text-emerald-100/90">
              <div>
                <span className="text-[10px] text-emerald-300/70 block">Saldo Tabungan Anda:</span>
                <span className="font-bold">{formatRupiah(user.saldoUtama)}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300/70 block">Kekurangan Target:</span>
                <span className="font-bold text-amber-300">{formatRupiah(diffKekurangan)}</span>
              </div>
            </div>
          </div>

          {/* Langkah 3: Toggle Autodebet & Jadwal */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-stone-900">Aktifkan Autodebet Otomatis</h4>
                <p className="text-[11px] text-stone-500">
                  Potong otomatis dari rekening tabungan utama setiap bulan
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setAutodebetActive(!autodebetActive)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  autodebetActive ? 'bg-emerald-800' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    autodebetActive ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {autodebetActive && (
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-2 animate-in fade-in duration-200">
                <span className="text-[11px] font-bold text-stone-700 block">
                  Pilih Tanggal Pendebetan Bulanan
                </span>
                <div className="flex space-x-2">
                  {debitDaysOptions.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setDebitDay(day)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        debitDay === day
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      Tgl {day}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-stone-500">
                  Sumber dana: <span className="font-semibold text-stone-800">{user.rekeningSumber}</span>
                </p>
              </div>
            )}
          </div>

          {/* Tombol Simpan */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Simpan Target & Pasang Autodebet</span>
          </button>
        </div>

        {/* Edukasi Syariah: Wadiah Yad Dhamanah */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-4 space-y-2 text-stone-800 text-xs">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Transparansi Syariah: Akad Wadiah Yad Dhamanah</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            Bank Sururi bertindak sebagai penerima titipan murni yang menjamin keamanan dana tabungan umroh Anda 100%. Tidak ada potongan biaya administrasi bulanan, tidak ada bunga (riba), dan nasabah berhak menerima bonus sukarela bulanan yang halal sesuai Fatwa DSN-MUI No. 02/DSN-MUI/IV/2000.
          </p>
        </div>
      </div>
    </div>
  );
};
