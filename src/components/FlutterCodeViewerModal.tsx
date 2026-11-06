import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import { FLUTTER_MAIN_DART_CODE } from '../flutter_code';

interface FlutterCodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeViewerModal: React.FC<FlutterCodeViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'guide'>('code');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(FLUTTER_MAIN_DART_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([FLUTTER_MAIN_DART_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'main.dart';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-emerald-500/20 overflow-hidden flex flex-col h-[90vh] text-stone-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 p-4 border-b border-emerald-800/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white">Kode Lengkap Flutter Bank Sururi (main.dart)</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-400/20 border border-amber-400/50 text-amber-300 rounded-full">
                  100% Siap Dijalankan
                </span>
              </div>
              <p className="text-xs text-stone-400">Single-file Flutter Material 3 • Tanpa Dependensi External Rumit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar & Tabs */}
        <div className="bg-stone-950 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex space-x-1 bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'code' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Kode Dart (main.dart)
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'guide' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Panduan Menjalankan di Android/VS Code
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                copied
                  ? 'bg-amber-400 text-emerald-950 font-black shadow-md'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Kode Flutter'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download main.dart</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed bg-stone-950">
          {activeTab === 'code' ? (
            <div className="relative">
              <pre className="text-emerald-300 font-mono text-xs whitespace-pre select-all selection:bg-emerald-700 selection:text-white">
                {FLUTTER_MAIN_DART_CODE}
              </pre>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6 font-sans text-stone-300 py-4">
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-amber-300 font-bold mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">Langkah Cepat Menjalankan di Komputer / Laptop Lokal</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Kode ini dirancang mandiri (zero external package dependencies) sehingga Anda tidak perlu mengedit <code className="text-amber-300 bg-stone-900 px-1 py-0.5 rounded">pubspec.yaml</code>. Cukup letakkan kode di <code className="text-amber-300 bg-stone-900 px-1 py-0.5 rounded">lib/main.dart</code> dan langsung jalankan!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">Buat Proyek Flutter Baru</h4>
                    <p className="text-xs text-stone-400 mt-1">Buka Terminal / Command Prompt dan ketik:</p>
                    <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 font-mono text-xs text-emerald-400 mt-2">
                      flutter create bank_sururi<br />
                      cd bank_sururi
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">Ganti File lib/main.dart</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Buka folder proyek di VS Code atau Android Studio. Hapus seluruh isi file <code className="text-amber-300">lib/main.dart</code> dan tempel (paste) kode Flutter dari tombol <b>"Salin Kode Flutter"</b> di atas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">Jalankan Aplikasi di Emulator atau HP Android</h4>
                    <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 font-mono text-xs text-emerald-400 mt-2">
                      flutter run
                    </div>
                    <p className="text-xs text-stone-400 mt-1.5">
                      Aplikasi akan langsung berjalan mulus di Android, iOS, maupun Chrome Web!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-900 rounded-2xl p-4 border border-stone-800 text-xs text-stone-400 space-y-2">
                <span className="font-bold text-stone-200 block">Fitur yang sudah terimplementasi di Flutter:</span>
                <ul className="list-disc pl-5 space-y-1 text-stone-300">
                  <li>Dashboard Tabungan Umroh dengan Circular/Linear Goal Tracker</li>
                  <li>Katalog Travel PPIU Kemenag dengan Badge Resmi & filter kategori</li>
                  <li>Simulasi Autodebet interaktif dengan slider biaya & durasi</li>
                  <li>Alur e-KYC (KTP & Face Biometrics) dan SNAP BI Payment</li>
                  <li>Penerbitan E-Voucher Booking SISKOPATUH dengan QR Code</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>File size: ~32 KB • 950+ baris Flutter Dart</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
          >
            <span>{copied ? 'Tersalin!' : 'Klik untuk Salin Kode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
