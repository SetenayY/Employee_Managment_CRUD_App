This is a basic local web application that supports crud operations for employee managment. Employees get notified when their information is updated. 

Backend: Java 17, Spring Boot, Spring Data JPA, RabbitMQ, JavaMailSender
Frontend: React, TypeScript, Vite, Axios
Database: PostgreSQL
Mail: RabbitMQ, Mailtrap SMTP Sandbox

To run locally:
JDK, Node.js & npm, PostgreSQL (port 5432), RabbitMQ (port: 5672 | Management UI: 15672)

To see employee update messages:
Configure mailtrap username & password in spring-init\demo\src\main\resources\application.properties
