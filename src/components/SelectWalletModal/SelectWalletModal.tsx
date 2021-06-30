import React, { useCallback } from 'react';
import styled from 'styled-components';
import CloseButton from '../CloseButton';
import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalLower,
  ModalTitle,
  ModalUpper,
} from '../Modal';
import Spacer from '../Spacer';
import MetamaskLogo from '../../assets/img/metamask.png';
import TrustWalletLogo from '../../assets/img/TrustWallet.svg';
import MathWalletLogo from '../../assets/img/MathWallet.svg';
import safeWalletLogo from '../../assets/img/SafeWallet.svg';
import TokenPocketLogo from '../../assets/img/TokenPocker.svg';
import WalletConnectLogo from '../../assets/img/wallet_connect.png';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useAddPopup, useSetConnectedAccount } from 'src/state/application/hooks';
import useWalletConnectors from '../../hooks/useWalletConnectors';
import { ConnectorNames } from 'src/state/application/reducer';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';

export interface SelectWalletModalProps {
  onDismiss?: () => void;
}

interface Wallet {
  connector: ConnectorNames;
  name: string;
  image: string;
}
const wallets = [
  {
    connector: ConnectorNames.Injected,
    name: 'MetaMask',
    image: MetamaskLogo,
  },
  {
    connector: ConnectorNames.WalletConnect,
    name: 'Wallet Connect',
    image: WalletConnectLogo,
  },
  {
    connector: ConnectorNames.Injected,
    name: 'TrustWallet',
    image: TrustWalletLogo,
  },
  {
    connector: ConnectorNames.Injected,
    name: 'MathWallet',
    image: MathWalletLogo,
  },
  {
    connector: ConnectorNames.Injected,
    name: 'TokenPocket',
    image: TokenPocketLogo,
  },
  {
    connector: ConnectorNames.Injected,
    name: 'SafePal Wallet',
    image: safeWalletLogo,
  },
] as Wallet[];

const SelectWalletModal: React.FC<SelectWalletModalProps> = ({ onDismiss }) => {
  const { activate, connector, account } = useWeb3React();
  const connectors = useWalletConnectors();
  const saveAccount = useSetConnectedAccount();
  const addPopup = useAddPopup();
  const { defaultProvider, etherscanUrl, chainId } = useConfiguration();

  const onConnectPress = useCallback(
    (connectionId: ConnectorNames) => {
      activate(connectors[connectionId], (error) => {
        if (
          error instanceof UnsupportedChainIdError &&
          connectors[connectionId] instanceof InjectedConnector
        ) {
          addPopup({
            error: {
              title: 'Connect wallet error',
              message: 'Please connect to Polygon chain',
            },
          });
          window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x' + chainId.toString(16), // A 0x-prefixed hexadecimal string
                chainName: 'Polygon',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                rpcUrls: Array.isArray(defaultProvider) ? defaultProvider : [defaultProvider],
                blockExplorerUrls: [etherscanUrl],
              },
            ],
          });
        } else {
          addPopup({
            error: {
              title: 'Connect wallet error',
              message: error?.message,
            },
          });
        }
        return;
      });
      saveAccount(account, connectionId);
      onDismiss();
    },
    [
      account,
      activate,
      addPopup,
      chainId,
      connectors,
      defaultProvider,
      etherscanUrl,
      onDismiss,
      saveAccount,
    ],
  );
  return (
    <Modal size="xs" padding="0">
      <ModalUpper>
        <ModalHeader>
          <ModalTitle>Connect to a Wallet</ModalTitle>
          <ModalCloseButton>
            <Spacer />
            <CloseButton size="20px" onClick={onDismiss} />
          </ModalCloseButton>
        </ModalHeader>
      </ModalUpper>
      <ModalLower>
        <List>
          {wallets.map((wallet) => (
            <Item
              key={wallet.name}
              onClick={() => {
                if (connector !== connectors[wallet.connector]) {
                  onConnectPress(wallet.connector);
                }
              }}
            >
              <WalletName>{wallet.name}</WalletName>
              <WalletLogo
                src={wallet.image}
                alt={`${wallet.name} Logo`}
                width={32}
                height={32}
              />
            </Item>
          ))}
        </List>
      </ModalLower>
    </Modal>
  );
};

const List = styled.ul`
  overflow: hidden;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
`;

const Item = styled.li<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#2d3248' : '#181c2f')};
  margin: 10px 0px;
  border-radius: 12px;
  padding: 15px 16px;
  border: 1px solid #2d3248;
  :hover {
    border: 1px solid ${({ theme }) => theme.color.primary.main};
  }
`;

const WalletName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.white};
`;

const WalletLogo = styled.img`
  margin-left: auto;
  border-radius: 24px;
`;

export default SelectWalletModal;
