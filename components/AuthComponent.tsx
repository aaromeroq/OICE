import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { iberoamericanCountries } from '../data/countries';
import { useLanguage } from '../i18n';
import { UsersIcon, BriefcaseIcon } from './Icons';

interface AuthComponentProps {
  onAuthSuccess?: () => void;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ onAuthSuccess }) => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [country, setCountry] = useState(iberoamericanCountries[0].name);
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        if (onAuthSuccess) onAuthSuccess();
      } else {
        // Validation
        if (password !== confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }
        if (!name.trim() || !institution.trim()) {
          throw new Error('Por favor, completa todos los campos');
        }

        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create User Profile in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: name.trim(),
          email: email.trim(),
          institution: institution.trim(),
          country: country,
          role: 'member',
          approved: false, // Needs admin approval
          createdAt: serverTimestamp()
        });

        setSuccessMessage('Cuenta creada con éxito. Un administrador científico de RIPCEL revisará y aprobará tu perfil antes de que puedas publicar proyectos.');
        // Clear fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setInstitution('');
        setIsLogin(true); // Switch to login tab
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || 'Ocurrió un error inesperado';
      if (err.code === 'auth/email-already-in-use') {
        errMsg = 'El correo electrónico ya está registrado.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'El correo electrónico no es válido.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errMsg = 'Correo o contraseña incorrectos.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-stone-200 shadow-editorial p-8 relative z-10 my-8">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-moss-50 rounded-xl border border-moss-100">
          <UsersIcon className="h-8 w-8 text-moss-700" />
        </div>
      </div>

      <h3 className="font-display text-2xl text-center text-ink mb-2">
        {isLogin ? 'Acceso de Investigadores' : 'Registro de Colaborador'}
      </h3>
      <p className="text-xs text-center text-ink/60 mb-6 font-mono tracking-tight">
        {isLogin 
          ? 'Ingresa tus credenciales para registrar comunidades energéticas' 
          : 'Únete a la red científica RIPCEL para registrar nuevos proyectos'}
      </p>

      {/* Tabs */}
      <div className="flex border-b hairline mb-6">
        <button
          onClick={() => { setIsLogin(true); setError(null); setSuccessMessage(null); }}
          className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider text-center transition-all ${
            isLogin ? 'border-b-2 border-moss-700 text-moss-900' : 'text-ink/40 hover:text-ink'
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => { setIsLogin(false); setError(null); setSuccessMessage(null); }}
          className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider text-center transition-all ${
            !isLogin ? 'border-b-2 border-moss-700 text-moss-900' : 'text-ink/40 hover:text-ink'
          }`}
        >
          Registrarse
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl font-sans">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-xl font-sans">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        {!isLogin && (
          <>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                placeholder="ej. Dr. Andrés Romero"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Institución / Universidad</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                placeholder="ej. Universidad Nacional de San Juan"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">País de Investigación</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm bg-white"
              >
                {iberoamericanCountries.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
            placeholder="ej. correo@institucion.edu"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
            placeholder="••••••••"
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-moss-900 hover:bg-ink text-ivory-50 font-semibold rounded-full transition-all text-sm mt-6 font-mono"
        >
          {loading ? 'Procesando...' : isLogin ? 'Ingresar' : 'Solicitar Registro'}
        </button>
      </form>
    </div>
  );
};
