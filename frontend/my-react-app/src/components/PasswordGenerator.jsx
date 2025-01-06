import React, { useState } from "react";
import axios from "axios";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [avoidSimilar, setAvoidSimilar] = useState(false);
  const [excludeChars, setExcludeChars] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePassword = async (event) => {
    event.preventDefault(); // Fixed typo
    setLoading(true);
    setError(""); // Reset previous errors
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generate-password/",
        {
          length: length,
          include_uppercase: includeUppercase,
          include_lowercase: includeLowercase,
          include_numbers: includeNumbers,
          include_symbols: includeSymbols,
          avoid_similar: avoidSimilar,
          exclude_chars: excludeChars,
        }
      );
      setPassword(response.data.password);
    } catch (error) {
      setError("Failed to generate password. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">
        Password Generator
      </h1>

      <form onSubmit={generatePassword}>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">
            Length:
          </label>
          <input
            type="number"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black "
          />
        </div>

        <div className="space-y-4 mb-6">
          <label className="block text-sm font-semibold text-gray-700">
            Include:
          </label>
          <div className="space-y-2">
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="mr-2"
              />
              Uppercase Letters
            </label>
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="mr-2"
              />
              Lowercase Letters
            </label>
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="mr-2"
              />
              Numbers
            </label>
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="mr-2"
              />
              Symbols
            </label>
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                checked={avoidSimilar}
                onChange={(e) => setAvoidSimilar(e.target.checked)}
                className="mr-2"
              />
              Avoid Similar Characters
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">
            Exclude Characters:
          </label>
          <input
            type="text"
            value={excludeChars}
            onChange={(e) => setExcludeChars(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black "
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Password"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {password && !loading && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Generated Password:
          </h2>
          <p className="text-lg font-medium text-gray-900 mt-2 break-all">
            {password}
          </p>
          <button
            className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
