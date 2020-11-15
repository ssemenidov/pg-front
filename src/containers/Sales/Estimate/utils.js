import { gql } from '@apollo/client';

export const BOOKED_SIDES_QUERY = gql`
  query applicationQuery($id: ID) {
    searchAttachment(id: $id) {
      edges {
        node {
          id
          code
          estimate {
            title
            reservations {
              edges {
                node {
                  id
                  dateFrom
                  dateTo
                  branding
                  design
                  constructionSide {
                    advertisingSide {
                      side {
                        title
                        format {
                          title
                        }
                        code
                      }
                    }
                    construction {
                      location {
                        marketingAddress {
                          address
                        }

                        postcode {
                          district {
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
          sumAfterDiscount
          summa
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
          summaClient
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
                design
                constructionSide {
                  advertisingSide {
                    side {
                      title
                      format {
                        title
                      }
                      code
                    }
                  }
                  construction {
                    location {
                      marketingAddress {
                        address
                      }
                      postcode {
                        district {
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
                sumAfterDiscount
                summa
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
                count
                title
                incomingRent
                incomingTax
                incomingPrinting
                incomingInstallation
                incomingManufacturing
                summaClient
              }
            }
          }
        }
      }
    }
  }
`;

export const getBookedSides = (data) => {
  return data.map((invoice) => {
    return {
      key: invoice.node.id,
      code: invoice.node.constructionSide.advertisingSide.side.code
        ? invoice.node.constructionSide.advertisingSide.side.code
        : '',
      city: invoice.node.constructionSide.construction.location.postcode.district.city.title
        ? invoice.node.constructionSide.construction.location.postcode.district.city.title
        : '',
      address: invoice.node.constructionSide.construction.location.marketingAddress.address,
      format: invoice.node.constructionSide.advertisingSide.side.format.title,
      side: invoice.node.constructionSide.advertisingSide.side.title,
      period:
        new Date(invoice.node.dateFrom).toLocaleDateString() +
        ' - ' +
        new Date(invoice.node.dateTo).toLocaleDateString(),
      branding: invoice.node.branding ? 'Да' : 'Нет',
    };
  });
};

export const getExtraCosts = (data) => {
  return data.map((charge) => {
    return (
      charge.node.city !== null && {
        key: charge.node ? charge.node : '',
        nameOfService: charge.node.title ? charge.node.title : '',
        city: charge.node.city.title ? charge.node.city.title : '',
        period: charge.node.startPeriod
          ? new Date(charge.node.startPeriod).toLocaleDateString() +
            ' - ' +
            new Date(charge.node.endPeriod).toLocaleDateString()
          : '',
        quantity: charge.node.count ? charge.node.count : '',
        price: charge.node.price ? charge.node.price + ' тг.' : '',
        discount: charge.node.discount ? charge.node.discount + '%' : '',
        priceAfterDiscount: charge.node.sumAfterDiscount ? charge.node.sumAfterDiscount + ' тг.' : '',
        sum: charge.node.summa ? charge.node.summa + ' тг.' : '',
        percentAK: 'stub data',
        sumAK: 'stub data',
        sumWithoutAK: 'stub data',
      }
    );
  });
};

export const gettNonRts = (data) => {
  return data.map((item) => {
    return {
      key: item.node.id,
      code: item.node.title,
      city: '',
      quantity: item.node.count,
      rentInput: item.node.incomingRent + ' тг.',
      taxInput: item.node.incomingTax + ' тг.',
      printInput: item.node.incomingPrinting + ' тг.',
      mountInput: item.node.incomingInstallation + ' тг.',
      extraChargeInput: '',
      sumInput: item.node.summaClient + ' тг.',
    };
  });
};
