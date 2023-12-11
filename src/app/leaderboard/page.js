"use client"
import { useState, useEffect } from 'react';
import { useSupabase } from '@/supabase-provider';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleBack = () => {
    router.back(); // This will navigate the user back to the previous page
  };

  useEffect(() => {
    async function fetchLeaderboardData() {
      const { data, error } = await supabase.rpc('get_aggregated_leaderboard');
  
      if (error) {
        console.error('Error fetching leaderboard data', error);
      } else {
        console.log('Received data:', data); // Check the data structure
        const transformedData = data.map((item, index) => ({
          rank: index + 1,
          user_name: item.user_name,
          score: item.total_score,
          date: item.last_activity
        }));
        setLeaders(transformedData);
      }
    }
  
    fetchLeaderboardData();
  }, [supabase]);
  

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <button onClick={handleBack} style={backButtonStyle}>Back</button>
      <h1 style={{ textAlign: 'center', color:"white" }}>Leaderboard</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
        {leaders.map((leader, index) => (
  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{leader.rank}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.user_name}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{leader.score}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.date ? new Date(leader.date).toLocaleDateString() : 'N/A'}</td>
  </tr>
))}


</tbody>

      </table>
      <Profile/>
    </div>
  );
};
const backButtonStyle = {
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default Leaderboard;
