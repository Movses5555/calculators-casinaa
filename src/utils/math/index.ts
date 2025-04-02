
/**
 * Math utilities index
 */

// Export from individual files
export * from './billSplit';
export * from './numberBase';
export * from './discount';
export * from './pace';
export * from './percentage';

// Namespaced exports to avoid ambiguity
import * as percentageUtils from './percentage';
export { percentageUtils };

import * as discountUtils from './discount';
export { discountUtils };

