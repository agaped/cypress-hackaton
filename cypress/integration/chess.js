
describe('Win chess', () => {

    it('Should win chess game', () => {
        cy.visit('https://hackathon-chess.herokuapp.com/');
        cy.get('.square-e2 > .piece-417db')
            .should('be.visible')
            .dragTo('.square-e3');
        cy.wait(2000)
        cy.get('.square-d1 > .piece-417db')
            .should('be.visible')
            .dragTo('.square-h5');
        cy.wait(2000)
        cy.get('.square-f1 > .piece-417db')
            .should('be.visible')
            .dragTo('.square-c4');
        cy.wait(2000)
        cy.get('.square-h5 > .piece-417db')
            .should('be.visible')
            .dragTo('.square-f7');
        cy.window().contains('Checkmate!');

    })
})
