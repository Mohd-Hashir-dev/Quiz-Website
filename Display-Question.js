//#################################################################################
//* Quiz Logic Code
// Code for topic selection


const question = document.getElementById("question");
const option = Array.from(document.getElementsByClassName("option"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const selectedTopic = localStorage.getItem('selectedTopic'); // Retrieve the selected topic from local storage

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Quiz Questions
const questions = {
    sport: [
        {
            question: "Which country won the FIFA World Cup in 2018?",
            option1: "Brazil",
            option2: "Germany",
            option3: "France",
            option4: "Argentina",
            answer: 3
        },
        {
            question: "Who holds the record for the most home runs in a single MLB season?",
            option1: "Barry Bonds",
            option2: "Babe Ruth",
            option3: "Hank Aaron",
            option4: "Mark McGwire",
            answer: 1
        },
        {
            question: "Which country hosts the annual Tour de France cycling race?",
            option1: "Italy",
            option2: "France",
            option3: "Spain",
            option4: "Germany",
            answer: 2
        },
        {
            question: "Who won the first-ever World Cup in cricket?",
            option1: "India",
            option2: "West Indies",
            option3: "Australia",
            option4: "England",
            answer: 2
        },
        {
            question: "In which year did Michael Jordan retire for the final time?",
            option1: "1998",
            option2: "2001",
            option3: "2003",
            option4: "1999",
            answer: 3
        },
        {
            question: "What is the highest possible break in snooker?",
            option1: "147",
            option2: "150",
            option3: "155",
            option4: "160",
            answer: 1
        },
        {
            question: "Who is known as the 'Lightning Bolt' in athletics?",
            option1: "Carl Lewis",
            option2: "Michael Johnson",
            option3: "Usain Bolt",
            option4: "Asafa Powell",
            answer: 3
        },
        {
            question: "Which country won the Rugby World Cup in 2019?",
            option1: "England",
            option2: "South Africa",
            option3: "New Zealand",
            option4: "Australia",
            answer: 2
        },
        {
            question: "Which tennis player has won the most Grand Slam titles?",
            option1: "Roger Federer",
            option2: "Rafael Nadal",
            option3: "Novak Djokovic",
            option4: "Pete Sampras",
            answer: 2
        },
        {
            question: "Who is the all-time leading scorer in NBA history?",
            option1: "LeBron James",
            option2: "Kareem Abdul-Jabbar",
            option3: "Michael Jordan",
            option4: "Kobe Bryant",
            answer: 2
        },
        {
            question: "Which sport is known as the 'king of sports'?",
            option1: "Basketball",
            option2: "Soccer",
            option3: "Tennis",
            option4: "Cricket",
            answer: 2
        },
        {
            question: "Who won the gold medal in men's 100m at the 2016 Olympics?",
            option1: "Justin Gatlin",
            option2: "Usain Bolt",
            option3: "Yohan Blake",
            option4: "Andre De Grasse",
            answer: 2
        },
        {
            question: "What is the national sport of Canada?",
            option1: "Ice Hockey",
            option2: "Lacrosse",
            option3: "Baseball",
            option4: "Basketball",
            answer: 2
        },
        {
            question: "Who holds the record for the most goals in a single Premier League season?",
            option1: "Alan Shearer",
            option2: "Thierry Henry",
            option3: "Mohamed Salah",
            option4: "Cristiano Ronaldo",
            answer: 3
        },
        {
            question: "Which golfer has won the most major championships?",
            option1: "Tiger Woods",
            option2: "Jack Nicklaus",
            option3: "Arnold Palmer",
            option4: "Ben Hogan",
            answer: 2
        },
        {
            question: "In which sport would you perform a 'slam dunk'?",
            option1: "Volleyball",
            option2: "Tennis",
            option3: "Basketball",
            option4: "Football",
            answer: 3
        },
        {
            question: "Who won the FIFA Women's World Cup in 2019?",
            option1: "Germany",
            option2: "USA",
            option3: "Netherlands",
            option4: "Japan",
            answer: 2
        },
        {
            question: "Which cricketer has scored the most centuries in ODI cricket?",
            option1: "Sachin Tendulkar",
            option2: "Ricky Ponting",
            option3: "Virat Kohli",
            option4: "Brian Lara",
            answer: 1
        },
        {
            question: "Which country won the most medals in the 2016 Summer Olympics?",
            option1: "China",
            option2: "Great Britain",
            option3: "Russia",
            option4: "USA",
            answer: 4
        },
        {
            question: "Who is known as the 'Great One' in ice hockey?",
            option1: "Sidney Crosby",
            option2: "Wayne Gretzky",
            option3: "Bobby Orr",
            option4: "Mario Lemieux",
            answer: 2
        },
    ],
    gk: [
        {
            question: "Which planet is known as the Red Planet?",
            option1: "Earth",
            option2: "Mars",
            option3: "Jupiter",
            option4: "Venus",
            answer: 2
        },
        {
            question: "Who wrote the famous novel '1984'?",
            option1: "George Orwell",
            option2: "Aldous Huxley",
            option3: "J.K. Rowling",
            option4: "Ernest Hemingway",
            answer: 1
        },
        {
            question: "What is the capital city of Australia?",
            option1: "Sydney",
            option2: "Melbourne",
            option3: "Canberra",
            option4: "Perth",
            answer: 3
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            option1: "Gold",
            option2: "Oxygen",
            option3: "Osmium",
            option4: "Silver",
            answer: 2
        },
        {
            question: "Who was the first person to walk on the moon?",
            option1: "Neil Armstrong",
            option2: "Buzz Aldrin",
            option3: "Yuri Gagarin",
            option4: "Michael Collins",
            answer: 1
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            option1: "Japan",
            option2: "China",
            option3: "Thailand",
            option4: "South Korea",
            answer: 1
        },
        {
            question: "In which year did the Titanic sink?",
            option1: "1912",
            option2: "1905",
            option3: "1915",
            option4: "1920",
            answer: 1
        },
        {
            question: "What is the largest ocean on Earth?",
            option1: "Atlantic Ocean",
            option2: "Indian Ocean",
            option3: "Pacific Ocean",
            option4: "Arctic Ocean",
            answer: 3
        },
        {
            question: "Who painted the Mona Lisa?",
            option1: "Vincent van Gogh",
            option2: "Leonardo da Vinci",
            option3: "Pablo Picasso",
            option4: "Claude Monet",
            answer: 2
        },
        {
            question: "Which organ is known as the powerhouse of the cell?",
            option1: "Nucleus",
            option2: "Ribosome",
            option3: "Mitochondria",
            option4: "Chloroplast",
            answer: 3
        },
        {
            question: "Who is the author of the Harry Potter series?",
            option1: "J.K. Rowling",
            option2: "J.R.R. Tolkien",
            option3: "George R.R. Martin",
            option4: "C.S. Lewis",
            answer: 1
        },
        {
            question: "What is the smallest country in the world by land area?",
            option1: "Monaco",
            option2: "San Marino",
            option3: "Vatican City",
            option4: "Liechtenstein",
            answer: 3
        },
        {
            question: "In which year did World War II end?",
            option1: "1942",
            option2: "1945",
            option3: "1948",
            option4: "1950",
            answer: 2
        },
        {
            question: "What is the currency of Japan?",
            option1: "Dollar",
            option2: "Euro",
            option3: "Yen",
            option4: "Won",
            answer: 3
        },
        {
            question: "Which metal is liquid at room temperature?",
            option1: "Mercury",
            option2: "Gold",
            option3: "Silver",
            option4: "Iron",
            answer: 1
        },
        {
            question: "Who developed the theory of relativity?",
            option1: "Isaac Newton",
            option2: "Albert Einstein",
            option3: "Galileo Galilei",
            option4: "Nikola Tesla",
            answer: 2
        },
        {
            question: "What is the largest planet in our solar system?",
            option1: "Earth",
            option2: "Mars",
            option3: "Jupiter",
            option4: "Saturn",
            answer: 3
        },
        {
            question: "What is the hardest natural substance on Earth?",
            option1: "Iron",
            option2: "Diamond",
            option3: "Gold",
            option4: "Platinum",
            answer: 2
        },
        {
            question: "Which country is famous for the Taj Mahal?",
            option1: "India",
            option2: "Pakistan",
            option3: "Bangladesh",
            option4: "Nepal",
            answer: 1
        },
        {
            question: "What is the capital city of Canada?",
            option1: "Toronto",
            option2: "Vancouver",
            option3: "Montreal",
            option4: "Ottawa",
            answer: 4
        },
    ],
    javaScript: [
        {
            question: "Which method is used to parse a string to an integer in JavaScript?",
            option1: "parseInt()",
            option2: "parseFloat()",
            option3: "toFixed()",
            option4: "Number()",
            answer: 1
        },
        {
            question: "Which company developed JavaScript?",
            option1: "Microsoft",
            option2: "Netscape",
            option3: "Google",
            option4: "Sun Microsystems",
            answer: 2
        },
        {
            question: "What keyword is used to declare a constant in JavaScript?",
            option1: "var",
            option2: "let",
            option3: "const",
            option4: "static",
            answer: 3
        },
        {
            question: "Which symbol is used for comments in JavaScript?",
            option1: "/* */",
            option2: "//",
            option3: "#",
            option4: "<!-- -->",
            answer: 2
        },
        {
            question: "What is the correct syntax to create a new object?",
            option1: "let obj = {};",
            option2: "let obj = Object.create();",
            option3: "let obj = new Object();",
            option4: "let obj = new {};",
            answer: 1
        },
        {
            question: "Which operator is used to assign a value to a variable?",
            option1: "=",
            option2: "==",
            option3: "===",
            option4: ":=",
            answer: 1
        },
        {
            question: "How do you create a function in JavaScript?",
            option1: "function myFunction() {}",
            option2: "function:myFunction() {}",
            option3: "function = myFunction() {}",
            option4: "function => myFunction() {}",
            answer: 1
        },
        {
            question: "Which method is used to add an element at the end of an array?",
            option1: "push()",
            option2: "pop()",
            option3: "shift()",
            option4: "unshift()",
            answer: 1
        },
        {
            question: "Which built-in method returns the length of the string?",
            option1: "length()",
            option2: "size()",
            option3: "index()",
            option4: "None of the above",
            answer: 1
        },
        {
            question: "How do you call a function named 'myFunction'?",
            option1: "call myFunction()",
            option2: "myFunction()",
            option3: "call function myFunction()",
            option4: "Call.myFunction()",
            answer: 2
        },
        {
            question: "How do you write a conditional statement for executing some code if 'i' is equal to 5?",
            option1: "if i == 5 then",
            option2: "if i = 5",
            option3: "if (i == 5)",
            option4: "if i = 5 then",
            answer: 3
        },
        {
            question: "Which event occurs when the user clicks on an HTML element?",
            option1: "onchange",
            option2: "onclick",
            option3: "onmouseclick",
            option4: "onmouseover",
            answer: 2
        },
        {
            question: "What is the correct way to write an array in JavaScript?",
            option1: "let colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
            option2: "let colors = \"red\", \"green\", \"blue\"",
            option3: "let colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
            option4: "let colors = [\"red\", \"green\", \"blue\"]",
            answer: 4
        },
        {
            question: "Which method can be used to join two or more arrays?",
            option1: "concat()",
            option2: "combine()",
            option3: "attach()",
            option4: "collect()",
            answer: 1
        },
        {
            question: "How do you round the number 7.25 to the nearest integer?",
            option1: "Math.rnd(7.25)",
            option2: "Math.round(7.25)",
            option3: "rnd(7.25)",
            option4: "round(7.25)",
            answer: 2
        },
        {
            question: "What will the following code return: Boolean(10 > 9)?",
            option1: "true",
            option2: "false",
            option3: "NaN",
            option4: "undefined",
            answer: 1
        },
        {
            question: "How can you detect the client's browser name?",
            option1: "navigator.appName",
            option2: "browser.name",
            option3: "client.navName",
            option4: "window.name",
            answer: 1
        },
        {
            question: "Which of the following is a JavaScript data type?",
            option1: "Number",
            option2: "String",
            option3: "Boolean",
            option4: "All of the above",
            answer: 4
        },
        {
            question: "How do you declare a JavaScript variable?",
            option1: "var carName;",
            option2: "v carName;",
            option3: "variable carName;",
            option4: "var: carName;",
            answer: 1
        },
        {
            question: "Which method is used to remove the last element from an array?",
            option1: "shift()",
            option2: "pop()",
            option3: "remove()",
            option4: "delete()",
            answer: 2
        },
    ],
    World_Capitals: [
        {
            question: "What is the capital of France?",
            option1: "Paris",
            option2: "Berlin",
            option3: "Madrid",
            option4: "Rome",
            answer: 1
        },
        {
            question: "What is the capital of Japan?",
            option1: "Beijing",
            option2: "Tokyo",
            option3: "Seoul",
            option4: "Bangkok",
            answer: 2
        },
        {
            question: "What is the capital of Australia?",
            option1: "Sydney",
            option2: "Melbourne",
            option3: "Canberra",
            option4: "Brisbane",
            answer: 3
        },
        {
            question: "What is the capital of Canada?",
            option1: "Toronto",
            option2: "Vancouver",
            option3: "Ottawa",
            option4: "Montreal",
            answer: 3
        },
        {
            question: "What is the capital of Brazil?",
            option1: "Rio de Janeiro",
            option2: "São Paulo",
            option3: "Brasília",
            option4: "Salvador",
            answer: 3
        },
        {
            question: "What is the capital of India?",
            option1: "Mumbai",
            option2: "New Delhi",
            option3: "Kolkata",
            option4: "Bangalore",
            answer: 2
        },
        {
            question: "What is the capital of China?",
            option1: "Shanghai",
            option2: "Beijing",
            option3: "Hong Kong",
            option4: "Guangzhou",
            answer: 2
        },
        {
            question: "What is the capital of the United Kingdom?",
            option1: "Edinburgh",
            option2: "Dublin",
            option3: "London",
            option4: "Manchester",
            answer: 3
        },
        {
            question: "What is the capital of Russia?",
            option1: "Moscow",
            option2: "Saint Petersburg",
            option3: "Kiev",
            option4: "Minsk",
            answer: 1
        },
        {
            question: "What is the capital of Italy?",
            option1: "Milan",
            option2: "Naples",
            option3: "Rome",
            option4: "Venice",
            answer: 3
        },
        {
            question: "What is the capital of Germany?",
            option1: "Munich",
            option2: "Berlin",
            option3: "Frankfurt",
            option4: "Hamburg",
            answer: 2
        },
        {
            question: "What is the capital of South Korea?",
            option1: "Seoul",
            option2: "Busan",
            option3: "Tokyo",
            option4: "Osaka",
            answer: 1
        },
        {
            question: "What is the capital of Argentina?",
            option1: "Buenos Aires",
            option2: "Lima",
            option3: "Santiago",
            option4: "Montevideo",
            answer: 1
        },
        {
            question: "What is the capital of Egypt?",
            option1: "Cairo",
            option2: "Alexandria",
            option3: "Giza",
            option4: "Luxor",
            answer: 1
        },
        {
            question: "What is the capital of Turkey?",
            option1: "Istanbul",
            option2: "Ankara",
            option3: "Izmir",
            option4: "Antalya",
            answer: 2
        },
        {
            question: "What is the capital of Mexico?",
            option1: "Cancun",
            option2: "Guadalajara",
            option3: "Mexico City",
            option4: "Monterrey",
            answer: 3
        },
        {
            question: "What is the capital of Saudi Arabia?",
            option1: "Jeddah",
            option2: "Riyadh",
            option3: "Mecca",
            option4: "Medina",
            answer: 2
        },
        {
            question: "What is the capital of South Africa?",
            option1: "Cape Town",
            option2: "Pretoria",
            option3: "Johannesburg",
            option4: "Durban",
            answer: 2
        },
        {
            question: "What is the capital of Thailand?",
            option1: "Bangkok",
            option2: "Phuket",
            option3: "Chiang Mai",
            option4: "Pattaya",
            answer: 1
        },
        {
            question: "What is the capital of the United States?",
            option1: "New York",
            option2: "Los Angeles",
            option3: "Chicago",
            option4: "Washington D.C.",
            answer: 4
        },
    ],
    Technology: [
        {
            question: "What does CPU stand for?",
            option1: "Central Processing Unit",
            option2: "Computer Personal Unit",
            option3: "Central Processor Unit",
            option4: "Central Programming Unit",
            answer: 1
        },
        {
            question: "Who is known as the father of the World Wide Web?",
            option1: "Bill Gates",
            option2: "Steve Jobs",
            option3: "Tim Berners-Lee",
            option4: "Larry Page",
            answer: 3
        },
        {
            question: "Which company developed the Java programming language?",
            option1: "Microsoft",
            option2: "Sun Microsystems",
            option3: "Apple",
            option4: "IBM",
            answer: 2
        },
        {
            question: "What does HTTP stand for?",
            option1: "HyperText Transmission Protocol",
            option2: "HyperText Transfer Protocol",
            option3: "Hyper Transfer Text Protocol",
            option4: "Hyper Transfer Transmission Protocol",
            answer: 2
        },
        {
            question: "What is the name of the first web browser?",
            option1: "Internet Explorer",
            option2: "Netscape Navigator",
            option3: "WorldWideWeb",
            option4: "Mosaic",
            answer: 3
        },
        {
            question: "Which programming language is primarily used for web development?",
            option1: "Python",
            option2: "C++",
            option3: "JavaScript",
            option4: "Java",
            answer: 3
        },
        {
            question: "What is the most popular social networking site?",
            option1: "Facebook",
            option2: "Twitter",
            option3: "Instagram",
            option4: "LinkedIn",
            answer: 1
        },
        {
            question: "Who co-founded Microsoft?",
            option1: "Steve Jobs",
            option2: "Bill Gates",
            option3: "Elon Musk",
            option4: "Mark Zuckerberg",
            answer: 2
        },
        {
            question: "What does RAM stand for?",
            option1: "Random Access Memory",
            option2: "Read Access Memory",
            option3: "Run Access Memory",
            option4: "Real Access Memory",
            answer: 1
        },
        {
            question: "Which company is known for the iPhone?",
            option1: "Samsung",
            option2: "Nokia",
            option3: "Apple",
            option4: "Sony",
            answer: 3
        },
        {
            question: "What does HTML stand for?",
            option1: "HyperText Markup Language",
            option2: "HyperText Machine Language",
            option3: "HyperText Master Language",
            option4: "HyperText Main Language",
            answer: 1
        },
        {
            question: "Who invented the Linux operating system?",
            option1: "Steve Jobs",
            option2: "Linus Torvalds",
            option3: "Bill Gates",
            option4: "Ken Thompson",
            answer: 2
        },
        {
            question: "What does GPU stand for?",
            option1: "Graphical Processing Unit",
            option2: "Graphics Processing Unit",
            option3: "General Processing Unit",
            option4: "Gaming Processing Unit",
            answer: 2
        },
        {
            question: "What is the name of the digital currency invented in 2009?",
            option1: "Litecoin",
            option2: "Ethereum",
            option3: "Bitcoin",
            option4: "Ripple",
            answer: 3
        },
        {
            question: "Which company created the Android operating system?",
            option1: "Apple",
            option2: "Google",
            option3: "Microsoft",
            option4: "IBM",
            answer: 2
        },
        {
            question: "What does PDF stand for?",
            option1: "Portable Document Format",
            option2: "Personal Document Format",
            option3: "Professional Document Format",
            option4: "Public Document Format",
            answer: 1
        },
        {
            question: "Which company is known for manufacturing the PlayStation console?",
            option1: "Microsoft",
            option2: "Nintendo",
            option3: "Sony",
            option4: "Sega",
            answer: 3
        },
        {
            question: "What is the primary function of an operating system?",
            option1: "To manage computer hardware and software resources",
            option2: "To browse the internet",
            option3: "To create documents",
            option4: "To play games",
            answer: 1
        },
        {
            question: "Which of the following is a cloud computing service provider?",
            option1: "AWS",
            option2: "Intel",
            option3: "Cisco",
            option4: "Dell",
            answer: 1
        },
        {
            question: "What does SQL stand for?",
            option1: "Structured Query Language",
            option2: "Sequential Query Language",
            option3: "Standard Query Language",
            option4: "Simple Query Language",
            answer: 1
        },
    ],
    Python: [
        {
            question: "What is Python?",
            option1: "A type of snake",
            option2: "A programming language",
            option3: "A type of coffee",
            option4: "A web browser",
            answer: 2
        },
        {
            question: "Who created Python?",
            option1: "Guido van Rossum",
            option2: "Elon Musk",
            option3: "Bill Gates",
            option4: "Mark Zuckerberg",
            answer: 1
        },
        {
            question: "What data type is the object below? \nL = [1, 23, 'hello', 1]",
            option1: "List",
            option2: "Dictionary",
            option3: "Tuple",
            option4: "Set",
            answer: 1
        },
        {
            question: "Which of the following is a Python keyword?",
            option1: "def",
            option2: "return",
            option3: "raise",
            option4: "all of the above",
            answer: 4
        },
        {
            question: "How do you create a function in Python?",
            option1: "function myFunction()",
            option2: "def myFunction():",
            option3: "create myFunction()",
            option4: "None of the above",
            answer: 2
        },
        {
            question: "What is the output of print(2 ** 3)?",
            option1: "6",
            option2: "9",
            option3: "8",
            option4: "None of the above",
            answer: 3
        },
        {
            question: "How do you start a comment in Python?",
            option1: "//",
            option2: "#",
            option3: "/*",
            option4: "<!--",
            answer: 2
        },
        {
            question: "What is the correct file extension for Python files?",
            option1: ".pyth",
            option2: ".pt",
            option3: ".py",
            option4: ".pyt",
            answer: 3
        },
        {
            question: "What is a correct syntax to output 'Hello World' in Python?",
            option1: "echo 'Hello World'",
            option2: "p('Hello World')",
            option3: "print('Hello World')",
            option4: "printf('Hello World')",
            answer: 3
        },
        {
            question: "What is the correct way to create a dictionary in Python?",
            option1: "{ 'name': 'John', 'age': 30 }",
            option2: "{ name: 'John', age: 30 }",
            option3: "[ 'name': 'John', 'age': 30 ]",
            option4: "('name': 'John', 'age': 30)",
            answer: 1
        },
        {
            question: "What does the 'len()' function do?",
            option1: "Returns the length of an object",
            option2: "Adds two numbers",
            option3: "Subtracts two numbers",
            option4: "None of the above",
            answer: 1
        },
        {
            question: "What is the output of print('Hello'.lower())?",
            option1: "HELLO",
            option2: "hello",
            option3: "Hello",
            option4: "None of the above",
            answer: 2
        },
        {
            question: "Which symbol is used for comments in Python?",
            option1: "#",
            option2: "//",
            option3: "/*",
            option4: "'''",
            answer: 1
        },
        {
            question: "How do you create a variable with the floating number 2.8?",
            option1: "x = 2.8",
            option2: "float x = 2.8",
            option3: "x = float(2.8)",
            option4: "None of the above",
            answer: 1
        },
        {
            question: "Which method can be used to return a string in upper case letters?",
            option1: "upperCase()",
            option2: "upper()",
            option3: "uppercase()",
            option4: "None of the above",
            answer: 2
        },
        {
            question: "Which operator is used to multiply numbers in Python?",
            option1: "x",
            option2: "*",
            option3: "/",
            option4: "%",
            answer: 2
        },
        {
            question: "Which of the following statements is correct?",
            option1: "Python is case-sensitive",
            option2: "Python is case-insensitive",
            option3: "Python is both case-sensitive and case-insensitive",
            option4: "None of the above",
            answer: 1
        },
        {
            question: "How do you create a variable with the integer value 5?",
            option1: "int x = 5",
            option2: "x = 5",
            option3: "float x = 5",
            option4: "None of the above",
            answer: 2
        },
        {
            question: "What is the correct syntax to output the type of a variable or object in Python?",
            option1: "print(typeof x)",
            option2: "print(type(x))",
            option3: "print(typeof(x))",
            option4: "None of the above",
            answer: 2
        },
        {
            question: "What is the correct way to create a function in Python?",
            option1: "def functionName():",
            option2: "function functionName():",
            option3: "create functionName():",
            option4: "None of the above",
            answer: 1
        },

    ],
    history: [
        {
            question: "Which ancient civilization is known for creating the first known writing system, cuneiform?",
            option1: "Egyptians",
            option2: "Sumerians",
            option3: "Chinese",
            option4: "Greeks",
            answer: 2
        },
        {
            question: "Which event triggered the start of World War I?",
            option1: "Assassination of Archduke Franz Ferdinand",
            option2: "Invasion of Poland",
            option3: "Attack on Pearl Harbor",
            option4: "Treaty of Versailles",
            answer: 1
        },
        {
            question: "Who was the first European to reach India by sea?",
            option1: "Christopher Columbus",
            option2: "Ferdinand Magellan",
            option3: "Vasco da Gama",
            option4: "Marco Polo",
            answer: 3
        },
        {
            question: "What document, signed in 1776, declared the independence of the thirteen American colonies from British rule?",
            option1: "The Bill of Rights",
            option2: "The Magna Carta",
            option3: "The Constitution",
            option4: "The Declaration of Independence",
            answer: 4
        },
        {
            question: "Which Egyptian queen was the last active ruler of the Ptolemaic Kingdom of Egypt?",
            option1: "Nefertiti",
            option2: "Cleopatra VII",
            option3: "Hatshepsut",
            option4: "Ankhesenamun",
            answer: 2
        },
        {
            question: "Who was the first President of the United States?",
            option1: "Thomas Jefferson",
            option2: "John Adams",
            option3: "George Washington",
            option4: "James Madison",
            answer: 3
        },
        {
            question: "Which war was fought between the North and South regions in the United States?",
            option1: "The Revolutionary War",
            option2: "The Civil War",
            option3: "The Spanish-American War",
            option4: "World War II",
            answer: 2
        },
        {
            question: "What was the primary cause of the fall of the Roman Empire?",
            option1: "Economic instability",
            option2: "Military defeats",
            option3: "Political corruption",
            option4: "All of the above",
            answer: 4
        },
        {
            question: "Who was the famous leader of the Mongol Empire?",
            option1: "Kublai Khan",
            option2: "Genghis Khan",
            option3: "Attila the Hun",
            option4: "Tamerlane",
            answer: 2
        },
        {
            question: "What was the name of the ship that brought the Pilgrims to America in 1620?",
            option1: "Santa Maria",
            option2: "Mayflower",
            option3: "Victoria",
            option4: "Endeavour",
            answer: 2
        },
        {
            question: "Which empire was known for its highly disciplined and fearsome infantry soldiers called 'hoplites'?",
            option1: "Persian Empire",
            option2: "Roman Empire",
            option3: "Macedonian Empire",
            option4: "Greek City-States",
            answer: 4
        },
        {
            question: "Who was the British Prime Minister during most of World War II?",
            option1: "Neville Chamberlain",
            option2: "Winston Churchill",
            option3: "Clement Attlee",
            option4: "Stanley Baldwin",
            answer: 2
        },
        {
            question: "Which ancient wonder was a massive statue of Zeus located in Greece?",
            option1: "Colossus of Rhodes",
            option2: "Statue of Zeus at Olympia",
            option3: "Temple of Artemis",
            option4: "Lighthouse of Alexandria",
            answer: 2
        },
        {
            question: "Who was known as the 'Father of the Indian Nation'?",
            option1: "Subhas Chandra Bose",
            option2: "Jawaharlal Nehru",
            option3: "Mahatma Gandhi",
            option4: "Bhagat Singh",
            answer: 3
        },
        {
            question: "What ancient city is known as the 'City of Seven Hills'?",
            option1: "Athens",
            option2: "Constantinople",
            option3: "Rome",
            option4: "Babylon",
            answer: 3
        },
        {
            question: "Who painted the Mona Lisa?",
            option1: "Vincent van Gogh",
            option2: "Pablo Picasso",
            option3: "Leonardo da Vinci",
            option4: "Claude Monet",
            answer: 3
        },
        {
            question: "Which empire was ruled by Charlemagne?",
            option1: "Byzantine Empire",
            option2: "Holy Roman Empire",
            option3: "Ottoman Empire",
            option4: "British Empire",
            answer: 2
        },
        {
            question: "What was the primary purpose of the Great Wall of China?",
            option1: "To mark the border of China",
            option2: "To protect against invasions",
            option3: "To control immigration",
            option4: "To facilitate trade",
            answer: 2
        },
        {
            question: "Who was the famous female pharaoh of ancient Egypt known for her prosperous reign?",
            option1: "Nefertiti",
            option2: "Cleopatra VII",
            option3: "Hatshepsut",
            option4: "Ankhesenamun",
            answer: 3
        },
        {
            question: "Which city was the first to be targeted by an atomic bomb?",
            option1: "Nagasaki",
            option2: "Hiroshima",
            option3: "Tokyo",
            option4: "Kyoto",
            answer: 2
        }
    ],
    Litrature: [
        {
            question: "Who wrote 'Pride and Prejudice'?",
            option1: "Charles Dickens",
            option2: "Jane Austen",
            option3: "Charlotte Brontë",
            option4: "George Eliot",
            answer: 2
        },
        {
            question: "What is the title of the first Harry Potter book?",
            option1: "Harry Potter and the Chamber of Secrets",
            option2: "Harry Potter and the Prisoner of Azkaban",
            option3: "Harry Potter and the Philosopher's Stone",
            option4: "Harry Potter and the Goblet of Fire",
            answer: 3
        },
        {
            question: "Who is the author of '1984'?",
            option1: "Aldous Huxley",
            option2: "George Orwell",
            option3: "Ray Bradbury",
            option4: "Margaret Atwood",
            answer: 2
        },
        {
            question: "What is the name of the fictional land in 'The Chronicles of Narnia'?",
            option1: "Middle-earth",
            option2: "Hogwarts",
            option3: "Narnia",
            option4: "Wonderland",
            answer: 3
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            option1: "Harper Lee",
            option2: "Mark Twain",
            option3: "Ernest Hemingway",
            option4: "F. Scott Fitzgerald",
            answer: 1
        },
        {
            question: "In which Shakespeare play does the character 'Shylock' appear?",
            option1: "Macbeth",
            option2: "Hamlet",
            option3: "The Merchant of Venice",
            option4: "Othello",
            answer: 3
        },
        {
            question: "Who is the author of 'The Catcher in the Rye'?",
            option1: "J.D. Salinger",
            option2: "F. Scott Fitzgerald",
            option3: "John Steinbeck",
            option4: "William Golding",
            answer: 1
        },
        {
            question: "What is the title of the epic poem written by Homer?",
            option1: "The Aeneid",
            option2: "The Iliad",
            option3: "The Odyssey",
            option4: "Beowulf",
            answer: 2
        },
        {
            question: "Who wrote 'Brave New World'?",
            option1: "George Orwell",
            option2: "Aldous Huxley",
            option3: "Ray Bradbury",
            option4: "Philip K. Dick",
            answer: 2
        },
        {
            question: "Which novel starts with the line 'Call me Ishmael'?",
            option1: "Moby-Dick",
            option2: "The Old Man and the Sea",
            option3: "The Adventures of Huckleberry Finn",
            option4: "Treasure Island",
            answer: 1
        },
        {
            question: "Who wrote 'The Great Gatsby'?",
            option1: "Ernest Hemingway",
            option2: "F. Scott Fitzgerald",
            option3: "William Faulkner",
            option4: "John Steinbeck",
            answer: 2
        },
        {
            question: "What is the name of the protagonist in 'Crime and Punishment'?",
            option1: "Raskolnikov",
            option2: "Ivanov",
            option3: "Karamazov",
            option4: "Bazarov",
            answer: 1
        },
        {
            question: "Which author created the fictional detective Sherlock Holmes?",
            option1: "Agatha Christie",
            option2: "Arthur Conan Doyle",
            option3: "Raymond Chandler",
            option4: "Dashiell Hammett",
            answer: 2
        },
        {
            question: "Who wrote 'The Lord of the Rings' trilogy?",
            option1: "J.K. Rowling",
            option2: "George R.R. Martin",
            option3: "C.S. Lewis",
            option4: "J.R.R. Tolkien",
            answer: 4
        },
        {
            question: "What is the setting of George Orwell's 'Animal Farm'?",
            option1: "A factory",
            option2: "A school",
            option3: "A farm",
            option4: "A city",
            answer: 3
        },
        {
            question: "Which novel features the character 'Atticus Finch'?",
            option1: "The Great Gatsby",
            option2: "1984",
            option3: "To Kill a Mockingbird",
            option4: "Catch-22",
            answer: 3
        },
        {
            question: "Who is the author of 'Pride and Prejudice'?",
            option1: "Mary Shelley",
            option2: "Jane Austen",
            option3: "Emily Brontë",
            option4: "George Eliot",
            answer: 2
        },
        {
            question: "Which book is known as the first science fiction novel?",
            option1: "The Time Machine",
            option2: "Frankenstein",
            option3: "20,000 Leagues Under the Sea",
            option4: "The War of the Worlds",
            answer: 2
        },
        {
            question: "Who wrote 'The Picture of Dorian Gray'?",
            option1: "Oscar Wilde",
            option2: "Henry James",
            option3: "Bram Stoker",
            option4: "Mary Shelley",
            answer: 1
        },
        {
            question: "In which novel does the character 'Hester Prynne' appear?",
            option1: "Jane Eyre",
            option2: "The Scarlet Letter",
            option3: "Wuthering Heights",
            option4: "Pride and Prejudice",
            answer: 2
        },
    ]
};
// Constants
const correct_bonus = 10;
const max_questions = 6; // Number of questions you want to answer

// ############################
// Prevent page refresh
// function noload() {
//     if (questionCounter <= 5) {
//         window.addEventListener("beforeunload", function (event) {
//             // Warn user about page refresh
//             // if (questionCounter <= max_questions) {
//                 event.preventDefault();
//             // }
//         });
//     }
// }
// ###########################

// /#####################################3
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = questions[selectedTopic]; // take random questions 
    // console.log(availableQuestions); // Print available all quiz questions
    getNewQuestion();
};


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem("recentScore", score);

        return window.location.assign("highscorepage.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + max_questions; // Number of questions on indicator (e.g., 0/5)
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // To get a random question
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    option.forEach(option => {
        const number = option.dataset["number"];
        option.innerText = currentQuestion['option' + number];
    });

    availableQuestions.splice(questionIndex, 1); // Remove the current question from the list
    acceptingAnswers = true;
};

option.forEach(option => {
    option.addEventListener('click', e => {
        // e.preventDefault();//to stop refreshing page

        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; // Change color of correct and incorrect options
        selectedOption.classList.add(classToApply);

        if (classToApply == "correct") {
            incrementScore(correct_bonus); // Increase bonus points
        }

        setTimeout(() => {
            selectedOption.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
startGame();

//####################
// let recentScore = localStorage.getItem('recentScore')   // get recent score form local storage.(code line 737)
// const finalScore = document.getElementsByClassName("finalScore")[0]
// if (!localStorage.getItem('highscore')) {
//     localStorage.setItem('highscore', JSON.stringify([]));
// }
// let highscore = localStorage.getItem('highscore') || [];
// JSON.parse(highscore)
// localStorage.setItem('highscore', []);
// finalScore.innerText = recentScore
// console.log(highscore)
// console.log(recentScore)
// const savehighscore = () => {
//     const highSc = {
//         score: recentScore,
//         name: usernameInput.value,
//    };
//    highscore.push(highSc)
//    highscore.sort((a,b)=>b.score - a.score)
// }

// ))))))))))))))))))))
// let SCORE = document.getElementById("SCORE")
// console.log(SCORE)
// #############################

// Get recent score from local storage
// let recentScore = localStorage.getItem('recentScore');

// // Display the final score in the element with class "finalScore"
// const finalScore = document.querySelector(".finalScore");
// if (finalScore && recentScore) {
//     finalScore.textContent = recentScore;
// }

// // Initialize or get the existing highscore array from local storage
// let highscore = JSON.parse(localStorage.getItem('highscore')) || [];

// // Add the recent score to the highscore array if it's not null
// if (recentScore !== null) {
//     highscore.push(parseInt(recentScore));
//     highscore.sort((a, b) => b - a); // Sort high scores in descending order
//     localStorage.setItem('highscore', JSON.stringify(highscore)); // Save updated highscore
// }

// console.log(highscore); // Log highscore array






