import { useEffect, useState } from 'react';
import { normalizeCollection } from '../utils/api.js';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(apiBaseUrl);
        const payload = await response.json();

        if (isMounted) {
          setTeams(normalizeCollection(payload));
        }
      } catch (error) {
        console.error('Unable to load teams:', error);
        if (isMounted) {
          setTeams([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Teams</h2>

        {loading ? (
          <p className="text-muted mb-0">Loading teams...</p>
        ) : teams.length === 0 ? (
          <p className="text-muted mb-0">No teams found.</p>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team._id ?? team.id ?? team.name} className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">{team.name}</h5>
                      <span className="badge text-bg-dark">{team.score ?? 0} pts</span>
                    </div>
                    <p className="text-muted mb-2">{Array.isArray(team.members) ? team.members.length : 0} members</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
