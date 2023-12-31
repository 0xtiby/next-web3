import { Alchemy, Network, OwnedNft, OwnedNftsResponse } from "alchemy-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { env } from "@/config/env";

const settings = {
  apiKey: env.alchemyId,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { addresses } = req.query;
  const results = await Promise.all(
    ((addresses as string[] | undefined) ?? [])
      .filter(
        (address) => address !== "0x0000000000000000000000000000000000000000"
      )
      .map(async (address) => {
        const nfts = await fetchAllNfts(address);
        return { address, nfts };
      })
  );

  const addressObject: Record<string, OwnedNft[]> = results.reduce<
    Record<string, OwnedNft[]>
  >((obj, { address, nfts }) => {
    obj[address] = nfts.filter((nft) => nft.tokenType !== "ERC1155");
    return obj;
  }, {});

  return res.status(200).json(addressObject);
}

const fetchAllNfts = async (
  owner: string,
  pageKey: string | null = null,
  fetched: OwnedNft[] = []
): Promise<OwnedNft[]> => {
  const options: { pageSize: number; pageKey?: string } = {
    pageSize: 100,
  };

  if (pageKey) {
    options.pageKey = pageKey;
  }

  const response = await alchemy.nft.getNftsForOwner(owner, options);
  const allNfts = fetched.concat(response.ownedNfts);
  if (response.pageKey) {
    return await fetchAllNfts(owner, response.pageKey, allNfts);
  }

  return allNfts;
};
