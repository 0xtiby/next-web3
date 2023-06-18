import Image from "next/image";
import React from "react";
import { Text } from "../ui/text";
import { useNfts } from "@/hooks/useNfts";
import { useUser } from "@/hooks/useUser";
import { withHydratationFix } from "@/hoc/withHydratationFix";

const NftsList = withHydratationFix((): React.ReactElement | null => {
  const { isConnected, address } = useUser();
  const { isLoading, nfts } = useNfts(address);

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <div className="grid grid-cols-3 gap-1 max-w-xs">
      {nfts.map((nft) => (
        <Image
          key={nft.tokenId}
          src={nft.media[0]?.thumbnail ?? ""}
          alt={`${nft.title} ${nft.tokenId}`}
          width={100}
          height={100}
          unoptimized
        />
      ))}
    </div>
  );
});

export default NftsList;
