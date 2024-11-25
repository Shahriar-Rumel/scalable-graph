import NetworkGraph from '@/modules/pages/dashboard/network-graph';

describe('<NetworkEdge />', () => {
  it('applies the correct class for active status', () => {
    cy.mount(<NetworkGraph />);
    cy.get('.network-edge').should('have.class', '!stroke-violet-500');
  });

  it('applies the correct class for inactive status', () => {
    cy.mount(<NetworkGraph />);
    cy.get('.network-edge').should('have.class', '!stroke-stone-500');
  });
});
