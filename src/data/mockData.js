export const users = [
  {id:'a1', name:'Dr. Sharma', role:'admin', avatar:'https://i.pravatar.cc/100?img=1'},
  {id:'a2', name:'Prof. Suhitha', role:'admin', avatar:'https://i.pravatar.cc/100?img=5'},
  {id:'s1', name:'Trupti Ramteke', role:'student', avatar:'https://i.pravatar.cc/100?img=32'},
  {id:'s2', name:'Rahul Verma', role:'student', avatar:'https://i.pravatar.cc/100?img=12'},
  {id:'s3', name:'Siddharth Thakur', role:'student', avatar:'https://i.pravatar.cc/100?img=15'},
  {id:'s4', name:'Priya Singh', role:'student', avatar:'https://i.pravatar.cc/100?img=26'},
  {id:'s5', name:'Aman Kumar', role:'student', avatar:'https://i.pravatar.cc/100?img=18'},
];
export const initialAssignments = [
  {id:'as1', title:'React Portfolio Project', description:'Build portfolio with React and Tailwind CSS', dueDate:'2026-11-10', driveLink:'https://drive.google.com', createdBy:'a1', assignedTo:['s1','s2','s3','s4','s5']},
  {id:'as2', title:'Tailwind Dashboard', description:'Dashboard with search filter and dark mode', dueDate:'2026-11-05', driveLink:'https://drive.google.com', createdBy:'a1', assignedTo:['s1','s2']},
  {id:'as3', title:'API Integration Task', description:'Integrate mock API and show loading states', dueDate:'2026-11-01', driveLink:'https://drive.google.com', createdBy:'a2', assignedTo:['s1','s3','s5']},
];