import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script
                    type="module"
                    src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/mirage.js"
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
