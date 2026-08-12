FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . /app
RUN mvn -pl eureka-server -am -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/eureka-server/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
