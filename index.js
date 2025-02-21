const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET Request - Returns operation_code
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST Request - Processes input and returns response
app.post("/bfhl", (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.length ? [alphabets.sort().reverse()[0]] : [];

    const response = {
        is_success: true,
        user_id: "your_name_ddmmyyyy",
        email: "your_email@college.com",
        roll_number: "YourRollNumber",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    };

    res.status(200).json(response);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
