import { StrictMode, Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope/index.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/700.css'
import './index.css'
import { App } from './App.tsx'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary captured:', error, info);
  }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ padding: 32, background: '#0d1117', color: '#ff7b72', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h1 style={{ fontSize: 20, marginBottom: 12 }}>Erro em tempo de execução:</h1>
          <p style={{ fontWeight: 'bold', fontSize: 16, color: '#f0f6fc' }}>{err.message}</p>
          <pre style={{ marginTop: 16, fontSize: 12, color: '#8b949e', whiteSpace: 'pre-wrap' }}>{err.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
