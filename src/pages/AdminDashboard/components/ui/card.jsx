// File: components/ui/card.js
export function Card({ children, className = '' }) {
    return <div className={`bg-white rounded  outline-0 ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className = '' }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
  }