import { useState } from 'react';
import { useApp } from '../context/AppContext';
export default function StudentView(){
  const {currentUser, assignments, submissions, submitAssignment, logout, dark, setDark, loading} = useApp();
  const [confirmId, setConfirmId] = useState(null); const [search, setSearch] = useState(''); const [filter, setFilter] = useState('all'); const [sort, setSort] = useState('dueDate');
  if(loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  const myAssignments = assignments.filter(a=>a.assignedTo.includes(currentUser.id));
  const getStatus = (id) => submissions.find(s=>s.assignmentId===id && s.studentId===currentUser.id)?.status || 'pending';
  const isOverdue = (date, id) => new Date(date) < new Date() && getStatus(id)!=='submitted';
  let filtered = myAssignments.filter(a=>a.title.toLowerCase().includes(search.toLowerCase()));
  if(filter!=='all') filtered = filtered.filter(a=>getStatus(a.id)===filter);
  filtered = [...filtered].sort((a,b)=> sort==='dueDate'? new Date(a.dueDate)-new Date(b.dueDate) : a.title.localeCompare(b.title));
  const done = myAssignments.filter(a=>getStatus(a.id)==='submitted').length;
  const bg = dark ? "bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#4c1d95]" : "bg-gradient-to-br from-violet-100 via-indigo-100 to-purple-100";
  const navBg = dark ? "bg-[#1e1b4b] border-violet-800 text-white" : "bg-white border-violet-200 text-[#1e1b4b]";
  const cardBg = (overdue) => overdue ? (dark?"bg-red-900/40 border-red-700":"bg-red-50 border-red-300") : (dark?"bg-[#2a2763] border-violet-700 text-white":"bg-gradient-to-br from-white to-indigo-50 border-indigo-200 text-[#1e1b4b]");
  return (
    <div className={`min-h-screen ${bg} ${dark?'text-white':''}`}>
      <div className={`${navBg} px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row gap-3 md:justify-between md:items-center shadow-[0_8px_30px_rgba(124,58,237,0.3)] sticky top-0 z-20 rounded-b-[16px] md:rounded-b-[24px] border-b-2`}>
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-black">J</div><div><h1 className="font-black text-[16px] leading-none">Joineazy</h1><p className={`text-[11px] font-bold ${dark?'text-violet-300':'text-violet-600'}`}>Student Dashboard</p></div></div>
          <button onClick={()=>setDark(!dark)} className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center ${dark?'bg-violet-900':'bg-violet-100'}`}>{dark?'☀️':'🌙'}</button>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
          <button onClick={()=>setDark(!dark)} className={`hidden md:flex w-9 h-9 rounded-full items-center justify-center ${dark?'bg-violet-900':'bg-violet-100'}`}>{dark?'☀️':'🌙'}</button>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 flex-1 md:flex-none justify-center md:justify-start ${dark?'bg-violet-900 border-violet-700 text-white':'bg-violet-50 border-violet-200'}`}><img src={currentUser.avatar} className="w-7 h-7 rounded-full border-2 border-white" alt=""/><span className="text-xs font-bold">{currentUser.name}</span></div>
          <button onClick={logout} className="flex-1 md:flex-none bg-[#1e1b4b] text-white px-4 py-2.5 rounded-full text-xs font-black">Logout</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <div className="mt-4 md:mt-8 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white rounded-[16px] md:rounded-[24px] p-4 md:p-6 flex justify-between items-center shadow-[0_15px_40px_rgba(124,58,237,0.4)]"><div><h2 className="text-[18px] md:text-[22px] font-black">Hi, {currentUser.name} ✨</h2><p className="text-violet-100 text-xs md:text-sm mt-1">{done} of {myAssignments.length} submitted • {myAssignments.length?Math.round(done/myAssignments.length*100):0}% complete</p></div><div className="text-3xl md:text-4xl">🎓</div></div>
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-6">
          <div className={`${dark?'bg-[#2a2763] border-violet-700 text-white':'bg-white border-white text-[#1e1b4b]'} rounded-[16px] md:rounded-[20px] p-3 md:p-5 text-center shadow-xl border-2`}><p className="text-[9px] md:text-[10px] font-black text-gray-400">TOTAL</p><p className="text-2xl md:text-3xl font-black">{myAssignments.length}</p><div className="w-8 h-1 bg-violet-500 mx-auto mt-2 rounded-full"></div></div>
          <div className={`${dark?'bg-[#2a2763] border-violet-700 text-white':'bg-white border-violet-200 text-violet-600'} rounded-[16px] md:rounded-[20px] p-3 md:p-5 text-center shadow-xl border-2`}><p className="text-[9px] md:text-[10px] font-black">PENDING</p><p className="text-2xl md:text-3xl font-black">{myAssignments.length-done}</p><div className="w-8 h-1 bg-violet-600 mx-auto mt-2 rounded-full"></div></div>
          <div className={`${dark?'bg-[#2a2763] border-emerald-800 text-white':'bg-white border-emerald-100 text-emerald-600'} rounded-[16px] md:rounded-[20px] p-3 md:p-5 text-center shadow-xl border-2`}><p className="text-[9px] md:text-[10px] font-black">DONE</p><p className="text-2xl md:text-3xl font-black">{done}</p><div className="w-8 h-1 bg-emerald-500 mx-auto mt-2 rounded-full"></div></div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 my-4 md:my-6">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search assignments..." className={`flex-1 p-3 md:p-4 rounded-full shadow-xl border-2 outline-none text-sm md:text-base ${dark?'bg-[#2a2763] border-violet-700 text-white':'bg-white border-violet-100 text-black'}`} />
          <div className="flex gap-2 md:gap-3 w-full md:w-auto">
            <select value={filter} onChange={e=>setFilter(e.target.value)} className={`flex-1 md:flex-none p-3 md:p-4 rounded-full font-bold shadow-xl border-2 text-sm ${dark?'bg-[#2a2763] border-violet-700 text-white':'bg-white border-violet-100 text-black'}`}><option value="all">All ✨</option><option value="pending">Pending</option><option value="submitted">Done</option></select>
            <select value={sort} onChange={e=>setSort(e.target.value)} className={`flex-1 md:flex-none p-3 md:p-4 rounded-full font-bold shadow-xl border-2 text-sm ${dark?'bg-[#2a2763] border-violet-700 text-white':'bg-white border-violet-100 text-black'}`}><option value="dueDate">Due Date</option><option value="title">Title</option></select>
          </div>
        </div>
        {filtered.length===0? <div className={`${dark?'bg-[#2a2763] border-violet-700 text-white':'bg-white'} rounded-2xl p-10 text-center shadow border-2`}>Empty: No assignments</div> :
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 pb-10">{filtered.map(a=>{const doneStatus=getStatus(a.id)==='submitted';const overdue=isOverdue(a.dueDate, a.id);return (<div key={a.id} className={`rounded-[16px] md:rounded-[24px] p-4 md:p-6 border-2 shadow-[0_15px_40px_rgba(79,70,229,0.25)] hover:-translate-y-1 transition-all ${cardBg(overdue)}`}><div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3"><span className={`text-[11px] px-3 py-1.5 rounded-full font-bold w-fit ${overdue?'bg-red-500 text-white':'bg-white border border-indigo-200 text-indigo-800'}`}>Due — {a.dueDate}</span><span className={`text-[10px] px-3 py-1 rounded-full font-black text-white w-fit ${doneStatus?'bg-gradient-to-r from-emerald-500 to-teal-500':'bg-gradient-to-r from-violet-600 to-indigo-600'}`}>{doneStatus?'SUBMITTED ✓':'PENDING'}</span></div><h3 className="font-black text-base md:text-[18px]">{a.title}</h3><p className={`text-[13px] mt-1 ${dark?'text-violet-200':'text-gray-600'}`}>{a.description}</p><div className="flex flex-col sm:flex-row gap-3 mt-5"><a href={a.driveLink} target="_blank" rel="noreferrer" className="flex-1 text-center bg-white border-2 border-violet-200 py-3 rounded-full text-xs font-black text-violet-700 hover:bg-violet-600 hover:text-white transition-all">Drive Link ↗</a>{doneStatus?<span className="flex-1 text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-full text-xs font-black">✓ Done</span>:<button onClick={()=>setConfirmId(a.id)} className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-full text-xs font-black shadow-lg hover:shadow-xl hover:scale-[1.02] transition">Mark Submitted</button>}</div></div>)})}</div>}
      </div>
      {confirmId && (
        <div className="fixed inset-0 bg-[#1e1b4b]/60 backdrop-blur-md flex items-center justify-center p-3 md:p-4 z-50">
          <div className="bg-white text-black rounded-[20px] md:rounded-[28px] p-6 md:p-8 w-full max-w-[90%] md:max-w-[400px] text-center shadow-2xl border-2 border-violet-100">
            <h2 className="font-black text-[16px] md:text-[18px]">Yes, I have submitted?</h2>
            <p className="text-sm text-gray-500 mt-1.5">Two-step confirmation</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-7">
              <button onClick={()=>setConfirmId(null)} className="flex-1 border-2 border-gray-200 py-3.5 md:py-4 rounded-full font-bold text-[14px] hover:bg-gray-50 transition">Cancel</button>
              <button onClick={()=>{submitAssignment(confirmId);setConfirmId(null)}} className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 md:py-4 rounded-full font-black text-[13px] md:text-[14px] shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-1.5 whitespace-nowrap">Confirm & Submit 🚀</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}/ /   s t u d e n t   p r o g r e s s   l o g i c  
 