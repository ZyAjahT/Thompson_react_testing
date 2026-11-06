import { describe, expect, it } from 'vitest'
import {calculateItemTotal, type CartItem, calculateSubtotal } from '../utils/cartUtils'

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

        it('should correctly calculate if quantity zero value', () =>{
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 5.78,
                quantity: 0
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
        it('should correctly calculate if quantity and price zero value', () => {
            const bread: CartItem = {
                id: 1,
                name: 'Bread',
                price: 0,
                quantity: 0
            }
            const breadTotal = calculateItemTotal(bread);
            expect(breadTotal).toBe(0.00);
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
});