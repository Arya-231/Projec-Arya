import React, { useState } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  Plane,
  Building,
  CheckCircle2,
  Users,
  ChevronRight,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { TravelPackage } from '../types';
import { formatRupiah } from '../utils/formatters';

interface KatalogTravelScreenProps {
  packages: TravelPackage[];
  userSaldo: number;
  onSelectPackageForBooking: (pkg: TravelPackage) => void;
}

export const KatalogTravelScreen: React.FC<KatalogTravelScreenProps> = ({
  packages,
  userSaldo,
  onSelectPackageForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePackageDetail, setActivePackageDetail] = useState<TravelPackage | null>(null);

  const categories = ['Semua', 'Reguler', 'VIP', 'Promo', 'Ramadhan'];

  const filteredPackages = packages.filter((pkg) => {
    const matchCategory = selectedCategory === 'Semua' || pkg.category === selectedCategory;
    const matchSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.makkahHotel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="pb-24 space-y-4">
      {/* Header Katalog */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white p-5 pt-7 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-1.5">
              <span>Ekosistem Travel PPIU</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-emerald-950 rounded-full">
                KEMENAG RI
              </span>
            </h2>
            <p className="text-xs text-amber-200/80">Mitra Resmi Berizin Penyelenggara Perjalanan Ibadah Umroh</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari biro travel, nama hotel, atau paket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-stone-900 placeholder:text-stone-400 text-xs rounded-2xl pl-10 pr-4 py-2.5 shadow-md focus:outline-hidden focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Category Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-900 text-amber-300 shadow-sm border border-emerald-700'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Warning / Guaranteed PPIU Banner */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3 flex items-start space-x-2.5 text-[11px] text-amber-950">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Garansi 5 Pasti Umroh Kemenag:</strong> Pasti Travelnya Berizin, Pasti Jadwalnya, Pasti Terbangnya, Pasti Hotelnya, dan Pasti Visanya. Pelunasan aman via Rekening Escrow Bank Sururi.
          </p>
        </div>

        {/* List of Travel Packages */}
        <div className="space-y-4">
          {filteredPackages.map((pkg) => {
            const isAffordable = userSaldo >= pkg.price;
            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* Image Banner & PPIU Badge */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={pkg.bannerImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Kemenag PPIU Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/50 text-[10px] text-amber-300 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.badge}</span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 right-3 bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-md font-black text-[10px] uppercase tracking-wider">
                    {pkg.category}
                  </div>

                  {/* License and Duration on image bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-emerald-100 text-[11px] drop-shadow-sm">
                      {pkg.ppiuLicense}
                    </span>
                    <span className="flex items-center space-x-1 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span>{pkg.durationDays} Hari</span>
                    </span>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase">{pkg.agencyName}</span>
                    <h3 className="text-base font-extrabold text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Hotel & Flight Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-2xl border border-stone-200/70">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 font-semibold text-stone-800">
                        <Building className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Makkah ({pkg.makkahHotelStars}★)</span>
                      </div>
                      <p className="text-[10px] text-stone-500 truncate">{pkg.makkahHotel}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 font-semibold text-stone-800">
                        <Building className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Madinah ({pkg.madinahHotelStars}★)</span>
                      </div>
                      <p className="text-[10px] text-stone-500 truncate">{pkg.madinahHotel}</p>
                    </div>

                    <div className="col-span-2 pt-1 border-t border-stone-200/70 flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-stone-700">
                        <Plane className="w-3 h-3 text-emerald-700" />
                        <span className="truncate">{pkg.airline}</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-medium">
                        Sisa Kuota: <strong className="text-emerald-800 font-bold">{pkg.quotaAvailable}</strong>/{pkg.quotaTotal} seat
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet */}
                  <div className="space-y-1">
                    {pkg.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-[11px] text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-medium">Biaya Paket All-In</span>
                      <span className="text-base font-black text-emerald-900 tracking-tight">
                        {formatRupiah(pkg.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPackageForBooking(pkg)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5 ${
                        isAffordable
                          ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-emerald-900/20 active:scale-95'
                          : 'bg-emerald-950 text-amber-300 hover:bg-black active:scale-95'
                      }`}
                    >
                      <span>Detail & Booking via SNAP</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
