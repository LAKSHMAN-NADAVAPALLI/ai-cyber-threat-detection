from weasyprint import HTML

# HTML content (as a string)
html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nadavapalli Venkata Pavan Sai Sri Lakshman - Resume</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            width: 8.27in;
            margin: 0.4in auto;
            line-height: 1.4;
            font-size: 10pt;
            color: #2E2E2E;
            background: #FFFFFF;
        }
        h1 {
            font-family: 'Roboto', sans-serif;
            font-size: 18pt;
            text-align: center;
            margin-bottom: 3px;
            color: #26A69A;
            letter-spacing: 1px;
        }
        h2 {
            font-family: 'Roboto', sans-serif;
            font-size: 12pt;
            color: #26A69A;
            border-bottom: 1px solid #E0E7EA;
            margin-top: 8px;
            margin-bottom: 4px;
            padding-bottom: 2px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        h3 {
            font-family: 'Roboto', sans-serif;
            font-size: 11pt;
            margin-bottom: 3px;
            font-weight: 600;
            color: #37474F;
        }
        p, li {
            font-size: 10pt;
            margin: 2px 0;
            color: #4A4A4A;
        }
        .contact {
            text-align: center;
            font-size: 9pt;
            margin-bottom: 8px;
        }
        .contact a {
            color: #26A69A;
            text-decoration: none;
        }
        .contact i {
            margin-right: 4px;
            color: #26A69A;
        }
        .contact p {
            display: inline-block;
            margin: 0;
        }
        .contact .contact-line {
            white-space: nowrap;
        }
        ul {
            margin: 0;
            padding-left: 15px;
        }
        .timeline {
            float: right;
            font-weight: 500;
            color: #000000;
            font-size: 9pt;
        }
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
        }
        th, td {
            border: 1px solid #E0E7EA;
            padding: 5px;
            text-align: left;
        }
        th {
            background-color: #F1F5F8;
            font-weight: 600;
            color: #37474F;
        }
        .projects-spacing {
            margin-bottom: 10px;
        }
        .page-break {
            page-break-before: always;
        }
        .highlight-link {
            color: #26A69A;
            text-decoration: none;
            font-weight: 500;
        }
        @media print {
            body {
                margin: 0;
                width: 100%;
                background: #FFFFFF;
            }
            a {
                text-decoration: none;
                color: #000;
            }
            .page-break {
                page-break-before: always;
            }
        }
    </style>
