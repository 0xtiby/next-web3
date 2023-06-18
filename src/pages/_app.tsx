import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { env } from "@/config/env";
import { locales } from "@/locales";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: env.alchemyId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: locales.appName,
  projectId: env.projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${fontSans.variable}`}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </QueryClientProvider>
  );
}
