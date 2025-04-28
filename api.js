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
  {
    id: 1,
    titleImage:
      "https://www.rasa-ai.com/wp-content/uploads/2021/10/python-course.jpg",
    titleText: "دورۀ متخصص برنامه نویسی",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۳۰ ساعت",
    meetsCount: "۳۰ جلسه",
    publishTime: "12 بهمن 1403",
  },
  {
    id: 2,
    titleImage: "https://www.karlancer.com/media/worksample/7nwmm5r1nwr3.jpg",
    titleText: "دورۀ پیشرفته پایتون",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۴۰ ساعت",
    meetsCount: "۳۵ جلسه",
    publishTime: "18 اسفند 1403",
  },
  {
    id: 3,
    titleImage:
      "https://img.freepik.com/free-photo/programming-background-collage_23-2149901770.jpg",
    titleText: "آموزش فریمورک Django",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۲۵ ساعت",
    meetsCount: "۲۰ جلسه",
    publishTime: "5 فروردین 1404",
  },
  {
    id: 4,
    titleImage:
      "https://darsman.com/blog/wp-content/uploads/2021/06/python-programming-with-phone.jpg",
    titleText: "آموزش پروژه محور Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۵۰ ساعت",
    meetsCount: "۴۵ جلسه",
    publishTime: "25 فروردین 1404",
  },
  {
    id: 5,
    titleImage:
      "https://www.shutterstock.com/image-photo/backend-development-coding-software-engineering-programming-260nw-1932442547.jpg",
    titleText: "متخصص بک اند Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۳۵ ساعت",
    meetsCount: "۳۲ جلسه",
    publishTime: "10 اردیبهشت 1404",
  },
  {
    id: 6,
    titleImage:
      "https://www.istockphoto.com/photo/python-programming-language-concept-with-computer-code-and-laptop-gm1212256253-352913190",
    titleText: "برنامه نویسی وب با Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۴۵ ساعت",
    meetsCount: "۴۰ جلسه",
    publishTime: "20 اردیبهشت 1404",
  },
  {
    id: 7,
    titleImage:
      "https://img.freepik.com/free-photo/html-css-collage-concept_23-2149409985.jpg",
    titleText: "طراحی وب پیشرفته با Django",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۲۰ ساعت",
    meetsCount: "۱۵ جلسه",
    publishTime: "1 خرداد 1404",
  },
  {
    id: 8,
    titleImage:
      "https://img.freepik.com/free-vector/flat-composition-with-programmer-testing-programs-illustration_1284-63745.jpg",
    titleText: "آموزش تست نویسی در Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۱۵ ساعت",
    meetsCount: "۱۲ جلسه",
    publishTime: "10 خرداد 1404",
  },
  {
    id: 9,
    titleImage:
      "https://img.freepik.com/free-photo/database-concept-with-person-working-laptop_23-2150147655.jpg",
    titleText: "دیتابیس و Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۲۰ ساعت",
    meetsCount: "۱۸ جلسه",
    publishTime: "20 خرداد 1404",
  },
  {
    id: 10,
    titleImage:
      "https://www.dreamstime.com/photos-images/python-networking-security.html",
    titleText: "دوره کامل امنیت با Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۶۰ ساعت",
    meetsCount: "۵۵ جلسه",
    publishTime: "30 خرداد 1404",
  },
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
    titleImage:
      titleImage ||
      "https://www.webasha.com/uploads/course/images/65191ee47aed71696145124.Full_Stack_Python_Developer.jpg",
    titleText,
    publisherName,
    publisherImage:
      publisherImage || "https://avatars.githubusercontent.com/u/122119546?v=4",
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
