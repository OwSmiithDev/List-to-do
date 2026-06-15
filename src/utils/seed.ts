import type { Task } from '../types'

export function generateSeedTasks(): Task[] {
  const now = new Date()
  const days = (d: number) =>
    new Date(now.getTime() + d * 86_400_000).toISOString().split('T')[0]
  const past = (d: number) =>
    new Date(now.getTime() - d * 86_400_000).toISOString()

  return [
    {
      id: crypto.randomUUID(),
      titulo: 'Redesign da página inicial',
      descricao: 'Atualizar o layout com novos componentes e melhorar a UX mobile',
      status: 'doing',
      prioridade: 'alta',
      responsavel: 'Ana Costa',
      prazo: days(3),
      etiquetas: ['design', 'frontend'],
      criado_em: past(2),
    },
    {
      id: crypto.randomUUID(),
      titulo: 'Implementar autenticação OAuth',
      descricao: 'Integrar login com Google e GitHub na plataforma',
      status: 'todo',
      prioridade: 'urgente',
      responsavel: 'Carlos Silva',
      prazo: days(7),
      etiquetas: ['backend', 'segurança'],
      criado_em: past(1),
    },
    {
      id: crypto.randomUUID(),
      titulo: 'Migração de banco de dados',
      descricao: 'Migrar de PostgreSQL 13 para 16 com zero downtime',
      status: 'review',
      prioridade: 'urgente',
      responsavel: 'Pedro Rocha',
      prazo: days(-1),
      etiquetas: ['infra', 'banco'],
      criado_em: past(5),
    },
    {
      id: crypto.randomUUID(),
      titulo: 'Documentar API REST',
      descricao: 'Criar documentação Swagger para todos os endpoints da v2',
      status: 'todo',
      prioridade: 'media',
      responsavel: 'Julia Santos',
      prazo: days(14),
      etiquetas: ['docs', 'api'],
      criado_em: past(1),
    },
    {
      id: crypto.randomUUID(),
      titulo: 'Testes E2E com Playwright',
      descricao: 'Cobrir os fluxos críticos de compra e cadastro',
      status: 'doing',
      prioridade: 'alta',
      responsavel: 'Ana Costa',
      prazo: days(5),
      etiquetas: ['qa', 'testes'],
      criado_em: past(3),
    },
    {
      id: crypto.randomUUID(),
      titulo: 'Setup CI/CD no GitHub Actions',
      descricao: 'Pipeline de deploy automático para staging e produção',
      status: 'done',
      prioridade: 'alta',
      responsavel: 'Pedro Rocha',
      prazo: days(-3),
      etiquetas: ['devops'],
      criado_em: past(10),
    },
    {
      id: crypto.randomUUID(),
      titulo: 'Otimização de performance',
      descricao: 'Melhorar Lighthouse score para acima de 90 em todas as métricas',
      status: 'todo',
      prioridade: 'media',
      responsavel: 'Julia Santos',
      prazo: days(21),
      etiquetas: ['performance'],
      criado_em: past(0),
    },
    {
      id: crypto.randomUUID(),
      titulo: 'Relatório Q2 para stakeholders',
      descricao: 'Compilar métricas e resultados do segundo trimestre',
      status: 'review',
      prioridade: 'alta',
      responsavel: 'Carlos Silva',
      prazo: days(2),
      etiquetas: ['gestão'],
      criado_em: past(4),
    },
  ]
}
