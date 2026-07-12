import React from 'react';

const TimeTable = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">TIME-TABLE</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-2"></div>
      </div>

      {/* Update */}
      <p className="text-red-500 font-semibold mb-8 text-lg">
        The updated time-table will be uploaded soon.
      </p>

      {/* Registration  */}
      {/* <div className="flex items-center gap-6">
        <p className="text-blue-700 font-medium underline">
          Happy to Join? Plz do registration here!
        </p>
        
        {/* arrow */}
        {/* <span className="text-4xl">➔</span> */}

        {/* Registration button */}
       {/* <a 
  href="https://docs.google.com/forms/d/e/1FAIpQLScJHj-Km8okrtKwK709BRiq_O9Kp7Wah4gPDhm1XDHe1Zes9g/viewform?usp=publish-editor"
  target="_blank" 
  rel="noopener noreferrer"
  style={{ 
    display: 'inline-block', 
    padding: '12px 24px', 
    backgroundColor: '#1e3a8a', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 9999
  }}
>
  Registration Form
</a> */}
      {/* </div> */}

    </div>
  );
};

export default TimeTable;