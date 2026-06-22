function pexels(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

function local(name: string) {
  return `/assets/images/installations/${name}`;
}

function localBg(name: string) {
  return `/assets/images/backgrounds/${name}`;
}

export const stockImages = {
  heroBg: pexels(13573493),
  banner: pexels(3965520),
  furniture: local('furniture-5.jpg'),
  interior: local('installation-grand-5.jpg'),
  architecture: pexels(7147286),
  landscape: pexels(14024974),
  processConsultation: pexels(5825380),
  processConcept: pexels(30909748),
  processDevelopment: pexels(6790091),
  processDocumentation: pexels(6790072),
  processInstallation: local('installation-1.jpg'),
  formulaBg: local('installation-grand-1.jpg'),
  servicesGridFurniture: pexels(5570228),
  servicesGridInterior: pexels(3952034),
  expertiseArchitecturalDesign: pexels(5582585),
  expertiseFurnitureDesign: local('furniture-3.jpg'),
  expertiseMaterialSelection: pexels(6580549),
  expertiseSpatialPlanning: pexels(834892),
  extendedBuildingSurveyor: pexels(8278896),
  extendedStructuralEngineer: pexels(10932215),
  extendedHistoricBuildings: pexels(30882228),
  extendedProductionDesigner: pexels(3651904),
  roadmapConsultation: pexels(7964538),
  roadmapConcept: pexels(17077378),
  roadmapDevelopment: pexels(3760788),
  roadmapDocumentation: pexels(6615235),
  roadmapInstallation: local('installation.jpg'),
  roadmapHandover: pexels(7190873),
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
