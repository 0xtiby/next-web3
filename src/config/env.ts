const ALCHEMY_API_KEY =
  process.env.NEXT_PUBLIC_ALCHEMY_ID ?? process.env.ALCHEMY_ID ?? "";

const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ??
  process.env.WALLET_CONNECT_PROJECT_ID ??
  "";

export const env = {
  alchemyId: ALCHEMY_API_KEY,
  projectId: WALLET_CONNECT_PROJECT_ID,
};
