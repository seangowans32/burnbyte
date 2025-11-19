import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './History.css';
import { UserAPI } from '../../api.js';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);

  // AOS Animations
  useEffect(() => {
    AOS.init();
  }, []);

  // Fetch history data function
  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await UserAPI.getHistory();
      const historyData = response.history || [];
      const updateTime = new Date();

      console.log(`[History] Fetched ${historyData.length} entries at ${updateTime.toLocaleTimeString()}`);

      if(historyData.length > 0) {
        console.log('[History] Sample entry:', historyData[historyData.length - 1]);
        console.log('[History] Latest entry date:', historyData[historyData.length - 1].date);
      }

      setHistory(historyData);
      setLastUpdate(updateTime);
      setError('');

    } catch (err) {
      setError(err.message || 'Failed to load history');
      console.error('[History] Error fetching history:', err);

    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and set up auto-refresh every minute
  useEffect(() => {
    fetchHistory();
    
    // Auto-refresh every minute (60000ms) to catch new data from scheduler
    const interval = setInterval(() => {
      fetchHistory();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  // Filter out entries where dailyCalories is 0 (no data for that day)
  const historyWithData = history.filter(entry => entry.dailyCalories > 0);

  // Reverse to show newest first (right side of graph)
  const historyReversed = [...historyWithData].reverse();

  // Calculate values for graph
  // Calculate differences: dailyCalories - maintainCalories
  const historyWithDiff = historyReversed.map(entry => {
    const difference = entry.dailyCalories - entry.maintainCalories;
    return {
      ...entry,
      difference,
      isPositive: difference > 0
    };
  });

  // Find max absolute difference for scaling
  const maxAbsDifference = historyWithDiff.length > 0
    ? Math.max(...historyWithDiff.map(h => Math.abs(h.difference)), 100)
    : 100;

  // Scale to show differences nicely (add 20% buffer)
  const maxValue = maxAbsDifference * 2.5;

  // Format date for display - show both date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format: "Nov 3, 2:30 PM"
    const datePart = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    // const timePart = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    // return `${datePart}, ${timePart}`;
    return `${datePart}`;
  };

  return (
    <div className="App">
      <div className="App-body history">
        <div className='container container-2' data-aos="zoom-in-up">
          <div className="form-container">
            <h2>History</h2>
            {lastUpdate && (
              <p>
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            )}

            <div className="legend flex gap-20">
              <div className="legend-item flex gap-10">
                <div className="legend-item-color red"></div>
                <span className="legend-item-label">CUT</span>
              </div>

              <div className="legend-item flex gap-10">
                <div className="legend-item-color green"></div>
                <span className="legend-item-label">BULK</span>
              </div>
            </div>

            {isLoading ? (
              <p>Loading history...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : historyWithDiff.length === 0 ? (
              <p>No history data available yet. History will appear here after your first daily reset with calorie data.</p>
            ) : (
              <div className="history-graph">
                <div className="graph-container">
                  <div className="graph-bars">
                    {/* Zero line (maintain calories baseline) */}
                    <div className="zero-line">
                      {/* <span className="zero-line-label">Maintain (0)</span> */}
                    </div>
                    
                    {historyWithDiff.map((entry, index) => {
                      // Calculate bar height as percentage of max value
                      const barHeight = (Math.abs(entry.difference) / maxValue) * 100;
                      
                      // Position: positive differences go up from center, negative go down from center
                      const barStyle = entry.isPositive 
                        ? { 
                            height: `${barHeight}%`,
                            bottom: '50%' // Starts at center, goes up
                          }
                        : { 
                            height: `${barHeight}%`,
                            top: '50%' // Starts at center, goes down
                          };
                      
                      return (
                        <div key={index} className="graph-bar-group">
                          <div className="bar-container">
                            <div 
                              className={`bar difference-bar ${entry.isPositive ? 'positive' : 'negative'}`}
                              style={barStyle}
                              title={`Daily: ${entry.dailyCalories} cal | Maintain: ${entry.maintainCalories} cal | Diff: ${entry.difference > 0 ? '+' : ''}${entry.difference}`}>

                              <span className="bar-value">
                                {entry.difference > 0 ? '+' : ''}
                                {entry.difference}
                              </span>
                            </div>
                            <span className="bar-label">{formatDate(entry.date)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;