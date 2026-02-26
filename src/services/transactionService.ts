import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc,
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Transaction } from '@/types/app';

export interface TransactionRequest {
  item: string;
  emoji: string;
  quantity: number;
  amount: number;
  profitLoss: number;
  type: 'sale' | 'expense';
}

class TransactionService {
  private getTransactionsCollection(userId: string) {
    return collection(db, 'transactions');
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    try {
      const transactionsRef = this.getTransactionsCollection(userId);
      // Only filter by userId - no orderBy to avoid composite index requirement
      // We'll sort in JavaScript instead
      const q = query(
        transactionsRef,
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const transactions: Transaction[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactions.push({
          id: doc.id,
          item: data.item,
          emoji: data.emoji,
          quantity: typeof data.quantity === 'number' ? data.quantity : 1,
          amount: data.amount,
          profitLoss: typeof data.profitLoss === 'number' ? data.profitLoss : 0,
          type: data.type,
          timestamp: data.timestamp?.toDate?.()?.toISOString() || data.timestamp || new Date().toISOString(),
        });
      });
      
      // Sort by timestamp descending (newest first) in JavaScript
      transactions.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
      
      return transactions;
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  async addTransaction(userId: string, transaction: TransactionRequest): Promise<Transaction> {
    try {
      const transactionsRef = this.getTransactionsCollection(userId);
      const transactionData = {
        ...transaction,
        userId,
        timestamp: Timestamp.now(),
      };
      
      const docRef = await addDoc(transactionsRef, transactionData);
      
      return {
        id: docRef.id,
        ...transaction,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    try {
      const transactionRef = doc(db, 'transactions', transactionId);
      await deleteDoc(transactionRef);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }

  async updateTransaction(transactionId: string, transaction: TransactionRequest): Promise<void> {
    try {
      const transactionRef = doc(db, 'transactions', transactionId);
      await updateDoc(transactionRef, {
        ...transaction,
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  }
}

export const transactionService = new TransactionService();
