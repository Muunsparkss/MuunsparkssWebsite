import { useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";

export default function Support() {

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-6">Support My Work</h1>

      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <p className="text-lg text-gray-600">
          Creating projects, writing code, and sharing my knowledge with the world has always been my passion.  
          If you enjoy my work and would like to support me, you can contribute to my journey by donating Bitcoin.  
          Every contribution helps me continue developing open-source projects, improving my content, and reaching new milestones.
        </p>

        {/* Support Goal Section */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Support Goal 🎯</h2>
          <p className="text-gray-700 mt-2">
            You can support me to fund future projects, improve development tools,  
            and cover hosting & infrastructure costs for my websites and applications. Or you can just buy me a coffee :)
          </p>
        </div>

        {/* Bitcoin QR Code Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Bitcoin Wallet QR Code</h2>
          <p className="text-gray-600 mt-2">Scan the QR code below or use the address to send BTC:</p>

          <div className="flex justify-center my-4">
            <Image
              src="/images/bitcoin.jpeg"
              alt="Bitcoin Wallet QR Code"
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
