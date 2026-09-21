import { useEffect, useState } from 'react';
import { normalizeCollection, resolveApiBaseUrl } from '../utils/api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(`${resolveApiBaseUrl()}/api/workouts/`);
        const payload = await response.json();

        if (isMounted) {
          setWorkouts(normalizeCollection(payload));
        }
      } catch (error) {
        console.error('Unable to load workouts:', error);
        if (isMounted) {
          setWorkouts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Workouts</h2>

        {loading ? (
          <p className="text-muted mb-0">Loading workouts...</p>
        ) : workouts.length === 0 ? (
          <p className="text-muted mb-0">No workouts found.</p>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout._id ?? workout.id ?? workout.title} className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">{workout.title}</h5>
                      <span className="badge text-bg-info text-dark">{workout.difficulty ?? 'easy'}</span>
                    </div>
                    <p className="text-muted mb-2">{workout.focus ?? 'general'} • {workout.durationMinutes ?? 0} min</p>
                    {workout.description ? <p className="mb-0">{workout.description}</p> : null}
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
