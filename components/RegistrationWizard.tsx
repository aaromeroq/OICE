import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { iberoamericanCountries } from '../data/countries';
import { useLanguage } from '../i18n';
import { BriefcaseIcon, MapIcon, ScaleIcon, UsersIcon, BookOpenIcon, ZapIcon } from './Icons';
import { AuthComponent } from './AuthComponent';

interface RegistrationWizardProps {
  userProfile: {
    uid: string;
    name: string;
    email: string;
    role: string;
    approved: boolean;
  } | null;
  onLoginSuccess: () => void;
}

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ userProfile, onLoginSuccess }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0); // Starts at Step 0: AI Assistant
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AI Assistant states (Step 0)
  const [searchMode, setSearchMode] = useState<'web' | 'text'>('web');
  const [searchQuery, setSearchQuery] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [extractedSummary, setExtractedSummary] = useState<string | null>(null);
  const [extractedGrounding, setExtractedGrounding] = useState<any[]>([]);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => {
    return localStorage.getItem('oice_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
  });

  // Form states
  // Step 1: Identification
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState(iberoamericanCountries[0].name);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [status, setStatus] = useState<'activa' | 'incubacion' | 'estancada' | 'abandonada'>('activa');

  // Step 2: Technology
  const [techTypes, setTechTypes] = useState<string[]>([]);
  const [techTypesCustom, setTechTypesCustom] = useState('');
  const [scaleKw, setScaleKw] = useState('');
  const [storageKwh, setStorageKwh] = useState('');
  const [digitalization, setDigitalization] = useState('');
  const [interoperability, setInteroperability] = useState('');

  // Step 3: Governance
  const [legalForm, setLegalForm] = useState<'cooperative' | 'association' | 'municipal_public' | 'informal' | 'ethnic_indigenous' | 'other'>('cooperative');
  const [legalFormCustom, setLegalFormCustom] = useState('');
  const [membersCount, setMembersCount] = useState('');
  const [decisionMechanism, setDecisionMechanism] = useState('');
  const [ownershipModel, setOwnershipModel] = useState('');
  const [leadershipModel, setLeadershipModel] = useState('');
  const [genderEquity, setGenderEquity] = useState('');
  const [ostromPrinciples, setOstromPrinciples] = useState<number[]>([]); // 1 to 8

  // Step 4: Regulatory & Financial
  const [legalFramework, setLegalFramework] = useState('');
  const [compensationRegime, setCompensationRegime] = useState('');
  const [incentives, setIncentives] = useState('');
  const [financingMechanism, setFinancingMechanism] = useState<string[]>([]);
  const [financingMechanismCustom, setFinancingMechanismCustom] = useState('');

  // Step 5: Social Appropriation & Dissemination
  const [distributiveJustice, setDistributiveJustice] = useState('');
  const [proceduralJustice, setProceduralJustice] = useState('');
  const [recognitionJustice, setRecognitionJustice] = useState('');
  const [restorativeJustice, setRestorativeJustice] = useState('');
  const [energyPoverty, setEnergyPoverty] = useState('');
  const [empowerment, setEmpowerment] = useState('');
  const [openScience, setOpenScience] = useState('');
  const [training, setTraining] = useState('');
  const [communication, setCommunication] = useState('');
  const [territorialArticulation, setTerritorialArticulation] = useState('');

  if (!userProfile) {
    return (
      <div className="bg-ivory-50 py-12 px-6 flex-grow flex flex-col justify-center">
        <div className="max-w-md mx-auto text-center mb-6">
          <h2 className="text-3xl font-black text-ink mb-3 font-display">
            Cargar Comunidad Energética
          </h2>
          <p className="text-sm text-ink/75 max-w-sm mx-auto">
            Para cargar comunidades en el atlas e iniciar el catastro científico, debes ingresar como investigador verificado.
          </p>
        </div>
        <AuthComponent onAuthSuccess={onLoginSuccess} />
      </div>
    );
  }

  if (!userProfile.approved && userProfile.role !== 'admin') {
    return (
      <div className="bg-ivory-50 py-16 px-6 flex-grow flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white border border-stone-200 rounded-2xl shadow-soft">
          <div className="inline-flex p-4 bg-amber-50 rounded-xl border border-amber-100 mb-5">
            <BriefcaseIcon className="h-10 w-10 text-amber-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-ink mb-3 font-sans">Perfil en Revisión Científica</h3>
          <p className="text-sm text-ink/70 leading-relaxed mb-6 font-sans">
            Hola <strong>{userProfile.name}</strong>. Tu cuenta como colaborador de RIPCEL ha sido registrada correctamente. 
            El comité de administración está revisando tus credenciales académicas.
          </p>
          <div className="text-xs bg-amber-50/55 text-amber-800 p-3 rounded-lg border border-amber-100 font-mono">
            Te enviaremos un correo electrónico cuando tu cuenta sea aprobada para la carga de datos.
          </div>
        </div>
      </div>
    );
  }

  const handleTechCheckboxChange = (tech: string) => {
    if (techTypes.includes(tech)) {
      setTechTypes(techTypes.filter((t) => t !== tech));
    } else {
      setTechTypes([...techTypes, tech]);
    }
  };

  const handleFinanceCheckboxChange = (mechanism: string) => {
    if (financingMechanism.includes(mechanism)) {
      setFinancingMechanism(financingMechanism.filter((m) => m !== mechanism));
    } else {
      setFinancingMechanism([...financingMechanism, mechanism]);
    }
  };

  const handleOstromCheckboxChange = (principleNum: number) => {
    if (ostromPrinciples.includes(principleNum)) {
      setOstromPrinciples(ostromPrinciples.filter((p) => p !== principleNum));
    } else {
      setOstromPrinciples([...ostromPrinciples, principleNum]);
    }
  };

  const handleAIExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAiLoading(true);
    setExtractedSummary(null);
    setExtractedGrounding([]);

    const keyToUse = geminiApiKey.trim();
    if (!keyToUse) {
      setError('Por favor, ingresa tu clave API de Gemini.');
      setAiLoading(false);
      return;
    }

    localStorage.setItem('oice_gemini_api_key', keyToUse);

    try {
      const prompt = searchMode === 'web' 
        ? `Busca en Google e identifica los datos del proyecto de comunidad energética o generación distribuida colectiva '${searchQuery.trim()}'.`
        : `Analiza el siguiente texto e identifica los datos de la comunidad energética descrita:\n\n${pastedText.trim()}`;

      const systemPrompt = `Eres un Asistente Científico experto en Comunidades Energéticas para el Observatorio OICE y la red RIPCEL.
Analiza la información proporcionada (o busca en la web sobre ella) y extrae todos los datos técnicos, de gobernanza, regulatorios e impacto social.
Debes responder ÚNICAMENTE con un objeto JSON válido. No agregues explicaciones, introducciones o markdown fuera de las llaves del JSON.
Si no encuentras información para algún campo específico, pon null o un string vacío. No inventes datos.
Estructura JSON requerida obligatoriamente:
{
  "name": "Nombre de la comunidad",
  "description": "Resumen general de los objetivos, historia y participantes del proyecto en español",
  "country": "Nombre del país de Iberoamérica en español (debe coincidir con la lista de 15 países, ej. España, Portugal, México, Costa Rica, Colombia, Brasil, Argentina, Chile, Perú, Ecuador, etc.)",
  "location": {
    "lat": latitud decimal aproximada o real del proyecto,
    "lng": longitud decimal aproximada o real del proyecto
  },
  "status": "activa" | "incubacion" | "estancada" | "abandonada",
  "dimensionTechnology": {
    "techTypes": ["solar_pv", "wind", "hydrokinetic", "biomass", "hybrid", "other"] (lista de tipos presentes, ej. ["solar_pv"]),
    "techTypesCustom": "especificación si hay 'other'",
    "scaleKw": capacidad en kW numérico,
    "storageKwh": capacidad de almacenamiento en kWh numérico (0 si no tiene),
    "digitalization": "descripción breve del equipamiento digital (medidores inteligentes, blockchain, etc.)",
    "interoperability": "descripción de interoperabilidad con la red"
  },
  "dimensionGovernance": {
    "legalForm": "cooperative" | "association" | "municipal_public" | "informal" | "ethnic_indigenous" | "other",
    "legalFormCustom": "especificar otra forma jurídica",
    "membersCount": número de miembros o familias participantes,
    "decisionMechanism": "ej. Un miembro, un voto / Consenso",
    "ownershipModel": "ej. Propiedad colectiva / Comunitaria",
    "leadershipModel": "ej. Consejo Directivo / Liderazgo informal",
    "genderEquityDescription": "descripción de la participación de género en roles directivos",
    "ostromPrinciples": [lista de números del 1 al 8 correspondientes a los principios de Ostrom presentes (ej. [1, 2, 3])]
  },
  "dimensionRegulatoryFinancial": {
    "legalFramework": "marco legal o leyes aplicadas",
    "compensationRegime": "ej. Net Billing / Inyección a red",
    "incentives": "ej. Exención de impuestos / Subsidio",
    "financingMechanism": ["public_funds", "international_cooperation", "cooperative_capital", "crowdfunding", "other"] (lista de mecanismos usados),
    "financingMechanismCustom": "especificar si hay 'other'"
  },
  "dimensionSocialAppropriation": {
    "distributiveJustice": "descripción de justicia distributiva (beneficios económicos y energía)",
    "proceduralJustice": "descripción de justicia procedimental (participación en el diseño)",
    "recognitionJustice": "descripción de justicia de reconocimiento (respeto de saberes o derechos locales)",
    "restorativeJustice": "descripción de justicia restaurativa (remediación de exclusión energética)",
    "energyPovertyReduction": "descripción de la mitigación de pobreza energética",
    "empowermentOutcomes": "descripción de autonomía alcanzada y tejido social"
  },
  "dimensionDissemination": {
    "openScience": "ej. Datos abiertos, publicaciones",
    "training": "ej. Capacitación en mantenimiento",
    "communication": "ej. Reuniones informativas",
    "territorialArticulation": "ej. Alianza con la universidad local"
  }
}`;

      const fullPrompt = `${systemPrompt}\n\nInstrucción de usuario:\n${prompt}`;

      const payload: any = {
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ]
      };

      if (searchMode === 'web') {
        payload.tools = [{ googleSearch: {} }];
      }

      // v1beta Generative Language API
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToUse}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error?.message || `Error en la API de Gemini: ${response.status}`);
      }

      const resData = await response.json();
      if (!resData.candidates || !resData.candidates[0]) {
        throw new Error('La API de Gemini no devolvió respuestas.');
      }

      let text = resData.candidates[0].content.parts[0].text.trim();
      
      if (text.startsWith('```')) {
        const firstNewline = text.indexOf('\n');
        if (firstNewline !== -1) {
          text = text.substring(firstNewline + 1);
        }
        if (text.endsWith('```')) {
          text = text.substring(0, text.length - 3);
        }
        text = text.trim();
      }
      if (text.startsWith('json')) {
        text = text.substring(4).trim();
      }

      const parsed = JSON.parse(text);
      
      // Step 1: Identification
      if (parsed.name) setName(parsed.name);
      if (parsed.description) setDescription(parsed.description);
      if (parsed.country) {
        const matched = iberoamericanCountries.find(
          c => c.name.toLowerCase() === parsed.country.toLowerCase() ||
               parsed.country.toLowerCase().includes(c.name.toLowerCase()) ||
               c.name.toLowerCase().includes(parsed.country.toLowerCase())
        );
        if (matched) setCountry(matched.name);
      }
      if (parsed.location?.lat) setLat(String(parsed.location.lat));
      if (parsed.location?.lng) setLng(String(parsed.location.lng));
      if (parsed.status) setStatus(parsed.status);

      // Step 2: Technology
      if (parsed.dimensionTechnology) {
        const tech = parsed.dimensionTechnology;
        if (tech.techTypes) setTechTypes(tech.techTypes);
        if (tech.techTypesCustom) setTechTypesCustom(tech.techTypesCustom);
        if (tech.scaleKw) setScaleKw(String(tech.scaleKw));
        if (tech.storageKwh) setStorageKwh(String(tech.storageKwh));
        if (tech.digitalization) setDigitalization(tech.digitalization);
        if (tech.interoperability) setInteroperability(tech.interoperability);
      }

      // Step 3: Governance
      if (parsed.dimensionGovernance) {
        const gov = parsed.dimensionGovernance;
        if (gov.legalForm) setLegalForm(gov.legalForm);
        if (gov.legalFormCustom) setLegalFormCustom(gov.legalFormCustom);
        if (gov.membersCount) setMembersCount(String(gov.membersCount));
        if (gov.decisionMechanism) setDecisionMechanism(gov.decisionMechanism);
        if (gov.ownershipModel) setOwnershipModel(gov.ownershipModel);
        if (gov.leadershipModel) setLeadershipModel(gov.leadershipModel);
        if (gov.genderEquityDescription) setGenderEquity(gov.genderEquityDescription);
        if (gov.ostromPrinciples) setOstromPrinciples(gov.ostromPrinciples);
      }

      // Step 4: Regulatory
      if (parsed.dimensionRegulatoryFinancial) {
        const reg = parsed.dimensionRegulatoryFinancial;
        if (reg.legalFramework) setLegalFramework(reg.legalFramework);
        if (reg.compensationRegime) setCompensationRegime(reg.compensationRegime);
        if (reg.incentives) setIncentives(reg.incentives);
        if (reg.financingMechanism) setFinancingMechanism(reg.financingMechanism);
        if (reg.financingMechanismCustom) setFinancingMechanismCustom(reg.financingMechanismCustom);
      }

      // Step 5: Social Appropriation
      if (parsed.dimensionSocialAppropriation) {
        const soc = parsed.dimensionSocialAppropriation;
        if (soc.distributiveJustice) setDistributiveJustice(soc.distributiveJustice);
        if (soc.proceduralJustice) setProceduralJustice(soc.proceduralJustice);
        if (soc.recognitionJustice) setRecognitionJustice(soc.recognitionJustice);
        if (soc.restorativeJustice) setRestorativeJustice(soc.restorativeJustice);
        if (soc.energyPovertyReduction) setEnergyPoverty(soc.energyPovertyReduction);
        if (soc.empowermentOutcomes) setEmpowerment(soc.empowermentOutcomes);
      }

      if (parsed.dimensionDissemination) {
        const diss = parsed.dimensionDissemination;
        if (diss.openScience) setOpenScience(diss.openScience);
        if (diss.training) setTraining(diss.training);
        if (diss.communication) setCommunication(diss.communication);
        if (diss.territorialArticulation) setTerritorialArticulation(diss.territorialArticulation);
      }

      setExtractedSummary(
        `Se ha extraído con éxito la información de "${parsed.name || searchQuery}".
        - País: ${parsed.country || 'N/D'}
        - Ubicación: [${parsed.location?.lat || 'N/D'}, ${parsed.location?.lng || 'N/D'}]
        - Capacidad: ${parsed.dimensionTechnology?.scaleKw || '0'} kW
        - Forma Jurídica: ${parsed.dimensionGovernance?.legalForm || 'N/D'}`
      );

      if (resData.candidates[0].groundingMetadata) {
        const chunks = resData.candidates[0].groundingMetadata.groundingChunks || [];
        const sources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
        setExtractedGrounding(sources);
      }
    } catch (err: any) {
      console.error(err);
      setError(`Error al extraer datos con IA: ${err.message || 'Comprueba tu API Key o conexión.'}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleNext = () => {
    setError(null);
    if (currentStep === 1) {
      if (!name.trim() || !description.trim() || !lat.trim() || !lng.trim()) {
        setError('Por favor, completa los campos requeridos del paso 1.');
        return;
      }
      if (isNaN(Number(lat)) || isNaN(Number(lng))) {
        setError('Las coordenadas Latitud y Longitud deben ser valores numéricos válidos.');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const communityData = {
        name: name.trim(),
        description: description.trim(),
        country,
        location: {
          lat: Number(lat),
          lng: Number(lng)
        },
        status,
        approved: false, // Default pending admin moderation
        createdByUser: auth.currentUser?.uid || userProfile.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),

        dimensionTechnology: {
          techTypes,
          techTypesCustom: techTypes.includes('other') ? techTypesCustom.trim() : '',
          scaleKw: scaleKw ? Number(scaleKw) : null,
          storageKwh: storageKwh ? Number(storageKwh) : 0,
          digitalization: digitalization.trim() || null,
          interoperability: interoperability.trim() || null
        },

        dimensionGovernance: {
          legalForm,
          legalFormCustom: legalForm === 'other' ? legalFormCustom.trim() : '',
          membersCount: membersCount ? Number(membersCount) : null,
          decisionMechanism: decisionMechanism.trim() || null,
          ownershipModel: ownershipModel.trim() || null,
          leadershipModel: leadershipModel.trim() || null,
          genderEquityDescription: genderEquity.trim() || null,
          ostromPrinciples: {
            dp1: ostromPrinciples.includes(1),
            dp2: ostromPrinciples.includes(2),
            dp3: ostromPrinciples.includes(3),
            dp4: ostromPrinciples.includes(4),
            dp5: ostromPrinciples.includes(5),
            dp6: ostromPrinciples.includes(6),
            dp7: ostromPrinciples.includes(7),
            dp8: ostromPrinciples.includes(8),
          }
        },

        dimensionRegulatoryFinancial: {
          legalFramework: legalFramework.trim() || null,
          compensationRegime: compensationRegime.trim() || null,
          incentives: incentives.trim() || null,
          financingMechanism,
          financingMechanismCustom: financingMechanism.includes('other') ? financingMechanismCustom.trim() : ''
        },

        dimensionSocialAppropriation: {
          distributiveJustice: distributiveJustice.trim() || null,
          proceduralJustice: proceduralJustice.trim() || null,
          recognitionJustice: recognitionJustice.trim() || null,
          restorativeJustice: restorativeJustice.trim() || null,
          energyPovertyReduction: energyPoverty.trim() || null,
          empowermentOutcomes: empowerment.trim() || null,
          indigenousSovereignty: null
        },

        dimensionDissemination: {
          openScience: openScience.trim() || null,
          training: training.trim() || null,
          communication: communication.trim() || null,
          territorialArticulation: territorialArticulation.trim() || null
        }
      };

      await addDoc(collection(db, 'communities'), communityData);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al guardar la comunidad energética.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSuccess(false);
    setError(null);
    setSearchQuery('');
    setPastedText('');
    setExtractedSummary(null);
    setExtractedGrounding([]);
    setName('');
    setDescription('');
    setCountry(iberoamericanCountries[0].name);
    setLat('');
    setLng('');
    setStatus('activa');
    setTechTypes([]);
    setTechTypesCustom('');
    setScaleKw('');
    setStorageKwh('');
    setDigitalization('');
    setInteroperability('');
    setLegalForm('cooperative');
    setLegalFormCustom('');
    setMembersCount('');
    setDecisionMechanism('');
    setOwnershipModel('');
    setLeadershipModel('');
    setGenderEquity('');
    setOstromPrinciples([]);
    setLegalFramework('');
    setCompensationRegime('');
    setIncentives('');
    setFinancingMechanism([]);
    setFinancingMechanismCustom('');
    setDistributiveJustice('');
    setProceduralJustice('');
    setRecognitionJustice('');
    setRestorativeJustice('');
    setEnergyPoverty('');
    setEmpowerment('');
    setOpenScience('');
    setTraining('');
    setCommunication('');
    setTerritorialArticulation('');
  };

  if (success) {
    return (
      <div className="bg-ivory-50 min-h-screen py-16 px-6 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white border border-stone-200 rounded-2xl shadow-editorial">
          <div className="inline-flex p-4 bg-teal-50 rounded-full border border-teal-100 mb-6">
            <BriefcaseIcon className="h-10 w-10 text-teal-600" />
          </div>
          <h3 className="font-display text-3xl text-ink mb-3">¡Registro Recibido!</h3>
          <p className="text-sm text-ink/70 leading-relaxed mb-6 font-sans">
            La comunidad energética <strong>{name}</strong> ha sido cargada con éxito en la base de datos de OICE.
            Se ha enviado al comité de moderación de RIPCEL y aparecerá en el Atlas Interactivo una vez aprobada.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-moss-900 hover:bg-ink text-ivory-50 text-xs font-bold uppercase tracking-wider rounded-full transition-all font-mono"
          >
            Registrar otra comunidad
          </button>
        </div>
      </div>
    );
  }

  const stepsLabels = ['Asistente IA', 'Identificación', 'Tecnología', 'Gobernanza', 'Regulación', 'Apropiación'];

  return (
    <div className="bg-ivory-50 py-12 px-6 flex-grow flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-ink mb-2 font-display">
            Catastro de Comunidades Energéticas
          </h2>
          <p className="text-xs text-ink/65 font-mono uppercase tracking-wider">
            Protocolo de Registro Científico · Taxonomía 4D de RIPCEL
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10 max-w-2xl mx-auto font-mono text-[10px]">
          {stepsLabels.map((label, idx) => {
            const stepNum = idx; // 0 to 5
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            return (
              <React.Fragment key={label}>
                {idx > 0 && <div className={`flex-grow h-px mx-2 ${isCompleted ? 'bg-moss-700' : 'bg-stone-300'}`} />}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold ${
                      isActive
                        ? 'bg-moss-900 border-moss-900 text-ivory-50'
                        : isCompleted
                        ? 'bg-moss-50 border-moss-700 text-moss-800'
                        : 'bg-white border-stone-200 text-ink/40'
                    }`}
                  >
                    {stepNum}
                  </div>
                  <span className={`mt-2 font-semibold ${isActive ? 'text-moss-900' : 'text-ink/40'}`}>{label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl font-sans max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-editorial p-8 max-w-2xl mx-auto">
          <form onSubmit={handleFormSubmit} className="space-y-6 font-sans">
            {/* STEP 0: AI ASSISTANT */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
                  <ZapIcon className="h-5 w-5 text-moss-700" />
                  <h4 className="font-display text-lg text-ink font-semibold">Paso 0: Asistente de Carga Rápida con IA</h4>
                </div>

                <p className="text-xs text-ink/75 leading-relaxed">
                  Busca la comunidad energética en internet o pega un reporte detallado. 
                  Nuestra IA de Gemini extraerá los indicadores estructurados bajo la taxonomía RIPCEL y pre-llenará todo el formulario para tu revisión.
                </p>

                {/* API Key Setup */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink/65 mb-1 font-mono">
                    Google Gemini API Key
                  </label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder={import.meta.env.VITE_GEMINI_API_KEY ? "•••••••••••••••• (Configurada en el Servidor)" : "Ingresa tu API Key de Gemini..."}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:border-moss-500 text-xs font-mono bg-white"
                  />
                  <span className="block text-[9px] text-ink/45 mt-1 leading-normal font-mono">
                    Necesitas una API Key para que el navegador llame a Gemini. Consigue una gratis en <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-moss-700 underline font-semibold">Google AI Studio</a>.
                  </span>
                </div>

                {/* Toggle search mode */}
                <div className="flex gap-2 p-1 border hairline rounded-xl bg-stone-50 max-w-xs text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSearchMode('web')}
                    className={`flex-grow py-1.5 px-3 rounded-lg text-center font-semibold transition-all ${
                      searchMode === 'web' ? 'bg-white shadow-soft text-moss-900' : 'text-ink/50 hover:text-ink'
                    }`}
                  >
                    Buscar en la Web
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('text')}
                    className={`flex-grow py-1.5 px-3 rounded-lg text-center font-semibold transition-all ${
                      searchMode === 'text' ? 'bg-white shadow-soft text-moss-900' : 'text-ink/50 hover:text-ink'
                    }`}
                  >
                    Pegar Texto
                  </button>
                </div>

                {searchMode === 'web' ? (
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">
                      Nombre de la comunidad energética y ciudad *
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ej. Babilônia Solar (Río de Janeiro, Brasil)"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">
                      Contenido o reporte técnico *
                    </label>
                    <textarea
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      rows={6}
                      placeholder="Pega aquí toda la información, artículos o notas sobre la comunidad..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-xs font-mono"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    disabled={aiLoading}
                    onClick={handleAIExtract}
                    className="px-5 py-2.5 bg-moss-900 hover:bg-ink text-ivory-50 text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 font-mono disabled:opacity-55"
                  >
                    {aiLoading ? (
                      <>
                        <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-ivory-50 border-t-transparent rounded-full" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <ZapIcon className="h-3.5 w-3.5 text-copper-400" />
                        Extraer con IA
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 border border-stone-200 hover:border-ink text-ink text-xs font-bold uppercase tracking-wider rounded-full transition-all font-mono"
                  >
                    Omitir / Cargar Manualmente →
                  </button>
                </div>

                {extractedSummary && (
                  <div className="mt-6 bg-teal-50/50 border border-teal-200 rounded-xl p-5 font-sans animate-fade-in">
                    <h5 className="text-xs font-semibold text-teal-900 uppercase tracking-wider mb-2 font-mono">Resumen de Extracción:</h5>
                    <p className="text-xs text-teal-800 leading-relaxed whitespace-pre-line font-sans mb-4">{extractedSummary}</p>
                    
                    {extractedGrounding.length > 0 && (
                      <div className="border-t border-teal-200/50 pt-3 mb-4">
                        <span className="text-[9px] font-semibold text-teal-900/60 uppercase tracking-wider block mb-2 font-mono">
                          Fuentes Grounding Consultadas (Google Search):
                        </span>
                        <ul className="space-y-1 text-[10px] font-mono text-teal-700">
                          {extractedGrounding.map((src, i) => (
                            <li key={i} className="flex items-baseline gap-2 truncate">
                              <span className="text-teal-900/40 font-bold">[{i+1}]</span>
                              <a href={src.uri} target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-950 font-sans truncate">
                                {src.title || src.uri}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all font-mono"
                    >
                      Revisar datos y Continuar al Formulario →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 1: IDENTIFICATION */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
                  <MapIcon className="h-5 w-5 text-moss-700" />
                  <h4 className="font-display text-lg text-ink font-semibold">Paso 1: Identificación de la Comunidad</h4>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Nombre de la Comunidad *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="ej. Cooperativa Solar Tejada"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Descripción *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe los objetivos de la comunidad, su historia y quiénes la integran..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">País *</label>
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

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Estado del Proyecto *</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm bg-white"
                    >
                      <option value="activa">Activa / Operativa</option>
                      <option value="incubacion">En Incubación / Planeación</option>
                      <option value="estancada">Estancada / Con Trabas</option>
                      <option value="abandonada">Abandonada (Evita el sesgo de supervivencia)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Latitud (Coordenada Decimal) *</label>
                    <input
                      type="text"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                      required
                      placeholder="ej. -31.5375"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Longitud (Coordenada Decimal) *</label>
                    <input
                      type="text"
                      value={lng}
                      onChange={(e) => setLng(e.target.value)}
                      required
                      placeholder="ej. -68.5364"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TECHNOLOGY */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
                  <BriefcaseIcon className="h-5 w-5 text-moss-700" />
                  <h4 className="font-display text-lg text-ink font-semibold">Paso 2: Dimensión Tecnológica</h4>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-2 font-mono">Tecnologías Utilizadas</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { val: 'solar_pv', lbl: 'Solar Fotovoltaica' },
                      { val: 'wind', lbl: 'Eólica (Micro-eólica)' },
                      { val: 'hydrokinetic', lbl: 'Hidroquinética / Micro-hidro' },
                      { val: 'biomass', lbl: 'Biomasa / Biogás' },
                      { val: 'hybrid', lbl: 'Sistemas Híbridos' },
                      { val: 'other', lbl: 'Otra tecnología' }
                    ].map((tech) => (
                      <label key={tech.val} className="flex items-center gap-2.5 text-xs text-ink/75 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={techTypes.includes(tech.val)}
                          onChange={() => handleTechCheckboxChange(tech.val)}
                          className="h-4 w-4 rounded border-stone-300 text-moss-600 focus:ring-moss-500"
                        />
                        {tech.lbl}
                      </label>
                    ))}
                  </div>
                </div>

                {techTypes.includes('other') && (
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Especificar otra tecnología</label>
                    <input
                      type="text"
                      value={techTypesCustom}
                      onChange={(e) => setTechTypesCustom(e.target.value)}
                      placeholder="ej. Geotermia comunitaria"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Capacidad Instalada (kW)</label>
                    <input
                      type="number"
                      value={scaleKw}
                      onChange={(e) => setScaleKw(e.target.value)}
                      placeholder="ej. 50"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Capacidad de Almacenamiento (kWh)</label>
                    <input
                      type="number"
                      value={storageKwh}
                      onChange={(e) => setStorageKwh(e.target.value)}
                      placeholder="ej. 100 (0 si no tiene)"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Digitalización y Gestión</label>
                  <textarea
                    value={digitalization}
                    onChange={(e) => setDigitalization(e.target.value)}
                    rows={2}
                    placeholder="ej. Medición inteligente (AMI), plataformas de control, blockchain P2P..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Interoperabilidad</label>
                  <input
                    type="text"
                    value={interoperability}
                    onChange={(e) => setInteroperability(e.target.value)}
                    placeholder="Mecanismos de comunicación con la red eléctrica nacional"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: GOVERNANCE */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
                  <UsersIcon className="h-5 w-5 text-moss-700" />
                  <h4 className="font-display text-lg text-ink font-semibold">Paso 3: Dimensión de Gobernanza</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Estructura / Forma Jurídica</label>
                    <select
                      value={legalForm}
                      onChange={(e) => setLegalForm(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm bg-white"
                    >
                      <option value="cooperative">Cooperativa</option>
                      <option value="association">Asociación Comunitaria / Junta</option>
                      <option value="municipal_public">Entidad Municipal / Pública</option>
                      <option value="informal">Estructura Informal / Asamblea</option>
                      <option value="ethnic_indigenous">Autogobierno Étnico / Indígena</option>
                      <option value="other">Otro modelo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Número de Miembros / Familias</label>
                    <input
                      type="number"
                      value={membersCount}
                      onChange={(e) => setMembersCount(e.target.value)}
                      placeholder="ej. 150"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                {legalForm === 'other' && (
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Especificar otra forma jurídica</label>
                    <input
                      type="text"
                      value={legalFormCustom}
                      onChange={(e) => setLegalFormCustom(e.target.value)}
                      placeholder="ej. Fideicomiso comunitario"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Mecanismo de Decisión</label>
                    <input
                      type="text"
                      value={decisionMechanism}
                      onChange={(e) => setDecisionMechanism(e.target.value)}
                      placeholder="ej. Un miembro, un voto / Consenso"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Modelo de Propiedad</label>
                    <input
                      type="text"
                      value={ownershipModel}
                      onChange={(e) => setOwnershipModel(e.target.value)}
                      placeholder="ej. Colectiva / Público-Privada"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Liderazgo y Estructura Organizativa</label>
                    <input
                      type="text"
                      value={leadershipModel}
                      onChange={(e) => setLeadershipModel(e.target.value)}
                      placeholder="ej. Consejo Directivo Electo / Asamblea"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Participación de Género</label>
                    <input
                      type="text"
                      value={genderEquity}
                      onChange={(e) => setGenderEquity(e.target.value)}
                      placeholder="Describe el rol y liderazgo femenino en la comunidad"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-2 font-mono">Principios de Elinor Ostrom Presentes</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {[
                      { num: 1, lbl: '1. Límites definidos de membresía y recursos' },
                      { num: 2, lbl: '2. Reglas adaptadas a las condiciones locales' },
                      { num: 3, lbl: '3. Reglas de elección colectiva (decisiones)' },
                      { num: 4, lbl: '4. Monitoreo del recurso y del comportamiento' },
                      { num: 5, lbl: '5. Sanciones graduales' },
                      { num: 6, lbl: '6. Mecanismos de resolución de conflictos' },
                      { num: 7, lbl: '7. Reconocimiento externo de la autonomía' },
                      { num: 8, lbl: '8. Organización anidada (múltiples niveles)' }
                    ].map((p) => (
                      <label key={p.num} className="flex items-start gap-2.5 text-xs text-ink/75 cursor-pointer leading-tight py-0.5">
                        <input
                          type="checkbox"
                          checked={ostromPrinciples.includes(p.num)}
                          onChange={() => handleOstromCheckboxChange(p.num)}
                          className="h-4 w-4 rounded border-stone-300 text-moss-600 focus:ring-moss-500 mt-0.5"
                        />
                        <span>{p.lbl}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REGULATORY & FINANCIAL */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
                  <ScaleIcon className="h-5 w-5 text-moss-700" />
                  <h4 className="font-display text-lg text-ink font-semibold">Paso 4: Dimensión Regulatoria y Financiera</h4>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Marco Legal Aplicado</label>
                  <input
                    type="text"
                    value={legalFramework}
                    onChange={(e) => setLegalFramework(e.target.value)}
                    placeholder="ej. Ley 1715 de 2014 (Colombia) / RD 244/2019 (España)"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Régimen de Compensación</label>
                    <input
                      type="text"
                      value={compensationRegime}
                      onChange={(e) => setCompensationRegime(e.target.value)}
                      placeholder="ej. Net Metering / Tarifa de inyección"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Incentivos Recibidos</label>
                    <input
                      type="text"
                      value={incentives}
                      onChange={(e) => setIncentives(e.target.value)}
                      placeholder="ej. Subsidios tributarios / Fondos de fomento"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-2 font-mono">Mecanismos de Financiamiento Utilizados</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { val: 'public_funds', lbl: 'Fondos Públicos / Subsidios' },
                      { val: 'international_cooperation', lbl: 'Cooperación Internacional' },
                      { val: 'cooperative_capital', lbl: 'Capital Social / Aportes Propios' },
                      { val: 'crowdfunding', lbl: 'Crowdfunding / Micromecenazgo' },
                      { val: 'other', lbl: 'Otro mecanismo' }
                    ].map((mechanism) => (
                      <label key={mechanism.val} className="flex items-center gap-2.5 text-xs text-ink/75 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={financingMechanism.includes(mechanism.val)}
                          onChange={() => handleFinanceCheckboxChange(mechanism.val)}
                          className="h-4 w-4 rounded border-stone-300 text-moss-600 focus:ring-moss-500"
                        />
                        {mechanism.lbl}
                      </label>
                    ))}
                  </div>
                </div>

                {financingMechanism.includes('other') && (
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Especificar otro mecanismo financiero</label>
                    <input
                      type="text"
                      value={financingMechanismCustom}
                      onChange={(e) => setFinancingMechanismCustom(e.target.value)}
                      placeholder="ej. Crédito bancario preferencial / Bonos verdes"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: SOCIAL APPROPRIATION & DISSEMINATION */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b hairline pb-3 mb-4">
                  <BookOpenIcon className="h-5 w-5 text-moss-700" />
                  <h4 className="font-display text-lg text-ink font-semibold">Paso 5: Apropiación Social e Impacto</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Justicia Distributiva (Acceso y Costos)</label>
                    <textarea
                      value={distributiveJustice}
                      onChange={(e) => setDistributiveJustice(e.target.value)}
                      rows={2}
                      placeholder="Describe cómo el proyecto distribuye los beneficios económicos y la energía..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Justicia Procedimental (Participación)</label>
                    <textarea
                      value={proceduralJustice}
                      onChange={(e) => setProceduralJustice(e.target.value)}
                      rows={2}
                      placeholder="Mecanismos para garantizar que todos los miembros participen en el co-diseño..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Justicia de Reconocimiento (Saberes locales)</label>
                    <textarea
                      value={recognitionJustice}
                      onChange={(e) => setRecognitionJustice(e.target.value)}
                      rows={2}
                      placeholder="Reconocimiento de derechos ancestrales, territoriales o saberes locales..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Justicia Restaurativa (Remediación)</label>
                    <textarea
                      value={restorativeJustice}
                      onChange={(e) => setRestorativeJustice(e.target.value)}
                      rows={2}
                      placeholder="Remediación de daños históricos causados por la exclusión o modelos extractivistas..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Mitigación de Pobreza Energética</label>
                    <textarea
                      value={energyPoverty}
                      onChange={(e) => setEnergyPoverty(e.target.value)}
                      rows={2}
                      placeholder="Impacto directo en hogares vulnerables o en tarifas de energía..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Empoderamiento e Innovación Social</label>
                    <textarea
                      value={empowerment}
                      onChange={(e) => setEmpowerment(e.target.value)}
                      rows={2}
                      placeholder="Nivel de autonomía alcanzado y fortalecimiento del tejido social..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                    />
                  </div>
                </div>

                <div className="border-t hairline pt-4 mt-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-moss-700 font-mono block mb-3">Acciones de Diseminación (Transversal)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Prácticas de Ciencia Abierta</label>
                      <input
                        type="text"
                        value={openScience}
                        onChange={(e) => setOpenScience(e.target.value)}
                        placeholder="ej. Repositorios de datos públicos, datos abiertos"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Capacitación y Formación</label>
                      <input
                        type="text"
                        value={training}
                        onChange={(e) => setTraining(e.target.value)}
                        placeholder="ej. Cursos sobre mantenimiento o autogestión"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Canales de Comunicación</label>
                      <input
                        type="text"
                        value={communication}
                        onChange={(e) => setCommunication(e.target.value)}
                        placeholder="ej. Redes sociales, asambleas de divulgación"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink/65 mb-1.5 font-mono">Articulación Territorial</label>
                      <input
                        type="text"
                        value={territorialArticulation}
                        onChange={(e) => setTerritorialArticulation(e.target.value)}
                        placeholder="Vínculos con municipios, ONGs o universidades"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between border-t hairline pt-6 mt-8 font-mono text-xs">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 border hairline hover:border-ink rounded-full text-ink font-semibold transition-all"
                >
                  ← Anterior
                </button>
              ) : (
                <div />
              )}

              {currentStep > 0 && currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-moss-900 hover:bg-ink text-ivory-50 font-semibold rounded-full transition-all"
                >
                  Siguiente →
                </button>
              ) : currentStep === 5 ? (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full transition-all flex items-center gap-2"
                >
                  {submitting ? 'Guardando...' : 'Enviar al Catastro ✔'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-moss-900 hover:bg-ink text-ivory-50 font-semibold rounded-full transition-all"
                >
                  Cargar Manualmente →
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
