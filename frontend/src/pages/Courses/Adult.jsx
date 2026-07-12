
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

// အဓိက Page မှာ ခေါ်သုံးနည်း
const Adult = () => {

    const classes = [
    { id: 1, title: 'Elementary Four Skills Class', days: 'Sat/Sun', time: '8:00 AM - 11:00 AM', fee: '240,000 MMK(3 Months)' },
    { id: 2, title: 'Speaking Level 1', days: 'Sat/Sun', time: '11:30 AM - 3:30 PM', fee: '240,000 MMK(3 Months)' },
    { id: 3, title: 'Basic Communicative Grammar', days: 'Mon /Tues /Weds /Thurs', time: '7:30 AM - 9:00 AM', fee: '240,000 MMK(3 Months)' },
    { id: 4, title: 'Pre-Intermediate', days: 'Mon /Tues /Weds /Thurs', time: '10:00 AM - 11:30 AM', fee: '260,000 MMK(3 Months)' },
    { id: 5, title: 'Intermediate', days: 'Mon /Tues /Weds /Thurs', time: '2:30 PM - 4:00 PM', fee: '280,000 MMK (3 Months)'},
    { id: 6, title: 'IELTS', days: 'Mon /Tues /Weds /Thurs', time: '2:30 PM - 4:00 PM', fee: '335,000 MMK(3 Months)' },
    { id: 7, title: 'Speaking Level 1', days: 'Mon /Tues /Weds /Thurs', time: '4:30 PM - 6:00 PM', fee: '240,000 (3 Months)' },
];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">M-A-P Adult English Classes</h1>
      
      {classes.map((item) => (
        <AccordionItem key={item.id} title={item.title}>
          <div className="space-y-2">
            <p className="flex items-center gap-2"><FaCalendarAlt /> {item.days}</p>
            <p className="flex items-center gap-2"><FaClock /> {item.time}</p>
            <p className="flex items-center gap-2"><FaMoneyBillWave /> {item.fee}</p>
            {/* <p className="text-red-500 font-bold mt-2">Discount: {item.discount}</p> */}
          </div>
        </AccordionItem>
      ))}

      
    </div>
  );
};

export default Adult;