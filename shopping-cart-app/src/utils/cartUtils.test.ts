import { describe, expect, it } from 'vitest'
import {calculateItemTotal, type CartItem, calculateSubtotal, isValidQuantity, calculateDiscount, calculateTax, formatCurrency } from '../utils/cartUtils'

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

describe('calculateTax', () => {
    describe('Normal Cases', () => {
        it('should correctly calculate tax after 10% discount', () => {
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
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(3.2008)
        })
        it('should correctly calculate tax after 5% discount', () => {
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
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(0.22)
        })
        it('should correctly calculate tax after no discount', () => {
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
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(0)
        })
    });
    describe('Edge Cases', () => {
        it('should correctly calculate tax if price is zero with no discount', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 0.00,
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
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(0)
        })
        it('should correctly calculate tax if price is zero with 10% discount', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 0.00,
                quantity: 3
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 150.00,
                quantity: 1
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(1.2)
        })
        it('should correctly calculate tax if price is zero with 5% discount', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 10.00,
                quantity: 6
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 0.00,
                quantity: 1
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(0.24)
        })
        it('should correctly calculate tax of very large values', () => {
            const book: CartItem = {
                id: 1,
                name: 'Book',
                price: 1500.00,
                quantity: 650
            }
            const tv: CartItem = {
                id: 1,
                name: 'TV',
                price: 892.64,
                quantity: 5740
            }
            const items: CartItem[] = [book, tv];
            const subtotal = calculateSubtotal(items);
            const discount = calculateDiscount(subtotal);
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(48790.0288)
        })
        it('should correctly calculate tax with price as a negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: -100.78,
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
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(0)
        })
                it('should correctly calculate tax with quantity as a negative value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 100.78,
                quantity: -2
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
            const tax = calculateTax(discount)
            expect(tax).toBeCloseTo(0)
        })
    });
});

describe('calculateTotal', () => {
    describe('Normal Cases', () => {
        it('should calculate total price with 10% discount', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 50.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            expect(afterDiscount + tax).toBeCloseTo(133.95132)
        })
        it('should calculate total price with 5% discount', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 15.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 3
            }
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            expect(afterDiscount + tax).toBeCloseTo(54.69606) 
        })
        it('should calculate total price with no discount', () => {
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
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            expect(afterDiscount + tax).toBeCloseTo(51.6348)
        })
    });
    describe('Edge Cases', () => {
        it('should calculate when price is zero', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 0.00,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            expect(afterDiscount + tax).toBeCloseTo(39.15)
        })
        it('should calculate total price is negative', () => {
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
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            expect(afterDiscount + tax).toBeCloseTo(26.6652)
        })
        it('should calculate very large numbers', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 1200.00,
                quantity: 450
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 742.89,
                quantity: 1000
            }
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            expect(afterDiscount + tax).toBeCloseTo(1246969.08)
        })
    });
});

describe('formatCurrency', () => {
    describe('Normal Cases', () => {
        it('should correctly format currency', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 50.78,
                quantity: 2
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 7.25,
                quantity: 5
            }
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            const total = afterDiscount + tax
            expect(formatCurrency(total)).toBe('$133.95')
        })
    });
    describe('Edge Cases', () => {
        it('should correctly format currency if the total is zero', () => {
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
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            const total = afterDiscount + tax
            expect(formatCurrency(total)).toBe('$0.00')
        })
        it('should correctly format currency if the total is a negative', () => {
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
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            const total = afterDiscount + tax
            expect(formatCurrency(total)).toBe('$-51.63')
        })
        it('should format very large numbers', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 1200.00,
                quantity: 450
            }
            const paper: CartItem = {
                id: 2,
                name: 'Paper',
                price: 742.89,
                quantity: 1000
            }
            const items: CartItem[] = [bread, paper]
            const subtotal = calculateSubtotal(items)
            const discount = calculateDiscount(subtotal)
            const afterDiscount = subtotal - discount
            const tax = calculateTax(afterDiscount)
            const total = afterDiscount + tax
            expect(formatCurrency(total)).toBe('$1246969.08')
        })
    });
});