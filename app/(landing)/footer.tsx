import React from "react";

const Footer = () => {
  return (
    <footer className="mx-[calc(50%-50vw)] bg-gray-100 pt-16">
      <div className="container border-t py-5 text-center text-sm" dir="ltr">
        Copyright © 2024{" "}
        <a href="//ctelecom.com" className="font-medium text-blue-800">
          Ctelecom
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
