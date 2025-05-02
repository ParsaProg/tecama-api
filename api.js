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
    titleImage: "https://sabzlearn.ir/wp-content/uploads/2025/01/py2-1.webp",
    titleText: "دورۀ متخصص برنامه نویسی",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۳۰ ساعت",
    meetsCount: "۳۰ جلسه",
    publishTime: "12 بهمن 1403",
  },
  {
    id: 2,
    titleImage:
      "https://mashhad-system.ir/wp-content/uploads/2022/05/%D8%AF%D9%88%D8%B1%D9%87-%D9%BE%D8%A7%DB%8C%D8%AA%D9%88%D9%86-%D9%BE%DB%8C%D8%B4%D8%B1%D9%81%D8%AA%D9%87.jpg",
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
      "https://chabokan.net/blog/wp-content/uploads/2023/11/DjangoFeaturedImage-940x510.jpeg",
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
      "https://dorebin.com/_next/image/?url=https%3A%2F%2Ffaradars.org%2Fwp-content%2Fuploads%2F2020%2F04%2Ffvpht9902-png.png&w=828&q=75",
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
      "https://www.roshdana.com/wp-content/uploads/2020/12/%D8%B2%D8%A8%D8%A7%D9%86-%D9%87%D8%A7%DB%8C-%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D9%86%D9%88%DB%8C%D8%B3%DB%8C-%D8%A8%DA%A9-%D8%A7%D9%86%D8%AF-%DA%A9%D8%AF%D8%A7%D9%85%D9%86%D8%AF%D8%9F.jpg",
    titleText: "متخصص بک اند Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۳۵ ساعت",
    meetsCount: "۳۲ جلسه",
    publishTime: "10 اردیبهشت 1404",
  },
  {
    id: 6,
    titleImage: "https://up.7learn.com/z/s/wp/2023/06/python-web04.jpg",
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
      "https://faradars.org/wp-content/uploads/2023/05/23/fvdjn101-png.png",
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
      "https://free.codity.ir/files/2024/12/learning-to-write-unit-tests-in-python.webp",
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
      "https://sabzdanesh.com/Uploads/2022/07/Python-MySQL-Database-Tutorial.jpg",
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
      "https://sabzlearn.ir/wp-content/uploads/2024/01/%D9%BE%D8%A7%DB%8C%D8%AA%D9%88%D9%86-%D8%B3%DB%8C%D8%A7%D9%87.webp",
    titleText: "دوره کامل امنیت با Python",
    publisherName: "پارسا شعبانی",
    publisherImage: "https://avatars.githubusercontent.com/u/122119546?v=4",
    time: "۶۰ ساعت",
    meetsCount: "۵۵ جلسه",
    publishTime: "30 خرداد 1404",
  },
];
let articles = [
  {
    "cats": ["فناوری", "هوش مصنوعی", "برنامه‌نویسی"],
    "likesCount": 58,
    "commentsCount": 22,
    "titleText": "آینده هوش مصنوعی در ایران: فرصت‌ها و چالش‌ها",
    "publisherImage": "https://avatars.githubusercontent.com/u/122119546?v=4",
    "publisherName": "علی رضایی",
    "publishTime": "13 اردیبهشت 1404",
    "className": "",
    "imageClassName": "",
    "tagsClassName": ""
  }
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

app.get("/api/articles", (req, res) => {
  const { cat } = req.query; // مثلاً ?cat=tech برای فیلتر
  let filteredArticles = articles;

  if (cat) {
    filteredArticles = articles.filter((article) => article.cats.includes(cat));
  }

  res.status(200).json({
    message: filteredArticles.length
      ? "Articles retrieved successfully"
      : "No articles found",
    data: filteredArticles,
  });
});

// GET: گرفتن یک مقاله خاص با ID
app.get("/api/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({
    message: "Article retrieved successfully",
    data: article,
  });
});

// POST: ایجاد مقاله جدید
app.post("/api/articles", (req, res) => {
  const {
    cats,
    likesCount,
    commentsCount,
    articleImage,
    titleText,
    publisherImage,
    publisherName,
    publishTime,
    className,
    imageClassName,
    tagsClassName,
  } = req.body;

  // اعتبارسنجی ساده
  if (!titleText || !publisherName || !cats || !Array.isArray(cats)) {
    return res
      .status(400)
      .json({
        message: "titleText, publisherName, and cats (array) are required",
      });
  }

  const newArticle = {
    id: String(articles.length + 1), // ID ساده (در دیتابیس واقعی از ObjectId یا UUID استفاده کنید)
    cats: cats || [],
    likesCount: likesCount || 0,
    commentsCount: commentsCount || 0,
    articleImage: articleImage || "",
    titleText,
    publisherImage: publisherImage || "",
    publisherName,
    publishTime: publishTime ? new Date(publishTime) : new Date(),
    className: className || "",
    imageClassName: imageClassName || "",
    tagsClassName: tagsClassName || "",
  };

  articles.push(newArticle);

  res.status(201).json({
    message: "Article created successfully",
    data: newArticle,
  });
});

// PUT: به‌روزرسانی مقاله با ID
app.put("/api/articles/:id", (req, res) => {
  const articleIndex = articles.findIndex((a) => a.id === req.params.id);

  if (articleIndex === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  const {
    cats,
    likesCount,
    commentsCount,
    articleImage,
    titleText,
    publisherImage,
    publisherName,
    publishTime,
    className,
    imageClassName,
    tagsClassName,
  } = req.body;

  // اعتبارسنجی ساده
  if (titleText && !cats && !Array.isArray(cats)) {
    return res.status(400).json({ message: "cats must be an array" });
  }

  const updatedArticle = {
    ...articles[articleIndex],
    cats: cats || articles[articleIndex].cats,
    likesCount:
      likesCount !== undefined ? likesCount : articles[articleIndex].likesCount,
    commentsCount:
      commentsCount !== undefined
        ? commentsCount
        : articles[articleIndex].commentsCount,
    articleImage: articleImage || articles[articleIndex].articleImage,
    titleText: titleText || articles[articleIndex].titleText,
    publisherImage: publisherImage || articles[articleIndex].publisherImage,
    publisherName: publisherName || articles[articleIndex].publisherName,
    publishTime: publishTime
      ? new Date(publishTime)
      : articles[articleIndex].publishTime,
    className: className || articles[articleIndex].className,
    imageClassName: imageClassName || articles[articleIndex].imageClassName,
    tagsClassName: tagsClassName || articles[articleIndex].tagsClassName,
  };

  articles[articleIndex] = updatedArticle;

  res.status(200).json({
    message: "Article updated successfully",
    data: updatedArticle,
  });
});

// DELETE: حذف مقاله با ID
app.delete("/api/articles/:id", (req, res) => {
  const articleIndex = articles.findIndex((a) => a.id === req.params.id);

  if (articleIndex === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  articles.splice(articleIndex, 1);

  res.status(200).json({
    message: "Article deleted successfully",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
