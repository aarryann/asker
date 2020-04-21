import gql from 'graphql-tag';

export const queries = {
  currentUser: gql`
    query {
      currentUser {
        user {
          id
          email
        }
      }
    }
  `,
  tenantByUrl: gql`
    query TenantByUrl($url: String!) {
      tenantByUrl(url: $url) {
        id
      }
    }
  `,
};

export const mutations = {
  login: gql`
    mutation Login($email: String!, $password: String!, $url: String!) {
      login(email: $email, password: $password, url: $url) {
        token
        user {
          id
          email
        }
      }
    }
  `,
  register: gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
        }
      }
    }
  `,
};
