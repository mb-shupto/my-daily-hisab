interface Transaction {
  id: string;
  type: 'earning' | 'expense';
  amount: number;
  description: string;
  date: string;
}

interface Debt {
  id: string;
  person: string;
  amount: number;
  isOwedToUser: boolean;
  date: string;
  paid?: boolean;
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}
