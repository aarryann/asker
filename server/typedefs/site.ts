export default `
  type Site {
    id: ID!
    tenant: Tenant
    name: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type SiteRegisteredStudy {
    id: ID!
    study: Study
    version: StudyVersion
    site: Site
    registeredOn: String
    isCurrent: String
    updatedBy: User
    updatedOn: String
  }

`;
