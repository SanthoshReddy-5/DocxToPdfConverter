import React, { useState } from "react";
import {FaFileWord,FaCloudUploadAlt,FaBolt,FaShieldAlt,FaSmile,FaClock} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConvertButton, setShowConvertButton] = useState(true);
  const [showDownloadButton, setShowDownloadButton] = useState(false); // New state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl("");
    setShowConvertButton(true);
    setShowDownloadButton(false); // Reset download button on new file
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      toast.loading("Converting file...");

      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);

      toast.dismiss();
      toast.success("Conversion completed!");

      setShowConvertButton(false);
      setShowDownloadButton(true);
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred during conversion");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    setFile(null);
    setDownloadUrl("");
    setShowConvertButton(true);
    setShowDownloadButton(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-10 text-center">
      <Toaster position="bottom-right" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-8 w-full max-w-5xl"
      >
        <div className="flex justify-center mb-4">
          <FaFileWord className="text-indigo-500 w-[70px] md:w-[80px] h-[70px] md:h-[80px]" />
        </div>
        <h2 className="text-[20px] md:text-2xl font-semibold text-gray-800 mb-2">
          Convert your DOCX to PDF
        </h2>
        <p className="text-gray-600 mb-8">
          Upload your Word document below and get a high-quality PDF in
          seconds. No sign-up, no hassle, just fast and secure conversion!
        </p>

        <div className="w-full max-w-md mx-auto">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-xl p-8 md:p-15 cursor-pointer hover:bg-indigo-50 transition-colors">
            <FaCloudUploadAlt className="text-indigo-400 mb-2 w-[50px] md:w-[80px] h-[50px] md:h-[80px]" />
            <span className="text-indigo-500">
              {file ? file.name : "Click to upload"}
            </span>
            <input
              type="file"
              accept=".doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {showConvertButton && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConvert}
              disabled={isLoading}
              className="mt-6 bg-indigo-500 text-white px-3 py-2 rounded-[10px] shadow hover:bg-indigo-600 transition-colors disabled:bg-gray-500 w-[60%]"
            >
              Convert to PDF
            </motion.button>
          )}

          {showDownloadButton && downloadUrl && (
            <div className="mt-6">
              <a
                href={downloadUrl}
                download={file?.name?`${file.name.replace(/\.[^/.]+$/, "")}.pdf`:"converted.pdf"}
                onClick={handleDownload}
                className="inline-block bg-green-500 text-white px-4 py-2 rounded-[10px] shadow hover:bg-green-600 transition-colors w-[60%] text-center"
              >
                Download PDF
              </a>
            </div>
          )}
        </div>
      </motion.div>

      <div className="max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <FaBolt className="text-orange-500 mx-auto mb-3" size={40} />
          <h4 className="text-lg font-semibold mb-2">Fast & Instant</h4>
          <p className="text-gray-600">
            Get your PDF in seconds without waiting around. Our conversion is
            lightning quick!
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <FaShieldAlt className="text-green-500 mx-auto mb-3" size={40} />
          <h4 className="text-lg font-semibold mb-2">Secure & Private</h4>
          <p className="text-gray-600">
            Your documents are never stored on our servers. Total privacy
            guaranteed.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <FaSmile className="text-red-500 mx-auto mb-3" size={40} />
          <h4 className="text-lg font-semibold mb-2">User Friendly</h4>
          <p className="text-gray-600">
            Simple, intuitive interface makes converting documents easy for
            everyone.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <FaClock className="text-purple-500 mx-auto mb-3" size={40} />
          <h4 className="text-lg font-semibold mb-2">No Sign Up</h4>
          <p className="text-gray-600">
            Convert files instantly without creating an account or providing
            personal info.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <FaFileWord className="text-blue-500 mx-auto mb-3" size={40} />
          <h4 className="text-lg font-semibold mb-2">Accurate Conversion</h4>
          <p className="text-gray-600">
            Preserves formatting and style perfectly so your documents look
            professional.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <FaCloudUploadAlt className="text-teal-500 mx-auto mb-3" size={40} />
          <h4 className="text-lg font-semibold mb-2">Works Anywhere</h4>
          <p className="text-gray-600">
            Browser-based tool works on all devices: desktop, tablet, or
            mobile.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;