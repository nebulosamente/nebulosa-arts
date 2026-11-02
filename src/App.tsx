import { Colagem } from './components/sections/Colagem'
import { useMobileReveal } from './hooks/useMobileReveal'

function App() {
  useMobileReveal()
  return <Colagem />
}

export default App
