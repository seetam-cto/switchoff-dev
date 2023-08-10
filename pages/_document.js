import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtB0H3LUpHoVHg1QGlSoEonWjcesiXUR0&libraries=places"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
