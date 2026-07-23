import { useEffect, useState } from 'react'
import { extractRows } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users/`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setUsers(extractRows(data, 'users')))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading users…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Team</th>
              <th>Fitness Goal</th>
              <th>Weekly Active (min)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id ?? u.email}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.teamName}</td>
                <td>{u.fitnessGoal}</td>
                <td>{u.weeklyActiveMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
