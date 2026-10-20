"use strict";

// Update the footer year automatically.
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Filter courses by category.
const courseFilters = document.querySelectorAll(".course-filter");
const courseItems = document.querySelectorAll(".course-item");
const courseCount = document.getElementById("courseCount");
const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");

function filterCourses(category) {
    let visibleCourses = 0;

    courseItems.forEach((course) => {
        const matchesCategory =
            category === "all" ||
            course.dataset.category === category;

        course.hidden = !matchesCategory;

        if (matchesCategory) {
            visibleCourses++;
        }
    });

    if (courseCount) {
        courseCount.textContent =
            `${visibleCourses} ${visibleCourses === 1 ? "Course" : "Courses"}`;
    }

    if (emptyState) {
        emptyState.classList.toggle("d-none", visibleCourses !== 0);
    }
}

courseFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
        courseFilters.forEach((button) => {
            button.classList.remove("active");
            button.setAttribute("aria-pressed", "false");
        });

        filter.classList.add("active");
        filter.setAttribute("aria-pressed", "true");

        filterCourses(filter.dataset.filter);
    });
});

if (resetFilters) {
    resetFilters.addEventListener("click", () => {
        const allCoursesButton = document.querySelector(
            '.course-filter[data-filter="all"]'
        );

        if (allCoursesButton) {
            allCoursesButton.click();
        }
    });
}


// Course information used by the details page.
const courses = {
    "web-development": {
        title: "Web Development",
        category: "Development",
        duration: "12 Weeks",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
        description: "Learn how to build responsive and interactive websites using modern web technologies.",
        overview: "This course introduces the core technologies behind modern websites. Learn how HTML structures content, CSS styles pages, JavaScript adds interactivity, and Bootstrap helps create responsive layouts.",
        outcomes: [
            "Structure web pages using HTML.",
            "Style responsive layouts using CSS and Bootstrap.",
            "Add interactive features using JavaScript.",
            "Build a small multi-page website.",
            "Understand the fundamentals of responsive web design."
        ],
        requirements: [
            "No previous web development experience required.",
            "A computer and internet connection.",
            "A willingness to learn and practice."
        ]
    },

    "frontend": {
        title: "Front-End Development",
        category: "Development",
        duration: "8 Weeks",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=85",
        description: "Learn to create attractive, responsive, and interactive user interfaces for the web.",
        overview: "Explore the client-side technologies used to build modern web interfaces. Practice structuring content, styling components, and adding interactions while learning responsive design principles.",
        outcomes: [
            "Build structured interfaces with HTML.",
            "Create responsive layouts with CSS.",
            "Use JavaScript to handle user interactions.",
            "Apply responsive design principles.",
            "Organize front-end project files."
        ],
        requirements: [
            "Basic computer skills.",
            "A computer and internet connection.",
            "No previous professional experience required."
        ]
    },

    "backend-php": {
        title: "Back-End Development with PHP",
        category: "Development",
        duration: "10 Weeks",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
        description: "Discover server-side development, database integration, and the fundamentals of building web APIs with PHP.",
        overview: "Learn how server-side applications process requests, validate information, and communicate with databases. Explore PHP fundamentals and the principles behind back-end web development.",
        outcomes: [
            "Understand server-side programming concepts.",
            "Write PHP code to process user input.",
            "Connect PHP applications to a database.",
            "Understand CRUD operations.",
            "Explore the fundamentals of HTTP and web APIs."
        ],
        requirements: [
            "Basic understanding of HTML.",
            "Basic programming knowledge is recommended.",
            "A computer with a suitable PHP development environment."
        ]
    },

    "ui-ux-design": {
        title: "UI/UX Design",
        category: "Design",
        duration: "6 Weeks",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85",
        description: "Learn the fundamentals of user experience, interface design, and creating intuitive digital products.",
        overview: "Discover how designers understand user needs and translate them into clear, accessible interfaces. Explore the design process, wireframes, visual hierarchy, and usability principles.",
        outcomes: [
            "Understand the difference between UI and UX.",
            "Identify user needs and basic user flows.",
            "Create simple wireframes.",
            "Apply visual hierarchy and spacing principles.",
            "Evaluate basic interface usability."
        ],
        requirements: [
            "No previous design experience required.",
            "A computer and internet connection.",
            "An interest in visual design and user experience."
        ]
    },

    "python": {
        title: "Python Programming",
        category: "Programming",
        duration: "8 Weeks",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
        description: "Build a strong programming foundation and learn how to solve problems using Python.",
        overview: "Start with Python fundamentals and gradually explore variables, conditions, loops, functions, and basic data structures through practical programming exercises.",
        outcomes: [
            "Understand variables and common data types.",
            "Use conditions and loops.",
            "Write reusable functions.",
            "Work with basic collections.",
            "Solve introductory programming problems."
        ],
        requirements: [
            "No previous programming experience required.",
            "A computer with Python installed.",
            "A willingness to practice problem-solving."
        ]
    },

    "database": {
        title: "Database Fundamentals",
        category: "Databases",
        duration: "4 Weeks",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85",
        description: "Learn how relational databases organize information and how SQL is used to manage data.",
        overview: "Explore relational database concepts, tables, relationships, and SQL. Practice retrieving, adding, updating, and organizing data in a structured way.",
        outcomes: [
            "Understand tables, records, and fields.",
            "Identify primary and foreign keys.",
            "Write basic SQL queries.",
            "Retrieve and filter database records.",
            "Understand basic relational data modeling."
        ],
        requirements: [
            "No previous database experience required.",
            "A computer and internet connection.",
            "Basic computer skills."
        ]
    }
};


