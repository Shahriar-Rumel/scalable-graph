import NetworkGraph from '@/modules/pages/dashboard/network-graph';

describe('<NetworkGraph />', () => {
  it('renders nodes and edges', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Node 0').should('exist');
    cy.contains('Node 1').should('exist');
    cy.contains('0-1').should('exist');
  });

  it('handles node selection and updates styles', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Node 0').click({ force: true });

    cy.get('[data-id="node-0"]').should('have.css', 'opacity', '1');
    cy.get('[data-id="node-1"]').should('have.css', 'opacity', '0.1');

    cy.get('[data-id="node-1"]').click({ force: true });
    cy.get('[data-id="node-0"]').should('have.css', 'opacity', '0.1');
    cy.get('[data-id="node-1"]').should('have.css', 'opacity', '1');
  });

  it('applies correct edge styles when nodes are selected', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Node 0').click({ force: true });
    cy.get('[data-id="node-0-node-1"]').should('have.css', 'opacity', '1'); // Active edge
  });

  it('renders a loader when data is loading', () => {
    cy.mount(<NetworkGraph />);
    cy.get('[data-testid="loader"]').should('be.visible');
    cy.contains('Initializing Network...').should('exist');
  });

  it('handles edge click events', () => {
    cy.mount(<NetworkGraph />);
    cy.get('[data-id="node-0-node-1"]').click({ force: true });
    cy.get('[data-id="node-0-node-1"]').should('exist');
  });

  it('supports zooming and panning', () => {
    cy.mount(<NetworkGraph />);

    cy.get('.react-flow')
      .trigger('wheel', { deltaY: -100, ctrlKey: true, force: true })
      .trigger('wheel', { deltaY: 100, ctrlKey: true, force: true });

    cy.get('.react-flow')
      .trigger('mousedown', { which: 1, pageX: 100, pageY: 100, force: true })
      .trigger('mousemove', { pageX: 200, pageY: 200, force: true })
      .trigger('mouseup', { force: true });

    cy.contains('Node 0').should('exist');
    cy.contains('Node 1').should('exist');
  });

  it('filters nodes with SearchNodes', () => {
    cy.mount(<NetworkGraph />);
    cy.contains('Search Node').click();
    cy.get('input[placeholder="Search node..."]').type('Node 1{enter}');

    cy.contains('Node 1').should('exist');
    cy.get('[data-id="node-0"]').should('have.css', 'opacity', '0.1');
  });
});
