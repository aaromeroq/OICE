import React, { useState, useMemo } from 'react';
import { membersData } from '../data/members';
import { SearchIcon, BriefcaseIcon } from './Icons';
import { useLanguage } from '../i18n';

export const Members: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');

  const countries = useMemo(() => {
    const list = new Set(membersData.map(m => m.country));
    return ['All', ...Array.from(list).sort()];
  }, []);

  const filteredMembers = useMemo(() => {
    return membersData.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            member.institution.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = filterCountry === 'All' || member.country === filterCountry;
      return matchesSearch && matchesCountry;
    });
  }, [searchTerm, filterCountry]);

  const groupedMembers = useMemo(() => {
    const groups: Record<string, typeof membersData> = {};
    filteredMembers.forEach(m => {
       if (!groups[m.country]) groups[m.country] = [];
       groups[m.country].push(m);
    });
    return groups;
  }, [filteredMembers]);

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">{t('members.title')}</h1>
          <p className="text-stone-500 text-sm mt-1 max-w-2xl">
            {t('members.subtitle')}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              placeholder={t('members.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-56">
            <select
              className="block w-full px-3 py-2.5 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
            >
              {countries.map(c => (
                <option key={c} value={c}>{c === 'All' ? t('members.allCountries') : c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-10">
          {Object.keys(groupedMembers).sort().map(country => (
            <div key={country}>
              <div className="flex items-center mb-4 pb-2 border-b-2 border-stone-200">
                <h2 className="text-lg font-bold text-stone-800">{country}</h2>
                <span className="ml-3 bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {groupedMembers[country].length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMembers[country].map((member, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-teal-200 transition-all flex flex-col h-full relative overflow-hidden group">
                     {member.role.toLowerCase().includes('responsable') && (
                        <div className="absolute top-0 right-0">
                            <span className="inline-block bg-amber-100 text-amber-700 text-[9px] uppercase font-bold px-2 py-1 rounded-bl-lg border-b border-l border-amber-200">Coord</span>
                        </div>
                     )}
                    <h3 className="text-base font-bold text-stone-900 mb-1 pr-12">{member.name}</h3>
                    <div className="text-[11px] text-teal-700 font-semibold mb-3 uppercase tracking-wider">{member.role}</div>

                    <div className="flex-grow">
                        <div className="flex items-start text-sm text-stone-600">
                            <BriefcaseIcon className="h-4 w-4 mr-2 mt-0.5 text-stone-400 flex-shrink-0" />
                            <span className="leading-tight">{member.institution}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100">
                        <a href={`mailto:${member.email}`} className="text-sm text-teal-600 hover:text-teal-800 truncate block transition-colors font-medium">
                            {member.email}
                        </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(groupedMembers).length === 0 && (
             <div className="text-center py-12 text-stone-500">
                 {t('members.empty')}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
