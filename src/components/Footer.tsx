
import React from 'react';
import { siteConfig } from '../data/config';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <img 
            src="/assets/logo-kotanabi-umroh-online-terpercaya.webp" 
            alt="KotaNabi Logo" 
            className="h-12 mb-4 mx-auto md:mx-0" 
          />
          <p className="text-gray-400 break-words">
            {siteConfig.companyName}<br />
            {siteConfig.address}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif text-white mb-4">Hubungi Kami</h3>
          <ul className="space-y-2">
            <li><a href={`tel:${siteConfig.phone.whatsapp}`} className="hover:text-primary">Telp: {siteConfig.phone.display}</a></li>
            <li><a href={`https://wa.me/${siteConfig.phone.whatsapp}`} className="ctawa hover:text-primary">WhatsApp: {siteConfig.phone.display}</a></li>
            <li><a href={`mailto:${siteConfig.email}`} className="hover:text-primary">Email: {siteConfig.email}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif text-white mb-4">Ikuti Kami</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href={siteConfig.social.facebook} className="text-gray-400 hover:text-primary transition duration-300">Facebook</a>
            <a href={siteConfig.social.instagram} className="text-gray-400 hover:text-primary transition duration-300">Instagram</a>
            <a href={siteConfig.social.tiktok} className="text-gray-400 hover:text-primary transition duration-300">TikTok</a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
