// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Contact = () => {

//   const [contact, setContact] = useState({});

//   const fetchContact = async () => {
//     try {

//       const res = await axios.get(
//         "http://localhost:4000/api/contact"
//       );

//       setContact(res.data);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchContact();
//   }, []);

//     return (
//     <div>

//       {/* Banner */}

//       <img
//         src={`http://localhost:4000/${contact.banner}`}
//         className="w-full h-[350px] object-cover"
//         alt=""
//       />

//       <div className="max-w-6xl mx-auto py-12">

//         <h1 className="text-4xl font-bold text-center mb-10">
//           CONTACT US
//         </h1>

//         <div className="grid md:grid-cols-2 gap-10">

//           {/* Address */}

//           <div>

//             <h2 className="text-2xl font-bold mb-5">
//               Address
//             </h2>

//             <p>
//               {contact.address}
//             </p>

//           </div>

//           {/* Phone */}

//           <div>

//             <h2 className="text-2xl font-bold mb-5">
//               Call Us Now
//             </h2>

//             <a
//               href={`tel:${contact.phone}`}
//               className="bg-red-600 text-white px-6 py-3 rounded"
//             >
//               {contact.phone}
//             </a>

//           </div>

//         </div>

//       </div>

//       {/* Google Map */}

//       <iframe
//         src={contact.map}
//         width="100%"
//         height="450"
//         style={{ border: 0 }}
//         loading="lazy"
//         allowFullScreen
//       ></iframe>

//     </div>
//   );

// };

// export default Contact;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Contact = () => {
  const [contact, setContact] = useState({});
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/contact"
        );

        setContact(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContact();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Banner */}

      {contact.banner && (
        <section className="relative h-[320px]">
          <img
            src={`http://localhost:4000/${contact.banner}`}
            alt="Contact Banner"
            className="w-full h-full object-cover object-bottom"
          />

          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold">Contact Us</h1>

              <p className="mt-4 text-lg">We'd love to hear from you.</p>
            </div>
          </div>
        </section>
      )}

      {/* Contact Info */}

      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Address Card */}

          <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl">
                <FaMapMarkerAlt />
              </div>

              <h2 className="text-3xl font-bold text-blue-700">Our Address</h2>
            </div>

            <p className="text-gray-600 leading-8">{contact.address}</p>
          </div>

          {/* Phone Card */}

          <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl">
                <FaPhoneAlt />
              </div>

              <h2 className="text-3xl font-bold text-green-700">Call Us</h2>
            </div>

            <p className="text-gray-600 mb-8">
              Have questions? Feel free to contact us.
            </p>

            <a
              href={`tel:${contact.phone}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg transition"
            >
              📞 {contact.phone}
            </a>
          </div>
        </div>

        {/* Social */}

        {(contact.facebook || contact.youtube) && (
          <div className="bg-white rounded-3xl shadow-lg p-10 mt-12 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-8">Follow Us</h2>

            <div className="flex justify-center gap-6">
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl transition"
                >
                  <FaFacebookF />
                </a>
              )}

              {contact.youtube && (
                <a
                  href={contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl transition"
                >
                  <FaYoutube />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Google Map */}

      {contact.map && (
        <section className="pb-10">
          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src={contact.map}
              width="100%"
              height="500"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Google Map"
            ></iframe>
          </div>
        </section>
      )}
    </div>
  );
};

export default Contact;
