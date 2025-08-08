import React, { useState, useEffect } from 'react';
import styles from './AnalyzePredict.module.css';

const AnalyzePredict = ({ onLogout }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [threats, setThreats] = useState([]);
  const [confidence, setConfidence] = useState(null);

  useEffect(() => {
    document.title = 'CyberSecure AI - Threat Prediction';
    return () => {
      document.title = 'CyberSecure AI';
    };
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setThreats([]);
    setConfidence(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('❌ Token not found. Please login again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://ai-cyber-threat-detection.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ input }),
      });

      const text = await response.text(); // Get raw text for logging
      console.log('📦 Raw response:', text); // Debug log

      let data;
      try {
        data = JSON.parse(text); // Attempt to parse JSON
      } catch (err) {
        throw new Error(`Invalid JSON response: ${text.slice(0, 100)}...`);
      }

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Unexpected server error.');
      }

      setResult(data.prediction);
      setThreats(data.found_threats || []);
      setConfidence(data.confidence || null);

    } catch (err) {
      console.error('❌ Analyze error:', err);
      setError(`❌ Failed to analyze threat. ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className={styles.analyzeContainer}>
      <div className={styles.analyzeHeader}>
        <h1 className={styles.analyzeTitle}>🛡️ AI Threat Analyzer</h1>
        <button onClick={onLogout} className={styles.analyzeLogoutButton}>
          Logout
        </button>
      </div>

      <div className={styles.analyzeCard}>
        <h2 className={styles.analyzeSectionTitle}>Input Threat Data</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste suspicious logs, URLs, messages, or system activity here..."
          className={styles.analyzeTextarea}
          rows={8}
        />

        <button
          onClick={handleAnalyze}
          className={styles.analyzeAnalyzeButton}
          disabled={loading || !input.trim()}
        >
          {loading ? 'Analyzing...' : '🔍 Analyze Threat'}
        </button>

        {loading && (
          <p className={styles.analyzeLoadingText}>Please wait... ⏳</p>
        )}

        {(result || error) && (
          <div className={styles.analyzeResult}>
            {error && <p className={styles.analyzeError}>{error}</p>}

            {result && (
              <div>
                <p className={styles.analyzePrediction}>
                  <strong>Result:</strong> {result}
                </p>

                {threats.length > 0 && (
                  <div className={styles.analyzeThreatsBox}>
                    <strong>Detected Threats:</strong>
                    <ul>
                      {threats.map((threat, index) => (
                        <li key={index}>⚠️ {threat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {confidence !== null && (
                  <p className={styles.analyzeConfidence}>
                    <strong>Confidence:</strong> {(confidence * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePredict;
