import { useState } from 'react';
import { Wallet, Mnemonic } from 'ethers';
import crypto from 'crypto-browserify';
import TerminalLine from './TerminalLine';

function WalletGenerator() {
  const [mnemonic, setMnemonic] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [entropyHex, setEntropyHex] = useState('');
  const [booting, setBooting] = useState(false);

  const generateWallet = () => {
    setBooting(true);
    setMnemonic('');
    setAddress('');
    setPrivateKey('');
    setEntropyHex('');

    setTimeout(() => {
      const random = crypto.randomBytes(32);
      const timestamp = Date.now().toString();
      const combined = Buffer.concat([random, Buffer.from(timestamp)]);
      const hash = crypto.createHash('sha256').update(combined).digest();
      const entropy = hash.toString('hex');
      setEntropyHex(entropy);

      const mnemonicObj = Mnemonic.fromEntropy(hash);
      setMnemonic(mnemonicObj.phrase);

      const wallet = Wallet.fromPhrase(mnemonicObj.phrase);
      setPrivateKey(wallet.privateKey);
      setAddress(wallet.address);

      setBooting(false);
    }, 300); // dramatic pause
  };

  return (
    <div className="terminal">
      <div className="terminal-header">╔═[ Wallet Terminal v1.0.0 ]════════════════════════════════════════╗</div>
      <div className="terminal-body">
        <TerminalLine text={`> system: READY`} delay={20} />
        <TerminalLine text={`> user: shell@da26da`} delay={20} />
        <button onClick={generateWallet}>Generate Wallet</button>
        {booting && <TerminalLine text={`> booting entropy...`} />}
        {entropyHex && <TerminalLine text={`> entropy: ${entropyHex}`} />}
        {mnemonic && <TerminalLine text={`> mnemonic: ${mnemonic}`} />}
        {privateKey && <TerminalLine text={`> private key: ${privateKey}`} />}
        {address && <TerminalLine text={`> address: ${address}`} />}
      </div>
      <div className="terminal-footer">╚═════════════════════════════════════════════════════════════════╝</div>
    </div>
  );
}

export default WalletGenerator;

