


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext"; // Assuming you have this context for auth
// import {
//   User,
//   Mail,
//   Shield,
//   Clock,
//   Building,
//   Users,
//   Briefcase,
//   Loader2,
// } from "lucide-react";

// // --- ⚙️ API Service Configuration & Functions ---

// // Set up the base URL for your Spring Boot backend
// const API_URL = "http://localhost:8080/api"; // Make sure this port is correct

// // Create an Axios instance for API requests
// const apiClient = axios.create({
//   baseURL: API_URL,
// });

// // Interceptor to automatically add the Authorization header to every request
// // It assumes you store the user's JWT in localStorage after login
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Super Admin API Functions
// const getAllEntities = () => apiClient.get("/superadmin/entities/entities");
// const deactivateEntity = (id) =>
//   apiClient.put(`/superadmin/entities/${id}/deactivate`);
// const assignAdmin = (id, adminId) =>
//   apiClient.put(`/superadmin/entities/${id}/assign-admin?adminId=${adminId}`);

// // Admin API Functions
// const getEntityByAdminId = (adminId) =>
//   apiClient.get(`/admin/entity/${adminId}`);
// const addITAdmin = (adminId, itAdminId) =>
//   apiClient.put(`/admin/entity/${adminId}/add-itadmin?itAdminId=${itAdminId}`);
// const removeITAdmin = (adminId, itAdminId) =>
//   apiClient.put(
//     `/admin/entity/${adminId}/remove-itadmin?itAdminId=${itAdminId}`
//   );

// // IT Admin API Functions
// const getEntityByITAdminId = (itAdminId) =>
//   apiClient.get(`/itadmin/entity/${itAdminId}`);
// const getAllITAdmins = (itAdminId) =>
//   apiClient.get(`/itadmin/entity/${itAdminId}/itadmins`);

// // --- 🔄 Reusable Loader Component ---
// const LoadingSpinner = () => (
//   <div className="flex items-center justify-center p-4 text-gray-500">
//     <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
//     <span className="ml-2">Loading data...</span>
//   </div>
// );

// // --- 🧩 Role-Specific Dashboard Components ---

// const SuperAdminDashboard = ({ currentUser }) => {
//   const [entities, setEntities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getAllEntities()
//       .then((response) => {
//         setEntities(response.data);
//       })
//       .catch((err) => {
//         setError(
//           "Access Denied or Failed to fetch entities. Ensure you have SUPER_ADMIN rights."
//         );
//         console.error("SuperAdminDashboard Error:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p className="text-red-500 px-4">{error}</p>;

