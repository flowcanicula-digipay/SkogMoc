function pexels(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const stockImages = {
  heroBg: pexels(13573493),
  banner: pexels(3965520),
  furniture: pexels(696407),
  interior: pexels(4740484),
  architecture: pexels(7147286),
  landscape: pexels(28461041),
  processConsultation: pexels(5825380),
  processConcept: pexels(30909748),
  processDevelopment: pexels(6790091),
  processDocumentation: pexels(6790072),
  processInstallation: pexels(28513061),
  formulaBg: pexels(6180674),
  servicesGridFurniture: pexels(5570228),
  servicesGridInterior: pexels(3952034),
  expertiseMasterplanning: pexels(5583618),
  expertisePreDesign: pexels(37071204),
  expertiseSchematicDesign: pexels(9617886),
  expertiseDocuments: pexels(4134179),
} as const;
