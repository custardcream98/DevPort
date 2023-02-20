import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const TITLE = "DEVPORT: 이력서 면접 질문 생성기";
const DESCRIPTION = "이력서 기반 예상 면접 질문 제공 서비스입니다.";
const KEYWORDS = ["이력서", "면접", "질문", "취준", "취업 준비"];
const IMAGE = "/images/og-image.png";
const IMAGE_WIDTH = "1200";
const IMAGE_HEIGHT = "675";
const IMAGE_ALT = "DEVPORT: 이력서 면접 질문 생성기";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>{TITLE}</title>
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
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#008080" />
          <meta
            name="msapplication-TileImage"
            content="/images/favicons/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#008080" />
          <meta name="description" content={DESCRIPTION} />
          <meta name="keywords" content={KEYWORDS.join(", ")} />

          <meta property="og:title" content={TITLE} />
          <meta property="og:locale" content="ko_KR" />

          <meta property="og:type" content="website" />

          <meta name="og:description" content={DESCRIPTION} />
          <meta
            property="og:url"
            content="https://dev-port-omega.vercel.app/"
          />
          <meta property="og:image" content={IMAGE} />
          <meta property="og:image:alt" content={IMAGE_ALT} />
          <meta property="og:image:width" content={IMAGE_WIDTH} />
          <meta property="og:image:height" content={IMAGE_HEIGHT} />
          <meta property="og:site_name" content={TITLE} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={TITLE} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:site" content="@ova_sw" />
          <meta name="twitter:image" content={IMAGE} />
          <meta name="twitter:image:alt" content={IMAGE_ALT} />
          <meta name="twitter:creator" content="@ova_sw" />

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
          <NextScript />
        </body>
      </Html>
    );
  }
}
