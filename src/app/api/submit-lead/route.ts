// src/app/api/submit-lead/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'city', 'age', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Get Google Sheets URL from environment
    const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    
    if (!GOOGLE_SHEETS_URL) {
      console.error('Google Sheets URL not configured');
      // For development - log the data
      console.log('Lead data (not saved to sheets):', body);
      
      // Still return success to not break the user experience
      return NextResponse.json({ 
        success: true, 
        message: 'Lead received (sheets not configured)',
        data: body 
      });
    }
    
    // Prepare data for Google Sheets
    const sheetData = {
      name: body.name,
      city: body.city,
      age: body.age,
      phone: body.phone,
      course: body.course || body.courseName || 'לא צוין', // Support both field names
      courseName: body.courseName || body.course || 'לא צוין', // Send both for compatibility
      source: body.source || 'טופס אתר',
      timestamp: new Date().toISOString()
    };
    
    // Send to Google Sheets
    // Note: Google Apps Script doesn't support CORS, so we can't use 'cors' mode
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });
    
    // Try to read the response
    let googleResponse;
    try {
      const responseText = await response.text();
      googleResponse = JSON.parse(responseText);
    } catch (parseError) {
      // If we can't parse the response, assume it worked
      console.log('Google Sheets response not parseable, but request likely succeeded');
    }
    
    // Log for debugging (with privacy)
    console.log('Lead submitted:', {
      ...sheetData,
      phone: sheetData.phone.slice(0, -4) + '****' // Privacy: hide last 4 digits
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      timestamp: sheetData.timestamp,
      googleResponse: googleResponse || null
    });
    
  } catch (error) {
    console.error('Error submitting lead:', error);
    
    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// Optional: GET method for testing
export async function GET() {
  const hasGoogleSheets = !!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
  
  return NextResponse.json({
    message: 'Lead submission API is working',
    googleSheetsConfigured: hasGoogleSheets,
    timestamp: new Date().toISOString()
  });
}