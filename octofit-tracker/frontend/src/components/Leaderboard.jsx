import { useEffect, useState } from 'react'
import { extractRows } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

const medalColors = ['text-warning', 'text-secondary', 'text-danger']

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setEntries(extractRows(data, 'leaderboard')))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading leaderboard…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
              <th>Active (min)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e._id ?? e.rank}>
                <td className={medalColors[e.rank - 1] ?? ''}>
                  <strong>{e.rank}</strong>
                </td>
                <td>{e.userName}</td>
                <td>{e.teamName}</td>
                <td>{e.points}</td>
                <td>{e.activeMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
