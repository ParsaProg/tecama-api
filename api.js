const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory API key store (in production, use a database)
const validApiKeys = [
  "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6", // Pre-generated API key
];

// In-memory courses store (in production, use a database)
let courses = [
  [
    {
      "id": 1,
      "titleImage": "https://unsplash.com/photos/person-coding-on-laptop-7okkFhIdjHk",
      "titleText": "دورۀ متخصص برنامه نویسی",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۳۰ ساعت",
      "meetsCount": "۳۰ جلسه",
      "publishTime": "12 بهمن 1403"
    },
    {
      "id": 2,
      "titleImage": "https://www.shutterstock.com/image-photo/python-code-on-laptop-screen-1819132457",
      "titleText": "دورۀ پیشرفته پایتون",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۴۰ ساعت",
      "meetsCount": "۳۵ جلسه",
      "publishTime": "18 اسفند 1403"
    },
    {
      "id": 3,
      "titleImage": "https://www.freepik.com/free-photo/web-development-concept-with-django_12345678.htm",
      "titleText": "آموزش فریمورک Django",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۲۵ ساعت",
      "meetsCount": "۲۰ جلسه",
      "publishTime": "5 فروردین 1404"
    },
    {
      "id": 4,
      "titleImage": "https://unsplash.com/photos/laptop-showing-data-visualization-FW3vGX5TkUc",
      "titleText": "آموزش پروژه محور Python",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۵۰ ساعت",
      "meetsCount": "۴۵ جلسه",
      "publishTime": "25 فروردین 1404"
    },
    {
      "id": 5,
      "titleImage": "https://www.shutterstock.com/image-illustration/backend-development-concept-1932442547",
      "titleText": "متخصص بک اند Python",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۳۵ ساعت",
      "meetsCount": "۳۲ جلسه",
      "publishTime": "10 اردیبهشت 1404"
    },
    {
      "id": 6,
      "titleImage": "https://www.freepik.com/free-photo/web-programming-concept_98765432.htm",
      "titleText": "برنامه نویسی وب با Python",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۴۵ ساعت",
      "meetsCount": "۴۰ جلسه",
      "publishTime": "20 اردیبهشت 1404"
    },
    {
      "id": 7,
      "titleImage": "https://www.shutterstock.com/image-photo/django-web-development-1897654321",
      "titleText": "طراحی وب پیشرفته با Django",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۲۰ ساعت",
      "meetsCount": "۱۵ جلسه",
      "publishTime": "1 خرداد 1404"
    },
    {
      "id": 8,
      "titleImage": "https://www.freepik.com/free-vector/software-testing-concept_78912345.htm",
      "titleText": "آموزش تست نویسی در Python",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۱۵ ساعت",
      "meetsCount": "۱۲ جلسه",
      "publishTime": "10 خرداد 1404"
    },
    {
      "id": 9,
      "titleImage": "https://unsplash.com/photos/database-structure-on-screen-K7QeH7XqW8w",
      "titleText": "دیتابیس و Python",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۲۰ ساعت",
      "meetsCount": "۱۸ جلسه",
      "publishTime": "20 خرداد 1404"
    },
    {
      "id": 10,
      "titleImage": "https://www.shutterstock.com/image-illustration/cybersecurity-python-concept-1987654321",
      "titleText": "دوره کامل امنیت با Python",
      "publisherName": "پارسا شعبانی",
      "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
      "time": "۶۰ ساعت",
      "meetsCount": "۵۵ جلسه",
      "publishTime": "30 خرداد 1404"
    }
  ]
];
let idCounter = 2; // Start from 2 since we have one course already

// Middleware to verify API key
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key required" });
  }

  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
};

// Root route (public, no authentication required)
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to the Courses API! Use /api/courses to access the API with a valid API key.",
  });
});

// Protected routes (require API key)
// Get all courses
app.get("/api/courses", authenticateApiKey, (req, res) => {
  res.json(courses);
});

// Create a course
app.post("/api/courses", authenticateApiKey, (req, res) => {
  const {
    titleImage,
    titleText,
    publisherName,
    publisherImage,
    time,
    meetsCount,
    publishTime,
  } = req.body;

  const course = {
    id: idCounter++,
    titleImage,
    titleText,
    publisherName,
    publisherImage,
    time,
    meetsCount,
    publishTime,
  };

  courses.push(course);
  res.status(201).json(course);
});

// Update a course
app.put("/api/courses/:id", authenticateApiKey, (req, res) => {
  const { id } = req.params;
  const {
    titleImage,
    titleText,
    publisherName,
    publisherImage,
    time,
    meetsCount,
    fromGradient,
    toGradient,
    publishTime,
  } = req.body;

  const course = courses.find((c) => c.id === parseInt(id));
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  // Update fields if provided
  if (titleImage !== undefined) course.titleImage = titleImage;
  if (titleText !== undefined) course.titleText = titleText;
  if (publisherName !== undefined) course.publisherName = publisherName;
  if (publisherImage !== undefined) course.publisherImage = publisherImage;
  if (time !== undefined) course.time = time;
  if (meetsCount !== undefined) course.meetsCount = meetsCount;
  if (fromGradient !== undefined) course.fromGradient = fromGradient;
  if (toGradient !== undefined) course.toGradient = toGradient;
  if (publishTime !== undefined) course.publishTime = publishTime;

  res.json(course);
});

// Delete a course
app.delete("/api/courses/:id", authenticateApiKey, (req, res) => {
  const { id } = req.params;
  const index = courses.findIndex((c) => c.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Course not found" });
  }
  courses.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
