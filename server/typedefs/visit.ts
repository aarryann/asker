export default `
  extend type Query {
    allSubjects(studyId: ID!, siteId: ID!): [Subject]
    oneSubject: [Subject]
  }

  type Screening {
    id: ID!
    tenant: Tenant
    mrn: String
    firstName: String
    middleInitial: String
    lastName: String
    currentGender: String
    dob: String
    screenedOn: String
    updatedBy: User
    updatedOn: String
  }

  type Subject {
    id: ID!
    tenant: Tenant
    mrn: String
    pid: String!
    firstName: String!
    middleInitial: String
    lastName: String!
    currentGender: String!
    dob: String!
    isDobApprox: Boolean
    updatedBy: User
    updatedOn: String
  }

  type StudySubject {
    id: ID!
    subject: Subject
    screening: Screening
    site: Site
    study: Study
    sitePid: String
    enrollmentDate: String
    enrollmentStatus: String
    enrollmentStatusDate: String
    updatedBy: User
    updatedOn: String
  }

  type SubjectVisit {
    id: ID!
    studySubject: StudySubject
    version: StudyVersion
    eventCode: String
    eventName: String
    isUnscheduled: String
    visitDate: String
    visitReason: String
    updatedBy: User
    updatedOn: String
  }

  type SubjectConsent {
    id: ID!
    studySubject: StudySubject
    studyConsent: StudyConsent
    consentedOn: String
    updatedBy: User
    updatedOn: String
  }

  type EventStep {
    id: ID!
    study: Study
    eventCode: String
    groupName: String
    stepCode: String
    groupId: EventStep
    status: String
    updatedBy: User
    updatedOn: String
  }

  type VisitSummary {
    subjectVisit: SubjectVisit
    issueCount: Int
    updatedOn: String
  }

  type VisitDetail {
    id: ID!
    subjectVisit: SubjectVisit
    stepCode: String
    issueCount: Int
    updatedOn: String
  }

  type Demographic {
    studySubject: StudySubject
    birthGender: String
    race: String
    ethnicity: String
    birthCountry: String
    updatedOn: String
  }

  type VisitTest {
    id: ID!
    studySubject: StudySubject
    test: Test
    placedOn: String
    effectiveOn: String
    updatedBy: User
    updatedOn: String
  }

  type VisitOrder {
    id: ID!
    studySubject: StudySubject
    orderCode: String
    orderDate: String
    updatedBy: User
    updatedOn: String
  }

  type VisitReferral {
    id: ID!
    studySubject: StudySubject
    referral: Referral
    referredOn: String
    updatedBy: User
    updatedOn: String
  }

  # this schema allows the following mutation:
  extend type Mutation {
    addSubject(firstName: String!, middleInitial: String, lastName: String!, currentGender: String!, dob: String!, isDobApprox: Boolean): Subject
  }

  extend type Subscription {
    subjectAdded: Subject
  }
`;
