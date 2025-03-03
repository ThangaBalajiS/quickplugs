// Plug type definition
export interface Plug {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  connectors?: Connector[];
  workflow?: any;
  metadata?: any;
}

// Message type definition
export interface GenieMessage {
  id: string;
  content: string;
  sender: 'user' | 'genie';
  timestamp: number;
}

// Add this to your existing types
export interface Connector {
  id: string;
  name: string;
  description: string;
  icon?: string;
  type: string;
} 