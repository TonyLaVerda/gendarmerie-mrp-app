import agentsData from '../../data/agents.json';
import patrolsData from '../../data/patrols.json';
import interventionsData from '../../data/interventions.json';

export async function fetchAgents() {
  return new Promise(resolve => setTimeout(() => resolve(agentsData), 300));
}

export async function fetchPatrols() {
  return new Promise(resolve => setTimeout(() => resolve(patrolsData), 300));
}

export async function fetchInterventions() {
  return new Promise(resolve => setTimeout(() => resolve(interventionsData), 300));
}
