import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import {
  QuestionnaireData,
  ScaleRating,
  ModalityStatus,
  BarrierType,
  BarrierPriority,
  RIPCEL_COUNTRIES,
  MODALITIES_LIST,
  SCALE_LABELS,
  MODALITY_LABELS,
  BARRIER_TYPE_LABELS,
  createEmptyQuestionnaire,
  BENCHMARK_QUESTIONNAIRES
} from '../data/questionnaireEje3';

interface Eje3QuestionnaireProps {
  userProfile?: {
    uid: string;
    name: string;
    email: string;
    role: string;
    approved: boolean;
    institution?: string;
    position?: string;
    country?: string;
  } | null;
}

interface CloudResponseRecord {
  docId: string;
  country: string;
  status: 'borrador' | 'enviado_a_revision' | 'validado_eje3';
  updatedByUid: string;
  updatedByName: string;
  updatedByEmail: string;
  institution: string;
  position: string;
  updateDate: string;
  lastUpdatedClient: string;
  payload: QuestionnaireData;
}

export const Eje3Questionnaire: React.FC<Eje3QuestionnaireProps> = ({ userProfile }) => {
  const initialCountry = (userProfile?.country && RIPCEL_COUNTRIES.includes(userProfile.country))
    ? userProfile.country 
    : 'Colombia';

  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [data, setData] = useState<QuestionnaireData>(() => {
    const saved = localStorage.getItem(`ripcel_eje3_q_${initialCountry}`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const initial = BENCHMARK_QUESTIONNAIRES[initialCountry] || createEmptyQuestionnaire(initialCountry);
    if (userProfile && !initial.responsible) {
      const pos = userProfile.position ? `${userProfile.position} - ` : '';
      const inst = userProfile.institution ? `${userProfile.institution}` : 'RIPCEL';
      initial.responsible = `${userProfile.name} (${pos}${inst})`;
    }
    return initial;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cloudLoading, setCloudLoading] = useState<boolean>(false);
  const [cloudSaving, setCloudSaving] = useState<boolean>(false);
  const [cloudStatus, setCloudStatus] = useState<'borrador' | 'enviado_a_revision' | 'validado_eje3' | 'no_sincronizado'>('no_sincronizado');
  const [lastCloudSync, setLastCloudSync] = useState<{
    name: string;
    institution?: string;
    position?: string;
    date?: string;
  } | null>(null);

  // Multi-response cloud state
  const [allCloudResponses, setAllCloudResponses] = useState<CloudResponseRecord[]>([]);
  const [showAllResponsesPanel, setShowAllResponsesPanel] = useState<boolean>(false);
  const [filterResponsesCountry, setFilterResponsesCountry] = useState<string>('ALL');
  const [viewingSubmission, setViewingSubmission] = useState<CloudResponseRecord | null>(null);

  const getCountryDocId = (countryName: string) => {
    return countryName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
  };

  // Unique document ID per (country + researcher UID) so multiple researchers from the same country never overwrite each other
  const getUserCountryDocId = (countryName: string, uid?: string) => {
    const slug = getCountryDocId(countryName);
    return uid ? `${slug}__${uid}` : slug;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch all responses across all countries from Firestore for summary counts & export
  const fetchAllCloudResponses = async () => {
    try {
      const snap = await getDocs(collection(db, 'eje3_questionnaires'));
      const list: CloudResponseRecord[] = snap.docs.map(d => {
        const raw = d.data();
        return {
          docId: d.id,
          country: raw.country || d.id.split('__')[0],
          status: raw.status || 'borrador',
          updatedByUid: raw.updatedByUid || '',
          updatedByName: raw.updatedByName || raw.responsible || 'Investigador',
          updatedByEmail: raw.updatedByEmail || '',
          institution: raw.institution || '',
          position: raw.position || '',
          updateDate: raw.updateDate || '',
          lastUpdatedClient: raw.lastUpdatedClient || '',
          payload: raw as unknown as QuestionnaireData
        };
      });
      list.sort((a, b) => (b.lastUpdatedClient || b.updateDate).localeCompare(a.lastUpdatedClient || a.updateDate));
      setAllCloudResponses(list);
    } catch (err) {
      console.warn('Could not list all cloud responses:', err);
    }
  };

  const countsByCountry = useMemo(() => {
    const counts: Record<string, number> = {};
    allCloudResponses.forEach(r => {
      counts[r.country] = (counts[r.country] || 0) + 1;
    });
    return counts;
  }, [allCloudResponses]);

  const filteredCloudResponses = useMemo(() => {
    if (filterResponsesCountry === 'ALL') return allCloudResponses;
    return allCloudResponses.filter(r => r.country === filterResponsesCountry);
  }, [allCloudResponses, filterResponsesCountry]);

  // Load THIS researcher's data for selected country (Firestore {country}__{uid} -> LocalStorage -> Benchmark -> Empty)
  const fetchCountryData = async (country: string) => {
    setCloudLoading(true);
    setViewingSubmission(null);
    try {
      const targetDocId = getUserCountryDocId(country, userProfile?.uid);
      const docRef = doc(db, 'eje3_questionnaires', targetDocId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const remoteData = snapshot.data();
        const questionnairePayload = remoteData as unknown as QuestionnaireData;
        setData(questionnairePayload);
        setCloudStatus(remoteData.status || 'borrador');
        setLastCloudSync({
          name: remoteData.updatedByName || remoteData.responsible || 'Investigador',
          institution: remoteData.institution || '',
          position: remoteData.position || '',
          date: remoteData.updateDate || ''
        });
        localStorage.setItem(`ripcel_eje3_q_${country}`, JSON.stringify(questionnairePayload));
        setCloudLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Could not fetch from Firestore, checking local storage:", err);
    } finally {
      setCloudLoading(false);
    }

    // Fallback if not yet in Firestore: check localStorage (preserves drafts saved offline before rules were deployed!)
    const saved = localStorage.getItem(`ripcel_eje3_q_${country}`);
    if (saved) {
      try {
        setData(JSON.parse(saved));
        setCloudStatus('no_sincronizado');
        setLastCloudSync(null);
        return;
      } catch (e) {}
    }

    if (BENCHMARK_QUESTIONNAIRES[country]) {
      const benchCopy = JSON.parse(JSON.stringify(BENCHMARK_QUESTIONNAIRES[country])) as QuestionnaireData;
      if (userProfile) {
        const pos = userProfile.position ? `${userProfile.position} - ` : '';
        const inst = userProfile.institution ? `${userProfile.institution}` : 'RIPCEL';
        benchCopy.responsible = `${userProfile.name} (${pos}${inst})`;
      }
      setData(benchCopy);
    } else {
      const empty = createEmptyQuestionnaire(country);
      if (userProfile) {
        const pos = userProfile.position ? `${userProfile.position} - ` : '';
        const inst = userProfile.institution ? `${userProfile.institution}` : 'RIPCEL';
        empty.responsible = `${userProfile.name} (${pos}${inst})`;
      }
      setData(empty);
    }
    setCloudStatus('no_sincronizado');
    setLastCloudSync(null);
  };

  useEffect(() => {
    fetchAllCloudResponses();
  }, [userProfile?.uid]);

  useEffect(() => {
    fetchCountryData(selectedCountry);
  }, [selectedCountry, userProfile?.uid]);

  // When country selector changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSaveToFirestore = async (status: 'borrador' | 'enviado_a_revision' = 'borrador') => {
    if (viewingSubmission && viewingSubmission.updatedByUid !== userProfile?.uid && userProfile?.role !== 'admin') {
      showToast('Estás en modo consulta de otro investigador. Vuelve a tu propio cuestionario para guardar.');
      return;
    }
    setCloudSaving(true);
    try {
      const targetDocId = viewingSubmission
        ? viewingSubmission.docId
        : getUserCountryDocId(selectedCountry, userProfile?.uid);
      localStorage.setItem(`ripcel_eje3_q_${selectedCountry}`, JSON.stringify(data));
      const docRef = doc(db, 'eje3_questionnaires', targetDocId);
      const payload = {
        ...data,
        country: selectedCountry,
        status: status,
        updatedByUid: viewingSubmission ? viewingSubmission.updatedByUid : (userProfile?.uid || null),
        updatedByName: viewingSubmission ? viewingSubmission.updatedByName : (userProfile?.name || data.responsible || 'Investigador'),
        updatedByEmail: viewingSubmission ? viewingSubmission.updatedByEmail : (userProfile?.email || null),
        institution: viewingSubmission ? viewingSubmission.institution : (userProfile?.institution || null),
        position: viewingSubmission ? viewingSubmission.position : (userProfile?.position || null),
        lastUpdatedClient: new Date().toISOString(),
        serverUpdatedAt: serverTimestamp()
      };
      await setDoc(docRef, payload, { merge: true });
      setCloudStatus(status);
      setLastCloudSync({
        name: payload.updatedByName || 'Tú',
        institution: payload.institution || '',
        position: payload.position || '',
        date: data.updateDate
      });
      await fetchAllCloudResponses();
      showToast(status === 'enviado_a_revision'
        ? `¡Tu respuesta de ${selectedCountry} fue guardada en Firestore y enviada a revisión del Eje 3!`
        : `¡Tu respuesta de ${selectedCountry} fue sincronizada exitosamente en Firestore!`
      );
    } catch (err: any) {
      console.error("Error saving to Firestore:", err);
      showToast(`⚠️ Error al guardar en Firestore: ${err.message || 'Verifica permisos o conexión'}`);
    } finally {
      setCloudSaving(false);
    }
  };

  const handleInspectSubmission = (rec: CloudResponseRecord) => {
    setViewingSubmission(rec);
    setData(rec.payload);
    setCloudStatus(rec.status);
    setLastCloudSync({
      name: rec.updatedByName,
      institution: rec.institution,
      position: rec.position,
      date: rec.updateDate
    });
    setShowAllResponsesPanel(false);
    showToast(`Visualizando respuesta de ${rec.updatedByName} (${rec.country})`);
  };

  const handleExportAllJSON = () => {
    const exportList = filteredCloudResponses.map(r => ({
      docId: r.docId,
      country: r.country,
      status: r.status,
      researcher: r.updatedByName,
      email: r.updatedByEmail,
      institution: r.institution,
      position: r.position,
      updateDate: r.updateDate,
      lastUpdatedClient: r.lastUpdatedClient,
      responses: r.payload
    }));
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportList, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `RIPCEL_Eje3_Todas_Respuestas_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Exportadas ${exportList.length} respuestas en formato JSON`);
  };

  const handleExportAllCSV = () => {
    const escapeCsv = (val: any) => {
      const str = String(val ?? '').replace(/\r?\n/g, ' ').replace(/"/g, '""');
      return `"${str}"`;
    };
    const headers = [
      'Pais', 'Investigador', 'Email', 'Institucion', 'Cargo', 'Estado', 'Fecha',
      'Q1_Calificacion', 'Q1_Norma', 'Q1_Estado', 'Q3_ResponsableConexion', 'Q3_Tiempo',
      'Q4_MecanismoCompensacion', 'Q5_Incentivos', 'Q6_TarifasSociales', 'Q8_Multilaterales',
      'Q10_ModeloNegocio', 'Sintesis_PuntajeGeneral', 'Sintesis_Fortaleza', 'Sintesis_Barrera',
      'Sintesis_Financiamiento', 'Sintesis_Piloto', 'Sintesis_AccionPrioritaria'
    ];
    const rows = filteredCloudResponses.map(r => {
      const p = r.payload;
      return [
        r.country, r.updatedByName, r.updatedByEmail, r.institution, r.position, r.status, r.updateDate,
        p.q1_definition?.score, p.q1_definition?.law, p.q1_definition?.status,
        p.q3_connection?.responsible, p.q3_connection?.estimatedTime,
        p.q4_compensation?.mechanism, (p.q5_incentives || []).join(' | '),
        p.q6_socialTariffs, p.q8_multilateral, p.q10_businessModel,
        p.synthesis?.generalScore, p.synthesis?.strength, p.synthesis?.barrier,
        p.synthesis?.fundingOpportunity, p.synthesis?.pilotTerritory, p.synthesis?.priorityAction
      ].map(escapeCsv).join(',');
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RIPCEL_Eje3_Matriz_Respuestas_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`Exportadas ${filteredCloudResponses.length} respuestas en CSV (Excel)`);
  };

  const handleSaveLocalDraft = () => {
    localStorage.setItem(`ripcel_eje3_q_${selectedCountry}`, JSON.stringify(data));
    showToast(`Borrador local de ${selectedCountry} guardado en tu navegador`);
  };

  const handleLoadBenchmark = (countryKey: string) => {
    if (BENCHMARK_QUESTIONNAIRES[countryKey]) {
      setData(BENCHMARK_QUESTIONNAIRES[countryKey]);
      showToast(`Datos de referencia de ${countryKey} cargados`);
    }
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `RIPCEL_Eje3_${data.country.replace(/\s+/g, '_')}_${data.updateDate}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Archivo JSON descargado');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm(`¿Deseas restablecer el cuestionario de ${selectedCountry}? Se perderán los cambios no guardados.`)) {
      if (BENCHMARK_QUESTIONNAIRES[selectedCountry]) {
        setData(BENCHMARK_QUESTIONNAIRES[selectedCountry]);
      } else {
        setData(createEmptyQuestionnaire(selectedCountry));
      }
      showToast('Cuestionario restablecido');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-editorial border border-teal-900/40">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono">
              RIPCEL — Eje 3
            </span>
            <span className="text-[10px] font-mono text-stone-400">
              Red Temática CYTED (726RT0203, 2026–2029)
            </span>
          </div>
          <span className="text-[11px] font-mono bg-white/10 px-2.5 py-1 rounded text-stone-300">
            ⏱️ Tiempo estimado: 15–20 min
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white mb-2">
          Cuestionario Nacional Resumido para Análisis Comparativo
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed font-sans">
          Regulación, financiamiento y política pública para comunidades energéticas locales en los 16 países de la Red RIPCEL. Instrumento de primera ronda para alimentar la matriz de diagnóstico y los pilotos regionales.
        </p>

        {userProfile && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-900/60 border border-teal-500/40 text-teal-200 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Investigador Acreditado: <strong>{userProfile.name}</strong> {userProfile.position ? `· ${userProfile.position}` : ''} ({userProfile.institution || 'Red RIPCEL'})</span>
          </div>
        )}

        {/* Scoring Scale Reference */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300 font-mono mb-2.5">
            Escala de Calificación Regulatoria Eje 3:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {([0, 1, 2, 3, 4] as ScaleRating[]).map(num => (
              <div key={num} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                <div className="font-bold text-[11px] text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: SCALE_LABELS[num].color }}></span>
                  {SCALE_LABELS[num].title}
                </div>
                <div className="text-[10px] text-stone-300 mt-1 leading-tight font-sans">
                  {SCALE_LABELS[num].desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Bar: Country Selection & Actions */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Metadata Inputs */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                País a Evaluar
              </label>
              <select
                className="px-3 py-2 text-xs font-bold border border-stone-300 rounded-xl bg-stone-50 text-stone-850 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {RIPCEL_COUNTRIES.map(c => {
                  const cloudCount = countsByCountry[c] || 0;
                  return (
                    <option key={c} value={c}>
                      {c} {cloudCount > 0 ? `(${cloudCount} en nube)` : ''} {BENCHMARK_QUESTIONNAIRES[c] ? '★' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Institución / Responsable
              </label>
              <input
                type="text"
                placeholder="Ej. Punto Focal RIPCEL / MinEnergía"
                className="px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-500 w-56 sm:w-64"
                value={data.responsible}
                onChange={(e) => setData({ ...data, responsible: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Fecha
              </label>
              <input
                type="date"
                className="px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={data.updateDate}
                onChange={(e) => setData({ ...data, updateDate: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100">
            <button
              type="button"
              onClick={() => {
                fetchAllCloudResponses();
                setShowAllResponsesPanel(!showAllResponsesPanel);
              }}
              className={`px-3 py-2 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
                showAllResponsesPanel
                  ? 'bg-indigo-700 text-white border-indigo-700'
                  : 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100'
              }`}
              title="Ver y exportar todas las respuestas enviadas por los investigadores en Firestore"
            >
              📊 Respuestas ({allCloudResponses.length})
            </button>
            {BENCHMARK_QUESTIONNAIRES[selectedCountry] && (
              <button
                type="button"
                onClick={() => handleLoadBenchmark(selectedCountry)}
                className="px-3 py-2 text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200 rounded-xl hover:bg-teal-100 transition-colors"
                title="Cargar diagnóstico de referencia oficial para este país"
              >
                ★ Cargar Referencia
              </button>
            )}
            <button
              type="button"
              disabled={cloudSaving}
              onClick={() => handleSaveToFirestore('borrador')}
              className="px-3.5 py-2 text-[11px] font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Guardar cuestionario en la base de datos en la nube de Firestore"
            >
              {cloudSaving ? '☁️ Guardando...' : '☁️ Guardar en Firestore'}
            </button>
            <button
              type="button"
              disabled={cloudSaving}
              onClick={() => handleSaveToFirestore('enviado_a_revision')}
              className="px-3 py-2 text-[11px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Enviar cuestionario terminado a revisión y validación de la coordinación del Eje 3"
            >
              🚀 Enviar a Revisión Eje 3
            </button>
            <button
              type="button"
              onClick={handleSaveLocalDraft}
              className="px-2.5 py-2 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
              title="Guardar copia local sin conexión en este navegador"
            >
              💾 Local
            </button>
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-2.5 py-2 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
              title="Exportar archivo JSON"
            >
              📥 JSON
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-2.5 py-2 text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
            >
              🖨️
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-2 py-2 text-[11px] text-stone-400 hover:text-rose-600 transition-colors"
              title="Restablecer campos"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Cloud Status Sub-Bar */}
        <div className="mt-4 pt-3 border-t border-stone-150 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {cloudLoading ? (
              <span className="inline-flex items-center gap-1.5 text-stone-500 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                Consultando Firestore...
              </span>
            ) : cloudStatus === 'validado_eje3' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Validado Oficialmente por Eje 3
              </span>
            ) : cloudStatus === 'enviado_a_revision' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-300 font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Enviado para Revisión del Eje 3 en Firestore
              </span>
            ) : cloudStatus === 'borrador' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-300 font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                Sincronizado en la Nube (Firestore)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-300 font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                Almacenado localmente (sin sincronizar en Firestore)
              </span>
            )}
          </div>

          {lastCloudSync && (
            <div className="text-[11px] text-stone-500 font-mono">
              Última edición en Firestore: <strong className="text-stone-700">{lastCloudSync.name}</strong> {lastCloudSync.institution ? `(${lastCloudSync.institution})` : ''} · {lastCloudSync.date}
            </div>
          )}
        </div>

        {/* Multi-response notice */}
        <div className="mt-2.5 text-[11px] text-stone-500 bg-stone-50 border border-stone-200/70 rounded-xl px-3.5 py-2 flex flex-wrap items-center justify-between gap-2">
          <span>
            ✅ <strong>Múltiples respuestas habilitadas:</strong> Tu diagnóstico se guarda de forma individual bajo tu usuario sin sobrescribir las respuestas de otros investigadores de <strong>{selectedCountry}</strong>.
          </span>
        </div>
      </div>

      {/* Viewing Another Researcher's Submission Banner */}
      {viewingSubmission && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="text-xs text-amber-900">
            <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200/80 px-2 py-0.5 rounded mr-2">
              Modo Consulta
            </span>
            Estás visualizando la respuesta enviada por <strong>{viewingSubmission.updatedByName}</strong>
            {viewingSubmission.institution ? ` (${viewingSubmission.institution})` : ''} para <strong>{viewingSubmission.country}</strong>.
          </div>
          <button
            type="button"
            onClick={() => fetchCountryData(selectedCountry)}
            className="px-3 py-1.5 text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white rounded-xl transition-colors"
          >
            ← Volver a mi cuestionario
          </button>
        </div>
      )}

      {/* Cloud Responses Explorer & Export Panel */}
      {showAllResponsesPanel && (
        <div className="bg-white border border-indigo-200 rounded-2xl p-5 sm:p-6 shadow-editorial space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Base de Datos Firestore · Eje 3
              </span>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1 font-display">
                Respuestas Recibidas en la Nube ({filteredCloudResponses.length})
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterResponsesCountry}
                onChange={(e) => setFilterResponsesCountry(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold border border-stone-300 rounded-xl bg-stone-50 text-stone-800"
              >
                <option value="ALL">Todos los países ({allCloudResponses.length})</option>
                {RIPCEL_COUNTRIES.map(c => (
                  <option key={c} value={c}>
                    {c} ({countsByCountry[c] || 0})
                  </option>
                ))}
              </select>

              <button
                type="button"
                disabled={filteredCloudResponses.length === 0}
                onClick={handleExportAllCSV}
                className="px-3 py-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl disabled:opacity-40 transition-colors"
              >
                📊 Exportar CSV (Excel)
              </button>
              <button
                type="button"
                disabled={filteredCloudResponses.length === 0}
                onClick={handleExportAllJSON}
                className="px-3 py-1.5 text-xs font-bold bg-stone-800 hover:bg-stone-900 text-white rounded-xl disabled:opacity-40 transition-colors"
              >
                📥 Exportar JSON
              </button>
              <button
                type="button"
                onClick={() => setShowAllResponsesPanel(false)}
                className="px-2.5 py-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800"
              >
                ✕
              </button>
            </div>
          </div>

          {filteredCloudResponses.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-500 bg-stone-50 rounded-xl border border-dashed border-stone-200">
              Aún no hay respuestas sincronizadas en Firestore para el filtro seleccionado.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-[10px] uppercase tracking-wider text-stone-500 font-mono">
                    <th className="py-2.5 px-3">País</th>
                    <th className="py-2.5 px-3">Investigador</th>
                    <th className="py-2.5 px-3">Institución / Cargo</th>
                    <th className="py-2.5 px-3">Estado</th>
                    <th className="py-2.5 px-3">Puntaje Q1 / Gral</th>
                    <th className="py-2.5 px-3">Fecha</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCloudResponses.map(rec => (
                    <tr key={rec.docId} className="hover:bg-stone-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-stone-900">{rec.country}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-stone-800">{rec.updatedByName}</div>
                        {rec.updatedByEmail && (
                          <div className="text-[10px] text-stone-400 font-mono">{rec.updatedByEmail}</div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-stone-600">
                        <div>{rec.institution || '—'}</div>
                        {rec.position && <div className="text-[10px] text-stone-400">{rec.position}</div>}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          rec.status === 'validado_eje3'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rec.status === 'enviado_a_revision'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                          {rec.status === 'validado_eje3'
                            ? 'Validado'
                            : rec.status === 'enviado_a_revision'
                            ? 'Enviado'
                            : 'Borrador'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-stone-700">
                        {rec.payload?.q1_definition?.score ?? '—'} / {rec.payload?.synthesis?.generalScore ?? '—'}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-stone-500">
                        {rec.updateDate || '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleInspectSubmission(rec)}
                          className="px-2.5 py-1 text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg transition-colors"
                        >
                          👁️ Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SECTION 1: MARCO REGULATORIO */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-soft space-y-6">
        <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Módulo 1
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-1 font-display">
              1. Marco Regulatorio
            </h3>
          </div>
        </div>

        {/* Question 1 */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            1. ¿Existe una definición o figura jurídica específica para las comunidades energéticas, o una figura equivalente que pueda utilizarse para crearlas?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Permite distinguir entre países con reconocimiento jurídico expreso y países que dependen de figuras generales como cooperativas, asociaciones o proyectos de generación distribuida tradicional.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Calificación de Reconocimiento (0–4)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {([0, 1, 2, 3, 4] as ScaleRating[]).map(num => {
                  const isSelected = data.q1_definition.score === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setData({
                        ...data,
                        q1_definition: { ...data.q1_definition, score: num }
                      })}
                      className={`py-1.5 px-2 text-center rounded-lg text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-teal-700 text-white border-teal-700 shadow-sm ring-2 ring-teal-500/20'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-stone-500 mt-1 font-mono">
                {SCALE_LABELS[data.q1_definition.score].title}: {SCALE_LABELS[data.q1_definition.score].desc}
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Norma / Estado de Vigencia
              </label>
              <input
                type="text"
                placeholder="Ej. Ley 2294/23, Res. CREG 101 072/25 (Vigente)"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                value={data.q1_definition.law}
                onChange={(e) => setData({
                  ...data,
                  q1_definition: { ...data.q1_definition, law: e.target.value }
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
              Descripción de la figura jurídica o equivalente en el país
            </label>
            <textarea
              rows={3}
              placeholder="Describa cómo se reconocen formalmente las CEs en la legislación nacional..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 leading-relaxed font-sans"
              value={data.q1_definition.text}
              onChange={(e) => setData({
                ...data,
                q1_definition: { ...data.q1_definition, text: e.target.value }
              })}
            />
          </div>
        </div>

        {/* Question 2: Modalities Matrix */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            2. ¿Qué modalidades están permitidas y operativas?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Define qué modelo de comunidad energética es viable en la práctica en cada país y detecta cuellos de botella para el intercambio de excedentes.
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-xl bg-white mt-2">
            <table className="min-w-full text-xs text-left divide-y divide-stone-200">
              <thead className="bg-stone-50 font-mono text-[10px] uppercase tracking-wider text-stone-600">
                <tr>
                  <th className="px-4 py-2.5">Modalidad</th>
                  <th className="px-4 py-2.5 text-center">Estado Operativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150">
                {MODALITIES_LIST.map(mod => {
                  const currentStatus: ModalityStatus = data.q2_modalities[mod] || 'no_permitida';
                  return (
                    <tr key={mod} className="hover:bg-stone-50/50">
                      <td className="px-4 py-2 font-medium text-stone-850">
                        {mod}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex flex-wrap items-center justify-center gap-1">
                          {(['permitida', 'restringida', 'piloto', 'no_permitida'] as ModalityStatus[]).map(status => {
                            const isSelected = currentStatus === status;
                            return (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setData({
                                  ...data,
                                  q2_modalities: { ...data.q2_modalities, [mod]: status }
                                })}
                                className={`px-2 py-1 rounded text-[10px] font-semibold border transition-all ${
                                  isSelected
                                    ? `${MODALITY_LABELS[status].badge} ring-1 ring-stone-400 font-bold`
                                    : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                                }`}
                              >
                                {MODALITY_LABELS[status].label}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Question 3: Connection & Authorization */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            3. ¿Cuál es el proceso de conexión y autorización para un proyecto comunitario?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Permite comparar la facilidad real de implementación y detectar barreras administrativas, técnicas o económicas impuestas por los operadores de red (DSO).
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Entidad Responsable de Autorización / Conexión
              </label>
              <input
                type="text"
                placeholder="Ej. Distribuidor local (OR / DSO) y Ministerio de Energía"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                value={data.q3_connection.responsible}
                onChange={(e) => setData({
                  ...data,
                  q3_connection: { ...data.q3_connection, responsible: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Plazo Estimado de Tramitación
              </label>
              <input
                type="text"
                placeholder="Ej. 3 a 6 meses"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                value={data.q3_connection.estimatedTime}
                onChange={(e) => setData({
                  ...data,
                  q3_connection: { ...data.q3_connection, estimatedTime: e.target.value }
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
              Pasos principales del trámite y Costos aproximados
            </label>
            <textarea
              rows={2}
              placeholder="Indique los hitos principales (solicitud, estudio de red, inspección técnica, firma de contrato)..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
              value={data.q3_connection.steps}
              onChange={(e) => setData({
                ...data,
                q3_connection: { ...data.q3_connection, steps: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
              Principal dificultad detectada
            </label>
            <input
              type="text"
              placeholder="Ej. Falta de medición inteligente (AMI), demoras burocráticas del operador de red..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
              value={data.q3_connection.mainDifficulty}
              onChange={(e) => setData({
                ...data,
                q3_connection: { ...data.q3_connection, mainDifficulty: e.target.value }
              })}
            />
          </div>
        </div>

        {/* Question 4: Compensation Mechanism */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            4. ¿Cómo se compensa o asigna la energía y los excedentes entre integrantes?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> La regla de reparto define la economía del proyecto y la posibilidad de distribuir beneficios de manera justa, evitando la captura corporativa.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Mecanismo Existente
              </label>
              <input
                type="text"
                placeholder="Ej. Net Billing, Coeficientes PDE horarios, Créditos en factura..."
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                value={data.q4_compensation.mechanism}
                onChange={(e) => setData({
                  ...data,
                  q4_compensation: { ...data.q4_compensation, mechanism: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Descripción del esquema de reparto
              </label>
              <textarea
                rows={2}
                placeholder="Describa cómo se valorizan o acreditan los excedentes entre los socios..."
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
                value={data.q4_compensation.description}
                onChange={(e) => setData({
                  ...data,
                  q4_compensation: { ...data.q4_compensation, description: e.target.value }
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: POLÍTICAS PÚBLICAS Y EQUIDAD ENERGÉTICA */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-soft space-y-6">
        <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Módulo 2
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-1 font-display">
              2. Políticas Públicas y Equidad Energética
            </h3>
          </div>
        </div>

        {/* Question 5: Public Incentives */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            5. ¿Qué incentivos públicos vigentes apoyan a las CEs o a la generación distribuida?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Permite identificar apoyos efectivos, compararlos y detectar vacíos de política pública a nivel regional.
          </div>

          <div className="space-y-2 pt-2">
            {data.q5_incentives.map((inc, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-stone-500 w-5 text-right font-bold">{i + 1}.</span>
                <input
                  type="text"
                  placeholder={`Incentivo ${i + 1} (ej. subsidio, exención de IVA, crédito blando, asistencia técnica)...`}
                  className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                  value={inc}
                  onChange={(e) => {
                    const newIncs = [...data.q5_incentives];
                    newIncs[i] = e.target.value;
                    setData({ ...data, q5_incentives: newIncs });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Question 6: Social Tariffs & Vulnerability */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            6. ¿Existen tarifas sociales, programas de electrificación rural, vivienda social, transición justa o medidas para hogares vulnerables que puedan articularse con una CE?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Evalúa si las CEs pueden contribuir a la equidad energética y llegar a quienes no pueden financiar instalaciones individuales.
          </div>

          <textarea
            rows={3}
            placeholder="Indique programas sociales, subsidios cruzados o articulación con bonos sociales existentes..."
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
            value={data.q6_socialTariffs}
            onChange={(e) => setData({ ...data, q6_socialTariffs: e.target.value })}
          />
        </div>

        {/* Question 7: Exclusion Risk */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            7. ¿Qué grupos enfrentan mayor riesgo de exclusión del modelo actual y qué medida concreta permitiría incluirlos?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Mantiene el foco de RIPCEL en una transición justa, no solo en la expansión tecnológica. Considera inquilinos, zonas rurales, mujeres, pueblos indígenas y hogares de bajos ingresos.
          </div>

          <textarea
            rows={3}
            placeholder="Identifique poblaciones vulnerables y mecanismos de salvaguarda (ej. cesión gratuita de capacidad, garantías públicas)..."
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
            value={data.q7_exclusionRisk}
            onChange={(e) => setData({ ...data, q7_exclusionRisk: e.target.value })}
          />
        </div>
      </div>

      {/* SECTION 3: FINANCIAMIENTO Y SOSTENIBILIDAD */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-soft space-y-6">
        <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Módulo 3
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-1 font-display">
              3. Financiamiento y Sostenibilidad
            </h3>
          </div>
        </div>

        {/* Question 8: Multilateral Opportunities */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            8. ¿Qué oportunidades internacionales o multilaterales son accesibles desde el país?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Identifica rutas de financiamiento regional y posibilidades de presentar proyectos coordinados desde RIPCEL (BID/BID Lab, CAF, GCF, UE, etc.).
          </div>

          <textarea
            rows={2}
            placeholder="Mencione agencias multilaterales activas en el país y entidades nacionales de enlace..."
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
            value={data.q8_multilateral}
            onChange={(e) => setData({ ...data, q8_multilateral: e.target.value })}
          />
        </div>

        {/* Question 9: Financial Barriers */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            9. ¿Cuáles son las tres principales barreras financieras para una CE?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Explica por qué un fondo existente puede no ser realmente accesible para comunidades locales (garantías, tasas, falta de personería jurídica, etc.).
          </div>

          <textarea
            rows={2}
            placeholder="Detalle las barreras de financiamiento bancario, garantías y costos de transacción..."
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
            value={data.q9_financialBarriers}
            onChange={(e) => setData({ ...data, q9_financialBarriers: e.target.value })}
          />
        </div>

        {/* Question 10: Business Model */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            10. ¿Cuál sería el modelo de negocio más viable e inclusivo para un piloto en el país?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Vincula el marco regulatorio con la sostenibilidad económica y evita proponer soluciones uniformes para contextos distintos (cooperativa, ESCO, aporte municipal, etc.).
          </div>

          <textarea
            rows={2}
            placeholder="Proponga el esquema de ingresos, tenencia de activos y sostenibilidad operativo-comunitaria..."
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
            value={data.q10_businessModel}
            onChange={(e) => setData({ ...data, q10_businessModel: e.target.value })}
          />
        </div>
      </div>

      {/* SECTION 4: GOBERNANZA, BARRERAS Y OPORTUNIDADES */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-soft space-y-6">
        <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Módulo 4
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-1 font-display">
              4. Gobernanza, Barreras y Oportunidades
            </h3>
          </div>
        </div>

        {/* Question 11: Leading Actors */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            11. ¿Qué actores deberían liderar o acompañar las CEs en el país?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Identifica alianzas institucionales viables y capacidades que la red debe fortalecer (cooperativas, municipios, universidades, etc.).
          </div>

          <textarea
            rows={2}
            placeholder="Identifique roles para gobiernos locales, academia, sociedad civil y operadores..."
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
            value={data.q11_actors}
            onChange={(e) => setData({ ...data, q11_actors: e.target.value })}
          />
        </div>

        {/* Question 12: 3 Barriers & 3 Opportunities FODA */}
        <div className="space-y-4 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            12. Indique las tres principales barreras y las tres principales oportunidades para las CEs en el país
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Produce un FODA nacional comparable y orientado a decisiones, insumo central del diagnóstico regional de RIPCEL.
          </div>

          {/* Barriers */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800 font-mono mb-2 flex items-center gap-1.5">
              <span>⚠️</span> Tres Principales Barreras
            </div>
            <div className="space-y-2">
              {data.q12_barriers.map((bar, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-stone-400 font-mono w-5">B{i + 1}</span>
                  <input
                    type="text"
                    placeholder={`Descripción de la barrera ${i + 1}...`}
                    className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-teal-500"
                    value={bar.text}
                    onChange={(e) => {
                      const newBars = [...data.q12_barriers];
                      newBars[i].text = e.target.value;
                      setData({ ...data, q12_barriers: newBars });
                    }}
                  />
                  <select
                    className="px-2 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50 text-stone-700"
                    value={bar.type}
                    onChange={(e) => {
                      const newBars = [...data.q12_barriers];
                      newBars[i].type = e.target.value as BarrierType;
                      setData({ ...data, q12_barriers: newBars });
                    }}
                  >
                    {(Object.keys(BARRIER_TYPE_LABELS) as BarrierType[]).map(t => (
                      <option key={t} value={t}>{BARRIER_TYPE_LABELS[t]}</option>
                    ))}
                  </select>
                  <select
                    className={`px-2 py-1.5 text-xs border rounded-lg font-semibold ${
                      bar.priority === 'alta' ? 'bg-rose-50 text-rose-700 border-rose-300' :
                      bar.priority === 'media' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                      'bg-stone-50 text-stone-600 border-stone-300'
                    }`}
                    value={bar.priority}
                    onChange={(e) => {
                      const newBars = [...data.q12_barriers];
                      newBars[i].priority = e.target.value as BarrierPriority;
                      setData({ ...data, q12_barriers: newBars });
                    }}
                  >
                    <option value="alta">Prioridad Alta</option>
                    <option value="media">Prioridad Media</option>
                    <option value="baja">Prioridad Baja</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono mb-2 flex items-center gap-1.5">
              <span>✨</span> Tres Principales Oportunidades
            </div>
            <div className="space-y-2">
              {data.q12_opportunities.map((opp, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-stone-400 font-mono w-5">O{i + 1}</span>
                  <input
                    type="text"
                    placeholder={`Descripción de la oportunidad ${i + 1}...`}
                    className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-teal-500"
                    value={opp.text}
                    onChange={(e) => {
                      const newOpps = [...data.q12_opportunities];
                      newOpps[i].text = e.target.value;
                      setData({ ...data, q12_opportunities: newOpps });
                    }}
                  />
                  <select
                    className="px-2 py-1.5 text-xs border border-stone-300 rounded-lg bg-stone-50 text-stone-700"
                    value={opp.type}
                    onChange={(e) => {
                      const newOpps = [...data.q12_opportunities];
                      newOpps[i].type = e.target.value as BarrierType;
                      setData({ ...data, q12_opportunities: newOpps });
                    }}
                  >
                    {(Object.keys(BARRIER_TYPE_LABELS) as BarrierType[]).map(t => (
                      <option key={t} value={t}>{BARRIER_TYPE_LABELS[t]}</option>
                    ))}
                  </select>
                  <select
                    className={`px-2 py-1.5 text-xs border rounded-lg font-semibold ${
                      opp.priority === 'alta' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                      opp.priority === 'media' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                      'bg-stone-50 text-stone-600 border-stone-300'
                    }`}
                    value={opp.priority}
                    onChange={(e) => {
                      const newOpps = [...data.q12_opportunities];
                      newOpps[i].priority = e.target.value as BarrierPriority;
                      setData({ ...data, q12_opportunities: newOpps });
                    }}
                  >
                    <option value="alta">Impacto Alto</option>
                    <option value="media">Impacto Medio</option>
                    <option value="baja">Impacto Bajo</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question 13: Priority Reform */}
        <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-150">
          <div className="font-semibold text-stone-900 text-sm">
            13. ¿Qué reforma, decisión pública o acción institucional tendría mayor impacto durante los próximos dos años para habilitar CEs inclusivas?
          </div>
          <div className="bg-teal-50/70 border-l-4 border-teal-600 p-2.5 rounded-r text-[11px] text-teal-900 leading-relaxed font-sans">
            <strong>Por qué importa:</strong> Convierte el diagnóstico en una recomendación priorizada para los pilotos, la Reunión 3 y los lineamientos regulatorios de RIPCEL.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Entidad Responsable
              </label>
              <input
                type="text"
                placeholder="Ej. CREG / Ministerio de Energía"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                value={data.q13_priorityReform.responsible}
                onChange={(e) => setData({
                  ...data,
                  q13_priorityReform: { ...data.q13_priorityReform, responsible: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Instrumento Posible
              </label>
              <input
                type="text"
                placeholder="Ej. Ley, Decreto, Fondo de Garantía"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                value={data.q13_priorityReform.instrument}
                onChange={(e) => setData({
                  ...data,
                  q13_priorityReform: { ...data.q13_priorityReform, instrument: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
                Plazo Estimado
              </label>
              <input
                type="text"
                placeholder="Ej. 12 a 24 meses"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
                value={data.q13_priorityReform.estimatedTime}
                onChange={(e) => setData({
                  ...data,
                  q13_priorityReform: { ...data.q13_priorityReform, estimatedTime: e.target.value }
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono mb-1">
              Descripción de la acción recomendada
            </label>
            <textarea
              rows={2}
              placeholder="Describa el objetivo concreto de la reforma prioritaria..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-sans"
              value={data.q13_priorityReform.description}
              onChange={(e) => setData({
                ...data,
                q13_priorityReform: { ...data.q13_priorityReform, description: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      {/* SECTION 5: CIERRE - SÍNTESIS NACIONAL EN UNA PÁGINA */}
      <div className="bg-gradient-to-b from-stone-50 to-white border-2 border-teal-600/30 rounded-2xl p-6 sm:p-8 shadow-editorial space-y-6">
        <div className="border-b border-teal-200/60 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-800 bg-teal-100/70 border border-teal-300 px-2.5 py-0.5 rounded font-mono">
              Ficha País Ejecutiva
            </span>
            <span className="text-xs font-mono text-stone-500">
              RIPCEL Eje 3 · Síntesis Comparativa
            </span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 font-display">
            Cierre: Síntesis Nacional en una Página ({data.country})
          </h3>
          <p className="text-xs text-stone-600 mt-1 font-sans">
            Resumen ejecutivo del diagnóstico nacional para consolidar la matriz regional de políticas públicas.
          </p>
        </div>

        {/* General Score Selector */}
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <label className="block text-xs font-bold text-stone-800 mb-2">
            • Nivel General de Habilitación Regulatoria del País (0–4):
          </label>
          <div className="grid grid-cols-5 gap-2">
            {([0, 1, 2, 3, 4] as ScaleRating[]).map(num => {
              const isSelected = data.synthesis.generalScore === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setData({
                    ...data,
                    synthesis: { ...data.synthesis, generalScore: num }
                  })}
                  className={`py-2 px-3 text-center rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-800 shadow-md ring-2 ring-teal-500/30 font-bold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="text-sm font-black">{num}</div>
                  <div className="text-[9px] truncate font-mono">{SCALE_LABELS[num].title.split('—')[1]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Synthesis Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-800 mb-1">
              • Principal Fortaleza del País:
            </label>
            <input
              type="text"
              placeholder="Ej. Marco legal expreso en PND, voluntad política..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
              value={data.synthesis.strength}
              onChange={(e) => setData({
                ...data,
                synthesis: { ...data.synthesis, strength: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-800 mb-1">
              • Principal Barrera Crítica:
            </label>
            <input
              type="text"
              placeholder="Ej. Trabas de conexión y falta de medición inteligente..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
              value={data.synthesis.barrier}
              onChange={(e) => setData({
                ...data,
                synthesis: { ...data.synthesis, barrier: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-800 mb-1">
              • Oportunidad de Financiamiento más Viable:
            </label>
            <input
              type="text"
              placeholder="Ej. Fondos públicos de transición justa (FENOGE), BID Lab..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
              value={data.synthesis.fundingOpportunity}
              onChange={(e) => setData({
                ...data,
                synthesis: { ...data.synthesis, fundingOpportunity: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-800 mb-1">
              • Territorio / Población Prioritaria para Piloto RIPCEL:
            </label>
            <input
              type="text"
              placeholder="Ej. Municipios PDET, comunidades indígenas aisladas, barrios urbanos..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
              value={data.synthesis.pilotTerritory}
              onChange={(e) => setData({
                ...data,
                synthesis: { ...data.synthesis, pilotTerritory: e.target.value }
              })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-stone-800 mb-1">
              • Reforma o Acción Prioritaria a Corto Plazo:
            </label>
            <input
              type="text"
              placeholder="Ej. Estandarizar radicación del Acuerdo de Conformación (ACE) ante operadores de red..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500"
              value={data.synthesis.priorityAction}
              onChange={(e) => setData({
                ...data,
                synthesis: { ...data.synthesis, priorityAction: e.target.value }
              })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-stone-800 mb-1">
              • Normas, Programas o Enlaces Oficiales que Deben Verificarse:
            </label>
            <input
              type="text"
              placeholder="Ej. https://www.minenergia.gov.co/ | Resolución CREG 101 072 de 2025"
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white text-stone-800 focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
              value={data.synthesis.verificationLinks}
              onChange={(e) => setData({
                ...data,
                synthesis: { ...data.synthesis, verificationLinks: e.target.value }
              })}
            />
          </div>
        </div>

        {/* Institutional Verification Notice */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-[11px] text-amber-900 leading-relaxed font-sans">
          <strong>Nota de Validación:</strong> Esta versión breve es un instrumento de primera comparación. Las referencias jurídicas y financieras deben ser verificadas por la coordinación del <strong>Eje 3</strong> antes de incorporarse formalmente a la matriz regional o a las recomendaciones de política pública de la Red RIPCEL.
        </div>

        {/* Bottom Bar Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
          <div className="text-[11px] text-stone-500 font-mono">
            Última edición: {data.updateDate} | Responsable: {data.responsible || 'No especificado'}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={cloudSaving}
              onClick={() => handleSaveToFirestore('borrador')}
              className="px-4 py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-xl shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {cloudSaving ? '☁️ Guardando...' : `☁️ Guardar en Firestore (${data.country})`}
            </button>
            <button
              type="button"
              disabled={cloudSaving}
              onClick={() => handleSaveToFirestore('enviado_a_revision')}
              className="px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              🚀 Enviar a Revisión Eje 3
            </button>
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-3.5 py-2 text-xs font-semibold bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl transition-all"
            >
              Descargar Datos (.json)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
