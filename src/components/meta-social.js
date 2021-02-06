import Head from 'next/head';

export default function MetaSocial({title, url, description, image}) {
  return (
    <Head>
      <meta property="og:title" content={title} key="title" />
      <meta property="og:url" key="url" content={url} />
      <meta property="og:description" key="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@AaronMBos" />
    </Head>
  );
}