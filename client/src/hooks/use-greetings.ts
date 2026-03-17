import { useState, useEffect } from "react";

interface Greeting {
  name: string;
  message: string;
  timestamp?: string;
}

const SHEET_ID = "1DspRyGEz4HU3fdapEQxpG-tkTVLM3I79bq83Yx53KjA";

// Simple CSV parser that handles quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function useGreetings() {
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch greetings from public Google Sheet (CSV export)
  const fetchGreetings = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch spreadsheet: ${response.status}`);
      }

      const csv = await response.text();
      const lines = csv.split('\n');
      
      const greetingsList: Greeting[] = [];
      
      // Skip header row (line 0) and parse data
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line properly
        const parts = parseCSVLine(line);
        
        // Google Forms adds timestamp as first column, so:
        // Column 0: Timestamp
        // Column 1: Name
        // Column 2: Message
        if (parts.length >= 3) {
          const timestamp = parts[0]?.trim();
          const name = parts[1]?.trim() || "Anonymous";
          const message = parts[2]?.trim();
          
          // Only add if both name and message exist
          if (name && message && message.length > 0) {
            greetingsList.push({ 
              name, 
              message,
              timestamp: timestamp || undefined
            });
          }
        }
      }
      
      console.log('Fetched greetings:', greetingsList);
      setGreetings(greetingsList.reverse()); // Most recent first
    } catch (err) {
      console.error("Error fetching greetings:", err);
      setError("Unable to load greetings at this moment");
      setGreetings([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new greeting to Google Sheet (via Google Form)
  const addGreeting = async (name: string, message: string): Promise<void> => {
    try {
      // Get Google Form ID from environment
      const GOOGLE_FORM_ID = import.meta.env.VITE_GOOGLE_FORM_ID;
      const FORM_NAME_ENTRY = import.meta.env.VITE_FORM_NAME_ENTRY_ID;
      const FORM_MESSAGE_ENTRY = import.meta.env.VITE_FORM_MESSAGE_ENTRY_ID;

      if (!GOOGLE_FORM_ID) {
        // Provide helpful error message
        const helpText = `To submit greetings, please:\n1. Open your Google Sheet\n2. Click Tools → Create a form\n3. Add two fields: "Name" and "Message"\n4. Share the form link with guests\n5. Their responses will appear in the sheet`;
        throw new Error(helpText);
      }

      const formData = new FormData();
      formData.append(`entry.${FORM_NAME_ENTRY}`, name.trim());
      formData.append(`entry.${FORM_MESSAGE_ENTRY}`, message.trim());

      // Use /e/ for published forms
      const response = await fetch(
        `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
        { 
          method: "POST", 
          body: formData, 
          mode: "no-cors" 
        }
      );

      // Wait a bit then refresh to get the new entry
      await new Promise(resolve => setTimeout(resolve, 1500));
      await fetchGreetings();
    } catch (err) {
      console.error("Error adding greeting:", err);
      throw err;
    }
  };

  useEffect(() => {
    // Only fetch once when component mounts
    fetchGreetings();
  }, []);

  return {
    greetings,
    loading,
    error,
    addGreeting,
    refetch: fetchGreetings,
  };
}
