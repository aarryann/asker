import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="stylesheet" href="/vendors/mdi/css/materialdesignicons.min.css" />
          <link rel="stylesheet" href="/vendors/css/vendor.bundle.base.css" />
          <link rel="stylesheet" href="/vendors/animate.css/css/animate.min.css" />
          <link rel="stylesheet" href="/css/vertical-layout-light/style.css" />
          <link rel="shortcut icon" href="/img/favicon.png" />
        </Head>
        <body className="sidebar-fixed">
          <Main />
          <NextScript />
          <script src="/vendors/js/vendor.bundle.base.js" />
          <script src="/js/bootstrap.js" />
          <script src="/js/d3.js" />
          <script src="/js/typeahead.bundle.min.js" />
          <script src="/js/bstag.js" />
          <script src="/thm/off-canvas.js" />
          <script src="/thm/hoverable-collapse.js" />
          <script src="/thm/template.js" />
          <script src="/thm/settings.js" />
          <script src="/thm/todolist.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
