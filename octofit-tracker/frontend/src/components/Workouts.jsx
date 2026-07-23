import { useEffect, useState } from 'react'
import { extractRows } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

const difficultyBadge = {
  Beginner: 'bg-success',
  Intermediate: 'bg-warning text-dark',
  Advanced: 'bg-danger',
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setWorkouts(extractRows(data, 'workouts')))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading workouts…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      <div className="row g-3">
        {workouts.map((w) => (
          <div key={w._id ?? w.title} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
                <span className="fw-semibold">{w.title}</span>
                <span
                  className={`badge ${difficultyBadge[w.difficulty] ?? 'bg-secondary'}`}
                >
                  {w.difficulty}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text mb-1">
                  <strong>Focus:</strong> {w.focus}
                </p>
                <p className="card-text mb-1">
                  <strong>Duration:</strong> {w.durationMinutes} min
                </p>
                <p className="card-text mb-1">
                  <strong>Exercises:</strong>{' '}
                  {Array.isArray(w.exercises) ? w.exercises.join(', ') : w.exercises}
                </p>
                <p className="card-text mb-0">
                  <strong>Recommended for:</strong>{' '}
                  {Array.isArray(w.recommendedFor)
                    ? w.recommendedFor.join('; ')
                    : w.recommendedFor}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