//   return (
//     <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//       <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center">
//         <Briefcase className="mr-2 h-5 w-5" /> Super Admin Panel
//       </h3>
//       <div className="space-y-2">
//         <h4 className="font-bold">Managed Entities:</h4>
//         {entities.length > 0 ? (
//           entities.map((entity) => (
//             <div
//               key={entity.id}
//               className="p-3 border rounded bg-white flex justify-between items-center shadow-sm"
//             >
//               <span>
//                 {entity.name} -{" "}
//                 <span
//                   className={
//                     entity.active
//                       ? "text-green-600 font-semibold"
//                       : "text-red-600 font-semibold"
//                   }
//                 >
//                   {entity.active ? "Active" : "Inactive"}
//                 </span>
//               </span>
//               <div className="flex gap-2">
//                 <button className="text-xs bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors">
//                   Assign Admin
//                 </button>
//                 <button className="text-xs bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors">
//                   Deactivate
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No entities found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const AdminDashboard = ({ currentUser }) => {
//   const [entity, setEntity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (currentUser?.id) {
//       getEntityByAdminId(currentUser.id)
//         .then((response) => {
//           setEntity(response.data);
//         })
//         .catch((err) => {
//           setError("Access Denied or Failed to fetch entity details.");
//           console.error("AdminDashboard Error:", err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [currentUser]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p className="text-red-500 px-4">{error}</p>;
//   if (!entity)
//     return (
//       <p className="text-gray-500 px-4">No entity assigned to this admin.</p>
//     );

//   return (
//     <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//       <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
//         <Building className="mr-2 h-5 w-5" /> Company Admin Panel
//       </h3>
//       <div>
//         <h4 className="font-bold text-gray-800">Entity: {entity.name}</h4>
//         <p className="text-sm text-gray-600 mb-3">{entity.description}</p>
//         <h5 className="font-semibold mt-4">IT Admins:</h5>
//         <ul className="list-disc list-inside text-sm text-gray-700">
//           {entity.itAdminIds.length > 0 ? (
//             entity.itAdminIds.map((id) => <li key={id}>{id}</li>)
//           ) : (
//             <li>No IT Admins assigned.</li>
//           )}
//         </ul>
//         <div className="mt-4 flex gap-2">
//           <button className="text-xs bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors">
//             Add IT Admin
//           </button>
//           <button className="text-xs bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 transition-colors">
//             Update Info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ITAdminDashboard = ({ currentUser }) => {
//   const [entity, setEntity] = useState(null);
//   const [itAdmins, setItAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (currentUser?.id) {
//       Promise.all([
//         getEntityByITAdminId(currentUser.id),
//         getAllITAdmins(currentUser.id),
//       ])
//         .then(([entityRes, itAdminsRes]) => {
//           setEntity(entityRes.data);
//           setItAdmins(itAdminsRes.data);
//         })
//         .catch((err) => {
//           setError("Access Denied or Failed to fetch IT Admin data.");
//           console.error("ITAdminDashboard Error:", err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [currentUser]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p className="text-red-500 px-4">{error}</p>;

//   return (
//     <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//       <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
//         <Users className="mr-2 h-5 w-5" /> IT Admin Panel
//       </h3>
//       {entity && (
//         <p className="text-gray-700">
//           You are an IT Admin for: <strong>{entity.name}</strong>
//         </p>
//       )}
//       <h5 className="font-semibold mt-4">Fellow IT Admins:</h5>
//       <ul className="list-disc list-inside text-sm text-gray-700">
//         {itAdmins.length > 0 ? (
//           itAdmins.map((id) => <li key={id}>{id}</li>)
//         ) : (
//           <li>No other IT Admins found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// const UserDashboard = () => (
//   <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//     <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Role</h3>
//     <p className="text-sm text-gray-600">
//       As a user, you can join teams, participate in channels, and start
//       one-on-one conversations. Enjoy collaborating!
//     </p>
//   </div>
// );

// // ---  hlavní Main Profile Dashboard Component ---

// const ProfileDashboard = ({ currentUser }) => {
//   const { logout } = useAuth();

//   const renderRoleDashboard = () => {
//     if (!currentUser) return null;
//     switch (currentUser.role) {
//       case "SUPER_ADMIN":
//         return <SuperAdminDashboard currentUser={currentUser} />;
//       case "ADMIN":
//         return <AdminDashboard currentUser={currentUser} />;
//       case "IT_ADMIN":
//         return <ITAdminDashboard currentUser={currentUser} />;
//       case "USER":
//         return <UserDashboard />;
//       default:
//         return (
//           <p className="mt-4 text-gray-500 px-4">
//             Role dashboard not available.
//           </p>
//         );
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div className="flex items-center justify-center h-full p-6">
//         <p className="text-gray-500">Loading user data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
//       <h2 className="text-2xl font-bold text-purple-700 mb-6">My Profile</h2>

//       <div className="flex items-center space-x-6 mb-6">
//         <div className="w-20 h-20 bg-purple-600 text-white flex items-center justify-center text-2xl font-bold rounded-full">
//           {currentUser.username
//             ? currentUser.username.charAt(0).toUpperCase()
//             : "U"}
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800">
//             {currentUser.username || "Unknown User"}
//           </h3>
//           <p className="text-gray-500">{currentUser.role || "User"}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="flex items-center space-x-3">
//           <User className="text-purple-500" />
//           <span className="text-gray-700">
//             <strong>ID:</strong> {currentUser.id || "N/A"}
//           </span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Mail className="text-purple-500" />
//           <span className="text-gray-700">
//             <strong>Email:</strong> {currentUser.email || "Not Provided"}
//           </span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Shield className="text-purple-500" />
//           <span className="text-gray-700">
//             <strong>Role:</strong> {currentUser.role || "User"}
//           </span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Clock className="text-purple-500" />
//           <span className="text-gray-700">
//             <strong>Status:</strong> {currentUser.status || "Active"}
//           </span>
//         </div>
//       </div>

//       <hr className="my-8" />

//       <div>
//         <h2 className="text-xl font-bold text-gray-800 mb-2">
//           Roles & Responsibilities
//         </h2>
//         {renderRoleDashboard()}
//       </div>

//       <div className="mt-8">
//         <button
//           onClick={logout}
//           className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User, Mail, Shield, Clock, Briefcase, Loader2, LogOut, Building, UserPlus, Edit, Trash2, X, PlusCircle,
  ToggleLeft, ToggleRight, Users, MessageSquare, ShieldCheck, MailPlus
} from "lucide-react";

