import { useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api/client.js';
import Layout from '../components/Layout.jsx';

export default function WorkerDashboard() {
  const [records, setRecords] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    api.get('/worker/attendance').then(({ data }) => {
      setRecords(data.records);
      setLocation(data.location);
    });
  }, []);

  const events = useMemo(
    () => records.map((r) => ({ title: `${r.slot} (${r.status})`, date: r.date })),
    [records]
  );

  return (
    <Layout title="Worker Dashboard">
      <div className="kpi">You are present in {records.length} slots this cycle.</div>
      <div className="kpi">Work location: {location}</div>
      <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView="dayGridMonth" headerToolbar={{left:'prev,next today',center:'title',right:'dayGridMonth,timeGridWeek,timeGridDay'}} events={events} />
    </Layout>
  );
}
