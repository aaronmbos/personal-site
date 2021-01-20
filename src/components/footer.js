export default function Footer({ socialLinks }) {
  return (
    <footer id="footer" className="text-blue-800 p-6 text-center bg-blue-50">
      <p className="my-2">Aaron Bos | {new Date().getFullYear()}</p>
      <p>
        {socialLinks.map((icon) => {
          return (
            <a key={icon.url} className="text-blue-500 hover:text-blue-700 m-3 text-2xl md:m-5" href={icon.url} target="_blank">
              <i className={icon.iconClass}></i>
            </a>
          );
        })}
      </p>
    </footer>
  );
}