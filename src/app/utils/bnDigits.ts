// Convert English digits to Bengali digits
export function toBengaliDigits(input: string | number): string {
  const enToBn: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return input.toString().replace(/[0-9]/g, d => enToBn[d] || d);
}
