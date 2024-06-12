import { create } from 'zustand'

// crearemos un estado para la ui
// creamos la interface para el estado
interface State {
  isSideMenuOpen: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}))
