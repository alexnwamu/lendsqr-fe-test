import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Dashboard from "./page";
import { SearchProvider } from "@/components/SearchContext";
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      get: () => {},
    }),
  };
});
describe("Page", () => {
  it("renders correctly", () => {
    render(
      <SearchProvider>
        <Dashboard />
      </SearchProvider>,
    );
  });
});
