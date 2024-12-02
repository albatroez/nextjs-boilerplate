import { test } from "vitest";
import { render } from "@testing-library/react";
import Home from "@/components/Home";

test("Home", () => {
    render(<Home />);
});
