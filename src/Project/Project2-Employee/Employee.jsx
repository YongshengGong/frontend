import React,{useState,useEffect} from 'react'
import {HashLink} from 'react-router-hash-link'
import './Employee.css'
import Male from './male.jpg'
import Female from './female.jpg'

const Employee=()=>{
    const [employee,setEmployee]=useState([{id: 1,
        fullName: "Bob Jones",
        designation: "JavaScript Developer",
        gender: "male",
        teamName: "TeamA",
        edit:false,
      },
      {
        id: 2,
        fullName: "Jill Bailey",
        designation: "Node Developer",
        gender: "female",
        teamName: "TeamA",
        edit:false,
      },
      {
        id: 3,
        fullName: "Gail Shepherd",
        designation: "Java Developer",
        gender: "female",
        teamName: "TeamA",
        edit:false,
      }, {
        id: 4,
        fullName: "Sam Reynolds",
        designation: "React Developer",
        gender: "male",
        teamName: "TeamB",
        edit:false,
      },
      {
        id: 5,
        fullName: "David Henry",
        designation: "DotNet Developer",
        gender: "male",
        teamName: "TeamB",
        edit:false,
      },
      {
        id: 6,
        fullName: "Sarah Blake",
        designation: "SQL Server DBA",
        gender: "female",
        teamName: "TeamB",
        edit:false,
      },
      {
        id: 7,
        fullName: "James Bennet",
        designation: "Angular Developer",
        gender: "male",
        teamName: "TeamC",
        edit:false,
      },{
        id: 8,
        fullName: "Jessica Faye",
        designation: "API Developer",
        gender: "female",
        teamName: "TeamC",
        edit:false,
      },
      {
        id: 9,
        fullName: "Lita Stone",
        designation: "C++ Developer",
        gender: "female",
        teamName: "TeamC",
        edit:false,
      },
      {
        id: 10,
        fullName: "Daniel Young",
        designation: "Python Developer",
        gender: "male",
        teamName: "TeamD",
        edit:false,
      },
      {
        id: 11,
        fullName: "Adrian Jacobs",
        designation: "Vue Developer",
        gender: "male",
        teamName: "TeamD",
        edit:false,
      }, {
        id: 12,
        fullName: "Devin Monroe",
        designation: "Graphic Designer",
        gender: "male",
        teamName: "TeamD",
        edit:false,
      }]);

const [team,setTeam]=useState('ALL');

const [add,setAdd]=useState(false);
const [name,setName]=useState('');
const [designation,setDesignation]=useState('');
const [teamInput,setTeamInput]=useState('');
const [gender,setGender]=useState('');


const [editName,setEditName]=useState('');
const [editDesignation,setEditDesignation]=useState('');
const [editTeamInput,setEditTeamInput]=useState('');
const [editGender,setEditGender]=useState('');

const [editDisable,setEditDisable]=useState(false);

const handleClickCard=(id1)=>{
   const x = employee.map((em)=>
     (em.id===id1?(team!=='ALL'?(em):({...em,teamName:'Not in a team yet'})):(em))
   );
   setEmployee(x);
   setEditTeamInput('Not in a team yet');
}

const handleAddNewMember=()=>{
setAdd(true);
setGender('female');
setTeamInput('TeamA');
}

const handleAddCancel=()=>{
setAdd(false);
setName('');
setDesignation('');
}

const handleAddSave=(name,desig,gender,team)=>{
  setEmployee([...employee,{id:employee.length+1,fullName:name,designation:desig,gender:gender,teamName:team,edit:false}])
  setAdd(false);
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
  setName('');
  setDesignation('');
}

const handleEdit=(id,name,desig,gender,team)=>{
   const employees=employee.map(em=>em.id===id?({...em,edit:true}):(em));
   setEmployee(employees);
   setEditName(name);
   setEditDesignation(desig);
   setEditGender(gender);
   setEditTeamInput(team);
   setEditDisable(true);
}

const handleEditCancel=(id)=>{
    const employees=employee.map(em=>em.id===id?({...em,edit:false}):(em));
    setEmployee(employees);
    setEditDisable(false);
}

const handleEditSave=(id,name,desig,gender,team)=>{
    const employees=employee.map(em=>em.id===id?({...em,fullName:name,designation:desig,gender:gender,teamName:team,edit:false}):(em));
   setEmployee(employees);
   setEditDisable(false);
   setEditName('');
   setEditDesignation('');
   setEditGender('');
   setEditTeamInput('Not in a team yet');
}

const handleSort=()=>{
    setEmployee([...employee].sort((a,b)=>a.teamName.localeCompare(b.teamName)));
}

const [filteredEmployee, setFilteredEmployee] = useState([]);

useEffect(() => {
  const filteredEmployees = employee.filter((em) => em.teamName === team);
  setFilteredEmployee(filteredEmployees);
}, [employee, team]);


return(
    <div className='employee-project'>

        <div style={{ display: 'flex', flexDirection:'column',marginTop: 30,position:'fixed',left:10 }}>
            <div className='sort' onClick={handleSort}>sort</div>
            <div className="addMemberBtn" onClick={handleAddNewMember}><h1 style={{fontSize:"60px",transform:"translateY(-6px)"}}>+</h1></div>
            <div>{add === true ?
                (<div className="addMemberInput">
                    <div style={{ display: "flex", justifyContent: 'space-between',color:'white' }}>FullName:<input value={name} placeholder="Name" onChange={e => setName(e.target.value)} /></div>
                    <div style={{ display: "flex", justifyContent: 'space-between',color:'white' }}>Designation:<input value={designation} placeholder="Title" onChange={e => setDesignation(e.target.value)} /></div>
                    <div style={{ display: "flex", justifyContent: 'space-between',color:'white'}}>Gender:<input value={gender} placeholder="male/female" onChange={e => setGender(e.target.value)} /></div>
                    <div style={{ display: "flex", justifyContent: 'space-between',color:'white' }}>Team:<input value={teamInput} placeholder="TeamA/B/C/D" onChange={e => setTeamInput(e.target.value)} /></div>
                    <button onClick={() => { handleAddSave(name, designation, gender, teamInput) }}>Save</button>
                    <button onClick={handleAddCancel}>Cancel</button>
                </div>) : (<div style={{fontSize:'20px',transform:"translateX(6px)",transition:'0.6s ease-out'}}>Add</div>)}
            </div>
        </div>


        <HashLink to='/#project-blank'>Go Back</HashLink>
        <select className='selection' value={team} onChange={e => {setTeam(e.target.value)}}>
            <option>ALL</option>
            <option>TeamA</option>
            <option>TeamB</option>
            <option>TeamC</option>
            <option>TeamD</option>
        </select>

        
        <div className='card-container'>
            {team!=='ALL'?(filteredEmployee.map((em) => (
                em.edit===false?
                (<div>
                    <div key={em.id} id='card' className={em.teamName === 'TeamA' ? ('cardA') :
                        (em.teamName === 'TeamB' ? ('cardB') : (em.teamName === 'TeamC' ? ('cardC') : (em.teamName==='TeamD'?('cardD'):('cardNone'))))}
                        onClick={() => handleClickCard(em.id)}>
                        <div ><img src={em.gender === 'male' ? Male : Female} style={{ height: 100 }} /></div>
                        <div style={{ textAlign: "left" }}>
                            <div><b>Full Name: </b>{em.fullName}</div>
                            <div> <b>Designation: </b>{em.designation} </div>
                            <div><b>{em.teamName}</b></div>
                        </div>
                    </div>
                    <button style={{ marginLeft: '35%' }} onClick={()=>{handleEdit(em.id,em.fullName,em.designation,em.gender,em.teamName)}} disabled={editDisable}>Edit Profile</button>
                </div>):
                (<div className="addMemberInput">
                <div style={{ display: "flex", justifyContent: 'space-between' }}>FullName:<input  value={editName} placeholder="Name" onChange={e=>setEditName(e.target.value)}/></div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Designation:<input value={editDesignation} placeholder="Title" onChange={e=>setEditDesignation(e.target.value)}/></div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Gender:<input  value={editGender} placeholder="male/female" onChange={e=>setEditGender(e.target.value)}/></div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Team:<input value={editTeamInput} placeholder="TeamA/B/C/D" onChange={e=>setEditTeamInput(e.target.value)}/></div>
                <button onClick={()=>{handleEditSave(em.id,editName,editDesignation,editGender,editTeamInput)}}>Save</button>
                <button onClick={()=>{handleEditCancel(em.id)}}>Cancel</button>
                </div>)
           
                
            ))):(employee.map((em) => (
                em.edit===false?
                (<div>
                    <div key={em.id} className={em.teamName === 'TeamA' ? ('cardA') :
                        (em.teamName === 'TeamB' ? ('cardB') : (em.teamName === 'TeamC' ? ('cardC') : (em.teamName==='TeamD'?('cardD'):('cardNone'))))}
                        onClick={() => handleClickCard(em.id)}>
                        <div ><img src={em.gender === 'male' ? Male : Female} style={{ maxHeight: '70%',maxWidth:'70%' }} /></div>
                        <div style={{ textAlign: "left",marginTop:'-40%',fontSize:'calc(1vh + 1vw)'}}>
                            <div><b>Full Name: </b>{em.fullName}</div>
                            <div> <b>Designation: </b>{em.designation} </div>
                            <div><b>{em.teamName}</b></div>
                        </div>
                    </div>
                    <button style={{ marginLeft: '35%' }} onClick={()=>{handleEdit(em.id,em.fullName,em.designation,em.gender,em.teamName)}} disabled={editDisable}>Edit Profile</button>
                </div>):
                (<div className="addMemberInput">
                <div style={{ display: "flex", justifyContent: 'space-between' }}>FullName:<input  value={editName} placeholder="Name" onChange={e=>setEditName(e.target.value)}/></div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Designation:<input value={editDesignation} placeholder="Title" onChange={e=>setEditDesignation(e.target.value)}/></div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Gender:<input  value={editGender} placeholder="male/female" onChange={e=>setEditGender(e.target.value)}/></div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>Team:<input value={editTeamInput} placeholder="TeamA/B/C/D" onChange={e=>setEditTeamInput(e.target.value)}/></div>
                <button onClick={()=>{handleEditSave(em.id,editName,editDesignation,editGender,editTeamInput)}}>Save</button>
                <button onClick={()=>{handleEditCancel(em.id)}}>Cancel</button>
                </div>)
           
                
            )))}
        </div>


    </div>
)
}

export default Employee;