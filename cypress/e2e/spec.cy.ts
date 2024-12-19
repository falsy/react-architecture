describe("Posts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/")
  })

  it("Add and delete posts", () => {
    cy.get("input[name=title]").type("Test Title")
    cy.get("input[name=content]").type("Test Content")
    cy.get("button[name=Create]").click()

    cy.get("#post-list").find("li").should("exist")

    cy.get("button[name=Delete]").click()
    cy.get("#post-list").find("li").should("not.exist")
  })
})
