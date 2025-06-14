export interface Brand {
  code: string;
  name: string;
}

export interface Banner {
  id: string;
  image: string;
  title?: string;
  description?: string;
}

export const BRAND_BANNERS: Record<string, Banner[]> = {
  Fiat: [
    {
      id: 'fiat-1',
      image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80',
      title: 'Fiat Pulse',
      description: 'O novo SUV da Fiat'
    },
    {
      id: 'fiat-2',
      image: 'https://cdn-icons-png.flaticon.com/512/743/743007.png',
      title: 'Fiat Toro',
      description: 'A picape urbana da Fiat'
    },
  ],
  Ford: [
    {
      id: 'ford-1',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
      title: 'Ford Mustang',
      description: 'Ícone de esportividade'
    },
    {
      id: 'ford-2',
      image: 'https://cdn-icons-png.flaticon.com/512/743/743007.png',
      title: 'Ford Ranger',
      description: 'Força e robustez'
    },
  ],
  Chevrolet: [
    {
      id: 'chevrolet-1',
      image: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=800&q=80',
      title: 'Chevrolet Onix',
      description: 'O hatch mais vendido do Brasil'
    },
    {
      id: 'chevrolet-2',
      image: 'https://cdn-icons-png.flaticon.com/512/743/743007.png',
      title: 'Chevrolet Tracker',
      description: 'SUV compacto e moderno'
    },
  ],
  Volkswagen: [
    {
      id: 'vw-1',
      image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80',
      title: 'VW Nivus',
      description: 'Design inovador da Volkswagen'
    },
    {
      id: 'vw-2',
      image: 'https://cdn-icons-png.flaticon.com/512/743/743007.png',
      title: 'VW T-Cross',
      description: 'SUV urbano e versátil'
    },
  ],
}; 