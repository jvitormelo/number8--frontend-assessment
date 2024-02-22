import { useReducer, useState } from "react";
import { RealStateFilterSection } from ".";
import { ProvidersMock } from "../../../../../cypress/support/providers-mock";
import { RealEstateFilter } from "../../types";

describe("Real Estate Filters", () => {
  it("Should search with the correct values", () => {
    const searchMock = cy.stub();

    function MockFilter() {
      const [filter, setFilter] = useReducer(
        (state: RealEstateFilter, newVal: RealEstateFilter) => {
          return { ...state, ...newVal };
        },
        {}
      );

      return (
        <RealStateFilterSection
          filter={filter}
          clear={async () => {}}
          search={searchMock}
          setFilter={setFilter}
        />
      );
    }

    cy.mount(
      <ProvidersMock>
        <MockFilter />
      </ProvidersMock>
    );

    cy.contains("Bedrooms").click().get("div[value=3]:visible").click();

    cy.contains("Bathrooms").click().get("div[value=4]:visible").click();

    cy.contains("Search").click();

    cy.wrap(searchMock).should("be.calledWith", {
      bathrooms: "4",
      bedrooms: "3",
    });
  });
});
