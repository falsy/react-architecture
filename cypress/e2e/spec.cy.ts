describe("Posts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/")
  })

  it("Add and Delete posts", () => {
    cy.get(".post-form").find("input[name=Title]").type("Test Title")
    cy.get(".post-form").find("input[name=Content]").type("Test Content")
    cy.get(".post-form").find("button[name=Create]").click()
    cy.get(".post-list").find("li").should("have.length", 2)

    cy.get(".post-list").find("li").eq(1).find("button[name=Delete]").click()
    cy.get(".post-list").find("li").should("have.length", 1)
  })
})
