# Use an official OpenJDK image
FROM openjdk:21-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy project jar file
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]