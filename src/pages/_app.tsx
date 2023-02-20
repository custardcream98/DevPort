import { css, Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";

const globalStyle = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* custom */
  a {
    text-decoration: none;
    color: inherit;
  }
  input,
  button {
    padding: 0;
    border: none;
    background: none;
    font-size: inherit;
    font: inherit;
  }
  select,
  input[type="checkbox"],
  input[type="radio"],
  label,
  button {
    cursor: pointer;
  }
  button:disabled {
    cursor: initial;
  }

  ol,
  ul {
    list-style: none;
  }

  input::placeholder,
  textarea::placeholder {
    font-size: inherit;
    font-family: inherit;
  }
`;

const TITLE = "DEVPORT: 이력서 면접 질문 생성기";
const DESCRIPTION = "이력서 기반 예상 면접 질문 제공 서비스입니다.";
const KEYWORDS = ["이력서", "면접", "질문", "취준", "취업 준비"];
const IMAGE = "/images/og-image.webp";
const IMAGE_WIDTH = "1200";
const IMAGE_HEIGHT = "675";
const IMAGE_ALT = "DEVPORT: 이력서 면접 질문 생성기";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS.join(", ")} />

        <meta property="og:title" content={TITLE} />
        <meta name="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://dev-port-omega.vercel.app/" />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:image:alt" content={IMAGE_ALT} />
        <meta property="og:image:width" content={IMAGE_WIDTH} />
        <meta property="og:image:height" content={IMAGE_HEIGHT} />
        <meta property="og:site_name" content={TITLE} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:site" content="@ova_sw" />
        <meta name="twitter:image" content={IMAGE} />
        <meta name="twitter:image:alt" content={IMAGE_ALT} />
        <meta name="twitter:creator" content="@ova_sw" />
      </Head>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </>
  );
}
