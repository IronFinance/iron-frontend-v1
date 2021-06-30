import { Farm, Market } from './iron-bank/config';

export const Tokens: { [key: string]: string } = {
  IRON: '0xD86b5923F3AD7b585eD81B448170ae026c65ae9a',
  TITAN: '0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A',
  MATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  ETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
};

export const createAddLiquidityLink = (marketName: Market, token0: string, token1: string) => {
  switch (marketName) {
    case 'QuickSwap':
      return `https://quickswap.exchange/#/add/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
    case 'DfynExchange':
    case 'FirebirdFinance':
    case 'IronFinance':
    case 'SushiSwap':
      return `https://app.sushi.com/add/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
  }
};

export const createRemoveLiquidityLink = (
  marketName: Market,
  token0: string,
  token1: string,
) => {
  switch (marketName) {
    case 'QuickSwap':
      return `https://quickswap.exchange/#/remove/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
    case 'DfynExchange':
    case 'FirebirdFinance':
    case 'IronFinance':
    case 'SushiSwap':
      return `https://app.sushi.com/remove/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
  }
};

export const buyTokenLinks: { [key: string]: string } = {
  TITAN:
    'https://quickswap.exchange/#/swap?outputCurrency=0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A',
};

/* ROLE CONFIG PARTNER POOL
  - Set farm url if pool in quickswap, dfyn...
  - Set pool id if partner use Iron Finance pool, not set if the opposite */

export const AllFarms: Farm[] = [
  {
    masterChef: '0xa37DD1f62661EB18c338f18Cf797cff8b5102d8e',
    treasury: '0x4a812C5EE699A40530eB49727E1818D43964324e',
    rewardTokenSymbol: 'USDC',
    rewardTokenDecimals: 6,
    rewardTokenAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    profitSharing: true,
    pools: [
      {
        id: 0,
        token0: 'TITAN',
        wantSymbol: 'TITAN',
        wantToken: '0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A',
        rewardToken: 'USDC',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'IronFinance',
        marketSymbol: 'IRONFINANCE',
      },
      {
        token0: 'TITAN',
        token1: 'ETH',
        rewardToken: 'QUICK',
        isLp: true,
        stable: false,
        profitSharing: false,
        market: 'QuickSwap',
        marketSymbol: 'QUICKSWAP',
        farmUrl:
          'https://quickswap.exchange/#/quick/0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x2dF6A6b1B7aA23a842948a81714a2279e603e32f',
        partnerPoolAddress: '0x2dF6A6b1B7aA23a842948a81714a2279e603e32f',
      },
    ],
  },
  {
    masterChef: '0xb444d596273C66Ac269C33c30Fbb245F4ba8A79d',
    rewardTokenSymbol: 'TITAN',
    pools: [
      {
        id: 0,
        token0: 'TITAN',
        token1: 'IRON',
        rewardToken: 'TITAN',
        wantSymbol: 'TITAN/IRON LP',
        wantToken: '0x35c1895DAC1e2432b320e2927b4F71a0D995602F',
        isLp: true,
        stable: false,
        profitSharing: false,
        market: 'SushiSwap',
        marketSymbol: 'SUSHISWAP',
      },
    ],
  },
  {
    masterChef: '0x65430393358e55A658BcdE6FF69AB28cF1CbB77a',
    rewardTokenSymbol: 'TITAN',
    deprecated: true,
    fundAddress: '0xf622A4e83ECbcfB7d8cb3007a3C6b03bCdA8666B',
    pools: [
      {
        id: 0,
        token0: 'TITAN',
        token1: 'MATIC',
        rewardToken: 'TITAN',
        wantSymbol: 'TITAN/MATIC LP',
        wantToken: '0xA79983Daf2A92c2C902cD74217Efe3D8AF9Fba2a',
        isLp: true,
        stable: false,
        market: 'SushiSwap',
        marketSymbol: 'SUSHISWAP',
      },
      {
        id: 1,
        token0: 'IRON',
        token1: 'USDC',
        wantSymbol: 'IRON/USDC LP',
        wantToken: '0x85dE135fF062Df790A5f20B79120f17D3da63b2d',
        rewardToken: 'TITAN',
        isLp: true,
        stable: true,
        market: 'SushiSwap',
        marketSymbol: 'SUSHISWAP',
      },
      {
        id: 2,
        token0: 'IRON',
        token1: 'USDC',
        wantSymbol: 'IRON/USDC LP QUICKSWAP',
        wantToken: '0x2bbe0f728f4d5821f84eee0432d2a4be7c0cb7fc',
        rewardToken: 'TITAN',
        isLp: true,
        stable: true,
        coming: true,
        market: 'QuickSwap',
        marketSymbol: 'QUICKSWAP',
      },
    ],
  },
  {
    masterChef: '0xe012d73B31f34b6199194936f65e7A1a9Ed39D73',
    treasury: '0x4a812C5EE699A40530eB49727E1818D43964324e',
    rewardTokenSymbol: 'USDC',
    rewardTokenAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    rewardTokenDecimals: 6,
    profitSharing: true,
    inactive: true,
    pools: [
      {
        id: 0,
        token0: 'TITAN',
        token1: 'IRON',
        rewardToken: 'USDC',
        wantSymbol: 'TITAN/IRON LP',
        wantToken: '0x35c1895DAC1e2432b320e2927b4F71a0D995602F',
        isLp: true,
        stable: false,
        profitSharing: true,
        coming: false,
        inactive: true,
        market: 'SushiSwap',
        marketSymbol: 'SUSHISWAP',
      },
    ],
  },
  {
    masterChef: '0x08b5249F1fee6e4fCf8A7113943ed6796737386E',
    rewardTokenSymbol: 'TITAN',
    inactive: true,
    pools: [
      {
        id: 0,
        token0: 'TITAN',
        wantSymbol: 'TITAN',
        wantToken: '0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A',
        rewardToken: 'TITAN',
        isLp: false,
        stable: false,
        profitSharing: false,
        coming: false,
        inactive: true,
        market: 'SushiSwap',
        marketSymbol: 'SUSHISWAP',
      },
    ],
  },
];
