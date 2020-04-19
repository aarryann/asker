export default `
  type ActivityStep {
    id: ID!
    stepCode: String
    stepName: String
    description: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type Test {
    id: ID!
    code: String
    name: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type Medication {
    id: ID!
    code: String
    description: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type Referral {
    id: ID!
    code: String
    description: String
    status: String
    updatedBy: User
  }

  type QuestionLibrary {
    id: ID!
    tenant: Tenant
    libraryName: String
    description: String
    status: String
    updatedBy: User
    updatedOn: String
  }
`;
