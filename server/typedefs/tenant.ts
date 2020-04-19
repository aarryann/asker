export default `
  extend type Query {
    tenantByUrl(url: String!): Tenant
  }

  type TenantAddress {
    id: ID!
    tenant: Tenant
    url: String
    type: String
    isPrimary: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type TenantUser {
    id: ID!
    tenant: Tenant
    user: User
    lastLoginOn: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type TenantStudy {
    id: ID!
    tenant: Tenant
    study: Study
    status: String
    updatedBy: User
    updatedOn: String
  }

  type TenantStep {
    id: ID!
    tenant: Tenant
    stepCode: String
    status: String
    updatedBy: User
    updatedOn: String
  }

  type TenantSite {
    id: ID!
    tenant: Tenant
    site: Site
    status: String
    updatedBy: User
    updatedOn: String
  }

  type TenantTest {
    id: ID!
    tenant: Tenant
    test: Test
    status: String
    updatedBy: User
    updatedOn: String
  }

  type TenantMedication {
    id: ID!
    tenant: Tenant
    medication: Medication
    status: String
    updatedBy: User
    updatedOn: String
  }

  type TenantReferral {
    id: ID!
    tenant: Tenant
    referral: Referral
    status: String
    updatedBy: User
    updatedOn: String
  }

`;
