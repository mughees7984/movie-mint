import React from "react";

const footerLinks = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Movies", href: "/movies" },
      { label: "F&Q", href: "/faq" },
    ],
  },
  {
    title: "Our social networks",
    links: [
      { label: "Telegram", href: "https://t.me/" },
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "Facebook", href: "https://facebook.com/" },
      { label: "Youtube", href: "https://youtube.com/" },
    ],
  },
  {
    title: "For reference",
    links: [
      { label: "Telegram", href: "https://t.me/" },
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "Facebook", href: "https://facebook.com/" },
      { label: "Youtube", href: "https://youtube.com/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo + Description */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo.png"
            alt="MovieMint Logo"
            width={200}
            height={200}
            loading="lazy"
            className="mb-2"
          />
          <p className="text-md text-white">
            MovieMint liberates Filmmakers and fans through decentralized
            funding. Our Blockchain platform seamlessly connects Independent
            Creators and Passionate Supporters.
          </p>
        </div>

        {/* Footer Links */}
        <div className="col-span-3 grid grid-cols-3 md:grid-cols-3 gap-8 text-center">
          {footerLinks.map((section) => (
            <div key={section.title} className="mt-10 ">
              <h4 className="text-[#b0d357] font-bold text-lg mb-2">
                {section.title}
              </h4>
              <ul className="text-sm space-y-1 text-gray-300">
                {section.links.map((link) => (
                  <li key={link.label}>
                    •{" "}
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="hover:text-lime-400 transition-colors text-lg font-semibold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-white font-semibold">
        © All Rights reserved for moviemint.net - 2024
      </div>
    </footer>
  );
};

export default Footer;
