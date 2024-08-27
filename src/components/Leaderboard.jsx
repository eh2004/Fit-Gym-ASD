import React from 'react';

const Leaderboard = () => {
    const leaderboardData = [
        { name: 'Homie', bench: 95, squat: 100, Deadlift: 120 },
        { name: 'Craig', bench: 90, squat: 110, Deadlift: 110  },
        { name: 'Blood', bench: 85, squat: 55, Deadlift: 100 },
        { name: 'David', bench: 80, squat: 44, Deadlift: 95 },
        { name: 'Eve', bench: 75, squat: 95, Deadlift: 70 }
    ];
    return(
        <div style={{ padding: '20px' }}>
            <h2>Leaderboard</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Bench</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Squat</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Deadlift</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{entry.name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{entry.bench}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{entry.squat}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{entry.Deadlift}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Leaderboard
