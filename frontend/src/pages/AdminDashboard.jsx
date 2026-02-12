import { useEffect, useState } from 'react';
import api from '../api/client.js';
import Layout from '../components/Layout.jsx';

export default function AdminDashboard() {
  const [workers, setWorkers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [slot, setSlot] = useState('Slot 1');
  const [location, setLocation] = useState('Main Site');

  useEffect(() => {
    api.get('/admin/workers').then(({ data }) => setWorkers(data));
  }, []);

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const save = async () => {
    await api.post('/admin/attendance', { workerIds: selected, date: new Date(), slot, location });
    alert('Attendance saved');
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="controls">
        <select value={slot} onChange={(e) => setSlot(e.target.value)}>
          <option>Slot 1</option><option>Slot 2</option><option>Slot 3</option>
        </select>
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <button onClick={save}>Save Attendance</button>
      </div>
      {workers.map((w) => (
        <label key={w._id} className="list-item">
          <input type="checkbox" checked={selected.includes(w._id)} onChange={() => toggle(w._id)} />
          {w.name} ({w.username})
        </label>
      ))}
    </Layout>
  );
}
