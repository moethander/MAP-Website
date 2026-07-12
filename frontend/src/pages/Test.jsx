// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Test = () => {
//   const [terms, setTerms] = useState("");
//   const [testLink, setTestLink] = useState("");

//   useEffect(() => {
//     fetchPlacementTest();
//   }, []);

//   const fetchPlacementTest = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/api/placement-test"
//       );

//       if (res.data) {
//         setTerms(res.data.terms || "");
//         setTestLink(res.data.testLink || "");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleStartTest = () => {
//     if (!testLink) {
//       alert("Test link not found!");
//       return;
//     }

//     window.open(testLink, "_blank");
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">

//       {/* Title */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">
//           PLACEMENT TEST
//         </h1>

//         <div className="w-24 h-1 bg-blue-700 mx-auto mt-3"></div>
//       </div>

//       {/* Image */}
//       <div className="flex justify-center mb-8">
//         <img
//           src="https://tse3.mm.bing.net/th/id/OIP.jzBWnZy68MPehX8Uu3b0TwHaE8?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3"
//           alt="Placement Test"
//           className="w-full max-w-3xl rounded-lg shadow"
//         />
//       </div>

//       {/* Terms */}
//       <div className="bg-white shadow rounded-lg p-8">

//         <h2 className="text-2xl font-bold mb-6">
//           TERMS AND CONDITIONS
//         </h2>

//         <div className="whitespace-pre-line font-semibold text-gray-700 leading-8">
//           {terms}
//         </div>

//       </div>

//       {/* Bottom Section */}
//       <div className="flex flex-col md:flex-row items-center justify-between mt-16 gap-10">

//         <h2 className="text-4xl font-bold italic underline text-blue-700">
//           Wanna take the test?
//         </h2>

//         <div className="text-8xl text-yellow-300">
//           ➜
//         </div>

//         <button
//           onClick={handleStartTest}
//           className="bg-blue-900 hover:bg-blue-700 text-white px-12 py-4 rounded-md text-xl shadow"
//         >
//           Placement Test
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Test;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [terms, setTerms] = useState("");
  const [testLink, setTestLink] = useState("");

  useEffect(() => {
    fetchPlacementTest();
  }, []);

  const fetchPlacementTest = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/placement-test"
      );

      if (res.data) {
        setTerms(res.data.terms || "");
        setTestLink(res.data.testLink || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartTest = () => {
    if (!testLink) {
      alert("Placement Test Link Not Found!");
      return;
    }

    window.open(testLink, "_blank");
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Banner */}

      <section className="relative h-[350px]">

        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600"
          alt="Placement Test"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">

          <div className="text-center text-white">

            <h1 className="text-5xl md:text-6xl font-bold">
              Placement Test
            </h1>

            <p className="mt-4 text-lg">
              Test your knowledge and begin your learning journey.
            </p>

          </div>

        </div>

      </section>

      <div className="max-w-6xl mx-auto px-5 py-16">

        {/* Terms Card */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            📋 Terms & Conditions
          </h2>

          <div className="whitespace-pre-line text-gray-700 leading-8">
            {terms}
          </div>

        </div>

        {/* Ready Section */}

        <div className="mt-16 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-3xl shadow-xl p-12 text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Take the Test?
          </h2>

          <p className="text-white mt-4 text-lg max-w-2xl mx-auto">
            Please read all the terms carefully before starting the placement
            test. Once you're ready, click the button below.
          </p>

          <button
            onClick={handleStartTest}
            className="mt-10 bg-white text-blue-700 hover:bg-blue-100 px-10 py-4 rounded-full text-xl font-bold shadow-lg transition duration-300 hover:scale-105"
          >
            🚀 Start Placement Test
          </button>

        </div>

      </div>

    </div>
  );
};

export default Test;