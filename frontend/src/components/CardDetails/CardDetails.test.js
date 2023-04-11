import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardDetails from "./CardDetails";

describe("CardDetails", () => {
    it("renders card name", async () => {
        // Mock the fetch function to return a sample card
        const card = {
            _id: "1",
            name: "Sample Card",
            imageUrl: "https://example.com/image.jpg",
            price: 100,
            description: "A sample description",
            size: 300,
            address: "123 Main St",
            type: "Apartment",
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(card),
            })
        );

        // Render the CardDetails component
        render(<CardDetails />);

        // Wait for the fetch call to complete
        await screen.findByText(/Sample Card/i);

        // Check if the card name is rendered
        expect(screen.getByText(/Sample Card/i)).toBeInTheDocument();
    });
});
