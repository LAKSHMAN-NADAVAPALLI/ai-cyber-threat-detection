# -------- Stage 1: Build the Spring Boot app --------
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# -------- Stage 2: Run the built app --------
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the packaged JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Explicitly pass environment variables to the JVM (critical!)
ENTRYPOINT ["sh", "-c", "java -Dspring.data.mongodb.uri=$MONGO_URI -Djwt.secret=$JWT_SECRET -jar app.jar"]
