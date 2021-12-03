

describe('Shopping test', () => {


    it('Should search for a product', ()=>{
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

        cy.get('input.search-keyword')
            .type('ca')

        cy.wait(2000);
        //not good to check it in this way
        // cy.get('.products')
        //     .should('have.length', 1)

        cy.get('.product:visible')
            .should('have.length', 4)

        //Parent child chaining
        cy.get('div.products div.product')
            .should('have.length', 4)

        cy.get('div.products').as('productsLocator')

        cy.get('@productsLocator')
            .find('.product') //using get will search within the whole page !!! (5)
            .should('have.length', 4)

        cy.get('@productsLocator')
            .find('.product') //using get will search within the whole page !!! (5)
            .eq(1)
            .contains('Carrot - 1 Kg')

        cy.get('@productsLocator')
            .find('.product')
            .each(($el, index, $list) => {
            const productName=$el.find('h4.product-name').text();
            if (productName.includes('Cashews')) {
                $el.find('button').click()
            }
            })
        //assert if logo text is correctly displayed
        cy.get('.brand')
            .should('have.text', 'GREENKART');

        //here promise must be handled manually
        //const logo = cy.get('.brand')
        //cy.log(logo.text()  -> won't work
        cy.get('.brand').then((logo)=>{
            cy.log(logo.text());
        })
       // cy.log(cy.get('.brand').text());  error text90 is not a function, jQuery function must be resolved in promise
    })

    it.only('Should add product to cart and proceed to checkout', ()=>{
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('input.search-keyword')
            .type('ca')
        cy.wait(2000);
        cy.get('div.products').as('productsLocator')
        cy.get('@productsLocator')
            .find('.product')
            .each(($el, index, $list) => {
                const productName=$el.find('h4.product-name').text();
                if (productName.includes('Cashews')) {
                    $el.find('button').click()
                }
            })
    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()

    })

})
