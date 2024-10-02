import { useState } from 'react';
import Navbar from '../components/Navbar';

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <input 
          type="text" 
          placeholder="Search Quran and translations..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <button onClick={handleSearch} className="mt-2 p-2 bg-blue-500 text-white rounded-md">
          Search
        </button>

        <div>
          {results.map((result, index) => (
            <p key={index}>{result}</p>
            // <div key={result.id} className="border-b py-2">
            //   <h4>{result.surah_name} - Ayah {result.ayah_number}</h4>
            //   <p>{result.text}</p>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
