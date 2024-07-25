FROM maven:3-openjdk-17 AS build
WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

RUN ls -la /app/target/

FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=build /app/target/ecommerce-system-0.0.1-SNAPSHOT.war ecommerce-system.war
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "ecommerce-system.war"]