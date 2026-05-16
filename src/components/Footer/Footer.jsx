import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__author">Developed by Jon Nicdao</p>
      <p className="footer__year">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
