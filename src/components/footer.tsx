export default function Footer({ socialLinks }) {
  return (
    <footer
      id="footer"
      className="text-blue-500 text-sm p-6 text-center dark:bg-stone-800 dark:text-white"
    >
      <p>
        {socialLinks.map((icon) => {
          return (
            <a
              key={icon.url}
              className="dark:text-blue-300 dark:hover:text-blue-500 text-blue-500 hover:text-blue-700 m-3 text-2xl md:m-5"
              href={icon.url}
              target="_blank"
            >
              <i className={icon.iconClass}></i>
            </a>
          );
        })}
      </p>
    </footer>
  );
}
