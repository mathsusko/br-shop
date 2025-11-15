import { FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa'

const socialLinks = [
  { href: 'https://instagram.com', icon: <FaInstagram /> },
  { href: 'https://facebook.com', icon: <FaFacebook /> },
  { href: 'https://youtube.com', icon: <FaYoutube /> }
]

const Footer = () => (
  <footer className="w-screen bg-[#5542ff] py-4 text-black">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
      <p className="text-center text-sm font-light md:text-left">
        ©VJ Vacão 2025. Todos direitos reservados
      </p>

      <div className="flex justify-center gap-4 md:justify-start">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black transition-colors duration-500 ease-in-out hover:text-white"
          >
            {link.icon}
          </a>
        ))}
      </div>

      <a
        href="#privacy-policy"
        className="text-center text-sm font-light hover:underline md:text-right"
      >
        Politica de privacidade.
      </a>
    </div>
  </footer>
)

export default Footer
