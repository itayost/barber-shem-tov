// File: src/utils/dateFormatters.ts
export const formatHebrewDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const hebrewMonths = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  
  const day = date.getDate();
  const month = hebrewMonths[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ב${month}, ${year}`;
};