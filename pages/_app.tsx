import type { AppProps /*, AppContext */ } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import { NextComponentType, NextPageContext } from 'next';

import './index.scss';

declare type AppLayoutComponent = NextComponentType<NextPageContext, any, any> & { Layout?: any };

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const Layout = (Component as AppLayoutComponent).Layout || MainLayout;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
