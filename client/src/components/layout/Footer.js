import React from "react";

function Footer() {
  return (
    <footer id="footer" className="bg-dark text-white mt-5 p-4 text-center">
      &copy; {new Date().getFullYear()} DevBook
    </footer>
  );
}

export default Footer;
