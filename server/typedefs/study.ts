export default `
  type Study {
    id: ID!
    tenant: Tenant
    name: String
    title: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type StudyVersion {
    id: ID!
    study: Study
    version: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type StudyEvent {
    id: ID!
    study: Study
    eventCode: String
    eventName: String
    eventOrder: Int
    duration: Int
    durationUnit: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type StudyConsent {
    id: ID!
    study: Study
    version: StudyVersion
    url: String
    status: String
    updatedBy: User
    updatedOn: String
  }

`;
