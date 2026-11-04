import { createContext, useContext, useState, useEffect } from 'react';
import { users, initialAssignments } from '../data/mockData';
const AppContext = createContext();
export const AppProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(()=> JSON.parse(localStorage.getItem('je_user')||'null'));
  const [assignments, setAssignments] = useState(()=> JSON.parse(localStorage.getItem('je_assign')||'null') || initialAssignments);
  const [submissions, setSubmissions] = useState(()=> JSON.parse(localStorage.getItem('je_sub')||'[]'));
  const [dark, setDark] = useState(()=> JSON.parse(localStorage.getItem('je_dark')||'false'));
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ setTimeout(()=>setLoading(false), 500); },[]);
  useEffect(()=> localStorage.setItem('je_user', JSON.stringify(currentUser)), [currentUser]);
  useEffect(()=> localStorage.setItem('je_assign', JSON.stringify(assignments)), [assignments]);
  useEffect(()=> localStorage.setItem('je_sub', JSON.stringify(submissions)), [submissions]);
  useEffect(()=> localStorage.setItem('je_dark', JSON.stringify(dark)), [dark]);
  const login = (id) => setCurrentUser(users.find(u=>u.id===id));
  const logout = () => setCurrentUser(null);
  const addAssignment = (data) => setAssignments([...assignments, {...data, id:'as'+Date.now()}]);
  const updateAssignment = (id, data) => setAssignments(assignments.map(a=>a.id===id?{...a,...data}:a));
  const deleteAssignment = (id) => { if(confirm('Delete assignment?')) setAssignments(assignments.filter(a=>a.id!==id)); };
  const submitAssignment = (aid) => { if(!submissions.find(s=>s.assignmentId===aid && s.studentId===currentUser.id)){ setSubmissions([...submissions, {assignmentId:aid, studentId:currentUser.id, status:'submitted', date: new Date().toISOString()}]); }};
  return <AppContext.Provider value={{users, currentUser, assignments, submissions, dark, setDark, loading, login, logout, addAssignment, updateAssignment, deleteAssignment, submitAssignment}}>{children}</AppContext.Provider>
};
export const useApp = () => useContext(AppContext);