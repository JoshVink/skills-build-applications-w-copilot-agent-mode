import { Routes, Route, NavLink } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'
import octofitLogo from '/octofitapp-small.png'

function App() {
  const navLinkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active fw-semibold' : '')

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={octofitLogo} alt="OctoFit logo" height="32" />
          OctoFit Tracker
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: '/users', label: 'Users' },
              { to: '/teams', label: 'Teams' },
              { to: '/activities', label: 'Activities' },
              { to: '/leaderboard', label: 'Leaderboard' },
              { to: '/workouts', label: 'Workouts' },
            ].map(({ to, label }) => (
              <li key={to} className="nav-item">
                <NavLink className={navLinkClass} to={to}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center py-5">
                <img src={octofitLogo} alt="OctoFit" height="80" className="mb-3" />
                <h1 className="display-5 fw-bold">Welcome to OctoFit Tracker</h1>
                <p className="lead text-muted">
                  Track activities, compete with your team, and hit your fitness goals.
                </p>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="bg-dark text-white text-center py-2 small">
        OctoFit Tracker &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
