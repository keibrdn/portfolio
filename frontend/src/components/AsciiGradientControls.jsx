import { useState } from 'react';
import { DEFAULT_SETTINGS } from './AsciiGradientBackground';

const inputStyle = {
  width: '100%',
  accentColor: '#f3b717',
};

const rowStyle = { marginBottom: 12 };

const labelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 4,
  opacity: 0.85,
};

/**
 * Live tuning panel for AsciiGradientBackground. Only render this in
 * development — it's gated by `import.meta.env.DEV` at the call site
 * (see usage note at the bottom of this file), so it's automatically
 * stripped from production builds by Vite's dead-code elimination.
 *
 * Usage:
 *   const [settings, setSettings] = useState(DEFAULT_SETTINGS);
 *   <AsciiGradientBackground settings={settings} />
 *   {import.meta.env.DEV && (
 *     <AsciiGradientControls settings={settings} onChange={setSettings} />
 *   )}
 */
export default function AsciiGradientControls({ settings, onChange }) {
  const [collapsed, setCollapsed] = useState(false);

  const update = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  const reset = () => onChange(DEFAULT_SETTINGS);

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        width: 260,
        background: 'rgba(255, 252, 244, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(58, 54, 32, 0.15)',
        borderRadius: 10,
        padding: '16px 18px 18px',
        color: '#3a3620',
        fontSize: 12,
        fontFamily: 'ui-monospace, monospace',
        zIndex: 1000,
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
      }}
    >
      <h2
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 14px 0',
          opacity: 0.6,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>Field settings (dev only)</span>
        <span>{collapsed ? '▸' : '▾'}</span>
      </h2>

      {!collapsed && (
        <>
          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Character density</span>
              <span>{settings.density.toFixed(2)}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0" max="1" step="0.01"
              value={settings.density}
              onChange={(e) => update('density', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Blob radius</span>
              <span>{settings.spread}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="80" max="1400" step="10"
              value={settings.spread}
              onChange={(e) => update('spread', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Edge softness</span>
              <span>{settings.softness.toFixed(2)}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0" max="1" step="0.01"
              value={settings.softness}
              onChange={(e) => update('softness', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Boldness</span>
              <span>{settings.boldness.toFixed(2)}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0" max="1" step="0.01"
              value={settings.boldness}
              onChange={(e) => update('boldness', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Middle presence</span>
              <span>{settings.middlefloor.toFixed(2)}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0" max="0.5" step="0.01"
              value={settings.middlefloor}
              onChange={(e) => update('middlefloor', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Grid spacing</span>
              <span>{settings.cell}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="8" max="30" step="1"
              value={settings.cell}
              onChange={(e) => update('cell', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Font</span>
            </label>
            <select
              style={inputStyle}
              value={settings.fontfamily}
              onChange={(e) => update('fontfamily', e.target.value)}
            >
              <option value="'DM Mono', ui-monospace, monospace">DM Mono</option>
              <option value="'JetBrains Mono', ui-monospace, monospace">JetBrains Mono</option>
              <option value="'IBM Plex Mono', ui-monospace, monospace">IBM Plex Mono</option>
              <option value="'Roboto Mono', ui-monospace, monospace">Roboto Mono</option>
              <option value="'Space Mono', ui-monospace, monospace">Space Mono</option>
              <option value="ui-monospace, 'Courier New', monospace">System Mono</option>
            </select>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Font weight</span>
              <span>{settings.fontweight}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="200" max="700" step="100"
              value={settings.fontweight}
              onChange={(e) => update('fontweight', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Character size</span>
              <span>{settings.fontsize}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="8" max="26" step="1"
              value={settings.fontsize}
              onChange={(e) => update('fontsize', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Characters</span>
            </label>
            <input
              style={{ ...inputStyle, padding: '6px 8px', letterSpacing: '0.1em' }}
              type="text"
              maxLength={20}
              value={settings.charset}
              onChange={(e) => update('charset', e.target.value)}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Cursor repel radius</span>
              <span>{settings.radius}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0" max="400" step="10"
              value={settings.radius}
              onChange={(e) => update('radius', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Repel strength</span>
              <span>{settings.strength}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0" max="6000" step="100"
              value={settings.strength}
              onChange={(e) => update('strength', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Spring</span>
              <span>{settings.spring.toFixed(3)}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0.01" max="0.2" step="0.005"
              value={settings.spring}
              onChange={(e) => update('spring', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Damping</span>
              <span>{settings.damping.toFixed(2)}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0.5" max="0.98" step="0.01"
              value={settings.damping}
              onChange={(e) => update('damping', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Ambient shimmer</span>
              <span>{settings.shimmer.toFixed(2)}</span>
            </label>
            <input
              style={inputStyle}
              type="range"
              min="0" max="0.6" step="0.01"
              value={settings.shimmer}
              onChange={(e) => update('shimmer', parseFloat(e.target.value))}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>
              <span>Colors</span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="color"
                style={{ flex: 1, height: 28 }}
                value={settings.colorGold}
                onChange={(e) => update('colorGold', e.target.value)}
                title="Top-right"
              />
              <input
                type="color"
                style={{ flex: 1, height: 28 }}
                value={settings.colorOlive}
                onChange={(e) => update('colorOlive', e.target.value)}
                title="Bottom-left"
              />
              <input
                type="color"
                style={{ flex: 1, height: 28 }}
                value={settings.colorCream}
                onChange={(e) => update('colorCream', e.target.value)}
                title="Background"
              />
            </div>
          </div>

          <button
            onClick={reset}
            style={{
              width: '100%',
              marginTop: 4,
              padding: 8,
              background: 'rgba(58,54,32,0.06)',
              border: '1px solid rgba(58,54,32,0.15)',
              borderRadius: 6,
              color: '#3a3620',
              fontFamily: 'inherit',
              fontSize: 11,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Reset to defaults
          </button>

          <p style={{ fontSize: 10, opacity: 0.5, marginTop: 10, lineHeight: 1.4 }}>
            Once you land on values you like, copy this settings object into
            DEFAULT_SETTINGS in AsciiGradientBackground.jsx and remove this
            panel's usage from your layout.
          </p>
        </>
      )}
    </div>
  );
}
