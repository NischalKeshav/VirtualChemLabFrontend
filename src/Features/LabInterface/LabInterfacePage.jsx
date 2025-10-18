import React, { useState } from 'react';
import './LabInterfacePage.css';

function LabInterfacePage() {
  const [activeTab, setActiveTab] = useState('experiment');
  const [logTab, setLogTab] = useState('log');
  const [selectedReagent, setSelectedReagent] = useState(null);
  const [steps, setSteps] = useState([]);
  const [logEntries, setLogEntries] = useState([]);
  const [hasContent, setHasContent] = useState(false);

  const reagents = [
    { id: 1, name: 'Silver Nitrate', formula: 'AgNO₃', concentration: '0.1M' },
    { id: 2, name: 'Hydrochloric Acid', formula: 'HCl', concentration: '0.1M' },
    { id: 3, name: 'Sodium Hydroxide', formula: 'NaOH', concentration: '0.1M' },
    { id: 4, name: 'Sulfuric Acid', formula: 'H₂SO₄', concentration: '0.1M' },
    { id: 5, name: 'Sodium Carbonate', formula: 'Na₂CO₃', concentration: '0.1M' },
    { id: 6, name: 'Ammonia Solution', formula: 'NH₃(aq)', concentration: '0.1M' }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 5);
  };

  const handleReagentClick = (reagent) => {
    setSelectedReagent(reagent);
    const time = getCurrentTime();
    const newStep = {
      id: Date.now(),
      name: `${reagent.name} (${reagent.concentration})`,
      description: 'White precipitate (AgCl) forms immediately upon addition',
      time: time
    };
    setSteps([newStep, ...steps]);
    
    const newLogEntry = {
      id: Date.now(),
      title: `${reagent.name} (${reagent.concentration})`,
      description: 'White precipitate (AgCl) forms immediately upon addition',
      time: time
    };
    setLogEntries([newLogEntry, ...logEntries]);
    setHasContent(true);
  };

  const handleAction = (actionName) => {
    const time = getCurrentTime();
    const newStep = {
      id: Date.now(),
      name: actionName,
      description: `${actionName} action applied to the sample`,
      time: time
    };
    setSteps([newStep, ...steps]);
    
    const newLogEntry = {
      id: Date.now(),
      title: actionName,
      description: `${actionName} action applied to the sample`,
      time: time
    };
    setLogEntries([newLogEntry, ...logEntries]);
  };

  const handleUndo = () => {
    if (steps.length > 0) {
      setSteps(steps.slice(1));
      setLogEntries(logEntries.slice(1));
      if (steps.length === 1) {
        setSelectedReagent(null);
        setHasContent(false);
      }
    }
  };

  return (
    <div className="lab-container">
      <header className="lab-header">
        <div className="lab-title">
          <svg className="lab-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 22q-.825 0-1.413-.588T4 20V10q0-.425.288-.713T5 9h4V6q0-.425.288-.713T10 5h4q.425 0 .713.288T15 6v3h4q.425 0 .713.288T20 10v10q0 .825-.588 1.413T18 22H6zm0-2h12V11H6v9zm3-11h6V7h-6v2z"/>
          </svg>
          <div>
            <h1>VirtualChemLab</h1>
            <p className="lab-subtitle">Interactive Inorganic Analysis</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="lab-content">
        <div className="panel workbench">
          <h2 className="panel-title">Workbench</h2>
          <p className="panel-subtitle">Unknown Salt A</p>

          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'experiment' ? 'active' : ''}`}
              onClick={() => setActiveTab('experiment')}
            >
              Experiment
            </button>
            <button 
              className={`tab ${activeTab === 'prediction' ? 'active' : ''}`}
              onClick={() => setActiveTab('prediction')}
            >
              Prediction
            </button>
          </div>

          <div className="test-tube-container">
            <div className={`test-tube ${hasContent ? 'active' : ''}`}></div>
          </div>

          <p className="reagent-info">
            {selectedReagent ? selectedReagent.name : 'Select a reagent from the shelf'}
          </p>

          <div className="actions-section">
            <h3 className="actions-title">Actions</h3>
            <div className="actions-grid">
              <button className="action-btn" onClick={() => handleAction('Heat')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z"/>
                </svg>
                Heat
              </button>
              <button className="action-btn" onClick={() => handleAction('Filter')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14z"/>
                </svg>
                Filter
              </button>
              <button className="action-btn" onClick={() => handleAction('Dilute')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
                </svg>
                Dilute
              </button>
              <button className="action-btn" onClick={() => handleAction('Wait')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7l-.8 1.3z"/>
                </svg>
                Wait
              </button>
            </div>
          </div>
        </div>

        <div className="middle-panel">
          <div className="panel">
            <h2 className="panel-title">Reagent Shelf</h2>
            <p className="panel-subtitle">Select a reagent to add to your sample</p>

            <div className="reagent-grid">
              {reagents.map(reagent => (
                <div 
                  key={reagent.id}
                  className={`reagent-card ${selectedReagent?.id === reagent.id ? 'selected' : ''}`}
                  onClick={() => handleReagentClick(reagent)}
                >
                  <h3 className="reagent-name">{reagent.name}</h3>
                  <p className="reagent-formula">{reagent.formula}</p>
                  <p className="reagent-concentration">{reagent.concentration}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-steps">
            <div className="recent-steps-header">
              <h3>Recent Steps</h3>
              <button className="undo-btn" onClick={handleUndo} disabled={steps.length === 0}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                </svg>
                Undo
              </button>
            </div>

            {steps.length > 0 ? (
              steps.map(step => (
                <div key={step.id} className="step-item">
                  <div className="step-header">
                    <h4 className="step-name">{step.name}</h4>
                    <span className="step-time">{step.time}</span>
                  </div>
                  <p className="step-description">{step.description}</p>
                </div>
              ))
            ) : (
              <p className="empty-state">No steps yet. Add a reagent to begin.</p>
            )}
          </div>
        </div>

        <div className="panel log-panel">
          <div className="log-tabs">
            <button 
              className={`log-tab ${logTab === 'log' ? 'active' : ''}`}
              onClick={() => setLogTab('log')}
            >
              Log
            </button>
            <button 
              className={`log-tab ${logTab === 'notes' ? 'active' : ''}`}
              onClick={() => setLogTab('notes')}
            >
              Notes
            </button>
            <button 
              className={`log-tab ${logTab === 'results' ? 'active' : ''}`}
              onClick={() => setLogTab('results')}
            >
              Results
            </button>
          </div>

          <div className="log-content">
            {logTab === 'log' && (
              <>
                {logEntries.length > 0 ? (
                  logEntries.map(entry => (
                    <div key={entry.id} className="log-entry">
                      <div className="log-entry-header">
                        <svg className="log-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 22q-.825 0-1.413-.588T4 20V10q0-.425.288-.713T5 9h4V6q0-.425.288-.713T10 5h4q.425 0 .713.288T15 6v3h4q.425 0 .713.288T20 10v10q0 .825-.588 1.413T18 22H6z"/>
                        </svg>
                        <h4 className="log-entry-title">{entry.title}</h4>
                        <span className="log-entry-time">{entry.time}</span>
                      </div>
                      <p className="log-entry-description">{entry.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    No log entries yet. Perform actions to see them here.
                  </div>
                )}
              </>
            )}

            {logTab === 'notes' && (
              <div className="empty-state">
                Notes section - Add your observations here.
              </div>
            )}

            {logTab === 'results' && (
              <div className="empty-state">
                Results will appear here after completing the experiment.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="keyboard-shortcuts">
        <div className="shortcut">
          <span>Keyboard shortcuts</span>
          <span className="shortcut-key">?</span>
        </div>
        <div className="shortcut">
          <span>Add reagent</span>
          <span className="shortcut-key">A</span>
        </div>
        <div className="shortcut">
          <span>Heat</span>
          <span className="shortcut-key">H</span>
        </div>
        <div className="shortcut">
          <span>Filter</span>
          <span className="shortcut-key">F</span>
        </div>
        <div className="shortcut">
          <span>Dilute</span>
          <span className="shortcut-key">D</span>
        </div>
      </div>
    </div>
  );
}

export default LabInterfacePage;
