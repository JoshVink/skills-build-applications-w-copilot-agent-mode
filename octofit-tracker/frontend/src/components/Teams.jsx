import { useEffect, useState } from 'react'
import { extractRows } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams/`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setTeams(extractRows(data, 'teams')))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading teams…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Teams</h2>
      <div className="row g-3">
        {teams.map((t) => (
          <div key={t._id ?? t.name} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-dark text-white fw-semibold">
                {t.name}
              </div>
              <div className="card-body">
                <p className="card-text mb-1">
                  <strong>City:</strong> {t.city}
                </p>
                <p className="card-text mb-1">
                  <strong>Captain:</strong> {t.captain}
                </p>
                <p className="card-text mb-1">
                  <strong>Weekly Points:</strong> {t.weeklyPoints}
                </p>
                <p className="card-text mb-0">
                  <strong>Members:</strong>{' '}
                  {Array.isArray(t.members) ? t.members.join(', ') : t.members}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
