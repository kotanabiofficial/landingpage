import React, { useState } from 'react';

type Package = {
  name: string;
  price_start: number;
  currency: string;
  slug: string;
};

export default function SavingsCalculator({ packages }: { packages: Package[] }) {
  // Form State
  const [selectedSlug, setSelectedSlug] = useState<string>(packages.length > 0 ? packages[0].slug : '');
  const [duration, setDuration] = useState<number>(12);

  // Result State (only updates when 'Hitung' is clicked)
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [calculatedSlug, setCalculatedSlug] = useState<string>('');
  const [calculatedDuration, setCalculatedDuration] = useState<number>(0);

  const durations = [6, 12, 24, 36];
  
  // Package to display on the result card (live update for name/price, but savings wait for hitung)
  const displayPackage = packages.find(p => p.slug === (hasCalculated ? calculatedSlug : selectedSlug));

  const formatRupiah = (number: number) => {
    if (number === 0) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const calculateSavings = () => {
    if (!hasCalculated || !displayPackage) return { monthly: 0, weekly: 0, daily: 0 };
    
    const price = displayPackage.price_start;
    const monthly = price / calculatedDuration;
    const weekly = price / (calculatedDuration * 4.33); // approx 4.33 weeks per month
    const daily = price / (calculatedDuration * 30); // approx 30 days per month
    return { monthly, weekly, daily };
  };

  const savings = calculateSavings();
  
  // What duration to show in the sentence "Besar tabungan dengan jangka waktu X bulan..."
  const displayDuration = hasCalculated ? calculatedDuration : duration;

  const handleCalculate = () => {
    setCalculatedSlug(selectedSlug);
    setCalculatedDuration(duration);
    setHasCalculated(true);
    
    const resultsEl = document.getElementById('simulation-results');
    if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Form Panel */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-serif text-gray-900 mb-2">Simulasi Tabungan Umroh</h2>
            <p className="text-sm text-gray-600">Hitung dan rencanakan estimasi tabungan umroh di setiap periodenya.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paket Umroh</label>
              <select 
                value={selectedSlug}
                onChange={(e) => {
                  setSelectedSlug(e.target.value);
                  setHasCalculated(false); // Reset calculation when form changes
                }}
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {packages.map(pkg => (
                  <option key={pkg.slug} value={pkg.slug}>{pkg.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jangka Waktu</label>
              <div className="grid grid-cols-2 gap-3">
                {durations.map(d => (
                  <label 
                    key={d} 
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${duration === d ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <input 
                      type="radio" 
                      name="duration" 
                      value={d} 
                      checked={duration === d} 
                      onChange={() => {
                        setDuration(d);
                        setHasCalculated(false); // Reset calculation when form changes
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <svg className={`w-5 h-5 mr-2 ${duration === d ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">{d} Bulan</span>
                      </div>
                      {duration === d && (
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button 
              className="w-full bg-primary hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-colors"
              onClick={handleCalculate}
            >
              Hitung
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div id="simulation-results" className="w-full lg:w-2/3 bg-accent/40 rounded-2xl p-6 lg:p-10 shadow-sm relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/30 rounded-full opacity-40 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">ESTIMASI TABUNGAN UMROH</h3>
              <div className="text-right hidden sm:block">
                <span className="text-secondary font-bold font-serif text-lg block">KotaNabi</span>
              </div>
            </div>

            {displayPackage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-primary/20">
                <div>
                  <h4 className="text-xl font-serif font-semibold text-gray-800 mb-2 truncate" title={displayPackage.name}>{displayPackage.name}</h4>
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-3">
                    {formatRupiah(displayPackage.price_start)}
                  </div>
                  <p className="text-gray-600 text-sm">Paket umroh fasilitas lengkap dari KotaNabi</p>
                </div>
                <div className="md:text-right">
                  <p className="text-gray-600 mb-1">Mulai dari</p>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {hasCalculated ? formatRupiah(savings.daily) : '-'}
                  </div>
                  <p className="text-gray-600 text-sm">per Hari</p>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="flex-1 w-full">
                <p className="text-gray-800 font-medium mb-6">
                  Besar tabungan dengan jangka waktu <span className="font-bold">{displayDuration} bulan</span> berdasarkan periode.
                </p>
                <div className="space-y-4 max-w-md">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bulan</span>
                    <span className={`font-bold text-lg ${hasCalculated ? 'text-secondary' : 'text-gray-400'}`}>
                      {hasCalculated ? formatRupiah(savings.monthly) : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Minggu</span>
                    <span className={`font-bold text-lg ${hasCalculated ? 'text-secondary' : 'text-gray-400'}`}>
                      {hasCalculated ? formatRupiah(savings.weekly) : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hari</span>
                    <span className={`font-bold text-lg ${hasCalculated ? 'text-secondary' : 'text-gray-400'}`}>
                      {hasCalculated ? formatRupiah(savings.daily) : '-'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <a 
                  href="https://api.whatsapp.com/send?phone=628561500883&text=Halo%20KotaNabi,%20saya%20tertarik%20dengan%20program%20Tabungan%20Umroh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-auto text-center bg-white text-primary font-bold py-3 px-8 rounded-full border border-primary shadow-lg hover:bg-gray-50 transition-colors"
                >
                  Konsultasi Gratis
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
