import { useEffect, useState } from 'react';
import api from '../api/client.js';
import Layout from '../components/Layout.jsx';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ groupName: '', location: '' });

  const load = () => api.get('/admin/groups').then(({ data }) => setGroups(data));
  useEffect(load, []);

  const save = async (e) => {
    e.preventDefault();
    await api.post('/admin/groups', form);
    setForm({ groupName: '', location: '' });
    load();
  };

  return (
    <Layout title="Work Location & Groups">
      <form onSubmit={save} className="controls">
        <input placeholder="Group Name" value={form.groupName} onChange={(e) => setForm({ ...form, groupName: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <button>Create Group</button>
      </form>
      {groups.map((g) => <div key={g._id} className="list-item">{g.groupName} - {g.location}</div>)}
    </Layout>
  );
}