// --- MOCK DATABASE (for demonstration purposes) ---

const MOCK_ENTITIES = [
  { id: 'ent_1', name: 'Global Tech Inc.', plan: 'Enterprise', status: 'Active', companyAdminId: 'user_2' },
  { id: 'ent_2', name: 'Innovate Solutions LLC', plan: 'Business', status: 'Active', companyAdminId: 'user_6' },
  { id: 'ent_3', name: 'Legacy Systems', plan: 'Free', status: 'Inactive', companyAdminId: null },
];

const MOCK_USERS = [
  { id: 'user_1', name: 'Alice (SA)', email: 'alice@platform.com', role: 'SUPER_ADMIN', entityId: null },
  { id: 'user_2', name: 'Bob (Admin)', email: 'bob@globaltech.com', role: 'ADMIN', entityId: 'ent_1' },
  { id: 'user_3', name: 'Charlie (IT)', email: 'charlie@globaltech.com', role: 'IT_ADMIN', entityId: 'ent_1' },
  { id: 'user_4', name: 'David (User)', email: 'david@globaltech.com', role: 'USER', entityId: 'ent_1' },
  { id: 'user_5', name: 'Eve (User)', email: 'eve@globaltech.com', role: 'USER', entityId: 'ent_1' },
  { id: 'user_6', name: 'Frank (Admin)', email: 'frank@innovate.com', role: 'ADMIN', entityId: 'ent_2' },
];

const MOCK_TEAMS = {
  'ent_1': [
    { id: 'team_1', name: 'Engineering', channels: [{ id: 'chan_1', name: 'general' }, { id: 'chan_2', name: 'random' }] },
    { id: 'team_2', name: 'Marketing', channels: [{ id: 'chan_3', name: 'campaigns' }] },
  ],
  'ent_2': [
    { id: 'team_3', name: 'Sales', channels: [{ id: 'chan_4', name: 'leads' }] },
  ],
};

// --- HELPER / REUSABLE COMPONENTS ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

// --- ROLE-SPECIFIC DASHBOARDS ---

