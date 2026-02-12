import { useEffect, useState } from 'react';
import api from '../api/client.js';
import Layout from '../components/Layout.jsx';

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState({ date: '', slot: '', location: '' });

  const load = () => api.get('/admin/records', { params: filter }).then(({ data }) => setRecords(data));
  useEffect(load, []);

  return (
    <Layout title="Attendance Records">
      <div className="controls">
        <input type="date" value={filter.date} onChange={(e) => setFilter({ ...filter, date: e.target.value })} />
        <input placeholder="Slot" value={filter.slot} onChange={(e) => setFilter({ ...filter, slot: e.target.value })} />
        <input placeholder="Location" value={filter.location} onChange={(e) => setFilter({ ...filter, location: e.target.value })} />
        <button onClick={load}>Filter</button>
        <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/records/pdf`} target="_blank">Download PDF</a>
      </div>
      {records.map((r) => (
        <div key={r._id} className="list-item">
          {r.workerId?.name} | {new Date(r.date).toDateString()} | {r.slot} | {r.location}
        </div>
      ))}
    </Layout>
  );
}
