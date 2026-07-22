
import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-secondary focus:outline-none"
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

interface FaqProps {
  items?: FaqItemProps[];
}

const Faq: React.FC<FaqProps> = ({ items }) => {
  const defaultFaqData = [
    {
      question: "Bagaimana cara pendaftarannya?",
      answer: "Sangat mudah. Cukup klik tombol WhatsApp di halaman ini untuk terhubung dengan konsultan kami. Tim kami akan memandu Anda langkah demi langkah, mulai dari pemilihan paket hingga pengumpulan persyaratan administrasi, sehingga Anda bisa fokus pada persiapan hati."
    },
    {
      question: "Apakah harga sudah termasuk semua biaya?",
      answer: "Betul, harga yang tertera adalah paket lengkap (all-in) yang mencakup tiket pesawat PP, izin umroh, akomodasi hotel bintang 5, makan sahur & iftar, transportasi bus AC, mutowwif/pembimbing, dan asuransi perjalanan. Anda hanya perlu menyiapkan untuk pengeluaran pribadi seperti oleh-oleh."
    },
    {
        question: "Apa saja persyaratan administrasi yang diperlukan?",
        answer: "Persyaratan utama sangat standar: Identitas perjalanan internasional yang masih berlaku minimal 7 bulan, KTP, Kartu Keluarga, buku nikah (bagi suami istri), dan pas foto. Tidak perlu khawatir, tim kami akan memberikan checklist lengkap dan membantu Anda di setiap tahapannya."
    },
    {
        question: "Seberapa jauh lokasi hotel dari Masjidil Haram dan Nabawi?",
        answer: "Kami memahami pentingnya kemudahan akses untuk beribadah. Karena itu, kami hanya memilih hotel bintang 5 yang berlokasi di ring 1, hanya beberapa langkah dari pelataran masjid. Ini memastikan Anda bisa shalat 5 waktu berjamaah tanpa terburu-buru dan kelelahan."
    },
    {
      question: "Kapan waktu terbaik untuk umroh di bulan Ramadhan?",
      answer: "Setiap waktu di bulan Ramadhan itu istimewa. Awal Ramadhan menawarkan suasana yang lebih tenang untuk adaptasi. Pertengahan Ramadhan memiliki keutamaan ampunan. Sementara 10 malam terakhir adalah puncaknya, di mana Anda berkesempatan meraih malam Lailatul Qadar. Pilihlah yang paling sesuai dengan panggilan hati Anda."
    },
    {
      question: "Berapa perkiraan uang saku yang ideal untuk dibawa?",
      answer: "Karena semua kebutuhan dasar sudah kami tanggung, uang saku bersifat sangat personal. Umumnya, jamaah menyiapkan sekitar 3-5 juta Rupiah untuk membeli oleh-oleh, kuliner khas, atau kebutuhan tak terduga. Namun, Anda bisa membawa lebih atau kurang sesuai kenyamanan."
    },
    {
      question: "Apakah ada manasik dan bimbingan sebelum berangkat?",
      answer: "Tentu. Kami mengadakan manasik umroh yang komprehensif beberapa pekan sebelum berangkat. Tujuannya agar Anda tidak hanya siap secara fisik, tetapi juga mantap secara ilmu dan spiritual, sehingga ibadah umroh Anda lebih khusyuk dan bermakna."
    }
  ];

  const displayFaqData = items || defaultFaqData;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-secondary">Pertanyaan yang Sering Diajukan (FAQ)</h2>
        </div>
        <div>
          {displayFaqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
