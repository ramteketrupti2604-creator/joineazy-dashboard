import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CreateAssignmentModal({ onClose, editData }) {
  const { users, createAssignment, updateAssignment } = useApp();
  const students = users.filter(u => u.role === 'student');
  const [form, setForm] = useState(editData || { title: '', description: '', dueDate: '', driveLink: 'https://drive.google.com', assignedTo: [] });

  const toggleStudent = (id) => setForm(prev => ({...prev, assignedTo: prev.assignedTo.includes(id) ? prev.assignedTo.filter(x=>x!==id) : [...prev.assignedTo, id]}));

  const handleSubmit = () => {
    if(!form.title || !form.dueDate || form.assignedTo.length===0) { alert('Title, Due Date and Students required'); return; }
    if(editData) updateAssignment(editData.id, form); else createAssignment(form);
    onClose();
  };

  return <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
      <h2 className="font-bold text-lg mb-4">{editData ? 'Edit' : 'New'} Assignment</h2>
      <input className="w-full border p-2 rounded mb-3" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      <textarea className="w-full border p-2 rounded mb-3" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
      <input className="w-full border p-2 rounded mb-3" type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate:e.target.value})} />
      <input className="w-full border p-2 rounded mb-3" placeholder="Drive Link" value={form.driveLink} onChange={e=>setForm({...form, driveLink:e.target.value})} />
      <p className="text-sm font-semibold mb-1">Assign to:</p><div className="border rounded p-2 mb-4 max-h-32 overflow-auto">{students.map(s => <label key={s.id} className="flex gap-2 text-sm py-1"><input type="checkbox" checked={form.assignedTo.includes(s.id)} onChange={()=>toggleStudent(s.id)} />{s.name}</label>)}</div>
      <div className="flex justify-end gap-2"><button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button><button onClick={handleSubmit} className="px-4 py-2 bg-black text-white rounded">Save</button></div>
    </div>
  </div>
}