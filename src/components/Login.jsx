import { useApp } from '../context/AppContext';
export default function LoginView(){
  const {users, login} = useApp();
  const admins = users.filter(u=>u.role==='admin'); const students = users.filter(u=>u.role==='student');
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl relative z-10">
        <div className="text-center mb-6"><div className="w-14 h-14 bg-violet-600 text-white rounded-2xl flex items-center justify-center font-black mx-auto text-xl">J</div><h1 className="text-2xl font-black mt-3">Joineazy</h1><p className="text-sm text-gray-500">Assignment & Review Dashboard</p></div>
        <p className="text-[11px] font-black tracking-widest text-violet-600 mb-2">● ADMINS</p>
        <div className="space-y-2 mb-5">{admins.map(a=><button key={a.id} onClick={()=>login(a.id)} className="w-full flex items-center gap-3 p-3 rounded-2xl bg-violet-50 border-2 border-violet-100 hover:border-violet-600 transition-all text-left"><img src={a.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow" alt={a.name}/><div><p className="font-bold text-sm">{a.name}</p><p className="text-[11px] text-gray-500">Admin • Professor</p></div><span className="ml-auto text-xs bg-violet-600 text-white px-3 py-1 rounded-full">→</span></button>)}</div>
        <p className="text-[11px] font-black tracking-widest text-indigo-600 mb-2">● STUDENTS</p>
        <div className="space-y-2">{students.map(s=><button key={s.id} onClick={()=>login(s.id)} className="w-full flex items-center gap-3 p-3 rounded-2xl bg-indigo-50 border-2 border-indigo-100 hover:border-indigo-400 transition-all text-left"><img src={s.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow" alt={s.name}/><div><p className="font-bold text-sm">{s.name}</p><p className="text-[11px] text-gray-500">Student</p></div><span className="ml-auto text-xs bg-white border px-2 py-1 rounded-full">student</span></button>)}</div>
      </div>
    </div>
  )
}