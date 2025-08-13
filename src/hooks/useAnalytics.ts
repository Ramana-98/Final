import { useState, useEffect } from 'react';
import api from './useApi';

interface IncomeData {
  day: string;
  amount: number;
}

interface AnalyticsSummary {
  total: number;
  average: number;
  percentage: string;
}

interface UseAnalyticsReturn {
  data: IncomeData[];
  summary: AnalyticsSummary | null;
  loading: boolean;
  error: string | null;
  fetchData: (period: 'week' | 'month' | 'year') => Promise<void>;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [data, setData] = useState<IncomeData[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (period: 'week' | 'month' | 'year') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/analytics/income/${period}`);
      const { data: incomeData, summary: incomeSummary } = response.data;
      
      setData(incomeData);
      setSummary(incomeSummary);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to fetch analytics data');
      // Fallback to mock data if API fails
      setData(getMockData(period));
      setSummary(getMockSummary(period));
    } finally {
      setLoading(false);
    }
  };

  // Mock data fallback
  const getMockData = (period: 'week' | 'month' | 'year'): IncomeData[] => {
    switch (period) {
      case 'week':
        return [
          { day: "S", amount: 1200 },
          { day: "M", amount: 1800 },
          { day: "T", amount: 2567 },
          { day: "W", amount: 2100 },
          { day: "T", amount: 2300 },
          { day: "F", amount: 1900 },
          { day: "S", amount: 1500 },
        ];
      case 'month':
        return [
          { day: "W1", amount: 8500 },
          { day: "W2", amount: 9200 },
          { day: "W3", amount: 8800 },
          { day: "W4", amount: 9500 },
        ];
      case 'year':
        return [
          { day: "Jan", amount: 45000 },
          { day: "Feb", amount: 52000 },
          { day: "Mar", amount: 48000 },
          { day: "Apr", amount: 55000 },
          { day: "May", amount: 51000 },
          { day: "Jun", amount: 58000 },
          { day: "Jul", amount: 54000 },
          { day: "Aug", amount: 61000 },
          { day: "Sep", amount: 57000 },
          { day: "Oct", amount: 64000 },
          { day: "Nov", amount: 60000 },
          { day: "Dec", amount: 67000 },
        ];
      default:
        return [];
    }
  };

  const getMockSummary = (period: 'week' | 'month' | 'year'): AnalyticsSummary => {
    switch (period) {
      case 'week':
        return { total: 13367, average: 1909.57, percentage: "+20%" };
      case 'month':
        return { total: 36000, average: 9000, percentage: "+15%" };
      case 'year':
        return { total: 660000, average: 55000, percentage: "+25%" };
      default:
        return { total: 0, average: 0, percentage: "+0%" };
    }
  };

  return {
    data,
    summary,
    loading,
    error,
    fetchData,
  };
};

