// questions.js - All quiz questions grouped by category (10 per category)

const questions = {
  gk: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
      answer: "Leonardo da Vinci",
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
    },
    {
      id: 5,
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      id: 6,
      question: "Which country is the largest by land area?",
      options: ["USA", "China", "Russia", "Canada"],
      answer: "Russia",
    },
    {
      id: 7,
      question: "What is the chemical symbol for Gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      answer: "Au",
    },
    {
      id: 8,
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      answer: "Nile",
    },
    {
      id: 9,
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      answer: "1945",
    },
    {
      id: 10,
      question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: "Carbon Dioxide",
    },
  ],

  programming: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Link",
        "Home Tool Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      id: 2,
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["/* */", "//", "#", "--"],
      answer: "//",
    },
    {
      id: 3,
      question: "What is the correct way to declare a variable in modern JavaScript?",
      options: ["var x = 5;", "let x = 5;", "dim x = 5;", "int x = 5;"],
      answer: "let x = 5;",
    },
    {
      id: 4,
      question: "Which HTTP method is used to send data to a server?",
      options: ["GET", "DELETE", "POST", "FETCH"],
      answer: "POST",
    },
    {
      id: 5,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      id: 6,
      question: "Which data structure works on the LIFO principle?",
      options: ["Queue", "Array", "Stack", "Linked List"],
      answer: "Stack",
    },
    {
      id: 7,
      question: "What is the output of: console.log(typeof null) in JavaScript?",
      options: ["null", "undefined", "object", "string"],
      answer: "object",
    },
    {
      id: 8,
      question: "Which of the following is NOT a JavaScript framework?",
      options: ["React", "Angular", "Django", "Vue"],
      answer: "Django",
    },
    {
      id: 9,
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Automated Program Integration",
        "App Processing Index",
        "Advanced Program Interface",
      ],
      answer: "Application Programming Interface",
    },
    {
      id: 10,
      question: "Which port does a Node.js Express server typically run on locally by convention?",
      options: ["80", "443", "3000", "8080"],
      answer: "3000",
    },
  ],

  aptitude: [
    {
      id: 1,
      question: "If a train travels 60 km in 1 hour, how far will it travel in 3.5 hours?",
      options: ["180 km", "200 km", "210 km", "240 km"],
      answer: "210 km",
    },
    {
      id: 2,
      question: "What is 15% of 200?",
      options: ["25", "30", "35", "40"],
      answer: "30",
    },
    {
      id: 3,
      question: "If 5 workers complete a job in 8 days, how many days will 10 workers take?",
      options: ["2 days", "4 days", "6 days", "8 days"],
      answer: "4 days",
    },
    {
      id: 4,
      question: "The average of 10, 20, and 30 is:",
      options: ["15", "20", "25", "60"],
      answer: "20",
    },
    {
      id: 5,
      question: "If today is Monday, what day will it be after 25 days?",
      options: ["Monday", "Tuesday", "Wednesday", "Friday"],
      answer: "Friday",
    },
    {
      id: 6,
      question: "A shopkeeper buys an item for ₹400 and sells it for ₹500. What is the profit percentage?",
      options: ["20%", "25%", "15%", "10%"],
      answer: "25%",
    },
    {
      id: 7,
      question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "48"],
      answer: "42",
    },
    {
      id: 8,
      question: "If a pipe fills a tank in 6 hours and another empties it in 12 hours, how long to fill the tank with both open?",
      options: ["6 hours", "12 hours", "18 hours", "24 hours"],
      answer: "12 hours",
    },
    {
      id: 9,
      question: "What is the simple interest on ₹1000 at 5% per year for 3 years?",
      options: ["₹100", "₹150", "₹175", "₹200"],
      answer: "₹150",
    },
    {
      id: 10,
      question: "In a class of 40 students, 60% are girls. How many are boys?",
      options: ["16", "20", "24", "28"],
      answer: "16",
    },
  ],
};

module.exports = questions;
