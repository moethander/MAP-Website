import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa'; 

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false); // နှိပ်မှ ပွင့်အောင် State ထားမယ်

  return (
    <div className="border-b border-gray-300 py-4">
      {/* ဒီခေါင်းစဉ်က ဘယ်တော့မှ ပျောက်မသွားပါဘူး */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-xl font-semibold text-gray-800"
      >
        {title} 
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* isOpen ဖြစ်မှသာ အောက်က children (စာသား) ပေါ်လာမယ် */}
      {isOpen && (
        <div className="mt-4 text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

const Fourskills = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">M-A-P Adult English Classes</h1>
      
      {/* Elementary Four Skills Class */}
      <AccordionItem title="Elementary Four Skills Class">
        <div className="space-y-3 text-gray-700">
          <p className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600" /> <strong>Days:</strong> Sat / Sun
          </p>
          <p className="flex items-center gap-3">
            <FaClock className="text-blue-600" /> <strong>Time:</strong> 8:00 AM - 11:00 AM
          </p>
          <p className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-600" /> <strong>Fees:</strong> 240,000 MMK (3 Months)
          </p>
        </div>
      </AccordionItem>
</div>
  )
}

export default Fourskills;