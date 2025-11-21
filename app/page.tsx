'use client'

import { useState } from 'react'
import { Bot, Users, TrendingUp, ShoppingCart, MessageSquare, BarChart3, Settings, Play } from 'lucide-react'

type Agent = {
  id: string
  name: string
  type: 'sales' | 'support' | 'analytics' | 'inventory'
  status: 'active' | 'idle' | 'busy'
  icon: any
  description: string
  metrics: {
    tasksCompleted: number
    successRate: number
    avgResponseTime: string
  }
}

type Message = {
  id: string
  agentId: string
  content: string
  timestamp: Date
  type: 'info' | 'success' | 'warning'
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Agent Ventes Pro',
      type: 'sales',
      status: 'active',
      icon: ShoppingCart,
      description: 'Gère les prospects, qualifie les leads et automatise le suivi des ventes',
      metrics: {
        tasksCompleted: 142,
        successRate: 94,
        avgResponseTime: '2.3s'
      }
    },
    {
      id: '2',
      name: 'Agent Support Client',
      type: 'support',
      status: 'busy',
      icon: MessageSquare,
      description: 'Répond aux questions clients 24/7 et résout les problèmes courants',
      metrics: {
        tasksCompleted: 287,
        successRate: 89,
        avgResponseTime: '1.8s'
      }
    },
    {
      id: '3',
      name: 'Agent Analytique',
      type: 'analytics',
      status: 'active',
      icon: BarChart3,
      description: 'Analyse les données de ventes et génère des rapports prédictifs',
      metrics: {
        tasksCompleted: 56,
        successRate: 97,
        avgResponseTime: '4.1s'
      }
    },
    {
      id: '4',
      name: 'Agent Inventaire',
      type: 'inventory',
      status: 'idle',
      icon: TrendingUp,
      description: 'Optimise les stocks et prédit les besoins en approvisionnement',
      metrics: {
        tasksCompleted: 98,
        successRate: 91,
        avgResponseTime: '3.2s'
      }
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      agentId: '1',
      content: '3 nouveaux prospects qualifiés détectés',
      timestamp: new Date(Date.now() - 120000),
      type: 'success'
    },
    {
      id: '2',
      agentId: '2',
      content: 'Résolution de 5 tickets clients en cours',
      timestamp: new Date(Date.now() - 60000),
      type: 'info'
    },
    {
      id: '3',
      agentId: '3',
      content: 'Rapport hebdomadaire généré - Croissance +15%',
      timestamp: new Date(Date.now() - 30000),
      type: 'success'
    }
  ])

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [userInput, setUserInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const executeAgentTask = async (agent: Agent, task: string) => {
    setIsProcessing(true)

    // Simuler le traitement de l'agent
    setAgents(prev => prev.map(a =>
      a.id === agent.id ? { ...a, status: 'busy' as const } : a
    ))

    await new Promise(resolve => setTimeout(resolve, 2000))

    const responses: Record<string, string> = {
      sales: `Analyse complète effectuée : ${task}. J'ai identifié 8 opportunités de vente avec un potentiel de 45K€. 3 clients nécessitent un suivi immédiat.`,
      support: `Traitement du ticket : ${task}. Solution proposée et envoyée au client. Temps de résolution estimé : 15 minutes. Satisfaction prévue : 95%.`,
      analytics: `Analyse des données : ${task}. Tendances détectées - Pic de ventes le mardi (+23%), Taux de conversion optimal : 14h-16h. Recommandation : augmenter budget publicitaire de 12%.`,
      inventory: `Optimisation stock : ${task}. 4 produits en rupture imminente détectés. Commande automatique suggérée pour 2 articles. Économie potentielle : 3,200€/mois.`
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      agentId: agent.id,
      content: responses[agent.type],
      timestamp: new Date(),
      type: 'success'
    }

    setMessages(prev => [newMessage, ...prev])
    setAgents(prev => prev.map(a =>
      a.id === agent.id
        ? {
            ...a,
            status: 'active' as const,
            metrics: {
              ...a.metrics,
              tasksCompleted: a.metrics.tasksCompleted + 1
            }
          }
        : a
    ))

    setIsProcessing(false)
    setUserInput('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'idle': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif'
      case 'busy': return 'Occupé'
      case 'idle': return 'En attente'
      default: return status
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Bot size={40} color="#667eea" />
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                Système Commercial AI
              </h1>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>
                Agents intelligents pour automatiser et optimiser vos opérations commerciales
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ background: '#f0f4ff', padding: '1rem', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} color="#667eea" />
                <span style={{ fontWeight: '600', color: '#667eea' }}>Agents Actifs</span>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginTop: '0.5rem' }}>
                {agents.filter(a => a.status === 'active').length} / {agents.length}
              </p>
            </div>

            <div style={{ background: '#fff4e6', padding: '1rem', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} color="#ff9800" />
                <span style={{ fontWeight: '600', color: '#ff9800' }}>Tâches Traitées</span>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginTop: '0.5rem' }}>
                {agents.reduce((sum, a) => sum + a.metrics.tasksCompleted, 0)}
              </p>
            </div>

            <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 size={20} color="#4caf50" />
                <span style={{ fontWeight: '600', color: '#4caf50' }}>Taux de Succès</span>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginTop: '0.5rem' }}>
                {Math.round(agents.reduce((sum, a) => sum + a.metrics.successRate, 0) / agents.length)}%
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Agents Panel */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
              Agents IA Disponibles
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {agents.map(agent => {
                const Icon = agent.icon
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    style={{
                      border: selectedAgent?.id === agent.id ? '2px solid #667eea' : '2px solid #e0e0e0',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      background: selectedAgent?.id === agent.id ? '#f0f4ff' : 'white'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                      <div style={{
                        background: '#667eea',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={24} color="white" />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h3 style={{ fontWeight: '600', color: '#333' }}>{agent.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              ...{ background: getStatusColor(agent.status).replace('bg-', '') }
                            }} className={getStatusColor(agent.status)} />
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>
                              {getStatusText(agent.status)}
                            </span>
                          </div>
                        </div>

                        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                          {agent.description}
                        </p>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '0.5rem',
                          marginTop: '0.75rem',
                          fontSize: '0.75rem'
                        }}>
                          <div>
                            <span style={{ color: '#999' }}>Tâches: </span>
                            <span style={{ fontWeight: '600', color: '#333' }}>
                              {agent.metrics.tasksCompleted}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: '#999' }}>Succès: </span>
                            <span style={{ fontWeight: '600', color: '#333' }}>
                              {agent.metrics.successRate}%
                            </span>
                          </div>
                          <div>
                            <span style={{ color: '#999' }}>Temps: </span>
                            <span style={{ fontWeight: '600', color: '#333' }}>
                              {agent.metrics.avgResponseTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Agent Control Panel */}
            {selectedAgent && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#f0f4ff',
                borderRadius: '0.75rem'
              }}>
                <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '1rem' }}>
                  Contrôler {selectedAgent.name}
                </h3>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Décrivez la tâche à effectuer..."
                    disabled={isProcessing}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #ddd',
                      fontSize: '0.875rem'
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && userInput.trim() && !isProcessing) {
                        executeAgentTask(selectedAgent, userInput)
                      }
                    }}
                  />
                  <button
                    onClick={() => executeAgentTask(selectedAgent, userInput)}
                    disabled={!userInput.trim() || isProcessing}
                    style={{
                      background: isProcessing ? '#ccc' : '#667eea',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Play size={16} />
                    {isProcessing ? 'Traitement...' : 'Exécuter'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Activity Feed */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
              Activité en Temps Réel
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map(message => {
                const agent = agents.find(a => a.id === message.agentId)
                if (!agent) return null
                const Icon = agent.icon

                return (
                  <div
                    key={message.id}
                    style={{
                      padding: '1rem',
                      background: message.type === 'success' ? '#e8f5e9' : '#fff3e0',
                      borderRadius: '0.75rem',
                      borderLeft: `4px solid ${message.type === 'success' ? '#4caf50' : '#ff9800'}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                      <div style={{
                        background: 'white',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <Icon size={20} color="#667eea" />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '600', color: '#333', fontSize: '0.875rem' }}>
                            {agent.name}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#999' }}>
                            {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#555', marginTop: '0.5rem', lineHeight: '1.5' }}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#999'
              }}>
                <Bot size={48} style={{ margin: '0 auto', marginBottom: '1rem', opacity: 0.5 }} />
                <p>Aucune activité pour le moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginTop: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '1rem' }}>
            Comment utiliser ce système ?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                <strong>1. Sélectionnez un agent</strong><br />
                Cliquez sur l'agent qui correspond à votre besoin
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                <strong>2. Décrivez la tâche</strong><br />
                Entrez ce que vous voulez que l'agent fasse
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
                <strong>3. Exécutez et suivez</strong><br />
                Lancez la tâche et suivez l'activité en temps réel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
