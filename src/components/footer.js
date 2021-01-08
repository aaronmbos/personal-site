export default function Footer({ socialLinks }) {
  return (
    <footer className="p-6 text-center bg-gray-50">
      <p className="my-2">Aaron Bos | {new Date().getFullYear()}</p>
      <p>
        {socialLinks.map((icon) => {
          return (
            <a className="hover:text-gray-500 m-3 text-2xl md:m-5" href={icon.url} target="_blank">
              <i className={icon.iconClass}></i>
            </a>
          );
        })}
      </p>
    </footer>
  );
}