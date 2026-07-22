import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { UsersIcon, BriefcaseIcon } from './Icons';

export const AdminDashboard: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [pendingCommunities, setPendingCommunities] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const fetchPendingData = async () => {
    try {
      // 1. Fetch pending users
      const usersQuery = query(collection(db, 'users'), where('approved', '==', false));
      const usersSnapshot = await getDocs(usersQuery);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingUsers(usersList);
      setLoadingUsers(false);

      // 2. Fetch pending communities
      const commsQuery = query(collection(db, 'communities'), where('approved', '==', false));
      const commsSnapshot = await getDocs(commsQuery);
      const commsList = commsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingCommunities(commsList);
      setLoadingCommunities(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  const approveUser = async (userId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { approved: true });
      setMessage('Usuario aprobado con éxito.');
      setPendingUsers(pendingUsers.filter(u => u.id !== userId));
    } catch (err) {
      console.error(err);
      alert('Error al aprobar el usuario.');
    }
  };

  const approveCommunity = async (commId: string) => {
    try {
      await updateDoc(doc(db, 'communities', commId), { approved: true });
      setMessage('Comunidad aprobada y publicada en el Atlas.');
      setPendingCommunities(pendingCommunities.filter(c => c.id !== commId));
    } catch (err) {
      console.error(err);
      alert('Error al aprobar la comunidad.');
    }
  };

  const rejectCommunity = async (commId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas rechazar y eliminar esta propuesta?')) return;
    try {
      await deleteDoc(doc(db, 'communities', commId));
      setMessage('Propuesta rechazada y eliminada.');
      setPendingCommunities(pendingCommunities.filter(c => c.id !== commId));
    } catch (err) {
      console.error(err);
      alert('Error al rechazar la comunidad.');
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 px-6 flex-grow">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-ink mb-2 font-display">
            Panel de Administración Científica
          </h2>
          <p className="text-xs text-ink/65 font-mono uppercase tracking-wider">
            Moderación de perfiles y validación de comunidades
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-xl font-sans text-center">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          
          {/* Section 1: Pending Users */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-editorial p-6">
            <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
              <UsersIcon className="h-5 w-5 text-moss-700" />
              <h4 className="font-display text-lg text-ink font-semibold">Investigadores Pendientes de Aprobación</h4>
            </div>

            {loadingUsers ? (
              <div className="text-center py-6 text-sm text-ink/50 font-mono">Cargando investigadores...</div>
            ) : pendingUsers.length === 0 ? (
              <div className="text-center py-6 text-sm text-ink/40 font-mono">No hay perfiles pendientes de moderación.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b hairline text-ink/50 uppercase font-mono tracking-wider">
                      <th className="py-3 px-4">Nombre</th>
                      <th className="py-3 px-4">Institución / Universidad</th>
                      <th className="py-3 px-4">País</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y hairline text-ink/80">
                    {pendingUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50/50">
                        <td className="py-3.5 px-4 font-semibold">{u.name}</td>
                        <td className="py-3.5 px-4">{u.institution}</td>
                        <td className="py-3.5 px-4">{u.country}</td>
                        <td className="py-3.5 px-4 font-mono">{u.email}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => approveUser(u.id)}
                            className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full text-[10px] font-mono uppercase tracking-wider transition-all"
                          >
                            Aprobar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 2: Pending Communities */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-editorial p-6">
            <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
              <BriefcaseIcon className="h-5 w-5 text-moss-700" />
              <h4 className="font-display text-lg text-ink font-semibold">Propuestas de Comunidades Energéticas</h4>
            </div>

            {loadingCommunities ? (
              <div className="text-center py-6 text-sm text-ink/50 font-mono">Cargando propuestas...</div>
            ) : pendingCommunities.length === 0 ? (
              <div className="text-center py-6 text-sm text-ink/40 font-mono">No hay propuestas de comunidades pendientes.</div>
            ) : (
              <div className="space-y-4">
                {pendingCommunities.map((c) => (
                  <div key={c.id} className="p-5 border hairline rounded-xl hover:shadow-soft transition-all bg-ivory-50/20">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                            {c.status}
                          </span>
                          <span className="text-xs text-ink/55 font-mono">
                            País: <strong>{c.country}</strong> | Coordenadas: [{c.location.lat}, {c.location.lng}]
                          </span>
                        </div>
                        <h5 className="font-display text-xl text-ink font-semibold">{c.name}</h5>
                        <p className="text-xs text-ink/75 leading-relaxed mt-2 max-w-2xl">{c.description}</p>
                        
                        {/* Summary of 4D indicators */}
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] border-t hairline pt-3 font-mono">
                          <div>
                            <span className="text-ink/40 font-bold block uppercase tracking-wider mb-0.5">Tecnología:</span>
                            <span className="text-ink/80">{(c.dimensionTechnology?.techTypes || []).join(', ') || 'N/D'}</span>
                          </div>
                          <div>
                            <span className="text-ink/40 font-bold block uppercase tracking-wider mb-0.5">Gobernanza:</span>
                            <span className="text-ink/80">{c.dimensionGovernance?.legalForm || 'N/D'}</span>
                          </div>
                          <div>
                            <span className="text-ink/40 font-bold block uppercase tracking-wider mb-0.5">Regulación:</span>
                            <span className="text-ink/80">{c.dimensionRegulatoryFinancial?.legalFramework || 'N/D'}</span>
                          </div>
                          <div>
                            <span className="text-ink/40 font-bold block uppercase tracking-wider mb-0.5">Apropiación:</span>
                            <span className="text-ink/80">{c.dimensionSocialAppropriation?.energyPovertyReduction ? 'Mitiga Pobreza' : 'N/D'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => approveCommunity(c.id)}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full text-[10px] font-mono uppercase tracking-wider transition-all"
                        >
                          Aprobar y Publicar
                        </button>
                        <button
                          onClick={() => rejectCommunity(c.id)}
                          className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-700 font-semibold rounded-full text-[10px] font-mono uppercase tracking-wider transition-all"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