// 🟣 Super Admin Dashboard
const SuperAdminDashboard = () => {
  const [entities, setEntities] = useState(MOCK_ENTITIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);

  const openModal = (entity = null) => {
    setEditingEntity(entity);
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);

  const handleSaveEntity = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entityData = { name: formData.get('name'), plan: formData.get('plan') };

    if (editingEntity) { // Update
      setEntities(entities.map(ent => ent.id === editingEntity.id ? { ...ent, ...entityData } : ent));
    } else { // Create
      const newEntity = { ...entityData, id: `ent_${Date.now()}`, status: 'Active', companyAdminId: null };
      setEntities([...entities, newEntity]);
    }
    closeModal();
  };

  const handleDeactivate = (entityId) => {
    setEntities(entities.map(ent => ent.id === entityId ? { ...ent, status: ent.status === 'Active' ? 'Inactive' : 'Active' } : ent));
  };

  return (
    <div className="mt-4 space-y-4">
        <h3 className="text-lg font-semibold text-purple-700 flex items-center"><Briefcase className="mr-2"/> Super Admin Panel</h3>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <PlusCircle size={18} /> Create New Entity
        </button>
        <div className="border rounded-lg bg-gray-50 p-4 space-y-3">
            {entities.map(entity => (
                <div key={entity.id} className="p-3 border rounded bg-white flex justify-between items-center shadow-sm">
                    <div>
                        <p className="font-bold">{entity.name} <span className="text-sm font-normal text-gray-500">({entity.plan} Plan)</span></p>
                        <p className={`text-xs font-semibold ${entity.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{entity.status}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => alert(`Assigning admin for ${entity.name}...`)} className="p-2 text-gray-600 hover:text-blue-600"><UserPlus size={18} /></button>
                        <button onClick={() => openModal(entity)} className="p-2 text-gray-600 hover:text-yellow-600"><Edit size={18} /></button>
                        <button onClick={() => handleDeactivate(entity.id)} className="p-2 text-gray-600 hover:text-red-600">
                            {entity.status === 'Active' ? <ToggleRight size={18} className="text-red-500"/> : <ToggleLeft size={18}/>}
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title={editingEntity ? 'Edit Entity' : 'Create Entity'}>
            <form onSubmit={handleSaveEntity} className="space-y-4">
                <input name="name" defaultValue={editingEntity?.name} placeholder="Entity Name" required className="w-full p-2 border rounded"/>
                <select name="plan" defaultValue={editingEntity?.plan || 'Business'} className="w-full p-2 border rounded">
                    <option>Free</option>
                    <option>Business</option>
                    <option>Enterprise</option>
                </select>
                <button type="submit" className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Save Entity</button>
            </form>
        </Modal>
    </div>
  );
};

// 🔵 Admin (Company Admin) Dashboard
const AdminDashboard = ({ currentUser }) => {
    const [users, setUsers] = useState(MOCK_USERS.filter(u => u.entityId === currentUser.entityId));
    const [companyStatus, setCompanyStatus] = useState('Active');

    const handleRemoveUser = (userId) => {
        setUsers(users.filter(u => u.id !== userId));
    };

    return (
        <div className="mt-4 space-y-6">
            <h3 className="text-lg font-semibold text-blue-700 flex items-center"><Building className="mr-2"/> Company Admin Panel</h3>
            {/* User Management */}
            <div>
                <h4 className="font-bold mb-2 flex items-center gap-2"><Users/> User Management</h4>
                 <div className="border rounded-lg bg-gray-50 p-4 space-y-3">
                    {users.map(user => (
                        <div key={user.id} className="p-3 border rounded bg-white flex justify-between items-center shadow-sm">
                            <div>
                                <p className="font-bold">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email} - <span className="font-semibold">{user.role}</span></p>
                            </div>
                            <button onClick={() => handleRemoveUser(user.id)} className="p-2 text-gray-600 hover:text-red-600"><Trash2 size={18}/></button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Company Settings */}
            <div>
                <h4 className="font-bold mb-2">Company Settings</h4>
                <div className="border rounded-lg bg-gray-50 p-4 flex justify-between items-center">
                    <p>Company Status: <span className="font-bold">{companyStatus}</span></p>
                    <button onClick={() => setCompanyStatus(s => s === 'Active' ? 'Inactive' : 'Active')} className="flex items-center gap-2 text-sm px-3 py-1 bg-gray-200 rounded-full">
                        {companyStatus === 'Active' ? <ToggleRight className="text-green-500"/> : <ToggleLeft/>} {companyStatus === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// 🟢 IT Admin Dashboard
const ITAdminDashboard = ({ currentUser }) => {
    const [teams, setTeams] = useState(MOCK_TEAMS[currentUser.entityId] || []);
    
    const handleAddChannel = (teamId) => {
        const channelName = prompt("Enter new channel name:");
        if (!channelName) return;
        setTeams(teams.map(t => t.id === teamId ? { ...t, channels: [...t.channels, {id: `chan_${Date.now()}`, name: channelName}] } : t));
    };

    return (
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold text-green-700 flex items-center"><ShieldCheck className="mr-2"/> IT Admin Panel</h3>
             <div className="border rounded-lg bg-gray-50 p-4 space-y-3">
                <h4 className="font-bold mb-2">Team & Channel Management</h4>
                 {teams.map(team => (
                    <div key={team.id} className="p-3 border rounded bg-white shadow-sm">
                        <div className="flex justify-between items-center">
                           <p className="font-bold">{team.name}</p>
                           <button onClick={() => handleAddChannel(team.id)} className="p-2 text-gray-600 hover:text-green-600"><PlusCircle size={18}/></button>
                        </div>
                        <ul className="list-disc pl-6 mt-2 text-sm text-gray-600">
                           {team.channels.map(ch => <li key={ch.id}>#{ch.name}</li>)}
                        </ul>
                    </div>
                ))}
             </div>
             <div className="border rounded-lg bg-gray-50 p-4">
                <h4 className="font-bold mb-2">Invite Users</h4>
                <div className="flex gap-2">
                    <input type="email" placeholder="user@example.com" className="flex-grow p-2 border rounded"/>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><MailPlus size={18}/> Invite</button>
                </div>
             </div>
        </div>
    );
};

// 🟠 User Dashboard
const UserDashboard = ({ currentUser }) => {
    const [teams, setTeams] = useState(MOCK_TEAMS[currentUser.entityId] || []);

    return (
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold text-orange-700 flex items-center"><MessageSquare className="mr-2"/> Your Dashboard</h3>
            <div className="border rounded-lg bg-gray-50 p-4 space-y-3">
                <h4 className="font-bold mb-2">Your Teams & Channels</h4>
                {teams.map(team => (
                    <div key={team.id} className="p-3 border rounded bg-white shadow-sm">
                        <p className="font-bold">{team.name}</p>
                        <ul className="list-disc pl-6 mt-2 text-sm text-gray-600">
                           {team.channels.map(ch => <li key={ch.id}>#{ch.name}</li>)}
                        </ul>
                    </div>
                ))}
                <button className="flex items-center gap-2 mt-2 text-sm text-orange-600 hover:text-orange-800">
                    <PlusCircle size={18}/> Create New Channel
                </button>
            </div>
        </div>
    );
};

// --- MAIN PROFILE DASHBOARD COMPONENT ---

const ProfileDashboard = () => {
  const { currentUser, logout } = useAuth();

  const renderRoleDashboard = () => {
    if (!currentUser) return <Loader2 className="animate-spin" />;
    
    // FOR DEMONSTRATION: Allow switching roles to test UI
    // In a real app, currentUser.role would be fixed.
    // const [role, setRole] = useState(currentUser.role);
    // const testUser = {...currentUser, role};
    // And add a <select onChange={(e) => setRole(e.target.value)}>...</select>

    switch (currentUser.role) {
      case "SUPER_ADMIN": return <SuperAdminDashboard currentUser={currentUser} />;
      case "ADMIN": return <AdminDashboard currentUser={currentUser} />;
      case "IT_ADMIN": return <ITAdminDashboard currentUser={currentUser} />;
      case "USER": return <UserDashboard currentUser={currentUser} />;
      default: return <p className="mt-4 text-gray-500">Role dashboard not available.</p>;
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-purple-500 h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                 <button onClick={logout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                </button>
            </div>

            <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 bg-purple-600 text-white flex items-center justify-center text-3xl font-bold rounded-full">
                {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{currentUser.username}</h3>
                    <p className="text-gray-500 capitalize">{currentUser.role?.replace("_", " ").toLowerCase()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg"><User className="text-purple-500"/><span><strong>ID:</strong> {currentUser.id}</span></div>
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg"><Mail className="text-purple-500"/><span><strong>Email:</strong> {currentUser.email}</span></div>
            </div>

            <hr className="my-8" />

            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Roles & Responsibilities</h2>
                {renderRoleDashboard()}
            </div>
        </div>
    </div>
  );
};

export default ProfileDashboard;