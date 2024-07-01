import { Html, Head, Main, NextScript } from 'next/document';
import { Theme } from '@radix-ui/themes';

export default function Document() {
  return (
    <Html lang='da'>
      <Head>
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='icon'
          href='../public/favicon.svg'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Theme>
          <Main />
          <NextScript />
        </Theme>
      </body>
    </Html>
  );
}
