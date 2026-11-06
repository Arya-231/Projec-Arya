import React, { useState } from 'react';
import {
  HelpCircle,
  PhoneCall,
  MessageCircle,
  Mail,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Send,
  User,
  Bot,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { HelpTopic, ChatMessage } from '../types';
import { mockHelpTopics } from '../data/mockData';

interface BantuanLayananScreenProps {
  onBackToHome?: () => void;
}

export const BantuanLayananScreen: React.FC<BantuanLayananScreenProps> = ({ onBackToHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('help-1');

  // Live Chat State
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Assalamu\'alaikum Warahmatullah. Selamat datang di Sururi Care 24/7. Ada yang bisa kami bantu terkait tabungan umroh, katalog PPIU, atau autodebet syariah Anda hari ini?',
      time: 'Baru saja'
    }
  ]);

  const categories = ['Semua', 'Akad Syariah', 'Autodebet', 'Ekosistem PPIU', 'Open API SNAP BI', 'Top Up & Penarikan'];

  const filteredTopics = mockHelpTopics.filter((topic) => {
    const matchCategory = selectedCategory === 'Semua' || topic.category === selectedCategory;
    const matchQuery =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const newMsgUser: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: 'Sekarang'
    };

    setMessages((prev) => [...prev, newMsgUser]);
    setChatInput('');

    // Simulasi Jawaban Cerdas CS Syariah
    setTimeout(() => {
      let reply = 'Terima kasih atas pertanyaannya. Tim Layanan Sururi Care siap mendampingi perjalanan ibadah umroh Anda dengan prinsip syariah yang murni & transparan.';
      const lower = userText.toLowerCase();

      if (lower.includes('autodebet') || lower.includes('potong') || lower.includes('tanggal')) {
        reply = 'Fitur Autodebet Syariah Bank Sururi berjalan tiap tanggal pilihan Anda (misal tgl 25) tanpa biaya admin tersembunyi. Anda bisa mengatur atau menonaktifkannya di tab Simulasi kapan saja.';
      } else if (lower.includes('travel') || lower.includes('ppiu') || lower.includes('kemenag') || lower.includes('izin')) {
        reply = 'Seluruh travel di Bank Sururi berizin resmi PPIU Kemenag RI & terintegrasi SISKOPATUH. Dana Anda aman di Rekening Escrow Penampung terproteksi.';
      } else if (lower.includes('snap') || lower.includes('bayar') || lower.includes('lunas')) {
        reply = 'Pelunasan menggunakan Open API SNAP BI Bank Indonesia. Saat saldo tabungan umroh Anda mencukupi, sistem langsung menerbitkan E-Voucher digital & nomor registrasi resmi.';
      } else if (lower.includes('akad') || lower.includes('riba') || lower.includes('bunga')) {
        reply = 'Bank Sururi menggunakan Akad Wadiah Yad Dhamanah diawasi Dewan Pengawas Syariah (DPS) DSN-MUI. Bebas riba 100% dan bebas biaya bulanan.';
      } else if (lower.includes('top up') || lower.includes('setor') || lower.includes('saldo')) {
        reply = 'Anda dapat melakukan Top Up instan kapan saja melalui Virtual Account Bank Syariah (BSI, BCA Syariah, Mandiri) atau QRIS Syariah dari menu Beranda.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'agent',
          text: reply,
          time: 'Baru saja'
        }
      ]);
    }, 700);
  };

  return (
    <div className="pb-28 space-y-4">
      {/* Header Pusat Bantuan Zamrud & Emas */}
      <div className="bg-gradient-to-br from-[#062c1a] via-[#0a3d24] to-[#0f5132] text-white pt-6 pb-8 px-5 rounded-b-[32px] shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">Sururi Care 24/7</h2>
              <p className="text-[10px] text-amber-200/90 font-medium">Pusat Layanan & Bantuan Ibadah Syariah</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600/80 text-white border border-emerald-400/40 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>Online 24 Jam</span>
          </span>
        </div>

        {/* Search input */}
        <div className="relative z-10 mt-3">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari solusi: akad wadiah, autodebet, PPIU, SNAP BI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-stone-900 placeholder:text-stone-400 text-xs rounded-2xl pl-10 pr-4 py-2.5 shadow-md focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>
      </div>

      <div className="px-4 space-y-4 -mt-4 relative z-20">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Live Chat */}
          <button
            type="button"
            onClick={() => setIsLiveChatOpen(true)}
            className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-1.5 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-800">Live Chat</span>
            <span className="text-[9px] text-stone-400">CS Syariah 24/7</span>
          </button>

          {/* Call Center */}
          <a
            href="tel:1500770"
            className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all flex flex-col items-center text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-800">Call Center</span>
            <span className="text-[9px] text-stone-400">1500-770 Bebas Pulsa</span>
          </a>

          {/* WhatsApp Official */}
          <a
            href="https://wa.me/6281177019900"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-800">WhatsApp</span>
            <span className="text-[9px] text-stone-400">Resmi Terverifikasi</span>
          </a>
        </div>

        {/* Gerai Layanan Haji & Umroh */}
        <div className="bg-gradient-to-r from-emerald-50 to-amber-50/60 rounded-2xl p-3.5 border border-emerald-200/80 flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-amber-300" />
          </div>
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-stone-900">Gerai Layanan Khusus Haji & Umroh</h4>
            <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
              Kunjungi Lounge Bank Sururi di Gedung Menara Syariah Jakarta, Bandara Soekarno-Hatta Terminal 3 Internasional, dan Juanda Surabaya.
            </p>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div>
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 px-1">
            Kategori Pertanyaan Populer
          </h3>
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-900 text-amber-300 shadow-xs border border-emerald-700'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2.5">
          {filteredTopics.map((topic) => {
            const isExpanded = expandedTopicId === topic.id;
            return (
              <div
                key={topic.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                  className="w-full p-4 text-left flex items-center justify-between space-x-2"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                      {topic.category}
                    </span>
                    <h4 className="font-bold text-xs text-stone-900 leading-snug">{topic.title}</h4>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-500">
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-stone-100 text-xs text-stone-600 leading-relaxed bg-[#fbfdfb]">
                    {topic.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sharia Compliance Guarantee */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 text-stone-700 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Kepatuhan Regulasi & Perlindungan Konsumen</span>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            Bank Sururi diawasi oleh Otoritas Jasa Keuangan (OJK), Bank Indonesia, dan Dewan Pengawas Syariah (DPS) DSN-MUI. Simpanan nasabah dijamin oleh Lembaga Penjamin Simpanan (LPS) sesuai ketentuan yang berlaku.
          </p>
        </div>
      </div>

      {/* Modal Live Chat Interaktif */}
      {isLiveChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-900/10 overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
            {/* Header Chat */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Live Chat Sururi Care</h3>
                  <p className="text-[10px] text-amber-200/80">Ustadz Asisten & Customer Service Resmi</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLiveChatOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="bg-stone-50 px-3 py-2 border-b border-stone-200 flex space-x-1.5 overflow-x-auto scrollbar-none text-[10px]">
              {['Autodebet Umroh', 'Akad Wadiah', 'Izin PPIU Kemenag', 'SNAP BI Escrow', 'Cara Top Up'].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setChatInput(`Bagaimana penjelasan tentang ${q}?`);
                  }}
                  className="bg-white px-2 py-1 rounded-lg border border-stone-200 text-stone-700 whitespace-nowrap hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F9FA]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender !== 'user' && (
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-emerald-800 text-white rounded-br-none'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <span
                      className={`text-[9px] block mt-1 ${
                        m.sender === 'user' ? 'text-emerald-200 text-right' : 'text-stone-400'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex space-x-2">
              <input
                type="text"
                placeholder="Ketik pertanyaan seputar tabungan umroh..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="w-9 h-9 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
