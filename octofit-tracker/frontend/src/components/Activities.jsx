import { useEffect, useState } from 'react';
import { normalizeCollection } from '../utils/api.js';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(apiBaseUrl);
        const payload = await response.json();

        if (isMounted) {
          setActivities(normalizeCollection(payload));
        }
      } catch (error) {
        console.error('Unable to load activities:', error);
        if (isMounted) {
          setActivities([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Activities</h2>

        {loading ? (
          <p className="text-muted mb-0">Loading activities...</p>
        ) : activities.length === 0 ? (
          <p className="text-muted mb-0">No activities found.</p>
        ) : (
          <div className="list-group">
            {activities.map((activity) => (
              <div key={activity._id ?? activity.id ?? activity.type + activity.date} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1 text-capitalize">{activity.type}</h5>
                    <p className="mb-1 text-muted">{activity.durationMinutes ?? 0} minutes</p>
                  </div>
                  <span className="badge text-bg-success">{activity.caloriesBurned ?? 0} kcal</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
