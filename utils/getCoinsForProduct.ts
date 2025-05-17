export function getCoinsForProduct(productId: string): number {
    switch (productId) {
        case "d2f14d56-eb91-4466-ab2e-501a9755ae7f":
            return 10;
        case "36870a5a-1489-4dc2-beb3-1528d5a79cf1":
            return 30;
        case "05f8b341-2e93-44c6-9aad-b7b4c879ea13":
            return 70;
        default:
            throw new Error("Invalid product ID");
    }
}
