import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Camera,
  CreditCard,
  UserCheck,
  Building,
  Key,
  Lock,
  ArrowRight,
  Sparkles,
  Ticket,
  FileCheck,
  ExternalLink,
} from 'lucide-react';
import { UserSavingsProfile, EVoucher } from '../types';
import { formatRupiah } from '../utils/formatters';

interface EkycDanSnapBiScreenProps {
  user: UserSavingsProfile;
  latestVoucher: EVoucher | null;
  onSimulateKyc: () => void;
  onOpenLatestVoucher: () => void;
  onNavigateToKatalog: () => void;
}

export const EkycDanSnapBiScreen: React.FC<EkycDanSnapBiScreenProps> = ({
  user,
  latestVoucher,
  onSimulateKyc,
  onOpenLatestVoucher,
  onNavigateToKatalog,
}) => {
  const [kycStep, setKycStep] = useState<number>(3); // 1: KTP, 2: Face, 3: Completed
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const runKycSimulation = () => {
    setIsVerifying(true);
    setKycStep(1);

    setTimeout(() => {
      setKycStep(2);
      setTimeout(() => {
        setKycStep(3);
        setIsVerifying(false);
        onSimulateKyc();
      }, 1200);
    }, 1200);
  };

  return (
    <div className="pb-24 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white p-5 pt-7 rounded-b-3xl shadow-md">
        <div className="flex items-center space-x-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">e-KYC & Open API SNAP BI</h2>
            <p className="text-xs text-amber-200/80">Keamanan Bank Indonesia & SISKOPATUH Kemenag</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Bagian 1: Status e-KYC Nasabah Syariah */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-stone-900">Status e-KYC Digital</h3>
              <p className="text-[11px] text-stone-500">Verifikasi Dukcapil RI & Biometrik Wajah</p>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
              {user.isKycVerified ? 'TERVERIFIKASI' : 'BELUM SELESAI'}
            </span>
          </div>

          {/* Stepper visual */}
          <div className="space-y-3 pt-1">
            {/* Step 1: KTP */}
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-stone-900">1. Foto e-KTP & Ekstraksi NIK</h4>
                  <span className="text-[10px] text-emerald-700 font-bold">Valid Dukcapil</span>
                </div>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">NIK: {user.nik} (Atas Nama {user.name})</p>
              </div>
            </div>

            {/* Step 2: Face Liveness */}
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-stone-900">2. Biometric Liveness & Anti-Spoofing</h4>
                  <span className="text-[10px] text-emerald-700 font-bold">Skor 99.8%</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Face Match dengan database e-KTP Kementerian Dalam Negeri</p>
              </div>
            </div>

            {/* Step 3: CIF Bank Syariah */}
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-stone-900">3. CIF & Rekening Tabungan Umroh</h4>
                  <span className="text-[10px] text-emerald-700 font-bold">Siap Transaksi</span>
                </div>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">No. Rekening: {user.accountNumber}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={runKycSimulation}
            disabled={isVerifying}
            className="w-full py-2.5 px-3 border border-stone-300 rounded-xl text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors flex items-center justify-center space-x-1.5"
          >
            {isVerifying ? (
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin"></span>
                <span>Memindai Biometrik Liveness...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-800" />
                <span>Uji Ulang Simulasi Foto KTP & Face Recognition</span>
              </span>
            )}
          </button>
        </div>

        {/* Bagian 2: Arsitektur Pelunasan Open API SNAP BI */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-stone-900">Standar Open API SNAP BI</h3>
              <p className="text-[11px] text-stone-500">Standar Nasional Pembayaran Bank Indonesia</p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Bank Sururi mengadopsi <strong>SNAP BI (Standar Nasional Open API Pembayaran)</strong> yang dirilis Bank Indonesia untuk memastikan interkoneksi langsung antara rekening tabungan nasabah, sistem reservasi maskapai, dan rekening escrow biro travel berizin PPIU:
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-900">
                <Lock className="w-3.5 h-3.5 text-emerald-800" />
                <span>Enkripsi Asymmetric & HMAC-SHA256</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                Setiap pemotongan saldo untuk pelunasan umroh divalidasi dengan signature kriptografi X-SIGNATURE Bank Indonesia sehingga anti-pembajakan.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-900">
                <Building className="w-3.5 h-3.5 text-emerald-800" />
                <span>Rekening Penampung Escrow Terproteksi</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                Dana jamaah tidak langsung dilepas ke biro travel sebelum izin visa dan tiket PNR terverifikasi di portal SISKOPATUH Kemenag RI.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-xs text-stone-900">
                <FileCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Penerbitan E-Voucher & QR Code Digital</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                Bukti booking langsung tersimpan secara digital dengan kode unik PNR yang bisa dicek langsung di konter maskapai.
              </p>
            </div>
          </div>
        </div>

        {/* Bagian 3: Bukti Booking / E-Voucher Terakhir */}
        {latestVoucher ? (
          <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#0A3D24] rounded-3xl p-5 text-white shadow-lg space-y-3 border border-amber-400/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-amber-300" />
                <h4 className="font-extrabold text-sm text-white">E-Voucher Booking Tersedia</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500 text-white rounded-md">
                LUNAS SNAP BI
              </span>
            </div>

            <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-200/80">Kode Booking:</span>
                <span className="font-mono font-bold text-amber-300">{latestVoucher.bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-200/80">PNR Tiket Pesawat:</span>
                <span className="font-mono font-bold text-white">{latestVoucher.pnrCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-200/80">Biro PPIU:</span>
                <span className="font-bold text-white">{latestVoucher.agencyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-200/80">Total Pembayaran:</span>
                <span className="font-bold text-amber-300">{formatRupiah(latestVoucher.totalPaid)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenLatestVoucher}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-xl text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Buka & Cetak E-Voucher Resmi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-stone-100 rounded-3xl p-5 border border-stone-200 text-center space-y-2">
            <p className="text-xs font-bold text-stone-700">Belum Ada Paket yang Dibooking</p>
            <p className="text-[11px] text-stone-500">
              Pilih paket umroh di Katalog Travel untuk menguji alur pelunasan otomatis via Open API SNAP BI.
            </p>
            <button
              type="button"
              onClick={onNavigateToKatalog}
              className="py-2 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs transition-colors inline-flex items-center space-x-1.5 mt-1"
            >
              <span>Buka Katalog PPIU</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
