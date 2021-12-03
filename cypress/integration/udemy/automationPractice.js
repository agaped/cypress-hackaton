
describe('Automation practice', () => {


    it('Verify checkbox works', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#checkBoxOption1')
            .check()
            .should('be.checked')
            .and('have.value', 'option1')

        cy.get('input[type="checkbox"]').check(['option2', 'option3']);
    })

    it('Verify static dropdown works', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('select')
            .select('option2') //text or value attribute
            .should('have.value', 'option2')
    })

    it('Verify dynamic dropdown works', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#autocomplete')
            .type('Ind') //text or value attribute

        cy.get('.ui-menu-item-wrapper').each(($el, index, $list)=>{
            if ($el.text() === 'India') {
                $el.click()
            }
        })
        cy.get('#autocomplete')
            .should('have.value', 'India')
    })

    it('Verify hide example works', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#displayed-text')
            .type('India')

        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');
        cy.get('#show-textbox').click();
        cy.get('#displayed-text').should('be.visible');
    })

    it('Verify radio button works', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('input[value="radio2"]')
            .check()
            .should('be.checked');

    })

    it('Verify pop up works', () => {
        //cypress auto accepts alerts
        //cypress has capability of browser events

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#alertbtn')
            .click()

        cy.get('input[value="Confirm"]')
            .click()

        //window:alert
        cy.on('window:alert', (str)=>{
            //mocha
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm', (str)=>{
            //mocha
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?')
        })
    })


    it('Verify switch tab works', () => {
        //do not supported to open child tab
        //target attribute - specifies where to open the linked document
        // what can be verified is whether target is present
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#opentab').click() //opens child window but nothing happens


        //target can be removed by cypress in a test, then
        //window will open in the same window and can be checked
        //jQuery function can be invoked

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'rahulshettyacademy.com/#/index')
        cy.go('back')
    })

    it('Verify table works', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('tr td:nth-child(2)').each(($el, index, $list)=>{
            if ($el.text() === 'QA Expert Course :Software Testing + Bugzilla + SQL + Agile') {
                //find immediate sibling
                cy.get('tr td:nth-child(2)').eq(index).next().should('have.text', '25')
                }
        })
    })

    it.only('Verify mouse hover works', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // focus does not work here
        // cy.get('.mouse-hover-content').focus()
        // cy.get('a[href="#top"]').click()

        cy.get('.mouse-hover-content').invoke('show')
        cy.get('a[href="#top"]').click()
        cy.url().should('include', 'top')

    })

})