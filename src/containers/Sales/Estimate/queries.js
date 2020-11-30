import { gql } from "@apollo/client"

export const CITIES_QUERY = gql`
query {
  searchCity {
    edges {
      node {
        title
        id
      }
    }
  }
}
`;

export const CREATE_ADDITIONAL_COSTS = gql`
mutation createAdditionalCost($input: CreateAdditionalCostsInput!) {
  createSalesAdditionalCost(input: $input) {
    additionalCosts {
      id
      title
      startPeriod
      endPeriod
      count
      discount
      price
      count
      city {
        title
      }
    }
  }
}
`;

export const CREATE_NON_RTS_COSTS = gql`
mutation addNonRts($input: CreateEstimateNonRtsInput!) {
  createSalesNonrts(input: $input) {
    estimateNonRts {
      id
      title
      count
      incomingTax
      incomingRent
      incomingPrinting
      incomingInstallation
      incomingManufacturing
      city {
        title
      }
    }
  }
}
`;

export const BOOKED_SIDES_QUERY = gql`
query applicationQuery($id: ID) {
  searchAttachment(id: $id) {
    edges {
      node {
        id
        code
        reservations {
          edges {
            node {
              id
              dateFrom
              dateTo
              constructionSide {
                advertisingSide {
                  code
                  side {
                    title
                    code
                    format {
                      title
                      code
                    }
                    code
                  }
                }
                construction {
                  numInDistrict
                  location {
                    marketingAddress {
                      address
                    }

                    postcode {
                      title
                      district {
                        title
                        city {
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const EXTRA_COSTS_QUERY = gql`
query additionalCostsQuery($id: ID) {
  searchSalesAdditionalCost(id: $id) {
    edges {
      node {
        id
        title
        city {
          title
        }
        startPeriod
        endPeriod
        price
        count
        discount
        percentAgentCommission
        valueAgentCommission
      }
    }
  }
}
`;

export const NON_RTS_QUERY = gql`
query nonRtsQuery($id: ID) {
  searchSalesNonrts(id: $id) {
    edges {
      node {
        id
        count
        title
        incomingRent
        incomingTax
        incomingPrinting
        incomingInstallation
        incomingManufacturing
        incomingAdditional
        saleRent
        saleTax
        salePrinting
        saleInstallation
        saleManufacturing
        saleAdditional
        valueAgentCommission
        percentAgentCommission
      }
    }
  }
}
`;

export const PROJECT_BOOKED_SIDES_QUERY = gql`
query bookedSidesQuery($id: ID) {
  searchProject(id: $id) {
    edges {
      node {
        reservations {
          edges {
            node {
              id
              dateFrom
              dateTo
              branding
              constructionSide {
                advertisingSide {
                  code
                  side {
                    title
                    code
                    format {
                      title
                      code
                    }
                    code
                  }
                }
                construction {
                  numInDistrict
                  location {
                    marketingAddress {
                      address
                    }
                    postcode {
                      title
                      district {
                        title
                        city {
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const PROJECT_EXTRA_COSTS_QUERY = gql`
query projectExtraCostsQuery($id: ID) {
  searchProject(id: $id) {
    edges {
      node {
        additionalCosts {
          edges {
            node {
              id
              title
              city {
                title
              }
              startPeriod
              endPeriod
              price
              count
              discount
              percentAgentCommission
              valueAgentCommission
            }
          }
        }
      }
    }
  }
}
`;

export const PROJECT_NON_RTS_QUERY = gql`
query projectNonRtsQuery($id: ID) {
  searchProject(id: $id) {
    edges {
      node {
        additionalCostsNonrts {
          edges {
            node {
              id
              city {
                title
              }
              count
              title
              incomingRent
              incomingTax
              incomingPrinting
              incomingInstallation
              incomingManufacturing
              incomingAdditional
              city {
                title
              }
              saleRent
              saleTax
              salePrinting
              saleInstallation
              saleManufacturing
              saleAdditional
              valueAgentCommission
              percentAgentCommission
            }
          }
        }
      }
    }
  }
}
`;

export const UPDATE_ADDITIONAL_COSTS = gql`
  mutation updateAddCosts($id: ID!, $input: UpdateAdditionalCostsInput!) {
    updateSalesAdditionalCost(id: $id, input: $input) {
      additionalCosts {
        id
        endPeriod
        startPeriod
        price
        discount
        percentAgentCommission
        valueAgentCommission
      }
    }
  }
`;

export const UPDATE_NON_RTS = gql`
  mutation updateNonRts($id: ID!, $input: UpdateEstimateNonRtsInput!) {
    updateSalesNonrts(id: $id, input: $input) {
      estimateNonRts {
        id
      }
    }
  }
`;

export const DELETE_ADD_COSTS_QUERY = gql`
  mutation deleteAddCost($id: ID!) {
    deleteSalesAdditionalCost(id: $id) {
      found
      deletedId
    }
  }
`;

export const DELETE_NON_RTS = gql`
  mutation deleteAddCost($id: ID!) {
    deleteSalesNonrts(id: $id) {
      found
      deletedId
    }
  }
`;
