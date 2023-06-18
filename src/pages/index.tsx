import { Heading, Text } from "@/components/ui/text";

import { Button } from "@/components/ui/button";
import Head from "next/head";
import { locales } from "@/locales";

export default function Home() {
  return (
    <>
      <Head>
        <title>{locales.appName}</title>
        <meta name="description" content={locales.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container py-20 space-y-12">
        <Heading>{locales.appName}</Heading>
        <Text>{locales.description}</Text>
        <Button>{locales.connectWallet}</Button>
      </main>
    </>
  );
}
