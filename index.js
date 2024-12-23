const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Function to generate LMS transaction ID
function generateLmsTransactionId(prefix, msisdn) {
  const uniqueId = Date.now(); // Generate unique ID using timestamp
  return `${prefix}${msisdn.slice(-4)}${uniqueId}`;
}

// POST API route
app.post('/api/transaction', (req, res) => {
  const { msisdn, adjustmentType, points, description, channel } = req.body;

  if (!msisdn || !adjustmentType || !points || !description || !channel) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid request body. Ensure all fields are provided.',
    });
  }

  const transactionID = generateLmsTransactionId('AP', msisdn);

  const responseData = {
    status: 200,
    data: {
      transactionID: transactionID,
      msisdn: msisdn,
      adjustmentType: adjustmentType,
      points: points,
      statusCode: "0",
      description: description,
      channel: channel,
    },
  };

  res.status(200).json(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
