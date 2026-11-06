import React from 'react';
import { X, CheckCircle, QrCode, Download, Share2, Building2, Calendar, Plane, ShieldCheck, Printer } from 'lucide-react';
import { EVoucher } from '../types';
import { formatRupiah } from '../utils/formatters';

interface EVoucherModalProps {
  voucher: EVoucher | null;
  onClose: () => void;
}

export const EVoucherModal: React.FC<EVoucherModalProps> = ({ voucher, onClose }) => {
  if (!voucher) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Banner Sukses Atas */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 p-5 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-14 h-14 bg-amber-400 rounded-full mx-auto flex items-center justify-center shadow-lg mb-2 text-emerald-950 border-2 border-white">
            <CheckCircle className="w-8 h-8 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
            Alhamdulillah Berhasil
          </span>
          <h3 className="text-lg font-black text-white">E-Voucher Resmi Jamaah Umroh</h3>
          <p className="text-xs text-emerald-100/80">Terverifikasi Sistem Kemenag RI & SNAP BI</p>
        </div>

        {/* Tiket Fisik Digital */}
        <div className="p-5 overflow-y-auto space-y-4 text-stone-800 text-xs">
          <div className="border border-emerald-900/15 rounded-2xl bg-stone-50 overflow-hidden shadow-xs">
            {/* Header Voucher */}
            <div className="bg-emerald-900/10 p-3.5 border-b border-emerald-900/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">KODE BOOKING SURURI</span>
                <span className="font-mono font-black text-sm text-emerald-950 tracking-wider">
                  {voucher.bookingCode}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">PNR AIRLINE</span>
                <span className="font-mono font-black text-sm text-amber-800 tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                  {voucher.pnrCode}
                </span>
              </div>
            </div>

            {/* Isi Voucher */}
            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold">Nama Jamaah Utama</span>
                <p className="text-sm font-extrabold text-stone-900">{voucher.jamaahName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">Biro PPIU Berizin</span>
                  <p className="font-bold text-stone-800">{voucher.agencyName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">SISKOPATUH No.</span>
                  <p className="font-mono font-bold text-emerald-800">{voucher.siskopatuhNo}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold">Paket Umroh</span>
                <p className="font-bold text-stone-900">{voucher.packageTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                  <div>
                    <span className="text-[10px] text-stone-400 block">Jadwal Keberangkatan</span>
                    <span className="font-bold text-stone-800">{voucher.departureDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Plane className="w-3.5 h-3.5 text-emerald-800" />
                  <div>
                    <span className="text-[10px] text-stone-400 block">Penerbangan</span>
                    <span className="font-bold text-stone-800">{voucher.flightDetail}</span>
                  </div>
                </div>
              </div>

              {/* Status Lunas */}
              <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-emerald-800 font-semibold block">Total Pelunasan SNAP BI</span>
                  <span className="text-base font-black text-emerald-950">{formatRupiah(voucher.totalPaid)}</span>
                </div>
                <div className="bg-emerald-700 text-white font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {voucher.status}
                </div>
              </div>
            </div>

            {/* Kode QR & Barcode Verifikasi */}
            <div className="p-4 bg-white border-t-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-center">
              <div className="p-2 border border-stone-200 rounded-xl bg-stone-50 shadow-inner inline-block mb-1.5">
                <QrCode className="w-24 h-24 text-emerald-950" />
              </div>
              <span className="text-[10px] font-mono text-stone-500">
                SNAP-REF: {voucher.snapReference}
              </span>
              <p className="text-[10px] text-stone-400 mt-0.5">
                Pindai QR saat kedatangan di bandara atau kantor perwakilan biro travel
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex space-x-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 border border-stone-300 rounded-xl text-stone-700 font-bold text-xs hover:bg-stone-100 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Cetak Voucher</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Selesai & Tutup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
