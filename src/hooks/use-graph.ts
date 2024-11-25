import { useState, useEffect } from 'react';
import axios from 'axios';
import { Edge } from '@xyflow/react';
import { AppNode } from '@/types/nodes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useGraphData = <T>(url: string, dataKey: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setData(response.data[dataKey]);
      } catch (err) {
        setError(`Failed to fetch ${dataKey}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, dataKey]);

  return { data, loading, error };
};

export const useNodes = () => useGraphData<AppNode>(`${BASE_URL}`, 'nodes');
export const useEdges = () => useGraphData<Edge>(`${BASE_URL}`, 'edges');
