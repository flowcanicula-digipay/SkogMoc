import { withBasePath } from './assetPath';

function local(name: string) {
  return withBasePath(`/assets/images/installations/${name}`);
}

function localBg(name: string) {
  return withBasePath(`/assets/images/backgrounds/${name}`);
}

function stock(name: string) {
  return withBasePath(`/assets/images/stock/${name}.jpg`);
}

export const stockImages = {
  heroBg: stock('hero-bg'),
  banner: stock('banner'),
  furniture: local('furniture-5.jpg'),
  interior: local('installation-grand-5.jpg'),
  architecture: stock('architecture'),
  landscape: stock('landscape'),
  processConsultation: stock('process-consultation'),
  processConcept: stock('process-concept'),
  processDevelopment: stock('process-development'),
  processDocumentation: stock('process-documentation'),
  processInstallation: local('installation-1.jpg'),
  formulaBg: local('installation-grand-1.jpg'),
  servicesGridFurniture: stock('services-grid-furniture'),
  servicesGridInterior: stock('services-grid-interior'),
  expertiseArchitecturalDesign: stock('expertise-architectural-design'),
  expertiseFurnitureDesign: local('furniture-3.jpg'),
  expertiseMaterialSelection: stock('expertise-material-selection'),
  expertiseSpatialPlanning: stock('expertise-spatial-planning'),
  extendedBuildingSurveyor: stock('extended-building-surveyor'),
  extendedStructuralEngineer: stock('extended-structural-engineer'),
  extendedHistoricBuildings: stock('extended-historic-buildings'),
  extendedProductionDesigner: stock('extended-production-designer'),
  roadmapConsultation: stock('roadmap-consultation'),
  roadmapConcept: stock('roadmap-concept'),
  roadmapDevelopment: stock('roadmap-development'),
  roadmapDocumentation: stock('roadmap-documentation'),
  roadmapInstallation: local('installation.jpg'),
  roadmapHandover: stock('roadmap-handover'),
  installation1: local('installation.jpg'),
  installation2: local('installation-1.jpg'),
  installation3: local('installation-2.jpg'),
  installation4: local('installation-3.jpg'),
  installation5: local('installation-4.jpg'),
  installation6: local('installation-6.jpg'),
  installation7: local('furniture-0.jpg'),
  installation8: local('furniture-1.jpg'),
  installation9: local('furniture-2.jpg'),
  installation10: local('furniture-3.jpg'),
  installation11: local('furniture-4.jpg'),
  installation12: local('furniture-5.jpg'),
  installation13: local('creation-1.jpg'),
  installation14: local('installation-beauty-1.jpg'),
  installation15: local('installation-beauty-2.jpg'),
  installation16: local('installation-cabinet-1.jpg'),
  installation17: local('installation-door-4.jpg'),
  installation18: local('installation-doors-0.jpg'),
  installation19: local('installation-doors-00.jpg'),
  installation20: local('installation-doors-1.jpg'),
  installation21: local('installation-doors-2.jpg'),
  installation22: local('installation-doors-3.jpg'),
  installation23: local('installation-grand-1.jpg'),
  installation24: local('installation-grand-5.jpg'),
  installation25: local('installlation-grand-2.jpg'),
  installation26: local('installation-stairs-1.jpg'),
  installation27: local('installation-stairs-2.jpg'),
  ctaBg: localBg('skyline-river.jpg'),
} as const;
