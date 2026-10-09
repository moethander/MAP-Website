import React, { useEffect, useState } from "react";
import axios from "axios";
import API,{baseURL} from "../api";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Contact = () => {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // const res = await axios.get("http://localhost:4000/api/contact");
        const res = await API.get("/api/contact");
        setContact(res.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Loading...</p>
      </div>
    );
  }

  // Clean phone number for tel: link (removes spaces, dashes, etc.)
  const formattedPhone = contact.phone ? contact.phone.replace(/[^0-9+]/g, "") : "";

  // Safe file path formatter
  const formatMediaUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const normalizedPath = path.replace(/\\/g, "/");
    const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
    return `${baseURL}${cleanPath}`;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Banner */}
      {contact.banner && (
        <section className="relative h-[320px]">
          <img
            src={formatMediaUrl(contact.banner)}
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

      {/* Contact Info Grid */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* Address Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300 flex flex-col justify-between border border-gray-100 dark:border-gray-700/50">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 dark:bg-blue-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Our Address
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {contact.address || "No address provided."}
              </p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300 flex flex-col justify-between border border-gray-100 dark:border-gray-700/50">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 dark:bg-blue-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0">
                  <FaPhoneAlt />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Call Us
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Have questions? Feel free to contact us.
              </p>
            </div>

            {contact.phone && (
              <div>
                <a
                  href={`tel:${formattedPhone}`}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-full text-lg shadow-lg transition duration-200 active:scale-95"
                >
                  {contact.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {(contact.facebook || contact.youtube) && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mt-10 text-center border border-gray-100 dark:border-gray-700/50 transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Follow Us
            </h2>
            <div className="flex justify-center gap-6">
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl transition shadow-md hover:scale-105"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
              )}

              {contact.youtube && (
                <a
                  href={contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl transition shadow-md hover:scale-105"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Google Map Section */}
      {contact.map && (
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700/50">
            <iframe
              src={contact.map}
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Google Map Location"
            ></iframe>
          </div>
        </section>
      )}
    </div>
  );
};

export default Contact;