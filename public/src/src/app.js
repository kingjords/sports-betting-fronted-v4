import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'https://api.example.com';

function App() {
  const [token, setToken] = useState('');
  const [matches, setMatches] = useState([]);
  const [bet, setBet] = useState({ matchId: '', team: '', amount: '' });

  useEffect(() => {
    axios.get(`${API}/matches`)
      .then(res => setMatches(res.data))
      .catch(err => console.error('Error fetching matches:', err));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        username: 'user1',
        password: 'password123',
      });
      setToken(res.data.token);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const placeBet = async () => {
    try {
      await axios.post(`${API}/bet`, bet, {
        headers: { Authorization: token },
      });
      alert('Bet placed!');
    } catch (err) {
      console.error('Failed to place bet:', err);
    }
  };

  return (
    <div>
      <h1>Sports Betting App</h1>
      <button onClick={handleLogin}>Login</button>
      <h2>Matches</h2>
      {matches.map(m => (
        <div key={m._id}>
          <p>{m.teamA} vs {m.teamB} | Odds: {m.oddsA} - {m.oddsB}</p>
          <button onClick={() => setBet({ ...bet, matchId: m._id, team: m.teamA })}>
            Bet on {m.teamA}
          </button>
          <button onClick={() => setBet({ ...bet, matchId: m._id, team: m.teamB })}>
            Bet on {m.teamB}
          </button>
        </div>
      ))}
      <input
        type="number"
        placeholder="Amount"
        value={bet.amount}
        onChange={e => setBet({ ...bet, amount: e.target.value })}
      />
      <button onClick={placeBet}>Place Bet</button>
    </div>
  );
}

export default App;
