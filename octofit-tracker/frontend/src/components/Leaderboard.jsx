import { useEffect, useState } from 'react';
import { normalizeCollection, resolveApiBaseUrl } from '../utils/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${resolveApiBaseUrl()}/api/leaderboard/`);
        const payload = await response.json();

        if (isMounted) {
          setEntries(normalizeCollection(payload));
        }
      } catch (error) {
        console.error('Unable to load leaderboard:', error);
        if (isMounted) {
          setEntries([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Leaderboard</h2>

        {loading ? (
          <p className="text-muted mb-0">Loading leaderboard...</p>
        ) : entries.length === 0 ? (
          <p className="text-muted mb-0">No leaderboard data found.</p>
        ) : (
          <div className="list-group">
            {entries.map((entry) => (
              <div key={entry._id ?? entry.rank ?? entry.name} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge text-bg-secondary me-2">#{entry.rank ?? 0}</span>
                    <strong>{entry.name}</strong>
                  </div>
                  <span>{entry.points ?? 0} pts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
