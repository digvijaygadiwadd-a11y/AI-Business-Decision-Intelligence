describe('AI Business Decision Intelligence E2E Suite', () => {
  it('Loads dashboard and verifies components', () => {
    cy.visit('http://localhost:5173');
    cy.contains('AI Business Decision Intelligence Platform').should('be.visible');
    cy.contains('Secure Authentication').should('be.visible');
    cy.contains('Stockout & Inventory Risk').should('be.visible');
    cy.contains('SQL Copilot').click();
    cy.contains('SQL Copilot & Natural Language Interface').should('be.visible');
  });

  it('Tests ML Simulator workflow', () => {
    cy.visit('http://localhost:5173');
    cy.contains('ML Simulator').click();
    cy.contains('Scikit-Learn ML Scenario Simulator').should('be.visible');
    cy.get('button').contains('Run ML Forecasting').click();
  });
});
