import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

// Simple in-memory counter for development
let visitorCountDev = 0;

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        // In development, use in-memory counter
        if (import.meta.env.DEV) {
          visitorCountDev++;
          setVisitorCount(visitorCountDev);
          return;
        }

        // In production, use the API
        const response = await fetch('/api/visitors');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Error:', error);
        // Fallback to showing the last known count
      }
    };

    // Initial fetch
    fetchVisitors();

    // Update every 5 seconds
    const interval = setInterval(fetchVisitors, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 inline-flex items-center space-x-2">
      <Users className="h-6 w-6 text-green-400" />
      <div className="text-white">
        <span className="font-bold text-2xl">{visitorCount}</span>
        <span className="ml-2">Pengunjung Hari Ini</span>
      </div>
    </div>
  );
};

export default VisitorCounter;