</head>
<body>
    <h1>NADAVAPALLI VENKATA PAVAN SAI SRI LAKSHMAN</h1>
    <p style="text-align: center; font-size: 11pt; font-weight: 600; color: #37474F;">Java Developer & Software Engineer</p>
    <div class="contact">
        <p class="contact-line">
            <i class="fas fa-phone"></i><strong>Phone:</strong> +91-9346716905 | 
            <i class="fas fa-envelope"></i><strong>Email:</strong> <a href="mailto:2200030245cseh@gmail.com">2200030245cseh@gmail.com</a> | 
            <i class="fas fa-map-marker-alt"></i><strong>Address:</strong> Vijayawada, Andhra Pradesh, India
        </p>
        <p>
            <i class="fab fa-linkedin"></i><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nadavapalli-venkata-pavan-sai-sri-lakshman-53366828a">LinkedIn</a> | 
            <i class="fab fa-github"></i><strong>GitHub:</strong> <a href="https://github.com/LAKSHMAN-NADAVAPALLI">GitHub</a> | 
            <i class="fas fa-briefcase"></i><strong>Portfolio:</strong> <a href="https://nadavapalli-lakshman-portfolio.vercel.app">Portfolio</a>
        </p>
    </div>

    <div>
        <h2>Professional Summary</h2>
        <p>Software Engineer skilled in Java, Python, and MERN stack, with expertise in building scalable AWS-hosted applications. Experienced in designing RESTful APIs and managing MySQL/MongoDB databases. Proficient in CI/CD pipelines, ensuring seamless deployment and automation. Passionate about fintech, AI-driven solutions, and cutting-edge technologies.</p>
    </div>

    <div>
        <h2>Skills</h2>
        <ul>
            <li><strong>Languages:</strong> C, C++, Java, Python, Golang</li>
            <li><strong>Backend:</strong> Django, Spring Boot, RESTful APIs, Microservices</li>
            <li><strong>Web:</strong> React.js, HTML, CSS, Full Stack</li>
            <li><strong>Databases:</strong> MySQL, MongoDB, PostgreSQL</li>
            <li><strong>Cloud/DevOps:</strong> AWS, Docker</li>
            <li><strong>Fundamentals:</strong> DSA, Problem-Solving, System Design</li>
            <li><strong>Tools:</strong> Git, VS Code, IntelliJ, Postman</li>
            <li><strong>Soft Skills:</strong> Communication, Teamwork, Time Management</li>
        </ul>
    </div>

    <div>
        <h2>Education</h2>
        <table>
            <tr><th>Degree</th><th>Institution</th><th>Year</th><th>Grade</th></tr>
            <tr><td>B.Tech CSE</td><td>K.L. University, Vijayawada</td><td>2022 – Present</td><td>9.2/10</td></tr>
            <tr><td>Intermediate</td><td>Vidya Vikas</td><td>2020 – 2022</td><td>90%</td></tr>
            <tr><td>SSC</td><td>Vidya Vikas</td><td>2019 – 2020</td><td>98%</td></tr>
        </table>
    </div>

    <div>
        <h2>Work Experience</h2>
        <div class="clearfix">
            <h3>AICTE Data Engineering Internship <a href="https://drive.google.com/file/d/17L7G4jFuwMskp-FJYw4hKP1WWeZUWTrK/view?usp=sharing" class="highlight-link">[View Certificate]</a></h3>
            <span class="timeline">Jan – Mar 2024</span>
            <ul>
                <li>Built ETL pipelines with Python and Airflow, ascended to 15% faster data processing.</li>
                <li>Performed EDA with Tableau/Power BI for business insights.</li>
                <li>Reduced data discrepancies by 10% in a 4-person team.</li>
            </ul>
        </div>
    </div>

    <div>
        <h2>Academic Projects</h2>
        <div class="clearfix">
            <h3>Online Job Portal <a href="https://nadavapalli-lakshman-online-job-portal-using-react-lapy.vercel.app/" class="highlight-link">[View Project]</a></h3>
            <span class="timeline">Jan 2024</span>
            <p><em>Tools: MERN Stack</em></p>
            <ul>
                <li>Full-stack job portal with search and apply features.</li>
                <li>Improved search response time by 20% with MongoDB.</li>
                <li>Built RESTful APIs and responsive UI (95% satisfaction).</li>
            </ul>
        </div>
        <div class="clearfix projects-spacing">
            <h3>Movie Ticket Booking System <a href="https://github.com/LAKSHMAN-NADAVAPALLI/MovieTicketBookingSystem" class="highlight-link">[View Project]</a></h3>
            <span class="timeline">July 2024</span>
            <p><em>Tools: JSP, MySQL, Red Hat</em></p>
            <ul>
                <li>Secure booking system with payment integration.</li>
                <li>Added token-based authentication and encryption.</li>
                <li>User-friendly UI with efficient backend.</li>
            </ul>
        </div>
    </div>

    <div class="page-break">
        <h2>Certifications</h2>
        <ul>
            <li class="clearfix">
                <strong>AWS Cloud Practitioner</strong> <a href="https://www.credly.com/badges/32387a49-c0e6-469a-973d-ba90f38aa031/public_url" class="highlight-link">[View Certificate]</a> <span class="timeline">27 May 2024</span>
                <p>Learned AWS services and cloud architecture.</p>
            </li>
            <li class="clearfix">
                <strong>Oracle Cloud AI Professional</strong> <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=37B3018A28F26088FC2C6908E504EECD620F7FE70241DA3F2A9AD509618BA44C" class="highlight-link">[View Certificate]</a> <span class="timeline">30 July 2024</span>
                <p>Mastered generative AI with Oracle Cloud.</p>
            </li>
            <li class="clearfix">
                <strong>Red Hat App Developer</strong> <a href="https://www.credly.com/badges/9c686d86-d5c7-429b-9f4c-736b12ea40ea/public_url" class="highlight-link">[View Certificate]</a> <span class="timeline">18 Sep 2024</span>
                <p>Expertise in Java and Red Hat technologies.</p>
            </li>
            <li class="clearfix">
                <strong>FinTech Professional</strong> <a href="https://drive.google.com/file/d/1PIgwvqFrM_YKCWnIFFrZL2WbwYq8AGvi/view" class="highlight-link">[View Certificate]</a> <span class="timeline">July 2024</span>
                <p>Skills in blockchain and AI-driven finance.</p>
            </li>
        </ul>
    </div>

    <div>
        <h2>Positions of Responsibility</h2>
        <div class="clearfix">
            <h3>Web Developer, Technical Club</h3>
            <span class="timeline">Jun 2023 – Present</span>
            <ul>
                <li>Built responsive web pages with HTML/CSS/JS.</li>
                <li>Led coding workshops for peers.</li>
            </ul>
        </div>
        <div class="clearfix">
            <h3>Event Coordinator</h3>
            <span class="timeline">Oct 2023 – Present</span>
            <ul>
                <li>Managed university events and festivals.</li>
                <li>Created an event management platform.</li>
            </ul>
        </div>
    </div>

    <div>
        <h2>Languages</h2>
        <ul>
            <li>English</li>
            <li>Hindi</li>
            <li>Telugu</li>
        </ul>
    </div>
</body>
</html>
"""

# Output PDF file name
output_pdf = "Lakshman_Resume.pdf"

# Generate PDF
HTML(string=html_content).write_pdf(output_pdf)

print(f"✅ Resume successfully created: {output_pdf}")
