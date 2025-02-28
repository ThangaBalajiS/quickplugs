// Plug type definition
export interface Plug {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
}

// Message type definition
export interface GenieMessage {
  id: string;
  content: string;
  sender: 'user' | 'genie';
  timestamp: number;
} 