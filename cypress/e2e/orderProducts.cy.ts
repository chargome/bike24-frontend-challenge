describe('Order products', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  const addArticle = (name: string) => {
    cy.contains('Select a product').parent().select(name);
    cy.contains(/add to cart/i).click();
  };

  it('can add bike to cart', () => {
    cy.contains('Select a product').parent().select('Bike (999)');
    cy.contains(/add to cart/i).click();
    cy.contains('td', 'Bike')
      .parent('tr')
      .within(() => {
        cy.get('th').eq(0).contains('1');
        cy.get('td').eq(0).contains('Bike');
        cy.get('td').eq(1).contains('999');
        cy.get('td').eq(2).contains('1');
        cy.get('td').eq(3).contains('999');
      });
  });

  it('can remove bike from cart', () => {
    cy.contains('Select a product').parent().select('Bike (999)');
    cy.contains(/add to cart/i).click();
    const testId =
      '[data-testid=delete-icon-207dcb54-8920-11ec-876b-2346543311ec]';
    cy.get(testId).click();
    cy.contains('td', 'Bike').should('not.exist');
  });

  it('cannot add more than max amount of bikes to cart', () => {
    cy.contains('Select a product').parent().select('Bike (999)');
    cy.get('input[type="number"').type('12');
    cy.contains(/add to cart/i).click();
    cy.get('input[type="number"').type('12');
    cy.contains(/add to cart/i).click();
    cy.contains('max quantity reached');
  });

  it('cannot add more than 10 products to cart', () => {
    addArticle('Bike (999)');
    addArticle('ab8d5991-1650-41e7-a18b-1aaa53eca48e');
    addArticle('f99a1035-7f71-46d5-8cf6-425482462228');
    addArticle('b6ff381a-5875-47f3-9e30-dd3e9ca09f14');
    addArticle('f71a1943-de99-49ab-ab75-abc28142b7ca');
    addArticle('0fc61c90-15d3-4470-be1a-952a1730a156');
    addArticle('c24e3e46-605d-4feb-9fc9-187d7c50c067');
    addArticle('0a3f33b7-c5b8-4c3e-8975-ab2b51f85fc5');
    addArticle('8e3973e3-e43e-4370-bfcc-3b84d72bb77d');
    addArticle('e713cc29-9074-49f1-9e9c-d7b340fac027');
    addArticle('4f6dff49-9731-4bfa-9e67-854238328a80');
    cy.contains(/max product amount reached/i).click();
  });

  it('can clear cart', () => {
    cy.contains('Select a product').parent().select('Bike (999)');
    cy.get('input[type="number"').type('12');
    cy.contains(/add to cart/i).click();
    cy.contains(/clear entire cart/i).click();
    cy.contains('td', 'Bike').should('not.exist');
  });

  it('can buy 12 bikes', () => {
    cy.contains('Select a product').parent().select('Bike (999)');
    cy.get('input[type="number"').type('12');
    cy.contains(/add to cart/i).click();
    cy.contains(/buy/i).click();
    cy.contains(/your order has been sent successfully/i).click();
    cy.contains('td', 'Bike').should('not.exist');
  });
});
