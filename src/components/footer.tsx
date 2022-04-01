interface SocialLink {
  iconClass: string,
  url: string
}

const socialLinks: SocialLink[] = [
  { iconClass: "fab fa-twitter", url: "https://twitter.com/AaronMBos" },
  {
    iconClass: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/aaron-bos-057a5666/",
  },
  { iconClass: "fab fa-github", url: "https://github.com/aaronmbos" },
  {
    iconClass: "fab fa-stack-overflow",
    url: "https://stackoverflow.com/users/8548471/a-a-ron",
  },
  { iconClass: "fa fa-envelope", url: "mailto:aaron.bos@icloud.com" },
  { iconClass: "fas fa-rss", url: "https://aaronbos.dev/feed.xml" },
];

export default function Footer() {
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
