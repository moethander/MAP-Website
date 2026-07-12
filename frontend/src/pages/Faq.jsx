// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Faq = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [openIndex, setOpenIndex] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/faqs")
//       .then((res) => {
//         console.log("FAQs:", res.data);
//         setFaqs(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
    
//   <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
//     <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//       Frequently Asked Questions
//     </h2>

//     {faqs.map((faq, index) => (
//       <div
//         key={faq._id}
//         style={{
//           background: "#fff",
//           border: "1px solid #e5e5e5",
//           borderRadius: "12px",
//           padding: "15px",
//           marginBottom: "12px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//           transition: "0.3s",
//         }}
//       >
//         {/* Question */}
//         <div
//           onClick={() =>
//             setOpenIndex(openIndex === index ? null : index)
//           }
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             cursor: "pointer",
//             alignItems: "center",
//           }}
//         >
//           <h3 style={{ margin: 0, fontSize: "16px" }}>
//             {faq.question}
//           </h3>

//           <span style={{ fontSize: "18px" }}>
//             {openIndex === index ? "▲" : "▼"}
//           </span>
//         </div>

//         {/* Answer */}
//         {openIndex === index && (
//           <p
//             style={{
//               marginTop: "10px",
//               color: "#555",
//               lineHeight: "1.6",
//             }}
//           >
//             {faq.answer}
//           </p>
//         )}
//       </div>
//     ))}
//   </div>
// );

// };

// export default Faq;

import axios from "axios";
import React, { useEffect, useState } from "react";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/faqs")
      .then((res) => {
        setFaqs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-5">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-600 mt-3">
            Find answers to the questions that are most commonly asked.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl"
            >
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h2>

                <span
                  className={`text-2xl font-bold text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 border-t">
                  <p className="text-gray-600 leading-8 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {faqs.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No FAQs available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;