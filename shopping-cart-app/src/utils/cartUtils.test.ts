import { describe, expect, it } from 'vitest'
import {calculateItemTotal, type CartItem } from '../utils/cartUtils'


describe('calculateItemTotal', () =>{
    it('should correctly calulate the item total', () =>{
        const apple: CartItem = {
            id: 1,
            name: 'Apple',
            price: 2.50,
            quantity: 2
        }
        const result = calculateItemTotal(apple); 
        expect (result).toBe(5.00)
    })
});