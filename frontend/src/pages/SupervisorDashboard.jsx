import { useEffect, useState } from 'react';
import api from '../api/client.js';
import Layout from '../components/Layout.jsx';

export default function SupervisorDashboard() {
  const [workers, setWorkers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    api.get('/supervisor/workers').then(({ data }) => setWorkers(data));
  }, []);

  const save = async () => {
    await api.post('/supervisor/attendance', {
      workerIds: selected,
      date: new Date(),
      slot: 'Slot 1',
      location: workers[0]?.location || 'Assigned Site'
    });
    alert('Attendance marked');
  };

  return (
    <Layout title="Supervisor Dashboard">
      <button onClick={save}>Mark Attendance for Selected</button>
      {workers.map((w) => (
        <label key={w._id} className="list-item">
          <input
            type="checkbox"
            checked={selected.includes(w._id)}
            onChange={() => setSelected((s) => (s.includes(w._id) ? s.filter((x) => x !== w._id) : [...s, w._id]))}
          />
          {w.name} ({w.location})
        </label>
      ))}
    </Layout>
  );
}
