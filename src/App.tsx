import React, { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

interface LinkProps {
  linkToken: string | null;
  onSuccess: (token: string, metadata: any) => void;
}

const Link: React.FC<LinkProps> = ({linkToken, onSuccess}: LinkProps) => {
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={(e) => {e.preventDefault(); open()}} disabled={!ready || !linkToken}>
      Launch Plaid Link
    </button>
  );
};

const App = () => {
  const [linkToken, setLinkToken] = useState('');
  const [publicToken, setPublicToken] = useState('');

  const onSuccess = useCallback((token: string, metadata: any) => {
    console.log(token, metadata);
    setPublicToken(token);
  }, []);

  return (
    <div>
      <form style={{marginBottom: '1rem'}}>
        <input
          type="text"
          value={linkToken}
          onChange={e => setLinkToken(e.target.value)}
          style={{marginRight: '0.5rem'}}
        />
      <Link linkToken={linkToken} onSuccess={onSuccess} />
      </form>
      {publicToken && <p>Public Token: {publicToken}</p>}
    </div>
  );
};

export default App;
