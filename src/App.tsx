import { Colagem } from './components/sections/Colagem'
import { useMobileReveal } from './hooks/useMobileReveal'
import { navigateTo } from './lib/links'

function App() {
  useMobileReveal()
  return <Colagem onNavigate={navigateTo} />
}

export default App
