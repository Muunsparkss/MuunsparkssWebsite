import Image from 'next/image';
import Logo from "../public/images/logo.webp";
import { useEffect, useState } from 'react';

export default function Loading({ className }) {
    return (
    <div className="fixed top-0 left-0 w-full h-full load-bg flex justify-center items-center z-50 transition-opacity ${className}">
      <Image
        src={Logo} // Adjust path to your loading image
        alt="Loading..."
        width={200} // Adjust size as needed
        height={200}
      />
    </div>
  );
}
