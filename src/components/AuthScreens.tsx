import React, { useState } from 'react';
import {
  Lock,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  HelpCircle,
  AlertCircle,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { UserSavingsProfile } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthScreensProps {
  onLoginSuccess: (user: UserSavingsProfile) => void;
  onOpenHelp: () => void;
  allUsers: UserSavingsProfile[];
  onAddNewUser: (newUser: UserSavingsProfile) => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  onLoginSuccess,
  onOpenHelp,
  allUsers,
  onAddNewUser,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot_password'>('login');

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('081234567890');
  const [loginPin, setLoginPin] = useState('123456');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regNik, setRegNik] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regTarget, setRegTarget] = useState(30000000);
  const [regOtp, setRegOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [regError, setRegError] = useState('');

  // Forgot Password States
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPin, setForgotNewPin] = useState('');
  const [isForgotOtpSent, setIsForgotOtpSent] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Quick Account Login Handler
  const handleQuickSelect = (u: UserSavingsProfile) => {
    setLoginIdentifier(u.phone);
    setLoginPin(u.pin);
    setLoginError('');
  };

  const handleExecuteLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');

    const matchedUser = allUsers.find(
      (u) =>
        (u.phone === loginIdentifier ||
          u.email.toLowerCase() === loginIdentifier.toLowerCase() ||
          u.nik === loginIdentifier) &&
        u.pin === loginPin
    );

    if (matchedUser) {
      onLoginSuccess(matchedUser);
    } else {
      setLoginError('Nomor HP / Email / NIK atau PIN salah. Silakan coba data dummy di bawah.');
    }
  };

  // Register Handler
  const handleSendRegisterOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || regNik.length < 16 || !regPhone.trim() || regPin.length < 6) {
      setRegError('Lengkapi Nama, NIK (16 digit), No HP WhatsApp, dan PIN (6 digit).');
      return;
    }

    setIsOtpSent(true);
  };

  const handleConfirmRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regOtp !== '7701' && regOtp !== '1234') {
      setRegError('Kode OTP salah! Gunakan kode dummy: 7701');
      return;
    }

    // Generate Nomor Rekening Syariah Baru
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAccountNo = `7701 8892 ${randomSuffix}`;

    const newUser: UserSavingsProfile = {
      id: `usr-${Date.now()}`,
      name: regName,
      phone: regPhone,
      email: regEmail || `${regName.toLowerCase().replace(/\s+/g, '.')}@sururi.id`,
      accountNumber: newAccountNo,
      isKycVerified: true,
      nik: regNik,
      pin: regPin,
      saldoUtama: 0,
      targetTabungan: regTarget,
      targetDurasiBulan: 12,
      autodebetAktif: true,
      autodebetNominalPerBulan: Math.ceil(regTarget / 12),
      tanggalAutodebet: 25,
      rekeningSumber: `Tabungan Wadiah Utama - ${newAccountNo}`,
      akad: 'Wadiah Yad Dhamanah (Aman & Sesuai Fatwa DSN-MUI)',
      targetBulanSelesai: 'November 2027',
    };

    onAddNewUser(newUser);
    onLoginSuccess(newUser);
  };

  // Forgot Password Handler
  const handleSendForgotOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotIdentifier.trim()) {
      setForgotError('Masukkan nomor HP atau Email terdaftar.');
      return;
    }

    const matched = allUsers.find(
      (u) =>
        u.phone === forgotIdentifier ||
        u.email.toLowerCase() === forgotIdentifier.toLowerCase()
    );

    if (!matched) {
      setForgotError('Akun dengan Nomor HP / Email tersebut tidak ditemukan di data dummy.');
      return;
    }

    setIsForgotOtpSent(true);
  };

  const handleResetPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotOtp !== '7701' && forgotOtp !== '1234') {
      setForgotError('Kode OTP verifikasi salah! Gunakan kode dummy: 7701');
      return;
    }
    if (forgotNewPin.length < 6) {
      setForgotError('PIN baru harus 6 digit angka.');
      return;
    }

    // Update PIN in users
    const matched = allUsers.find(
      (u) =>
        u.phone === forgotIdentifier ||
        u.email.toLowerCase() === forgotIdentifier.toLowerCase()
    );

    if (matched) {
      matched.pin = forgotNewPin;
      setForgotSuccess('Alhamdulillah! PIN berhasil direset. Silakan login kembali dengan PIN baru Anda.');
      setTimeout(() => {
        setAuthMode('login');
        setLoginIdentifier(matched.phone);
        setLoginPin(forgotNewPin);
        setForgotSuccess('');
        setIsForgotOtpSent(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-[#F8F9FA] text-stone-800">
      {/* Header Banner Islami */}
      <div className="bg-gradient-to-br from-[#062c1a] via-[#0a3d24] to-[#0f5132] text-white pt-8 pb-10 px-6 rounded-b-[36px] shadow-lg relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] text-[#0A3D24] flex items-center justify-center font-black text-2xl shadow-xl border-2 border-amber-200 mb-2.5">
            <span className="font-arabic font-bold text-3xl">س</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <h1 className="font-black text-lg tracking-wider text-white">BANK SURURI</h1>
            <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 bg-[#D4AF37] text-[#0A3D24] rounded-sm">
              SYARIAH
            </span>
          </div>
          <p className="text-xs text-amber-200/90 font-medium mt-0.5">
            Bank Digital Tabungan Umroh & Ekosistem PPIU
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="px-5 -mt-6 relative z-20 flex-1">
        {/* ================================================================ */}
        {/* VIEW 1: LOGIN (MASUK) */}
        {/* ================================================================ */}
        {authMode === 'login' && (
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-stone-200/80 space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-base font-extrabold text-stone-900">Masuk ke Rekening Umroh</h2>
              <p className="text-xs text-stone-500">Gunakan Nomor HP / Email & PIN 6 Digit Anda</p>
            </div>

            {loginError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleExecuteLogin} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Nomor HP / Email Terdaftar
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Contoh: 081234567890"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:outline-hidden focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-stone-700">PIN Syariah (6 Digit)</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot_password')}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
                  >
                    Lupa PIN?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    maxLength={6}
                    placeholder="Masukkan 6 Digit PIN"
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold tracking-widest text-stone-900 focus:outline-hidden focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Switch Dummy Accounts */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">
                Pilih Akun Uji Coba Cepat (Data Dummy):
              </span>
              <div className="space-y-1.5">
                {allUsers.map((u) => {
                  const isCurrent = loginIdentifier === u.phone;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickSelect(u)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px] font-bold">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 leading-tight">{u.name}</p>
                          <p className="text-[10px] text-stone-500">Saldo: Rp {u.saldoUtama.toLocaleString('id-ID')} • PIN: {u.pin}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400/20 text-amber-900 rounded">
                        Pilih
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Link to Register */}
            <div className="pt-2 text-center text-xs text-stone-600 border-t border-stone-100">
              Belum memiliki rekening umroh?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="font-bold text-emerald-800 hover:underline"
              >
                Daftar Rekening Baru
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* VIEW 2: PENDAFTARAN AKUN (REGISTER) */}
        {/* ================================================================ */}
        {authMode === 'register' && (
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-stone-200/80 space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Pendaftaran Digital Syariah
              </span>
              <h2 className="text-base font-extrabold text-stone-900">Buka Tabungan Umroh Sururi</h2>
              <p className="text-xs text-stone-500">Akad Wadiah Yad Dhamanah • Tanpa Biaya Bulanan</p>
            </div>

            {regError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{regError}</span>
              </div>
            )}

            {!isOtpSent ? (
              <form onSubmit={handleSendRegisterOtp} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Nama Lengkap Jamaah</label>
                  <input
                    type="text"
                    placeholder="Sesuai KTP / Paspor"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-700"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">NIK KTP (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="3273xxxxxxxxxxxx"
                    value={regNik}
                    onChange={(e) => setRegNik(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-semibold focus:outline-hidden focus:border-emerald-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">No. WhatsApp</label>
                    <input
                      type="text"
                      placeholder="08xxxxxxxxxx"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Buat PIN (6 Digit)</label>
                    <input
                      type="password"
                      maxLength={6}
                      placeholder="6 angka rahasia"
                      value={regPin}
                      onChange={(e) => setRegPin(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold focus:outline-hidden focus:border-emerald-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Target Biaya Umroh Awal</label>
                  <select
                    value={regTarget}
                    onChange={(e) => setRegTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-700"
                  >
                    <option value={24900000}>Rp 24.900.000 (Paket Milad Promo)</option>
                    <option value={28500000}>Rp 28.500.000 (Paket Barakah 9 Hari Reguler)</option>
                    <option value={36500000}>Rp 36.500.000 (Paket Royal VIP 12 Hari)</option>
                    <option value={44000000}>Rp 44.000.000 (Paket I'tikaf Ramadhan)</option>
                  </select>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-950 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p>
                    Setuju dengan Akad Wadiah Yad Dhamanah: Titipan aman tanpa riba & dijamin LPS.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Lanjut Verifikasi OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleConfirmRegister} className="space-y-4">
                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Simulasi Kode OTP WhatsApp Terkirim</span>
                  </p>
                  <p className="text-[11px] text-stone-600">
                    Kami telah mengirim kode 4 digit ke nomor WhatsApp <strong className="text-stone-900">{regPhone}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRegOtp('7701')}
                    className="mt-1 text-[11px] font-extrabold text-emerald-800 underline block"
                  >
                    Klik di sini: Gunakan Kode OTP Dummy [ 7701 ]
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Masukkan Kode OTP
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Contoh: 7701"
                    value={regOtp}
                    onChange={(e) => setRegOtp(e.target.value)}
                    className="w-full text-center tracking-[0.5em] text-lg font-black py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:border-emerald-700"
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="flex-1 py-2.5 border border-stone-300 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-100"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Aktifkan Rekening
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-center text-xs text-stone-600 border-t border-stone-100">
              Sudah memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-bold text-emerald-800 hover:underline"
              >
                Masuk di Sini
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* VIEW 3: LUPA PASSWORD / PIN */}
        {/* ================================================================ */}
        {authMode === 'forgot_password' && (
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-stone-200/80 space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-base font-extrabold text-stone-900">Reset PIN Syariah</h2>
              <p className="text-xs text-stone-500">Pemulihan Keamanan Rekening Tabungan Umroh</p>
            </div>

            {forgotError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl text-xs flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {!isForgotOtpSent ? (
              <form onSubmit={handleSendForgotOtp} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Nomor HP / Email Terdaftar
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 081234567890"
                    value={forgotIdentifier}
                    onChange={(e) => setForgotIdentifier(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-700"
                    required
                  />
                  <span className="text-[10px] text-stone-400 block mt-1">
                    Coba masukkan HP dummy: 081234567890 (Ahmad Fauzi)
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Kirim Kode OTP Reset</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPin} className="space-y-3.5">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                  <p className="font-bold">Kode OTP Pemulihan Terkirim</p>
                  <button
                    type="button"
                    onClick={() => setForgotOtp('7701')}
                    className="text-emerald-800 font-extrabold underline block"
                  >
                    Gunakan Kode Dummy: [ 7701 ]
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Kode OTP</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="7701"
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    className="w-full text-center font-bold tracking-widest py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">PIN Baru (6 Digit)</label>
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="PIN 6 Digit Baru"
                    value={forgotNewPin}
                    onChange={(e) => setForgotNewPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full py-2 px-3 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold"
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotOtpSent(false)}
                    className="flex-1 py-2.5 border border-stone-300 text-stone-700 font-bold text-xs rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Simpan PIN Baru
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-center text-xs text-stone-600 border-t border-stone-100">
              Ingat PIN Anda?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-bold text-emerald-800 hover:underline"
              >
                Kembali ke Login
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Bantuan Layanan */}
      <div className="p-4 text-center">
        <button
          type="button"
          onClick={onOpenHelp}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-emerald-800 shadow-xs hover:bg-emerald-50 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Butuh Bantuan? Hubungi Sururi Care 24/7</span>
        </button>
      </div>
    </div>
  );
};
