import { describe, expect, it } from 'vitest'
import {calculateItemTotal, type CartItem, calculateSubtotal, isValidQuantity, calculateDiscount } from '../utils/cartUtils'

describe('calculateItemTotal', () => {
    // Normal Cases 
    describe('Normal Cases', () => {
        it('should correctly calulate the item total', () => {
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 1.37,
                quantity: 5
            }
            const paperTotal = calculateItemTotal(paper);
            expect(paperTotal).toBeCloseTo(6.85);
        })
    });

    // Edge Cases 
    describe('Edge Cases', () => {
        it('should correctly calculate if price zero value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 0.00,
                quantity: 2
            }
            const breadTotal = calculateItemTotal(bread);
            expect(breadTotal).toBe(0.00);
        })
        it('should correctly calculate if price negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: -5.78,
                quantity: 2
            }
            const breadTotal = calculateItemTotal(bread);
            expect(breadTotal).toBeCloseTo(-11.56);
        })
        it('should correctly calculate if quantity is a negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 5.78,
                quantity: -2
            }
            const breadTotal = calculateItemTotal(bread);
            expect(breadTotal).toBeCloseTo(-11.56);
        })
        it('should correctly calculate if quantity and price zero value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 0,
                quantity: 0
            }
            const breadTotal = calculateItemTotal(bread);
            expect(breadTotal).toEqual(0.00);
        })
        it('should correctly calculate if quantity and price negative values', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: -5.78,
                quantity: -2
            }
            const breadTotal = calculateItemTotal(bread);
            expect(breadTotal).toEqual(11.56);
        })
        it('should correctly calculate large values', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 10000.00,
                quantity: 1000
            }
            const breadTotal = calculateItemTotal(bread);
            expect(breadTotal).toBeCloseTo(10000000.00);
        })
    });
});

describe('calculateSubtotal', () => {
    describe('Normal Cases', () => {
        it('should correctly calculate the subtotal for all items', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 5.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper]; 
            const subtotal = calculateSubtotal(items);
            expect(subtotal).toBeCloseTo(47.81)
        })
    });
    describe('Edge Cases', () => {
        it('should handle when prices are zero', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 0.00,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 0.00,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            expect(subtotal).toEqual(0.00)
        })
        it('should calculate very large values', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 1000.00,
                quantity: 200
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 20000.00,
                quantity: 350
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            expect(subtotal).toBeCloseTo(7200000.00)
        })
        it('should handle when one price is a negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: -5.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            expect(subtotal).toBeCloseTo(24.69)
        })
        it('should handle when prices are negative values', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: -5.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: -7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            expect(subtotal).toBeCloseTo(-47.81)
        })
        it('should handle when one quantity is a negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 5.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: -5
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            expect(subtotal).toBeCloseTo(-24.69)
        })
        it('should handle when quantities are negative values', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 5.78,
                quantity: -2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: -5
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            expect(subtotal).toBeCloseTo(-47.81)
        })
    });
});

describe('calculateDiscount', () => {
    describe('Normal Cases', () => {
        it('should correctly calculate 10% discount', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 25.05,
                quantity: 2
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 350.00,
                quantity: 1
            }
            const items: CartItem[] = [book,tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal); 
            expect (discount).toBeCloseTo(40.01)
        })
        it('should correctly calculate 5% discount', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 5.00,
                quantity: 3
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 40.00,
                quantity: 1
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(2.75)
        })
        it('should calculate items that meet no discount requirements', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 5.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread,paper];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(0.00)
        })
    });
    describe('Edge Cases', () => {
        it('should correctly calculate discount if items prices are zero', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 0.00,
                quantity: 2
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 0.00,
                quantity: 1
            }
            const items: CartItem[] = [book,tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal); 
            expect (discount).toBeCloseTo(0.00) 
        })
        it('should correctly calculate large values', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 50.55,
                quantity: 1000
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 675.25,
                quantity: 600
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(45570.00)
        })
        it('should calculate if price is a negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: -5.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(0.00)
        })
        it('should calculate if quantity is a negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 5.78,
                quantity: -2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(0.00)
        })
    });
    describe('Boundary conditions', () => {
        it('should give 10% discount for items that are exactly $100', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 10.00,
                quantity: 5
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 10.00,
                quantity: 5
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(10.00)
        })
        it('should give 5% discount for items that are exactly $50', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 10.00,
                quantity: 2
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 10.00,
                quantity: 3
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(2.50)
        })
        it('should give 5% discount for items that are $51', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 1.00,
                quantity: 1
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 10.00,
                quantity: 5
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(2.55)
        })
        it('should give 5% discount for items that are $101', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 10.00,
                quantity: 10
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 1.00,
                quantity: 1
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            expect(discount).toBeCloseTo(10.10)
        })
    });
});

