interface Props {
  url: string;
}

export default function PostFooter({ url }: Props) {
  return (
    <div className="my-8 font-medium">
      Thanks for taking the time to read this blog post! <br />
      <br />
      If you think others would enjoy it, please share it on&nbsp;
      <a
        className="dark:text-white text-black underline"
        href={`https://twitter.com/intent/tweet?url=${encodeURI(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        Twitter
      </a>
      . Interested in staying up to date on my posts as they’re publised? Feel
      free to subscribe to the RSS feed&nbsp;
      <a
        className="dark:text-white text-black underline"
        href="https://aaronbos.dev/feed.xml"
        target="_blank"
        rel="noreferrer"
      >
        here
      </a>
      .
    </div>
  );
}
