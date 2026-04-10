import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, AlertCircle } from 'lucide-react';

const PasswordModal = ({ isOpen, onSubmit }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const correctPassword = import.meta.env.VITE_SITE_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      setError('');
      setPassword('');
      onSubmit();
    } else {
      setError(t('incorrectPassword'));
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-emerald-100 p-4 rounded-full">
            <Lock size={32} className="text-emerald-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {t('password')}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {t('enterPassword')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('enterPassword')}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            autoFocus
          />

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
