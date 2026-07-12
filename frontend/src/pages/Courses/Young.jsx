
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
const Young = () => {

    const classes = [
    { id: 1, title: 'Starter', days: 'Sat/Sun', time: '10:00 AM - 12:00 PM', fee: '250,000 MMK(3 Months)' , discount: { old : '15%', new: '10%' } },
    { id: 2, title: 'Level 1', days: 'Sat/Sun', time: '10:00 AM - 12:00 PM', fee: '250,000 MMK(3 Months)', discount: { old : '15%', new: '10%' } },
    { id: 3, title: 'Level 2', days: 'Sat/Sun', time: '12:30 PM - 2:30 PM', fee: '250,000 MMK(3 Months)', discount: { old : '15%', new: '10%' } },
    { id: 4, title: 'Level 3', days: 'Sat/Sun', time: '12:30 PM - 2:30 PM', fee: '250,000 MMK(3 Months)', discount: { old : '15%', new: '10%' } },
    { id: 5, title: 'Level 4', days: 'Sat/Sun', time: '3:00 PM - 5:00 PM', fee: '250,000 MMK(3 Months)', discount: { old : '15%', new: '10%' }},
    { id: 6, title: 'Level 5', days: 'Sat/Sun', time: '3:00 PM - 5:00 PM', fee: '250,000 MMK(3 Months)', discount: { old : '15%', new: '10%' } },
    { id: 7, title: 'Level 6', days: 'Sat/Sun', time: '3:00 PM - 5:00 PM', fee: '250,000 MMK(3 Months)' , discount: { old : '15%', new: '10%' }},
    { id: 8, title: 'Level 7', days: 'Sat/Sun', time: '3:00 PM - 5:00 PM', fee: '250,000 MMK(3 Months)' , discount: { old : '15%', new: '10%' }},
    { id: 7, title: 'Grammar-1', days: 'Sat/Sun', time: '8:00 AM - 10:00 AM', fee: '250,000 MMK(3 Months)' , discount: { old : '15%', new: '10%' }},
    { id: 8, title: 'Grammar-2', days: 'Sat/Sun', time: '8:00 AM - 10:00 AM', fee: '250,000 MMK(3 Months)' , discount: { old : '15%', new: '10%' }},
];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">M-A-P YLE Regular Classes </h1>
      
      {classes.map((item) => (
        <AccordionItem key={item.id} title={item.title}>
          <div className="space-y-2">
            <p className="flex items-center gap-2"><FaCalendarAlt /> {item.days}</p>
            <p className="flex items-center gap-2"><FaClock /> {item.time}</p>
            <p className="flex items-center gap-2"><FaMoneyBillWave /> {item.fee}</p>
           
            <p className="text-red-500 font-bold mt-2">
             Early Bird Discount: Old Students {item.discount.old}, New Students {item.discount.new}
            </p>
          </div>
        </AccordionItem>
      ))}

      
    </div>
  );
};

export default Young;