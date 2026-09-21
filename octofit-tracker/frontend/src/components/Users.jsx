import { useEffect, useState } from 'react';
import { normalizeCollection } from '../utils/api.js';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(apiBaseUrl);
        const payload = await response.json();

        if (isMounted) {
          setUsers(normalizeCollection(payload));
        }
      } catch (error) {
        console.error('Unable to load users:', error);
        if (isMounted) {
          setUsers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Users</h2>

        {loading ? (
          <p className="text-muted mb-0">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-muted mb-0">No users found.</p>
        ) : (
          <div className="list-group">
            {users.map((user) => (
              <div key={user._id ?? user.id ?? user.email} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{user.name}</h5>
                    <p className="mb-1 text-muted">{user.email}</p>
                  </div>
                  <span className="badge text-bg-primary">{user.role ?? 'student'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
