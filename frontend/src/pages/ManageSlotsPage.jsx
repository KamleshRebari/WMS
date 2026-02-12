import { useEffect, useState } from 'react';
import api from '../api/client.js';
import Layout from '../components/Layout.jsx';

export default function ManageSlotsPage() {
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ slotName: 'Slot 1', startTime: '09:00', endTime: '11:00' });
  const load = () => api.get('/admin/slots').then(({ data }) => setSlots(data));
  useEffect(load, []);

  const save = async (e) => {
    e.preventDefault();
    await api.post('/admin/slots', form);
    load();
  };

  return (
    <Layout title="Manage Slots">
      <form onSubmit={save} className="controls">
        <select value={form.slotName} onChange={(e) => setForm({ ...form, slotName: e.target.value })}>
          <option>Slot 1</option><option>Slot 2</option><option>Slot 3</option>
        </select>
        <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
        <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
        <button>Save Slot</button>
      </form>
      {slots.map((s) => <div className="list-item" key={s._id}>{s.slotName}: {s.startTime} - {s.endTime}</div>)}
    </Layout>
  );
}
