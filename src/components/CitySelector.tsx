import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { searchCities, getCityPostalCodes, ItalianCity } from '../data/italianCities';

interface CitySelectorProps {
  selectedCity: string;
  selectedCap: string;
  onCityChange: (city: string) => void;
  onCapChange: (cap: string) => void;
  error?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  selectedCap,
  onCityChange,
  onCapChange,
  error
}) => {
  const [cityQuery, setCityQuery] = useState(selectedCity);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showCapDropdown, setShowCapDropdown] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<ItalianCity[]>([]);
  const [availableCaps, setAvailableCaps] = useState<string[]>([]);

  const cityInputRef = useRef<HTMLInputElement>(null);
  const citySuggestionsRef = useRef<HTMLDivElement>(null);
  const capDropdownRef = useRef<HTMLDivElement>(null);

  // Gestisce la ricerca dei comuni
  useEffect(() => {
    if (cityQuery.length >= 2) {
      const suggestions = searchCities(cityQuery);
      setCitySuggestions(suggestions);
      setShowCitySuggestions(true);
    } else {
      setCitySuggestions([]);
      setShowCitySuggestions(false);
    }
  }, [cityQuery]);

  // Aggiorna i CAP disponibili quando cambia la città
  useEffect(() => {
    if (selectedCity) {
      const caps = getCityPostalCodes(selectedCity);
      setAvailableCaps(caps);
      // Se c'è solo un CAP, selezionalo automaticamente
      if (caps.length === 1) {
        onCapChange(caps[0]);
      } else if (caps.length > 1 && !caps.includes(selectedCap)) {
        // Se il CAP selezionato non è valido per la nuova città, resettalo
        onCapChange('');
      }
    } else {
      setAvailableCaps([]);
      onCapChange('');
    }
  }, [selectedCity]);

  // Chiude i dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (citySuggestionsRef.current && !citySuggestionsRef.current.contains(event.target as Node) &&
          cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowCitySuggestions(false);
      }
      if (capDropdownRef.current && !capDropdownRef.current.contains(event.target as Node)) {
        setShowCapDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityQuery(value);
    
    // Se l'input viene svuotato, resetta anche la selezione
    if (!value) {
      onCityChange('');
    }
  };

  const handleCitySelect = (city: ItalianCity) => {
    setCityQuery(city.name);
    onCityChange(city.name);
    setShowCitySuggestions(false);
  };

  const handleCapSelect = (cap: string) => {
    onCapChange(cap);
    setShowCapDropdown(false);
  };

  return (
    <div className="space-y-4">
      {/* Selezione Comune */}
      <div className="relative">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Comune di residenza *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            ref={cityInputRef}
            type="text"
            value={cityQuery}
            onChange={handleCityInputChange}
            onFocus={() => {
              if (citySuggestions.length > 0) {
                setShowCitySuggestions(true);
              }
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              error ? 'border-red-300' : 'border-neutral-300'
            }`}
            placeholder="Inizia a digitare il nome del comune..."
          />
        </div>

        {/* Suggerimenti comuni */}
        {showCitySuggestions && citySuggestions.length > 0 && (
          <div
            ref={citySuggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {citySuggestions.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCitySelect(city)}
                className="w-full px-4 py-3 text-left hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none border-b border-neutral-100 last:border-b-0"
              >
                <div className="font-medium text-neutral-900">{city.name}</div>
                <div className="text-sm text-neutral-600">
                  {city.province} - {city.region}
                </div>
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Selezione CAP */}
      {selectedCity && availableCaps.length > 0 && (
        <div className="relative">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            CAP *
          </label>
          <div className="relative">
            <button
              onClick={() => setShowCapDropdown(!showCapDropdown)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left flex items-center justify-between ${
                error ? 'border-red-300' : 'border-neutral-300'
              }`}
            >
              <span className={selectedCap ? 'text-neutral-900' : 'text-neutral-500'}>
                {selectedCap || 'Seleziona CAP'}
              </span>
              <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${
                showCapDropdown ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown CAP */}
            {showCapDropdown && (
              <div
                ref={capDropdownRef}
                className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
              >
                {availableCaps.map((cap, index) => (
                  <button
                    key={index}
                    onClick={() => handleCapSelect(cap)}
                    className={`w-full px-4 py-2 text-left hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none border-b border-neutral-100 last:border-b-0 ${
                      selectedCap === cap ? 'bg-primary-50 text-primary-900' : 'text-neutral-900'
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            )}
          </div>

          {availableCaps.length > 1 && (
            <p className="mt-1 text-xs text-neutral-500">
              Questo comune ha {availableCaps.length} CAP disponibili
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CitySelector;