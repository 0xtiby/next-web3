import { OwnedNft } from "alchemy-sdk";
import { keyStore } from "@/config/keystore";
import { useQuery } from "@tanstack/react-query";

export const useNfts = (address: string | undefined) => {
  const { data, isLoading, error, refetch } = useQuery<
    Record<string, OwnedNft[]>
  >(
    keyStore.nfts.byAddress(address as string).queryKey,
    () =>
      fetch(`/api/nfts/${address}`, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        return res.json();
      }),
    { enabled: !!address, staleTime: 1000 * 10 } // 10 seconds
  );

  return {
    nfts: data ? data[address as string] ?? [] : [],
    isLoading,
    error,
    refetch,
  };
};
