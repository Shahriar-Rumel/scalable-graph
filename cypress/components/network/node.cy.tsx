import NetworkGraph from '@/modules/pages/dashboard/network-graph';

describe('<NetworkNode />', () => {
  it('renders the node with the correct label', () => {
    cy.mount(<NetworkGraph />);
    cy.get('div').contains('Node 1').should('exist');
  });

  it('applies the correct status-based styling for active status', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Node 0')
      .parent()
      .find('div')
      .should('have.class', 'bg-violet-500');
  });

  it('applies the correct status-based styling for inactive status', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Node 1')
      .parent()
      .find('div')
      .should('have.class', 'bg-stone-500');
  });

  it('applies the correct status-based styling for error status', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Node 2')
      .parent()
      .find('div')
      .should('have.class', 'bg-rose-500');
  });

  it('opens the popover and displays correct content', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Node 1')
      .parent()
      .find('div')
      .click({ multiple: true, force: true });

    cy.should('exist');
    cy.contains('Label').next().should('contain', 'Node 1');
    cy.contains('Description')
      .next()
      .should('contain', 'Description About Node 1');
    cy.contains('IP').next().should('contain', '127.0.0.1');
    cy.contains('Status').next().should('have.class', 'text-stone-300');
  });
});