// Render the selected course on the details page.
const courseTitle = document.getElementById("courseTitle");

if (courseTitle) {
    const params = new URLSearchParams(window.location.search);
    const requestedCourse = params.get("course");
    const course = courses[requestedCourse] || courses["web-development"];

    document.title = `${course.title} | Skillora Academy`;

    document.getElementById("courseCategory").textContent = course.category;
    courseTitle.textContent = course.title;
    document.getElementById("courseDescription").textContent = course.description;
    document.getElementById("courseDuration").textContent = course.duration;
    document.getElementById("courseLevel").textContent = course.level;
    document.getElementById("courseOverview").textContent = course.overview;

    const courseImage = document.getElementById("courseImage");
    courseImage.src = course.image;
    courseImage.alt = `${course.title} course`;

    document.getElementById("sidebarDuration").textContent = course.duration;
    document.getElementById("sidebarLevel").textContent = course.level;

    const learningOutcomes = document.getElementById("learningOutcomes");
    learningOutcomes.replaceChildren();

    course.outcomes.forEach((outcome) => {
        const item = document.createElement("li");
        const icon = document.createElement("i");
        const text = document.createElement("span");

        icon.className = "bi bi-check-circle-fill";
        text.textContent = outcome;

        item.append(icon, text);
        learningOutcomes.appendChild(item);
    });

    const courseRequirements = document.getElementById("courseRequirements");
    courseRequirements.replaceChildren();

    course.requirements.forEach((requirement) => {
        const item = document.createElement("li");
        const icon = document.createElement("i");
        const text = document.createElement("span");

        icon.className = "bi bi-check2";
        text.textContent = requirement;

        item.append(icon, text);
        courseRequirements.appendChild(item);
    });

    const registerButton = document.getElementById("registerButton");

    registerButton.href =
        `contact.html?course=${encodeURIComponent(requestedCourse && courses[requestedCourse] ? requestedCourse : "web-development")}`;
}


/* Course Registration */
const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
const courseSelect = document.getElementById("course");
const successMessage = document.getElementById("formSuccess");


// Preselect the course when arriving from the course details page.
const requestedCourse = new URLSearchParams(window.location.search).get("course");

if (requestedCourse && courseSelect) {
    const matchingOption = Array.from(courseSelect.options).find(
        (option) => option.value === requestedCourse
    );

    if (matchingOption) {
        courseSelect.value = requestedCourse;
    }
}

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    successMessage.classList.add("d-none");

    if (!registrationForm.checkValidity()) {
        registrationForm.classList.add("was-validated");

        const firstInvalidField = registrationForm.querySelector(":invalid");

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return;
    }

    registrationForm.classList.remove("was-validated");
    successMessage.classList.remove("d-none");

    registrationForm.reset();

    // Keep the success message visible without implying data was transmitted.
    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});
}
