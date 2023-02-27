import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/images/favicons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/images/favicons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/images/favicons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/images/favicons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/images/favicons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/images/favicons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/images/favicons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/images/favicons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/images/favicons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/images/favicons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicons/favicon-16x16.png"
          />
          <meta name="msapplication-TileColor" content="#008080" />
          <meta
            name="msapplication-TileImage"
            content="/images/favicons/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#008080" />

          <meta property="og:locale" content="ko_KR" />

          {/* <!-- Google tag (gtag.js) --> */}
          <Script
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-5CQSX6VTQX"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5CQSX6VTQX');`}
          </Script>
        </Head>
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
