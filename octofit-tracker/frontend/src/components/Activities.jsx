import { useEffect, useState } from 'react'
import { extractRows } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities/` : 'http://localhost:8000/api/activities/')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setActivities(extractRows(data, 'activities')))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading activities…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a._id}>
                <td>{a.userName}</td>
                <td>{a.teamName}</td>
                <td>{a.type}</td>
                <td>{a.durationMinutes}</td>
                <td>{a.caloriesBurned}</td>
                <td>{new Date(a.completedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
