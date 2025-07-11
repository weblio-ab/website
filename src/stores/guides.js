import { defineStore } from 'pinia'

export const useGuidesStore = defineStore('guides', () => {
  // Guide categories
  const categories = [
    { key: 'email', icon: 'bi bi-envelope-fill' },
    { key: 'website', icon: 'bi bi-globe' },
    { key: 'technical', icon: 'bi bi-gear-fill' }
  ]

  // All guides data
  const guides = [
    {
      id: 'emailSetup',
      category: 'email',
      component: 'EmailSetupGuide'
    },
    {
      id: 'webmail',
      category: 'email',
      component: 'WebmailGuide'
    },
    {
      id: 'backup',
      category: 'website',
      component: 'BackupGuide'
    },
    {
      id: 'ftp',
      category: 'technical',
      component: 'FtpGuide'
    }
  ]

  // Getters
  function getGuidesByCategory(category) {
    if (category === 'all') {
      return guides
    }
    return guides.filter(guide => guide.category === category)
  }

  function getGuideById(id) {
    return guides.find(guide => guide.id === id)
  }

  function getCategoryIcon(category) {
    const cat = categories.find(c => c.key === category)
    return cat ? cat.icon : 'bi bi-question-circle-fill'
  }

  return {
    categories,
    guides,
    getGuidesByCategory,
    getGuideById,
    getCategoryIcon
  }
})
