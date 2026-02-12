import { useEffect, useState } from 'react';
import api from '../api/client.js';
import Layout from '../components/Layout.jsx';

export default function AddWorkersPage() {
  const [workers, setWorkers] = useState([]);
  const [form, setForm] = useState({ name: '', mobile: '', dob: '' });

  const load = () => api.get('/admin/workers').then(({ data }) => setWorkers(data));
  useEffect(load, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/admin/workers', form);
    setForm({ name: '', mobile: '', dob: '' });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/admin/workers/${id}`);
    load();
  };

  return (
    <Layout title="Add / Edit Workers">
      <form onSubmit={submit} className="controls">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
        <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
        <button>Add Worker</button>
      </form>
      {workers.map((w) => (
        <div key={w._id} className="list-item spread">
          <span>{w.name} - {w.mobile}</span>
          <button onClick={() => remove(w._id)}>Delete</button>
        </div>
      ))}
    </Layout>
  );
}
