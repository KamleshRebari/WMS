import { useState } from 'react';
import api from '../api/client.js';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', mobile: '', dob: '' });
  const [result, setResult] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/register', form);
    setResult(`Worker created. Username: ${data.username} | Password: ${data.defaultPassword}`);
    setForm({ name: '', mobile: '', dob: '' });
  };

  return (
    <div className="auth-wrap">
      <form className="card" onSubmit={submit}>
        <h2>Worker Registration</h2>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Mobile Number" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
        <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
        <button type="submit">Register Worker</button>
        {result && <p className="success">{result}</p>}
      </form>
    </div>
  );
}
