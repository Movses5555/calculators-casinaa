
/**
 * Bill splitting calculation utility
 */

export interface SplitPerson {
  id: string;
  name: string;
  share?: number;
  percentage?: number;
}

export interface SplitItem {
  id: string;
  name: string;
  price: number;
  assignedTo?: string[];
}

export interface BillSplitResult {
  personId: string;
  personName: string;
  amountOwed: number;
  items: Array<{
    itemName: string;
    itemPrice: number;
    shareOfItem: number;
  }>;
}

export const calculateEqualSplit = (
  total: number,
  people: SplitPerson[]
): BillSplitResult[] => {
  if (people.length === 0) return [];
  
  const equalShare = total / people.length;
  
  return people.map(person => ({
    personId: person.id,
    personName: person.name,
    amountOwed: equalShare,
    items: [{
      itemName: 'Total Bill',
      itemPrice: total,
      shareOfItem: equalShare
    }]
  }));
};

export const calculateCustomSplit = (
  items: SplitItem[],
  people: SplitPerson[]
): BillSplitResult[] => {
  if (people.length === 0 || items.length === 0) return [];
  
  // Initialize result with zero amounts
  const result: BillSplitResult[] = people.map(person => ({
    personId: person.id,
    personName: person.name,
    amountOwed: 0,
    items: []
  }));
  
  // Assign items to people
  items.forEach(item => {
    if (!item.assignedTo || item.assignedTo.length === 0) {
      // If not assigned, split equally among all people
      const sharePerPerson = item.price / people.length;
      
      result.forEach(personResult => {
        personResult.amountOwed += sharePerPerson;
        personResult.items.push({
          itemName: item.name,
          itemPrice: item.price,
          shareOfItem: sharePerPerson
        });
      });
    } else {
      // Split among assigned people
      const sharePerPerson = item.price / item.assignedTo.length;
      
      item.assignedTo.forEach(personId => {
        const personResult = result.find(p => p.personId === personId);
        if (personResult) {
          personResult.amountOwed += sharePerPerson;
          personResult.items.push({
            itemName: item.name,
            itemPrice: item.price,
            shareOfItem: sharePerPerson
          });
        }
      });
    }
  });
  
  return result;
};

export const calculatePercentageSplit = (
  total: number,
  people: SplitPerson[]
): BillSplitResult[] => {
  if (people.length === 0) return [];
  
  // Ensure percentages are valid and sum to 100
  const totalPercentage = people.reduce((sum, person) => sum + (person.percentage || 0), 0);
  const normalizedPeople = totalPercentage === 0
    ? people.map(p => ({ ...p, percentage: 100 / people.length }))
    : people.map(p => ({ ...p, percentage: (p.percentage || 0) * (100 / totalPercentage) }));
  
  return normalizedPeople.map(person => {
    const amountOwed = (total * (person.percentage || 0)) / 100;
    
    return {
      personId: person.id,
      personName: person.name,
      amountOwed,
      items: [{
        itemName: 'Total Bill',
        itemPrice: total,
        shareOfItem: amountOwed
      }]
    };
  });
};
