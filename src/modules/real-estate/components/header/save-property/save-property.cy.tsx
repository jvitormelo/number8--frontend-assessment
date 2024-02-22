import { RealEstate } from "@/modules/real-estate/types";
import { SaveProperty } from ".";
import { ProvidersMock } from "../../../../../../cypress/support/providers-mock";

const selectors = {
  saveButton: "button[data-cy=saveButton]",
  openModalButton: "button[data-cy=openModalButton]",
  removePropertyButton: "button[data-cy=removePropertyButton]",
};

const realEstate: RealEstate = {
  id: 1,
  title: "title",
  slug: "slug",
  description: "description",
  salePrice: 100,
  location: "location",
  bathrooms: 1,
  bedrooms: 1,
  dateListed: new Date().toString(),
  parking: 1,
  pictureURL: "pictureURL",
  sqft: 100,
  thumbnailURL: "thumbnailURL",
  yearBuilt: 2021,
};

describe("should render save property button", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("Save the current Real Estate", () => {
    cy.mount(
      <ProvidersMock>
        <SaveProperty realEstate={realEstate}></SaveProperty>
      </ProvidersMock>
    );
    cy.get(selectors.saveButton).click();

    cy.get(selectors.openModalButton).click();

    cy.get("li").contains(realEstate.title).should("be.visible");
  });

  it("Should Change the text if is saved", () => {
    cy.mount(
      <ProvidersMock>
        <SaveProperty realEstate={realEstate} />
      </ProvidersMock>
    );
    cy.get(selectors.saveButton)
      .contains("Save Property")
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.get(selectors.saveButton)
      .contains("Remove Property")
      .should("be.visible")
      .should("be.not.disabled");
  });

  it("Should remove the property", () => {
    localStorage.setItem("saved-properties", JSON.stringify([realEstate]));

    cy.mount(
      <ProvidersMock>
        <SaveProperty realEstate={realEstate}></SaveProperty>
      </ProvidersMock>
    );

    cy.get(selectors.openModalButton).click();

    cy.get(selectors.removePropertyButton).should("be.visible").click();

    cy.contains("No saved properties").should("be.visible");

    cy.get("body").click();

    cy.get(selectors.saveButton).contains("Save Property").should("be.visible");
  });
});
